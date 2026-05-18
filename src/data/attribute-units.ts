import type { AttributeUnitMap } from "@kipk/ha-better-history";
import rawAttributes from "./attributes.json";

const EMPTY_UNITS: AttributeUnitMap = {};

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

const staticUnits: AttributeUnitMap = sanitizeAttributeUnits(rawAttributes);

export function loadEquinoxStaticAttributeUnits(): Promise<AttributeUnitMap> {
  return Promise.resolve(staticUnits);
}

export function equinoxAttributeUnits(
  staticUnitsArg: AttributeUnitMap | undefined
): AttributeUnitMap {
  return staticUnitsArg ?? EMPTY_UNITS;
}
