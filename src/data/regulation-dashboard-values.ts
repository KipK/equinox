import type { EquinoxCardConfig } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/ha";
import type { RegulationDashboardSource } from "../types/regulation-dashboard";

export interface RegulationDashboardValueContext {
  hass: HomeAssistant;
  config: EquinoxCardConfig;
}

export interface RegulationDashboardSources {
  climate?: HassEntity;
  diagnostic?: HassEntity;
  power?: HassEntity;
  humidity?: HassEntity;
  temperature?: HassEntity;
  config: EquinoxCardConfig;
}

export function normalizeRegulationPath(path: string | readonly string[] | undefined): string[] {
  if (!path) {
    return [];
  }

  if (Array.isArray(path)) {
    return path.map((part) => String(part)).filter((part) => part.length > 0);
  }

  return path
    .split(/[/.]/u)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

export function readRegulationPath(source: unknown, path: string | readonly string[] | undefined): unknown {
  const parts = normalizeRegulationPath(path);
  let current = source;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }

    if (Array.isArray(current)) {
      const index = Number(part);
      if (!Number.isInteger(index) || index < 0 || index >= current.length) {
        return undefined;
      }
      current = current[index];
      continue;
    }

    if (typeof current !== "object") {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

export function isMissingRegulationValue(value: unknown): boolean {
  return value === undefined || value === null || value === "" || value === "unknown" || value === "unavailable";
}

export function buildRegulationSources(hass: HomeAssistant, config: EquinoxCardConfig): RegulationDashboardSources {
  return {
    climate: hass.states[config.entity],
    diagnostic: config.diagnostic_entity ? hass.states[config.diagnostic_entity] : undefined,
    power: config.power_entity ? hass.states[config.power_entity] : undefined,
    humidity: config.humidity_entity ? hass.states[config.humidity_entity] : undefined,
    temperature: config.temperature_entity ? hass.states[config.temperature_entity] : undefined,
    config
  };
}

export function getRegulationSource(
  context: RegulationDashboardValueContext,
  source: RegulationDashboardSource
): HassEntity | EquinoxCardConfig | undefined {
  return buildRegulationSources(context.hass, context.config)[source];
}

export function readRegulationSourceValue(
  context: RegulationDashboardValueContext,
  source: RegulationDashboardSource,
  path: string | readonly string[] | undefined
): unknown {
  const sourceValue = getRegulationSource(context, source);
  if (!sourceValue) {
    return undefined;
  }

  if (source === "config") {
    return readRegulationPath(sourceValue, path);
  }

  const parts = normalizeRegulationPath(path);
  if (parts.length === 0) {
    return sourceValue;
  }

  const first = parts[0];
  if (first === "state" || first === "attributes" || first === "entity_id") {
    return readRegulationPath(sourceValue, parts);
  }

  const attributeValue = readRegulationPath((sourceValue as HassEntity).attributes, parts);
  return attributeValue === undefined ? readRegulationPath(sourceValue, parts) : attributeValue;
}
