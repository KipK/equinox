export type EquinoxVtType = "over_switch" | "over_valve" | "over_climate" | "over_climate_valve";
export type EquinoxVtMessageSeverity = "info" | "alert" | "danger";

export interface EquinoxVtConfiguration {
  type?: string;
  proportionalFunction?: string;
  haveValveRegulation: boolean;
}

export interface EquinoxVtFlags {
  isPresenceConfigured: boolean;
  isPowerConfigured: boolean;
  isMotionConfigured: boolean;
  isWindowConfigured: boolean;
  isWindowAutoConfigured: boolean;
  isSafetyConfigured: boolean;
  isLockConfigured: boolean;
  isHeatingFailureDetectionConfigured: boolean;
  isRepairIncorrectStateConfigured: boolean;
}

export interface EquinoxVtPowerValveState {
  powerPercent?: number;
  valveOpenPercent?: number;
  onPercent?: number;
  meanCyclePower?: number;
  devicePower?: number;
  instantPower?: number;
  instantPowerUnit?: string;
}

export interface EquinoxVtTimedPresetState {
  isActive: boolean;
  remainingTimeMin?: number;
  preset?: string;
  originalPreset?: string;
}

export interface EquinoxVtLockState {
  isConfigured: boolean;
  isLocked: boolean;
  isUserLocked: boolean;
  isAutomationLocked: boolean;
  hasCode: boolean;
}

export interface EquinoxVtEventState {
  isHeating: boolean;
  isCooling: boolean;
  hasTimer: boolean;
  hasOpenWindow: boolean;
  hasOverpowering: boolean;
  hasPresence: boolean;
  hasLock: boolean;
  hasAlert: boolean;
  hasDanger: boolean;
}

export interface EquinoxVtMessage {
  key: string;
  severity: EquinoxVtMessageSeverity;
}

export interface EquinoxVtFanState {
  autoFanMode?: string;
  currentAutoFanMode?: string;
  hasAutoFan: boolean;
}

export interface EquinoxVtViewModel {
  isVt: boolean;
  types: EquinoxVtType[];
  configuration: EquinoxVtConfiguration;
  flags: EquinoxVtFlags;
  powerValve: EquinoxVtPowerValveState;
  timedPreset: EquinoxVtTimedPresetState;
  lock: EquinoxVtLockState;
  events: EquinoxVtEventState;
  messages: EquinoxVtMessage[];
  fan: EquinoxVtFanState;
  specificStates?: Record<string, unknown>;
  currentState?: Record<string, unknown>;
  requestedState?: Record<string, unknown>;
  powerManager?: Record<string, unknown>;
  safetyManager?: Record<string, unknown>;
  lockManager?: Record<string, unknown>;
  timedPresetManager?: Record<string, unknown>;
  vthermOverValve?: Record<string, unknown>;
  vthermOverSwitch?: Record<string, unknown>;
  vthermOverClimate?: Record<string, unknown>;
  vthermOverClimateValve?: Record<string, unknown>;
}
