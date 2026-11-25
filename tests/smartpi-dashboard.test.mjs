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
const { buildVtViewModel } = await import("../src/data/vt-state.ts");
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

test("nine sections retain navigation IDs, with no legacy bindings or unused translations", () => {
  assert.deepEqual(dashboard.sections.map((entry) => entry.id), ["overview", "command", "anticipation", "model", "room_model", "learning", "tar_learning", "health", "actions"]);
  assert.doesNotMatch(JSON.stringify(dashboard), /landing|governor|user_setpoint"\s*,\s*"source"\s*:\s*"diagnostic/iu);
  const usedKeys = new Set(nodes.flatMap((entry) => Object.entries(entry).filter(([key]) => key.endsWith("_key")).map(([, value]) => value)));
  for (const language of ["fr", "en"]) assert.deepEqual(new Set(Object.keys(dashboard.translations[language])), usedKeys);
  assert.equal(translate(dashboard, "fr-FR", section("anticipation").title_key), "Approche de consigne");
  assert.equal(translate(dashboard, "de", section("anticipation").title_key), "Target approach");
  assert.equal(translate(dashboard, "en", section("model").title_key), "Model and prediction");
});

test("Model keeps its deadband bindings; command constraints and confirmed actions remain, with nothing from the removed feed-forward trim, FF3 or twin", () => {
  const paths = (id) => [...walk(section(id))].map((entry) => entry.path).filter(Boolean);
  for (const path of ["deadband_power_source", "deadband_p_mode"]) {
    assert.ok(paths("model").includes(`live/feedforward/${path}`));
    assert.ok(!paths("anticipation").includes(`live/feedforward/${path}`));
  }
  for (const path of ["command_percent", "limited_percent", "applied_percent", "pi_percent", "ff_percent"]) assert.ok(paths("command").includes(`live/power/${path}`));
  assert.doesNotMatch(JSON.stringify(dashboard), /ff2|ff3|fftrim|twin|ownership|eta_s|eta_u/iu);
  const actions = [...walk(section("actions"))].filter((entry) => entry.type === "action");
  assert.deepEqual(actions.map((entry) => entry.service), ["vtherm_smartpi.set_smartpi_learning", "vtherm_smartpi.set_smartpi_learning", "vtherm_smartpi.reset_smartpi_learning", "vtherm_smartpi.force_smartpi_calibration", "vtherm_smartpi.reset_smartpi_integral"]);
  assert.ok(actions.every((entry) => entry.confirmation.enabled && entry.target.entity_id === "$climate_entity"));
});

const anticipationPaths = ["live/analysis/control/anticipation_c", "live/analysis/control/anticipation_horizon_s", "live/analysis/control/anticipation_horizon_source"];
const anticipationLive = (c, horizon, source) => ({ analysis: { control: { anticipation_c: c, anticipation_horizon_s: horizon, anticipation_horizon_source: source } } });

test("anticipation group binds the published correction, horizon and horizon source", () => {
  for (const path of anticipationPaths) {
    assertPublished(path);
    assert.ok(byPath(path), `${path} is bound in the approach section`);
  }
  const group = approach.find((entry) => entry.title_key === "groups.approach.anticipation");
  assert.ok(group);
  assert.deepEqual([...walk(group)].map((entry) => entry.path).filter(Boolean), [...anticipationPaths.slice(0, 2), "live/temperature/anticipated", anticipationPaths[2]]);
  assertPublished("live/temperature/anticipated");
  assert.equal(translate(dashboard, "fr", byPath("live/temperature/anticipated").label_key), "Température anticipée");
  assert.equal(translate(dashboard, "en", byPath("live/temperature/anticipated").label_key), "Anticipated temperature");
  assert.equal(byPath(anticipationPaths[1]).format, "duration_s");
  assert.deepEqual(Object.keys(byPath(anticipationPaths[2]).map), ["response model", "dead times", "none", "measurement pulses"]);
  assert.equal(byPath(anticipationPaths[2]).fallback_show_value, true);
  for (const language of ["en", "fr"]) {
    for (const entry of [...walk(group)].filter((node) => node.label_key || node.title_key || node.text_key)) {
      const key = entry.label_key ?? entry.title_key ?? entry.text_key;
      assert.ok(dashboard.translations[language][key], `${language} translation of ${key}`);
    }
  }
  assert.equal(translate(dashboard, "fr", "metrics.anticipation.horizon"), "Horizon d'anticipation");
  assert.equal(translate(dashboard, "en", "metrics.anticipation.horizon"), "Anticipation horizon");
});

test("the approach section no longer binds a trajectory, a filtered setpoint or a removed setpoint field", () => {
  const text = JSON.stringify(dashboard);
  assert.doesNotMatch(text, /trajectory|filtered_setpoint/iu);
  for (const path of ["live/setpoint/filtered_setpoint", "live/setpoint/trajectory_active", "live/setpoint/trajectory_source", "live/analysis/trajectory", "history/setpoint/filtered_setpoint"]) {
    assert.ok(!publishedPaths.has(path), `${path} must not be published`);
  }
  assert.ok(![...nodes].some((entry) => typeof entry.path === "string" && entry.path.startsWith("live/setpoint/") && entry.path !== "live/setpoint/boost_active"));
  const thermal = section("anticipation").items.find((entry) => entry.type === "history");
  assert.deepEqual(thermal.series.map((entry) => entry.attribute), ["history/temperature/indoor", "history/temperature/anticipated", "temperature"]);
});

