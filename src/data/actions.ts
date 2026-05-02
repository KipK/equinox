import type { EquinoxViewModel } from "../types/view-model";
import type { HomeAssistant } from "../types/ha";

export type EquinoxActionErrorCode = "locked" | "unsupported" | "invalid_payload" | "service_error";

export interface EquinoxActionResult {
  ok: boolean;
  error?: EquinoxActionErrorCode;
  cause?: unknown;
}

export interface EquinoxActionContext {
  hass: HomeAssistant;
  entityId: string;
  viewModel?: EquinoxViewModel;
}

export interface SetTemperatureOptions {
  temperature?: number;
  targetTempLow?: number;
  targetTempHigh?: number;
}

const AUTO_FAN_MODE_MAPPING: Record<string, string> = {
  auto_fan_none: "None",
  auto_fan_low: "Low",
  auto_fan_medium: "Medium",
  auto_fan_high: "High",
  auto_fan_turbo: "Turbo"
};

function isLocked(context: EquinoxActionContext): boolean {
  return context.viewModel?.vt?.lock.isUserLocked === true;
}

function lockedResult(): EquinoxActionResult {
  return { ok: false, error: "locked" };
}

function unsupportedResult(): EquinoxActionResult {
  return { ok: false, error: "unsupported" };
}

function invalidPayloadResult(): EquinoxActionResult {
  return { ok: false, error: "invalid_payload" };
}

async function callService(
  context: EquinoxActionContext,
  domain: string,
  service: string,
  serviceData: Record<string, unknown>
): Promise<EquinoxActionResult> {
  try {
    await context.hass.callService(domain, service, serviceData);
    return { ok: true };
  } catch (cause) {
    return { ok: false, error: "service_error", cause };
  }
}

function finiteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export async function setTemperature(
  context: EquinoxActionContext,
  options: SetTemperatureOptions
): Promise<EquinoxActionResult> {
  if (isLocked(context)) {
    return lockedResult();
  }

  if (finiteNumber(options.targetTempLow) && finiteNumber(options.targetTempHigh)) {
    return callService(context, "climate", "set_temperature", {
      entity_id: context.entityId,
      target_temp_low: options.targetTempLow,
      target_temp_high: options.targetTempHigh
    });
  }

  if (!finiteNumber(options.temperature)) {
    return invalidPayloadResult();
  }

  return callService(context, "climate", "set_temperature", {
    entity_id: context.entityId,
    temperature: options.temperature
  });
}

export async function setHvacMode(context: EquinoxActionContext, hvacMode: string): Promise<EquinoxActionResult> {
  if (isLocked(context)) {
    return lockedResult();
  }

  if (!context.viewModel?.climate.hvacModes.includes(hvacMode)) {
    return unsupportedResult();
  }

  return callService(context, "climate", "set_hvac_mode", {
    entity_id: context.entityId,
    hvac_mode: hvacMode
  });
}

export async function setPresetMode(context: EquinoxActionContext, presetMode: string): Promise<EquinoxActionResult> {
  if (isLocked(context)) {
    return lockedResult();
  }

  if (!context.viewModel?.climate.presetModes.includes(presetMode)) {
    return unsupportedResult();
  }

  return callService(context, "climate", "set_preset_mode", {
    entity_id: context.entityId,
    preset_mode: presetMode
  });
}

export async function setFanMode(context: EquinoxActionContext, fanMode: string): Promise<EquinoxActionResult> {
  if (isLocked(context)) {
    return lockedResult();
  }

  if (!context.viewModel?.climate.fanModes.includes(fanMode)) {
    return unsupportedResult();
  }

  return callService(context, "climate", "set_fan_mode", {
    entity_id: context.entityId,
    fan_mode: fanMode
  });
}

export async function setTimedPreset(
  context: EquinoxActionContext,
  preset: string,
  durationMinutes: number
): Promise<EquinoxActionResult> {
  if (isLocked(context)) {
    return lockedResult();
  }

  if (!context.viewModel?.vt?.isVt || !context.viewModel.vt.timedPresetManager) {
    return unsupportedResult();
  }

  if (!Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > 1440 || preset.trim() === "") {
    return invalidPayloadResult();
  }

  return callService(context, "versatile_thermostat", "set_timed_preset", {
    entity_id: context.entityId,
    preset,
    duration_minutes: durationMinutes
  });
}

export async function cancelTimedPreset(context: EquinoxActionContext): Promise<EquinoxActionResult> {
  if (isLocked(context)) {
    return lockedResult();
  }

  if (!context.viewModel?.vt?.timedPreset.isActive) {
    return unsupportedResult();
  }

  return callService(context, "versatile_thermostat", "cancel_timed_preset", {
    entity_id: context.entityId
  });
}

export async function setAutoFanMode(context: EquinoxActionContext, autoFanMode: string): Promise<EquinoxActionResult> {
  if (isLocked(context)) {
    return lockedResult();
  }

  if (!context.viewModel?.vt?.fan.hasAutoFan) {
    return unsupportedResult();
  }

  const mappedMode = AUTO_FAN_MODE_MAPPING[autoFanMode];

  if (!mappedMode) {
    return invalidPayloadResult();
  }

  return callService(context, "versatile_thermostat", "set_auto_fan_mode", {
    entity_id: context.entityId,
    auto_fan_mode: mappedMode
  });
}

export async function lock(context: EquinoxActionContext, code?: string): Promise<EquinoxActionResult> {
  if (!context.viewModel?.vt?.lock.isConfigured) {
    return unsupportedResult();
  }

  const serviceData: Record<string, unknown> = { entity_id: context.entityId };

  if (code) {
    serviceData.code = code;
  }

  return callService(context, "versatile_thermostat", "lock", serviceData);
}

export async function unlock(context: EquinoxActionContext, code?: string): Promise<EquinoxActionResult> {
  if (!context.viewModel?.vt?.lock.isConfigured) {
    return unsupportedResult();
  }

  const serviceData: Record<string, unknown> = { entity_id: context.entityId };

  if (code) {
    serviceData.code = code;
  }

  return callService(context, "versatile_thermostat", "unlock", serviceData);
}
