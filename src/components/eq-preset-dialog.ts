import { LitElement, css, html, nothing } from "lit";
import { setPresetMode } from "../data/actions";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

const PRESET_ORDER = ["frost", "eco", "away", "comfort", "home", "sleep", "activity", "boost"];

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

export class EquinoxPresetDialog extends LitElement {
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
      gap: 12px;
      justify-content: center;
      overflow-x: auto;
    }

    .option-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 4px 6px 8px;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      flex: 0 0 auto;
      min-width: 60px;
      text-align: center;
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

    .option-icon[tone="boost"] {
      color: var(--equinox-boost-color, #b06cff);
      background: color-mix(in srgb, var(--equinox-boost-color, #b06cff) 15%, transparent);
    }

    .option-icon[tone="cool-boost"] {
      color: var(--equinox-cool-boost-color, #7cc7ff);
      background: color-mix(in srgb, var(--equinox-cool-boost-color, #7cc7ff) 15%, transparent);
    }

    .option-label {
      font-size: 15px;
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
    const available = this.viewModel?.climate.presetModes ?? [];
    const hvacMode = this.viewModel?.climate.hvacMode;

    return PRESET_ORDER.filter(
      (preset) =>
        available.includes(preset) &&
        PRESET_ICONS[preset] &&
        preset !== "none" &&
        !(preset === "frost" && hvacMode !== "heat")
    );
  }

  private _presetLabel(preset: string): string {
    const label = localize(this.language, `main.preset.${preset}`);

    return label === `main.preset.${preset}` ? preset : label;
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
      return hvacMode === "cool" ? "cool" : "heat";
    }

    if (preset === "home") {
      return "auto";
    }

    if (preset === "boost" || preset === "activity") {
      return hvacMode === "cool" ? "cool-boost" : "boost";
    }

    return "";
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private async _selectPreset(preset: string): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    const ctx = { hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel };

    await setPresetMode(ctx, preset);
    this._dispatchClose();
  }

  protected render() {
    const options = this._getOptions();
    const activePreset = this.viewModel?.climate.presetMode;
    const title = localize(this.language, "dialog.preset.title");

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
            (preset) => html`
              <button
                class="option-row"
                ?active=${preset === activePreset}
                @click=${() => this._selectPreset(preset)}
              >
                <span class="option-icon" tone=${this._presetTone(preset)}>
                  <ha-icon .icon=${PRESET_ICONS[preset]} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${this._presetLabel(preset)}</span>
              </button>
            `
          )}
        </div>
        <div class="option-mobile">
          <ha-md-list class="option-list">
            ${options.map(
              (preset) => html`
                <ha-md-list-item type="button" ?active=${preset === activePreset} @click=${() => this._selectPreset(preset)}>
                  <span class="option-icon" tone=${this._presetTone(preset)} slot="start">
                    <ha-icon .icon=${PRESET_ICONS[preset]} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${this._presetLabel(preset)}</span>
                  ${preset === activePreset
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

if (!customElements.get("eq-preset-dialog")) {
  customElements.define("eq-preset-dialog", EquinoxPresetDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-preset-dialog": EquinoxPresetDialog;
  }
}
