import en from "./languages/en.json";
import fr from "./languages/fr.json";

type TranslationTree = string | { [key: string]: TranslationTree };
type TranslationMap = Record<string, TranslationTree>;

const languages: Record<string, TranslationMap> = {
  en,
  fr
};

function normalizeLanguage(language?: string): string {
  return (language ?? "en").toLowerCase().split("-")[0] || "en";
}

function lookup(translations: TranslationMap, key: string): string | undefined {
  const value = key.split(".").reduce<TranslationTree | undefined>((current, part) => {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    return current[part];
  }, translations);

  return typeof value === "string" ? value : undefined;
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
  const translated = lookup(languages[normalized] ?? languages.en, key) ?? lookup(languages.en, key) ?? key;

  return interpolate(translated, replacements);
}
