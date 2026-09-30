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
const section = (id) => dashboard.sections.find((entry) => entry.id === id);
function* walk(value) {
  if (!value || typeof value !== "object") return;
  yield value;
  for (const child of Object.values(value)) yield* walk(child);
}
const nodes = [...walk(dashboard.sections)];
const approach = [...walk(section("anticipation"))];
const byPath = (path) => approach.find((entry) => entry.path === path);
const governor = "live/analysis/reference_governor/";

function renderer(live, mode = "heat") {
  const result = new EquinoxRegulationRenderer();
  result.config = { entity: "climate.test" };
  result.dashboard = dashboard;
  result.language = "en";
  result.activeSectionId = "anticipation";
  result.hass = { states: {
    "climate.test": { entity_id: "climate.test", state: mode, attributes: { temperature: 21, specific_states: { regulation_diagnostics: "sensor.diag" } } },
    ...(live === undefined ? {} : { "sensor.diag": { entity_id: "sensor.diag", state: "PI", attributes: { schema_version: 2, live } } })
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

test("eight sections retain navigation IDs, with no legacy bindings or unused translations", () => {
  assert.deepEqual(dashboard.sections.map((entry) => entry.id), ["overview", "command", "anticipation", "model", "learning", "fftrim", "health", "actions"]);
  assert.doesNotMatch(JSON.stringify(dashboard), /landing|user_setpoint"\s*,\s*"source"\s*:\s*"diagnostic/);
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

test("governed shaping, thermal constraint and cap effect stay separate", () => {
  const view = renderer({ analysis: { reference_governor: { active: true, phase: "governed", reason: "cap", constraint_active: false, command_cap: 0.35, command_before_cap: 0.6, command_after_cap: 0.35 } } });
  assert.match(templateText(view._renderStatus(byPath(governor + "phase"))), /Governed approach/);
  assert.match(templateText(view._renderStatus(byPath(governor + "constraint_active"))), /tone="?muted"?/);
  assert.equal(view._formatSourceValue(byPath(governor + "command_cap")), "35.0 %");
  assert.equal(view._formatSourceValue(byPath(governor + "command_before_cap")), "60.0 %");
  assert.equal(view._formatSourceValue(byPath(governor + "command_after_cap")), "35.0 %");
});

test("release and handoff are independent, including braking_needed=false", () => {
  const view = renderer({ setpoint: { trajectory_active: true, trajectory_source: "setpoint" }, analysis: { trajectory: { phase: "release", braking_needed: false }, reference_governor: { active: true, phase: "handoff", reason: "handoff_waiting" } } });
  assert.match(templateText(view._renderStatus(byPath("live/analysis/trajectory/phase"))), /Progressive return to setpoint/);
  assert.match(templateText(view._renderStatus(byPath(governor + "phase"))), /Handoff/);
  assert.match(templateText(view._renderStatus(byPath(governor + "active"))), /Active/);
  assert.ok(view._conditionMatches(approach.find((entry) => entry.title_key === "groups.approach.readiness").visible_if));
});

test("retirement drops previous cap/forecast and leaves an explicit neutral inactive state", () => {
  const view = renderer({ analysis: { reference_governor: { active: true, phase: "governed", command_cap: 0.2, predicted_terminal_temperature: 21.2 } } });
  assert.equal(view._formatSourceValue(byPath(governor + "command_cap")), "20.0 %");
  view.hass.states["sensor.diag"].attributes.live = { setpoint: { filtered_setpoint: 21, trajectory_active: false, trajectory_source: "none" }, analysis: { trajectory: { phase: "idle" }, reference_governor: { active: false, phase: "idle", reason: "inactive", command_cap: null, nominal_reference: null, admissible_reference: null, predicted_terminal_temperature: null, target_bound: null, dynamic_reserve_c: null, coast_required: false, command_before_cap: 0.4, command_after_cap: 0.4 } } };
  for (const name of ["command_cap", "nominal_reference", "admissible_reference", "predicted_terminal_temperature", "target_bound", "dynamic_reserve_c"]) assert.equal(view._formatSourceValue(byPath(governor + name)), "--");
  for (const name of ["active", "phase", "reason"]) {
    const text = templateText(view._renderStatus(byPath(governor + name)));
    assert.match(text, /Inactive/);
    assert.match(text, /tone="?muted"?/);
    assert.doesNotMatch(text, /tone="?warning"?|tone="?danger"?|successful|plateau/i);
  }
  assert.equal(view._formatSourceValue(byPath("live/setpoint/filtered_setpoint")), "21.00 °C");
  assert.equal(view._formatSourceValue(byPath(governor + "command_before_cap")), "40.0 %");
  assert.equal(view._conditionMatches(approach.find((entry) => entry.title_key === "groups.approach.details").visible_if), false);
});

test("missing/null diagnostics are absent while cap zero and false remain valid", () => {
  for (const live of [undefined, {}, { analysis: { reference_governor: { command_cap: null, active: null } } }]) {
    const view = renderer(live);
    assert.equal(view._formatSourceValue(byPath(governor + "command_cap")), "--");
    const text = templateText(view._renderStatus(byPath(governor + "active")));
    assert.match(text, /tone="?muted"?/);
    assert.doesNotMatch(text, />Active</);
  }
  const view = renderer({ analysis: { reference_governor: { command_cap: 0, coast_required: false } } });
  const cap = byPath(governor + "command_cap");
  assert.equal(view._formatSourceValue(cap), "0.0 %");
  assert.ok(view._conditionMatches(cap.visible_if));
  assert.match(templateText(view._renderStatus(byPath(governor + "coast_required"))), /tone="?muted"?/);
});

test("unknown enums expose the raw code with neutral styling", () => {
  const view = renderer({ analysis: { trajectory: { phase: "future_release" }, reference_governor: { phase: "future_phase", reason: "future_reason" } } });
  for (const path of ["live/analysis/trajectory/phase", governor + "phase", governor + "reason"]) {
    const text = templateText(view._renderStatus(byPath(path)));
    assert.match(text, /future_/);
    assert.match(text, /tone="?muted"?/);
    assert.doesNotMatch(text, /tone="?warning"?|tone="?danger"?/);
  }
});

test("HEAT/COOL preserve physical temperatures and convert ratios only once", () => {
  for (const mode of ["heat", "cool"]) {
    const view = renderer({ power: { applied_percent: 45 }, analysis: { reference_governor: { target_bound: 20.8, dynamic_reserve_c: 0.12 }, trajectory: { next_cycle_reference: 0.42, bumpless_delta: -0.02 } } }, mode);
    assert.equal(view._formatSourceValue(byPath(governor + "target_bound")), "20.80 °C");
    assert.equal(view._formatSourceValue(byPath(governor + "dynamic_reserve_c")), "0.12 °C");
    assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/next_cycle_reference")), "42.0 %");
    assert.equal(view._formatSourceValue(byPath("live/analysis/trajectory/bumpless_delta")), "-2.0 %");
    assert.equal(view._formatSourceValue(nodes.find((entry) => entry.path === "live/power/applied_percent")), "45.0 %");
    assert.equal(view._formatSourceValue(byPath("temperature")), "21.00 °C");
  }
  for (const entry of nodes.filter((entry) => entry.path?.startsWith("live/power/") && entry.path.endsWith("_percent"))) assert.equal(entry.value_multiplier, undefined);
});

test("history retains exactly eight safe diagnostic paths and separate compact approach graphs", () => {
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
