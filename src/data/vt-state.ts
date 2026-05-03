import { asNumber, asString, firstDefined } from "./format";
import type { EquinoxCardConfig } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/ha";
import type {
  EquinoxVtFlags,
  EquinoxVtMessage,
  EquinoxVtMessageSeverity,
  EquinoxVtType,
  EquinoxVtViewModel
} from "../types/vt";

function readObject(source: unknown): Record<string, unknown> | undefined {
  return typeof source === "object" && source !== null ? (source as Record<string, unknown>) : undefined;
}

function readPath(source: unknown, path: string[]): unknown {
  return path.reduce<unknown>((current, key) => readObject(current)?.[key], source);
}

function asBoolean(value: unknown): boolean {
  return value === true;
}

function asMessageList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
  }

  return typeof value === "string" && value.trim() !== "" ? [value] : [];
}

function messageSeverity(key: string): EquinoxVtMessageSeverity {
  if (key === "safety_detected" || key === "heating_failure" || key === "cooling_failure") {
    return "danger";
  }

  if (key === "overpowering_detected" || key === "not_initialized") {
    return "alert";
  }

  return "info";
}

function readFlags(attributes: Record<string, unknown>): EquinoxVtFlags {
  return {
    isPresenceConfigured: asBoolean(attributes.is_presence_configured),
    isPowerConfigured: asBoolean(attributes.is_power_configured),
    isMotionConfigured: asBoolean(attributes.is_motion_configured),
    isWindowConfigured: asBoolean(attributes.is_window_configured),
    isWindowAutoConfigured: asBoolean(attributes.is_window_auto_configured),
    isSafetyConfigured: asBoolean(attributes.is_safety_configured),
    isLockConfigured: asBoolean(attributes.is_lock_configured),
    isHeatingFailureDetectionConfigured: asBoolean(attributes.is_heating_failure_detection_configured),
    isRepairIncorrectStateConfigured: asBoolean(attributes.is_repair_incorrect_state_configured)
  };
}

function readTypes(attributes: Record<string, unknown>): EquinoxVtType[] {
  const configurationType = asString(readPath(attributes, ["configuration", "type"]));
  const types: EquinoxVtType[] = [];

  if (attributes.is_over_switch === true || configurationType === "over_switch") {
    types.push("over_switch");
  }

  if (attributes.is_over_valve === true || configurationType === "over_valve") {
    types.push("over_valve");
  }

  if (attributes.is_over_climate === true || configurationType === "over_climate") {
    types.push("over_climate");
  }

  if (
    readPath(attributes, ["vtherm_over_climate_valve", "have_valve_regulation"]) === true ||
    readPath(attributes, ["configuration", "have_valve_regulation"]) === true
  ) {
    types.push("over_climate_valve");
  }

  return types;
}

function readMessages(attributes: Record<string, unknown>): EquinoxVtMessage[] {
  const messages = asMessageList(readPath(attributes, ["specific_states", "messages"]));

  if (readPath(attributes, ["safety_manager", "safety_state"]) === "on") {
    messages.push("safety_detected");
  }

  if (readPath(attributes, ["heating_failure_detection_manager", "heating_failure_state"]) === "on") {
    messages.push("heating_failure");
  }

  if (readPath(attributes, ["heating_failure_detection_manager", "cooling_failure_state"]) === "on") {
    messages.push("cooling_failure");
  }

  if (readPath(attributes, ["power_manager", "overpowering_state"]) === "on") {
    messages.push("overpowering_detected");
  }

  return [...new Set(messages)].map((key) => ({
    key,
    severity: messageSeverity(key)
  }));
}

function resolveAlgorithm(attributes: Record<string, unknown>): string | undefined {
  return firstDefined(
    asString(readPath(attributes, ["configuration", "proportional_function"])),
    asString(readPath(attributes, ["vtherm_over_valve", "function"])),
    asString(readPath(attributes, ["vtherm_over_climate_valve", "valve_regulation", "function"])),
    asString(readPath(attributes, ["specific_states", "proportional_function"]))
  );
}

