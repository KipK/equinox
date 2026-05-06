import { CARD_TYPE } from "../const";
import {
  DEFAULT_CONFIG,
  EQUINOX_ADDITIONAL_DASHBOARDS,
  EQUINOX_DISPLAY_MODES,
  EQUINOX_LAYOUT_ORIENTATIONS,
  EQUINOX_POWER_INFO_LAYOUTS,
  EQUINOX_PRIMARY_DISPLAYS,
  EQUINOX_THEMES,
  type EquinoxAdditionalDashboards,
  type EquinoxCardConfig,
  type EquinoxCardConfigInput,
  type EquinoxConfigValidation,
  type EquinoxDisplayMode,
  type EquinoxLayoutOrientation,
  type EquinoxPowerInfoLayout,
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

  if (!isOneOf(EQUINOX_POWER_INFO_LAYOUTS, config.power_info_layout)) {
    return { config, error: "invalid_power_info_layout" };
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

export function isEquinoxPowerInfoLayout(value: unknown): value is EquinoxPowerInfoLayout {
  return isOneOf(EQUINOX_POWER_INFO_LAYOUTS, value);
}
