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
  currentHumidity?: number;
  hvacModes: string[];
  presetModes: string[];
  presetMode?: string;
  fanMode?: string;
  fanModes: string[];
  minTemp?: number;
  maxTemp?: number;
  targetTempStep?: number;
  targetTemperatureRange?: EquinoxTemperatureRange;
}

export interface EquinoxViewModel {
  climate: EquinoxClimateViewModel;
}