test("anticipation values keep their sign, zero and unit, and read as a readable duration", () => {
  for (const mode of ["heat", "cool"]) {
    const view = renderer(anticipationLive(mode === "heat" ? 0.35 : -0.4, 540, "dead times"), mode);
    assert.equal(view._formatSourceValue(byPath(anticipationPaths[0])), mode === "heat" ? "0.35 °C" : "-0.40 °C");
    assert.match(view._formatSourceValue(byPath(anticipationPaths[1])), /^9\s?m/u);
  }
  const inactive = renderer(anticipationLive(0, 0, "none"));
  assert.equal(inactive._formatSourceValue(byPath(anticipationPaths[0])), "0.00 °C");
  assert.match(inactive._formatSourceValue(byPath(anticipationPaths[1])), /^0\s?s/u);
  for (const live of [undefined, {}, anticipationLive(null, null, null)]) {
    const view = renderer(live);
    for (const path of anticipationPaths.slice(0, 2)) assert.equal(view._formatSourceValue(byPath(path)), "--");
    assert.match(templateText(view._renderStatus(byPath(anticipationPaths[2]))), /tone="?muted"?/);
  }
});

test("the four horizon sources are translated in both languages and unknown codes stay raw and neutral", () => {
  const labels = { "response model": ["Response model", "Modèle de réponse", "info"], "dead times": ["Dead times", "Temps morts", "info"], none: ["None", "Aucun", "muted"],
    "measurement pulses": ["Measurement pulses", "Impulsions de mesure", "info"] };
  for (const [code, [english, french, tone]] of Object.entries(labels)) {
    const view = renderer(anticipationLive(0.2, 300, code));
    for (const [language, label] of [["en", english], ["fr", french]]) {
      view.language = language;
      const text = templateText(view._renderStatus(byPath(anticipationPaths[2])));
      assert.ok(text.includes(label), `${language} ${code}`);
      assert.doesNotMatch(text, /status-pill raw/u);
      assert.match(text, new RegExp(`tone="?${tone}"?`, "u"));
    }
  }
  const view = renderer(anticipationLive(0, 0, "future_source"));
  const text = templateText(view._renderStatus(byPath(anticipationPaths[2])));
  assert.match(text, /future_source/);
  assert.match(text, /tone="?muted"?/);
  assert.doesNotMatch(text, /tone="?warning"?|tone="?danger"?/);
});

test("the heating balance is gone and the near band source is labelled in both languages", () => {
  assert.doesNotMatch(JSON.stringify(dashboard), /heating_balance|heating balance|Bilan de chauffe/iu);
  const source = sectionPath("health", "live/analysis/control/near_band_source");
  assertPublished(source.path);
  const view = renderer({ analysis: { control: { near_band_source: "no response model" } } });
  for (const [language, label] of [["en", "No response model"], ["fr", "Sans modèle de réponse"]]) {
    view.language = language;
    const text = templateText(view._renderStatus(source));
    assert.ok(text.includes(label), language);
    assert.doesNotMatch(text, /status-pill raw/u);
  }
  assert.ok(!("fallback_deadtime" in source.map));
});

test("No label names a setpoint-trajectory state that SmartPI does not publish", () => {
  const labelKeys = [...walk(dashboard.sections)].map((entry) => entry.label_key).filter(Boolean);
  assert.ok(labelKeys.every((key) => !/trajectory/u.test(key)));
  for (const language of ["en", "fr"]) assert.ok(Object.keys(dashboard.translations[language]).every((key) => !/trajectory/u.test(key)));
});

