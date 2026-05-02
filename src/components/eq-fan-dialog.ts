import { LitElement, css, html, nothing } from "lit";
import { setAutoFanMode, setFanMode } from "../data/actions";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

const FAN_MODE_ICONS: Record<string, string> = {
  auto: "mdi:fan-auto",
  off: "mdi:fan-off",
  auto_fan_none: "mdi:fan-off",
  None: "mdi:fan-off",
  low: "mdi:fan-speed-1",
  auto_fan_low: "mdi:fan-speed-1",
  Low: "mdi:fan-speed-1",
  medium: "mdi:fan-speed-2",
  auto_fan_medium: "mdi:fan-speed-2",
  Medium: "mdi:fan-speed-2",
  high: "mdi:fan-speed-3",
  auto_fan_high: "mdi:fan-speed-3",
  High: "mdi:fan-speed-3",
  auto_fan_turbo: "mdi:fan",
  Turbo: "mdi:fan"
};

const AUTO_FAN_MODES = ["auto_fan_none", "auto_fan_low", "auto_fan_medium", "auto_fan_high", "auto_fan_turbo"];

export class EquinoxFanDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    viewModel: { attribute: false },
    config: { attribute: false },
    language: {}
  };

  static styles = css`
    /* Desktop fan grid */
    .fan-grid {
      display: flex;
      gap: 12px;
      justify-content: center;
      padding: 4px 0 12px;
    }

    .fan-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      min-width: 60px;
    }

    .fan-option-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid transparent;
    }

    .fan-option[active] .fan-option-icon {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .fan-option-label {
      font-size: 12px;
    }

    /* Mobile fan list */
    .option-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 4px;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      width: 100%;
      text-align: left;
    }

    .option-row:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.12);
    }

    .option-row[active] {
      color: var(--primary-color);
    }

    .option-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .option-row[active] .option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .option-label {
      flex: 1;
      font-size: 15px;
    }

    .option-check {
      color: var(--primary-color);
    }

    /* Responsive: show desktop grid on wide, mobile list on narrow */
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
                    <ha-icon .icon=${this._fanIcon(mode)} style="--mdc-icon-size: 28px;"></ha-icon>
                  </span>
                  <span class="fan-option-label">${this._fanLabel(mode)}</span>
                </button>
              `
            )}
          </div>
        </div>

        <!-- Mobile: vertical list -->
        <div class="fan-mobile">
          ${options.map(
            (mode) => html`
              <button
                class="option-row"
                ?active=${mode === activeMode}
                @click=${() => this._selectMode(mode)}
              >
                <span class="option-icon">
                  <ha-icon .icon=${this._fanIcon(mode)} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${this._fanLabel(mode)}</span>
                ${mode === activeMode
                  ? html`<ha-icon class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>`
                  : nothing}
              </button>
            `
          )}
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
