import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { setHvacMode, setPresetMode, setTemperature } from "../data/actions";
import { localize } from "../localize/localize";
import { baseStyles } from "../styles/base";
import { flatStyles } from "../styles/flat";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-icon-button";
import "./eq-fan-dialog";
import "./eq-hvac-dialog";
import "./eq-preset-dialog";
import "./eq-menu-dialog";

const HVAC_ORDER = ["heat", "cool", "heat_cool", "auto", "dry", "fan_only", "off"];
const PRESET_ORDER = ["frost", "eco", "comfort", "boost"];

const HVAC_ICONS: Record<string, string> = {
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:autorenew",
  auto: "mdi:power",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power"
};

const PRESET_ICONS: Record<string, string> = {
  frost: "mdi:snowflake",
  eco: "mdi:leaf",
  comfort: "mdi:briefcase",
  boost: "mdi:rocket-launch-outline"
};

const EVENT_ICONS: Array<{ key: keyof NonNullable<EquinoxViewModel["vt"]>["events"]; icon: string; tone: string }> = [
  { key: "hasDanger", icon: "mdi:alert-octagon-outline", tone: "danger" },
  { key: "hasAlert", icon: "mdi:alert-outline", tone: "warning" },
  { key: "hasOverpowering", icon: "mdi:flash-alert", tone: "warning" },
  { key: "hasOpenWindow", icon: "mdi:window-open-variant", tone: "info" },
  { key: "hasPresence", icon: "mdi:home-account", tone: "info" },
  { key: "hasTimer", icon: "mdi:timer-outline", tone: "boost" }
];

