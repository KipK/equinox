import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { lock as lockThermostat, setHvacMode, setPresetMode, setTemperature, unlock as unlockThermostat } from "../data/actions";
import { HVAC_ICONS, HVAC_ORDER, HVAC_TONES, PRESET_ICONS, PRESET_ORDER, SWING_HORIZONTAL_MODE_ICONS, SWING_MODE_ICONS } from "../data/climate-modes";
import { actionTone, fanTone, lockTone, presetTone, swingTone } from "../data/colors";
import { FAN_MODE_ICONS } from "../data/fan";
import { loadRegulationDashboard, type RegulationDashboardLoadResult } from "../data/regulation-dashboard-loader";
import { resolveRegulationDashboard } from "../data/regulation-dashboard-resolver";
import { DEFAULT_THEME } from "../const";
import { localize } from "../localize/localize";
import { baseStyles } from "../styles/base";
import { flatStyles } from "../styles/flat";
import { liquidGlowStyles } from "../styles/liquid-glow";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { RegulationDashboard } from "../types/regulation-dashboard";
import type { EquinoxVtMessage } from "../types/vt";
import type { EquinoxViewModel } from "../types/view-model";
import type { SensorMoreInfoTarget } from "./eq-sensor-more-info-dialog";
import "./eq-fan-dialog";
import "./eq-hvac-dialog";
import "./eq-swing-dialog";
import "./eq-preset-dialog";
import "./eq-temperature-dialog";
import "./eq-menu-dialog";
import "./eq-boost-dialog";
import "./eq-history-dialog";
import "./eq-sensor-more-info-dialog";
import "./eq-regulation-dialog";
import "./eq-lock-dialog";
import "./eq-dialog";

const BROWSER_HISTORY_STATE_KEY = "equinox";

interface BrowserHistoryEntry {
  instanceId: string;
  layer: "history-dialog" | "regulation-dialog" | "sensor-more-info-dialog";
  sectionId?: string;
  regulationDepth?: number;
  sensorTarget?: SensorMoreInfoTarget;
}

type EventIconDefinition = {
  key: keyof NonNullable<EquinoxViewModel["vt"]>["events"];
  icon: string;
  tone: string;
  messageKeys?: string[];
};

type TemperatureRangeBound = "low" | "high";
type LightweightDialog = "fan" | "swing" | "hvac" | "preset" | "temperature" | "menu" | "boost";

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

const EVENT_ICONS: EventIconDefinition[] = [
  { key: "hasOverpowering", icon: "mdi:flash-alert", tone: "warning", messageKeys: ["overpowering_detected", "target_temp_power"] },
  {
    key: "hasOpenWindow",
    icon: "mdi:window-open-variant",
    tone: "info",
    messageKeys: ["hvac_off_window_detection", "target_temp_window_eco", "target_temp_window_frost"]
  },
  { key: "hasPresence", icon: "mdi:home-account", tone: "info" },
  { key: "hasTimer", icon: "mdi:timer-outline", tone: "boost", messageKeys: ["target_temp_timed_preset"] }
];

const MESSAGE_ICONS: Record<string, { icon: string; tone: string }> = {
  safety_detected: { icon: "mdi:thermometer-alert", tone: "danger" },
  heating_failure: { icon: "mdi:thermometer-alert", tone: "danger" },
  cooling_failure: { icon: "mdi:snowflake-alert", tone: "danger" },
  overpowering_detected: { icon: "mdi:flash-alert", tone: "warning" },
  target_temp_power: { icon: "mdi:flash-alert", tone: "warning" },
  hvac_off_window_detection: { icon: "mdi:window-open-variant", tone: "info" },
  target_temp_window_eco: { icon: "mdi:window-open-variant", tone: "info" },
  target_temp_window_frost: { icon: "mdi:window-open-variant", tone: "info" },
  hvac_off_auto_start_stop: { icon: "mdi:power-sleep", tone: "boost" },
  hvac_off_sleep_mode: { icon: "mdi:sleep", tone: "boost" },
  target_temp_timed_preset: { icon: "mdi:timer-outline", tone: "boost" },
  target_temp_activity_detected: { icon: "mdi:motion-sensor", tone: "info" },
  target_temp_activity_not_detected: { icon: "mdi:motion-sensor-off", tone: "info" },
  target_temp_absence_detected: { icon: "mdi:home-export-outline", tone: "info" },
  hvac_off_central_mode: { icon: "mdi:home-thermometer-outline", tone: "info" },
  target_temp_central_mode: { icon: "mdi:home-thermometer-outline", tone: "info" },
  hvac_off_manual: { icon: "mdi:power", tone: "info" },
  hvac_off_safety_detection: { icon: "mdi:thermometer-alert", tone: "danger" },
  not_initialized: { icon: "mdi:alert-box-outline", tone: "warning" }
};

// Icons follow homeassistant/components/climate/icons.json (HA core);
// tones follow CLIMATE_HVAC_ACTION_TO_MODE in src/data/colors.ts so the icon
// hue matches HA's official tile/thermostat colorisation. Heat/cool icons are
// resolved with active/inactive variants in _hvacActionIcon().
const HVAC_ACTION_ICONS: Record<string, { icon?: string; tone: string }> = {
  preheating: { icon: "mdi:radiator", tone: actionTone("preheating") },
  heat: { icon: "mdi:radiator", tone: actionTone("heating") },
  heating: { icon: "mdi:radiator", tone: actionTone("heating") },
  cool: { icon: "mdi:hvac", tone: actionTone("cooling") },
  cooling: { icon: "mdi:hvac", tone: actionTone("cooling") },
  drying: { icon: "mdi:water-percent", tone: actionTone("drying") },
  fan: { icon: "mdi:fan", tone: actionTone("fan") },
  idle: { tone: actionTone("idle") },
  defrosting: { icon: "mdi:snowflake-melt", tone: actionTone("defrosting") }
};

function finite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function cssColor(value: string | number[] | undefined): string | undefined {
  if (typeof value === "string" && value.trim() !== "") return value.trim();
  if (!Array.isArray(value) || value.length < 3) return undefined;

  const [r, g, b] = value.map((part) => Number(part));
  if (![r, g, b].every((part) => Number.isFinite(part))) return undefined;

  return `rgb(${r}, ${g}, ${b})`;
}

function rgbColor(value: string | number[] | undefined): RgbColor | undefined {
  if (Array.isArray(value) && value.length >= 3) {
    const [r, g, b] = value.map((part) => Number(part));
    if (![r, g, b].every((part) => Number.isFinite(part))) return undefined;

    return {
      r: Math.min(255, Math.max(0, r)),
      g: Math.min(255, Math.max(0, g)),
      b: Math.min(255, Math.max(0, b))
    };
  }

  if (typeof value !== "string") return undefined;

  const color = value.trim();
  const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)?.[1];

  if (hex) {
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16)
      };
    }

    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16)
    };
  }

  const rgb = color.match(/^rgba?\(\s*([\d.]+)(?:\s*,\s*|\s+)([\d.]+)(?:\s*,\s*|\s+)([\d.]+)/i);

  if (!rgb) return undefined;

  const [, r, g, b] = rgb;
  const channels = [r, g, b].map((part) => Number(part));
  if (!channels.every((part) => Number.isFinite(part))) return undefined;

  return {
    r: Math.min(255, Math.max(0, channels[0])),
    g: Math.min(255, Math.max(0, channels[1])),
    b: Math.min(255, Math.max(0, channels[2]))
  };
}

function relativeLuminance({ r, g, b }: RgbColor): number {
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return channel(r) * 0.2126 + channel(g) * 0.7152 + channel(b) * 0.0722;
}

function surfaceTextColor(color: string | number[] | undefined, opacity: number | undefined): string | undefined {
  if (opacity !== undefined && opacity < 70) return undefined;

  const rgb = rgbColor(color);
  if (!rgb) return undefined;

  return relativeLuminance(rgb) > 0.42 ? "#111418" : "#ffffff";
}

function normalizedOpacity(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;

  const opacity = Number(value);
  if (!Number.isFinite(opacity)) return undefined;

  return Math.min(100, Math.max(0, opacity));
}

function uniqueOrdered(values: string[], preferredOrder: string[]): string[] {
  const unique = [...new Set(values)];
  const ordered = preferredOrder.filter((value) => unique.includes(value));
  const extra = unique.filter((value) => !preferredOrder.includes(value));

  return [...ordered, ...extra];
}

