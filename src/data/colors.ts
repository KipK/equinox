// Tone resolution helpers aligned with Home Assistant frontend conventions.
//
// The CSS variables themselves are declared in src/styles/flat.ts and consumed
// via `[tone="X"]` selectors in component styles. This module only deals with
// the *logical* tone name attached to each rendered element so the CSS layer
// can resolve the color.
//
// Footgun: HA frontend authors --state-climate-heat-cool-color with a hyphen
// even though the state string is `heat_cool`. We never auto-derive a CSS
// variable name from a state — every mapping is explicit below.

// HA core maps each hvac_action to a parent hvac_mode for color resolution.
// Mirrors src/panels/lovelace/cards/tile/badges/tile-badge-climate.ts (frontend).
export const CLIMATE_HVAC_ACTION_TO_MODE: Record<string, string> = {
  cooling: "cool",
  defrosting: "heat",
  drying: "dry",
  fan: "fan_only",
  heating: "heat",
  idle: "off",
  off: "off",
  preheating: "heat"
};

// Logical tone names consumed by component CSS. These match `[tone="X"]`
// selectors. `heat_cool` is rendered as `heat-cool` (hyphen) for CSS sanity.
const HVAC_MODE_TONE: Record<string, string> = {
  heat: "heat",
  cool: "cool",
  heat_cool: "heat-cool",
  auto: "auto",
  dry: "dry",
  fan_only: "fan-only",
  off: "off"
};

// HVAC action → tone. Drying gets its own tone (orange in HA), fan_only its
// own cyan tone, idle its own muted tone with a clock-outline glyph.
export function actionTone(action?: string): string {
  if (!action) return "";
  if (action === "idle") return "muted";
  if (action === "off") return "off";

  const mode = CLIMATE_HVAC_ACTION_TO_MODE[action] ?? action;
  return HVAC_MODE_TONE[mode] ?? "";
}

// Preset tones — emit a preset-specific tone name so each preset has its own
// hue. `frost` falls back to a cooling-blue, `comfort` blends with the current
// HVAC mode (warm if heating, cool if cooling), `boost`/`activity` follow the
// existing boost/cool-boost split so the surrounding glow keeps working.
export function presetTone(preset: string, hvacMode?: string): string {
  switch (preset) {
    case "frost":
      return "preset-frost";
    case "eco":
      return "preset-eco";
    case "away":
      return "preset-away";
    case "comfort":
      return hvacMode === "cool" ? "cool" : "preset-comfort";
    case "home":
      return "preset-home";
    case "sleep":
      return "preset-sleep";
    case "activity":
      return hvacMode === "cool" ? "cool-boost" : "preset-activity";
    case "boost":
      return hvacMode === "cool" ? "cool-boost" : "boost";
    default:
      return "";
  }
}

// Fan tones — a graduated cool palette plus accents for focus/diffuse.
export function fanTone(mode?: string): string {
  if (!mode) return "";

  const m = mode.toLowerCase().replace(/^fan_/, "").replace(/^auto_fan_/, "");

  switch (m) {
    case "off":
    case "none":
      return "fan-off";
    case "auto":
      return "fan-auto";
    case "low":
      return "fan-low";
    case "medium":
    case "middle":
      return "fan-medium";
    case "high":
    case "top":
    case "turbo":
      return "fan-high";
    case "on":
      return "fan-high";
    case "focus":
      return "fan-focus";
    case "diffuse":
      return "fan-diffuse";
    default:
      return "";
  }
}

// Swing tones — cyan/teal family.
export function swingTone(mode?: string): string {
  if (!mode) return "";

  const m = mode.toLowerCase().replace(/^swing_/, "");

  switch (m) {
    case "off":
      return "swing-off";
    case "on":
      return "swing-on";
    case "vertical":
      return "swing-vertical";
    case "horizontal":
      return "swing-horizontal";
    case "both":
      return "swing-both";
    default:
      return "";
  }
}

// Lock tones — picked up by the locked / unlocked CSS variables that wrap
// HA's --state-lock-* family.
export function lockTone(isLocked: boolean): string {
  return isLocked ? "lock-locked" : "lock-unlocked";
}
