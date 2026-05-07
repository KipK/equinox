import { LitElement, css, html, nothing } from "lit";
import { setAutoFanMode, setFanMode } from "../data/actions";
import { AUTO_FAN_MODES, FAN_MODE_ICONS } from "../data/fan";
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
    anchor: { attribute: false }
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
      background: rgba(128, 128, 128, 0.10);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fan-option[active] .fan-option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .fan-option-label {
      display: none;
    }

    .fan-list {
      padding: 0;
      background: transparent;
    }

    ha-md-list-item {
      border-radius: var(--equinox-control-radius, 8px);
      color: var(--primary-text-color, #fff);
      --md-list-item-container-color: transparent;
      --md-list-item-label-text-size: 15px;
      --md-list-item-label-text-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-opacity: 0.08;
      --ha-md-list-item-gap: 12px;
    }

    ha-md-list-item[active] {
      color: var(--primary-color);
      --md-list-item-label-text-color: var(--primary-color);
    }

    .option-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.10);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    ha-md-list-item[active] .option-icon {
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
  anchor?: { element: HTMLElement };

  private _getOptions(): string[] {
    if (this.viewModel?.vt?.fan.hasAutoFan === true) {
      return AUTO_FAN_MODES;
    }

    return this.viewModel?.climate.fanModes ?? [];
  }

  private _getActiveMode(): string | undefined {
    if (this.viewModel?.vt?.fan.hasAutoFan === true) {
      return this.viewModel.vt.fan.currentAutoFanMode;
    }

    return this.viewModel?.climate.fanMode;
  }

  private _fanIcon(mode: string): string {
    return FAN_MODE_ICONS[mode] ?? "mdi:fan";
  }

  private _fanLabel(mode: string): string {
    const label = localize(this.language, `main.fan.${mode}`);

    // If the key was not found, localize returns the key itself; fall back to raw mode string.
    return label === `main.fan.${mode}` ? mode : label;
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private async _selectMode(mode: string): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    const ctx = { hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel };

    if (this.viewModel?.vt?.fan.hasAutoFan === true) {
      await setAutoFanMode(ctx, mode);
    } else {
      await setFanMode(ctx, mode);
    }

    this._dispatchClose();
  }

  protected render() {
    const options = this._getOptions();
    const activeMode = this._getActiveMode();
    const title = localize(this.language, "dialog.fan.title");

    return html`
      <eq-dialog
        .open=${this.open}
        .title=${title}
        .language=${this.language}
        .floating=${this.floating}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
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
                  <span class="fan-option-icon">
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
          <ha-md-list class="fan-list">
          ${options.map(
            (mode) => html`
              <ha-md-list-item
                type="button"
                ?active=${mode === activeMode}
                @click=${() => this._selectMode(mode)}
              >
                <span class="option-icon" slot="start">
                  <ha-icon .icon=${this._fanIcon(mode)} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span>${this._fanLabel(mode)}</span>
                ${mode === activeMode
                  ? html`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>`
                  : nothing}
              </ha-md-list-item>
            `
          )}
          </ha-md-list>
        </div>
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
