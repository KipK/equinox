import { asNumber, asString, asStringArray, firstDefined, isUnavailableState } from "./format";
import { buildVtViewModel } from "./vt-state";
import type { EquinoxCardConfig } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/ha";
import type { EquinoxAvailability, EquinoxClimateViewModel, EquinoxViewModel } from "../types/view-model";

function readObject(source: unknown): Record<string, unknown> | undefined {
  return typeof source === "object" && source !== null ? (source as Record<string, unknown>) : undefined;
}

function readPath(source: unknown, path: string[]): unknown {
  return path.reduce<unknown>((current, key) => readObject(current)?.[key], source);
}

function getAvailability(entity: HassEntity): EquinoxAvailability {
  if (entity.state === "unavailable") {
    return "unavailable";
  }

  if (entity.state === "unknown") {
    return "unknown";
  }

  return "available";
}

function getHumidity(config: EquinoxCardConfig, hass: HomeAssistant, attributes: Record<string, unknown>): number | undefined {
  return firstDefined(
    asNumber(attributes.humidity),
    config.humidity_entity ? asNumber(hass.states[config.humidity_entity]?.state) : undefined
  );
}

export function buildClimateViewModel(
  config: EquinoxCardConfig,
  hass: HomeAssistant,
  entity: HassEntity
): EquinoxClimateViewModel {
  const attributes = entity.attributes;

  const hvacMode = firstDefined(
    isUnavailableState(entity.state) ? undefined : entity.state,
    asString(attributes.hvac_mode),
    asString(readPath(attributes, ["current_state", "hvac_mode"]))
  );

  const rawPresetMode = firstDefined(
    asString(attributes.preset_mode),
    asString(readPath(attributes, ["current_state", "preset"]))
  );

  // Frost preset has no AC variant in VT — treat it as manual when in cool mode.
  const presetMode = hvacMode === "cool" && rawPresetMode === "frost" ? "none" : rawPresetMode;

  return {
    entityId: entity.entity_id,
    name: config.name ?? asString(attributes.friendly_name),
    availability: getAvailability(entity),
    hvacMode,
    hvacAction: asString(attributes.hvac_action),
    targetTemperature: firstDefined(
      asNumber(attributes.temperature),
      asNumber(readPath(attributes, ["current_state", "target_temperature"]))
    ),
    currentTemperature: asNumber(attributes.current_temperature),
    currentHumidity: getHumidity(config, hass, attributes),
    hvacModes: asStringArray(attributes.hvac_modes),
    presetModes: asStringArray(attributes.preset_modes),
    presetMode,
    fanMode: asString(attributes.fan_mode),
    fanModes: asStringArray(attributes.fan_modes),
    minTemp: asNumber(attributes.min_temp),
    maxTemp: asNumber(attributes.max_temp),
    targetTempStep: firstDefined(
      asNumber(attributes.target_temp_step),
      asNumber(readPath(attributes, ["configuration", "target_temperature_step"])),
      0.5
    ),
    targetTemperatureRange: {
      low: asNumber(attributes.target_temp_low),
      high: asNumber(attributes.target_temp_high)
    }
  };
}

export function buildEquinoxViewModel(
  config: EquinoxCardConfig,
  hass: HomeAssistant,
  entity: HassEntity
): EquinoxViewModel {
  return {
    climate: buildClimateViewModel(config, hass, entity),
    vt: buildVtViewModel(config, hass, entity)
  };
}
