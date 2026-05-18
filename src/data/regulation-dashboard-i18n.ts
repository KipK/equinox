import type { RegulationDashboard } from "../types/regulation-dashboard";

export function normalizeRegulationDashboardLanguage(language: string | undefined): string {
  const normalized = language?.trim().toLowerCase().replace("_", "-");
  return normalized?.split("-")[0] || "en";
}

export function translateRegulationDashboardText(
  dashboard: RegulationDashboard,
  language: string | undefined,
  key: string | undefined,
  fallbackText?: string
): string {
  if (!key) {
    return fallbackText ?? "";
  }

  const normalizedLanguage = normalizeRegulationDashboardLanguage(language);
  const translations = dashboard.translations;
  const translated =
    translations?.[normalizedLanguage]?.[key] ??
    translations?.en?.[key] ??
    fallbackText;

  return translated ?? key;
}
