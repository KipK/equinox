import { CARD_TYPE } from "../const";
import {
  DEFAULT_CONFIG,
  EQUINOX_ADDITIONAL_DASHBOARDS,
  EQUINOX_DISPLAY_MODES,
  EQUINOX_LAYOUT_ORIENTATIONS,
  EQUINOX_PRIMARY_DISPLAYS,
  EQUINOX_THEMES,
  type EquinoxAdditionalDashboards,
  type EquinoxCardConfig,
  type EquinoxCardConfigInput,
  type EquinoxConfigValidation,
  type EquinoxDisplayMode,
  type EquinoxLayoutOrientation,
  type EquinoxPrimaryDisplay,
  type EquinoxTheme
} from "../types/config";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isOneOf<T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return isString(value) && values.includes(value);
}

function isClimateEntity(entity: string): boolean {
  return entity.startsWith("climate.");
}

function normalizeStringList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const normalized = [...new Set(value.filter(isString).map((entry) => entry.trim()).filter((entry) => entry.length > 0))];

  return normalized.length > 0 ? normalized : undefined;
}

export function validateEquinoxConfig(input: EquinoxCardConfigInput): EquinoxConfigValidation {
  const config: EquinoxCardConfigInput = {
    ...DEFAULT_CONFIG,
    ...input,
    type: CARD_TYPE
  };
  delete (config as { card_height?: unknown }).card_height;

  if (!isString(config.entity) || config.entity.trim() === "") {
    return { config, error: "missing_entity" };
  }

  config.entity = config.entity.trim();

  if (!isClimateEntity(config.entity)) {
    return { config, error: "invalid_entity" };
  }

  if (!isOneOf(EQUINOX_THEMES, config.theme)) {
    return { config, error: "invalid_theme" };
  }

  if (!isOneOf(EQUINOX_DISPLAY_MODES, config.display_mode)) {
    return { config, error: "invalid_display_mode" };
  }

  if (!isOneOf(EQUINOX_PRIMARY_DISPLAYS, config.primary_display)) {
    return { config, error: "invalid_primary_display" };
  }

  if (!isOneOf(EQUINOX_ADDITIONAL_DASHBOARDS, config.additional_dashboards)) {
    return { config, error: "invalid_additional_dashboards" };
  }

  if (!isOneOf(EQUINOX_LAYOUT_ORIENTATIONS, config.state_icons_layout)) {
    return { config, error: "invalid_state_icons_layout" };
  }

  const hiddenHvacModes = normalizeStringList(config.hidden_hvac_modes);
  const hiddenPresetModes = normalizeStringList(config.hidden_preset_modes);

  if (hiddenHvacModes) {
    config.hidden_hvac_modes = hiddenHvacModes;
  } else {
    delete config.hidden_hvac_modes;
  }

  if (hiddenPresetModes) {
    config.hidden_preset_modes = hiddenPresetModes;
  } else {
    delete config.hidden_preset_modes;
  }

  return { config: config as EquinoxCardConfig };
}

export function normalizeEquinoxConfig(input: EquinoxCardConfigInput): EquinoxCardConfig | undefined {
  const validation = validateEquinoxConfig(input);

  return validation.error ? undefined : (validation.config as EquinoxCardConfig);
}

export function isEquinoxTheme(value: unknown): value is EquinoxTheme {
  return isOneOf(EQUINOX_THEMES, value);
}

export function isEquinoxDisplayMode(value: unknown): value is EquinoxDisplayMode {
  return isOneOf(EQUINOX_DISPLAY_MODES, value);
}

export function isEquinoxPrimaryDisplay(value: unknown): value is EquinoxPrimaryDisplay {
  return isOneOf(EQUINOX_PRIMARY_DISPLAYS, value);
}

export function isEquinoxAdditionalDashboards(value: unknown): value is EquinoxAdditionalDashboards {
  return isOneOf(EQUINOX_ADDITIONAL_DASHBOARDS, value);
}

export function isEquinoxLayoutOrientation(value: unknown): value is EquinoxLayoutOrientation {
  return isOneOf(EQUINOX_LAYOUT_ORIENTATIONS, value);
}
