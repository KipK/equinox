import en from "./languages/en.json";
import fr from "./languages/fr.json";
import de from "./languages/de.json";
import cs from "./languages/cs.json";
import el from "./languages/el.json";
import it from "./languages/it.json";
import pl from "./languages/pl.json";
import ru from "./languages/ru.json";
import sk from "./languages/sk.json";
import bg from "./languages/bg.json";
import ca from "./languages/ca.json";
import cn from "./languages/cn.json";
import da from "./languages/da.json";
import es from "./languages/es.json";
import fi from "./languages/fi.json";
import hu from "./languages/hu.json";
import nl from "./languages/nl.json";
import no from "./languages/no.json";
import pt from "./languages/pt.json";

type TranslationTree = string | { [key: string]: TranslationTree };
type TranslationMap = Record<string, TranslationTree>;

const languages: Record<string, TranslationMap> = {
  en,
  fr,
  de,
  cs,
  el,
  it,
  pl,
  ru,
  sk,
  bg,
  ca,
  cn,
  da,
  es,
  fi,
  hu,
  nl,
  no,
  pt
};

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
  const translated = lookup(languages[normalized] ?? languages.en, key) ?? lookup(languages.en, key) ?? key;

  return interpolate(translated, replacements);
}
