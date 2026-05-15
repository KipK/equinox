import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { lock as lockThermostat, setHvacMode, setPresetMode, setTemperature, unlock as unlockThermostat } from "../data/actions";
import { HVAC_ICONS, HVAC_ORDER, HVAC_TONES, PRESET_ICONS, PRESET_ORDER, SWING_HORIZONTAL_MODE_ICONS, SWING_MODE_ICONS } from "../data/climate-modes";
import { FAN_MODE_ICONS } from "../data/fan";
import { localize } from "../localize/localize";
import { baseStyles } from "../styles/base";
import { flatStyles } from "../styles/flat";
import { liquidGlowStyles } from "../styles/liquid-glow";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxVtMessage } from "../types/vt";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-fan-dialog";
import "./eq-hvac-dialog";
import "./eq-swing-dialog";
import "./eq-preset-dialog";
import "./eq-menu-dialog";
import "./eq-boost-dialog";
import "./eq-history-dialog";
import "./eq-lock-dialog";
import "./eq-dialog";

const BROWSER_HISTORY_STATE_KEY = "equinox";

interface BrowserHistoryEntry {
  instanceId: string;
  layer: "history-dialog";
}

type EventIconDefinition = {
  key: keyof NonNullable<EquinoxViewModel["vt"]>["events"];
  icon: string;
  tone: string;
  messageKeys?: string[];
};

type TemperatureRangeBound = "low" | "high";

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

