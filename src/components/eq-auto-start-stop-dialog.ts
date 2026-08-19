import { LitElement, css, html, nothing } from "lit";
import { setAutoStartStopMode, type EquinoxActionErrorCode } from "../data/actions";
import { DEFAULT_THEME } from "../const";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

const DISABLED_MODE = "disabled";

export class EquinoxAutoStartStopDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    viewModel: { attribute: false },
    config: { attribute: false },
    language: {},
    floating: { type: Boolean },
    closeOnLeave: { type: Boolean },
    anchor: { attribute: false },
    _error: { state: true },
    _pending: { state: true }
  };

  static styles = css`
    .mode-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .mode-option {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
      width: 100%;
      min-height: 48px;
      padding: 8px 12px;
      border: 1px solid transparent;
      border-radius: var(--equinox-control-radius, 8px);
      background: transparent;
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      font: inherit;
      font-size: 15px;
      text-align: start;
      box-sizing: border-box;
    }

    .mode-option:hover:not(:disabled),
    .mode-option:focus-visible {
      background: color-mix(in srgb, var(--primary-text-color, #fff) 8%, transparent);
      outline: none;
    }

    .mode-option[active] {
      color: var(--primary-color);
    }

    .mode-option:disabled {
      cursor: default;
      opacity: 0.65;
    }

    .mode-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
    }

    .mode-icon[disabled] {
      color: var(--disabled-text-color, #7e8792);
      background: color-mix(in srgb, var(--disabled-text-color, #7e8792) 15%, transparent);
    }

    .check {
      color: var(--primary-color);
    }

    .note,
    .error {
      margin: 10px 12px 0;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.4;
    }

    .error {
      color: var(--error-color, #db4437);
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
  private _pending = false;

  protected willUpdate(): void {
    this.setAttribute("theme", this.config?.theme ?? DEFAULT_THEME);
    this.toggleAttribute("light", !this.hass?.themes?.darkMode);
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _state() {
    return this.viewModel?.vt?.autoStartStop;
  }

  private _isWritable(): boolean {
    const state = this._state();
    return state?.enableEntityAvailable === true && state.stopModeEntityAvailable === true;
  }

  private _isDisabled(): boolean {
    return (
      this._pending ||
      !this._isWritable() ||
      this.viewModel?.climate.availability !== "available" ||
      this.viewModel?.vt?.lock.isUserLocked === true
    );
  }

  private _currentMode(): string {
    const state = this._state();
    return state?.isEnabled ? state.stopMode ?? "off" : DISABLED_MODE;
  }

  private _modeLabel(mode: string): string {
    return localize(this.language, `dialog.auto_start_stop.mode.${mode}`);
  }

  private _modeIcon(mode: string): string {
    if (mode === DISABLED_MODE) return "mdi:power-off";
    if (mode === "fan_only") return "mdi:fan";
    if (mode === "dry") return "mdi:water-percent";
    return "mdi:power";
  }

  private async _selectMode(mode: string): Promise<void> {
    if (!this.hass || !this.config || this._isDisabled()) {
      return;
    }

    this._pending = true;
    this._error = undefined;
    const result = await setAutoStartStopMode(
      { hass: this.hass, entityId: this.config.entity, config: this.config, viewModel: this.viewModel },
      mode
    );
    this._pending = false;

    if (result.ok) {
      this._dispatchClose();
    } else {
      this._error = result.error;
    }
  }

  protected render() {
    const state = this._state();
    const currentMode = this._currentMode();
    const options = [DISABLED_MODE, ...(state?.stopModeOptions ?? [])];
    const disabled = this._isDisabled();

    return html`
      <eq-dialog
        .open=${this.open}
        .title=${localize(this.language, "dialog.auto_start_stop.title")}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <div class="mode-list" role="list">
          ${options.map((mode) => html`
            <button
              class="mode-option"
              type="button"
              ?active=${mode === currentMode}
              ?disabled=${disabled}
              @click=${() => this._selectMode(mode)}
            >
              <span class="mode-icon" ?disabled=${mode === DISABLED_MODE}>
                <ha-icon .icon=${this._modeIcon(mode)}></ha-icon>
              </span>
              <span>${this._modeLabel(mode)}</span>
              ${mode === currentMode ? html`<ha-icon class="check" icon="mdi:check"></ha-icon>` : nothing}
            </button>
          `)}
        </div>
        ${!this._isWritable()
          ? html`<p class="note">${localize(this.language, "dialog.auto_start_stop.read_only")}</p>`
          : nothing}
        ${this._error
          ? html`<p class="error">${localize(this.language, "dialog.auto_start_stop.action_failed")}</p>`
          : nothing}
      </eq-dialog>
    `;
  }
}

if (!customElements.get("eq-auto-start-stop-dialog")) {
  customElements.define("eq-auto-start-stop-dialog", EquinoxAutoStartStopDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-auto-start-stop-dialog": EquinoxAutoStartStopDialog;
  }
}
