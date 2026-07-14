import { localize } from "../localize/localize";
import type { EquinoxCardConfig, EquinoxModeCustomization, EquinoxModeCustomizations, EquinoxModeTone } from "../types/config";

export type ModeFamily = "hvac" | "preset" | "fan" | "swing" | "swing_horizontal";

export const MODE_TONES_BY_FAMILY: Readonly<Record<ModeFamily, readonly EquinoxModeTone[]>> = {
  hvac: ["heat", "cool", "heat-cool", "auto", "dry", "fan-only", "off"],
  preset: ["preset-frost", "preset-eco", "preset-away", "preset-comfort", "preset-home", "preset-sleep", "preset-activity", "boost", "cool-boost", "heat", "cool", "auto", "off"],
  fan: ["fan-auto", "fan-off", "fan-low", "fan-medium", "fan-high", "fan-focus", "fan-diffuse"],
  swing: ["swing-off", "swing-on", "swing-vertical", "swing-horizontal", "swing-both"],
  swing_horizontal: ["swing-off", "swing-on", "swing-vertical", "swing-horizontal", "swing-both"]
};

const FAMILIES = Object.keys(MODE_TONES_BY_FAMILY) as ModeFamily[];
const own = (value: object, key: string): boolean => Object.prototype.hasOwnProperty.call(value, key);

export function modeCustomization(config: EquinoxCardConfig | undefined, family: ModeFamily, mode: string | undefined): EquinoxModeCustomization | undefined {
  const entries = config?.mode_customizations?.[family];
  return mode !== undefined && entries && own(entries, mode) ? entries[mode] : undefined;
}

export function isModeHidden(config: EquinoxCardConfig | undefined, family: ModeFamily, mode: string): boolean {
  if (modeCustomization(config, family, mode)?.hidden === true) return true;
  if (family === "hvac") return config?.hidden_hvac_modes?.includes(mode) === true;
  if (family === "preset") return config?.hidden_preset_modes?.includes(mode) === true;
  return false;
}

export function modeLabel({ config, language, family, mode }: { config?: EquinoxCardConfig; language?: string; family: ModeFamily; mode: string }): string {
  const custom = modeCustomization(config, family, mode)?.label;
  if (custom) return custom;
  const prefix = family === "hvac" ? "main.hvac" : family === "preset" ? "main.preset" : family === "fan" ? "main.fan" : "main.swing";
  const key = `${prefix}.${mode}`;
  const label = localize(language, key);
  return label === key ? mode : label;
}

export function modeIcon({ config, family, mode, defaultIcon }: { config?: EquinoxCardConfig; family: ModeFamily; mode: string; defaultIcon?: string }): string | undefined {
  const icon = modeCustomization(config, family, mode)?.icon;
  return icon?.startsWith("mdi:") ? icon : defaultIcon;
}

export function modeTone({ config, family, mode, defaultTone }: { config?: EquinoxCardConfig; family: ModeFamily; mode: string; defaultTone?: string }): string {
  const tone = modeCustomization(config, family, mode)?.tone;
  return tone && MODE_TONES_BY_FAMILY[family].includes(tone) ? tone : defaultTone ?? "";
}

export function orderedVisibleModes({ config, family, modes, standardOrder }: { config?: EquinoxCardConfig; family: ModeFamily; modes: readonly string[]; standardOrder: readonly string[] }): string[] {
  const unique = [...new Set(modes)];
  const available = new Set(unique);
  return [...standardOrder.filter((mode) => available.has(mode)), ...unique.filter((mode) => !standardOrder.includes(mode))]
    .filter((mode) => !isModeHidden(config, family, mode));
}

export function normalizeModeCustomizations(value: unknown): EquinoxModeCustomizations | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const source = value as Record<string, unknown>;
  const normalized: EquinoxModeCustomizations = {};
  for (const family of FAMILIES) {
    const rawFamily = source[family];
    if (!rawFamily || typeof rawFamily !== "object" || Array.isArray(rawFamily)) continue;
    const entries: Record<string, EquinoxModeCustomization> = {};
    for (const [mode, rawEntry] of Object.entries(rawFamily)) {
      if (mode === "" || !rawEntry || typeof rawEntry !== "object" || Array.isArray(rawEntry)) continue;
      const raw = rawEntry as Record<string, unknown>;
      const entry: EquinoxModeCustomization = {};
      const label = typeof raw.label === "string" ? raw.label.trim() : "";
      const icon = typeof raw.icon === "string" ? raw.icon.trim() : "";
      const tone = typeof raw.tone === "string" ? raw.tone.trim() : "";
      if (label) entry.label = label;
      if (icon.startsWith("mdi:")) entry.icon = icon;
      if ((MODE_TONES_BY_FAMILY[family] as readonly string[]).includes(tone)) entry.tone = tone as EquinoxModeTone;
      if (raw.hidden === true) entry.hidden = true;
      if (Object.keys(entry).length > 0) {
        Object.defineProperty(entries, mode, {
          value: entry,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }
    }
    if (Object.keys(entries).length > 0) normalized[family] = entries;
  }
  return Object.keys(normalized).length > 0 ? normalized : undefined;
}
