import {
  DEFAULT_ADDITIONAL_DASHBOARDS,
  DEFAULT_DISPLAY_MODE,
  DEFAULT_THEME
} from "../const";

export const EQUINOX_THEMES = ["flat"] as const;
export const EQUINOX_DISPLAY_MODES = ["classic", "compact"] as const;
export const EQUINOX_ADDITIONAL_DASHBOARDS = ["auto", "custom", "disabled"] as const;

export type EquinoxTheme = "flat";
export type EquinoxDisplayMode = "classic" | "compact";
export type EquinoxAdditionalDashboards = "auto" | "custom" | "disabled";

export interface EquinoxCardConfig {
  type: "custom:equinox-card";
  entity: string;
  name?: string;
  diagnostic_entity?: string;
  power_entity?: string;
  humidity_entity?: string;
  theme?: EquinoxTheme;
  display_mode?: EquinoxDisplayMode;
  disable_name?: boolean;
  enable_lock?: boolean;
  additional_dashboards?: EquinoxAdditionalDashboards;
}

export type EquinoxCardConfigInput = Partial<EquinoxCardConfig> & {
  type?: string;
};

export const DEFAULT_CONFIG = {
  theme: DEFAULT_THEME,
  display_mode: DEFAULT_DISPLAY_MODE,
  disable_name: false,
  enable_lock: true,
  additional_dashboards: DEFAULT_ADDITIONAL_DASHBOARDS
} satisfies Pick<
  EquinoxCardConfig,
  "theme" | "display_mode" | "disable_name" | "enable_lock" | "additional_dashboards"
>;

export type EquinoxConfigError =
  | "missing_entity"
  | "invalid_entity"
  | "invalid_theme"
  | "invalid_display_mode"
  | "invalid_additional_dashboards";

export interface EquinoxConfigValidation {
  config: EquinoxCardConfigInput;
  error?: EquinoxConfigError;
}
