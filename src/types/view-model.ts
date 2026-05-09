import type { EquinoxVtViewModel } from "./vt";

export type EquinoxAvailability = "available" | "unknown" | "unavailable";

export interface EquinoxTemperatureRange {
  low?: number;
  high?: number;
}

export interface EquinoxClimateViewModel {
  entityId: string;
  name?: string;
  availability: EquinoxAvailability;
  hvacMode?: string;
  hvacAction?: string;
  targetTemperature?: number;
  currentTemperature?: number;
  currentTemperatureDecimals?: number;
  temperatureEntityId?: string;
  currentHumidity?: number;
  hvacModes: string[];
  presetModes: string[];
  presetMode?: string;
  fanMode?: string;
  fanModes: string[];
  swingMode?: string;
  swingModes: string[];
  swingHorizontalMode?: string;
  swingHorizontalModes: string[];
  minTemp?: number;
  maxTemp?: number;
  targetTempStep?: number;
  targetTemperatureRange?: EquinoxTemperatureRange;
  instantPower?: number;
  instantPowerUnit?: string;
}

export interface EquinoxViewModel {
  climate: EquinoxClimateViewModel;
  vt?: EquinoxVtViewModel;
}
