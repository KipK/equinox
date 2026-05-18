import type { RegulationDashboard } from "../types/regulation-dashboard";
import type { RegulationDashboardResolution } from "./regulation-dashboard-resolver";

export type RegulationDashboardLoadResult =
  | { status: "loaded"; dashboard: RegulationDashboard; url: string }
  | { status: "unavailable"; reason: "disabled" | "missing_algorithm" | "invalid_algorithm" | "not_found"; url?: string }
  | { status: "error"; reason: "invalid_dashboard" | "load_failed"; error: unknown; url?: string };

const dashboardCache = new Map<string, Promise<RegulationDashboardLoadResult>>();

declare global {
  interface Window {
    EquinoxRegulationDashboard?: unknown;
  }
}

export function clearRegulationDashboardCache(): void {
  dashboardCache.clear();
}

export function loadRegulationDashboard(resolution: RegulationDashboardResolution): Promise<RegulationDashboardLoadResult> {
  if (!resolution.available) {
    return Promise.resolve({ status: "unavailable", reason: resolution.reason });
  }

  const cacheKey = `${resolution.source}:${resolution.url}`;
  const cached = dashboardCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const pending =
    resolution.source === "custom"
      ? loadCustomDashboard(resolution.url)
      : loadBuiltinDashboard(resolution.url);

  dashboardCache.set(cacheKey, pending);
  return pending;
}

export function validateRegulationDashboard(value: unknown): value is RegulationDashboard {
  if (!isRecord(value)) {
    return false;
  }

  if (value.schema_version !== 1 || value.kind !== "regulation-dashboard" || !Array.isArray(value.sections)) {
    return false;
  }

  if (value.sections.length === 0) {
    return false;
  }

  const seenSectionIds = new Set<string>();
  return value.sections.every((section) => {
    if (!isRecord(section) || typeof section.id !== "string" || !isSafeId(section.id) || !Array.isArray(section.items)) {
      return false;
    }

    if (seenSectionIds.has(section.id)) {
      return false;
    }
    seenSectionIds.add(section.id);

    return section.items.every(isDashboardItem);
  });
}

async function loadBuiltinDashboard(url: string): Promise<RegulationDashboardLoadResult> {
  try {
    const response = await fetch(url, { cache: "force-cache" });
    if (response.status === 404) {
      console.info("[equinox] Regulation dashboard not found", { url });
      return { status: "unavailable", reason: "not_found", url };
    }

    if (!response.ok) {
      console.info("[equinox] Regulation dashboard unavailable", { url, status: response.status });
      return { status: "unavailable", reason: "not_found", url };
    }

    const dashboard = await response.json();
    if (!validateRegulationDashboard(dashboard)) {
      return { status: "error", reason: "invalid_dashboard", error: new Error("Invalid regulation dashboard"), url };
    }

    return { status: "loaded", dashboard, url };
  } catch (error) {
    console.info("[equinox] Regulation dashboard unavailable", { url, error });
    return { status: "unavailable", reason: "not_found", url };
  }
}

async function loadCustomDashboard(url: string): Promise<RegulationDashboardLoadResult> {
  try {
    window.EquinoxRegulationDashboard = undefined;
    const moduleValue = (await import(/* @vite-ignore */ url)) as { default?: unknown; dashboard?: unknown };
    const dashboard = moduleValue.default ?? moduleValue.dashboard ?? window.EquinoxRegulationDashboard;

    if (!validateRegulationDashboard(dashboard)) {
      return { status: "error", reason: "invalid_dashboard", error: new Error("Invalid custom regulation dashboard"), url };
    }

    return { status: "loaded", dashboard, url };
  } catch (error) {
    return { status: "error", reason: "load_failed", error, url };
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSafeId(value: string): boolean {
  return /^[a-z0-9_-]+$/u.test(value);
}

function isDashboardItem(value: unknown): boolean {
  if (!isRecord(value) || typeof value.type !== "string") {
    return false;
  }

  return [
    "hero_status",
    "value",
    "metric_grid",
    "status",
    "progress",
    "text",
    "section_note",
    "history",
    "action"
  ].includes(value.type);
}