export class EquinoxMainCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    viewModel: { attribute: false },
    _activeDialog: { state: true },
    _dialogAnchor: { state: true },
    _activeMessageKey: { state: true },
    _activeSensorInfoTarget: { state: true },
    _lockDialogOpen: { state: true },
    _lockIsLocking: { state: true },
    _regulationLoadResult: { state: true },
    _regulationActiveSectionId: { state: true }
  };

  static styles = [
    baseStyles,
    flatStyles,
    css`
      :host {
        display: block;
        position: relative;
        container-type: inline-size;
        height: 100%;
        --equinox-card-surface-bg: var(--equinox-config-card-bg, var(--equinox-card-bg));
        --equinox-mode-control-bg: var(--equinox-config-card-bg, var(--equinox-control-bg));
        --equinox-mode-control-text: var(--equinox-card-surface-text-color, var(--equinox-text-color));
        --equinox-mode-control-muted: color-mix(in srgb, var(--equinox-mode-control-text) 68%, transparent);
        --equinox-mode-control-border-color: color-mix(in srgb, var(--equinox-mode-control-text) 18%, transparent);
        --equinox-mode-control-hover-bg: color-mix(in srgb, var(--equinox-mode-control-bg) 82%, var(--equinox-mode-control-text) 18%);
      }

      ha-card {
        height: 100%;
        overflow: visible;
        border-radius: var(--equinox-radius);
        background: var(--equinox-card-surface-bg);
        border: 1px solid var(--equinox-border-color);
        box-shadow: var(--equinox-shadow);
        color: var(--equinox-text-color);
      }

      .card {
        display: flex;
        flex-direction: column;
        gap: 11px;
        padding: 15px 16px 16px;
        box-sizing: border-box;
        min-height: 100%;
      }

      .card[thin] {
        gap: 7px;
        padding: 10px 12px;
      }

      .name {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 28px;
        align-items: center;
        gap: 8px;
        min-height: 20px;
        font-size: var(--ha-card-header-font-size, 16px);
        font-weight: var(--ha-card-header-font-weight, 500);
        line-height: var(--ha-card-header-line-height, 20px);
      }

      .name-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .status {
        min-height: 27px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .status-spacer {
        flex: 1;
        min-width: 0;
      }

      .events {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        min-width: 28px;
      }

      .event {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--equinox-info-color);
        padding: 0;
      }

      .event[tone="warning"] {
        color: var(--equinox-warning-color);
      }

      .event[tone="danger"] {
        color: var(--equinox-danger-color);
      }

      .event[tone="boost"] {
        color: var(--equinox-boost-color);
      }

      button.event {
        cursor: pointer;
      }

      button.event:hover {
        background: color-mix(in srgb, var(--equinox-control-bg) 80%, var(--equinox-text-color) 14%);
      }

      .event ha-icon,
      .lock ha-icon {
        --mdc-icon-size: 22px;
      }

      .message-body {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 220px;
        max-width: 360px;
        color: var(--equinox-text-color);
        font-size: 14px;
        line-height: 1.35;
      }

      .message-body ha-icon {
        --mdc-icon-size: 24px;
        flex: 0 0 auto;
        color: var(--equinox-info-color);
      }

      .message-body[tone="warning"] ha-icon {
        color: var(--equinox-warning-color);
      }

      .message-body[tone="danger"] ha-icon {
        color: var(--equinox-danger-color);
      }

      .message-body[tone="boost"] ha-icon {
        color: var(--equinox-boost-color);
      }

      .lock {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--equinox-text-color);
        padding: 0;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      .lock:disabled {
        cursor: default;
        opacity: 0.45;
      }

      .lock:hover:not(:disabled),
      .lock:focus-visible:not(:disabled) {
        background: color-mix(in srgb, var(--equinox-control-bg) 80%, var(--equinox-text-color) 14%);
      }

      .action-icon {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: visible;
        color: var(--equinox-muted-color);
      }

      .action-icon ha-icon {
        --mdc-icon-size: 22px;
        width: 22px;
        height: 22px;
      }

      .action-icon-glyph {
        position: relative;
        z-index: 1;
      }

      .action-icon-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 0;
        pointer-events: none;
        opacity: 0;
        transform: translate(-50%, -50%) scale(1);
      }

      .action-icon[tone="heat"] {
        color: var(--equinox-heat-color);
      }

      .action-icon[tone="cool"] {
        color: var(--equinox-cool-color);
      }

      .action-icon[tone="auto"] {
        color: var(--equinox-auto-color);
      }

      .action-icon[tone="heat-cool"] {
        color: var(--equinox-heat-cool-color);
      }

      .action-icon[tone="off"] {
        color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      .action-icon[tone="dry"] {
        color: var(--equinox-dry-color);
      }

      .action-icon[tone="fan-only"] {
        color: var(--equinox-fan-only-color);
      }

      .action-icon[tone="muted"] {
        color: var(--equinox-muted-tone-color);
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 11px;
        flex: 1;
        min-height: 0;
        position: relative;
        --rail-icon-size: clamp(20px, 7cqi, 26px);
        --rail-mode-button-size: clamp(28px, 8.5cqi, 32px);
        --rail-menu-size: clamp(22px, 7.5cqi, 28px);
        --rail-icon-inner-size: clamp(17px, 5.8cqi, 22px);
        --rail-gap: clamp(4px, 2.5cqi, 8px);
        --rail-power-font-size: clamp(10px, 3.6cqi, 12px);
      }

      .layout[state-vertical] {
        align-items: start;
      }

      .main {
        display: flex;
        flex-direction: column;
        gap: 11px;
        min-width: 0;
        grid-area: 1 / 1;
      }

      .state-rail,
      .left-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--rail-gap);
        min-width: 0;
      }

      .layout[state-vertical] .state-rail,
      .layout[state-vertical] .left-rail {
        position: absolute;
        top: 0;
        z-index: 1;
      }

      .state-rail {
        justify-content: flex-start;
        right: 0;
      }

      .left-rail {
        justify-content: flex-start;
        left: 0;
      }

      .state-rail .events {
        flex-direction: column;
        justify-content: flex-start;
      }

      .state-rail .lock,
      .state-rail .fan,
      .state-rail .swing,
      .state-rail .menu,
      .left-rail .fan,
      .left-rail .swing,
      .left-rail .power-info,
      .state-rail .power-info {
        flex: 0 0 auto;
      }

      .state-rail .event,
      .state-rail .action-icon,
      .state-rail .lock,
      .left-rail .power-info-button,
      .state-rail .power-info-button {
        width: var(--rail-icon-size);
        height: var(--rail-icon-size);
      }

      .state-rail .fan,
      .state-rail .swing,
      .left-rail .fan,
      .left-rail .swing {
        width: var(--rail-mode-button-size);
        height: var(--rail-mode-button-size);
      }

      .state-rail .menu {
        width: var(--rail-menu-size);
        height: var(--rail-menu-size);
      }

      .state-rail .event ha-icon,
      .state-rail .action-icon ha-icon,
      .state-rail .lock ha-icon,
      .state-rail .fan ha-icon,
      .state-rail .swing ha-icon,
      .state-rail .menu ha-icon,
      .left-rail .fan ha-icon,
      .left-rail .swing ha-icon,
      .left-rail .power-info-button ha-icon,
      .state-rail .power-info-button ha-icon {
        --mdc-icon-size: var(--rail-icon-inner-size);
      }

      .setpoint {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(10px, 4cqi, 18px);
        margin-top: 2px;
      }

      .setpoint[sensor-focus] {
        flex-direction: column;
        gap: 8px;
        margin-top: 0;
        --sensor-focus-temperature-size: clamp(18px, 10cqi, 40px);
        --sensor-focus-humidity-size: clamp(11px, 4.8cqi, 20px);
        --sensor-focus-temperature-icon-size: clamp(18px, 7cqi, 28px);
        --sensor-focus-humidity-icon-size: clamp(13px, 4.8cqi, 18px);
      }

      .step {
        width: clamp(30px, 9cqi, 40px);
        height: clamp(30px, 9cqi, 40px);
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        --control-button-border-radius: 50%;
        --control-button-padding: 0;
        --control-button-background-color: var(--equinox-mode-control-bg);
        --control-button-background-opacity: 1;
        --control-button-focus-color: var(--primary-color);
        --control-button-icon-color: var(--equinox-mode-control-text);
        --mdc-icon-size: 24px;
        filter: drop-shadow(0 1px 3px rgb(0 0 0 / 18%));
      }

      .step:hover:not([disabled]) {
        --control-button-background-color: var(--equinox-mode-control-hover-bg);
      }

      .setpoint-control {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(5px, 2.5cqi, 10px);
      }

      .setpoint-control[compact] {
        gap: clamp(4px, 1.8cqi, 6px);
      }

      .setpoint-control[compact] .step {
        width: clamp(24px, 7cqi, 30px);
        height: clamp(24px, 7cqi, 30px);
      }

      .setpoint-control[compact] .step ha-icon {
        --mdc-icon-size: 18px;
        width: 18px;
        height: 18px;
      }

      .range-setpoint-control {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(8px, 3cqi, 14px);
        min-width: 0;
      }

      .range-setpoint-control[mode="heat-cool"] {
        flex-direction: column;
        gap: clamp(6px, 2cqi, 10px);
      }

      @container (min-width: 340px) {
        .range-setpoint-control[mode="heat-cool"] {
          flex-direction: row;
          gap: clamp(8px, 3cqi, 14px);
        }
      }

      .range-bound {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        min-width: 0;
      }

      .range-label {
        color: var(--equinox-muted-color);
        font-size: clamp(9px, 3cqi, 11px);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: 1;
        text-transform: uppercase;
      }

      .range-bound .setpoint-control {
        gap: clamp(3px, 1.2cqi, 5px);
      }

      .range-bound .step {
        width: clamp(24px, 7cqi, 30px);
        height: clamp(24px, 7cqi, 30px);
      }

      .range-bound .step ha-icon {
        --mdc-icon-size: 18px;
        width: 18px;
        height: 18px;
      }

      .range-bound .target {
        font-size: clamp(18px, 6.5cqi, 26px);
      }

      .target {
        min-width: 0;
        display: flex;
        align-items: baseline;
        justify-content: center;
        font-size: clamp(24px, 9cqi, 38px);
        line-height: 1;
        font-weight: var(--ha-font-weight-normal, 400);
        color: var(--equinox-auto-color);
      }

      .setpoint-input {
        font-size: inherit;
        font-weight: inherit;
        font-family: inherit;
        line-height: inherit;
        color: inherit;
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        text-align: center;
        cursor: pointer;
      }

      .setpoint-input:focus {
        cursor: text;
      }

      .setpoint-input:disabled {
        cursor: default;
      }

      .setpoint-unit {
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
      }

      .target[mode="heat"],
      .target[mode="boost"] {
        color: var(--equinox-heat-color);
      }

      .target[mode="cool"] {
        color: var(--equinox-cool-color);
      }

      .target[mode="heat-cool"] {
        color: var(--equinox-heat-cool-color);
      }

      .target[mode="off"],
      .target[mode="unavailable"] {
        color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      .target[compact] {
        font-size: clamp(15px, 5cqi, 20px);
        font-weight: var(--ha-font-weight-medium, 500);
      }

      .sensor-primary {
        display: inline-flex;
        align-items: baseline;
        justify-content: center;
        gap: clamp(4px, 2.5cqi, 12px);
        min-width: 0;
      }

      .sensor-temperature {
        display: inline-flex;
        align-items: baseline;
        gap: clamp(2px, 1.1cqi, 4px);
        font-size: var(--sensor-focus-temperature-size, clamp(26px, 9.5cqi, 40px));
        line-height: 1;
        font-weight: var(--ha-font-weight-normal, 400);
        color: var(--equinox-text-color);
        min-width: 0;
      }

      .sensor-temperature[clickable] {
        cursor: pointer;
      }

      .sensor-temperature[clickable]:hover {
        opacity: 0.75;
      }

      .sensor-temperature ha-icon {
        --mdc-icon-size: var(--sensor-focus-temperature-icon-size, 28px);
        width: var(--sensor-focus-temperature-icon-size, 28px);
        height: var(--sensor-focus-temperature-icon-size, 28px);
        color: var(--equinox-muted-color);
      }

      .sensor-temperature .sensor-unit {
        font-size: 0.82em;
      }

      .sensor-humidity {
        display: inline-flex;
        align-items: baseline;
        gap: clamp(2px, 1cqi, 3px);
        color: var(--equinox-muted-color);
        font-size: var(--sensor-focus-humidity-size, clamp(14px, 5cqi, 20px));
        line-height: 1;
        font-weight: var(--ha-font-weight-normal, 400);
        cursor: pointer;
        min-width: 0;
      }

      .sensor-humidity:hover {
        opacity: 0.75;
      }


      .sensor-humidity ha-icon {
        --mdc-icon-size: var(--sensor-focus-humidity-icon-size, 18px);
        width: var(--sensor-focus-humidity-icon-size, 18px);
        height: var(--sensor-focus-humidity-icon-size, 18px);
        color: var(--equinox-muted-color);
      }

      .conditions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(8px, 4cqi, 16px);
        color: var(--equinox-muted-color);
        font-size: clamp(14px, 5cqi, 20px);
        font-weight: var(--ha-font-weight-normal, 400);
      }

      .condition {
        display: inline-flex;
        align-items: center;
        gap: clamp(3px, 1.5cqi, 6px);
        min-width: 66px;
        justify-content: center;
      }

      .condition[clickable] {
        cursor: pointer;
      }

      .condition[clickable]:hover {
        opacity: 0.75;
      }

      .condition ha-icon {
        --condition-icon-size: clamp(15px, 4.8cqi, 20px);
        color: var(--equinox-muted-color);
        --mdc-icon-size: var(--condition-icon-size);
        width: var(--condition-icon-size);
        height: var(--condition-icon-size);
      }

      .condition-value[kind="temperature"] {
        color: var(--equinox-text-color);
      }

      .condition-value[kind="humidity"] {
        color: var(--equinox-muted-color);
        font-size: 14px;
      }

      .divider {
        width: 1px;
        align-self: stretch;
        min-height: 26px;
        background: var(--equinox-border-color);
      }

      .segments {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0, 1fr);
        border-radius: var(--equinox-control-radius);
        overflow: hidden;
        min-height: clamp(36px, 14cqi, 45px);
        background: var(--equinox-mode-control-bg);
        border: 1px solid var(--equinox-mode-control-border-color);
      }

      .segments ha-control-button:not(:last-child) {
        border-inline-end: 1px solid var(--equinox-mode-control-border-color);
      }

      .segments ha-control-button,
      .compact-selectors ha-control-button {
        display: block;
        min-width: 0;
        width: 100%;
        height: 45px;
        --control-button-border-radius: var(--equinox-control-radius);
        --control-button-background-color: transparent;
        --control-button-background-opacity: 0;
        --control-button-focus-color: var(--primary-color);
        --control-button-icon-color: var(--equinox-mode-control-muted);
        --control-button-padding: 0;
      }

      .segments ha-control-button {
        height: 100%;
        --control-button-border-radius: 0;
        --control-button-padding: 0;
      }

      .compact-selectors {
        display: flex;
        gap: clamp(3px, 2.4cqi, 8px);
        min-height: clamp(36px, 14cqi, 45px);
      }

      .compact-selectors ha-control-button {
        flex: 1;
        min-width: 0;
        height: clamp(36px, 14cqi, 45px);
        border: 1px solid var(--equinox-mode-control-border-color);
        border-radius: var(--equinox-control-radius);
        background: var(--equinox-mode-control-bg);
        overflow: hidden;
      }

      ha-control-button:hover:not([disabled]) {
        --control-button-icon-color: var(--equinox-mode-control-text);
        --control-button-background-color: var(--equinox-mode-control-hover-bg);
        --control-button-background-opacity: 1;
      }

      ha-control-button[active] {
        --control-button-icon-color: var(--equinox-mode-control-text);
        --control-button-background-color: var(--equinox-control-active-bg);
        --control-button-background-opacity: 1;
      }

      ha-control-button[active][subtle] {
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 74%, var(--equinox-mode-control-text) 10%);
      }

      ha-control-button[tone="heat"]:not([active]) {
        --control-button-icon-color: var(--equinox-heat-color);
      }

      ha-control-button[tone="cool"]:not([active]) {
        --control-button-icon-color: var(--equinox-cool-color);
      }

      ha-control-button[tone="auto"]:not([active]) {
        --control-button-icon-color: var(--equinox-auto-color);
      }

      ha-control-button[tone="heat-cool"]:not([active]) {
        --control-button-icon-color: var(--equinox-heat-cool-color);
      }

      ha-control-button[tone="boost"]:not([active]) {
        --control-button-icon-color: var(--equinox-boost-color);
      }

      ha-control-button[tone="cool-boost"]:not([active]) {
        --control-button-icon-color: var(--equinox-cool-boost-color);
      }

      ha-control-button[tone="off"]:not([active]) {
        --control-button-icon-color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      ha-control-button[tone="heat"][active][subtle] {
        --control-button-icon-color: var(--equinox-heat-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-heat-color) 22%);
      }

      ha-control-button[tone="cool"][active][subtle] {
        --control-button-icon-color: var(--equinox-cool-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-cool-color) 22%);
      }

      ha-control-button[tone="auto"][active][subtle] {
        --control-button-icon-color: var(--equinox-auto-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-auto-color) 22%);
      }

      ha-control-button[tone="heat-cool"][active][subtle] {
        --control-button-icon-color: var(--equinox-heat-cool-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-heat-cool-color) 22%);
      }

      ha-control-button[tone="boost"][active][subtle] {
        --control-button-icon-color: var(--equinox-boost-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-boost-color) 22%);
      }

      ha-control-button[tone="cool-boost"][active][subtle] {
        --control-button-icon-color: var(--equinox-cool-boost-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-cool-boost-color) 22%);
      }

      ha-control-button[tone="off"][active][subtle] {
        --control-button-icon-color: var(--disabled-text-color, var(--equinox-muted-color));
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--disabled-text-color, var(--equinox-muted-color)) 22%);
      }

      .compact-selectors ha-control-button:not(.fan-selector) {
        overflow: hidden;
      }

      .compact-selectors ha-control-button.fan-selector,
      .compact-selectors ha-control-button.swing-selector {
        --control-button-icon-color: var(--primary-color);
      }

      .compact-selectors ha-control-button.fan-selector .btn-icon,
      .compact-selectors ha-control-button.swing-selector .btn-icon {
        color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      }

      .fan-icon-auto {
        --mdc-icon-size: 22px;
        transform: translate(-0.04em, -0.04em);
      }

      .fan .fan-icon-speed {
        transform: translateY(-1px);
      }

      .compact-selectors .btn-icon {
        --equinox-selector-icon-size: clamp(16px, 7.6cqi, 24px);
        width: clamp(20px, 10cqi, 30px);
        height: clamp(20px, 10cqi, 30px);
      }

      .segments .btn-icon {
        --equinox-selector-icon-size: clamp(16px, 7.6cqi, 24px);
        width: clamp(20px, 10cqi, 30px);
        height: clamp(20px, 10cqi, 30px);
      }

      .segments .btn-icon ha-icon,
      .compact-selectors .btn-icon ha-icon {
        --mdc-icon-size: var(--equinox-selector-icon-size);
      }

      .compact-selectors .fan-icon-auto {
        --equinox-selector-icon-size: clamp(15px, 7cqi, 22px);
      }

      .thin-layout {
        display: grid;
        grid-template-columns: minmax(0, auto) minmax(0, 1fr) auto;
        grid-template-areas:
          "readings readings status"
          "setpoint primary extra";
        grid-template-rows: minmax(24px, auto) minmax(34px, auto);
        align-items: center;
        gap: 7px 5px;
        min-width: 0;
      }

      .thin-layout:not([has-extra]) {
        grid-template-areas:
          "readings readings status"
          "setpoint primary primary";
      }

      .thin-summary,
      .thin-controls,
      .thin-readings,
      .thin-status,
      .thin-selectors {
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .thin-summary {
        display: contents;
      }

      .thin-readings {
        grid-area: readings;
        gap: 5px;
        overflow: hidden;
        white-space: nowrap;
      }

      .thin-readings .action-icon {
        width: 24px;
        height: 24px;
        flex: 0 0 auto;
      }

      .thin-current {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        color: var(--equinox-text-color);
        font-size: clamp(13px, 5.6cqi, 24px);
        line-height: 1;
        font-weight: var(--ha-font-weight-medium, 500);
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 0 1 auto;
      }

      .thin-current[clickable] {
        cursor: pointer;
      }

      .thin-current[clickable]:hover {
        opacity: 0.75;
      }

      .thin-current ha-icon {
        --mdc-icon-size: 0.78em;
        width: 0.78em;
        height: 0.78em;
        flex: 0 0 auto;
        color: var(--equinox-muted-color);
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .thin-humidity {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        color: var(--equinox-muted-color);
        font-size: clamp(11px, 4.2cqi, 14px);
        line-height: 1;
        cursor: pointer;
        flex: 0 1 auto;
      }

      .thin-humidity ha-icon {
        --mdc-icon-size: 12px;
        width: 12px;
        height: 12px;
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .thin-status {
        grid-area: status;
        justify-content: flex-end;
        gap: 4px;
      }

      .thin-status .events {
        gap: 4px;
        min-width: 0;
      }

      .thin-status .event,
      .thin-status .action-icon,
      .thin-status .lock,
      .thin-status .power-info,
      .thin-status .power-info-button {
        width: 24px;
        height: 24px;
      }

      .thin-status .event ha-icon,
      .thin-status .action-icon ha-icon,
      .thin-status .lock ha-icon,
      .thin-status .power-info-button ha-icon {
        --mdc-icon-size: 18px;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }

      .thin-status .menu {
        width: 25px;
        height: 25px;
      }

      .thin-controls {
        display: contents;
      }

      .thin-setpoint {
        grid-area: setpoint;
        flex: 0 0 auto;
        min-width: 0;
        display: flex;
        align-items: center;
        overflow: hidden;
      }

      .temperature-popup-button,
      .thin-temperature-button {
        min-width: 0;
        height: 34px;
        width: max-content;
        max-width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 0 10px;
        border: 1px solid var(--equinox-mode-control-border-color);
        border-radius: var(--equinox-control-radius);
        background: var(--equinox-mode-control-bg);
        color: var(--equinox-mode-control-text);
        font: inherit;
        font-size: clamp(13px, 5cqi, 17px);
        font-weight: var(--ha-font-weight-medium, 500);
        white-space: nowrap;
        cursor: pointer;
      }

      .temperature-popup-button ha-icon,
      .thin-temperature-button ha-icon {
        --mdc-icon-size: 20px;
        flex: 0 0 auto;
      }

      .temperature-popup-button:hover:not(:disabled),
      .thin-temperature-button:hover:not(:disabled) {
        background: var(--equinox-mode-control-hover-bg);
      }

      .temperature-popup-button:disabled,
      .thin-temperature-button:disabled {
        cursor: default;
        opacity: 0.45;
      }

      .temperature-popup-button {
        height: clamp(36px, 14cqi, 45px);
        padding-inline: clamp(10px, 4cqi, 16px);
        font-size: clamp(18px, 6cqi, 28px);
      }

      .temperature-popup-button[compact] {
        height: clamp(32px, 10cqi, 38px);
        font-size: clamp(14px, 4.6cqi, 20px);
      }

      .thin-temperature-values {
        display: inline-flex;
        align-items: baseline;
        justify-content: center;
        gap: 4px;
        min-width: 0;
      }

      .thin-temperature-value {
        color: var(--equinox-mode-control-text);
      }

      .thin-temperature-value[tone="heat"],
      .thin-temperature-value[tone="boost"] {
        color: var(--equinox-heat-color);
      }

      .thin-temperature-value[tone="cool"] {
        color: var(--equinox-cool-color);
      }

      .thin-temperature-value[tone="heat-cool"] {
        color: var(--equinox-heat-cool-color);
      }

      .thin-temperature-value[tone="off"],
      .thin-temperature-value[tone="unavailable"] {
        color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      .thin-selectors {
        gap: 5px;
        flex-wrap: wrap;
      }

      .thin-primary-selectors {
        grid-area: primary;
        width: max-content;
        justify-content: flex-end;
        justify-self: end;
      }

      .thin-extra-selectors {
        grid-area: extra;
        width: 48px;
        flex: 0 0 auto;
        flex-wrap: nowrap;
        justify-content: flex-end;
        justify-self: end;
      }

      .thin-layout[extra-count="2"] .thin-extra-selectors {
        width: 101px;
      }

      .thin-selectors ha-control-button {
        width: 48px;
        height: 34px;
        flex: 0 0 48px;
        min-width: 0;
        border: 1px solid var(--equinox-mode-control-border-color);
        border-radius: var(--equinox-control-radius);
        background: var(--equinox-mode-control-bg);
        overflow: hidden;
        --control-button-border-radius: var(--equinox-control-radius);
        --control-button-background-color: transparent;
        --control-button-background-opacity: 0;
        --control-button-focus-color: var(--primary-color);
        --control-button-icon-color: var(--equinox-mode-control-text);
        --control-button-padding: 0;
      }

      .thin-selectors .btn-icon {
        --equinox-selector-icon-size: 21px;
        width: 28px;
        height: 28px;
      }

      @container (max-width: 320px) {
        .thin-layout {
          grid-template-columns: minmax(0, 1fr) var(--thin-extra-column-width, auto);
          grid-template-areas:
            "status status"
            "readings extra"
            "setpoint primary";
          grid-template-rows: minmax(24px, auto) minmax(24px, auto) minmax(34px, auto);
        }

        .thin-layout[extra-count="1"] {
          --thin-extra-column-width: 48px;
        }

        .thin-layout[extra-count="2"] {
          --thin-extra-column-width: 101px;
        }

        .thin-layout:not([has-extra]) {
          grid-template-areas:
            "status status"
            "readings readings"
            "setpoint primary";
        }

        .thin-current {
          font-size: clamp(15px, 6.3cqi, 21px);
        }

        .thin-current ha-icon {
          --mdc-icon-size: 0.8em;
          width: 0.8em;
          height: 0.8em;
        }

        .thin-humidity {
          font-size: clamp(12px, 4.8cqi, 15px);
        }

        .thin-humidity ha-icon {
          --mdc-icon-size: 13px;
          width: 13px;
          height: 13px;
        }

        .thin-layout:not([has-extra]) .thin-current {
          font-size: clamp(16px, 7cqi, 24px);
        }

        .thin-layout:not([has-extra]) .thin-current ha-icon {
          --mdc-icon-size: 0.82em;
          width: 0.82em;
          height: 0.82em;
        }

        .thin-layout:not([has-extra]) .thin-humidity {
          font-size: clamp(12px, 4.8cqi, 16px);
        }

        .thin-layout:not([has-extra]) .thin-humidity ha-icon {
          --mdc-icon-size: 13px;
          width: 13px;
          height: 13px;
        }

        .thin-primary-selectors {
          width: max-content;
        }

        .thin-extra-selectors {
          align-self: center;
          justify-self: end;
        }

      }

      @container (max-width: 330px) {
        .thin-layout[extra-count="2"] .thin-current {
          font-size: clamp(14px, 5.8cqi, 20px);
        }
      }

      .thin-humidity-status {
        display: none;
      }

      @container (max-width: 300px) {
        .thin-layout[has-humidity][extra-count="2"] .thin-current {
          max-width: 100%;
          font-size: clamp(16px, 6.8cqi, 22px);
        }

        .thin-layout[has-humidity][extra-count="2"] .thin-current ha-icon {
          --mdc-icon-size: 0.84em;
          width: 0.84em;
          height: 0.84em;
        }

        .thin-layout[has-humidity][extra-count="2"] .thin-humidity-reading {
          display: none;
        }

        .thin-layout[has-humidity][extra-count="2"] .thin-humidity-status {
          display: inline-flex;
          position: relative;
          width: 24px;
          height: 24px;
          flex: 0 0 24px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--equinox-muted-color);
          overflow: visible;
          padding: 0;
          cursor: pointer;
        }

        .thin-layout[has-humidity][extra-count="2"] .thin-humidity-status:hover,
        .thin-layout[has-humidity][extra-count="2"] .thin-humidity-status:focus-visible {
          background: color-mix(in srgb, var(--equinox-control-bg) 80%, var(--equinox-text-color) 14%);
        }

        .thin-layout[has-humidity][extra-count="2"] .thin-humidity-status ha-icon {
          --mdc-icon-size: 16px;
          width: 16px;
          height: 16px;
        }

        .thin-layout[has-humidity][extra-count="2"] .thin-humidity-status::after {
          content: attr(data-value);
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          z-index: 20;
          display: none;
          width: max-content;
          min-width: 42px;
          padding: 8px 10px;
          border-radius: var(--equinox-radius);
          border: 1px solid color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 70%, transparent);
          background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color, #1c1c1c)) 82%, transparent);
          box-shadow: 0 10px 28px rgb(0 0 0 / 28%);
          backdrop-filter: blur(14px);
          color: var(--equinox-text-color);
          font-size: 12px;
          line-height: 1;
          white-space: nowrap;
        }

        .thin-layout[has-humidity][extra-count="2"] .thin-humidity-status:hover::after,
        .thin-layout[has-humidity][extra-count="2"] .thin-humidity-status:focus-visible::after {
          display: block;
        }
      }

      @container (max-width: 220px) {
        .thin-layout[has-humidity][extra-count="1"] .thin-current {
          max-width: 100%;
          font-size: clamp(18px, 7.6cqi, 25px);
        }

        .thin-layout[has-humidity][extra-count="1"] .thin-current ha-icon {
          --mdc-icon-size: 0.84em;
          width: 0.84em;
          height: 0.84em;
        }

        .thin-layout[has-humidity][extra-count="1"] .thin-humidity-reading {
          display: none;
        }

        .thin-layout[has-humidity][extra-count="1"] .thin-humidity-status {
          display: inline-flex;
          position: relative;
          width: 24px;
          height: 24px;
          flex: 0 0 24px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--equinox-muted-color);
          overflow: visible;
          padding: 0;
          cursor: pointer;
        }

        .thin-layout[has-humidity][extra-count="1"] .thin-humidity-status:hover,
        .thin-layout[has-humidity][extra-count="1"] .thin-humidity-status:focus-visible {
          background: color-mix(in srgb, var(--equinox-control-bg) 80%, var(--equinox-text-color) 14%);
        }

        .thin-layout[has-humidity][extra-count="1"] .thin-humidity-status ha-icon {
          --mdc-icon-size: 16px;
          width: 16px;
          height: 16px;
        }

        .thin-layout[has-humidity][extra-count="1"] .thin-humidity-status::after {
          content: attr(data-value);
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          z-index: 20;
          display: none;
          width: max-content;
          min-width: 42px;
          padding: 8px 10px;
          border-radius: var(--equinox-radius);
          border: 1px solid color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 70%, transparent);
          background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color, #1c1c1c)) 82%, transparent);
          box-shadow: 0 10px 28px rgb(0 0 0 / 28%);
          backdrop-filter: blur(14px);
          color: var(--equinox-text-color);
          font-size: 12px;
          line-height: 1;
          white-space: nowrap;
        }

        .thin-layout[has-humidity][extra-count="1"] .thin-humidity-status:hover::after,
        .thin-layout[has-humidity][extra-count="1"] .thin-humidity-status:focus-visible::after {
          display: block;
        }
      }

      .btn-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: rgba(128, 128, 128, 0.10);
      }

      .btn-icon ha-icon {
        width: var(--equinox-selector-icon-size, 24px);
        height: var(--equinox-selector-icon-size, 24px);
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }

      .btn-icon[tone="heat"] { background: color-mix(in srgb, var(--equinox-heat-color) 15%, transparent); color: var(--equinox-heat-color); }
      .btn-icon[tone="cool"] { background: color-mix(in srgb, var(--equinox-cool-color) 15%, transparent); color: var(--equinox-cool-color); }
      .btn-icon[tone="auto"] { background: color-mix(in srgb, var(--equinox-auto-color) 15%, transparent); color: var(--equinox-auto-color); }
      .btn-icon[tone="heat-cool"] { background: color-mix(in srgb, var(--equinox-heat-cool-color) 15%, transparent); color: var(--equinox-heat-cool-color); }
      .btn-icon[tone="boost"] { background: color-mix(in srgb, var(--equinox-boost-color) 15%, transparent); color: var(--equinox-boost-color); }
      .btn-icon[tone="cool-boost"] { background: color-mix(in srgb, var(--equinox-cool-boost-color) 15%, transparent); color: var(--equinox-cool-boost-color); }

      /* HA-aligned and equinox-derivative tones — each value sets --eq-tone-color
         which the generic paint rule below consumes. Heat/cool/auto/heat-cool/boost
         keep their explicit rules above so legacy CSS stays unchanged. */
      .btn-icon[tone="dry"]             { --eq-tone-color: var(--equinox-dry-color); }
      .btn-icon[tone="fan-only"]        { --eq-tone-color: var(--equinox-fan-only-color); }
      .btn-icon[tone="muted"]           { --eq-tone-color: var(--equinox-muted-tone-color); }
      .btn-icon[tone="preset-eco"]      { --eq-tone-color: var(--equinox-preset-eco-color); }
      .btn-icon[tone="preset-away"]     { --eq-tone-color: var(--equinox-preset-away-color); }
      .btn-icon[tone="preset-comfort"]  { --eq-tone-color: var(--equinox-preset-comfort-color); }
      .btn-icon[tone="preset-home"]     { --eq-tone-color: var(--equinox-preset-home-color); }
      .btn-icon[tone="preset-sleep"]    { --eq-tone-color: var(--equinox-preset-sleep-color); }
      .btn-icon[tone="preset-frost"]    { --eq-tone-color: var(--equinox-preset-frost-color); }
      .btn-icon[tone="preset-activity"] { --eq-tone-color: var(--equinox-preset-activity-color); }
      .btn-icon[tone="fan-auto"]        { --eq-tone-color: var(--equinox-fan-auto-color); }
      .btn-icon[tone="fan-low"]         { --eq-tone-color: var(--equinox-fan-low-color); }
      .btn-icon[tone="fan-medium"]      { --eq-tone-color: var(--equinox-fan-medium-color); }
      .btn-icon[tone="fan-high"]        { --eq-tone-color: var(--equinox-fan-high-color); }
      .btn-icon[tone="fan-focus"]       { --eq-tone-color: var(--equinox-fan-focus-color); }
      .btn-icon[tone="fan-diffuse"]     { --eq-tone-color: var(--equinox-fan-diffuse-color); }
      .btn-icon[tone="swing-on"]        { --eq-tone-color: var(--equinox-swing-on-color); }
      .btn-icon[tone="swing-vertical"]  { --eq-tone-color: var(--equinox-swing-vertical-color); }
      .btn-icon[tone="swing-horizontal"]{ --eq-tone-color: var(--equinox-swing-horizontal-color); }
      .btn-icon[tone="swing-both"]      { --eq-tone-color: var(--equinox-swing-both-color); }
      .btn-icon[tone="fan-off"],
      .btn-icon[tone="swing-off"]       { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
      .btn-icon[tone="off"]             { --eq-tone-color: var(--disabled-text-color, var(--equinox-muted-color)); }

      .btn-icon[tone^="preset-"],
      .btn-icon[tone^="fan-"],
      .btn-icon[tone^="swing-"],
      .btn-icon[tone="dry"],
      .btn-icon[tone="fan-only"],
      .btn-icon[tone="muted"],
      .btn-icon[tone="off"] {
        background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
        color: var(--eq-tone-color);
      }

      ha-control-button[active] .btn-icon { background: transparent; }

      .bottom {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        min-height: 47px;
      }

      .fan,
      .swing {
        width: 36px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--equinox-mode-control-border-color);
        background: var(--equinox-mode-control-bg);
        color: var(--primary-color);
        padding: 0;
        cursor: pointer;
      }

      /* Per-mode tinting for the standalone fan/swing rail buttons —
         mirrors .btn-icon palette. */
      .fan[tone="fan-auto"], .swing[tone="fan-auto"]               { --eq-tone-color: var(--equinox-fan-auto-color); }
      .fan[tone="fan-low"]                                          { --eq-tone-color: var(--equinox-fan-low-color); }
      .fan[tone="fan-medium"]                                       { --eq-tone-color: var(--equinox-fan-medium-color); }
      .fan[tone="fan-high"]                                         { --eq-tone-color: var(--equinox-fan-high-color); }
      .fan[tone="fan-focus"]                                        { --eq-tone-color: var(--equinox-fan-focus-color); }
      .fan[tone="fan-diffuse"]                                      { --eq-tone-color: var(--equinox-fan-diffuse-color); }
      .fan[tone="fan-off"]                                          { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
      .swing[tone="swing-on"]                                       { --eq-tone-color: var(--equinox-swing-on-color); }
      .swing[tone="swing-vertical"]                                 { --eq-tone-color: var(--equinox-swing-vertical-color); }
      .swing[tone="swing-horizontal"]                               { --eq-tone-color: var(--equinox-swing-horizontal-color); }
      .swing[tone="swing-both"]                                     { --eq-tone-color: var(--equinox-swing-both-color); }
      .swing[tone="swing-off"]                                      { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
      .fan[tone="off"], .swing[tone="off"]                          { --eq-tone-color: var(--disabled-text-color, var(--equinox-muted-color)); }

      .fan[tone^="fan-"],
      .swing[tone^="swing-"],
      .fan[tone="off"],
      .swing[tone="off"] {
        color: var(--eq-tone-color);
      }

      .status .fan,
      .status .swing {
        width: 32px;
        height: 32px;
      }

      .fan-label,
      .swing-label {
        display: none;
      }

      .menu {
        width: 28px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background: transparent;
        color: var(--equinox-muted-color);
        padding: 0;
        cursor: pointer;
      }

      .menu,
      .fan,
      .swing {
        border-radius: var(--equinox-control-radius);
      }

      .menu:hover,
      .fan:hover,
      .swing:hover {
        background: var(--equinox-mode-control-hover-bg);
      }

      .power-info {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .power-info-button {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--equinox-muted-color);
        padding: 0;
        cursor: pointer;
      }

      .power-info-button:hover,
      .power-info-button:focus-visible {
        background: color-mix(in srgb, var(--equinox-control-bg) 80%, var(--equinox-text-color) 14%);
      }

      @media (max-width: 360px) {
        .card {
          padding: 14px;
          gap: 10px;
        }

        .layout {
          gap: 10px;
        }

        .bottom {
          grid-template-columns: 38px minmax(0, 1fr) 28px;
          gap: 6px;
        }
      }

      @container (max-width: 260px) {
        .card {
          padding: 10px 12px;
          gap: 8px;
        }

      }

      /* Locked = red so the color flags why the controls are blocked.
         Unlocked = inherits the regular icon color (the common state stays
         quiet). See --equinox-lock-{locked,unlocked}-color in flat.ts. */
      .lock[tone="lock-locked"] {
        color: var(--equinox-lock-locked-color);
      }

      .lock[tone="lock-unlocked"] {
        color: var(--equinox-lock-unlocked-color);
      }

      ha-card[locked] .setpoint-control,
      ha-card[locked] .segments,
      ha-card[locked] .compact-selectors,
      ha-card[locked] .thin-controls {
        opacity: 0.5;
        transition: opacity 0.2s;
      }
    `,
    liquidGlowStyles
  ];

  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  viewModel?: EquinoxViewModel;

  private _activeDialog: "fan" | "swing" | "hvac" | "preset" | "temperature" | "menu" | "boost" | "history" | "regulation" | "sensor-more-info" | null = null;
  private _dialogAnchor?: { element: HTMLElement; clientX?: number; clientY?: number };
  private _activeMessageKey?: string;
  private _activeSensorInfoTarget?: SensorMoreInfoTarget;
  private _lockDialogOpen = false;
  private _lockIsLocking = false;
  private _regulationLoadResult?: RegulationDashboardLoadResult;
  private _regulationLoadKey = "";
  private _regulationLoadPromise?: Promise<RegulationDashboardLoadResult>;
  private _regulationActiveSectionId?: string;
  private _regulationMobileSectionMenuOpen = false;
  private _regulationBrowserHistoryDepth = 0;
  private readonly _browserHistoryInstanceId = `equinox-${Math.random().toString(36).slice(2)}`;
  private _syncingBrowserHistory = false;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("popstate", this._handleBrowserPopState);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this._handleBrowserPopState);
  }

  private _sensorTargetFromHistory(value: unknown): SensorMoreInfoTarget | undefined {
    if (typeof value !== "object" || value === null) return undefined;

    const record = value as Partial<Extract<SensorMoreInfoTarget, { kind: "entity" }>> & { kind?: unknown };
    if (record.kind === "power") {
      return { kind: "power" };
    }

    if (record.kind !== "entity" || typeof record.entityId !== "string" || record.entityId === "") {
      return undefined;
    }

    const attribute = Array.isArray(record.attribute)
      ? record.attribute.filter((part): part is string => typeof part === "string" && part !== "")
      : typeof record.attribute === "string" && record.attribute !== ""
        ? record.attribute
        : undefined;

    return {
      kind: "entity",
      entityId: record.entityId,
      icon: typeof record.icon === "string" && record.icon !== "" ? record.icon : undefined,
      attribute: Array.isArray(attribute) && attribute.length === 0 ? undefined : attribute,
      unit: typeof record.unit === "string" && record.unit !== "" ? record.unit : undefined,
      label: typeof record.label === "string" && record.label !== "" ? record.label : undefined
    };
  }

  private _sensorTargetKey(target: SensorMoreInfoTarget | undefined): string | undefined {
    if (!target) return undefined;
    if (target.kind === "power") return "power";

    const attribute = Array.isArray(target.attribute)
      ? target.attribute.join(".")
      : target.attribute ?? "";

    return ["entity", target.entityId, attribute, target.unit ?? "", target.icon ?? "", target.label ?? ""].join("|");
  }

  private _browserHistoryEntry(state = window.history.state): BrowserHistoryEntry | undefined {
    const entry = typeof state === "object" && state !== null
      ? (state as Record<string, unknown>)[BROWSER_HISTORY_STATE_KEY]
      : undefined;

    if (typeof entry !== "object" || entry === null) return undefined;

    const record = entry as Partial<BrowserHistoryEntry>;
    if (
      record.instanceId !== this._browserHistoryInstanceId ||
      (record.layer !== "history-dialog" && record.layer !== "regulation-dialog" && record.layer !== "sensor-more-info-dialog")
    ) {
      return undefined;
    }

    return {
      instanceId: record.instanceId,
      layer: record.layer,
      sectionId: typeof record.sectionId === "string" ? record.sectionId : undefined,
      regulationDepth: typeof record.regulationDepth === "number" ? record.regulationDepth : undefined,
      sensorTarget: record.layer === "sensor-more-info-dialog" ? this._sensorTargetFromHistory(record.sensorTarget) : undefined
    };
  }

  private _browserHistoryState(entry: Omit<BrowserHistoryEntry, "instanceId">): Record<string, unknown> {
    const current = typeof window.history.state === "object" && window.history.state !== null
      ? window.history.state as Record<string, unknown>
      : {};

    return {
      ...current,
      [BROWSER_HISTORY_STATE_KEY]: {
        instanceId: this._browserHistoryInstanceId,
        ...entry
      }
    };
  }

  private _clearBrowserHistoryState(): void {
    const current = typeof window.history.state === "object" && window.history.state !== null
      ? { ...(window.history.state as Record<string, unknown>) }
      : {};

    delete current[BROWSER_HISTORY_STATE_KEY];
    window.history.replaceState(current, "", window.location.href);
  }

  private _sameBrowserHistoryEntry(entry: Omit<BrowserHistoryEntry, "instanceId">): boolean {
    const current = this._browserHistoryEntry();
    return (
      current?.layer === entry.layer &&
      current.sectionId === entry.sectionId &&
      this._sensorTargetKey(current.sensorTarget) === this._sensorTargetKey(entry.sensorTarget)
    );
  }

  private _pushBrowserHistoryState(entry: Omit<BrowserHistoryEntry, "instanceId">): void {
    if (this._syncingBrowserHistory) return;
    if (this._sameBrowserHistoryEntry(entry)) return;

    window.history.pushState(this._browserHistoryState(entry), "", window.location.href);
  }

  private _pushHistoryDialogState(): void {
    this._pushBrowserHistoryState({ layer: "history-dialog" });
  }

  private _pushRegulationDialogState(sectionId = this._regulationActiveSectionId): void {
    if (this._sameBrowserHistoryEntry({ layer: "regulation-dialog", sectionId })) return;

    const current = this._browserHistoryEntry();
    const regulationDepth = current?.layer === "regulation-dialog" && current.regulationDepth
      ? current.regulationDepth + 1
      : 1;

    this._pushBrowserHistoryState({
      layer: "regulation-dialog",
      sectionId,
      regulationDepth
    });
    this._regulationBrowserHistoryDepth = regulationDepth;
  }

  private _pushSensorMoreInfoDialogState(target: SensorMoreInfoTarget): void {
    this._pushBrowserHistoryState({ layer: "sensor-more-info-dialog", sensorTarget: target });
  }

  private readonly _handleBrowserPopState = (event: PopStateEvent): void => {
    const entry = this._browserHistoryEntry(event.state);

    this._syncingBrowserHistory = true;
    try {
      if (entry?.layer === "history-dialog") {
        this._activeDialog = "history";
        this._activeMessageKey = undefined;
        return;
      }

      if (entry?.layer === "regulation-dialog") {
        this._activeDialog = "regulation";
        this._activeMessageKey = undefined;
        this._regulationActiveSectionId = entry.sectionId;
        this._regulationMobileSectionMenuOpen = false;
        this._regulationBrowserHistoryDepth = entry.regulationDepth ?? 1;
        void this._ensureRegulationDashboard();
        return;
      }

      if (entry?.layer === "sensor-more-info-dialog" && entry.sensorTarget) {
        this._activeDialog = "sensor-more-info";
        this._activeMessageKey = undefined;
        this._activeSensorInfoTarget = entry.sensorTarget;
        return;
      }

      if (this._activeDialog === "history") {
        this._activeDialog = null;
      }

      if (this._activeDialog === "regulation") {
        this._activeDialog = null;
        this._regulationMobileSectionMenuOpen = false;
        this._regulationBrowserHistoryDepth = 0;
      }

      if (this._activeDialog === "sensor-more-info") {
        this._activeDialog = null;
        this._activeSensorInfoTarget = undefined;
      }
    } finally {
      this._syncingBrowserHistory = false;
    }
  };

  private _openHistoryDialog(): void {
    this._activeDialog = "history";
    this._activeMessageKey = undefined;
    this._pushHistoryDialogState();
  }

  private _closeHistoryDialog(): void {
    if (!this._syncingBrowserHistory && this._browserHistoryEntry()?.layer === "history-dialog") {
      this._activeDialog = null;
      window.history.back();
      return;
    }

    this._activeDialog = null;
  }

  private _closeSensorMoreInfoDialog(): void {
    if (!this._syncingBrowserHistory && this._browserHistoryEntry()?.layer === "sensor-more-info-dialog") {
      this._activeDialog = null;
      this._activeSensorInfoTarget = undefined;
      this._clearBrowserHistoryState();
      return;
    }

    this._activeDialog = null;
    this._activeSensorInfoTarget = undefined;
  }

  private _regulationDashboard(): RegulationDashboard | undefined {
    return this._regulationLoadResult?.status === "loaded" ? this._regulationLoadResult.dashboard : undefined;
  }

  private _regulationMenuAvailable(): boolean {
    if (!this.hass || !this.config || this.config.additional_dashboards === "disabled") {
      return false;
    }

    if (this.config.additional_dashboards === "custom") {
      return true;
    }

    return this._regulationLoadResult?.status === "loaded";
  }

  private _regulationLoadCacheKey(): string | undefined {
    if (!this.hass || !this.config) {
      return undefined;
    }

    const resolution = resolveRegulationDashboard(this.hass, this.config);
    if (!resolution.available) {
      return `${resolution.mode}:${resolution.reason}:${resolution.algorithm ?? ""}`;
    }

    return `${resolution.mode}:${resolution.source}:${resolution.algorithm}`;
  }

  private _ensureRegulationDashboard(): Promise<RegulationDashboardLoadResult | undefined> {
    if (!this.hass || !this.config) {
      return Promise.resolve(undefined);
    }

    const resolution = resolveRegulationDashboard(this.hass, this.config);
    const key = this._regulationLoadCacheKey();
    if (!key) {
      return Promise.resolve(undefined);
    }

    if (key !== this._regulationLoadKey) {
      this._regulationLoadKey = key;
      this._regulationLoadResult = undefined;
      this._regulationLoadPromise = undefined;
      this._regulationActiveSectionId = undefined;
      this._regulationMobileSectionMenuOpen = false;
      this._regulationBrowserHistoryDepth = 0;
    }

    if (this._regulationLoadResult) {
      return Promise.resolve(this._regulationLoadResult);
    }

    if (this._regulationLoadPromise) {
      return this._regulationLoadPromise;
    }

    const pending = loadRegulationDashboard(resolution).then((result) => {
      if (this._regulationLoadKey === key) {
        this._regulationLoadResult = result;
        this._regulationLoadPromise = undefined;
        if (result.status === "loaded" && !this._regulationActiveSectionId) {
          this._regulationActiveSectionId = result.dashboard.sections[0]?.id;
        }
      }
      return result;
    });

    this._regulationLoadPromise = pending;
    return pending;
  }

  private async _openRegulationDialog(sectionId?: string): Promise<void> {
    this._activeDialog = "regulation";
    this._activeMessageKey = undefined;
    this._regulationMobileSectionMenuOpen = false;

    if (sectionId) {
      this._regulationActiveSectionId = sectionId;
    }

    const result = await this._ensureRegulationDashboard();
    if (result?.status === "loaded") {
      this._regulationActiveSectionId = sectionId ?? result.dashboard.sections[0]?.id;
      this._pushRegulationDialogState(this._regulationActiveSectionId);
      return;
    }

    if (this.config?.additional_dashboards === "custom") {
      this._pushRegulationDialogState(sectionId);
    } else {
      this._activeDialog = null;
    }
  }

  private _closeRegulationDialog(): void {
    const entry = this._browserHistoryEntry();
    if (!this._syncingBrowserHistory && entry?.layer === "regulation-dialog") {
      window.history.go(-Math.max(1, entry.regulationDepth ?? this._regulationBrowserHistoryDepth));
      return;
    }

    this._activeDialog = null;
    this._regulationMobileSectionMenuOpen = false;
    this._regulationBrowserHistoryDepth = 0;
  }

  private _setRegulationMobileSectionMenu(open: boolean): void {
    if (this._activeDialog !== "regulation") return;

    this._regulationMobileSectionMenuOpen = open;
  }

  private _selectRegulationSection(sectionId: string): void {
    this._regulationActiveSectionId = sectionId;
    this._regulationMobileSectionMenuOpen = false;
    this._pushRegulationDialogState(sectionId);
  }

  protected willUpdate(): void {
    this.setAttribute("theme", this.config?.theme ?? DEFAULT_THEME);
    this.toggleAttribute("light", !this.hass?.themes?.darkMode);
    this.toggleAttribute("border-glow-on-action", !!this.config?.border_glow_on_action);
  }

  protected updated(): void {
    if (this._activeDialog === "menu" || this._activeDialog === "regulation") {
      void this._ensureRegulationDashboard();
    }
  }

  protected render() {
    if (!this.viewModel || !this.config) {
      return nothing;
    }

    const compact = this.config?.display_mode === "compact";
    const thin = this.config?.display_mode === "thin";
    const stateIconsVertical = !thin && this.config.state_icons_layout === "vertical";
    const lockEffectActive =
      this.viewModel.vt?.lock.isConfigured === true &&
      this.viewModel.vt.lock.isUserLocked === true;
    const activeHvacAction = this._activeHvacAction();

    return html`
      <ha-card
        style=${this._cardStyle()}
        ?locked=${lockEffectActive}
        tone=${this._cardTone()}
        active-action=${activeHvacAction ?? nothing}
      >
        <div class="card" ?thin=${thin}>
          ${thin
        ? this._renderThinLayout()
        : html`
                ${this._renderName()}
                ${stateIconsVertical ? nothing : this._renderStatus()}
                <div class="layout" ?state-vertical=${stateIconsVertical}>
                  <div class="main">
                    ${this._renderSetpoint()}
                    ${this._renderConditions()}
                    ${compact ? this._renderCompactSelectors() : html`${this._renderHvacModes()} ${this._renderPresets()}`}
                  </div>
                  ${stateIconsVertical ? html`<div class="left-rail">${this._renderLeftRail()}</div>` : nothing}
                  ${stateIconsVertical ? html`<div class="state-rail">${this._renderStateRail()}</div>` : nothing}
                </div>
              `}
            </div>
      </ha-card>
      ${this._renderActiveDialogs()}
    `;
  }

  private _renderActiveDialogs(): Array<TemplateResult | typeof nothing> {
    return [
      this._renderLightweightDialog(),
      this._renderSensorMoreInfoDialog(),
      this._renderHistoryDialog(),
      this._renderRegulationDialog(),
      this._renderLockDialog(),
      this._renderMessageDialog()
    ];
  }

  private _renderLightweightDialog(): TemplateResult | typeof nothing {
    switch (this._activeDialog) {
      case "fan":
        return html`
          <eq-fan-dialog
            .open=${true}
            .hass=${this.hass}
            .viewModel=${this.viewModel}
            .config=${this.config}
            .language=${this._language()}
            .floating=${true}
            .closeOnLeave=${true}
            .anchor=${this._dialogAnchor}
            @eq-dialog-close=${() => this._closeLightweightDialog("fan")}
          ></eq-fan-dialog>
        `;
      case "swing":
        return html`
          <eq-swing-dialog
            .open=${true}
            .hass=${this.hass}
            .viewModel=${this.viewModel}
            .config=${this.config}
            .language=${this._language()}
            .floating=${true}
            .closeOnLeave=${true}
            .anchor=${this._dialogAnchor}
            @eq-dialog-close=${() => this._closeLightweightDialog("swing")}
          ></eq-swing-dialog>
        `;
      case "hvac":
        return html`
          <eq-hvac-dialog
            .open=${true}
            .hass=${this.hass}
            .viewModel=${this.viewModel}
            .config=${this.config}
            .language=${this._language()}
            .floating=${true}
            .closeOnLeave=${true}
            .anchor=${this._dialogAnchor}
            @eq-dialog-close=${() => this._closeLightweightDialog("hvac")}
          ></eq-hvac-dialog>
        `;
      case "preset":
        return html`
          <eq-preset-dialog
            .open=${true}
            .hass=${this.hass}
            .viewModel=${this.viewModel}
            .config=${this.config}
            .language=${this._language()}
            .floating=${true}
            .closeOnLeave=${true}
            .anchor=${this._dialogAnchor}
            @eq-dialog-close=${() => this._closeLightweightDialog("preset")}
          ></eq-preset-dialog>
        `;
      case "temperature":
        return html`
          <eq-temperature-dialog
            .open=${true}
            .hass=${this.hass}
            .viewModel=${this.viewModel}
            .config=${this.config}
            .language=${this._language()}
            .floating=${true}
            .closeOnLeave=${true}
            .anchor=${this._dialogAnchor}
            @eq-dialog-close=${() => this._closeLightweightDialog("temperature")}
          ></eq-temperature-dialog>
        `;
      case "menu":
        return html`
          <eq-menu-dialog
            .open=${true}
            .hass=${this.hass}
            .viewModel=${this.viewModel}
            .config=${this.config}
            .regulationDashboard=${this._regulationDashboard()}
            .regulationAvailable=${this._regulationMenuAvailable()}
            .language=${this._language()}
            .floating=${true}
            .closeOnLeave=${true}
            .anchor=${this._dialogAnchor}
            @eq-dialog-close=${() => {
            if (this._activeDialog === "menu") {
              this._activeDialog = null;
            }
          }}
            @equinox-open-regulation=${(event: CustomEvent<{ sectionId?: string }>) => this._openRegulationDialog(event.detail?.sectionId)}
            @equinox-open-swing=${() => { this._activeDialog = "swing"; }}
            @equinox-open-boost=${() => { this._activeDialog = "boost"; }}
            @equinox-open-history=${() => this._openHistoryDialog()}
          ></eq-menu-dialog>
        `;
      case "boost":
        return html`
          <eq-boost-dialog
            .open=${true}
            .hass=${this.hass}
            .viewModel=${this.viewModel}
            .config=${this.config}
            .language=${this._language()}
            .floating=${true}
            .closeOnLeave=${true}
            .anchor=${this._dialogAnchor}
            @eq-dialog-close=${() => this._closeLightweightDialog("boost")}
            @equinox-open-menu=${() => { this._activeDialog = "menu"; }}
          ></eq-boost-dialog>
        `;
      default:
        return nothing;
    }
  }

  private _renderHistoryDialog(): TemplateResult | typeof nothing {
    if (this._activeDialog !== "history") {
      return nothing;
    }

    return html`
      <eq-history-dialog
        .open=${true}
        .hass=${this.hass}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => this._closeHistoryDialog()}
      ></eq-history-dialog>
    `;
  }

  private _renderSensorMoreInfoDialog(): TemplateResult | typeof nothing {
    if (this._activeDialog !== "sensor-more-info" || !this._activeSensorInfoTarget) {
      return nothing;
    }

    return html`
      <eq-sensor-more-info-dialog
        .open=${true}
        .hass=${this.hass}
        .config=${this.config}
        .viewModel=${this.viewModel}
        .language=${this._language()}
        .target=${this._activeSensorInfoTarget}
        @eq-dialog-close=${() => this._closeSensorMoreInfoDialog()}
      ></eq-sensor-more-info-dialog>
    `;
  }

  private _renderRegulationDialog(): TemplateResult | typeof nothing {
    if (this._activeDialog !== "regulation") {
      return nothing;
    }

    return html`
      <eq-regulation-dialog
        .open=${true}
        .hass=${this.hass}
        .config=${this.config}
        .viewModel=${this.viewModel}
        .dashboard=${this._regulationDashboard()}
        .loadResult=${this._regulationLoadResult}
        .activeSectionId=${this._regulationActiveSectionId}
        .mobileSectionMenuOpen=${this._regulationMobileSectionMenuOpen}
        .language=${this._language()}
        @eq-dialog-close=${() => this._closeRegulationDialog()}
        @equinox-regulation-menu-toggled=${(event: CustomEvent<{ open: boolean }>) => this._setRegulationMobileSectionMenu(event.detail.open)}
        @equinox-regulation-section-selected=${(event: CustomEvent<{ sectionId: string }>) => this._selectRegulationSection(event.detail.sectionId)}
      ></eq-regulation-dialog>
    `;
  }

  private _renderLockDialog(): TemplateResult | typeof nothing {
    if (!this._lockDialogOpen) {
      return nothing;
    }

    return html`
      <eq-lock-dialog
        .open=${true}
        .hass=${this.hass}
        .entityId=${this.config?.entity}
        .isLocking=${this._lockIsLocking}
        .language=${this._language()}
        @eq-dialog-close=${() => { this._lockDialogOpen = false; }}
      ></eq-lock-dialog>
    `;
  }

  private _renderMessageDialog(): TemplateResult | typeof nothing {
    if (this._activeMessageKey === undefined) {
      return nothing;
    }

    return html`
      <eq-dialog
        .open=${true}
        .title=${localize(this._language(), "dialog.message.title")}
        .language=${this._language()}
        .floating=${true}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => this._closeMessage()}
      >
        ${this._renderMessageOverlay()}
      </eq-dialog>
    `;
  }

  private _cardStyle(): string {
    const color = cssColor(this.config?.card_background_color);
    const opacity = normalizedOpacity(this.config?.card_background_opacity);
    const textColor = surfaceTextColor(this.config?.card_background_color, opacity);
    const configuredSurface = color && opacity !== undefined
      ? `color-mix(in srgb, ${color} ${opacity}%, transparent)`
      : color
        ? color
        : opacity !== undefined
          ? `color-mix(in srgb, var(--equinox-card-bg) ${opacity}%, transparent)`
          : undefined;
    const declarations: string[] = [];

    if (configuredSurface) {
      declarations.push(`--equinox-config-card-bg: ${configuredSurface}`);
      declarations.push(`--equinox-card-surface-bg: ${configuredSurface}`);
      declarations.push(`--equinox-mode-control-bg: ${configuredSurface}`);
    }

    if (textColor) {
      declarations.push(`--equinox-card-surface-text-color: ${textColor}`);
    }

    return declarations.length > 0 ? `${declarations.join("; ")};` : "";
  }

  private _language(): string | undefined {
    return this.hass?.locale?.language ?? this.hass?.language;
  }

  private _renderName(): TemplateResult | typeof nothing {
    if (this.config?.disable_name) {
      return nothing;
    }

    return html`
      <div class="name">
        <span class="name-label">${this.viewModel?.climate.name}</span>
        ${this._renderMenuButton()}
      </div>
    `;
  }

  private _renderThinLayout(): TemplateResult {
    const showHumidity = finite(this.viewModel?.climate.currentHumidity);
    const extraCount = this._thinExtraSelectorCount();

    return html`
      <div
        class="thin-layout"
        ?has-extra=${extraCount > 0}
        ?has-humidity=${showHumidity}
        extra-count=${extraCount}
      >
        ${this._renderThinSummaryRow()}
        ${this._renderThinControlRow()}
      </div>
    `;
  }

  private _renderThinSummaryRow(): TemplateResult {
    const currentHumidity = this.viewModel?.climate.currentHumidity;
    const showHumidity = finite(currentHumidity);
    const showTemperature = finite(this.viewModel?.climate.currentTemperature);
    const lockButtonVisible =
      !this.config?.hide_lock_button &&
      this.viewModel?.vt?.lock.isConfigured === true;
    const lockLabel = this.viewModel?.vt?.lock.isLocked
      ? localize(this._language(), "main.lock.locked")
      : localize(this._language(), "main.lock.unlocked");

    return html`
      <div class="thin-summary">
        <div class="thin-readings" ?has-humidity=${showHumidity}>
          <span
            class="thin-current"
            ?clickable=${showTemperature}
            @click=${showTemperature ? (event: Event) => this._openTemperatureInfo(event) : nothing}
          >
            <ha-icon icon="mdi:thermometer"></ha-icon>
            ${this._formatCurrentTemp()}
          </span>
          ${showHumidity
        ? html`
                <span class="thin-humidity thin-humidity-reading" @click=${(event: Event) => this._openHumidityInfo(event)}>
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  <span>${this._formatPercent(currentHumidity)}</span>
                </span>
              `
        : nothing}
        </div>
        <div class="thin-status">
          ${this._renderPowerInfoButton()}
          ${showHumidity
        ? html`
                <button
                  class="thin-humidity-status"
                  data-value=${this._formatPercent(currentHumidity)}
                  aria-label=${this._formatPercent(currentHumidity)}
                  @click=${(event: Event) => this._openHumidityInfo(event)}
                >
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                </button>
              `
        : nothing}
          <div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>
          ${lockButtonVisible ? this._renderLockButton(lockLabel) : nothing}
          ${this._renderMenuButton()}
        </div>
      </div>
    `;
  }

  private _renderThinControlRow(): TemplateResult {
    const primarySelectors = this._renderThinPrimarySelectors();
    const extraSelectors = this._renderThinExtraSelectors();

    return html`
      <div class="thin-controls">
        <div class="thin-setpoint">
          ${this._renderThinTemperatureButton()}
        </div>
        ${primarySelectors}
      </div>
      ${extraSelectors}
    `;
  }

  private _renderThinTemperatureButton(): TemplateResult {
    return html`
      <button
        class="thin-temperature-button"
        ?disabled=${this._isControlDisabled()}
        @click=${(event: Event) => this._openDialog("temperature", event)}
      >
        ${this._renderThinTemperatureValue()}
      </button>
    `;
  }

  private _renderThinTemperatureValue(): TemplateResult {
    if (this._hasTemperatureRangeControl()) {
      const low = this._rangeSetpointFallback("low");
      const high = this._rangeSetpointFallback("high");

      return html`
        <span class="thin-temperature-values">
          <span class="thin-temperature-value" tone="heat">${low ? `${low}°` : "--.-°"}</span>
          <span class="thin-temperature-value" aria-hidden="true">/</span>
          <span class="thin-temperature-value" tone="cool">${high ? `${high}°` : "--.-°"}</span>
        </span>
      `;
    }

    return html`<span class="thin-temperature-value" tone=${this._targetTone()}>${this._formatTargetTempSummary()}</span>`;
  }

  private _renderThinPrimarySelectors(): TemplateResult | typeof nothing {
    const hvac = this._renderThinHvacButton();
    const preset = this._renderThinPresetButton();

    if (hvac === nothing && preset === nothing) {
      return nothing;
    }

    return html`<div class="thin-selectors thin-primary-selectors">${hvac}${preset}</div>`;
  }

  private _renderThinExtraSelectors(): TemplateResult | typeof nothing {
    const fan = this._hasFanControl() ? this._renderThinFanButton() : nothing;
    const swing = this._hasSwingControl() ? this._renderThinSwingButton() : nothing;

    if (fan === nothing && swing === nothing) {
      return nothing;
    }

    return html`<div class="thin-selectors thin-extra-selectors">${fan}${swing}</div>`;
  }

  private _hasThinExtraSelectors(): boolean {
    return this._thinExtraSelectorCount() > 0;
  }

  private _thinExtraSelectorCount(): number {
    return (this._hasFanControl() ? 1 : 0) + (this._hasSwingControl() ? 1 : 0);
  }

  private _renderThinHvacButton(): TemplateResult | typeof nothing {
    const hvacMode = this.viewModel?.climate.hvacMode;
    const availableHvacModes = this._visibleHvacModes();
    const currentHvacMode = hvacMode && availableHvacModes.includes(hvacMode) ? hvacMode : undefined;

    if (availableHvacModes.length === 0) {
      return nothing;
    }

    return html`
      <ha-control-button
        .label=${currentHvacMode ? this._hvacLabel(currentHvacMode) : localize(this._language(), "dialog.hvac.title")}
        tone=${this._modeTone(currentHvacMode)}
        ?active=${currentHvacMode !== "off" && !!currentHvacMode}
        ?subtle=${true}
        ?disabled=${this._isControlDisabled()}
        @click=${(event: Event) => this._openDialog("hvac", event)}
      >
        <span class="btn-icon" tone=${this._modeTone(currentHvacMode)}>
          <ha-icon .icon=${currentHvacMode ? HVAC_ICONS[currentHvacMode] : "mdi:thermostat"}></ha-icon>
        </span>
      </ha-control-button>
    `;
  }

  private _renderThinPresetButton(): TemplateResult | typeof nothing {
    const preset = this.viewModel?.climate.presetMode;
    const availablePresets = this._visiblePresetModes();
    const presetIcon = preset && preset !== "none" && PRESET_ICONS[preset] ? PRESET_ICONS[preset] : "mdi:hand-back-right-outline";
    const presetActive = !!preset && preset !== "none" && !!PRESET_ICONS[preset];

    if (availablePresets.length === 0) {
      return nothing;
    }

    return html`
      <ha-control-button
        .label=${preset && preset !== "none" ? this._presetLabel(preset) : localize(this._language(), "main.preset.none")}
        tone=${presetActive ? this._presetTone(preset!) : ""}
        ?disabled=${this._isControlDisabled()}
        @click=${(event: Event) => this._openDialog("preset", event)}
      >
        <span class="btn-icon" tone=${presetActive ? this._presetTone(preset!) : ""}>
          <ha-icon .icon=${presetIcon}></ha-icon>
        </span>
      </ha-control-button>
    `;
  }

  private _renderThinFanButton(): TemplateResult {
    return html`
      <ha-control-button
        class="thin-selector-extra fan-selector"
        .label=${this._fanLabel()}
        ?disabled=${this._isControlDisabled()}
        @click=${(event: Event) => this._openDialog("fan", event)}
      >
        <span class="btn-icon" tone=${this._fanRailTone()}>
          <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
        </span>
      </ha-control-button>
    `;
  }

  private _renderThinSwingButton(): TemplateResult {
    return html`
      <ha-control-button
        class="thin-selector-extra swing-selector"
        .label=${this._swingLabel()}
        ?disabled=${this._isControlDisabled()}
        @click=${(event: Event) => this._openDialog("swing", event)}
      >
        <span class="btn-icon" tone=${this._swingRailTone()}>
          <ha-icon .icon=${this._swingIcon()}></ha-icon>
        </span>
      </ha-control-button>
    `;
  }

  private _renderStatus(): TemplateResult {
    const lockButtonVisible =
      !this.config?.hide_lock_button &&
      this.viewModel?.vt?.lock.isConfigured === true;
    const lockLabel = this.viewModel?.vt?.lock.isLocked
      ? localize(this._language(), "main.lock.locked")
      : localize(this._language(), "main.lock.unlocked");
    const showFan = this.config?.display_mode !== "compact" && this._hasFanControl();
    const showSwing = this.config?.display_mode !== "compact" && this._hasSwingControl();

    return html`
      <div class="status">
        ${showFan ? this._renderFanButton() : nothing}
        ${showSwing ? this._renderSwingButton() : nothing}
        <span class="status-spacer"></span>
        ${this._renderPowerInfoButton()}
        <div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>
        ${lockButtonVisible ? this._renderLockButton(lockLabel) : nothing}
        ${this.config?.disable_name ? this._renderMenuButton() : nothing}
      </div>
    `;
  }

  private _renderStateRail(): Array<TemplateResult | typeof nothing> {
    const lockButtonVisible =
      !this.config?.hide_lock_button &&
      this.viewModel?.vt?.lock.isConfigured === true;
    const lockLabel = this.viewModel?.vt?.lock.isLocked
      ? localize(this._language(), "main.lock.locked")
      : localize(this._language(), "main.lock.unlocked");

    return [
      ...(this.config?.disable_name ? [this._renderMenuButton()] : []),
      ...(lockButtonVisible ? [this._renderLockButton(lockLabel)] : []),
      this._renderPowerInfoButton(),
      html`<div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>`
    ];
  }

  private _renderLeftRail(): Array<TemplateResult | typeof nothing> {
    return [
      ...(this.config?.display_mode !== "compact" && this._hasFanControl() ? [this._renderFanButton()] : []),
      ...(this.config?.display_mode !== "compact" && this._hasSwingControl() ? [this._renderSwingButton()] : [])
    ];
  }

  private _renderLockButton(label: string): TemplateResult {
    const isLocked = this.viewModel?.vt?.lock.isLocked === true;
    return html`
      <button
        class="lock"
        title=${label}
        aria-label=${label}
        ?locked=${isLocked}
        tone=${lockTone(isLocked)}
        @click=${this._toggleLock}
      >
        <ha-icon .icon=${isLocked ? "mdi:lock" : "mdi:lock-open-outline"}></ha-icon>
      </button>
    `;
  }

  private _renderHvacStateIcon(): TemplateResult | typeof nothing {
    const action = this.viewModel?.climate.hvacAction;
    const hvacMode = this.viewModel?.climate.hvacMode;

    if (hvacMode === "off" && this.viewModel?.vt?.messages.some((message) => message.key === "hvac_off_manual")) {
      return nothing;
    }

    const icon = this._hvacActionIcon(action, hvacMode);
    const title = action
      ? localize(this._language(), `main.hvac_action.${action}`)
      : this._hvacLabel(hvacMode);

    if (!icon) {
      return nothing;
    }

    return html`
      <span
        class="action-icon"
        tone=${icon.tone}
        title=${title}
      >
        <ha-icon class="action-icon-glow" .icon=${icon.icon} aria-hidden="true"></ha-icon>
        <ha-icon class="action-icon-glyph" .icon=${icon.icon}></ha-icon>
      </span>
    `;
  }

  private _hvacActionIcon(action: string | undefined, hvacMode: string | undefined): { icon: string; tone: string } | undefined {
    const activeAction = action ?? "";

    if (activeAction === "preheating" || activeAction === "heat" || activeAction === "heating") {
      return { icon: "mdi:radiator", tone: actionTone(activeAction === "preheating" ? "preheating" : "heating") };
    }

    if (activeAction === "cool" || activeAction === "cooling") {
      return { icon: "mdi:hvac", tone: actionTone("cooling") };
    }

    if (hvacMode === "heat") {
      return { icon: "mdi:radiator-disabled", tone: actionTone("idle") };
    }

    if (hvacMode === "cool") {
      return { icon: "mdi:hvac-off", tone: actionTone("idle") };
    }

    const entry = action ? HVAC_ACTION_ICONS[action] : undefined;
    const fallbackIcon = entry?.icon || (hvacMode ? HVAC_ICONS[hvacMode] : "");

    return fallbackIcon
      ? { icon: fallbackIcon, tone: entry?.tone ?? this._modeTone(hvacMode) }
      : undefined;
  }

  private _renderEvents(): TemplateResult[] {
    const events = this.viewModel?.vt?.events;
    const messages = this.viewModel?.vt?.messages ?? [];

    if (!events) {
      return [];
    }

    const boostMessageKeys = new Set(
      EVENT_ICONS.filter((e) => e.key === "hasTimer").flatMap((e) => e.messageKeys ?? [])
    );
    const messageIcons = messages.map((message) => {
      const onClick = boostMessageKeys.has(message.key) ? (e: Event) => this._openBoost(e) : undefined;
      return this._renderMessageIcon(message, onClick);
    });
    const eventIcons = EVENT_ICONS.filter((event) => {
      const relatedMessageKeys = event.messageKeys ?? [];

      return events[event.key] && !relatedMessageKeys.some((key) => messages.some((message) => message.key === key));
    }).map((event) => {
      const onClick = event.key === "hasTimer" ? (e: Event) => this._openBoost(e) : undefined;
      return this._renderEventIcon(event, onClick);
    });

    return [...messageIcons, ...eventIcons];
  }

  private _renderEventIcon(event: EventIconDefinition, onClick?: (e: Event) => void): TemplateResult {
    const label = localize(this._language(), `main.events.${event.key}`);

    if (onClick) {
      return html`
        <button
          class="event"
          tone=${event.tone}
          title=${label}
          aria-label=${label}
          @click=${onClick}
        >
          <ha-icon .icon=${event.icon}></ha-icon>
        </button>
      `;
    }

    return html`
      <ha-icon
        class="event"
        tone=${event.tone}
        .icon=${event.icon}
        title=${label}
      ></ha-icon>
    `;
  }

  private _renderMessageIcon(message: EquinoxVtMessage, onClick?: (event: Event) => void): TemplateResult {
    const entry = this._messageIcon(message.key);
    const label = this._messageLabel(message.key);
    const handler = onClick ?? ((event: Event) => this._openMessage(message.key, event));

    return html`
      <button
        class="event"
        tone=${entry.tone}
        title=${label}
        aria-label=${label}
        @click=${handler}
      >
        <ha-icon .icon=${entry.icon}></ha-icon>
      </button>
    `;
  }

  private _renderMessageOverlay(): TemplateResult | typeof nothing {
    if (!this._activeMessageKey) {
      return nothing;
    }

    const entry = this._messageIcon(this._activeMessageKey);

    return html`
      <div class="message-body" tone=${entry.tone}>
        <ha-icon .icon=${entry.icon}></ha-icon>
        <span>${this._messageLabel(this._activeMessageKey)}</span>
      </div>
    `;
  }

  private _messageIcon(key: string): { icon: string; tone: string } {
    return MESSAGE_ICONS[key] ?? { icon: "mdi:information-outline", tone: "info" };
  }

  private _messageLabel(key: string): string {
    return localize(this._language(), `main.messages.${key}`);
  }

  private _renderSetpoint(): TemplateResult {
    if (this.config?.primary_display === "sensors") {
      return this._renderSensorFocus();
    }

    return html`<div class="setpoint">${this._renderTemperatureControl(false)}</div>`;
  }

  private _renderSensorFocus(): TemplateResult {
    const currentHumidity = this.viewModel?.climate.currentHumidity;
    const showHumidity = finite(currentHumidity);
    const showTemperature = finite(this.viewModel?.climate.currentTemperature);

    return html`
      <div class="setpoint" sensor-focus>
        <div class="sensor-primary">
          <span
            class="sensor-temperature"
            ?clickable=${showTemperature}
            @click=${showTemperature ? (event: Event) => this._openTemperatureInfo(event) : nothing}
          >
            <ha-icon icon="mdi:thermometer"></ha-icon>
            <span>${this._formatCurrentTempValue()}</span>
            <span class="sensor-unit">°</span>
          </span>
          ${showHumidity
        ? html`
                <span class="sensor-humidity" @click=${(event: Event) => this._openHumidityInfo(event)}>
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  <span>${this._formatPercent(currentHumidity)}</span>
                </span>
              `
        : nothing}
        </div>
        ${this._renderTemperatureControl(true)}
      </div>
    `;
  }

  private _renderTemperatureControl(compact: boolean): TemplateResult {
    if (this._usesTemperaturePopup()) {
      return this._renderTemperaturePopupButton(compact);
    }

    return this._hasTemperatureRangeControl()
      ? this._renderRangeSetpointControl(compact)
      : this._renderSetpointControl(compact);
  }

  private _renderTemperaturePopupButton(compact: boolean): TemplateResult {
    return html`
      <button
        class="temperature-popup-button"
        ?compact=${compact}
        ?disabled=${this._isControlDisabled()}
        @click=${(event: Event) => this._openDialog("temperature", event)}
      >
        ${this._renderThinTemperatureValue()}
      </button>
    `;
  }

  private _renderSetpointControl(compact: boolean): TemplateResult {
    const disabled = this._isControlDisabled() || !finite(this.viewModel?.climate.targetTemperature);
    const rawValue = this._setpointFallback();
    const inputWidth = rawValue.length || 4;

    return html`
      <div class="setpoint-control" ?compact=${compact}>
        <ha-control-button
          class="step"
          .label=${localize(this._language(), "main.actions.decrease_temperature")}
          ?disabled=${disabled}
          @click=${() => this._changeTemperature(-1)}
        >
          <ha-icon icon="mdi:minus"></ha-icon>
        </ha-control-button>
        <div class="target" mode=${this._targetTone()} ?compact=${compact}>
          <span class="setpoint-unit" aria-hidden="true" style="visibility: hidden">°</span>
          <input
            class="setpoint-input"
            type="text"
            inputmode="decimal"
            .value=${rawValue}
            placeholder="--.-"
            style="width: ${inputWidth}ch"
            ?disabled=${disabled}
            @focus=${this._onSetpointFocus}
            @blur=${this._onSetpointBlur}
            @keydown=${this._onSetpointKeyDown}
          >
          <span class="setpoint-unit">°</span>
        </div>
        <ha-control-button
          class="step"
          .label=${localize(this._language(), "main.actions.increase_temperature")}
          ?disabled=${disabled}
          @click=${() => this._changeTemperature(1)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-control-button>
      </div>
    `;
  }

  private _renderRangeSetpointControl(compact: boolean): TemplateResult {
    const range = this.viewModel?.climate.targetTemperatureRange;
    const isHeatCool = this.viewModel?.climate.hvacMode === "heat_cool";

    return html`
      <div class="range-setpoint-control" mode=${isHeatCool ? "heat-cool" : "range"} ?compact=${compact}>
        ${isHeatCool
        ? html`
              ${this._renderRangeBound("high", range?.high, compact)}
              ${this._renderRangeBound("low", range?.low, compact)}
            `
        : html`
              ${this._renderRangeBound("low", range?.low, compact)}
              ${this._renderRangeBound("high", range?.high, compact)}
            `}
      </div>
    `;
  }

  private _renderRangeBound(bound: TemperatureRangeBound, value: number | undefined, compact: boolean): TemplateResult {
    const disabled = this._isControlDisabled() || !finite(value);
    const label = this._rangeBoundLabel(bound);
    const rawValue = this._rangeSetpointFallback(bound);
    const inputWidth = rawValue.length || 4;
    const tone = this._rangeBoundTone(bound);

    return html`
      <div class="range-bound">
        ${label ? html`<span class="range-label">${label}</span>` : nothing}
        <div class="setpoint-control" ?compact=${compact}>
          <ha-control-button
            class="step"
            .label=${localize(this._language(), "main.actions.decrease_temperature")}
            ?disabled=${disabled}
            @click=${() => this._changeRangeTemperature(bound, -1)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </ha-control-button>
          <div class="target" mode=${tone} ?compact=${compact}>
            <span class="setpoint-unit" aria-hidden="true" style="visibility: hidden">°</span>
            <input
              class="setpoint-input"
              type="text"
              inputmode="decimal"
              .value=${rawValue}
              placeholder="--.-"
              style="width: ${inputWidth}ch"
              ?disabled=${disabled}
              data-range-bound=${bound}
              @focus=${this._onSetpointFocus}
              @blur=${this._onRangeSetpointBlur}
              @keydown=${this._onSetpointKeyDown}
            >
            <span class="setpoint-unit">°</span>
          </div>
          <ha-control-button
            class="step"
            .label=${localize(this._language(), "main.actions.increase_temperature")}
            ?disabled=${disabled}
            @click=${() => this._changeRangeTemperature(bound, 1)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </ha-control-button>
        </div>
      </div>
    `;
  }

  private _rangeBoundLabel(bound: TemperatureRangeBound): string {
    if (this.viewModel?.climate.hvacMode === "heat_cool") {
      return "";
    }

    const labelKey = bound === "low" ? "main.actions.low_temperature" : "main.actions.high_temperature";

    return localize(this._language(), labelKey);
  }

  private _rangeBoundTone(bound: TemperatureRangeBound): string {
    if (this.viewModel?.climate.hvacMode === "heat_cool" && this.viewModel.climate.availability === "available") {
      return bound === "high" ? "cool" : "heat";
    }

    return this._targetTone();
  }

  private _renderConditions(): TemplateResult | typeof nothing {
    if (this.config?.primary_display === "sensors") {
      return nothing;
    }

    const currentHumidity = this.viewModel?.climate.currentHumidity;
    const showHumidity = finite(currentHumidity);

    const showTemperature = finite(this.viewModel?.climate.currentTemperature);

    return html`
      <div class="conditions">
        <span
          class="condition"
          ?clickable=${showTemperature}
          @click=${showTemperature ? (event: Event) => this._openTemperatureInfo(event) : nothing}
        >
          <ha-icon icon="mdi:thermometer"></ha-icon>
          <span class="condition-value" kind="temperature">${this._formatCurrentTemp()}</span>
        </span>
        ${showHumidity
        ? html`
            <span class="divider"></span>
            <span class="condition" clickable @click=${(event: Event) => this._openHumidityInfo(event)}>
              <ha-icon icon="mdi:water-percent"></ha-icon>
              <span class="condition-value" kind="humidity">${this._formatPercent(currentHumidity)}</span>
            </span>
          `
        : nothing}
      </div>
    `;
  }

  private _renderHvacModes(): TemplateResult | typeof nothing {
    const modes = this._visibleHvacModes();

    if (modes.length === 0) {
      return nothing;
    }

    const small = modes.length < 3;
    const segStyle = small
      ? `width: calc(100% / 3 * ${modes.length}); margin-inline: auto;`
      : "";

    return html`<div class="segments" style=${segStyle}>${modes.map((mode) => this._renderHvacButton(mode))}</div>`;
  }

  private _renderHvacButton(mode: string): TemplateResult {
    return html`
      <ha-control-button
        .label=${this._hvacLabel(mode)}
        tone=${this._modeTone(mode)}
        ?active=${this.viewModel?.climate.hvacMode === mode}
        ?subtle=${true}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setHvacMode(mode)}
      >
        <span class="btn-icon" tone=${this._modeTone(mode)}>
          <ha-icon .icon=${HVAC_ICONS[mode]}></ha-icon>
        </span>
      </ha-control-button>
    `;
  }

  private _renderPresets(): TemplateResult | typeof nothing {
    const presets = this._visiblePresetModes();

    if (presets.length === 0) {
      return nothing;
    }

    return html`<div class="segments">${presets.map((preset) => this._renderPresetButton(preset))}</div>`;
  }

  private _renderPresetButton(preset: string): TemplateResult {
    return html`
      <ha-control-button
        .label=${this._presetLabel(preset)}
        tone=${this._presetTone(preset)}
        ?active=${this.viewModel?.climate.presetMode === preset}
        ?subtle=${true}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setPresetMode(preset)}
      >
        <span class="btn-icon" tone=${this._presetTone(preset)}>
          <ha-icon .icon=${PRESET_ICONS[preset]}></ha-icon>
        </span>
      </ha-control-button>
    `;
  }

  // Renders the compact single-row selector bar (HVAC + optional preset + optional fan/swing).
  private _renderCompactSelectors(): TemplateResult | typeof nothing {
    const hvacMode = this.viewModel?.climate.hvacMode;
    const preset = this.viewModel?.climate.presetMode;
    const availableHvacModes = this._visibleHvacModes();
    const currentHvacMode = hvacMode && availableHvacModes.includes(hvacMode) ? hvacMode : undefined;
    const showHvac = availableHvacModes.length > 0;

    const availablePresets = this._visiblePresetModes();
    const showPreset = availablePresets.length > 0;
    const presetIcon = preset && preset !== "none" && PRESET_ICONS[preset] ? PRESET_ICONS[preset] : "mdi:hand-back-right-outline";
    const presetActive = !!preset && preset !== "none" && !!PRESET_ICONS[preset];

    const showFan = this._hasFanControl();
    const showSwing = this._hasSwingControl();

    const btnCount = (showHvac ? 1 : 0) + (showPreset ? 1 : 0) + (showFan ? 1 : 0) + (showSwing ? 1 : 0);

    if (btnCount === 0) {
      return nothing;
    }

    const compactStyle = btnCount < 4
      ? `width: calc(100% / 3 * ${btnCount}); margin-inline: auto;`
      : "";

    return html`
      <div class="compact-selectors" style=${compactStyle}>
        ${showHvac
        ? html`
              <ha-control-button
                .label=${currentHvacMode ? this._hvacLabel(currentHvacMode) : localize(this._language(), "dialog.hvac.title")}
                tone=${this._modeTone(currentHvacMode)}
                ?active=${currentHvacMode !== "off" && !!currentHvacMode}
                ?subtle=${true}
                ?disabled=${this._isControlDisabled()}
                @click=${(event: Event) => this._openDialog("hvac", event)}
              >
                <span class="btn-icon" tone=${this._modeTone(currentHvacMode)}>
                  <ha-icon .icon=${currentHvacMode ? HVAC_ICONS[currentHvacMode] : "mdi:thermostat"}></ha-icon>
                </span>
              </ha-control-button>
            `
        : nothing}
        ${showPreset
        ? html`
              <ha-control-button
                .label=${preset && preset !== "none" ? this._presetLabel(preset) : localize(this._language(), "main.preset.none")}
                tone=${presetActive ? this._presetTone(preset!) : ""}
                ?disabled=${this._isControlDisabled()}
                @click=${(event: Event) => this._openDialog("preset", event)}
              >
                <span class="btn-icon" tone=${presetActive ? this._presetTone(preset!) : ""}>
                  <ha-icon .icon=${presetIcon}></ha-icon>
                </span>
              </ha-control-button>
            `
        : nothing}
        ${showFan
        ? html`
              <ha-control-button
                class="fan-selector"
                .label=${this._fanLabel()}
                ?disabled=${this._isControlDisabled()}
                @click=${(event: Event) => this._openDialog("fan", event)}
              >
                <span class="btn-icon" tone=${this._fanRailTone()}>
                  <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
                </span>
              </ha-control-button>
            `
        : nothing}
        ${showSwing
        ? html`
              <ha-control-button
                class="swing-selector"
                .label=${this._swingLabel()}
                ?disabled=${this._isControlDisabled()}
                @click=${(event: Event) => this._openDialog("swing", event)}
              >
                <span class="btn-icon" tone=${this._swingRailTone()}>
                  <ha-icon .icon=${this._swingIcon()}></ha-icon>
                </span>
              </ha-control-button>
            `
        : nothing}
      </div>
    `;
  }

  private _hasPowerInfo(): boolean {
    const value = this._powerValveValue();
    const instantPower = this.viewModel?.vt?.powerValve.instantPower ?? this.viewModel?.climate.instantPower;

    return !!value || finite(instantPower);
  }

  private _renderPowerInfoButton(): TemplateResult | typeof nothing {
    if (!this._hasPowerInfo()) {
      return nothing;
    }

    const label = localize(this._language(), "main.actions.open_power_info");

    return html`
      <button
        class="power-info power-info-button"
        title=${label}
        aria-label=${label}
        @click=${(event: Event) => this._openSensorMoreInfo({ kind: "power" }, event)}
      >
        <ha-icon .icon=${this._powerInfoButtonIcon()}></ha-icon>
      </button>
    `;
  }

  private _powerInfoButtonIcon(): string {
    return this._powerValveValue()?.icon === "mdi:pipe-valve" ? "mdi:pipe-valve" : "mdi:flash";
  }

  private _renderFanButton(): TemplateResult {
    return html`
      <button class="fan" tone=${this._fanRailTone()} title=${localize(this._language(), "main.actions.open_fan")} aria-label=${localize(this._language(), "main.actions.open_fan")} @click=${(event: Event) => this._openDialog("fan", event)}>
        <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
        <span class="fan-label">${this._fanLabel()}</span>
      </button>
    `;
  }

  private _renderSwingButton(): TemplateResult {
    const label = localize(this._language(), "main.actions.open_swing");

    return html`
      <button class="swing" tone=${this._swingRailTone()} title=${label} aria-label=${label} @click=${(event: Event) => this._openDialog("swing", event)}>
        <ha-icon .icon=${this._swingIcon()}></ha-icon>
        <span class="swing-label">${this._swingLabel()}</span>
      </button>
    `;
  }

  private _hasFanControl(): boolean {
    return (this.viewModel?.climate.fanModes?.length ?? 0) > 0 || this.viewModel?.vt?.fan.hasAutoFan === true;
  }

  private _hasSwingControl(): boolean {
    return (
      (this.viewModel?.climate.swingModes?.length ?? 0) > 0 ||
      (this.viewModel?.climate.swingHorizontalModes?.length ?? 0) > 0
    );
  }

  private _renderMenuButton(): TemplateResult {
    return html`
      <button class="menu" title=${localize(this._language(), "main.actions.open_menu")} aria-label=${localize(this._language(), "main.actions.open_menu")} @click=${(event: Event) => this._openDialog("menu", event)}>
        <ha-icon icon="mdi:dots-vertical"></ha-icon>
      </button>
    `;
  }

  private _openDialog(dialog: Exclude<LightweightDialog, "boost">, event: Event): void {
    const target = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;

    if (this._activeDialog === dialog) {
      this._activeDialog = null;
      this._activeMessageKey = undefined;
      this._dialogAnchor = undefined;
      return;
    }

    if (target) {
      const isMenu = dialog === "menu";
      const clientX = event instanceof MouseEvent ? event.clientX : undefined;
      const clientY = isMenu && event instanceof MouseEvent ? event.clientY : undefined;
      this._dialogAnchor = { element: target, clientX, clientY };
    } else {
      this._dialogAnchor = undefined;
    }

    this._activeDialog = dialog;
    this._activeMessageKey = undefined;
  }

  private _closeLightweightDialog(dialog: Exclude<LightweightDialog, "menu">): void {
    if (this._activeDialog === dialog) {
      this._activeDialog = null;
    }
  }

  private _openBoost(event: Event): void {
    const target = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;

    if (this._activeDialog === "boost") {
      this._activeDialog = null;
      this._activeMessageKey = undefined;
      this._dialogAnchor = undefined;
      return;
    }

    if (target) {
      const clientX = event instanceof MouseEvent ? event.clientX : undefined;
      this._dialogAnchor = { element: target, clientX };
    }

    this._activeDialog = "boost";
    this._activeMessageKey = undefined;
  }

  private _openMessage(messageKey: string, event: Event): void {
    const target = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;

    if (target) {
      this._dialogAnchor = {
        element: target
      };
    } else {
      this._dialogAnchor = undefined;
    }

    this._activeDialog = null;
    this._activeMessageKey = messageKey;
  }

  private _closeMessage(): void {
    this._activeMessageKey = undefined;
  }

  private _powerValveValue(): { icon: string; label: string } | undefined {
    const vt = this.viewModel?.vt;

    if (!vt) {
      return undefined;
    }

    if (vt.types.includes("over_valve") || vt.types.includes("over_climate_valve")) {
      return finite(vt.powerValve.valveOpenPercent)
        ? { icon: "mdi:pipe-valve", label: this._formatPercent(vt.powerValve.valveOpenPercent) }
        : undefined;
    }

    if (vt.types.includes("over_switch")) {
      return finite(vt.powerValve.powerPercent)
        ? { icon: "mdi:meter-electric", label: this._formatPercent(vt.powerValve.powerPercent) }
        : undefined;
    }

    return undefined;
  }

  private _targetTone(): string {
    if (this.viewModel?.vt?.timedPreset.isActive) {
      return "boost";
    }

    const mode = this.viewModel?.climate.hvacMode;

    if (this.viewModel?.climate.availability !== "available" || mode === "off") {
      return "unavailable";
    }

    return this._modeTone(mode);
  }

  private _cardTone(): string {
    if (this.viewModel?.vt?.timedPreset.isActive) {
      return "boost";
    }

    const mode = this.viewModel?.climate.hvacMode;

    if (this.viewModel?.climate.availability !== "available" || mode === "off") {
      return "off";
    }

    return this._modeTone(mode);
  }

  private _activeHvacAction(): "heat" | "cool" | undefined {
    const action = this.viewModel?.climate.hvacAction;

    if (action === "heating" || action === "heat") {
      return "heat";
    }

    if (action === "cooling" || action === "cool") {
      return "cool";
    }

    return undefined;
  }

  private _modeTone(mode?: string): string {
    return mode ? HVAC_TONES[mode] ?? "" : "";
  }

  private _presetTone(preset: string): string {
    if (this.viewModel?.climate.availability !== "available") {
      return "off";
    }

    return presetTone(preset, this.viewModel?.climate.hvacMode);
  }

  private _hidePreset(preset: string): boolean {
    const hvacMode = this.viewModel?.climate.hvacMode;

    return preset === "frost" && hvacMode !== "heat";
  }

  private _visibleHvacModes(): string[] {
    const hidden = new Set(this.config?.hidden_hvac_modes ?? []);

    return uniqueOrdered(this.viewModel?.climate.hvacModes ?? [], HVAC_ORDER).filter(
      (mode) => HVAC_ICONS[mode] && !hidden.has(mode)
    );
  }

  private _visiblePresetModes(): string[] {
    const hidden = new Set(this.config?.hidden_preset_modes ?? []);

    return uniqueOrdered(this.viewModel?.climate.presetModes ?? [], PRESET_ORDER).filter(
      (preset) => preset !== "none" && PRESET_ICONS[preset] && !this._hidePreset(preset) && !hidden.has(preset)
    );
  }

  private _fanIcon(): string {
    const mode = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode;

    return mode ? (FAN_MODE_ICONS[mode] ?? "mdi:fan-speed-2") : "mdi:fan-speed-2";
  }

  private _fanRailTone(): string {
    if (this.viewModel?.climate.availability !== "available") return "off";
    const mode = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode;
    return mode ? fanTone(mode) : "fan";
  }

  private _swingRailTone(): string {
    if (this.viewModel?.climate.availability !== "available") return "off";
    const mode = this.viewModel?.climate.swingMode ?? this.viewModel?.climate.swingHorizontalMode;
    return mode ? swingTone(mode) : "swing";
  }

  private _fanIconClass(): string {
    const icon = this._fanIcon();

    if (icon === "mdi:fan-auto") {
      return "fan-icon-auto";
    }

    return icon === "mdi:fan-speed-2" ? "fan-icon-speed" : "";
  }

  private _fanLabel(): string {
    const mode =
      this.viewModel?.climate.fanMode ??
      this.viewModel?.vt?.fan.currentAutoFanMode ??
      (this.viewModel?.climate.fanModes.includes("auto") ? "auto" : undefined);

    return mode ? this._optionLabel("main.fan", mode) : localize(this._language(), "main.fan.unavailable");
  }

  private _swingIcon(): string {
    const verticalMode = this.viewModel?.climate.swingMode;
    const horizontalMode = this.viewModel?.climate.swingHorizontalMode;

    if (verticalMode) {
      return SWING_MODE_ICONS[verticalMode] ?? "mdi:arrow-oscillating";
    }

    if (horizontalMode) {
      return SWING_HORIZONTAL_MODE_ICONS[horizontalMode] ?? SWING_MODE_ICONS[horizontalMode] ?? "mdi:arrow-expand-horizontal";
    }

    return "mdi:arrow-oscillating";
  }

  private _swingLabel(): string {
    const mode = this.viewModel?.climate.swingMode ?? this.viewModel?.climate.swingHorizontalMode;

    return mode ? this._optionLabel("main.swing", mode) : localize(this._language(), "main.swing.unavailable");
  }

  private _hvacLabel(mode?: string): string {
    if (!mode || this.viewModel?.climate.availability !== "available") {
      return localize(this._language(), "main.status.unavailable");
    }

    if (mode === "off") {
      return localize(this._language(), "main.status.off");
    }

    return this._optionLabel("main.hvac", mode);
  }

  private _presetLabel(preset: string): string {
    return this._optionLabel("main.preset", preset);
  }

  private _optionLabel(prefix: string, value: string): string {
    const label = localize(this._language(), `${prefix}.${value}`);

    return label === `${prefix}.${value}` ? value : label;
  }

  private _formatCurrentTemp(): string {
    const value = this.viewModel?.climate.currentTemperature;
    const decimals = this.viewModel?.climate.currentTemperatureDecimals;
    if (!finite(value)) return "--.-°";
    if (decimals !== undefined) {
      return new Intl.NumberFormat(this._language(), { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value) + "°";
    }
    return `${this._formatNumber(value)}°`;
  }

  private _formatCurrentTempValue(): string {
    const value = this.viewModel?.climate.currentTemperature;
    const decimals = this.viewModel?.climate.currentTemperatureDecimals;
    if (!finite(value)) return "--.-";
    if (decimals !== undefined) {
      return new Intl.NumberFormat(this._language(), { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
    }
    return this._formatNumber(value);
  }

  private _formatPercent(value?: number): string {
    return finite(value) ? `${this._formatNumber(value, 0)}%` : "--%";
  }

  private _formatNumber(value: number, maximumFractionDigits = 1): string {
    return new Intl.NumberFormat(this._language(), {
      maximumFractionDigits,
      minimumFractionDigits: maximumFractionDigits === 0 ? 0 : 1
    }).format(value);
  }

  private _isControlDisabled(): boolean {
    return !this.hass || this.viewModel?.climate.availability !== "available" || this.viewModel?.vt?.lock.isUserLocked === true;
  }

  private _usesTemperaturePopup(): boolean {
    return this.config?.display_mode === "thin" || this.config?.use_temperature_popup === true;
  }

  private _stepDecimals(): number {
    const s = String(this.viewModel?.climate.targetTempStep ?? 0.5);
    return s.includes('.') ? (s.split('.')[1]?.length ?? 0) : 0;
  }

  private _hasTemperatureRangeControl(): boolean {
    const mode = this.viewModel?.climate.hvacMode;
    const range = this.viewModel?.climate.targetTemperatureRange;

    return (mode === "heat_cool" || mode === "auto") && (finite(range?.low) || finite(range?.high));
  }

  private _setpointFallback(): string {
    const dec = this._stepDecimals();
    if (!finite(this.viewModel?.climate.targetTemperature)) return "";
    return new Intl.NumberFormat(this._language(), {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    }).format(this.viewModel!.climate.targetTemperature);
  }

  private _rangeSetpointFallback(bound: TemperatureRangeBound): string {
    const dec = this._stepDecimals();
    const value = this.viewModel?.climate.targetTemperatureRange?.[bound];

    if (!finite(value)) {
      return "";
    }

    return new Intl.NumberFormat(this._language(), {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    }).format(value);
  }

  private _formatTargetTempSummary(): string {
    if (this._hasTemperatureRangeControl()) {
      const low = this._rangeSetpointFallback("low");
      const high = this._rangeSetpointFallback("high");

      if (low && high) {
        return `${low}°-${high}°`;
      }

      return low || high ? `${low || high}°` : "--.-°";
    }

    const value = this._setpointFallback();

    return value ? `${value}°` : "--.-°";
  }

  private _onSetpointFocus(e: Event): void {
    (e.target as HTMLInputElement).value = "";
  }

  private _onSetpointKeyDown(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  }

  private _isValidStep(val: number): boolean {
    const step = this.viewModel?.climate.targetTempStep ?? 0.5;
    const dec = this._stepDecimals();
    const rounded = Math.round(val / step) * step;
    return rounded.toFixed(dec) === val.toFixed(dec);
  }

  private _onSetpointBlur(e: Event): void {
    const input = e.target as HTMLInputElement;
    const fallback = this._setpointFallback();
    const val = parseFloat(input.value.trim().replace(',', '.'));

    if (!Number.isFinite(val) || !this._isValidStep(val) || !this.hass || !this.config || !this.viewModel) {
      input.value = fallback;
      return;
    }

    const dec = this._stepDecimals();
    const clamped = this._clampTemperature(val);
    input.value = new Intl.NumberFormat(this._language(), {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    }).format(clamped);
    void setTemperature(
      { hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel },
      { temperature: clamped }
    );
  }

  private _onRangeSetpointBlur(e: Event): void {
    const input = e.target as HTMLInputElement;
    const bound = input.dataset.rangeBound === "high" ? "high" : "low";
    const fallback = this._rangeSetpointFallback(bound);
    const val = parseFloat(input.value.trim().replace(',', '.'));

    if (!Number.isFinite(val) || !this._isValidStep(val) || !this.hass || !this.config || !this.viewModel) {
      input.value = fallback;
      return;
    }

    const next = this._rangeWith(bound, val);

    if (!next) {
      input.value = fallback;
      return;
    }

    const dec = this._stepDecimals();
    input.value = new Intl.NumberFormat(this._language(), {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    }).format(next[bound]);
    void setTemperature(
      { hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel },
      { targetTempLow: next.low, targetTempHigh: next.high }
    );
  }

  private _changeTemperature(direction: -1 | 1): void {
    if (!this.hass || !this.config || !this.viewModel || !finite(this.viewModel.climate.targetTemperature)) {
      return;
    }

    const step = this.viewModel.climate.targetTempStep ?? 0.5;
    const next = this._clampTemperature(this.viewModel.climate.targetTemperature + step * direction);

    void setTemperature(
      {
        hass: this.hass,
        entityId: this.config.entity,
        viewModel: this.viewModel
      },
      { temperature: next }
    );
  }

  private _changeRangeTemperature(bound: TemperatureRangeBound, direction: -1 | 1): void {
    if (!this.hass || !this.config || !this.viewModel) {
      return;
    }

    const currentValue = this.viewModel.climate.targetTemperatureRange?.[bound];

    if (!finite(currentValue)) {
      return;
    }

    const step = this.viewModel.climate.targetTempStep ?? 0.5;
    const next = this._rangeWith(bound, currentValue + step * direction);

    if (!next) {
      return;
    }

    void setTemperature(
      {
        hass: this.hass,
        entityId: this.config.entity,
        viewModel: this.viewModel
      },
      { targetTempLow: next.low, targetTempHigh: next.high }
    );
  }

  private _rangeWith(bound: TemperatureRangeBound, value: number): { low: number; high: number } | undefined {
    const range = this.viewModel?.climate.targetTemperatureRange;
    const low = bound === "low" ? this._clampTemperature(value) : range?.low;
    const high = bound === "high" ? this._clampTemperature(value) : range?.high;

    if (!finite(low) || !finite(high)) {
      return undefined;
    }

    const normalized = bound === "low"
      ? { low: Math.min(low, high), high }
      : { low, high: Math.max(high, low) };

    return {
      low: Number(normalized.low.toFixed(2)),
      high: Number(normalized.high.toFixed(2))
    };
  }

  private _clampTemperature(value: number): number {
    const min = this.viewModel?.climate.minTemp;
    const max = this.viewModel?.climate.maxTemp;
    const clampedMin = finite(min) ? Math.max(value, min) : value;
    const clamped = finite(max) ? Math.min(clampedMin, max) : clampedMin;

    return Number(clamped.toFixed(2));
  }

  private _setHvacMode(mode: string): void {
    if (!this.hass || !this.config || !this.viewModel) {
      return;
    }

    void setHvacMode({ hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel }, mode);
  }

  private _setPresetMode(preset: string): void {
    if (!this.hass || !this.config || !this.viewModel) {
      return;
    }

    void setPresetMode({ hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel }, preset);
  }

  private _openSensorMoreInfo(infoTarget: SensorMoreInfoTarget, event?: Event): void {
    const targetElement = event?.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
    this._dialogAnchor = targetElement ? { element: targetElement } : undefined;
    this._activeMessageKey = undefined;
    this._activeSensorInfoTarget = infoTarget;
    this._activeDialog = "sensor-more-info";
    this._pushSensorMoreInfoDialogState(infoTarget);
  }

  private _openHumidityInfo(event?: Event): void {
    if (!this.config) return;

    if (this.config.humidity_entity) {
      this._openSensorMoreInfo({ kind: "entity", entityId: this.config.humidity_entity, icon: "mdi:water-percent" }, event);
      return;
    }

    const climate = this.hass?.states[this.config.entity];
    const attribute = climate?.attributes.current_humidity !== undefined ? "current_humidity" : "humidity";

    this._openSensorMoreInfo({
      kind: "entity",
      entityId: this.config.entity,
      attribute,
      unit: "%",
      icon: "mdi:water-percent",
      label: localize(this._language(), "dialog.sensor_more_info.humidity")
    }, event);
  }

  private _openTemperatureInfo(event?: Event): void {
    if (!this.config) return;

    const temperatureEntityId = this.viewModel?.climate.temperatureEntityId;
    if (temperatureEntityId) {
      this._openSensorMoreInfo({ kind: "entity", entityId: temperatureEntityId, icon: "mdi:thermometer" }, event);
      return;
    }

    this._openSensorMoreInfo({
      kind: "entity",
      entityId: this.config.entity,
      attribute: "current_temperature",
      unit: "temperature",
      icon: "mdi:thermometer",
      label: localize(this._language(), "dialog.sensor_more_info.temperature")
    }, event);
  }

  private _toggleLock(): void {
    if (!this.hass || !this.config || !this.viewModel?.vt?.lock.isConfigured) {
      return;
    }

    if (this.viewModel.vt.lock.hasCode) {
      this._lockIsLocking = !this.viewModel.vt.lock.isLocked;
      this._lockDialogOpen = true;
      return;
    }

    const context = { hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel };

    if (this.viewModel.vt.lock.isLocked) {
      void unlockThermostat(context);
      return;
    }

    void lockThermostat(context);
  }
}

if (!customElements.get("eq-main-card")) {
  customElements.define("eq-main-card", EquinoxMainCard);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-main-card": EquinoxMainCard;
  }
}
