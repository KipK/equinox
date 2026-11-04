import {
  DEFAULT_ADDITIONAL_DASHBOARDS,
  DEFAULT_DISPLAY_MODE,
  DEFAULT_PRIMARY_DISPLAY,
  DEFAULT_THEME
} from "../const";

export const EQUINOX_THEMES = ["flat", "liquid_glow"] as const;
export const EQUINOX_DISPLAY_MODES = ["classic", "compact", "thin"] as const;
export const EQUINOX_PRIMARY_DISPLAYS = ["setpoint", "sensors"] as const;
export const EQUINOX_SETPOINT_SELECTORS = ["slider", "buttons"] as const;
export const EQUINOX_ADDITIONAL_DASHBOARDS = ["auto", "custom", "disabled"] as const;
export const EQUINOX_LAYOUT_ORIENTATIONS = ["horizontal", "vertical"] as const;

export type EquinoxTheme = "flat" | "liquid_glow";
export type EquinoxDisplayMode = "classic" | "compact" | "thin";
export type EquinoxPrimaryDisplay = "setpoint" | "sensors";
export type EquinoxSetpointSelector = "slider" | "buttons";
export type EquinoxAdditionalDashboards = "auto" | "custom" | "disabled";
export type EquinoxLayoutOrientation = "horizontal" | "vertical";
export type EquinoxModeTone =
  | "heat" | "cool" | "heat-cool" | "auto" | "dry" | "fan-only" | "off"
  | "preset-frost" | "preset-eco" | "preset-away" | "preset-comfort"
  | "preset-home" | "preset-sleep" | "preset-activity" | "boost" | "cool-boost"
  | "fan-auto" | "fan-off" | "fan-low" | "fan-medium" | "fan-high" | "fan-focus" | "fan-diffuse"
  | "swing-off" | "swing-on" | "swing-vertical" | "swing-horizontal" | "swing-both";

export interface EquinoxModeCustomization {
  label?: string;
  icon?: string;
  tone?: EquinoxModeTone;
  hidden?: boolean;
}

export interface EquinoxModeCustomizations {
  hvac?: Record<string, EquinoxModeCustomization>;
  preset?: Record<string, EquinoxModeCustomization>;
  fan?: Record<string, EquinoxModeCustomization>;
  swing?: Record<string, EquinoxModeCustomization>;
  swing_horizontal?: Record<string, EquinoxModeCustomization>;
}

export interface EquinoxCardConfig {
  type: "custom:equinox-card";
  entity: string;
  name?: string;
  diagnostic_entity?: string;
  power_entity?: string;
  humidity_entity?: string;
  temperature_entity?: string;
  auto_start_stop_enable_entity?: string;
  auto_start_stop_stop_mode_entity?: string;
  auto_fan_enable_entity?: string;
  theme?: EquinoxTheme;
  display_mode?: EquinoxDisplayMode;
  primary_display?: EquinoxPrimaryDisplay;
  setpoint_selector?: EquinoxSetpointSelector;
  /** @deprecated Use setpoint_selector instead. */
  use_temperature_popup?: boolean;
  card_background_color?: string | number[];
  card_background_opacity?: number;
  disable_name?: boolean;
  show_fan_mode?: boolean;
  show_swing_mode?: boolean;
  hide_lock_button?: boolean;
  hidden_hvac_modes?: string[];
  hidden_preset_modes?: string[];
  mode_customizations?: EquinoxModeCustomizations;
  additional_dashboards?: EquinoxAdditionalDashboards;
  state_icons_layout?: EquinoxLayoutOrientation;
  show_power_value?: boolean;
  show_current_temperature?: boolean;
  show_humidity?: boolean;
  show_setpoint?: boolean;
  show_hvac_mode?: boolean;
  show_preset_mode?: boolean;
  show_auto_start_stop?: boolean;
  show_power_info?: boolean;
  show_hvac_action?: boolean;
  show_events?: boolean;
  show_menu?: boolean;
  border_glow_on_action?: boolean;
}

export type EquinoxCardConfigInput = Partial<EquinoxCardConfig> & {
  type?: string;
};

export const DEFAULT_CONFIG = {
  theme: DEFAULT_THEME,
  display_mode: DEFAULT_DISPLAY_MODE,
  primary_display: DEFAULT_PRIMARY_DISPLAY,
  setpoint_selector: "slider",
  disable_name: false,
  show_fan_mode: true,
  show_swing_mode: true,
  hide_lock_button: false,
  additional_dashboards: DEFAULT_ADDITIONAL_DASHBOARDS,
  state_icons_layout: "horizontal",
  show_power_value: true,
  show_current_temperature: true,
  show_humidity: true,
  show_setpoint: true,
  show_hvac_mode: true,
  show_preset_mode: true,
  show_auto_start_stop: true,
  show_power_info: true,
  show_hvac_action: true,
  show_events: true,
  show_menu: true,
  border_glow_on_action: true
} satisfies Pick<
  EquinoxCardConfig,
  | "theme"
  | "display_mode"
  | "primary_display"
  | "setpoint_selector"
  | "disable_name"
  | "show_fan_mode"
  | "show_swing_mode"
  | "hide_lock_button"
  | "additional_dashboards"
  | "state_icons_layout"
  | "show_power_value"
  | "show_current_temperature"
  | "show_humidity"
  | "show_setpoint"
  | "show_hvac_mode"
  | "show_preset_mode"
  | "show_auto_start_stop"
  | "show_power_info"
  | "show_hvac_action"
  | "show_events"
  | "show_menu"
  | "border_glow_on_action"
>;

export type EquinoxConfigError =
  | "missing_entity"
  | "invalid_entity"
  | "invalid_theme"
  | "invalid_display_mode"
  | "invalid_primary_display"
  | "invalid_setpoint_selector"
  | "invalid_additional_dashboards"
  | "invalid_state_icons_layout";

export interface EquinoxConfigValidation {
  config: EquinoxCardConfigInput;
  error?: EquinoxConfigError;
}
