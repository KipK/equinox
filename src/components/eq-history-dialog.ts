import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { AttributeUnitMap, BetterHistoryConfig } from "ha-better-history";
import { equinoxAttributeUnits, loadEquinoxStaticAttributeUnits } from "../data/attribute-units";

const HISTORY_ELEMENT_URL = new URL(/* @vite-ignore */ "lib/ha-better-history/define.js", import.meta.url).toString();

export class EquinoxHistoryDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    config: { attribute: false },
    language: {},
    _fullscreen: { state: true },
    _controlsVisible: { state: true },
    _toolsOpen: { state: true },
    _staticAttributeUnits: { state: true },
    _historyElementReady: { state: true }
  };

  static styles = css`
    :host,
    ha-dialog {
      user-select: none;
      -webkit-user-select: none;
    }

    .dialog-fullscreen-btn {
      --ha-icon-button-size: 40px;
      --ha-icon-button-padding-inline: 6px;
      color: var(--primary-text-color);
    }

    .dialog-tools-btn {
      --mdc-icon-size: 18px;
      margin-inline-start: 12px;
    }

    @media (max-width: 600px) {
      .dialog-tools-btn {
        margin-inline-start: 14px;
      }

      .dialog-fs-toggle {
        display: none;
      }
    }

    .history-loading {
      align-items: center;
      color: var(--secondary-text-color);
      display: flex;
      flex: 1;
      justify-content: center;
      min-height: 70vh;
    }
  `;

  open = false;
  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  language?: string;
  private _fullscreen = false;
  private _controlsVisible = true;
  private _toolsOpen = false;
  private _staticAttributeUnits?: AttributeUnitMap;
  private _historyElementReady = customElements.get("ha-better-history") !== undefined;
  private _historyElementLoadStarted = false;
  private _attributeUnitsLoadStarted = false;
  private _historyPickerOverlayOpen = false;
  private _suppressNextDialogClose = false;
  private _suppressCloseTimer?: ReturnType<typeof setTimeout>;

  protected updated(): void {
    this._styleDialogHeader();
    if (this.open) {
      void this._loadHistoryElement();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("pointerdown", this._handleDocumentPointerDown, true);
    this._loadAttributeUnits();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("pointerdown", this._handleDocumentPointerDown, true);
    if (this._suppressCloseTimer !== undefined) {
      clearTimeout(this._suppressCloseTimer);
      this._suppressCloseTimer = undefined;
    }
  }

  private _handleDocumentPointerDown = (): void => {
    if (!this.open || !this._historyPickerOverlayOpen) return;

    this._suppressNextDialogClose = true;
    if (this._suppressCloseTimer !== undefined) {
      clearTimeout(this._suppressCloseTimer);
    }
    this._suppressCloseTimer = setTimeout(() => {
      this._suppressNextDialogClose = false;
      this._suppressCloseTimer = undefined;
    }, 1000);
  };

  private _handleDialogClosed(event: Event): void {
    if (this._suppressNextDialogClose) {
      event.stopPropagation();
      this._suppressNextDialogClose = false;
      if (this._suppressCloseTimer !== undefined) {
        clearTimeout(this._suppressCloseTimer);
        this._suppressCloseTimer = undefined;
      }

      const dialog = event.currentTarget as HTMLElement & { open?: boolean };
      dialog.open = true;
      this.requestUpdate();
      return;
    }

    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _onHistoryPickerOverlayChanged(event: CustomEvent<{ open: boolean }>): void {
    this._historyPickerOverlayOpen = event.detail.open;
  }

  private _toggleFullscreen(): void {
    this._fullscreen = !this._fullscreen;
  }

  private _loadAttributeUnits(): void {
    if (this._attributeUnitsLoadStarted) return;
    this._attributeUnitsLoadStarted = true;

    loadEquinoxStaticAttributeUnits().then((units) => {
      this._staticAttributeUnits = units;
      this.requestUpdate();
    });
  }

  private async _loadHistoryElement(): Promise<void> {
    if (this._historyElementReady || this._historyElementLoadStarted) return;
    this._historyElementLoadStarted = true;

    try {
      await import(/* @vite-ignore */ HISTORY_ELEMENT_URL);
      await customElements.whenDefined("ha-better-history");
      this._historyElementReady = true;
    } catch (error) {
      console.warn("[equinox] Failed to load ha-better-history:", error);
      this._historyElementLoadStarted = false;
    }
  }

  private _styleDialogHeader(): void {
    const dialog = this.renderRoot.querySelector("ha-dialog");
    const root = dialog?.shadowRoot;
    if (!root || root.querySelector("style[data-equinox-history-header]")) return;

    const style = document.createElement("style");
    style.dataset.equinoxHistoryHeader = "true";
    style.textContent = `
      .mdc-dialog__title,
      .header-title,
      .title {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .header,
      .dialog-header,
      .mdc-dialog__header {
        gap: 12px;
      }

      [name="headerActionItems"],
      slot[name="headerActionItems"] {
        flex: 0 0 auto;
      }
    `;
    root.appendChild(style);
  }

  private _configCacheKey = "";
  private _configCache?: BetterHistoryConfig;

  private _betterHistoryConfig(): BetterHistoryConfig {
    const climateEntityId = this.config?.entity;
    const lang = this.language ?? this.hass?.locale?.language;
    const key = `${climateEntityId ?? ""}|${lang ?? ""}|${this.config?.diagnostic_entity ?? ""}|${this.config?.power_entity ?? ""}|${this.config?.humidity_entity ?? ""}|${this.config?.temperature_entity ?? ""}`;

    if (key === this._configCacheKey && this._configCache) return this._configCache;

    this._configCacheKey = key;

    const defaultEntities: string[] = [
      climateEntityId,
      this.config?.diagnostic_entity,
      this.config?.power_entity,
      this.config?.humidity_entity,
      this.config?.temperature_entity
    ].filter((id): id is string => typeof id === "string" && id !== "");

    const series: Array<{ entity: string; scaleGroup?: string }> = [];

    if (climateEntityId) {
      series.push({ entity: climateEntityId });
    }

    if (this.config?.temperature_entity) {
      series.push({ entity: this.config.temperature_entity, scaleGroup: "temperature" });
    }

    this._configCache = {
      showDatePicker: true,
      showEntityPicker: true,
      showLegend: true,
      showTooltip: true,
      debugPerformance: false,
      defaultEntities,
      series
    };

    return this._configCache;
  }

  protected render(): TemplateResult {
    return html`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${this.hass?.states[this.config?.entity ?? ""]?.attributes?.friendly_name ?? this.config?.entity ?? localize(this.language, "dialog.history.title")}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(event: Event) => this._handleDialogClosed(event)}
      >
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-tools-btn"
          .label=${localize(this.language, "dialog.history.tools")}
          ?active=${this._toolsOpen}
          @click=${() => { this._toolsOpen = !this._toolsOpen; }}
        >
          <ha-icon icon="mdi:tools"></ha-icon>
        </ha-icon-button>
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
        ${this.open && !this._historyElementReady
        ? html`<div class="history-loading">
              ${localize(this.language, "dialog.history.loading")}
            </div>`
        : nothing}
        ${this.open && this._historyElementReady
        ? html`<ha-better-history
              .hass=${this.hass}
              .config=${this._betterHistoryConfig()}
              .attributeUnits=${equinoxAttributeUnits(this._staticAttributeUnits)}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              .toolsOpen=${this._toolsOpen}
              @picker-overlay-changed=${(event: CustomEvent<{ open: boolean }>) => this._onHistoryPickerOverlayChanged(event)}
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
