import type { AttributeUnitMap } from "ha-better-history";

const ATTRIBUTES_FILE = "attributes.json";
const EMPTY_UNITS: AttributeUnitMap = {};
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

export function equinoxAttributeUnits(
  staticUnits: AttributeUnitMap | undefined
): AttributeUnitMap {
  return staticUnits ?? EMPTY_UNITS;
}
