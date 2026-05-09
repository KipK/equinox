import type { TranslationMap, TranslationTree } from "./loader.js";
import { getTranslations } from "./loader.js";

function normalizeLanguage(language?: string): string {
  return (language ?? "en").toLowerCase().split("-")[0] || "en";
}

// Resolves each key segment with exact match, case-insensitive fallback, and FAN_/SWING_ prefix stripping on the final segment.
function lookup(translations: TranslationMap, key: string): string | undefined {
  const parts = key.split(".");
  let current: TranslationTree | undefined = translations;

  for (let i = 0; i < parts.length; i++) {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    const seg = parts[i];
    const isLast = i === parts.length - 1;

    if (seg in current) {
      current = current[seg];
    } else if (seg.toLowerCase() in current) {
      current = current[seg.toLowerCase()];
    } else if (isLast) {
      const stripped = seg.replace(/^(fan_|swing_)/i, "").toLowerCase();
      current = stripped in current ? current[stripped] : undefined;
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

function interpolate(value: string, replacements: Record<string, string | number>): string {
  return Object.entries(replacements).reduce(
    (result, [key, replacement]) => result.replaceAll(`{${key}}`, String(replacement)),
    value
  );
}

export function localize(
  language: string | undefined,
  key: string,
  replacements: Record<string, string | number> = {}
): string {
  const normalized = normalizeLanguage(language);
  const targetMap = getTranslations(normalized);
  const enMap = getTranslations("en");
  const translated =
    (targetMap != null ? lookup(targetMap, key) : undefined) ??
    (enMap != null ? lookup(enMap, key) : undefined) ??
    key;

  return interpolate(translated, replacements);
}