const HVAC_ACTION_ICONS: Record<string, { icon?: string; tone: string }> = {
  preheating: { icon: "mdi:timer-sand", tone: "heat" },
  heat: { icon: "mdi:fire", tone: "heat" },
  heating: { icon: "mdi:fire", tone: "heat" },
  cool: { icon: "mdi:snowflake", tone: "cool" },
  cooling: { icon: "mdi:snowflake", tone: "cool" },
  drying: { icon: "mdi:water-percent", tone: "cool" },
  fan: { icon: "mdi:fan-speed-2", tone: "auto" },
  idle: { tone: "muted" },
  defrosting: { icon: "mdi:snowflake", tone: "cool" }
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
    _powerInfoPinned: { state: true },
    _lockDialogOpen: { state: true },
    _lockIsLocking: { state: true }
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

      .event ha-icon {
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

      .action-icon {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--equinox-muted-color);
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

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 11px;
        flex: 1;
        min-height: 0;
        position: relative;
        --rail-icon-size: clamp(20px, 7cqi, 26px);
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
      .state-rail .fan,
      .state-rail .swing,
      .left-rail .fan,
      .left-rail .swing,
      .left-rail .power-info-button,
      .state-rail .power-info-button {
        width: var(--rail-icon-size);
        height: var(--rail-icon-size);
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

      .btn-icon[tone="heat"] { background: color-mix(in srgb, var(--equinox-heat-color) 15%, transparent); }
      .btn-icon[tone="cool"] { background: color-mix(in srgb, var(--equinox-cool-color) 15%, transparent); }
      .btn-icon[tone="auto"] { background: color-mix(in srgb, var(--equinox-auto-color) 15%, transparent); }
      .btn-icon[tone="heat-cool"] { background: color-mix(in srgb, var(--equinox-heat-cool-color) 15%, transparent); }
      .btn-icon[tone="boost"] { background: color-mix(in srgb, var(--equinox-boost-color) 15%, transparent); }
      .btn-icon[tone="cool-boost"] { background: color-mix(in srgb, var(--equinox-cool-boost-color) 15%, transparent); }

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
        border: 0;
        background: color-mix(in srgb, var(--primary-color) 15%, transparent);
        color: var(--primary-color);
        padding: 0;
        cursor: pointer;
      }

      .status .fan,
      .status .swing {
        width: 26px;
        height: 26px;
      }

      .fan-label,
      .swing-label {
        display: none;
      }

      .meter {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: var(--equinox-muted-color);
        font-size: 12px;
        white-space: nowrap;
      }

      .meter-line {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        line-height: 1;
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
        background: color-mix(in srgb, var(--primary-color) 22%, transparent);
      }

      .meter-legacy {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .meter ha-icon {
        --mdc-icon-size: 22px;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .power-info {
        position: relative;
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

      .power-popover {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        z-index: 20;
        display: none;
        width: max-content;
        min-width: 82px;
        max-width: min(180px, calc(100vw - 24px));
        padding: 10px;
        border-radius: var(--equinox-radius);
        border: 1px solid color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 70%, transparent);
        background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color, #1c1c1c)) 82%, transparent);
        box-shadow: 0 10px 28px rgb(0 0 0 / 28%);
        backdrop-filter: blur(14px);
        color: var(--equinox-text-color);
      }

      .state-rail .power-popover {
        left: auto;
        right: 0;
      }

      .power-info:hover .power-popover,
      .power-info:focus-within .power-popover,
      .power-info[open] .power-popover {
        display: block;
      }

      .power-popover .meter {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        font-size: 12px;
        white-space: nowrap;
        color: var(--equinox-text-color);
      }

      .power-popover .meter-line {
        gap: 6px;
      }

      .power-popover ha-icon {
        width: 28px;
        height: 28px;
        --mdc-icon-size: 18px;
        background: rgba(128, 128, 128, 0.10);
        border-radius: 50%;
        flex-shrink: 0;
        color: var(--equinox-muted-color);
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

      .lock[locked] {
        color: var(--equinox-danger-color);
      }

      ha-card[locked] .setpoint-control,
      ha-card[locked] .segments,
      ha-card[locked] .compact-selectors {
        opacity: 0.5;
        transition: opacity 0.2s;
      }
    `,
    liquidGlowStyles
  ];

  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  viewModel?: EquinoxViewModel;

  private _activeDialog: "fan" | "swing" | "hvac" | "preset" | "menu" | "boost" | "history" | null = null;
  private _dialogAnchor?: { element: HTMLElement; clientX?: number; clientY?: number };
  private _activeMessageKey?: string;
  private _powerInfoPinned = false;
  private _powerInfoPressTimer?: number;
  private _lockDialogOpen = false;
  private _lockIsLocking = false;
  private readonly _browserHistoryInstanceId = `equinox-${Math.random().toString(36).slice(2)}`;
  private _syncingBrowserHistory = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("mouseleave", this._handleMouseLeave);
    window.addEventListener("popstate", this._handleBrowserPopState);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("mouseleave", this._handleMouseLeave);
    window.removeEventListener("popstate", this._handleBrowserPopState);
    this._clearPowerInfoPressTimer();
  }

  private readonly _handleMouseLeave = (): void => {
    if (this._activeDialog === "menu") {
      this._activeDialog = null;
    }
  };

  private _browserHistoryEntry(state = window.history.state): BrowserHistoryEntry | undefined {
    const entry = typeof state === "object" && state !== null
      ? (state as Record<string, unknown>)[BROWSER_HISTORY_STATE_KEY]
      : undefined;

    if (typeof entry !== "object" || entry === null) return undefined;

    const record = entry as Partial<BrowserHistoryEntry>;
    if (record.instanceId !== this._browserHistoryInstanceId || record.layer !== "history-dialog") {
      return undefined;
    }

    return { instanceId: record.instanceId, layer: record.layer };
  }

  private _browserHistoryState(): Record<string, unknown> {
    const current = typeof window.history.state === "object" && window.history.state !== null
      ? window.history.state as Record<string, unknown>
      : {};

    return {
      ...current,
      [BROWSER_HISTORY_STATE_KEY]: {
        instanceId: this._browserHistoryInstanceId,
        layer: "history-dialog"
      }
    };
  }

  private _pushHistoryDialogState(): void {
    if (this._syncingBrowserHistory) return;
    if (this._browserHistoryEntry()?.layer === "history-dialog") return;

    window.history.pushState(this._browserHistoryState(), "", window.location.href);
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

      if (this._activeDialog === "history") {
        this._activeDialog = null;
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
      window.history.back();
      return;
    }

    this._activeDialog = null;
  }

  protected willUpdate(): void {
    this.setAttribute("theme", this.config?.theme ?? "flat");
    this.toggleAttribute("light", !this.hass?.themes?.darkMode);
    this.toggleAttribute("border-glow-on-action", !!this.config?.border_glow_on_action);
  }

  protected render() {
    if (!this.viewModel || !this.config) {
      return nothing;
    }

    const compact = this.config?.display_mode === "compact";
    const stateIconsVertical = this.config.state_icons_layout === "vertical";
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
        <div class="card">
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
        </div>
      </ha-card>
      <eq-fan-dialog
        .open=${this._activeDialog === 'fan'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${true}
        .closeOnLeave=${true}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
      ></eq-fan-dialog>
      <eq-swing-dialog
        .open=${this._activeDialog === 'swing'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${true}
        .closeOnLeave=${true}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
      ></eq-swing-dialog>
      <eq-hvac-dialog
        .open=${this._activeDialog === 'hvac'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${true}
        .closeOnLeave=${true}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
      ></eq-hvac-dialog>
      <eq-preset-dialog
        .open=${this._activeDialog === 'preset'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${true}
        .closeOnLeave=${true}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
      ></eq-preset-dialog>
      <eq-menu-dialog
        .open=${this._activeDialog === 'menu'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${true}
        .closeOnLeave=${true}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
        @equinox-open-regulation=${() => { this._activeDialog = null; }}
        @equinox-open-boost=${() => { this._activeDialog = "boost"; }}
        @equinox-open-history=${() => this._openHistoryDialog()}
      ></eq-menu-dialog>
      <eq-boost-dialog
        .open=${this._activeDialog === "boost"}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${true}
        .closeOnLeave=${true}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
        @equinox-open-menu=${() => { this._activeDialog = "menu"; }}
      ></eq-boost-dialog>
      <eq-history-dialog
        .open=${this._activeDialog === "history"}
        .hass=${this.hass}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => this._closeHistoryDialog()}
      ></eq-history-dialog>
      <eq-lock-dialog
        .open=${this._lockDialogOpen}
        .hass=${this.hass}
        .entityId=${this.config.entity}
        .isLocking=${this._lockIsLocking}
        .language=${this._language()}
        @eq-dialog-close=${() => { this._lockDialogOpen = false; }}
      ></eq-lock-dialog>
      <eq-dialog
        .open=${this._activeMessageKey !== undefined}
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
        ${this._renderPowerInfoButton()}
        <span class="status-spacer"></span>
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
      html`<div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>`
    ];
  }

  private _renderLeftRail(): Array<TemplateResult | typeof nothing> {
    return [
      ...(this.config?.display_mode !== "compact" && this._hasFanControl() ? [this._renderFanButton()] : []),
      ...(this.config?.display_mode !== "compact" && this._hasSwingControl() ? [this._renderSwingButton()] : []),
      this._renderPowerInfoButton()
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
        @click=${this._toggleLock}
      >
        <ha-icon .icon=${isLocked ? "mdi:lock" : "mdi:lock-open-outline"}></ha-icon>
      </button>
    `;
  }

  private _renderHvacStateIcon(): TemplateResult | typeof nothing {
    const action = this.viewModel?.climate.hvacAction;
    const entry = action ? HVAC_ACTION_ICONS[action] : undefined;
    const hvacMode = this.viewModel?.climate.hvacMode;

    if (hvacMode === "off" && this.viewModel?.vt?.messages.some((message) => message.key === "hvac_off_manual")) {
      return nothing;
    }

    const iconStr = entry?.icon || (hvacMode ? HVAC_ICONS[hvacMode] : "");
    const tone = entry?.tone ?? this._modeTone(hvacMode);
    const title = action
      ? localize(this._language(), `main.hvac_action.${action}`)
      : this._hvacLabel(hvacMode);

    if (!iconStr) {
      return nothing;
    }

    return html`
      <ha-icon
        class="action-icon"
        tone=${tone}
        .icon=${iconStr}
        title=${title}
      ></ha-icon>
    `;
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
    const tempEntityId = this.viewModel?.climate.temperatureEntityId;

    return html`
      <div class="setpoint" sensor-focus>
        <div class="sensor-primary">
          <span
            class="sensor-temperature"
            ?clickable=${!!tempEntityId}
            @click=${tempEntityId ? () => this._openMoreInfo(tempEntityId) : nothing}
          >
            <ha-icon icon="mdi:thermometer"></ha-icon>
            <span>${this._formatCurrentTempValue()}</span>
            <span class="sensor-unit">°</span>
          </span>
          ${showHumidity
        ? html`
                <span class="sensor-humidity" @click=${() => this._openMoreInfo(this._humidityEntityId())}>
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
    return this._hasTemperatureRangeControl()
      ? this._renderRangeSetpointControl(compact)
      : this._renderSetpointControl(compact);
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

    const tempEntityId = this.viewModel?.climate.temperatureEntityId;

    return html`
      <div class="conditions">
        <span
          class="condition"
          ?clickable=${!!tempEntityId}
          @click=${tempEntityId ? () => this._openMoreInfo(tempEntityId) : nothing}
        >
          <ha-icon icon="mdi:thermometer"></ha-icon>
          <span class="condition-value" kind="temperature">${this._formatCurrentTemp()}</span>
        </span>
        ${showHumidity
        ? html`
            <span class="divider"></span>
            <span class="condition" clickable @click=${() => this._openMoreInfo(this._humidityEntityId())}>
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
                <span class="btn-icon" tone="fan">
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
                <span class="btn-icon" tone="swing">
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
      <span class="power-info" ?open=${this._powerInfoPinned} @mouseleave=${this._closePowerInfo}>
        <button
          class="power-info-button"
          aria-label=${label}
          @pointerdown=${this._startPowerInfoPress}
          @pointerup=${this._clearPowerInfoPressTimer}
          @pointercancel=${this._clearPowerInfoPressTimer}
        >
          <ha-icon .icon=${this._powerInfoButtonIcon()}></ha-icon>
        </button>
        <div class="power-popover">
          ${this._renderPowerValve()}
        </div>
      </span>
    `;
  }

  private _powerInfoButtonIcon(): string {
    return this._powerValveValue()?.icon === "mdi:pipe-valve" ? "mdi:pipe-valve" : "mdi:flash";
  }

  private readonly _startPowerInfoPress = (event: PointerEvent): void => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") {
      return;
    }

    this._clearPowerInfoPressTimer();
    this._powerInfoPressTimer = window.setTimeout(() => {
      this._powerInfoPinned = true;
    }, 450);
  };

  private readonly _clearPowerInfoPressTimer = (): void => {
    if (this._powerInfoPressTimer !== undefined) {
      window.clearTimeout(this._powerInfoPressTimer);
      this._powerInfoPressTimer = undefined;
    }
  };

  private readonly _closePowerInfo = (): void => {
    this._powerInfoPinned = false;
  };

  private _renderFanButton(): TemplateResult {
    return html`
      <button class="fan" title=${localize(this._language(), "main.actions.open_fan")} aria-label=${localize(this._language(), "main.actions.open_fan")} @click=${(event: Event) => this._openDialog("fan", event)}>
        <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
        <span class="fan-label">${this._fanLabel()}</span>
      </button>
    `;
  }

  private _renderSwingButton(): TemplateResult {
    const label = localize(this._language(), "main.actions.open_swing");

    return html`
      <button class="swing" title=${label} aria-label=${label} @click=${(event: Event) => this._openDialog("swing", event)}>
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

  private _renderPowerValve(): TemplateResult | typeof nothing {
    const value = this._powerValveValue();
    const instantPower = this.viewModel?.vt?.powerValve.instantPower ?? this.viewModel?.climate.instantPower;
    const instantPowerUnit = this.viewModel?.vt?.powerValve.instantPowerUnit ?? this.viewModel?.climate.instantPowerUnit;

    if (!value && !finite(instantPower)) {
      return nothing;
    }

    return html`
      <div class="meter">
        ${value
        ? html`<span class="meter-line"><ha-icon .icon=${value.icon}></ha-icon><span>${value.label}</span></span>`
        : nothing}
        ${finite(instantPower)
        ? html`<span class="meter-line"><ha-icon icon="mdi:flash"></ha-icon><span>${this._formatNumber(instantPower)}${instantPowerUnit ? ` ${instantPowerUnit}` : ""}</span></span>`
        : nothing}
      </div>
    `;
  }

  private _renderMenuButton(): TemplateResult {
    return html`
      <button class="menu" title=${localize(this._language(), "main.actions.open_menu")} aria-label=${localize(this._language(), "main.actions.open_menu")} @click=${(event: Event) => this._openDialog("menu", event)}>
        <ha-icon icon="mdi:dots-vertical"></ha-icon>
      </button>
    `;
  }

  private _openDialog(dialog: "fan" | "swing" | "hvac" | "preset" | "menu", event: Event): void {
    const target = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;

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

  private _openBoost(event: Event): void {
    const target = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;

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
    const hvacMode = this.viewModel?.climate.hvacMode;

    if (preset === "frost") {
      return "cool";
    }

    if (preset === "eco") {
      return "auto";
    }

    if (preset === "away" || preset === "sleep") {
      return "off";
    }

    if (preset === "comfort") {
      if (hvacMode === "cool") {
        return "cool";
      }

      return "heat";
    }

    if (preset === "home") {
      return "auto";
    }

    if (preset === "boost" || preset === "activity") {
      if (hvacMode === "cool") {
        return "cool-boost";
      }

      return "boost";
    }

    return "";
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

  private _openMoreInfo(entityId: string): void {
    this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));
  }

  private _humidityEntityId(): string {
    return this.config!.humidity_entity ?? this.config!.entity;
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
