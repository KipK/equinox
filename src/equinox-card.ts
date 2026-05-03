import { LitElement, css, html } from "lit";
import "./equinox-card-editor";
import "./components/eq-main-card";
import { CARD_NAME, CARD_TAG, CARD_TYPE } from "./const";
import { buildEquinoxViewModel } from "./data/climate-state";
import { validateEquinoxConfig } from "./data/config";
import type { EquinoxCardConfig, EquinoxCardConfigInput, EquinoxConfigValidation } from "./types/config";
import { localize } from "./localize/localize";
import type { HomeAssistant, LovelaceCard, LovelaceCardGridOptions } from "./types/ha";
import type { EquinoxViewModel } from "./types/view-model";

export class EquinoxCard extends LitElement implements LovelaceCard {
  static properties = {
    hass: { attribute: false },
    _validation: { state: true }
  };

  static styles = css`
    ha-card {
      padding: 16px;
      color: var(--primary-text-color);
    }

    .error {
      color: var(--error-color);
    }
  `;

  hass?: HomeAssistant;

  private _validation?: EquinoxConfigValidation;
  private _viewModel?: EquinoxViewModel;

  static getConfigElement(): HTMLElement {
    return document.createElement("equinox-card-editor");
  }

  static getStubConfig(hass?: HomeAssistant): EquinoxCardConfigInput {
    const entity = Object.keys(hass?.states ?? {}).find((entityId) => entityId.startsWith("climate."));

    return {
      type: CARD_TYPE,
      entity: entity ?? "climate.example"
    };
  }

  setConfig(config: EquinoxCardConfigInput): void {
    this._validation = validateEquinoxConfig(config);
  }

  protected willUpdate(): void {
    this._viewModel = this._buildViewModel();
  }

  getCardSize(): number {
    return 3;
  }

  getGridOptions(): LovelaceCardGridOptions {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: this._validation?.config.display_mode === "compact" ? 4 : 6,
      min_rows: 3,
      max_rows: 8
    };
  }

  protected render() {
    const language = this.hass?.locale?.language ?? this.hass?.language;

    if (!this._validation) {
      return this._renderMessage(localize(language, "card.missing_entity"), true);
    }

    if (this._validation.error) {
      return this._renderMessage(localize(language, `card.${this._validation.error}`), true);
    }

    const entity = this._validation.config.entity;

    if (!entity) {
      return this._renderMessage(localize(language, "card.missing_entity"), true);
    }

    const entityState = this.hass?.states[entity];

    if (this.hass && !entityState) {
      return this._renderMessage(localize(language, "card.entity_not_found", { entity }), true);
    }

    return html`
      <eq-main-card
        .hass=${this.hass}
        .config=${this._validation.config as EquinoxCardConfig}
        .viewModel=${this._viewModel}
      ></eq-main-card>
    `;
  }

  private _buildViewModel(): EquinoxViewModel | undefined {
    if (!this.hass || !this._validation || this._validation.error) {
      return undefined;
    }

    const config = this._validation.config as EquinoxCardConfig;
    const entity = this.hass.states[config.entity];

    if (!entity) {
      return undefined;
    }

    return buildEquinoxViewModel(config, this.hass, entity);
  }

  private _renderMessage(message: string, error = false) {
    return html`
      <ha-card>
        <div class=${error ? "error" : ""}>${message}</div>
      </ha-card>
    `;
  }
}

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, EquinoxCard);
}

window.customCards = window.customCards ?? [];
const customCards = window.customCards;
customCards
  .filter((card) => card.type === CARD_TAG || card.type === CARD_TYPE || card.name === CARD_NAME)
  .forEach((card) => {
    customCards.splice(customCards.indexOf(card), 1);
  });
customCards.push({
  type: CARD_TAG,
  name: CARD_NAME,
  description: localize(navigator.language, "card.description"),
  preview: true
});

declare global {
  interface HTMLElementTagNameMap {
    "equinox-card": EquinoxCard;
  }
}
