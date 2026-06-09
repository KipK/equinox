import { LitElement, css, html } from "lit";
import { defineHaBetterHistory } from "@kipk/ha-better-history";
import "./equinox-card-editor";
import "./components/eq-main-card";
import { CARD_NAME, CARD_TAG, CARD_TYPE, CARD_VERSION, HISTORY_TAG } from "./const";
import { buildEquinoxViewModel } from "./data/climate-state";
import { validateEquinoxConfig } from "./data/config";
import { detectEquinoxUpdate, handleEquinoxUpdateRefresh } from "./data/update-refresh";
import type { EquinoxCardConfig, EquinoxCardConfigInput, EquinoxConfigValidation } from "./types/config";
import { localize } from "./localize/localize";
import type { CustomCardEntitySuggestion, HomeAssistant, LovelaceCard, LovelaceCardGridOptions } from "./types/ha";
import type { EquinoxViewModel } from "./types/view-model";

defineHaBetterHistory(HISTORY_TAG);
detectEquinoxUpdate(CARD_VERSION);

// card.description is the only translation kept inlined; it is consumed at module load before fetch can complete.
const CARD_DESCRIPTIONS: Record<string, string> = {
  bg: "Карта на Lovelace за Versatile Thermostat и стандартни климатични елементи.",
  ca: "Lovelace card for Versatile Thermostat and standard climate entities.",
  zh: "适用于 Versatile Thermostat 和标准气候实体的 Lovelace 卡片。",
  cs: "Karta Lovelace pro Versatile Thermostat a standardní entity klimatizace.",
  da: "Lovelace card for Versatile Thermostat and standard climate entities.",
  de: "Lovelace-Karte für Versatile Thermostat und Standard-Klimageräte.",
  el: "Κάρτα Lovelace για Versatile Thermostat και τυπικές οντότητες κλίματος.",
  en: "Lovelace card for Versatile Thermostat and standard climate entities.",
  es: "Tarjeta Lovelace para Termostato Versátil y entidades climáticas estándar.",
  fi: "Lovelace-kortti Versatile Thermostat- ja vakioilmastoentiteeteille.",
  fr: "Carte Lovelace pour Versatile Thermostat et les entités climate standard.",
  he: "כרטיס Lovelace עבור Versatile Thermostat וישויות climate סטנדרטיות.",
  hu: "Lovelace kártya a sokoldalú termosztáthoz és standard klímaentitásokhoz.",
  it: "Scheda Lovelace per Termostato Versatile e entità climatiche standard.",
  nl: "Lovelace-kaart voor Versatile Thermostat en standaard klimaatentiteiten.",
  no: "Lovelace-kort for Versatile Thermostat og standard klimaenheter.",
  pl: "Karta Lovelace dla Versatile Thermostat i standardowych jednostek klimatyzacyjnych.",
  pt: "Placa Lovelace para Termostato Versátil e entidades climáticas padrão.",
  ru: "Карточка Lovelace для Versatile Thermostat и стандартных сущностей климата.",
  sk: "Karta Lovelace pre Versatile Thermostat a štandardné klimatizačné entity."
};

function cardDescription(lang: string): string {
  const normalized = lang.toLowerCase().split("-")[0] || "en";
  return CARD_DESCRIPTIONS[normalized] ?? CARD_DESCRIPTIONS.en;
}

function getEntitySuggestion(hass: HomeAssistant, entityId: string): CustomCardEntitySuggestion | null {
  const domain = entityId.split(".")[0];

  if (domain !== "climate" || !hass.states[entityId]) {
    return null;
  }

  return {
    config: {
      type: CARD_TYPE,
      entity: entityId
    }
  };
}

export class EquinoxCard extends LitElement implements LovelaceCard {
  static properties = {
    hass: { attribute: false },
    _validation: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    eq-main-card {
      height: 100%;
    }

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
    this._handleUpdateRefresh();
  }

  getCardSize(): number {
    return 3;
  }

  getGridOptions(): LovelaceCardGridOptions {
    return {
      columns: 12,
      rows: "auto",
      min_columns: 4,
      max_columns: 12,
      min_rows: 3
    };
  }

  private _language(): string {
    const raw = this.hass?.locale?.language ?? this.hass?.language ?? "en";
    return raw.toLowerCase().split("-")[0] || "en";
  }

  protected render() {
    const language = this._language();

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

  private _handleUpdateRefresh(): void {
    if (!this._validation) {
      return;
    }

    const mode = this._validation?.config.update_refresh;
    const refreshMode = mode === "reload" || mode === "off" ? mode : "notify";

    handleEquinoxUpdateRefresh(refreshMode, this._language());
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
  description: cardDescription(navigator.language),
  preview: true,
  documentationURL: "https://github.com/KipK/equinox#readme",
  getEntitySuggestion
});

declare global {
  interface HTMLElementTagNameMap {
    "equinox-card": EquinoxCard;
  }
}
