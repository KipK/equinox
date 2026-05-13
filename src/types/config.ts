import {
  DEFAULT_ADDITIONAL_DASHBOARDS,
  DEFAULT_DISPLAY_MODE,
  DEFAULT_PRIMARY_DISPLAY,
  DEFAULT_THEME
} from "../const";

export const EQUINOX_THEMES = ["flat", "liquid_glow"] as const;
export const EQUINOX_DISPLAY_MODES = ["classic", "compact"] as const;
export const EQUINOX_PRIMARY_DISPLAYS = ["setpoint", "sensors"] as const;
export const EQUINOX_ADDITIONAL_DASHBOARDS = ["auto", "custom", "disabled"] as const;
export const EQUINOX_LAYOUT_ORIENTATIONS = ["horizontal", "vertical"] as const;

export type EquinoxTheme = "flat" | "liquid_glow";
export type EquinoxDisplayMode = "classic" | "compact";
export type EquinoxPrimaryDisplay = "setpoint" | "sensors";
export type EquinoxAdditionalDashboards = "auto" | "custom" | "disabled";
export type EquinoxLayoutOrientation = "horizontal" | "vertical";

export interface EquinoxCardConfig {
  type: "custom:equinox-card";
  entity: string;
  name?: string;
  diagnostic_entity?: string;
  power_entity?: string;
  humidity_entity?: string;
  temperature_entity?: string;
  theme?: EquinoxTheme;
  display_mode?: EquinoxDisplayMode;
  primary_display?: EquinoxPrimaryDisplay;
  disable_name?: boolean;
  hide_lock_button?: boolean;
  additional_dashboards?: EquinoxAdditionalDashboards;
  state_icons_layout?: EquinoxLayoutOrientation;
  border_glow_on_action?: boolean;
}

export type EquinoxCardConfigInput = Partial<EquinoxCardConfig> & {
  type?: string;
};

export const DEFAULT_CONFIG = {
  theme: DEFAULT_THEME,
  display_mode: DEFAULT_DISPLAY_MODE,
  primary_display: DEFAULT_PRIMARY_DISPLAY,
  disable_name: false,
  hide_lock_button: false,
  additional_dashboards: DEFAULT_ADDITIONAL_DASHBOARDS,
  state_icons_layout: "horizontal",
  border_glow_on_action: true
} satisfies Pick<
  EquinoxCardConfig,
  | "theme"
  | "display_mode"
  | "primary_display"
  | "disable_name"
  | "hide_lock_button"
  | "additional_dashboards"
  | "state_icons_layout"
>;

export type EquinoxConfigError =
  | "missing_entity"
  | "invalid_entity"
  | "invalid_theme"
  | "invalid_display_mode"
  | "invalid_primary_display"
  | "invalid_additional_dashboards"
  | "invalid_state_icons_layout";

export interface EquinoxConfigValidation {
  config: EquinoxCardConfigInput;
  error?: EquinoxConfigError;
}
