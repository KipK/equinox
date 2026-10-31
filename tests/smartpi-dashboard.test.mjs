import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { registerHooks, stripTypeScriptTypes } from "node:module";
import { fileURLToPath } from "node:url";
import test from "node:test";

// Load the existing TypeScript modules and bundled JSON without another test dependency.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
      const candidate = new URL(`${specifier.replace(/\.js$/u, "")}.ts`, context.parentURL);
      if (existsSync(candidate)) return nextResolve(candidate.href, context);
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith("file:") && url.endsWith(".ts")) {
      return { format: "module", source: stripTypeScriptTypes(readFileSync(fileURLToPath(url), "utf8"), { mode: "transform" }), shortCircuit: true };
    }
    if (url.startsWith("file:") && url.endsWith(".json")) {
      return { format: "module", source: `export default ${readFileSync(fileURLToPath(url), "utf8")};`, shortCircuit: true };
    }
    return nextLoad(url, context);
  }
});

const { EquinoxRegulationRenderer } = await import("../src/components/eq-regulation-renderer.ts");
const { EquinoxRegulationDialog } = await import("../src/components/eq-regulation-dialog.ts");
const { translateRegulationDashboardText: translate } = await import("../src/data/regulation-dashboard-i18n.ts");
const dashboard = JSON.parse(readFileSync(new URL("../src/data/dashboards/regulation/smartpi.json", import.meta.url)));
const published = JSON.parse(readFileSync(new URL("./fixtures/smartpi-diagnostics-paths.json", import.meta.url)));
const publishedPaths = new Set([
  ...published.live.map((path) => `live/${path.replaceAll(".", "/")}`),
  ...published.history.map((path) => `history/${path}`)
]);
const section = (id) => dashboard.sections.find((entry) => entry.id === id);
function* walk(value) {
  if (!value || typeof value !== "object") return;
  yield value;
  for (const child of Object.values(value)) yield* walk(child);
}
const nodes = [...walk(dashboard.sections)];
const approach = [...walk(section("anticipation"))];
const byPath = (path) => approach.find((entry) => entry.path === path);
const sectionPath = (id, path) => [...walk(section(id))].find((entry) => entry.path === path);

function assertPublished(path) {
  assert.ok(publishedPaths.has(path), `Unpublished SmartPI diagnostic path: ${path}`);
}

function assertLivePayload(value, prefix = "live") {
  for (const [key, child] of Object.entries(value ?? {})) {
    const path = `${prefix}/${key}`;
    assertPublished(path);
    if (child && typeof child === "object") assertLivePayload(child, path);
  }
}

function assertBindings(value) {
  for (const entry of walk(value)) {
    const currentPath = entry.source === "diagnostic" ? entry.path
      : typeof entry.var === "string" && entry.var.startsWith("diagnostic/") ? entry.var.slice("diagnostic/".length) : undefined;
    if (currentPath !== undefined) {
      assert.ok(currentPath.startsWith("live/"), `Current SmartPI values must use live/: ${currentPath}`);
      assertPublished(currentPath);
    }
    if (entry.entity === "$diagnostic_entity" && entry.attribute) {
      assert.ok(entry.attribute.startsWith("history/"));
      assertPublished(entry.attribute);
    }
  }
}

function renderer(live, mode = "heat") {
  assertLivePayload(live);
  const result = new EquinoxRegulationRenderer();
  result.config = { entity: "climate.test" };
  result.dashboard = dashboard;
  result.language = "en";
  result.activeSectionId = "anticipation";
  result.hass = { states: {
    "climate.test": { entity_id: "climate.test", state: mode, attributes: { temperature: 21, specific_states: { regulation_diagnostics: "sensor.diag" } } },
    ...(live === undefined ? {} : { "sensor.diag": { entity_id: "sensor.diag", state: "PI", attributes: { schema_version: published.schema_version, live } } })
  } };
  return result;
}

