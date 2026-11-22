import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { localize } from "../localize/localize";
import {
  CHAUFFAGE_SCHEDULE_CARD_TAG,
  chauffageScheduleCardConfig,
  chauffageScheduleCardDefined
} from "../data/chauffage-schedule";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant, LovelaceCard } from "../types/ha";

// Schedule dialog: hosts the ha-chauffage schedule card, restricted to the Equinox thermostat.
// Only the card's public Lovelace contract (setConfig + hass) is used.
export class EquinoxScheduleDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    config: { attribute: false },
    language: {},
    _cardError: { state: true }
  };

  static styles = css`
    .schedule {
      display: block;
      min-width: 0;
      width: 100%;
      /* Leaves room below the week rows for the card's row menus, which are absolutely
         positioned and would otherwise overflow the dialog content. */
      min-height: min(480px, calc(100vh - 160px));
    }

    /* The embedded card sits on the dialog surface: no nested card frame. */
    .schedule > * {
      display: block;
      --ha-card-background: transparent;
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0px;
    }

    .message {
      margin: 8px 0;
      color: var(--secondary-text-color);
      line-height: 1.5;
    }
  `;

  open = false;
  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  language?: string;
  private _cardError?: string;
  private _card?: LovelaceCard;
  private _cardEntity?: string;

  protected updated(): void {
    this._syncCard();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._card = undefined;
    this._cardEntity = undefined;
  }

  private _syncCard(): void {
    const container = this.renderRoot.querySelector<HTMLElement>(".schedule");
    const entity = this.config?.entity;
    if (!container || !this.hass || !entity) return;

    if (!this._card || this._cardEntity !== entity) {
      const card = document.createElement(CHAUFFAGE_SCHEDULE_CARD_TAG) as LovelaceCard;
      try {
        card.setConfig(chauffageScheduleCardConfig(entity));
      } catch (error) {
        this._card = undefined;
        this._cardEntity = undefined;
        container.replaceChildren();
        this._cardError = error instanceof Error && error.message ? error.message : String(error);
        return;
      }
      this._card = card;
      this._cardEntity = entity;
      this._cardError = undefined;
    }

    if (this._card.parentElement !== container) {
      container.replaceChildren(this._card);
    }
    this._card.hass = this.hass;
  }

  private _title(): string {
    const title = localize(this.language, "dialog.schedule.title");
    const entity = this.config?.entity ?? "";
    const name = this.config?.name || this.hass?.states[entity]?.attributes?.friendly_name;
    return typeof name === "string" && name !== "" ? `${title} · ${name}` : title;
  }

  private _handleDialogClosed(event: Event): void {
    // Ignore `closed` events bubbling from elements inside the embedded card.
    if (event.target !== event.currentTarget) return;
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _renderContent(): TemplateResult {
    if (!chauffageScheduleCardDefined()) {
      return html`<p class="message">${localize(this.language, "dialog.schedule.unavailable")}</p>`;
    }

    return html`
      ${this._cardError ? html`<p class="message">${this._cardError}</p>` : nothing}
      <div class="schedule"></div>
    `;
  }

  protected render(): TemplateResult {
    // Escape and the scrim close the dialog. The scrim reacts to a pointerdown on the backdrop
    // only, so a slot drag released outside the dialog does not close it.
    return html`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${this._title()}
        width="large"
        @closed=${(event: Event) => this._handleDialogClosed(event)}
      >
        ${this.open ? this._renderContent() : nothing}
      </ha-dialog>
    `;
  }
}

if (!customElements.get("eq-schedule-dialog")) {
  customElements.define("eq-schedule-dialog", EquinoxScheduleDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-schedule-dialog": EquinoxScheduleDialog;
  }
}
