import { LitElement, css, html } from "lit";
import { setHvacMode } from "../data/actions";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

const HVAC_ORDER = ["heat", "cool", "heat_cool", "auto", "dry", "fan_only", "off"];

const HVAC_ICONS: Record<string, string> = {
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:autorenew",
  auto: "mdi:power",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power"
};

const HVAC_TONES: Record<string, string> = {
  heat: "heat",
  cool: "cool",
  heat_cool: "auto",
  auto: "auto",
  dry: "cool",
  fan_only: "auto",
  off: "off"
};

export class EquinoxHvacDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    viewModel: { attribute: false },
    config: { attribute: false },
    language: {}
  };

  static styles = css`
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

    .option-row[active] .option-label {
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

    .option-icon[tone="heat"] {
      color: var(--equinox-heat-color, #ff8a1c);
      background: color-mix(in srgb, var(--equinox-heat-color, #ff8a1c) 15%, transparent);
    }

    .option-icon[tone="cool"] {
      color: var(--equinox-cool-color, #4da1ff);
      background: color-mix(in srgb, var(--equinox-cool-color, #4da1ff) 15%, transparent);
    }

    .option-icon[tone="auto"] {
      color: var(--equinox-auto-color, #55bf6a);
      background: color-mix(in srgb, var(--equinox-auto-color, #55bf6a) 15%, transparent);
    }

    .option-icon[tone="off"] {
      color: var(--disabled-text-color, #7e8792);
      background: rgba(128, 128, 128, 0.12);
    }

    .option-label {
      flex: 1;
      font-size: 15px;
    }
  `;

  open = false;
  hass?: HomeAssistant;
  viewModel?: EquinoxViewModel;
  config?: EquinoxCardConfig;
  language?: string;

  private _getOptions(): string[] {
    const available = this.viewModel?.climate.hvacModes ?? [];

    return HVAC_ORDER.filter((mode) => available.includes(mode) && HVAC_ICONS[mode]);
  }

  private _modeLabel(mode: string): string {
    const label = localize(this.language, `main.hvac.${mode}`);

    return label === `main.hvac.${mode}` ? mode : label;
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private async _selectMode(mode: string): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    const ctx = { hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel };

    await setHvacMode(ctx, mode);
    this._dispatchClose();
  }

  protected render() {
    const options = this._getOptions();
    const activeMode = this.viewModel?.climate.hvacMode;
    const title = localize(this.language, "dialog.hvac.title");

    return html`
      <eq-dialog
        .open=${this.open}
        .title=${title}
        .language=${this.language}
        @eq-dialog-close=${this._dispatchClose}
      >
        ${options.map(
          (mode) => html`
            <button
              class="option-row"
              ?active=${mode === activeMode}
              @click=${() => this._selectMode(mode)}
            >
              <span class="option-icon" tone=${HVAC_TONES[mode] ?? ""}>
                <ha-icon .icon=${HVAC_ICONS[mode]} style="--mdc-icon-size: 24px;"></ha-icon>
              </span>
              <span class="option-label">${this._modeLabel(mode)}</span>
            </button>
          `
        )}
      </eq-dialog>
    `;
  }
}

if (!customElements.get("eq-hvac-dialog")) {
  customElements.define("eq-hvac-dialog", EquinoxHvacDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-hvac-dialog": EquinoxHvacDialog;
  }
}
