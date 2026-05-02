import { LitElement, css, html } from "lit";
import "./equinox-card-editor";
import { CARD_NAME, CARD_TAG, CARD_TYPE } from "./const";
import { validateEquinoxConfig } from "./data/config";
import type { EquinoxCardConfigInput, EquinoxConfigValidation } from "./types/config";
import { localize } from "./localize/localize";
import type { HomeAssistant, LovelaceCard } from "./types/ha";

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

  static getConfigElement(): HTMLElement {
    return document.createElement("equinox-card-editor");
  }

  static getStubConfig(): EquinoxCardConfigInput {
    return {
      type: CARD_TYPE,
      entity: "climate.example"
    };
  }

  setConfig(config: EquinoxCardConfigInput): void {
    this._validation = validateEquinoxConfig(config);
  }

  getCardSize(): number {
    return 3;
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
      <ha-card>
        <div>${localize(language, "card.placeholder", { entity })}</div>
      </ha-card>
    `;
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

const customCards = window.customCards ?? [];
window.customCards = customCards;
customCards.push({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: localize(navigator.language, "card.description"),
  preview: true
});

declare global {
  interface HTMLElementTagNameMap {
    "equinox-card": EquinoxCard;
  }
}
