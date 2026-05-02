import { asNumber, asString, asStringArray, firstDefined, isUnavailableState } from "./format";
import type { EquinoxCardConfig } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/ha";
import type { EquinoxAvailability, EquinoxClimateViewModel, EquinoxViewModel } from "../types/view-model";

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

  return {
    entityId: entity.entity_id,
    name: config.name ?? asString(attributes.friendly_name),
    availability: getAvailability(entity),
    hvacMode: firstDefined(isUnavailableState(entity.state) ? undefined : entity.state, asString(attributes.hvac_mode)),
    hvacAction: asString(attributes.hvac_action),
    targetTemperature: asNumber(attributes.temperature),
    currentTemperature: asNumber(attributes.current_temperature),
    currentHumidity: getHumidity(config, hass, attributes),
    hvacModes: asStringArray(attributes.hvac_modes),
    presetModes: asStringArray(attributes.preset_modes),
    presetMode: asString(attributes.preset_mode),
    fanMode: asString(attributes.fan_mode),
    fanModes: asStringArray(attributes.fan_modes),
    minTemp: asNumber(attributes.min_temp),
    maxTemp: asNumber(attributes.max_temp),
    targetTempStep: asNumber(attributes.target_temp_step),
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
    climate: buildClimateViewModel(config, hass, entity)
  };
}
