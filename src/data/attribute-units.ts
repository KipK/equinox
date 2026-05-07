import type { AttributeUnitMap } from "ha-better-history";
import type { HomeAssistant } from "../types/ha";
import staticUnits from "./attributes.json";

function climateTemperatureUnit(hass: HomeAssistant | undefined, entityId: string | undefined): string {
  if (!entityId || !hass) return "°C";
  const entity = hass.states[entityId];
  if (!entity) return "°C";
  const attrs = entity.attributes;
  const tempUnit = attrs.temperature_unit;
  if (typeof tempUnit === "string" && tempUnit !== "") return tempUnit;
  const uom = attrs.unit_of_measurement;
  if (typeof uom === "string" && uom !== "") return uom;
  return "°C";
}

export function equinoxAttributeUnits(
  hass: HomeAssistant | undefined,
  climateEntityId: string | undefined
): AttributeUnitMap {
  const tempUnit = climateTemperatureUnit(hass, climateEntityId);
  return {
    ...(staticUnits as AttributeUnitMap),
    "specific_states.ema_temperature": tempUnit
  };
}
