// Fetches language JSON files at runtime from dist/translations/ next to the built module.

export type TranslationTree = string | { [key: string]: TranslationTree };
export type TranslationMap = Record<string, TranslationTree>;

export const SUPPORTED_LANGUAGES = [
  "bg", "ca", "cs", "da", "de", "el", "en",
  "es", "fi", "fr", "hu", "it", "nl", "no", "pl", "pt", "ru", "sk", "zh"
] as const;

const loaded = new Map<string, TranslationMap>();
const pending = new Map<string, Promise<void>>();
const supported = new Set<string>(SUPPORTED_LANGUAGES);

function normalizeLang(lang: string): string {
  return lang.toLowerCase().split("-")[0] || "en";
}

// Split import.meta.url from new URL() so Vite's build-time asset analyzer does not attempt
// to resolve "translations/" as a static asset (it is fetched at runtime from dist/translations/).
const _moduleUrl = import.meta.url;
const TRANSLATIONS_BASE = new URL("translations/", _moduleUrl).toString();

function translationUrl(lang: string): string {
  return TRANSLATIONS_BASE + lang + ".json";
}

export function getTranslations(lang: string): TranslationMap | undefined {
  return loaded.get(normalizeLang(lang));
}

export function ensureLanguage(lang: string): Promise<void> {
  const norm = normalizeLang(lang);

  if (!supported.has(norm)) return Promise.resolve();
  if (loaded.has(norm)) return Promise.resolve();

  const existing = pending.get(norm);
  if (existing) return existing;

  const promise = fetch(translationUrl(norm))
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<unknown>;
    })
    .then((data) => {
      if (typeof data === "object" && data !== null && !Array.isArray(data)) {
        loaded.set(norm, data as TranslationMap);
      }
    })
    .catch((err) => {
      console.warn(`[equinox] Failed to load translations for "${norm}":`, err);
    });

  pending.set(norm, promise);
  return promise;
}
