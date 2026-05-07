import type { AttributeUnitMap } from "ha-better-history";
import type { HomeAssistant } from "../types/ha";

const ATTRIBUTES_FILE = "attributes.json";
const EMPTY_UNITS: AttributeUnitMap = {};
const unitsByBaseAndTemperatureUnit = new WeakMap<AttributeUnitMap, Map<string, AttributeUnitMap>>();
let staticUnitsPromise: Promise<AttributeUnitMap> | undefined;

function attributesUrl(): string {
  return new URL(ATTRIBUTES_FILE, import.meta.url).toString();
}

function sanitizeAttributeUnits(value: unknown): AttributeUnitMap {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return EMPTY_UNITS;

  const units: AttributeUnitMap = {};

  for (const [path, unit] of Object.entries(value)) {
    if (path !== "" && typeof unit === "string" && unit !== "") {
      units[path] = unit;
    }
  }

  return units;
}

export function loadEquinoxStaticAttributeUnits(): Promise<AttributeUnitMap> {
  staticUnitsPromise ??= fetch(attributesUrl())
    .then((response) => response.ok ? response.json() : EMPTY_UNITS)
    .then(sanitizeAttributeUnits)
    .catch(() => EMPTY_UNITS);

  return staticUnitsPromise;
}

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
  staticUnits: AttributeUnitMap | undefined,
  hass: HomeAssistant | undefined,
  climateEntityId: string | undefined
): AttributeUnitMap {
  const tempUnit = climateTemperatureUnit(hass, climateEntityId);
  const baseUnits = staticUnits ?? EMPTY_UNITS;
  let unitsByTemperatureUnit = unitsByBaseAndTemperatureUnit.get(baseUnits);

  if (!unitsByTemperatureUnit) {
    unitsByTemperatureUnit = new Map<string, AttributeUnitMap>();
    unitsByBaseAndTemperatureUnit.set(baseUnits, unitsByTemperatureUnit);
  }

  const cached = unitsByTemperatureUnit.get(tempUnit);
  if (cached) return cached;

  const units = {
    ...baseUnits,
    "specific_states.ema_temperature": tempUnit
  };
  unitsByTemperatureUnit.set(tempUnit, units);
  return units;
}
