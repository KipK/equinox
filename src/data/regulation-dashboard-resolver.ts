import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import { readRegulationPath } from "./regulation-dashboard-values";

const BUILTIN_REGULATION_DASHBOARD_DIR = "dashboards/regulation";

const ALGORITHM_PATHS: readonly string[] = [
  "configuration/proportional_function",
  "vtherm_over_valve/function",
  "vtherm_over_climate_valve/valve_regulation/function",
  "vtherm_over_switch/function",
  "specific_states/proportional_function"
];

export type RegulationDashboardMode = "auto" | "custom" | "disabled";
export type RegulationDashboardSourceKind = "builtin" | "custom";

export type RegulationDashboardResolution =
  | RegulationDashboardAvailableResolution
  | RegulationDashboardUnavailableResolution;

export interface RegulationDashboardAvailableResolution {
  available: true;
  mode: Exclude<RegulationDashboardMode, "disabled">;
  source: RegulationDashboardSourceKind;
  url: string;
  algorithm?: string;
}

export interface RegulationDashboardUnavailableResolution {
  available: false;
  mode: RegulationDashboardMode;
  reason: "disabled" | "missing_algorithm" | "invalid_algorithm";
  algorithm?: string;
}

export function normalizeRegulationAlgorithm(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized || !/^[a-z0-9_-]+$/u.test(normalized)) {
    return undefined;
  }

  return normalized;
}

export function detectRegulationAlgorithm(hass: HomeAssistant, config: EquinoxCardConfig): string | undefined {
  const attributes = hass.states[config.entity]?.attributes;
  if (!attributes) {
    return undefined;
  }

  for (const path of ALGORITHM_PATHS) {
    const algorithm = normalizeRegulationAlgorithm(readRegulationPath(attributes, path));
    if (algorithm) {
      return algorithm;
    }
  }

  return undefined;
}

export function resolveRegulationDashboard(hass: HomeAssistant, config: EquinoxCardConfig): RegulationDashboardResolution {
  const mode = config.additional_dashboards ?? "auto";

  if (mode === "disabled") {
    return { available: false, mode, reason: "disabled" };
  }

  if (mode === "custom") {
    return {
      available: true,
      mode,
      source: "custom",
      url: "/local/equinox/dash/custom.js",
      algorithm: detectRegulationAlgorithm(hass, config)
    };
  }

  const rawAlgorithm = detectRawRegulationAlgorithm(hass, config);
  const algorithm = normalizeRegulationAlgorithm(rawAlgorithm);

  if (!algorithm) {
    return {
      available: false,
      mode,
      reason: rawAlgorithm === undefined ? "missing_algorithm" : "invalid_algorithm",
      algorithm: typeof rawAlgorithm === "string" ? rawAlgorithm : undefined
    };
  }

  return {
    available: true,
    mode,
    source: "builtin",
    url: new URL(`${BUILTIN_REGULATION_DASHBOARD_DIR}/${algorithm}.json`, import.meta.url).href,
    algorithm
  };
}

function detectRawRegulationAlgorithm(hass: HomeAssistant, config: EquinoxCardConfig): unknown {
  const attributes = hass.states[config.entity]?.attributes;
  if (!attributes) {
    return undefined;
  }

  for (const path of ALGORITHM_PATHS) {
    const value = readRegulationPath(attributes, path);
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return undefined;
}
