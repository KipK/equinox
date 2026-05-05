import { LitElement, css, html, nothing, type TemplateResult } from "lit";
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
    _fullscreen: { state: true },
    _controlsVisible: { state: true }
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
  private _controlsVisible = true;

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _toggleFullscreen(): void {
    this._fullscreen = !this._fullscreen;
  }

  private _configCacheKey = "";
  private _configCache?: BetterHistoryConfig;

  private _betterHistoryConfig(): BetterHistoryConfig {
    const climateEntityId = this.config?.entity;
    const lang = this.language ?? this.hass?.locale?.language;
    const tempUnit = climateEntityId
      ? this._climateTemperatureUnit(climateEntityId)
      : undefined;
    const key = `${climateEntityId ?? ""}|${lang ?? ""}|${tempUnit ?? ""}|${this.config?.diagnostic_entity ?? ""}|${this.config?.power_entity ?? ""}|${this.config?.humidity_entity ?? ""}`;

    if (key === this._configCacheKey && this._configCache) return this._configCache;

    this._configCacheKey = key;

    const defaultEntities: string[] = [
      climateEntityId,
      this.config?.diagnostic_entity,
      this.config?.power_entity,
      this.config?.humidity_entity
    ].filter((id): id is string => typeof id === "string" && id !== "");

    this._configCache = {
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
            unit: tempUnit,
            scaleGroup: "temperature"
          },
          {
            entity: climateEntityId,
            attribute: "temperature",
            label: localize(lang, "dialog.history.sources.temperature"),
            color: "#ff9800",
            unit: tempUnit,
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

    return this._configCache;
  }

  private _climateTemperatureUnit(entityId: string): string | undefined {
    const entity = this.hass?.states[entityId];
    if (!entity) return undefined;
    const attr = entity.attributes;
    if (typeof attr.temperature_unit === "string" && attr.temperature_unit !== "") {
      return attr.temperature_unit;
    }
    const unit = attr.unit_of_measurement;
    if (typeof unit === "string" && unit !== "") return unit;
    return undefined;
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
          class="dialog-fullscreen-btn"
          .label=${localize(
      this.language,
      this._controlsVisible ? "dialog.history.hide_controls" : "dialog.history.show_controls"
    )}
          @click=${() => { this._controlsVisible = !this._controlsVisible; }}
        >
          <ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </ha-icon-button>
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
        ${this.open
        ? html`<ha-better-history
              .hass=${this.hass}
              .config=${this._betterHistoryConfig()}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              style="flex:1;min-height:70vh;"
            ></ha-better-history>`
        : nothing}
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