export function buildVtViewModel(
  config: EquinoxCardConfig,
  hass: HomeAssistant,
  entity: HassEntity
): EquinoxVtViewModel | undefined {
  const attributes = entity.attributes;
  const specificStates = readObject(attributes.specific_states);
  const types = readTypes(attributes);
  const isVt = types.length > 0 || specificStates !== undefined || readObject(attributes.configuration) !== undefined;

  if (!isVt) {
    return undefined;
  }

  const flags = readFlags(attributes);
  const powerPercent = firstDefined(
    asNumber(readPath(attributes, ["vtherm_over_switch", "power_percent"])),
    asNumber(readPath(attributes, ["vtherm_over_climate", "valve_regulation", "power_percent"])),
    asNumber(attributes.power_percent)
  );
  const valveOpenPercent = firstDefined(
    asNumber(readPath(attributes, ["vtherm_over_valve", "valve_open_percent"])),
    asNumber(readPath(attributes, ["vtherm_over_climate_valve", "valve_regulation", "valve_open_percent"])),
    asNumber(attributes.valve_open_percent)
  );
  const timedPresetActive = readPath(attributes, ["timed_preset_manager", "is_active"]) === true;
  const lockIsLocked = firstDefined(
    readPath(attributes, ["lock_manager", "is_locked"]) === true ? true : undefined,
    readPath(attributes, ["specific_states", "is_locked"]) === true ? true : undefined
  ) === true;
  const messages = readMessages(attributes);
  const autoFanMode = asString(readPath(attributes, ["vtherm_over_climate", "auto_fan_mode"]));
  const currentAutoFanMode = asString(readPath(attributes, ["vtherm_over_climate", "current_auto_fan_mode"]));
  const instantPowerEntity = config.power_entity ? hass.states[config.power_entity] : undefined;
  const requestedHvacMode = asString(readPath(attributes, ["requested_state", "hvac_mode"]));

  return {
    isVt: true,
    types,
    configuration: {
      type: asString(readPath(attributes, ["configuration", "type"])),
      proportionalFunction: resolveAlgorithm(attributes),
      haveValveRegulation:
        readPath(attributes, ["configuration", "have_valve_regulation"]) === true ||
        readPath(attributes, ["vtherm_over_climate_valve", "have_valve_regulation"]) === true
    },
    flags,
    powerValve: {
      powerPercent,
      valveOpenPercent,
      onPercent: firstDefined(asNumber(readPath(attributes, ["vtherm_over_valve", "on_percent"])), asNumber(attributes.on_percent)),
      meanCyclePower: asNumber(readPath(attributes, ["power_manager", "mean_cycle_power"])),
      devicePower: asNumber(readPath(attributes, ["power_manager", "device_power"])),
      instantPower: asNumber(instantPowerEntity?.state),
      instantPowerUnit: asString(instantPowerEntity?.attributes.unit_of_measurement)
    },
    timedPreset: {
      isActive: timedPresetActive,
      remainingTimeMin: asNumber(readPath(attributes, ["timed_preset_manager", "remaining_time_min"])),
      preset: asString(readPath(attributes, ["timed_preset_manager", "preset"])),
      originalPreset: asString(readPath(attributes, ["timed_preset_manager", "original_preset"]))
    },
    lock: {
      isConfigured: flags.isLockConfigured,
      isLocked: lockIsLocked,
      isUserLocked: lockIsLocked && (!flags.isLockConfigured || readPath(attributes, ["lock_manager", "lock_users"]) === true),
      isAutomationLocked: lockIsLocked && readPath(attributes, ["lock_manager", "lock_automations"]) === true,
      hasCode: readPath(attributes, ["lock_manager", "lock_code"]) === true
    },
    events: {
      isHeating:
        attributes.hvac_action === "heating" ||
        (types.includes("over_switch") && powerPercent !== undefined && powerPercent > 0 && requestedHvacMode === "heat"),
      isCooling: attributes.hvac_action === "cooling",
      hasTimer: timedPresetActive,
      hasOpenWindow:
        (flags.isWindowConfigured && readPath(attributes, ["window_manager", "window_state"]) === "on") ||
        (flags.isWindowAutoConfigured && readPath(attributes, ["window_manager", "window_auto_state"]) === "on"),
      hasOverpowering: readPath(attributes, ["power_manager", "overpowering_state"]) === "on",
      hasPresence: flags.isPresenceConfigured && readPath(attributes, ["presence_manager", "presence_state"]) === "on",
      hasLock: lockIsLocked,
      hasAlert: messages.some((message) => message.severity === "alert"),
      hasDanger: messages.some((message) => message.severity === "danger")
    },
    messages,
    fan: {
      autoFanMode,
      currentAutoFanMode,
      hasAutoFan: autoFanMode !== undefined || currentAutoFanMode !== undefined
    },
    specificStates,
    currentState: readObject(attributes.current_state),
    requestedState: readObject(attributes.requested_state),
    powerManager: readObject(attributes.power_manager),
    safetyManager: readObject(attributes.safety_manager),
    lockManager: readObject(attributes.lock_manager),
    timedPresetManager: readObject(attributes.timed_preset_manager),
    vthermOverValve: readObject(attributes.vtherm_over_valve),
    vthermOverSwitch: readObject(attributes.vtherm_over_switch),
    vthermOverClimate: readObject(attributes.vtherm_over_climate),
    vthermOverClimateValve: readObject(attributes.vtherm_over_climate_valve)
  };
}
