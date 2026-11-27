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
const { validateRegulationDashboard } = await import("../src/data/regulation-dashboard-loader.ts");
const { getBuiltinRegulationDashboard } = await import("../src/data/dashboards/index.ts");
const { translateRegulationDashboardText: translate } = await import("../src/data/regulation-dashboard-i18n.ts");
const dashboard = JSON.parse(readFileSync(new URL("../src/data/dashboards/regulation/tpi.json", import.meta.url)));

function* walk(value) {
  if (!value || typeof value !== "object") return;
  yield value;
  for (const child of Object.values(value)) yield* walk(child);
}
const nodes = [...walk(dashboard.sections)];
const section = (id) => dashboard.sections.find((entry) => entry.id === id);
const actions = () => [...walk(section("actions"))].filter((entry) => entry.type === "action");

function renderer(diagnostic) {
  const result = new EquinoxRegulationRenderer();
  result.config = { entity: "climate.test" };
  result.dashboard = dashboard;
  result.language = "en";
  result.activeSectionId = "learning";
  const climateAttributes = {
    temperature: 20,
    on_percent: 0.42,
    power_percent: 42,
    configuration: { proportional_function: "tpi", cycle_min: 5 },
    vtherm_over_switch: { tpi_coef_int: 0.6, tpi_coef_ext: 0.01 },
    specific_states: diagnostic ? { regulation_diagnostics: "sensor.test_auto_tpi_learning_state", auto_tpi_continuous_kext: "off" } : {}
  };
  result.hass = { states: {
    "climate.test": { entity_id: "climate.test", state: "heat", attributes: climateAttributes },
    ...(diagnostic ? { "sensor.test_auto_tpi_learning_state": { entity_id: "sensor.test_auto_tpi_learning_state", ...diagnostic } } : {})
  } };
  return result;
}

const activeDiagnostic = { state: "active", attributes: { coeff_int_cycles: 4, coeff_ext_cycles: 12, model_confidence: 0.25, last_learning_status: "learned_indoor_heat", calculated_coef_int: 0.7, calculated_coef_ext: 0.012 } };
const idleDiagnostic = { ...activeDiagnostic, state: "off" };

test("the built-in TPI dashboard is registered and valid", () => {
  assert.ok(validateRegulationDashboard(dashboard));
  assert.deepEqual(getBuiltinRegulationDashboard("tpi"), dashboard);
});

test("every translation key is defined in English and French, and every defined key is used", () => {
  const usedKeys = new Set(nodes.flatMap((entry) => Object.entries(entry).filter(([key]) => key.endsWith("_key")).map(([, value]) => value)));
  usedKeys.add(dashboard.title_key);
  for (const language of ["en", "fr"]) {
    const defined = new Set(Object.keys(dashboard.translations[language]));
    for (const key of usedKeys) assert.ok(defined.has(key), `Missing ${language} translation: ${key}`);
    for (const key of defined) assert.ok(usedKeys.has(key), `Unused ${language} translation: ${key}`);
  }
  assert.equal(translate(dashboard, "fr-FR", section("learning").title_key), "Auto TPI");
  assert.equal(translate(dashboard, "de", section("overview").title_key), "Summary");
});

test("actions only call set_auto_tpi_mode on the climate entity, with confirmation", () => {
  assert.equal(actions().length, 3);
  for (const action of actions()) {
    assert.equal(action.service, "versatile_thermostat.set_auto_tpi_mode");
    assert.equal(action.target.entity_id, "$climate_entity");
    assert.equal(action.confirmation.enabled, true);
  }
});

test("actions follow the learning state and are hidden without Auto TPI", () => {
  const visibleIds = (view) => actions().filter((action) => view._conditionMatches(action.visible_if)).map((action) => action.id).sort();
  assert.deepEqual(visibleIds(renderer(activeDiagnostic)), ["auto-tpi-stop"]);
  assert.deepEqual(visibleIds(renderer(idleDiagnostic)), ["auto-tpi-resume", "auto-tpi-start"]);
  assert.deepEqual(visibleIds(renderer(undefined)), []);
});

test("the learning section shows a note without Auto TPI and its details with Auto TPI", () => {
  const items = section("learning").items;
  const note = items.find((entry) => entry.text_key === "learning.not_enabled");
  const progress = items.filter((entry) => entry.type === "progress");
  assert.equal(renderer(undefined)._conditionMatches(note.visible_if), true);
  assert.equal(renderer(activeDiagnostic)._conditionMatches(note.visible_if), false);
  for (const block of progress) {
    assert.equal(renderer(undefined)._conditionMatches(block.visible_if), false);
    assert.equal(renderer(activeDiagnostic)._conditionMatches(block.visible_if), true);
  }
});

test("coefficients in use are read from the attribute block of the thermostat type", () => {
  const grids = section("overview").items.flatMap((entry) => entry.items ?? []).filter((entry) => entry.title_key === "groups.coefficients");
  assert.equal(grids.length, 3);
  const view = renderer(activeDiagnostic);
  assert.deepEqual(grids.map((grid) => view._conditionMatches(grid.visible_if)), [true, false, false]);
});

test("the learning graph shows temperatures and coefficients from the session start", () => {
  const graph = section("learning").items.find((entry) => entry.type === "history");
  const hoursAgo = (hours) => new Date(Date.now() - hours * 3_600_000).toISOString();
  const withStart = (start) => ({ ...activeDiagnostic, attributes: { ...activeDiagnostic.attributes, learning_start_dt: start } });

  const fromClimate = renderer(withStart(hoursAgo(50)))._betterHistoryConfig(graph);
  assert.deepEqual(fromClimate.series.map((series) => [series.entity, series.attribute]), [
    ["climate.test", ["current_temperature"]],
    ["climate.test", ["temperature"]],
    ["sensor.test_auto_tpi_learning_state", ["calculated_coef_int"]],
    ["sensor.test_auto_tpi_learning_state", ["calculated_coef_ext"]]
  ]);
  assert.ok(Math.abs(fromClimate.hours - 51) < 0.01);

  const withSensor = renderer(withStart(hoursAgo(50)));
  withSensor.config = { entity: "climate.test", temperature_entity: "sensor.room_temperature" };
  assert.deepEqual([withSensor._betterHistoryConfig(graph).series[0].entity, withSensor._betterHistoryConfig(graph).series[0].attribute], ["sensor.room_temperature", undefined]);

  assert.equal(renderer(activeDiagnostic)._betterHistoryConfig(graph).hours, 7 * 24);
  assert.equal(renderer(withStart(hoursAgo(60 * 24)))._betterHistoryConfig(graph).hours, 30 * 24);
});