const HVAC_ACTION_ICONS: Record<string, { icon: string; tone: string }> = {
  off: { icon: "mdi:power", tone: "off" },
  preheating: { icon: "mdi:timer-sand", tone: "heat" },
  heating: { icon: "mdi:fire", tone: "heat" },
  cooling: { icon: "mdi:snowflake", tone: "cool" },
  drying: { icon: "mdi:water-percent", tone: "cool" },
  fan: { icon: "mdi:fan", tone: "auto" },
  idle: { icon: "mdi:pause-circle-outline", tone: "off" },
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
    _activeDialog: { state: true }
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
        min-height: 20px;
        font-size: var(--ha-card-header-font-size, 16px);
        font-weight: var(--ha-card-header-font-weight, 500);
        line-height: var(--ha-card-header-line-height, 20px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .status {
        min-height: 27px;
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr) auto 28px;
        align-items: center;
        justify-items: center;
        gap: 6px;
      }

      .events {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        justify-self: end;
        gap: 8px;
        min-width: 28px;
      }

      .event {
        color: var(--equinox-info-color);
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
      }

      .lock[hidden] {
        visibility: hidden;
        display: inline-flex;
      }

      .action-icon {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--equinox-muted-color);
      }

      .action-icon[hidden] {
        visibility: hidden;
        display: inline-flex;
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

      .target {
        min-width: 0;
        text-align: center;
        font-size: 38px;
        line-height: 1;
        font-weight: 700;
        color: var(--equinox-auto-color);
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

      .conditions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        color: var(--equinox-text-color);
        font-size: 14px;
      }

      .condition {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-width: 66px;
        justify-content: center;
      }

      .condition ha-icon {
        color: var(--equinox-muted-color);
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

      .bottom {
        display: grid;
        grid-template-columns: 42px minmax(0, 1fr) 28px;
        align-items: center;
        gap: 8px;
        min-height: 47px;
      }

      /* Compact mode: no fan column */
      .bottom.compact {
        grid-template-columns: minmax(0, 1fr) 28px;
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

      .meter.empty {
        display: block;
      }

      .meter-placeholder {
        display: block;
        width: 1px;
        height: 1px;
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

  private _activeDialog: 'fan' | 'hvac' | 'preset' | 'menu' | null = null;

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
          ${this._renderBottomRow(compact)}
        </div>
      </ha-card>
      <eq-fan-dialog
        .open=${this._activeDialog === 'fan'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
      ></eq-fan-dialog>
      <eq-hvac-dialog
        .open=${this._activeDialog === 'hvac'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
      ></eq-hvac-dialog>
      <eq-preset-dialog
        .open=${this._activeDialog === 'preset'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
      ></eq-preset-dialog>
      <eq-menu-dialog
        .open=${this._activeDialog === 'menu'}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => { this._activeDialog = null; }}
        @equinox-open-regulation=${() => { this._activeDialog = null; }}
        @equinox-open-boost=${() => { this._activeDialog = null; }}
        @equinox-open-history=${() => { this._activeDialog = null; }}
      ></eq-menu-dialog>
    `;
  }

  private _language(): string | undefined {
    return this.hass?.locale?.language ?? this.hass?.language;
  }

  private _renderName(): TemplateResult | typeof nothing {
    if (this.config?.disable_name) {
      return nothing;
    }

    return html`<div class="name">${this.viewModel?.climate.name}</div>`;
  }

  private _renderStatus(): TemplateResult {
    const lockSupported = this.config?.enable_lock === true && this.viewModel?.vt?.lock.isConfigured === true;
    const lockLabel = this.viewModel?.vt?.lock.isLocked
      ? localize(this._language(), "main.lock.locked")
      : localize(this._language(), "main.lock.unlocked");

    return html`
      <div class="status">
        ${this._renderHvacActionIcon()}
        <span></span>
        <div class="events">${this._renderEvents()}</div>
        <button class="lock" title=${lockLabel} aria-label=${lockLabel} ?hidden=${!lockSupported}>
          <ha-icon .icon=${this.viewModel?.vt?.lock.isLocked ? "mdi:lock" : "mdi:lock-open-outline"}></ha-icon>
        </button>
      </div>
    `;
  }

  private _renderHvacActionIcon(): TemplateResult {
    const action = this.viewModel?.climate.hvacAction;
    const mode = this.viewModel?.climate.hvacMode;
    const activeActions = new Set(["preheating", "heating", "cooling", "drying", "fan", "defrosting"]);

    let iconStr = "";
    let tone = "";

    if (action && activeActions.has(action)) {
      const entry = HVAC_ACTION_ICONS[action];
      iconStr = entry.icon;
      tone = entry.tone;
    } else {
      iconStr = mode && mode !== "off" ? (HVAC_ICONS[mode] ?? "") : "";
    }

    const visible = iconStr !== "";

    return html`
      <ha-icon
        class="action-icon"
        ?hidden=${!visible}
        tone=${tone}
        .icon=${iconStr}
        title=${visible && action ? localize(this._language(), `main.hvac_action.${action}`) : ""}
      ></ha-icon>
    `;
  }

  private _renderEvents(): TemplateResult[] {
    const events = this.viewModel?.vt?.events;

    if (!events) {
      return [];
    }

    return EVENT_ICONS.filter((event) => events[event.key]).map(
      (event) => html`
        <ha-icon
          class="event"
          tone=${event.tone}
          .icon=${event.icon}
          title=${localize(this._language(), `main.events.${event.key}`)}
        ></ha-icon>
      `
    );
  }

  private _renderSetpoint(): TemplateResult {
    const disabled = this._isControlDisabled() || !finite(this.viewModel?.climate.targetTemperature);

    return html`
      <div class="setpoint">
        <button
          class="step"
          title=${localize(this._language(), "main.actions.decrease_temperature")}
          aria-label=${localize(this._language(), "main.actions.decrease_temperature")}
          ?disabled=${disabled}
          @click=${() => this._changeTemperature(-1)}
        >
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="target" mode=${this._targetTone()}>${this._formatTargetTemperature()}</div>
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

  private _renderConditions(): TemplateResult {
    return html`
      <div class="conditions">
        <span class="condition">
          <ha-icon icon="mdi:thermometer"></ha-icon>
          <span>${this._formatTemperature(this.viewModel?.climate.currentTemperature)}</span>
        </span>
        <span class="divider"></span>
        <span class="condition">
          <ha-icon icon="mdi:water-percent"></ha-icon>
          <span>${this._formatPercent(this.viewModel?.climate.currentHumidity)}</span>
        </span>
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
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setHvacMode(mode)}
      ></eq-icon-button>
    `;
  }

  private _renderPresets(): TemplateResult | typeof nothing {
    const presets = uniqueOrdered(this.viewModel?.climate.presetModes ?? [], PRESET_ORDER).filter(
      (preset) => preset !== "none" && PRESET_ICONS[preset] && !(preset === "frost" && this.viewModel?.climate.hvacMode === "cool")
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

    const btnCount = 1 + (showPreset ? 1 : 0) + (showFan ? 1 : 0);
    const compactStyle = btnCount < 3
      ? `width: calc(100% / 3 * ${btnCount}); margin-inline: auto;`
      : "";

    return html`
      <div class="compact-selectors" style=${compactStyle}>
        <eq-icon-button
          .icon=${hvacMode ? (HVAC_ICONS[hvacMode] ?? "") : ""}
          .label=${this._hvacLabel(hvacMode)}
          .tone=${this._modeTone(hvacMode)}
          ?active=${hvacMode !== "off" && !!hvacMode}
          ?disabled=${this._isControlDisabled()}
          @click=${() => { this._activeDialog = 'hvac'; }}
        ></eq-icon-button>
        ${showPreset
          ? html`
              <eq-icon-button
                .icon=${presetIcon}
                .label=${preset && preset !== "none" ? this._presetLabel(preset) : localize(this._language(), "main.preset.none")}
                .tone=${presetActive ? this._presetTone(preset!) : ""}
                ?disabled=${this._isControlDisabled()}
                @click=${() => { this._activeDialog = 'preset'; }}
              ></eq-icon-button>
            `
          : nothing}
        ${showFan
          ? html`
              <eq-icon-button
                .icon=${this._fanIcon()}
                .label=${this._fanLabel()}
                ?disabled=${this._isControlDisabled()}
                @click=${() => { this._activeDialog = 'fan'; }}
              ></eq-icon-button>
            `
          : nothing}
      </div>
    `;
  }

  private _renderBottomRow(compact = false): TemplateResult {
    const showFan =
      (this.viewModel?.climate.fanModes?.length ?? 0) > 0 ||
      this.viewModel?.vt?.fan.hasAutoFan === true;

    if (compact || !showFan) {
      return html`
        <div class="bottom compact">
          ${this._renderPowerValve()}
          <button class="menu" title=${localize(this._language(), "main.actions.open_menu")} aria-label=${localize(this._language(), "main.actions.open_menu")} @click=${() => { this._activeDialog = 'menu'; }}>
            <ha-icon icon="mdi:dots-vertical"></ha-icon>
          </button>
        </div>
      `;
    }

    return html`
      <div class="bottom">
        <button class="fan" title=${localize(this._language(), "main.actions.open_fan")} aria-label=${localize(this._language(), "main.actions.open_fan")} @click=${() => { this._activeDialog = 'fan'; }}>
          <ha-icon .icon=${this._fanIcon()}></ha-icon>
          <span class="fan-label">${this._fanLabel()}</span>
        </button>
        ${this._renderPowerValve()}
        <button class="menu" title=${localize(this._language(), "main.actions.open_menu")} aria-label=${localize(this._language(), "main.actions.open_menu")} @click=${() => { this._activeDialog = 'menu'; }}>
          <ha-icon icon="mdi:dots-vertical"></ha-icon>
        </button>
      </div>
    `;
  }

  private _renderPowerValve(): TemplateResult | typeof nothing {
    const value = this._powerValveValue();
    const instantPower = this.viewModel?.vt?.powerValve.instantPower;
    const instantPowerUnit = this.viewModel?.vt?.powerValve.instantPowerUnit;

    return html`
      <div class=${value || finite(instantPower) ? "meter" : "meter empty"}>
        ${value
        ? html`<span class="meter-line"><ha-icon .icon=${value.icon}></ha-icon><span>${value.label}</span></span>`
        : nothing}
        ${finite(instantPower)
        ? html`<span class="meter-line"><ha-icon icon="mdi:flash"></ha-icon><span>${this._formatNumber(instantPower)}${instantPowerUnit ? ` ${instantPowerUnit}` : ""}</span></span>`
        : nothing}
        ${!value && !finite(instantPower) ? html`<span class="meter-placeholder"></span>` : nothing}
      </div>
    `;
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
    if (preset === "frost") {
      return "cool";
    }

    if (preset === "eco") {
      return "auto";
    }

    if (preset === "comfort") {
      return "heat";
    }

    if (preset === "boost") {
      return "boost";
    }

    return "";
  }

  private _fanIcon(): string {
    const mode = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode;

    if (mode === "off" || mode === "auto_fan_none" || mode === "None") {
      return "mdi:fan-off";
    }

    if (mode === "auto" || mode?.startsWith("auto_fan_")) {
      return "mdi:fan-auto";
    }

    return "mdi:fan";
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

  private _formatTargetTemperature(): string {
    const target = this.viewModel?.climate.targetTemperature;

    return finite(target) && this.viewModel?.climate.availability === "available" ? `${this._formatNumber(target)}°` : "--.-°";
  }

  private _formatTemperature(value?: number): string {
    return finite(value) ? `${this._formatNumber(value)}°` : "--.-°";
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
}

if (!customElements.get("eq-main-card")) {
  customElements.define("eq-main-card", EquinoxMainCard);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-main-card": EquinoxMainCard;
  }
}
