import { translations } from "./languages/index";

export type TranslationTree = string | { [key: string]: TranslationTree };
export type TranslationMap = Record<string, TranslationTree>;

export const SUPPORTED_LANGUAGES = [
  "bg", "ca", "cs", "da", "de", "el", "en",
  "es", "fi", "fr", "he", "hu", "it", "nl", "no", "pl", "pt", "ru", "sk", "zh"
] as const;

const loaded = new Map<string, TranslationMap>();
const supported = new Set<string>(SUPPORTED_LANGUAGES);

for (const [lang, tree] of Object.entries(translations)) {
  loaded.set(lang, tree as TranslationMap);
}

function normalizeLang(lang: string): string {
  return lang.toLowerCase().split("-")[0] || "en";
}

export function getTranslations(lang: string): TranslationMap | undefined {
  return loaded.get(normalizeLang(lang));
}

export function ensureLanguage(_lang: string): Promise<void> {
  return Promise.resolve();
}
