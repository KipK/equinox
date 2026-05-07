import { LitElement, css, html, nothing } from "lit";
import { setHvacMode } from "../data/actions";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

const HVAC_ORDER = ["heat", "cool", "dry", "fan_only", "off"];

const HVAC_ICONS: Record<string, string> = {
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power"
};

const HVAC_TONES: Record<string, string> = {
  heat: "heat",
  cool: "cool",
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
    language: {},
    floating: { type: Boolean },
    anchor: { attribute: false }
  };

  static styles = css`
    .option-grid {
      display: flex;
      overflow: hidden;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      border: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .option-row {
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
      text-align: center;
    }

    .option-row:not(:last-child) {
      border-inline-end: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .option-row:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.12);
    }

    .option-row[active] {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 74%, var(--equinox-text-color, #fff) 10%);
    }

    .option-row[active]:has(.option-icon[tone="heat"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-heat-color, #ff8a1c) 22%);
    }

    .option-row[active]:has(.option-icon[tone="cool"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-cool-color, #4da1ff) 22%);
    }

    .option-row[active]:has(.option-icon[tone="auto"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-auto-color, #55bf6a) 22%);
    }

    .option-row[active]:has(.option-icon[tone="off"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--disabled-text-color, rgba(128, 128, 128, 0.5)) 22%);
    }

    .option-row[active] .option-icon {
      background: transparent;
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
      display: none;
    }

    .option-mobile {
      display: none;
    }

    .option-list {
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
      --ha-md-list-item-gap: 10px;
    }

    ha-md-list-item[active] {
      --md-list-item-label-text-color: var(--primary-color);
    }

    ha-md-list-item[active] .option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .option-check {
      color: var(--primary-color);
    }

    @media (max-width: 600px) {
      .option-desktop {
        display: none;
      }

      .option-mobile {
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
        .floating=${this.floating}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <div class="option-grid option-desktop">
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
        </div>
        <div class="option-mobile">
          <ha-md-list class="option-list">
            ${options.map(
              (mode) => html`
                <ha-md-list-item type="button" ?active=${mode === activeMode} @click=${() => this._selectMode(mode)}>
                  <span class="option-icon" tone=${HVAC_TONES[mode] ?? ""} slot="start">
                    <ha-icon .icon=${HVAC_ICONS[mode]} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${this._modeLabel(mode)}</span>
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

if (!customElements.get("eq-hvac-dialog")) {
  customElements.define("eq-hvac-dialog", EquinoxHvacDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-hvac-dialog": EquinoxHvacDialog;
  }
}
