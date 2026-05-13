export const HVAC_ORDER = ["heat", "cool", "heat_cool", "auto", "dry", "fan_only", "off"];

export const HVAC_ICONS: Record<string, string> = {
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power"
};

export const HVAC_TONES: Record<string, string> = {
  heat: "heat",
  cool: "cool",
  heat_cool: "heat-cool",
  auto: "auto",
  dry: "cool",
  fan_only: "auto",
  off: "off"
};

export const PRESET_ORDER = ["frost", "eco", "away", "comfort", "home", "sleep", "activity", "boost"];

export const PRESET_ICONS: Record<string, string> = {
  frost: "mdi:snowflake",
  eco: "mdi:tree-outline",
  away: "mdi:home-export-outline",
  comfort: "mdi:sofa-outline",
  home: "mdi:home-outline",
  sleep: "mdi:sleep",
  activity: "mdi:motion-sensor",
  boost: "mdi:rocket-launch-outline"
};

export const SWING_ORDER = ["off", "on", "vertical", "horizontal", "both"];

export const SWING_MODE_ICONS: Record<string, string> = {
  off: "mdi:arrow-oscillating-off",
  Off: "mdi:arrow-oscillating-off",
  SWING_OFF: "mdi:arrow-oscillating-off",
  on: "mdi:arrow-oscillating",
  On: "mdi:arrow-oscillating",
  SWING_ON: "mdi:arrow-oscillating",
  vertical: "mdi:arrow-up-down",
  Vertical: "mdi:arrow-up-down",
  SWING_VERTICAL: "mdi:arrow-up-down",
  horizontal: "mdi:arrow-left-right",
  Horizontal: "mdi:arrow-left-right",
  SWING_HORIZONTAL: "mdi:arrow-left-right",
  both: "mdi:arrow-all",
  Both: "mdi:arrow-all",
  SWING_BOTH: "mdi:arrow-all"
};

export const SWING_HORIZONTAL_MODE_ICONS: Record<string, string> = {
  off: "mdi:arrow-oscillating-off",
  Off: "mdi:arrow-oscillating-off",
  on: "mdi:arrow-expand-horizontal",
  On: "mdi:arrow-expand-horizontal"
};
