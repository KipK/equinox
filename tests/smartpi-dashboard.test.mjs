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