// Inspect Lit templates directly: this exercises renderer behavior without pretending to paint a browser.
function templateText(value) {
  if (value === undefined || value === null || typeof value === "symbol") return "";
  if (Array.isArray(value)) return value.map(templateText).join("");
  if (value.strings) return value.strings.map((part, index) => part + templateText(value.values[index])).join("");
  return String(value);
}

test("dashboard bindings and conditions use only published schema v2 paths", () => {
  assert.equal(published.schema_version, 2);
  assertBindings(dashboard.sections);
  assert.doesNotMatch(JSON.stringify(dashboard.sections), /bootstrap_status/u);
});

test("documentation examples and named diagnostic paths match the published contract", () => {
  const documentation = readFileSync(new URL("../docs/regulation-dashboard.md", import.meta.url), "utf8");
  for (const [, json] of documentation.matchAll(/```json\n([\s\S]*?)```/gu)) assertBindings(JSON.parse(json));
  for (const [, path] of documentation.matchAll(/diagnostic\/([a-zA-Z0-9_/]+)/gu)) assertPublished(path);
  for (const [, path] of documentation.matchAll(/`((?:live|history)\/[^`]+)`/gu)) {
    if (path.includes("...") || path.includes("*")) continue;
    const group = /^(.*)\{([^}]+)\}$/u.exec(path);
    for (const expanded of group ? group[2].split(",").map((leaf) => group[1] + leaf) : [path]) assertPublished(expanded);
  }
});

test("eight sections retain navigation IDs, with no legacy bindings or unused translations", () => {
  assert.deepEqual(dashboard.sections.map((entry) => entry.id), ["overview", "command", "anticipation", "model", "learning", "fftrim", "health", "actions"]);
  assert.doesNotMatch(JSON.stringify(dashboard), /landing|governor|user_setpoint"\s*,\s*"source"\s*:\s*"diagnostic/iu);
  const usedKeys = new Set(nodes.flatMap((entry) => Object.entries(entry).filter(([key]) => key.endsWith("_key")).map(([, value]) => value)));
  for (const language of ["fr", "en"]) assert.deepEqual(new Set(Object.keys(dashboard.translations[language])), usedKeys);
  assert.equal(translate(dashboard, "fr-FR", section("anticipation").title_key), "Approche de consigne");
  assert.equal(translate(dashboard, "de", section("anticipation").title_key), "Target approach");
  assert.equal(translate(dashboard, "en", section("model").title_key), "Model and prediction");
});

test("FF3/twin move together; command constraints, FFTrim nesting and confirmed actions remain", () => {
  const paths = (id) => [...walk(section(id))].map((entry) => entry.path).filter(Boolean);
  for (const path of ["ff3_status", "ff3_twin_usable", "twin_status", "deadband_power_source", "deadband_p_mode"]) {
    assert.ok(paths("model").includes(`live/feedforward/${path}`));
    assert.ok(!paths("anticipation").includes(`live/feedforward/${path}`));
  }
  for (const path of ["command_percent", "limited_percent", "applied_percent", "pi_percent", "ff_percent"]) assert.ok(paths("command").includes(`live/power/${path}`));
  for (const path of ["stationary", "periodic", "transfer", "last_result", "last_transaction"]) assert.ok(paths("fftrim").some((entry) => entry.startsWith(`live/feedforward/fftrim/${path}/`)));
  const actions = [...walk(section("actions"))].filter((entry) => entry.type === "action");
  assert.deepEqual(actions.map((entry) => entry.service), ["vtherm_smartpi.set_smartpi_learning", "vtherm_smartpi.set_smartpi_learning", "vtherm_smartpi.reset_smartpi_learning", "vtherm_smartpi.force_smartpi_calibration", "vtherm_smartpi.reset_smartpi_integral"]);
  assert.ok(actions.every((entry) => entry.confirmation.enabled && entry.target.entity_id === "$climate_entity"));
});

test("trajectory tracking and release keep details visible, including braking_needed=false", () => {
  for (const phase of ["tracking", "release"]) {
    const view = renderer({ setpoint: { trajectory_active: true, trajectory_source: "setpoint" }, analysis: { trajectory: { phase, braking_needed: false } } });
    assert.match(templateText(view._renderStatus(byPath("live/analysis/trajectory/phase"))), phase === "tracking" ? /Profile tracking/ : /Progressive return to setpoint/);
    assert.match(templateText(view._renderStatus(byPath("live/setpoint/trajectory_active"))), /Active/);
    assert.match(templateText(view._renderStatus(byPath("live/analysis/trajectory/braking_needed"))), /tone="?muted"?/);
    for (const title of ["groups.approach.details", "groups.approach.readiness"]) assert.ok(view._conditionMatches(approach.find((entry) => entry.title_key === title).visible_if));
    const overviewPhase = [...walk(section("overview"))].find((entry) => entry.path === "live/analysis/trajectory/phase");
    assert.equal(templateText(view._renderStatus(overviewPhase)), templateText(view._renderStatus(byPath("live/analysis/trajectory/phase"))));
  }
});

test("inactive trajectory displays neutral current state and hides stale profile details", () => {
  const view = renderer({ setpoint: { trajectory_active: true }, analysis: { trajectory: { phase: "tracking", start_setpoint: 19 } } });
  assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/start_setpoint")), "19.00 °C");
  const live = { setpoint: { filtered_setpoint: 21, trajectory_active: false, trajectory_source: "none" }, analysis: { trajectory: { phase: "idle", start_setpoint: null } } };
  assertLivePayload(live);
  view.hass.states["sensor.diag"].attributes.live = live;
  assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/start_setpoint")), "--");
  for (const path of ["live/setpoint/trajectory_active", "live/analysis/trajectory/phase"]) {
    const text = templateText(view._renderStatus(byPath(path)));
    assert.match(text, /Inactive/);
    assert.match(text, /tone="?muted"?/);
    assert.doesNotMatch(text, /tone="?warning"?|tone="?danger"?|successful|plateau/i);
  }
  assert.equal(view._formatSourceValue(byPath("live/setpoint/filtered_setpoint")), "21.00 °C");
  for (const title of ["groups.approach.details", "groups.approach.readiness"]) assert.equal(view._conditionMatches(approach.find((entry) => entry.title_key === title).visible_if), false);
});

test("missing/null diagnostics are absent while zero and false remain valid", () => {
  for (const live of [undefined, {}, { analysis: { trajectory: { next_cycle_reference: null } }, setpoint: { trajectory_active: null } }]) {
    const view = renderer(live);
    assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/next_cycle_reference")), "--");
    const text = templateText(view._renderStatus(byPath("live/setpoint/trajectory_active")));
    assert.match(text, /tone="?muted"?/);
    assert.doesNotMatch(text, />Active</);
    assert.equal(view._conditionMatches(approach.find((entry) => entry.title_key === "groups.approach.details").visible_if), false);
  }
  const view = renderer({ analysis: { trajectory: { next_cycle_reference: 0, braking_needed: false } } });
  assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/next_cycle_reference")), "0.0 %");
  assert.match(templateText(view._renderStatus(byPath("live/analysis/trajectory/braking_needed"))), /No/);
});

test("unknown trajectory enums expose the raw code with neutral styling", () => {
  const view = renderer({ setpoint: { trajectory_source: "future_source" }, analysis: { trajectory: { phase: "future_phase" } } });
  for (const path of ["live/analysis/trajectory/phase", "live/setpoint/trajectory_source"]) {
    const text = templateText(view._renderStatus(byPath(path)));
    assert.match(text, /future_/);
    assert.match(text, /tone="?muted"?/);
    assert.doesNotMatch(text, /tone="?warning"?|tone="?danger"?/);
  }
});

test("HEAT/COOL preserve physical temperatures and convert ratios only once", () => {
  for (const mode of ["heat", "cool"]) {
    const view = renderer({ power: { applied_percent: 45 }, analysis: { trajectory: { start_setpoint: 20.8, target_setpoint: 21, next_cycle_reference: 0.42, bumpless_delta: -0.02 } } }, mode);
    assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/start_setpoint")), "20.80 °C");
    assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/target_setpoint")), "21.00 °C");
    assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/next_cycle_reference")), "42.0 %");
    assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/bumpless_delta")), "-2.0 %");
    assert.equal(view._formatSourceValue(nodes.find((entry) => entry.path === "live/power/applied_percent")), "45.0 %");
    assert.equal(view._formatSourceValue(byPath("temperature")), "21.00 °C");
  }
  for (const entry of nodes.filter((entry) => entry.path?.startsWith("live/power/") && entry.path.endsWith("_percent"))) assert.equal(entry.value_multiplier, undefined);
});

test("PI gains display the published Ti in minutes and keep unavailable values absent", () => {
  const gains = section("command").items.find((entry) => entry.title_key === "groups.command.gains");
  assert.equal(gains.columns, 3);
  assert.deepEqual(gains.metrics.map((entry) => entry.path), ["live/control/kp", "live/control/ki", "live/control/ti_min"]);
  const ti = gains.metrics[2];
  const view = renderer({ control: { kp: 0.3, ki: 0.01, ti_min: 30 } });
  assert.equal(view._formatSourceValue(ti), "30.0 min");
  // Ti must be displayed from diagnostics, without recomputing Kp/Ki in the card.
  const supplied = renderer({ control: { kp: 0.3, ki: 0.01, ti_min: 27.5 } });
  assert.equal(supplied._formatSourceValue(ti), "27.5 min");
  for (const live of [undefined, {}, { control: { kp: 0.3, ki: 0, ti_min: null } }, { control: { kp: 0.3, ki: -0.01, ti_min: null } }]) assert.equal(renderer(live)._formatSourceValue(ti), "--");
});

test("response lag displays published durations and retained estimates in HEAT and COOL", () => {
  const base = "live/analysis/learning/response_lag/";
  for (const mode of ["heat", "cool"]) {
    const view = renderer({ analysis: { learning: { response_lag: {
      lag_s: 5400, estimates: 3, episode_median_s: 7200, last_reason: "estimated"
    } } } }, mode);
    assert.equal(view._formatSourceValue(sectionPath("learning", `${base}lag_s`)), "1.5h");
    assert.equal(view._formatSourceValue(sectionPath("learning", `${base}estimates`)), "3");
    assert.equal(view._formatSourceValue(sectionPath("learning", `${base}episode_median_s`)), "2h");
    assert.match(templateText(view._renderStatus(sectionPath("learning", `${base}last_reason`))), /Estimate retained/);
  }
});

test("response heating phases preserve zero and counts beyond the published resolution target", () => {
  const base = "live/analysis/learning/response_lag/";
  const phases = sectionPath("learning", `${base}episodes`);
  const target = sectionPath("learning", `${base}episodes_target`);
  for (const [stage, lag, count] of [["bootstrap", null, 0], ["bootstrap", null, 4], ["bootstrap", null, 7], ["monitoring", 1515, 10]]) {
    const view = renderer({ learning: { stage }, analysis: { learning: { response_lag: {
      lag_s: lag, estimates: 0, episodes: count, episodes_target: 7
    } } } });
    assert.match(templateText(view._renderMetric(phases)), new RegExp(`class="value">${count}<`));
    assert.match(templateText(view._renderMetric(target)), /class="value">7</);
    assert.equal(view._formatSourceValue(sectionPath("learning", `${base}estimates`)), "0");
    assert.match(templateText(view._renderStatus(sectionPath("learning", "live/learning/stage"))),
      stage === "bootstrap" ? /Initial learning/ : /Model monitoring/);
  }
});

test("a phase interrupted by a restart displays a translated informational outcome", () => {
  const reason = sectionPath("learning", "live/analysis/learning/response_lag/last_reason");
  const view = renderer({ analysis: { learning: { response_lag: {
    lag_s: null, estimates: 0, episodes: 1, episodes_target: 7, last_reason: "episode interrupted by restart"
  } } } });
  for (const [language, label] of [["fr", "Phase interrompue par un redémarrage"], ["en", "Phase interrupted by a restart"]]) {
    view.language = language;
    const rendered = templateText(view._renderStatus(reason));
    assert.ok(rendered.includes(label));
    assert.match(rendered, /tone="?muted"?/);
    assert.match(rendered, /mdi:information-outline/);
  }
});

test("an accepted lag estimate does not imply a published lag or completed learning", () => {
  const view = renderer({ learning: { stage: "bootstrap", bootstrap_progress_percent: 100,
    emea_samples_a: 5, emea_samples_b: 5, bootstrap_target_a: 5, bootstrap_target_b: 5 }, analysis: { learning: {
    response_lag: { lag_s: null, estimates: 7, episode_median_s: null, last_reason: "estimated" }
  } } });
  const stage = sectionPath("learning", "live/learning/stage");
  assert.match(templateText(view._renderStatus(stage)), /Initial learning/);
  assert.equal(view._formatSourceValue(sectionPath("learning", "live/analysis/learning/response_lag/lag_s")), "--");
  assert.ok(!nodes.some((item) => item.path === "live/learning/bootstrap_progress_percent"));
  const gauges = [...walk(section("learning"))].filter((item) => item.target?.path?.startsWith("live/learning/bootstrap_target_"));
  for (const gauge of gauges) assert.match(templateText(view._renderItem(gauge)), /100%/);
  const note = section("learning").items.find((item) => item.text_key === "notes.learning.bootstrap");
  assert.match(templateText(view._renderItem(note)), /Reaching a target does not guarantee validation/);
  assert.match(templateText(view._renderItem(note)), /additional measurements/);
});

test("initial sample targets remain published values and early A publication follows the stage", () => {
  for (const [targetA, targetB, expectedA] of [[5, 5, "80%"], [6, 4, "67%"]]) {
    const view = renderer({ learning: {
      stage: "bootstrap", emea_samples_a: 4, emea_samples_b: targetB, bootstrap_target_a: targetA,
      bootstrap_target_b: targetB, accepted_updates_a: 0, bootstrap_progress_percent: 80
    } });
    const gauges = [...walk(section("learning"))].filter((item) => item.type === "progress");
    const a = gauges.find((item) => item.target?.path === "live/learning/bootstrap_target_a");
    const b = gauges.find((item) => item.target?.path === "live/learning/bootstrap_target_b");
    assert.ok(templateText(view._renderItem(a)).includes(expectedA));
    assert.match(templateText(view._renderItem(b)), /100%/);
    view.hass.states["sensor.diag"].attributes.live.learning.stage = "learning";
    view.hass.states["sensor.diag"].attributes.live.learning.accepted_updates_a = 1;
    assert.equal(templateText(view._renderItem(a)), "");
    assert.equal(templateText(view._renderItem(b)), "");
    assert.match(templateText(view._renderStatus(sectionPath("learning", "live/learning/stage"))), /Model refinement/);
    const note = section("learning").items.find((item) => item.text_key === "notes.learning.bootstrap");
    assert.equal(templateText(view._renderItem(note)), "");
  }
});

test("initial collection keeps unknown targets absent and accepts a zero count", () => {
  const gauges = [...walk(section("learning"))].filter((item) => item.target?.path?.startsWith("live/learning/bootstrap_target_"));
  for (const target of [undefined, null]) {
    const view = renderer({ learning: { stage: "bootstrap", emea_samples_a: 4, emea_samples_b: 5,
      bootstrap_target_a: target, bootstrap_target_b: target } });
    for (const gauge of gauges) assert.match(templateText(view._renderItem(gauge)), /class="value">--/);
  }
  const view = renderer({ learning: { stage: "bootstrap", emea_samples_a: 0, emea_samples_b: 0,
    bootstrap_target_a: 5, bootstrap_target_b: 5 } });
  for (const gauge of gauges) assert.match(templateText(view._renderItem(gauge)), /class="value">0%/);
});

test("missing response delay explains uncertainty without inventing an observation or fallback state", () => {
  const note = [...walk(section("learning"))].find((item) => item.text_key === "notes.learning.response_lag_missing");
  for (const language of ["en", "fr"]) {
    for (const lag of [undefined, null, 0, 5400]) {
      const view = renderer({ analysis: { learning: { response_lag: { lag_s: lag } } } });
      view.language = language;
      const text = templateText(view._renderItem(note));
      if (lag === undefined || lag === null) {
        assert.match(text, language === "fr" ? /ne permet pas de savoir/ : /does not tell us whether/);
        assert.doesNotMatch(text, /7|fallback|repli/);
      } else assert.equal(text, "");
    }
    const view = renderer({});
    view.language = language;
    assert.notEqual(templateText(view._renderItem(note)), "");
  }
});

test("paused learning preserves collection and does not imply a pause when the flag is absent", () => {
  const note = section("learning").items.find((item) => item.text_key === "notes.learning.paused");
  const status = sectionPath("learning", "live/learning/enabled");
  for (const flag of [false, true, undefined, null]) {
    const view = renderer({ learning: { enabled: flag, stage: "bootstrap", emea_samples_a: 4, bootstrap_target_a: 5 } });
    assert.equal(templateText(view._renderItem(note)) !== "", flag === false);
    if (flag === false) {
      assert.match(templateText(view._renderStatus(status)), /Paused/);
      const gauge = [...walk(section("learning"))].find((item) => item.target?.path === "live/learning/bootstrap_target_a");
      assert.match(templateText(view._renderItem(gauge)), /80%/);
      view.language = "fr";
      assert.match(templateText(view._renderItem(note)), /en pause/);
    } else if (flag === undefined || flag === null) {
      assert.match(templateText(view._renderStatus(status)), /--/);
      assert.doesNotMatch(templateText(view._renderStatus(status)), /Enabled|Paused/);
    }
  }
});

test("thermal protection cut explains forced heating shutdown in both sections and languages", () => {
  for (const language of ["en", "fr"]) {
    const view = renderer({ temperature: { integral_mode: "I:OVERRIDE(guard_cut)" } });
    view.language = language;
    for (const id of ["overview", "health"]) {
      const rendered = templateText(view._renderStatus(sectionPath(id, "live/temperature/integral_mode")));
      assert.match(rendered, language === "fr" ? /Coupure de protection thermique/ : /Thermal protection cut/);
      assert.match(rendered, language === "fr" ? /correction déjà apprise est conservée/ : /learned correction is preserved/);
      assert.match(rendered, /tone="?warning"?/);
      assert.doesNotMatch(rendered, /I:OVERRIDE/);
    }
  }
});

test("dead time waiting age follows detector state and retained outcomes stay separate", () => {
  const age = sectionPath("model", "live/analysis/deadtime/waiting_elapsed_s");
  const state = sectionPath("model", "live/analysis/deadtime/state");
  for (const mode of ["heat", "cool"]) {
    for (const [code, expected] of [["WAITING_HEAT_RESPONSE", "Waiting for a temperature rise"], ["WAITING_COOL_RESPONSE", "Waiting for a temperature drop"]]) {
      const view = renderer({ analysis: { deadtime: {
        state: code, waiting_elapsed_s: 43200, heat_last_outcome: "detected", cool_last_outcome: "aborted"
      } } }, mode);
      assert.match(templateText(view._renderStatus(state)), new RegExp(expected));
      assert.equal(view._formatSourceValue(age), "12h");
      assert.match(templateText(view._renderItem(age)), /12h/);
      assert.match(templateText(view._renderStatus(sectionPath("model", "live/analysis/deadtime/heat_last_outcome"))), /Detected/);
      assert.match(templateText(view._renderStatus(sectionPath("model", "live/analysis/deadtime/cool_last_outcome"))), /Interrupted/);
    }
    for (const code of ["OFF", "HEATING", "COOLING", "future_state"]) {
      const view = renderer({ analysis: { deadtime: { state: code, waiting_elapsed_s: 43200 } } }, mode);
      assert.equal(templateText(view._renderItem(age)), "");
    }
  }
});

test("dead time outcomes distinguish timeout and interruption from a model failure", () => {
  for (const channel of ["heat", "cool"]) {
    const item = sectionPath("model", `live/analysis/deadtime/${channel}_last_outcome`);
    for (const [outcome, label, tone] of [["detected", "Detected", "ok"], ["timeout", "Timed out", "warning"], ["aborted", "Interrupted", "muted"]]) {
      const view = renderer({ analysis: { deadtime: { [`${channel}_last_outcome`]: outcome } } });
      const rendered = templateText(view._renderStatus(item));
      assert.match(rendered, new RegExp(label));
      assert.match(rendered, new RegExp(`tone="?${tone}"?`));
      assert.doesNotMatch(rendered, /tone="?danger"?/);
    }
  }
});

test("SmartPI 0.5 diagnostics and null response values remain absent, while zero remains valid", () => {
  const lag = sectionPath("learning", "live/analysis/learning/response_lag/lag_s");
  const count = sectionPath("learning", "live/analysis/learning/response_lag/estimates");
  const phases = sectionPath("learning", "live/analysis/learning/response_lag/episodes");
  const target = sectionPath("learning", "live/analysis/learning/response_lag/episodes_target");
  const reason = sectionPath("learning", "live/analysis/learning/response_lag/last_reason");
  const outcome = sectionPath("model", "live/analysis/deadtime/cool_last_outcome");
  for (const live of [undefined, {}, { analysis: { deadtime: { state: "OFF" } } }, {
    analysis: { learning: { response_lag: { lag_s: null, estimates: null, episodes: null, episodes_target: null, last_reason: null } }, deadtime: { cool_last_outcome: null } }
  }]) {
    const view = renderer(live);
    assert.equal(view._formatSourceValue(lag), "--");
    assert.equal(view._formatSourceValue(count), "--");
    assert.equal(view._formatSourceValue(phases), "--");
    assert.equal(view._formatSourceValue(target), "--");
    for (const item of [reason, outcome]) {
      const rendered = templateText(view._renderStatus(item));
      assert.match(rendered, /--/);
      assert.match(rendered, /tone="?muted"?/);
      assert.doesNotMatch(rendered, /Estimate retained|Detected|Timed out/);
    }
  }
  const view = renderer({ analysis: { learning: { response_lag: { lag_s: 0, estimates: 0 } },
    deadtime: { state: "WAITING_HEAT_RESPONSE", waiting_elapsed_s: 0 } } });
  assert.equal(view._formatSourceValue(lag), "0s");
  assert.equal(view._formatSourceValue(count), "0");
  assert.match(templateText(view._renderItem(sectionPath("model", "live/analysis/deadtime/waiting_elapsed_s"))), /0s/);
});

test("new response reasons, learning waits and integral unwind modes translate with neutral future fallbacks", () => {
  const lagReason = sectionPath("learning", "live/analysis/learning/response_lag/last_reason");
  const lastReason = sectionPath("learning", "live/learning/last_reason");
  for (const [code, label] of [["late crossings insufficient", "Insufficient temperature changes"], ["intercept not resolvable", "Delay cannot be determined from this phase"]]) {
    const view = renderer({ analysis: { learning: { response_lag: { last_reason: code } } } });
    assert.match(templateText(view._renderStatus(lagReason)), new RegExp(label));
  }
  for (const param of ["a", "b"]) {
    const view = renderer({ learning: { last_reason: `skip: response transient (${param})` } });
    assert.match(templateText(view._renderStatus(lastReason)), new RegExp(`Settling before a${param === "a" ? "n" : ""} ${param.toUpperCase()} measurement`));
  }
  const integral = ["overview", "health"].map((id) => sectionPath(id, "live/temperature/integral_mode"));
  for (const [code, label] of [["I:UNWIND(SAT_HI)", "Integral unwind at the upper limit"], ["I:UNWIND(SAT_LO)", "Integral unwind at the lower limit"]]) {
    const view = renderer({ temperature: { integral_mode: code } });
    for (const item of integral) {
      assert.match(templateText(view._renderStatus(item)), new RegExp(label));
      view.language = "fr";
      assert.match(templateText(view._renderStatus(item)), /Décharge intégrale/);
      view.language = "en";
    }
  }
  const future = renderer({ temperature: { integral_mode: "future_integral" }, learning: { last_reason: "future_learning", stage: "future_stage" },
    analysis: { learning: { response_lag: { last_reason: "future_lag" } }, deadtime: { state: "future_state", cool_last_outcome: "future_outcome" } } });
  for (const item of [...integral, lastReason, lagReason, sectionPath("learning", "live/learning/stage"),
    sectionPath("model", "live/analysis/deadtime/state"), sectionPath("model", "live/analysis/deadtime/cool_last_outcome")]) {
    const rendered = templateText(future._renderStatus(item));
    assert.match(rendered, /future_/);
    assert.match(rendered, /tone="?muted"?/);
    assert.doesNotMatch(rendered, /tone="?warning"?|tone="?danger"?/);
  }
});

test("history retains exactly eight published diagnostic paths and separate compact approach graphs", () => {
  const histories = nodes.filter((entry) => entry.type === "history");
  const diagnosticPaths = new Set(histories.flatMap((entry) => entry.series).filter((entry) => entry.entity === "$diagnostic_entity").map((entry) => entry.attribute));
  assert.deepEqual(diagnosticPaths, new Set(["history/temperature/indoor", "history/setpoint/filtered_setpoint", "history/power/applied_percent", "history/power/command_percent", "history/power/pi_percent", "history/power/ff_percent", "history/model/a", "history/model/b"]));
  const [thermal, command] = section("anticipation").items.filter((entry) => entry.type === "history");
  assert.equal(thermal.range, "6h");
  assert.equal(command.range, thermal.range);
  assert.ok(thermal.series.every((entry) => entry.scale_group === "temperature" && entry.unit === "°C"));
  assert.ok(command.series.every((entry) => entry.scale_group === "power" && entry.unit === "%"));
  const view = renderer({});
  const config = view._betterHistoryConfig(thermal);
  assert.equal(config.debugPerformance, false);
  assert.ok(config.series.some((entry) => entry.entity === "climate.test" && entry.attribute.join("/") === "temperature"));
  assert.ok(config.series.some((entry) => entry.entity === "sensor.diag" && entry.attribute.join("/") === "history/setpoint/filtered_setpoint"));
});

test("desktop and mobile selection retain all existing IDs and translated section labels", () => {
  const dialog = new EquinoxRegulationDialog();
  dialog.dashboard = dashboard;
  dialog.hass = renderer({}).hass;
  dialog.config = { entity: "climate.test" };
  dialog.open = true;
  dialog.language = "en";
  for (const active of dashboard.sections) {
    dialog.activeSectionId = active.id;
    assert.equal(dialog._activeSectionId(), active.id);
  }
  dialog.activeSectionId = "anticipation";
  dialog._isMobile = () => false;
  assert.match(templateText(dialog._renderContent()), /Target approach/);
  dialog._isMobile = () => true;
  assert.match(templateText(dialog._renderContent()), /Target approach/);
  assert.match(templateText(dialog._renderMobileSectionMenu("anticipation")), /Model and prediction/);
  dialog.activeSectionId = "removed-id";
  assert.equal(dialog._activeSectionId(), "overview");
});
