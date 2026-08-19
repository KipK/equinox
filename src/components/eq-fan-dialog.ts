import { LitElement, css, html, nothing } from "lit";
import { setAutoFanMode, setAutoFanPluginEnabled, setFanMode, type EquinoxActionErrorCode } from "../data/actions";
import { DEFAULT_THEME } from "../const";
import { fanTone } from "../data/colors";
import { AUTO_FAN_MODES, FAN_MODE_ICONS } from "../data/fan";
import { isModeHidden, modeIcon, modeLabel, modeTone } from "../data/mode-customizations";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

export class EquinoxFanDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    viewModel: { attribute: false },
    config: { attribute: false },
    language: {},
    floating: { type: Boolean },
    closeOnLeave: { type: Boolean },
    anchor: { attribute: false },
    _error: { state: true }
  };

  static styles = css`
    .fan-grid {
      display: flex;
      overflow: hidden;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      border: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .fan-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      height: 45px;
      border-radius: 0;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      flex: 1;
      min-width: 56px;
    }

    .fan-option:not(:last-child) {
      border-inline-end: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .fan-option:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.12);
    }

    .fan-option[active] {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--primary-color) 22%);
    }

    .fan-option-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Per-fan-mode palette — each value sets --eq-tone-color, picked up by the
       shared paint rule below and by the active-row :has() selector. */
    .fan-option-icon[tone="fan-auto"]    { --eq-tone-color: var(--equinox-fan-auto-color); }
    .fan-option-icon[tone="fan-off"]     { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
    .fan-option-icon[tone="fan-low"]     { --eq-tone-color: var(--equinox-fan-low-color); }
    .fan-option-icon[tone="fan-medium"]  { --eq-tone-color: var(--equinox-fan-medium-color); }
    .fan-option-icon[tone="fan-high"]    { --eq-tone-color: var(--equinox-fan-high-color); }
    .fan-option-icon[tone="fan-focus"]   { --eq-tone-color: var(--equinox-fan-focus-color); }
    .fan-option-icon[tone="fan-diffuse"] { --eq-tone-color: var(--equinox-fan-diffuse-color); }

    .fan-option-icon[tone^="fan-"] {
      color: var(--eq-tone-color);
      background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
    }

    .fan-option[active]:has(.fan-option-icon[tone="fan-auto"])    { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-auto-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-low"])     { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-low-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-medium"])  { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-medium-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-high"])    { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-high-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-focus"])   { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-focus-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-diffuse"]) { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-diffuse-color) 22%); }

    /* List icon (mobile view) — same palette. */
    .option-icon[tone^="fan-"] {
      color: var(--eq-tone-color);
      background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
    }
    .option-icon[tone="fan-auto"]    { --eq-tone-color: var(--equinox-fan-auto-color); }
    .option-icon[tone="fan-off"]     { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
    .option-icon[tone="fan-low"]     { --eq-tone-color: var(--equinox-fan-low-color); }
    .option-icon[tone="fan-medium"]  { --eq-tone-color: var(--equinox-fan-medium-color); }
    .option-icon[tone="fan-high"]    { --eq-tone-color: var(--equinox-fan-high-color); }
    .option-icon[tone="fan-focus"]   { --eq-tone-color: var(--equinox-fan-focus-color); }
    .option-icon[tone="fan-diffuse"] { --eq-tone-color: var(--equinox-fan-diffuse-color); }

    /* Liquid-glow active tone follows the same per-mode color. */
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-auto"])    { --equinox-fan-active-tone: var(--equinox-fan-auto-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-low"])     { --equinox-fan-active-tone: var(--equinox-fan-low-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-medium"])  { --equinox-fan-active-tone: var(--equinox-fan-medium-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-high"])    { --equinox-fan-active-tone: var(--equinox-fan-high-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-focus"])   { --equinox-fan-active-tone: var(--equinox-fan-focus-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-diffuse"]) { --equinox-fan-active-tone: var(--equinox-fan-diffuse-color); }

    .fan-option[active] .fan-option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .fan-option[active] .fan-option-icon[tone^="fan-"] {
      background: color-mix(in srgb, var(--eq-tone-color) 18%, transparent);
      color: var(--eq-tone-color);
    }

    .option-list-item[active] .option-icon[tone^="fan-"] {
      background: color-mix(in srgb, var(--eq-tone-color) 18%, transparent);
      color: var(--eq-tone-color);
    }

    /* Liquid Glow theme: same active treatment as the segments in liquid-glow.ts —
       active option's frame extends to the fan-grid outer border via negative margin
       + height/width grown by 2px, with gradient + glow.
       Color stays --primary-color so the visual identity matches flat mode. */
    :host([theme="liquid_glow"]) .fan-grid {
      overflow: visible;
    }

    :host([theme="liquid_glow"]) .fan-option[active] {
      --equinox-fan-active-tone: var(--primary-color);
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      border: 1px solid color-mix(in srgb, var(--equinox-fan-active-tone) 88%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-fan-active-tone) 24%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 86%, var(--equinox-fan-active-tone) 14%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 18%, transparent),
        inset 0 -16px 24px color-mix(in srgb, var(--equinox-fan-active-tone) 18%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-fan-active-tone) 28%, transparent);
      /* .fan-option base height is 45px and .fan-grid has no explicit height,
         so calc(100% + 2px) collapses to auto. Use explicit base + 2px extension. */
      margin-block: -1px;
      height: calc(45px + 2px);
    }

    :host([theme="liquid_glow"]) .fan-option[active]:first-child {
      margin-inline-start: -1px;
      width: calc(100% + 1px);
      border-start-start-radius: var(--equinox-control-radius, 8px);
      border-end-start-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .fan-option[active]:last-child {
      margin-inline-end: -1px;
      width: calc(100% + 1px);
      border-start-end-radius: var(--equinox-control-radius, 8px);
      border-end-end-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .fan-option[active]:only-child {
      margin: -1px;
      width: calc(100% + 2px);
      border-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .fan-option[active] .fan-option-icon {
      background: transparent;
      color: var(--equinox-fan-active-tone);
    }

    :host([theme="liquid_glow"]) .fan-option[active] .fan-option-icon ha-icon {
      filter: drop-shadow(0 0 4px currentColor);
    }

    :host([theme="liquid_glow"][light]) .fan-option[active] {
      border-color: color-mix(in srgb, var(--equinox-fan-active-tone) 72%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 6%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-fan-active-tone) 16%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 90%, var(--equinox-fan-active-tone) 10%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent),
        inset 0 -12px 20px color-mix(in srgb, var(--equinox-fan-active-tone) 10%, transparent),
        0 0 9px color-mix(in srgb, var(--equinox-fan-active-tone) 16%, transparent);
    }

    :host([theme="liquid_glow"][light]) .fan-option[active] .fan-option-icon ha-icon {
      filter: drop-shadow(0 0 2px currentColor);
    }

    .fan-option-label {
      display: none;
    }

    .fan-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 0;
      background: transparent;
    }

    .option-list-item {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
      width: 100%;
      min-height: 48px;
      padding: 8px 12px;
      border-radius: var(--equinox-control-radius, 8px);
      border: 1px solid transparent;
      background: transparent;
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      font: inherit;
      font-size: 15px;
      text-align: start;
      box-sizing: border-box;
    }

    .option-list-item:hover,
    .option-list-item:focus-visible {
      background: color-mix(in srgb, var(--primary-text-color, #fff) 8%, transparent);
      outline: none;
    }

    .option-list-item[active] {
      color: var(--primary-color);
    }

    .option-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .option-list-item[active] .option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .option-check {
      color: var(--primary-color);
    }

    .fan-desktop {
      display: flex;
      flex-direction: column;
    }

    .fan-mobile {
      display: none;
    }

    .plugin-summary {
      display: grid;
      gap: 12px;
    }

    .plugin-mode {
      color: var(--secondary-text-color);
      font-size: 14px;
    }

    .plugin-action:disabled {
      cursor: default;
      opacity: 0.65;
    }

    .plugin-note,
    .error {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.4;
    }

    .error {
      color: var(--error-color, #db4437);
    }

    @media (max-width: 600px) {
      .fan-desktop {
        display: none;
      }

      .fan-mobile {
        display: block;
      }
    }
  `;

  open = false;
  hass?: HomeAssistant;
  viewModel?: EquinoxViewModel;
  config?: EquinoxCardConfig;
  language?: string;
  floating = false;
  closeOnLeave = false;
  anchor?: { element: HTMLElement };
  private _error?: EquinoxActionErrorCode;

  protected willUpdate(): void {
    // Mirror the active equinox theme onto our host so :host([theme="..."]) rules apply.
    this.setAttribute("theme", this.config?.theme ?? DEFAULT_THEME);
    this.toggleAttribute("light", !this.hass?.themes?.darkMode);
  }

  private _getOptions(): string[] {
    if (this.viewModel?.vt?.fan.kind === "legacy") {
      return AUTO_FAN_MODES.filter((mode) => !isModeHidden(this.config, "fan", mode));
    }

    return (this.viewModel?.climate.fanModes ?? []).filter((mode) => !isModeHidden(this.config, "fan", mode));
  }

  private _getActiveMode(): string | undefined {
    if (this.viewModel?.vt?.fan.kind === "legacy") {
      return this.viewModel.vt.fan.currentAutoFanMode;
    }

    return this.viewModel?.climate.fanMode;
  }

  private _fanIcon(mode: string): string {
    return modeIcon({ config: this.config, family: "fan", mode, defaultIcon: FAN_MODE_ICONS[mode] ?? "mdi:fan" }) ?? "mdi:fan";
  }

  private _fanTone(mode: string): string {
    return modeTone({ config: this.config, family: "fan", mode, defaultTone: fanTone(mode) });
  }

  private _fanLabel(mode: string): string {
    return modeLabel({ config: this.config, language: this.language, family: "fan", mode });
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private async _selectMode(mode: string): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    const ctx = { hass: this.hass, entityId: this.config.entity, config: this.config, viewModel: this.viewModel };

    this._error = undefined;
    const result = this.viewModel?.vt?.fan.kind === "legacy"
      ? await setAutoFanMode(ctx, mode)
      : await setFanMode(ctx, mode);

    if (result.ok) {
      this._dispatchClose();
    } else {
      this._error = result.error;
    }
  }

  private async _togglePlugin(): Promise<void> {
    const fan = this.viewModel?.vt?.fan;

    if (!this.hass || !this.config || fan?.kind !== "plugin" || !fan.pluginSwitchAvailable) {
      return;
    }

    this._error = undefined;
    const result = await setAutoFanPluginEnabled(
      { hass: this.hass, entityId: this.config.entity, config: this.config, viewModel: this.viewModel },
      fan.isEnabled !== true
    );

    if (result.ok) {
      this._dispatchClose();
    } else {
      this._error = result.error;
    }
  }

  private _renderPlugin() {
    const fan = this.viewModel?.vt?.fan;
    const enabled = fan?.isEnabled === true;
    const writable = fan?.pluginSwitchAvailable === true;
    const actionDisabled =
      !writable ||
      this.viewModel?.climate.availability !== "available" ||
      this.viewModel?.vt?.lock.isUserLocked === true;
    const stateLabel = localize(this.language, enabled ? "dialog.fan.plugin_enabled" : "dialog.fan.plugin_disabled");
    const actionLabel = localize(this.language, enabled ? "dialog.fan.disable_plugin" : "dialog.fan.enable_plugin");

    return html`
      <div class="plugin-summary">
        <button
          class="option-list-item plugin-action"
          type="button"
          ?active=${enabled}
          ?disabled=${actionDisabled}
          @click=${this._togglePlugin}
        >
          <span class="option-icon" tone=${enabled ? "fan-auto" : "fan-off"}>
            <ha-icon .icon=${enabled ? "mdi:fan-auto" : "mdi:fan-off"}></ha-icon>
          </span>
          <span>${writable ? actionLabel : stateLabel}</span>
          ${enabled ? html`<ha-icon class="option-check" icon="mdi:check"></ha-icon>` : nothing}
        </button>
        ${fan?.selectedFanMode
          ? html`<div class="plugin-mode">${localize(this.language, "dialog.fan.selected_mode")}: ${fan.selectedFanMode}</div>`
          : nothing}
        ${!writable ? html`<p class="plugin-note">${localize(this.language, "dialog.fan.plugin_read_only")}</p>` : nothing}
        ${this._error ? html`<p class="error">${localize(this.language, "dialog.fan.action_failed")}</p>` : nothing}
      </div>
    `;
  }

  protected render() {
    const options = this._getOptions();
    const activeMode = this._getActiveMode();
    const title = localize(this.language, "dialog.fan.title");
    const plugin = this.viewModel?.vt?.fan.kind === "plugin";

    return html`
      <eq-dialog
        .open=${this.open}
        .title=${title}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        ${plugin ? this._renderPlugin() : html`
        <!-- Desktop: horizontal grid of icon buttons -->
        <div class="fan-desktop">
          <div class="fan-grid">
            ${options.map(
              (mode) => html`
                <button
                  class="fan-option"
                  ?active=${mode === activeMode}
                  @click=${() => this._selectMode(mode)}
                  title=${this._fanLabel(mode)}
                  aria-label=${this._fanLabel(mode)}
                >
                  <span class="fan-option-icon" tone=${this._fanTone(mode)}>
                    <ha-icon .icon=${this._fanIcon(mode)} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span class="fan-option-label">${this._fanLabel(mode)}</span>
                </button>
              `
            )}
          </div>
        </div>

        <!-- Mobile: vertical list -->
        <div class="fan-mobile">
          <div class="fan-list" role="list">
          ${options.map(
            (mode) => html`
              <button
                class="option-list-item"
                type="button"
                ?active=${mode === activeMode}
                @click=${() => this._selectMode(mode)}
              >
                <span class="option-icon" tone=${this._fanTone(mode)}>
                  <ha-icon .icon=${this._fanIcon(mode)} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span>${this._fanLabel(mode)}</span>
                ${mode === activeMode
                  ? html`<ha-icon class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>`
                  : nothing}
              </button>
            `
          )}
          </div>
        </div>
        ${this._error ? html`<p class="error">${localize(this.language, "dialog.fan.action_failed")}</p>` : nothing}
        `}
      </eq-dialog>
    `;
  }
}

if (!customElements.get("eq-fan-dialog")) {
  customElements.define("eq-fan-dialog", EquinoxFanDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-fan-dialog": EquinoxFanDialog;
  }
}
