const UNAVAILABLE_STATES = new Set(["unknown", "unavailable"]);

export function isUnavailableState(value: unknown): boolean {
  return value === null || value === undefined || (typeof value === "string" && UNAVAILABLE_STATES.has(value));
}

export function asString(value: unknown): string | undefined {
  if (isUnavailableState(value) || typeof value !== "string" || value.trim() === "") {
    return undefined;
  }

  return value;
}

export function asNumber(value: unknown): number | undefined {
  if (isUnavailableState(value)) {
    return undefined;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value !== "string" || value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
}

export function firstDefined<T>(...values: Array<T | undefined>): T | undefined {
  return values.find((value) => value !== undefined);
}