test("HEAT/COOL preserve physical temperatures and show powers without a ratio conversion", () => {
  for (const mode of ["heat", "cool"]) {
    const view = renderer({ power: { applied_percent: 45 }, ...anticipationLive(0.5, 300, "response model") }, mode);
    assert.equal(view._formatSourceValue(byPath(anticipationPaths[0])), "0.50 °C");
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

test("full collection bars do not imply completed learning", () => {
  const view = renderer({ learning: { stage: "bootstrap", bootstrap_progress_percent: 100,
    emea_samples_a: 5, emea_samples_b: 5, bootstrap_target_a: 5, bootstrap_target_b: 5 } });
  const stage = sectionPath("learning", "live/learning/stage");
  assert.match(templateText(view._renderStatus(stage)), /Initial learning/);
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
      assert.match(rendered, language === "fr" ? /excès d'intégrale diminue/ : /excess integral decreases/);
      assert.match(rendered, language === "fr" ? /conservant la correction utile/ : /retaining the useful correction/);
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

test("null response model values remain absent, while zero remains valid", () => {
  const dead = sectionPath("model", "live/model/dead_time_s");
  const constant = sectionPath("model", "live/model/response_time_constant_s");
  const effective = sectionPath("model", "live/analysis/control/effective_dead_time_s");
  const source = sectionPath("model", "live/model/response_source");
  const outcome = sectionPath("model", "live/analysis/deadtime/cool_last_outcome");
  for (const live of [undefined, {}, { analysis: { deadtime: { state: "OFF" } } }, {
    model: { dead_time_s: null, response_time_constant_s: null, response_source: null },
    analysis: { control: { effective_dead_time_s: null }, deadtime: { cool_last_outcome: null } }
  }]) {
    const view = renderer(live);
    for (const item of [dead, constant, effective]) assert.equal(view._formatSourceValue(item), "--");
    for (const item of [source, outcome]) {
      const rendered = templateText(view._renderStatus(item));
      assert.match(rendered, /--/);
      assert.match(rendered, /tone="?muted"?/);
      assert.doesNotMatch(rendered, /Detected|Timed out|Measurement pulses/);
    }
  }
  const view = renderer({ model: { dead_time_s: 0, response_time_constant_s: 0 },
    analysis: { deadtime: { state: "WAITING_HEAT_RESPONSE", waiting_elapsed_s: 0 } } });
  assert.equal(view._formatSourceValue(dead), "0s");
  assert.equal(view._formatSourceValue(constant), "0s");
  assert.match(templateText(view._renderItem(sectionPath("model", "live/analysis/deadtime/waiting_elapsed_s"))), /0s/);
});

test("learning reasons and integral unwind modes translate with neutral future fallbacks", () => {
  const lastReason = sectionPath("learning", "live/learning/last_reason");
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
    model: { response_source: "future_source" }, analysis: { deadtime: { state: "future_state", cool_last_outcome: "future_outcome" } } });
  for (const item of [...integral, lastReason, sectionPath("learning", "live/learning/stage"), sectionPath("model", "live/model/response_source"),
    sectionPath("model", "live/analysis/deadtime/state"), sectionPath("model", "live/analysis/deadtime/cool_last_outcome")]) {
    const rendered = templateText(future._renderStatus(item));
    assert.match(rendered, /future_/);
    assert.match(rendered, /tone="?muted"?/);
    assert.doesNotMatch(rendered, /tone="?warning"?|tone="?danger"?/);
  }
});

const calibrationHero = section("overview").items.find((item) => item.subtitle_key === "hero.overview.calibration");
const heroShown = (item, live) => templateText(renderer(live)._renderItem(item)) !== "";

test("the calibration message follows the plain lowercase calibration states, whatever their case", () => {
  for (const state of ["idle", "Idle", "IDLE", null, undefined]) {
    assert.equal(heroShown(calibrationHero, { control: { phase: "Stable" }, calibration: { state } }), false, String(state));
  }
  for (const state of ["waiting", "rest", "full power", "stop", "Rest"]) {
    assert.equal(heroShown(calibrationHero, { control: { phase: "Stable" }, calibration: { state } }), true, state);
  }
  assert.equal(heroShown(calibrationHero, { control: { phase: "Calibration" }, calibration: { state: "idle" } }), true);
  const others = section("overview").items.filter((item) => ["hero.overview.bootstrap", "hero.overview.pulses", "hero.overview.degraded"].includes(item.subtitle_key));
  assert.equal(heroShown(others[0], { control: { phase: "Hysteresis" }, calibration: { state: "idle" } }), true);
  assert.equal(heroShown(others[1], { control: { phase: "Learning" }, calibration: { state: "idle" } }), true);
  assert.equal(heroShown(others[1], { control: { phase: "Learning" }, calibration: { state: "rest" } }), false);
  assert.equal(heroShown(others[2], { control: { phase: "Learning" }, learning: { stage: "degraded" }, calibration: { state: "idle" } }), false);
  assert.equal(heroShown(others[2], { control: { phase: "Stable" }, learning: { stage: "degraded" }, calibration: { state: "idle" } }), true);
  assert.doesNotMatch(JSON.stringify(dashboard.sections), /"Idle"/u);
});

test("the main card reports a SmartPI calibration only while one runs", () => {
  const attributes = (phase, state) => ({ entity_id: "sensor.diag", state: "stable", attributes: { schema_version: 2, live: { control: { phase }, calibration: { state } } } });
  const climate = { entity_id: "climate.test", state: "heat", attributes: { configuration: { proportional_function: "smartpi" }, specific_states: { regulation_diagnostics: "sensor.diag" } } };
  const messages = (phase, state) => buildVtViewModel({ entity: "climate.test" }, { states: { "climate.test": climate, "sensor.diag": attributes(phase, state) } }, climate)
    .messages.map((message) => message.key);
  for (const state of ["idle", "Idle", "IDLE"]) assert.ok(!messages("Stable", state).includes("smartpi_calibration"), state);
  assert.ok(!messages("Learning", "idle").includes("smartpi_calibration"));
  for (const state of ["waiting", "rest", "full power", "stop"]) assert.ok(messages("Stable", state).includes("smartpi_calibration"), state);
  assert.ok(messages("Calibration", "idle").includes("smartpi_calibration"));
});

test("the calibration block shows the pulses, the result, the reading against the values in use and the corrections", () => {
  const paths = [...walk(section("health"))].map((entry) => entry.path).filter(Boolean);
  for (const leaf of ["state", "pulses_done", "result", "last_request", "last_time", "reading_a", "in_force_a", "reading_b", "in_force_b", "reading_lag_s", "in_force_lag_s", "corrected"]) {
    assert.ok(paths.includes(`live/calibration/${leaf}`), leaf);
  }
  assert.doesNotMatch(JSON.stringify(dashboard), /autocalib|retry_count|response_lag/u);
  const live = { calibration: { state: "full power", pulses_done: 2, result: "readings agree", last_request: "refused: too soon",
    reading_a: 0.0123, in_force_a: 0.02, reading_lag_s: 900, in_force_lag_s: 1500 } };
  const view = renderer(live);
  const render = (leaf) => templateText(view._renderStatus(sectionPath("health", `live/calibration/${leaf}`)));
  for (const [language, state, result, request] of [["en", /Pulse: full power/, /Two readings agree/, /less than 24 h/], ["fr", /Impulsion : pleine puissance/, /Deux lectures concordent/, /moins de 24 h/]]) {
    view.language = language;
    assert.match(render("state"), state);
    assert.match(render("result"), result);
    assert.match(render("last_request"), request);
  }
  view.language = "en";
  assert.equal(view._formatSourceValue(sectionPath("health", "live/calibration/pulses_done")), "2");
  assert.equal(view._formatSourceValue(sectionPath("health", "live/calibration/reading_a")), "0.01230 °C/min");
  assert.match(view._formatSourceValue(sectionPath("health", "live/calibration/in_force_lag_s")), /^25\s?m/u);
  const corrected = sectionPath("health", "live/calibration/corrected");
  // `corrected` is a list of plain names, read by the status as its comma-joined text.
  for (const [list, label] of [[[], /Nothing corrected/], [["heating rate"], /Heating rate/]]) {
    view.hass.states["sensor.diag"].attributes.live.calibration.corrected = list;
    assert.match(templateText(view._renderItem(corrected)), label);
  }
  view.hass.states["sensor.diag"].attributes.live.calibration.result = null;
  assert.equal(templateText(view._renderItem(corrected)), "");
  assert.match(render("state"), /Pulse/);
  view.hass.states["sensor.diag"].attributes.live.calibration.state = "idle";
  assert.match(render("state"), /No calibration in progress/);
});

test("the response model sits next to the dead times with its source, confidence and prediction error", () => {
  const view = renderer({ model: { dead_time_s: 300, response_time_constant_s: 1200, response_source: "measurement pulses", response_confidence: "dead time assumed" },
    analysis: { control: { effective_dead_time_s: 900 }, learning: { response_model: { prediction_rms_c: 0.042 } } } });
  assert.match(view._formatSourceValue(sectionPath("model", "live/model/dead_time_s")), /^5\s?m/u);
  assert.match(view._formatSourceValue(sectionPath("model", "live/model/response_time_constant_s")), /^20\s?m/u);
  assert.match(view._formatSourceValue(sectionPath("model", "live/analysis/control/effective_dead_time_s")), /^15\s?m/u);
  assert.equal(view._formatSourceValue(sectionPath("model", "live/analysis/learning/response_model/prediction_rms_c")), "0.042 °C");
  for (const [language, source, confidence] of [["en", /Measurement pulses/, /Dead time assumed/], ["fr", /Impulsions de mesure/, /Temps mort supposé/]]) {
    view.language = language;
    assert.match(templateText(view._renderStatus(sectionPath("model", "live/model/response_source"))), source);
    assert.match(templateText(view._renderStatus(sectionPath("model", "live/model/response_confidence"))), confidence);
  }
  const items = section("model").items;
  const deadTimes = items.findIndex((item) => [...walk(item)].some((entry) => entry.path === "live/model/deadtime_heat_s"));
  assert.equal(items[deadTimes + 1].title_key, "groups.model.response");
});

test("the learning block reason, the direct-start labels, the cut mode and the new integral holds are translated", () => {
  const block = sectionPath("learning", "live/learning/block_reason");
  assert.deepEqual(block.visible_if, { var: "diagnostic/live/learning/block_reason" });
  const learning = section("learning").items;
  assert.equal(learning.indexOf(block), learning.findIndex((item) => item.path === "live/learning/enabled") + 1);
  const checks = [
    ["learning", "live/learning/block_reason", { learning: { block_reason: "heating unavailable" } }, /Heating unavailable/, /Chauffage indisponible/],
    ["learning", "live/learning/block_reason", { learning: { block_reason: "disturbance" } }, /Disturbance/, /Perturbation/],
    ["learning", "live/learning/stage", { learning: { stage: "measurement pulses" } }, /Measurement pulses/, /Impulsions de mesure/],
    ["model", "live/model/confidence", { model: { confidence: "ab_learning" } }, /Initial model learning/, /Apprentissage initial du modèle/],
    ["health", "live/control/mode", { control: { mode: "heating cut above the setpoint" } }, /Heating cut above the setpoint/, /Chauffage coupé au-dessus de la consigne/],
    ["health", "live/temperature/integral_hold_source", { temperature: { integral_hold_source: "calibration_recovery" } }, /calibration pulse/, /impulsion de calibration/],
    ["health", "live/temperature/integral_hold_source", { temperature: { integral_hold_source: "heating_unavailable" } }, /Heating unavailable/, /Chauffage indisponible/],
    ["health", "live/temperature/integral_hold_source", { temperature: { integral_hold_source: "heating_unavailable_resume" } }, /Resume after heating unavailable/, /Reprise après chauffage indisponible/],
    ["health", "live/temperature/integral_hold_mode", { temperature: { integral_hold_mode: "heating_unavailable_resume" } }, /Resume after heating unavailable/, /Reprise après chauffage indisponible/],
    ["overview", "live/temperature/integral_mode", { temperature: { integral_mode: "I:HOLD(heating_unavailable_resume)" } }, /Integral held/, /Intégrale maintenue/]
  ];
  for (const [id, path, live, english, french] of checks) {
    const view = renderer(live);
    const item = sectionPath(id, path);
    assert.match(templateText(view._renderStatus(item)), english, path);
    view.language = "fr";
    assert.match(templateText(view._renderStatus(item)), french, path);
    assert.doesNotMatch(templateText(view._renderStatus(item)), /status-pill raw/u);
  }
  assert.equal(templateText(renderer({ learning: { block_reason: null } })._renderItem(block)), "");
});

test("history covers all nineteen published Recorder paths and keeps compact approach graphs separate", () => {
  const histories = nodes.filter((entry) => entry.type === "history");
  const diagnosticPaths = new Set(histories.flatMap((entry) => entry.series).filter((entry) => entry.entity === "$diagnostic_entity").map((entry) => entry.attribute));
  assert.equal(published.source.version, "1.0-dev");
  assert.equal(diagnosticPaths.size, 19);
  assert.deepEqual(diagnosticPaths, new Set(published.history.map((path) => `history/${path}`)));
  const [thermal, command] = section("anticipation").items.filter((entry) => entry.type === "history");
  assert.equal(thermal.range, "6h");
  assert.equal(command.range, thermal.range);
  assert.ok(thermal.series.every((entry) => entry.scale_group === "temperature" && entry.unit === "°C"));
  assert.ok(command.series.every((entry) => entry.scale_group === "power" && entry.unit === "%"));
  const view = renderer({});
  const config = view._betterHistoryConfig(thermal);
  assert.equal(config.debugPerformance, false);
  assert.ok(config.series.some((entry) => entry.entity === "climate.test" && entry.attribute.join("/") === "temperature"));
  assert.equal(config.series.length, 3);
  assert.ok(config.series.some((entry) => entry.attribute.join("/") === "history/temperature/anticipated"));
  assert.ok(config.series.every((entry) => !entry.attribute.join("/").includes("setpoint/")));
});

test("command histories resolve integral and PI gains with distinct physical scales and translated labels", () => {
  const histories = section("command").items.filter((entry) => entry.type === "history");
  assert.deepEqual(histories.map((entry) => entry.title_key), ["graphs.command.title", "graphs.command.integral", "graphs.command.gains"]);
  const [, integral, gains] = histories;
  const units = JSON.parse(readFileSync(new URL("../src/data/attributes.json", import.meta.url)));
  for (const language of ["en", "fr"]) {
    const view = renderer({});
    view.language = language;
    const integralConfig = view._betterHistoryConfig(integral);
    assert.equal(integralConfig.hours, 12);
    assert.deepEqual(integralConfig.series, [{ entity: "sensor.diag", attribute: ["history", "temperature", "integral_error"], label: language === "fr" ? "Intégrale" : "Integral", unit: "°C·min", group: "integral", color: undefined, forced: true }]);
    const gainsConfig = view._betterHistoryConfig(gains);
    assert.equal(gainsConfig.hours, integralConfig.hours);
    assert.deepEqual(gainsConfig.series.map((entry) => [entry.attribute.join("/"), entry.label, entry.unit, entry.group]), [
      ["history/control/kp", "Kp", "1/°C", "pi_gains"],
      ["history/control/ki", "Ki", "1/(°C·min)", "pi_gains"]
    ]);
    for (const config of [integralConfig, gainsConfig]) {
      assert.equal(config.debugPerformance, false);
      assert.equal(config.showScale, true);
      for (const series of config.series) {
        assert.equal(series.entity, "sensor.diag");
        assert.equal(series.unit, units[series.attribute.join(".")]);
      }
    }
  }
});

test("integral live metric preserves zero, negative values and unavailable values in HEAT and COOL", () => {
  const metric = sectionPath("command", "live/temperature/integral_error");
  for (const mode of ["heat", "cool"]) {
    for (const [value, expected] of [[0, "0.000 °C·min"], [-12.5, "-12.500 °C·min"], [null, "--"], [undefined, "--"]]) {
      assert.equal(renderer({ temperature: { integral_error: value } }, mode)._formatSourceValue(metric), expected);
    }
  }
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

test("room holding ratios divide the corresponding models safely before percent conversion", () => {
  const ratios = [...walk(section("room_model"))].filter((item) => item.divide_by);
  assert.equal(ratios.length, 2);
  for (const mode of ["heat", "cool"]) {
    for (const [a, b, expected] of [
      [0.2, 0.001, "0.500 %/°C"], [0.25, 0, "0.000 %/°C"],
      [0, 0.001, "--"], [-0.2, 0.001, "--"], [null, 0.001, "--"],
      [undefined, 0.001, "--"], [0.2, null, "--"], [0.2, undefined, "--"],
      [Infinity, 0.001, "--"], [0.2, NaN, "--"], ["bad", 0.001, "--"],
      ["0.2", "0.001", "0.500 %/°C"]
    ]) {
      const view = renderer({ room_model: { a, b_eq: b }, model: { a, b } }, mode);
      for (const ratio of ratios) {
        assert.equal(view._formatSourceValue(ratio), expected);
        assert.match(templateText(view._renderMetric(ratio)), new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")));
      }
    }
  }
  const view = renderer({ room_model: { a: 0.2, b_eq: 0.001 }, model: { a: 0.1, b: 0.003 } });
  assert.deepEqual(ratios.map((item) => view._formatSourceValue(item)), ["0.500 %/°C", "3.000 %/°C"]);
  assert.equal(view._formatSourceValue({ ...ratios[0], type: "value" }), "0.500 %/°C");
});

test("all forecast horizons compare model RMSE, unchanged-temperature RMSE and checked forecasts", () => {
  const horizons = ["1h", "2h", "6h", "12h"];
  const forecast_c = { "1h": 20, "2h": 19.5, "6h": 18, "12h": 17 };
  const view = renderer({ room_model: {
    forecast_c, forecast_error_c: { "1h": 0, "2h": 0.2, "6h": 0.4, "12h": null },
    unchanged_temperature_error_c: { "1h": 0.1, "2h": 0.1, "6h": 0.8, "12h": null },
    forecast_checks: { "1h": 10, "2h": 10, "6h": 4, "12h": 0 }
  } });
  for (const language of ["en", "fr"]) {
    view.language = language;
    for (const horizon of horizons) {
      const card = nodes.find((item) => item.title_key === `groups.room.accuracy.${horizon}`);
      assert.deepEqual(card.metrics.map((item) => item.path), [
        `live/room_model/forecast_error_c/${horizon}`,
        `live/room_model/unchanged_temperature_error_c/${horizon}`,
        `live/room_model/forecast_checks/${horizon}`
      ]);
      const rendered = templateText(view._renderMetricGrid(card));
      assert.match(rendered, language === "fr" ? /Erreur du modèle/ : /Model error/);
      assert.match(rendered, language === "fr" ? /Erreur si température inchangée/ : /Unchanged-temperature error/);
      assert.match(rendered, language === "fr" ? /Prévisions vérifiées/ : /Forecasts checked/);
      assert.equal(view._formatSourceValue(sectionPath("room_model", `live/room_model/forecast_c/${horizon}`)), `${forecast_c[horizon].toFixed(2)} °C`);
    }
  }
  assert.equal(view._formatSourceValue(sectionPath("room_model", "live/room_model/forecast_error_c/1h")), "0.000 °C");
  assert.equal(view._formatSourceValue(sectionPath("room_model", "live/room_model/forecast_error_c/12h")), "--");
  assert.equal(view._formatSourceValue(sectionPath("room_model", "live/room_model/forecast_checks/12h")), "0");
});

test("room identification guidance handles learning, coarse sensors, unsupported valves and retained models", () => {
  const waiting = nodes.find((item) => item.text_key === "notes.room.waiting");
  const sensor = nodes.find((item) => item.text_key === "notes.room.sensor");
  const status = sectionPath("room_model", "live/room_model/status");
  const refusal = sectionPath("room_model", "live/room_model/last_refusal_reason");
  for (const [code, label] of [
    ["learning", "Learning"], ["identified", "Model with walls identified"],
    ["simple model", "Simple model without walls"],
    ["not identified: valve heaters are not supported yet", "Not identified: valve heaters are not supported yet"]
  ]) {
    const view = renderer({ room_model: { status: code, a: 0.2, b_eq: 0.001,
      last_refusal_reason: "waiting for a second series of quiet periods to confirm" } });
    assert.ok(templateText(view._renderStatus(status)).includes(label));
    assert.equal(templateText(view._renderItem(waiting)) !== "", !["identified", "simple model"].includes(code));
    assert.equal(templateText(view._renderItem(sensor)) !== "", code === "simple model");
    assert.match(templateText(view._renderStatus(refusal)), /Waiting for a second series/);
    assert.equal(view._formatSourceValue(sectionPath("room_model", "live/room_model/a")), "0.20000 °C/min");
    view.language = "fr";
    if (code === "learning") {
      assert.match(templateText(view._renderItem(waiting)), /6 jours/);
      assert.match(templateText(view._renderItem(waiting)), /0,1 °C/);
      assert.match(templateText(view._renderItem(waiting)), /vanne/);
    }
    if (code === "simple model") assert.match(templateText(view._renderItem(sensor)), /0,015 °C/);
  }
  for (const code of ["recovering after an open window", "paused (SmartPI not heating or not in control)", "settling after a restart"]) {
    const view = renderer({ room_model: { tracking: code, wall_extra_power_percent: null } });
    view.language = "fr";
    assert.doesNotMatch(templateText(view._renderStatus(sectionPath("room_model", "live/room_model/tracking"))), new RegExp(code.replace(/[()]/gu, "\\$&")));
    assert.equal(view._formatSourceValue(sectionPath("room_model", "live/room_model/wall_extra_power_percent")), "--");
  }
});

test("feedforward uses all four published sources and preserves signed wall power with its history ribbon", () => {
  const current = sectionPath("command", "live/feedforward/source");
  const chart = section("command").items.find((item) => item.title_key === "graphs.command.title");
  for (const source of ["learned model", "room model (air and walls)", "room model (static part)", "room model (simple)"]) {
    const view = renderer({ feedforward: { source, wall_power_percent: -12.5 } });
    for (const language of ["en", "fr"]) {
      view.language = language;
      const text = templateText(view._renderStatus(current));
      assert.doesNotMatch(text, /--/);
      if (language === "fr") assert.match(text, /Modèle/);
      assert.equal(view._formatSourceValue(sectionPath("command", "live/feedforward/wall_power_percent")), "-12.5 %");
      const config = view._betterHistoryConfig(chart);
      const ribbon = config.series.find((item) => item.attribute?.join("/") === "history/feedforward/source");
      assert.equal(ribbon.group, "power");
      assert.equal(ribbon.unit, undefined);
      assert.equal(ribbon.entity, "sensor.diag");
      const powers = config.series.filter((item) => ["history/feedforward/wall_power_percent", "history/power/ff_percent", "history/power/pi_percent"].includes(item.attribute?.join("/")));
      assert.equal(powers.length, 3);
      assert.ok(powers.every((item) => item.group === ribbon.group && item.unit === "%"));
    }
  }
  for (const value of [0, 12.5, -12.5, null, undefined]) {
    const view = renderer({ room_model: { wall_extra_power_percent: value }, feedforward: { wall_power_percent: value } });
    for (const item of [sectionPath("room_model", "live/room_model/wall_extra_power_percent"), sectionPath("command", "live/feedforward/wall_power_percent")]) {
      assert.equal(view._formatSourceValue(item), value == null ? "--" : `${value.toFixed(1)} %`);
    }
  }
});

test("emitter diagnostics distinguish the dead time in force, accepted mornings and the latest evaluated morning", () => {
  const live = { learning: { enabled: false }, tar_learning: {
    status: "active", applied_s: 1800, gains_s: 900, bootstrap_s: 1200, source: "refined", out_of_bound: false,
    fast: { value_s: 1500, confirmed_mornings: 3, last_value_s: 1560, last_status: "unconfirmed",
      last_unconfirmed_reason: "night with at least 1 hour without heating between 23:00 and the comfort step",
      last_morning: { day: "2026-11-08", accepted: false, reason: "temperature rise too small", room_class: "undetermined" } },
    refined: { tau_e_s: 1800, class: "thermal_mass", k_per_s: 0.0002, tau_w_h: 24,
      last_evaluation: { day: "2026-11-08", regulated_nights: false } },
    night_room_class: "no_thermal_mass", data_invalid_reason: "window open"
  } };
  const view = renderer(live);
  for (const [path, expected] of [["applied_s", "30m"], ["gains_s", "15m"], ["bootstrap_s", "20m"],
    ["fast/value_s", "25m"], ["fast/confirmed_mornings", "3"], ["fast/last_value_s", "26m"],
    ["fast/last_morning/day", "2026-11-08"], ["refined/tau_e_s", "30m"]]) {
    assert.equal(view._formatSourceValue(sectionPath("tar_learning", `live/tar_learning/${path}`)), expected);
  }
  for (const language of ["en", "fr"]) {
    view.language = language;
    const render = (path) => templateText(view._renderStatus(sectionPath("tar_learning", `live/tar_learning/${path}`)));
    assert.match(render("status"), language === "fr" ? /Apprentissage actif/ : /Learning active/);
    assert.match(render("source"), language === "fr" ? /Identification affinée/ : /Refined identification/);
    assert.match(render("fast/last_morning/accepted"), language === "fr" ? /Non/ : /No/);
    assert.match(render("fast/last_morning/reason"), language === "fr" ? /Montée en température trop faible/ : /Temperature rise too small/);
    assert.match(render("refined/class"), language === "fr" ? /inertie thermique/ : /thermal mass/);
    assert.match(render("night_room_class"), language === "fr" ? /sans inertie/ : /without detected thermal mass/);
    assert.match(render("data_invalid_reason"), language === "fr" ? /Fenêtre ouverte/ : /Window open/);
    live.tar_learning.out_of_bound = true;
    assert.match(render("out_of_bound"), /tone="?warning"?/);
  }
  assert.doesNotMatch(JSON.stringify(section("tar_learning")), /tar_learning\/(?:gate|path|enabled)/u);
  assert.match(translate(dashboard, "fr", "notes.emitter.intro"), /sans option/);
});

test("absent 0.7 blocks, null scores and future enums stay unavailable or neutral", () => {
  for (const live of [undefined, {}, { room_model: null, tar_learning: null, feedforward: { source: null, wall_power_percent: null } }]) {
    const view = renderer(live);
    for (const id of ["room_model", "tar_learning"]) {
      for (const item of walk(section(id))) {
        if (item.type === "value" || item.source === "diagnostic" && item.digits !== undefined) {
          assert.equal(view._formatSourceValue(item), "--", item.path);
        }
      }
    }
  }
  const view = renderer({ room_model: { status: "future_room", tracking: "future_tracking", walls: "future_walls", last_refusal_reason: "future_refusal" },
    tar_learning: { status: "future_delay", source: "future_source", data_invalid_reason: "future_exclusion", refined: { class: "future_class" } },
    feedforward: { source: "future_feedforward" } });
  for (const [id, paths] of [["room_model", ["status", "tracking", "walls", "last_refusal_reason"]],
    ["tar_learning", ["status", "source", "data_invalid_reason", "refined/class"]], ["command", ["source"]]]) {
    for (const path of paths) {
      const item = sectionPath(id, `live/${id === "command" ? "feedforward" : id}/${path}`);
      const text = templateText(view._renderStatus(item));
      assert.match(text, /future_/);
      assert.match(text, /tone="?muted"?/);
    }
  }
});

test("new histories keep coefficient units, recorded forecast errors and applied seconds without live substitutions", () => {
  const view = renderer({});
  const parameters = section("room_model").items.find((item) => item.title_key === "graphs.room.parameters");
  const coefficients = view._betterHistoryConfig(parameters);
  assert.equal(coefficients.hours, 24);
  assert.equal(coefficients.showTimeRangeSelector, true);
  assert.deepEqual(coefficients.series.map((item) => [item.attribute.join("/"), item.unit]), [
    ["history/model/a", "°C/min"], ["history/room_model/a", "°C/min"],
    ["history/model/b", "min⁻¹"], ["history/room_model/b_eq", "min⁻¹"]
  ]);
  assert.ok(coefficients.series.every((item) => item.group === "room_coefficients"));
  const errors = view._betterHistoryConfig(section("room_model").items.find((item) => item.title_key === "graphs.room.errors"));
  assert.equal(errors.hours, 24);
  assert.equal(errors.showTimeRangeSelector, true);
  assert.deepEqual(errors.series.map((item) => item.attribute.join("/")), ["history/room_model/forecast_error_1h_c", "history/room_model/forecast_error_12h_c"]);
  assert.ok(errors.series.every((item) => item.unit === "°C" && item.group === "forecast_error"));
  const delay = view._betterHistoryConfig(section("tar_learning").items.find((item) => item.type === "history"));
  assert.equal(delay.hours, 168);
  assert.equal(delay.series[0].attribute.join("/"), "history/deadtime/applied_s");
  assert.equal(delay.series[0].unit, "s");
  const units = JSON.parse(readFileSync(new URL("../src/data/attributes.json", import.meta.url)));
  for (const config of [coefficients, errors, delay]) {
    assert.equal(config.debugPerformance, false);
    for (const item of config.series) assert.equal(item.unit, units[item.attribute.join(".")]);
  }
});

test("emitter lag learning shows the gain reference, the limit on the learned emitter lag and the lower bound", () => {
  const live = { tar_learning: { status: "active", source: "lower_bound", applied_s: 1200, gains_s: 600, bootstrap_s: 600, reference_s: 600,
    out_of_bound: true, limit_reason: "learned delay shorter than the reference: the gains keep the reference dead time",
    fast: { value_s: null, confirmed_mornings: 0, lower_bound_s: 540, lower_bound_mornings: 2 } } };
  const view = renderer(live);
  for (const [path, expected] of [["reference_s", "10m"], ["fast/lower_bound_s", "9m"], ["fast/lower_bound_mornings", "2"]]) {
    assert.equal(view._formatSourceValue(sectionPath("tar_learning", `live/tar_learning/${path}`)), expected);
  }
  const render = (path) => templateText(view._renderStatus(sectionPath("tar_learning", `live/tar_learning/${path}`)));
  for (const [language, source, limit, bounded] of [
    ["en", /Lower bound \(rise cut by sunrise\)/, /Learned emitter lag shorter than the reference/, /Learned emitter lag limited/],
    ["fr", /Borne basse \(montée coupée par le lever du soleil\)/, /Retard de l’émetteur appris plus court que la référence/, /Retard de l’émetteur appris limité/]]) {
    view.language = language;
    assert.match(render("source"), source);
    assert.match(render("limit_reason"), limit);
    assert.match(render("out_of_bound"), bounded);
  }
  const limit = sectionPath("tar_learning", "live/tar_learning/limit_reason");
  assert.deepEqual(limit.visible_if, { var: "diagnostic/live/tar_learning/limit_reason" });
  view.language = "en";
  live.tar_learning.limit_reason = "future limit";
  assert.match(render("limit_reason"), /future limit/);
  assert.match(render("limit_reason"), /tone="?muted"?/);
  for (const absent of [null, undefined]) {
    const none = renderer({ tar_learning: { limit_reason: absent, reference_s: absent, fast: { lower_bound_s: absent, lower_bound_mornings: absent } } });
    for (const path of ["reference_s", "fast/lower_bound_s", "fast/lower_bound_mornings"]) {
      assert.equal(none._formatSourceValue(sectionPath("tar_learning", `live/tar_learning/${path}`)), "--");
    }
  }
  assert.match(translate(dashboard, "fr", "notes.emitter.bounds"), /référence/);
  assert.doesNotMatch(translate(dashboard, "en", "notes.emitter.bounds"), /half and twice/);
});

test("emitter evaluation dates are local dates, with confirmation and the 0.7 comfort step reasons", () => {
  const live = { tar_learning: { fast: { last_morning: { day: "2026-11-12", accepted: false, confirmed: false,
    reason: "comfort step cut by sunrise: gives only a lower bound of the delay, not a value",
    unconfirmed_reason: "the room did not reach its low setpoint before the comfort step" } },
  refined: { last_evaluation: { day: "2026-11-13", regulated_nights: true } } } };
  const view = renderer(live);
  assert.equal(view._formatSourceValue(sectionPath("tar_learning", "live/tar_learning/fast/last_morning/day")), "2026-11-12");
  assert.equal(view._formatSourceValue(sectionPath("tar_learning", "live/tar_learning/refined/last_evaluation/day")), "2026-11-13");
  assert.equal(sectionPath("tar_learning", "live/tar_learning/fast/last_morning/day").digits, undefined);
  const render = (path) => templateText(view._renderStatus(sectionPath("tar_learning", `live/tar_learning/${path}`)));
  for (const language of ["en", "fr"]) {
    view.language = language;
    assert.match(render("fast/last_morning/confirmed"), language === "fr" ? /Non confirmé/ : /Unconfirmed/);
    assert.match(render("fast/last_morning/unconfirmed_reason"), language === "fr" ? /n’a pas atteint sa consigne basse/ : /did not reach its low setpoint/);
    assert.match(render("fast/last_morning/reason"), language === "fr" ? /ne donne qu’une borne basse/ : /gives only a lower bound/);
  }
  assert.doesNotMatch(JSON.stringify(section("tar_learning")), /kept as a lower bound/u);
  for (const [code, english] of [
    ["home position unknown: the absence of sun cannot be checked", /Home position unknown/],
    ["comfort step in daylight", /Comfort step in daylight/],
    ["no quiet period before the comfort step (dark, constant setpoint and valid data for at least 1 hour)", /No quiet period/],
    ["low setpoint not held in the dark with valid data for the 2 hours before the comfort step", /Low setpoint not held in the dark/],
    ["sunrise too soon after the comfort step", /Sunrise too soon/],
    ["comfort step cut by sunrise before its response could be measured", /cut by sunrise before its response/],
    ["setpoint restored after a restart, not a comfort step", /Setpoint restored after a restart/]]) {
    live.tar_learning.fast.last_morning.reason = code;
    view.language = "en";
    assert.match(render("fast/last_morning/reason"), english);
    assert.match(render("fast/last_morning/reason"), /tone="?(muted|info)"?/);
  }
  const unconfirmed = renderer({ tar_learning: { fast: { last_morning: { confirmed: true, unconfirmed_reason: null, reason: "future reason" } } } });
  assert.deepEqual(sectionPath("tar_learning", "live/tar_learning/fast/last_morning/unconfirmed_reason").visible_if,
    { var: "diagnostic/live/tar_learning/fast/last_morning/unconfirmed_reason" });
  assert.match(templateText(unconfirmed._renderStatus(sectionPath("tar_learning", "live/tar_learning/fast/last_morning/reason"))), /future reason/);
});

// Generic prefix_map behavior of status items, exercised on a published integral-mode path.
const prefixStatus = {
  type: "status", source: "diagnostic", path: "live/temperature/integral_mode", map: {},
  prefix_map: {
    frozen_: { label: "Frozen: {value}", tone: "muted", suffix_map: { reboot: { label: "recent restart" } } },
    pi_mode_: { label: "Integral: {value}", tone: "info", suffix_map: { "I:HOLD": { label: "held" } }, argument_map: { window_resume: { label: "resume after open window" } } },
    pending_: { label: "Confirming: {value}", tone: "info" }
  },
  fallback: { tone: "muted", icon: "mdi:help-circle-outline" },
  fallback_show_value: true
};
const prefixed = (code) => templateText(renderer({ temperature: { integral_mode: code } })._renderStatus(prefixStatus));

test("status prefix_map keeps the prefix, translates the suffix and falls back to the raw code", () => {
  assert.match(prefixed("frozen_reboot"), /Frozen: recent restart/);
  assert.match(prefixed("frozen_future_reason"), /Frozen: future_reason/);
  assert.match(prefixed("pending_2/3"), /Confirming: 2\/3/);
  assert.match(prefixed("pi_mode_I:HOLD"), /Integral: held/);
  assert.match(prefixed("pi_mode_I:HOLD(window_resume)"), /held \(resume after open window\)/);
  assert.match(prefixed("pi_mode_I:HOLD(future_source)"), /held \(future_source\)/);
  const unknown = prefixed("future_code");
  assert.match(unknown, /future_code/);
  assert.match(unknown, /tone="?muted"?/);
  assert.match(unknown, /status-pill raw/);
  assert.match(prefixed("frozen_"), /status-pill raw/);
});

test("room model refusals use the current quiet-period wording and cover the heat balance checks", () => {
  const status = sectionPath("room_model", "live/room_model/status");
  const refusal = sectionPath("room_model", "live/room_model/last_refusal_reason");
  for (const [code, english, french] of [
    ["the recorded data do not cover the quiet periods", /recorded data do not cover/, /ne couvrent pas encore les périodes calmes/],
    ["too few valid measurements in the quiet periods", /Too few valid measurements/, /Trop peu de mesures valides/],
    ["the quiet periods do not determine the model precisely enough yet", /do not determine the model/, /ne déterminent pas encore le modèle/],
    ["the model's heat loss disagrees with the measured heat balance", /heat loss disagrees/, /ne concordent pas avec le bilan thermique/],
    ["waiting for a qualified heat balance to check the model's heat loss", /qualified heat balance/, /bilan thermique qualifié/]]) {
    const view = renderer({ room_model: { last_refusal_reason: code } });
    assert.match(templateText(view._renderStatus(refusal)), english);
    assert.doesNotMatch(templateText(view._renderStatus(refusal)), /status-pill raw/);
    view.language = "fr";
    assert.match(templateText(view._renderStatus(refusal)), french);
  }
  for (const [code, english] of [["not identified: the model's heat loss disagrees with the measured heat balance", /Not identified: the model's heat loss disagrees/],
    ["not identified: the quiet periods do not determine the model precisely enough yet", /Not identified: the quiet periods/]]) {
    assert.match(templateText(renderer({ room_model: { status: code } })._renderStatus(status)), english);
  }
  // Waiting reasons keep the status at `learning`, so no `not identified` status exists for them.
  assert.ok(!Object.keys(status.map).some((key) => /recorded data|heat balance to check|second series/u.test(key)));
});
