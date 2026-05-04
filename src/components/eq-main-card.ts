import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { lock as lockThermostat, setHvacMode, setPresetMode, setTemperature, unlock as unlockThermostat } from "../data/actions";
import { FAN_MODE_ICONS } from "../data/fan";
import { localize } from "../localize/localize";
import { baseStyles } from "../styles/base";
import { flatStyles } from "../styles/flat";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxVtMessage } from "../types/vt";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-icon-button";
import "./eq-fan-dialog";
import "./eq-hvac-dialog";
import "./eq-preset-dialog";
import "./eq-menu-dialog";
import "./eq-boost-dialog";
import "./eq-history-dialog";
import "./eq-dialog";

const HVAC_ORDER = ["heat", "cool", "dry", "fan_only", "off"];
const PRESET_ORDER = ["frost", "eco", "away", "comfort", "home", "sleep", "activity", "boost"];

const HVAC_ICONS: Record<string, string> = {
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power"
};

const PRESET_ICONS: Record<string, string> = {
  frost: "mdi:snowflake",
  eco: "mdi:tree-outline",
  away: "mdi:home-export-outline",
  comfort: "mdi:sofa-outline",
  home: "mdi:home-outline",
  sleep: "mdi:sleep",
  activity: "mdi:motion-sensor",
  boost: "mdi:rocket-launch-outline"
};

type EventIconDefinition = {
  key: keyof NonNullable<EquinoxViewModel["vt"]>["events"];
  icon: string;
  tone: string;
  messageKeys?: string[];
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
  heating: { icon: "mdi:fire", tone: "heat" },
  cooling: { icon: "mdi:snowflake", tone: "cool" },
  drying: { icon: "mdi:water-percent", tone: "cool" },
  fan: { icon: "mdi:fan", tone: "auto" },
  idle: { tone: "muted" },
  defrosting: { icon: "mdi:snowflake", tone: "cool" }
};

