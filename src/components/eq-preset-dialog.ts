import { LitElement, css, html } from "lit";
import { setPresetMode } from "../data/actions";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

const PRESET_ORDER = ["frost", "eco", "comfort", "boost"];

const PRESET_ICONS: Record<string, string> = {
  frost: "mdi:snowflake",
  eco: "mdi:leaf",
  comfort: "mdi:briefcase",
  boost: "mdi:rocket-launch-outline"
};

const PRESET_TONES: Record<string, string> = {
  frost: "cool",
  eco: "auto",
  comfort: "heat",
  boost: "boost"
};

export class EquinoxPresetDialog extends LitElement {
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
      gap: 10px;
      padding: 8px 4px;
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

    .option-icon[tone="boost"] {
      color: var(--equinox-boost-color, #b06cff);
      background: color-mix(in srgb, var(--equinox-boost-color, #b06cff) 15%, transparent);
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
    const available = this.viewModel?.climate.presetModes ?? [];
    const hvacMode = this.viewModel?.climate.hvacMode;

    return PRESET_ORDER.filter(
      (preset) =>
        available.includes(preset) &&
        PRESET_ICONS[preset] &&
        preset !== "none" &&
        !(preset === "frost" && hvacMode === "cool")
    );
  }

  private _presetLabel(preset: string): string {
    const label = localize(this.language, `main.preset.${preset}`);

    return label === `main.preset.${preset}` ? preset : label;
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
        @eq-dialog-close=${this._dispatchClose}
      >
        ${options.map(
          (preset) => html`
            <button
              class="option-row"
              ?active=${preset === activePreset}
              @click=${() => this._selectPreset(preset)}
            >
              <span class="option-icon" tone=${PRESET_TONES[preset] ?? ""}>
                <ha-icon .icon=${PRESET_ICONS[preset]} style="--mdc-icon-size: 24px;"></ha-icon>
              </span>
              <span class="option-label">${this._presetLabel(preset)}</span>
            </button>
          `
        )}
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
