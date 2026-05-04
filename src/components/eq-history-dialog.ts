import { LitElement, css, html, type TemplateResult } from "lit";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { BetterHistoryConfig } from "ha-better-history";
import "ha-better-history/define";

export class EquinoxHistoryDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    config: { attribute: false },
    language: {},
    _fullscreen: { state: true }
  };

  static styles = css`
    .dialog-fullscreen-btn {
      --ha-icon-button-size: 40px;
      --ha-icon-button-padding-inline: 6px;
      color: var(--primary-text-color);
    }

    @media (max-width: 600px) {
      .dialog-fs-toggle {
        display: none;
      }
    }
  `;

  open = false;
  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  language?: string;
  private _fullscreen = false;

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _toggleFullscreen(): void {
    this._fullscreen = !this._fullscreen;
  }

  private _betterHistoryConfig(): BetterHistoryConfig {
    const climateEntityId = this.config?.entity;
    const lang = this.language ?? this.hass?.locale?.language;

    const defaultEntities: string[] = [
      climateEntityId,
      this.config?.diagnostic_entity,
      this.config?.power_entity,
      this.config?.humidity_entity
    ].filter((id): id is string => typeof id === "string" && id !== "");

    return {
      showDatePicker: true,
      showEntityPicker: true,
      showLegend: true,
      showTooltip: true,
      defaultEntities,
      series: climateEntityId
        ? [
            {
              entity: climateEntityId,
              attribute: "current_temperature",
              label: localize(lang, "dialog.history.sources.current_temperature"),
              color: "#42a5f5",
              scaleGroup: "temperature"
            },
            {
              entity: climateEntityId,
              attribute: "temperature",
              label: localize(lang, "dialog.history.sources.temperature"),
              color: "#ff9800",
              scaleGroup: "temperature"
            },
            {
              entity: climateEntityId,
              attribute: "hvac_action",
              label: localize(lang, "dialog.history.sources.hvac_action"),
              color: "#ab47bc"
            }
          ]
        : []
    };
  }

  protected render(): TemplateResult {
    return html`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${localize(this.language, "dialog.history.title")}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${this._dispatchClose}
      >
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-fs-toggle"
          .label=${localize(
            this.language,
            this._fullscreen ? "dialog.history.exit_fullscreen" : "dialog.history.fullscreen"
          )}
          @click=${this._toggleFullscreen}
        >
          <ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
        </ha-icon-button>
        <ha-better-history
          .hass=${this.hass}
          .config=${this._betterHistoryConfig()}
          .language=${this.language}
        ></ha-better-history>
      </ha-dialog>
    `;
  }
}

if (!customElements.get("eq-history-dialog")) {
  customElements.define("eq-history-dialog", EquinoxHistoryDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-history-dialog": EquinoxHistoryDialog;
  }
}