function finite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
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
    _activeMessageKey: { state: true }
  };

  static styles = [
    baseStyles,
    flatStyles,
    css`
      :host {
        display: block;
        position: relative;
      }

      ha-card {
        overflow: visible;
        border-radius: var(--equinox-radius);
        background: var(--equinox-card-bg);
        border: 1px solid var(--equinox-border-color);
        box-shadow: var(--equinox-shadow);
        color: var(--equinox-text-color);
      }

      .card {
        display: flex;
        flex-direction: column;
        gap: 11px;
        padding: 15px 16px 16px;
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

      .action-icon[tone="off"] {
        color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      .setpoint {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 18px;
        margin-top: 2px;
      }

      .setpoint[sensor-focus] {
        flex-direction: column;
        gap: 8px;
        margin-top: 0;
      }

      .step {
        width: 40px;
        height: 40px;
        border: 1px solid var(--equinox-border-color);
        border-radius: 50%;
        background: var(--equinox-control-bg);
        box-shadow: 0 1px 3px rgb(0 0 0 / 18%);
        color: var(--equinox-text-color);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .step:hover:not(:disabled) {
        background: color-mix(in srgb, var(--equinox-control-bg) 82%, var(--equinox-text-color) 18%);
      }

      .step:disabled {
        cursor: default;
        opacity: 0.45;
      }

      .setpoint-control {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .setpoint-control[compact] {
        gap: 6px;
      }

      .setpoint-control[compact] .step {
        width: 30px;
        height: 30px;
      }

      .setpoint-control[compact] .step ha-icon {
        --mdc-icon-size: 18px;
      }

      .target {
        min-width: 0;
        display: flex;
        align-items: baseline;
        justify-content: center;
        font-size: 38px;
        line-height: 1;
        font-weight: 700;
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

      .target[mode="off"],
      .target[mode="unavailable"] {
        color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      .target[compact] {
        font-size: 20px;
        font-weight: 650;
      }

      .sensor-primary {
        display: inline-flex;
        align-items: baseline;
        justify-content: center;
        gap: 12px;
        min-height: 48px;
      }

      .sensor-temperature {
        display: inline-flex;
        align-items: baseline;
        gap: 6px;
        font-size: 40px;
        line-height: 1;
        font-weight: 450;
        color: var(--equinox-text-color);
        cursor: pointer;
      }

      .sensor-temperature:hover {
        opacity: 0.75;
      }

      .sensor-temperature ha-icon {
        --mdc-icon-size: 28px;
        color: var(--equinox-muted-color);
      }

      .sensor-temperature .sensor-unit {
        font-size: 0.82em;
      }

      .sensor-humidity {
        display: inline-flex;
        align-items: baseline;
        gap: 5px;
        color: var(--equinox-muted-color);
        font-size: 20px;
        line-height: 1;
        font-weight: 600;
        cursor: pointer;
      }

      .sensor-humidity:hover {
        opacity: 0.75;
      }

      .sensor-humidity ha-icon {
        --mdc-icon-size: 18px;
        color: var(--equinox-muted-color);
      }

      .conditions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        color: var(--equinox-muted-color);
        font-size: 20px;
        font-weight: 600;
      }

      .condition {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-width: 66px;
        justify-content: center;
        cursor: pointer;
      }

      .condition:hover {
        opacity: 0.75;
      }

      .condition ha-icon {
        color: var(--equinox-muted-color);
        --mdc-icon-size: 20px;
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
        grid-auto-columns: minmax(42px, 1fr);
        border: 1px solid var(--equinox-border-color);
        border-radius: var(--equinox-control-radius);
        overflow: hidden;
        background: var(--equinox-panel-bg);
        min-height: 45px;
      }

      .segments eq-icon-button {
        display: flex;
        min-width: 0;
      }

      .segments eq-icon-button::part(button) {
        border-radius: 0;
      }

      .compact-selectors {
        display: flex;
        gap: 8px;
        min-height: 45px;
      }

      .compact-selectors eq-icon-button {
        flex: 1;
        min-width: 0;
      }

      .compact-selectors eq-icon-button.fan-selector::part(button) {
        color: var(--equinox-text-color);
      }

      .bottom {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        min-height: 47px;
      }

      .fan {
        width: 36px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background: transparent;
        color: var(--equinox-text-color);
        padding: 0;
        cursor: pointer;
      }

      .status .fan {
        width: 26px;
        height: 26px;
      }

      .fan-label {
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
      .fan {
        border-radius: var(--equinox-control-radius);
      }

      .menu:hover,
      .fan:hover {
        background: color-mix(in srgb, var(--equinox-control-bg) 80%, var(--equinox-text-color) 14%);
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

      @media (max-width: 360px) {
        .card {
          padding: 14px;
          gap: 10px;
        }

        .step {
          width: 34px;
          height: 34px;
        }

        .target {
          font-size: 34px;
        }

        .target[compact] {
          font-size: 19px;
        }

        .sensor-temperature {
          font-size: 36px;
        }

        .bottom {
          grid-template-columns: 38px minmax(0, 1fr) 28px;
          gap: 6px;
        }
      }
    `
  ];

  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  viewModel?: EquinoxViewModel;

  private _activeDialog: "fan" | "hvac" | "preset" | "menu" | "boost" | "history" | null = null;
  private _dialogAnchor?: { element: HTMLElement };
  private _activeMessageKey?: string;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("pointermove", this._handlePointerMove);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("pointermove", this._handlePointerMove);
  }

  private readonly _handlePointerMove = (e: PointerEvent): void => {
    if (this._activeDialog !== "menu" || e.pointerType === "touch") {
      return;
    }
    const hostRect = this.getBoundingClientRect();
    if (
      e.clientX >= hostRect.left &&
      e.clientX <= hostRect.right &&
      e.clientY >= hostRect.top &&
      e.clientY <= hostRect.bottom
    ) {
      return;
    }
    const panel = this.shadowRoot
      ?.querySelector("eq-menu-dialog")
      ?.shadowRoot?.querySelector("eq-dialog")
      ?.shadowRoot?.querySelector(".panel");
    if (panel) {
      const panelRect = panel.getBoundingClientRect();
      if (
        e.clientX >= panelRect.left &&
        e.clientX <= panelRect.right &&
        e.clientY >= panelRect.top &&
        e.clientY <= panelRect.bottom
      ) {
        return;
      }
    }
    this._activeDialog = null;
  };

  protected render() {
    if (!this.viewModel || !this.config) {
      return nothing;
    }

    const compact = this.config?.display_mode === "compact";

    return html`
      <ha-card>
        <div class="card">
          ${this._renderName()} ${this._renderStatus()} ${this._renderSetpoint()} ${this._renderConditions()}
          ${compact ? this._renderCompactSelectors() : html`${this._renderHvacModes()} ${this._renderPresets()}`}
          ${this._renderBottomRow()}
        </div>
      </ha-card>
      <eq-fan-dialog
        .open=${this._activeDialog === 'fan'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${true}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
      ></eq-fan-dialog>
      <eq-hvac-dialog
        .open=${this._activeDialog === 'hvac'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${true}
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
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
        @equinox-open-regulation=${() => { this._activeDialog = null; }}
        @equinox-open-boost=${() => { this._activeDialog = "boost"; }}
        @equinox-open-history=${() => { this._activeDialog = "history"; }}
      ></eq-menu-dialog>
      <eq-boost-dialog
        .open=${this._activeDialog === "boost"}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
        @equinox-open-menu=${() => { this._activeDialog = "menu"; }}
      ></eq-boost-dialog>
      <eq-history-dialog
        .open=${this._activeDialog === "history"}
        .hass=${this.hass}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
      ></eq-history-dialog>
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
    const lockSupported = this.config?.enable_lock === true && this.viewModel?.vt?.lock.isConfigured === true;
    const lockLabel = this.viewModel?.vt?.lock.isLocked
      ? localize(this._language(), "main.lock.locked")
      : localize(this._language(), "main.lock.unlocked");
    const lockActionLabel = this.viewModel?.vt?.lock.hasCode
      ? localize(this._language(), "main.lock.code_required")
      : lockLabel;
    const showFan = this.config?.display_mode !== "compact" && this._hasFanControl();

    return html`
      <div class="status">
        ${showFan ? this._renderFanButton() : nothing}
        <span class="status-spacer"></span>
        <div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>
        ${lockSupported
        ? html`
              <button
                class="lock"
                title=${lockActionLabel}
                aria-label=${lockActionLabel}
                ?disabled=${this.viewModel?.vt?.lock.hasCode === true}
                @click=${this._toggleLock}
              >
                <ha-icon .icon=${this.viewModel?.vt?.lock.isLocked ? "mdi:lock" : "mdi:lock-open-outline"}></ha-icon>
              </button>
            `
        : nothing}
        ${this.config?.disable_name ? this._renderMenuButton() : nothing}
      </div>
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

    const messageIcons = messages.map((message) => this._renderMessageIcon(message));
    const eventIcons = EVENT_ICONS.filter((event) => {
      const relatedMessageKeys = event.messageKeys ?? [];

      return events[event.key] && !relatedMessageKeys.some((key) => messages.some((message) => message.key === key));
    }).map((event) => this._renderEventIcon(event));

    return [...messageIcons, ...eventIcons];
  }

  private _renderEventIcon(event: EventIconDefinition): TemplateResult {
    const label = localize(this._language(), `main.events.${event.key}`);

    return html`
      <ha-icon
        class="event"
        tone=${event.tone}
        .icon=${event.icon}
        title=${label}
      ></ha-icon>
    `;
  }

  private _renderMessageIcon(message: EquinoxVtMessage): TemplateResult {
    const entry = this._messageIcon(message.key);
    const label = this._messageLabel(message.key);

    return html`
      <button
        class="event"
        tone=${entry.tone}
        title=${label}
        aria-label=${label}
        @click=${(event: Event) => this._openMessage(message.key, event)}
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

    return html`<div class="setpoint">${this._renderSetpointControl(false)}</div>`;
  }

  private _renderSensorFocus(): TemplateResult {
    const currentHumidity = this.viewModel?.climate.currentHumidity;
    const showHumidity = finite(currentHumidity);

    return html`
      <div class="setpoint" sensor-focus>
        <div class="sensor-primary">
          <span class="sensor-temperature" @click=${() => this._openMoreInfo(this.config!.entity)}>
            <ha-icon icon="mdi:thermometer"></ha-icon>
            <span>${this._formatTemperatureValue(this.viewModel?.climate.currentTemperature)}</span>
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
        ${this._renderSetpointControl(true)}
      </div>
    `;
  }

  private _renderSetpointControl(compact: boolean): TemplateResult {
    const disabled = this._isControlDisabled() || !finite(this.viewModel?.climate.targetTemperature);
    const rawValue = this._setpointFallback();
    const inputWidth = rawValue.length || 4;

    return html`
      <div class="setpoint-control" ?compact=${compact}>
        <button
          class="step"
          title=${localize(this._language(), "main.actions.decrease_temperature")}
          aria-label=${localize(this._language(), "main.actions.decrease_temperature")}
          ?disabled=${disabled}
          @click=${() => this._changeTemperature(-1)}
        >
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
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
        <button
          class="step"
          title=${localize(this._language(), "main.actions.increase_temperature")}
          aria-label=${localize(this._language(), "main.actions.increase_temperature")}
          ?disabled=${disabled}
          @click=${() => this._changeTemperature(1)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
    `;
  }

  private _renderConditions(): TemplateResult | typeof nothing {
    if (this.config?.primary_display === "sensors") {
      return nothing;
    }

    const currentHumidity = this.viewModel?.climate.currentHumidity;
    const showHumidity = finite(currentHumidity);

    return html`
      <div class="conditions">
        <span class="condition" @click=${() => this._openMoreInfo(this.config!.entity)}>
          <ha-icon icon="mdi:thermometer"></ha-icon>
          <span class="condition-value" kind="temperature">${this._formatTemperature(this.viewModel?.climate.currentTemperature)}</span>
        </span>
        ${showHumidity
        ? html`
            <span class="divider"></span>
            <span class="condition" @click=${() => this._openMoreInfo(this._humidityEntityId())}>
              <ha-icon icon="mdi:water-percent"></ha-icon>
              <span class="condition-value" kind="humidity">${this._formatPercent(currentHumidity)}</span>
            </span>
          `
        : nothing}
      </div>
    `;
  }

  private _renderHvacModes(): TemplateResult | typeof nothing {
    const modes = uniqueOrdered(this.viewModel?.climate.hvacModes ?? [], HVAC_ORDER).filter((mode) => HVAC_ICONS[mode]);

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
      <eq-icon-button
        .icon=${HVAC_ICONS[mode]}
        .label=${this._hvacLabel(mode)}
        .tone=${this._modeTone(mode)}
        ?active=${this.viewModel?.climate.hvacMode === mode}
        ?subtle=${true}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setHvacMode(mode)}
      ></eq-icon-button>
    `;
  }

  private _renderPresets(): TemplateResult | typeof nothing {
    const presets = uniqueOrdered(this.viewModel?.climate.presetModes ?? [], PRESET_ORDER).filter(
      (preset) => preset !== "none" && PRESET_ICONS[preset] && !this._hidePreset(preset)
    );

    if (presets.length === 0) {
      return nothing;
    }

    return html`<div class="segments">${presets.map((preset) => this._renderPresetButton(preset))}</div>`;
  }

  private _renderPresetButton(preset: string): TemplateResult {
    return html`
      <eq-icon-button
        .icon=${PRESET_ICONS[preset]}
        .label=${this._presetLabel(preset)}
        .tone=${this._presetTone(preset)}
        ?active=${this.viewModel?.climate.presetMode === preset}
        ?subtle=${true}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setPresetMode(preset)}
      ></eq-icon-button>
    `;
  }

  // Renders the compact single-row selector bar (HVAC + optional preset + optional fan).
  private _renderCompactSelectors(): TemplateResult | typeof nothing {
    const hvacMode = this.viewModel?.climate.hvacMode;
    const preset = this.viewModel?.climate.presetMode;
    const availableHvacModes = uniqueOrdered(this.viewModel?.climate.hvacModes ?? [], HVAC_ORDER).filter((mode) => HVAC_ICONS[mode]);
    const currentHvacMode = hvacMode && availableHvacModes.includes(hvacMode) ? hvacMode : undefined;
    const showHvac = availableHvacModes.length > 0;

    // Show preset button if the entity exposes any valid preset mode.
    const availablePresets = (this.viewModel?.climate.presetModes ?? []).filter(
      (m) => m !== "none" && PRESET_ICONS[m]
    );
    const showPreset = availablePresets.length > 0;
    const presetIcon = preset && preset !== "none" && PRESET_ICONS[preset] ? PRESET_ICONS[preset] : "mdi:knob";
    const presetActive = !!preset && preset !== "none" && !!PRESET_ICONS[preset];

    // Show fan button if the climate has fan modes OR VT exposes auto-fan.
    const showFan =
      (this.viewModel?.climate.fanModes?.length ?? 0) > 0 ||
      this.viewModel?.vt?.fan.hasAutoFan === true;

    const btnCount = (showHvac ? 1 : 0) + (showPreset ? 1 : 0) + (showFan ? 1 : 0);

    if (btnCount === 0) {
      return nothing;
    }

    const compactStyle = btnCount < 3
      ? `width: calc(100% / 3 * ${btnCount}); margin-inline: auto;`
      : "";

    return html`
      <div class="compact-selectors" style=${compactStyle}>
        ${showHvac
        ? html`
              <eq-icon-button
                .icon=${currentHvacMode ? HVAC_ICONS[currentHvacMode] : "mdi:thermostat"}
                .label=${currentHvacMode ? this._hvacLabel(currentHvacMode) : localize(this._language(), "dialog.hvac.title")}
                .tone=${this._modeTone(currentHvacMode)}
                ?active=${currentHvacMode !== "off" && !!currentHvacMode}
                ?subtle=${true}
                ?disabled=${this._isControlDisabled()}
                @click=${(event: Event) => this._openDialog("hvac", event)}
              ></eq-icon-button>
            `
        : nothing}
        ${showPreset
        ? html`
              <eq-icon-button
                .icon=${presetIcon}
                .label=${preset && preset !== "none" ? this._presetLabel(preset) : localize(this._language(), "main.preset.none")}
                .tone=${presetActive ? this._presetTone(preset!) : ""}
                ?disabled=${this._isControlDisabled()}
                @click=${(event: Event) => this._openDialog("preset", event)}
              ></eq-icon-button>
            `
        : nothing}
        ${showFan
        ? html`
              <eq-icon-button
                class="fan-selector"
                .icon=${this._fanIcon()}
                .label=${this._fanLabel()}
                ?disabled=${this._isControlDisabled()}
                @click=${(event: Event) => this._openDialog("fan", event)}
              ></eq-icon-button>
            `
        : nothing}
      </div>
    `;
  }

  private _renderBottomRow(): TemplateResult | typeof nothing {
    const powerValve = this._renderPowerValve();

    if (powerValve === nothing) {
      return nothing;
    }

    return html`
      <div class="bottom">
        ${powerValve}
      </div>
    `;
  }

  private _renderFanButton(): TemplateResult {
    return html`
      <button class="fan" title=${localize(this._language(), "main.actions.open_fan")} aria-label=${localize(this._language(), "main.actions.open_fan")} @click=${(event: Event) => this._openDialog("fan", event)}>
        <ha-icon .icon=${this._fanIcon()}></ha-icon>
        <span class="fan-label">${this._fanLabel()}</span>
      </button>
    `;
  }

  private _hasFanControl(): boolean {
    return (this.viewModel?.climate.fanModes?.length ?? 0) > 0 || this.viewModel?.vt?.fan.hasAutoFan === true;
  }

  private _renderPowerValve(): TemplateResult | typeof nothing {
    const value = this._powerValveValue();
    const instantPower = this.viewModel?.vt?.powerValve.instantPower;
    const instantPowerUnit = this.viewModel?.vt?.powerValve.instantPowerUnit;

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

  private _openDialog(dialog: "fan" | "hvac" | "preset" | "menu", event: Event): void {
    const target = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;

    if (target) {
      this._dialogAnchor = {
        element: target
      };
    } else {
      this._dialogAnchor = undefined;
    }

    this._activeDialog = dialog;
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

  private _modeTone(mode?: string): string {
    if (mode === "heat") {
      return "heat";
    }

    if (mode === "cool") {
      return "cool";
    }

    if (mode === "heat_cool" || mode === "auto") {
      return "auto";
    }

    if (mode === "off") {
      return "off";
    }

    return "";
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

  private _fanIcon(): string {
    const mode = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode;

    return mode ? (FAN_MODE_ICONS[mode] ?? "mdi:fan") : "mdi:fan";
  }

  private _fanLabel(): string {
    const mode =
      this.viewModel?.climate.fanMode ??
      this.viewModel?.vt?.fan.currentAutoFanMode ??
      (this.viewModel?.climate.fanModes.includes("auto") ? "auto" : undefined);

    return mode ? this._optionLabel("main.fan", mode) : localize(this._language(), "main.fan.unavailable");
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

  private _formatTemperature(value?: number): string {
    return finite(value) ? `${this._formatNumber(value)}°` : "--.-°";
  }

  private _formatTemperatureValue(value?: number): string {
    return finite(value) ? this._formatNumber(value) : "--.-";
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

  private _setpointFallback(): string {
    const dec = this._stepDecimals();
    if (!finite(this.viewModel?.climate.targetTemperature)) return "";
    return new Intl.NumberFormat(this._language(), {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    }).format(this.viewModel!.climate.targetTemperature);
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
    if (!this.hass || !this.config || !this.viewModel?.vt?.lock.isConfigured || this.viewModel.vt.lock.hasCode) {
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
