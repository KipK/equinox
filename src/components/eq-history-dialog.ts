import { LitElement, css, html, nothing, svg, type PropertyValues, type TemplateResult } from "lit";
import { attributeSource, entityStateSource, fetchHistory, valueType, type HistorySeries, type HistorySource } from "../data/history";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/ha";
import "./eq-dialog";

const RANGE_HOURS = [1, 6, 24, 72, 168];
const DEFAULT_RANGE_HOURS = 24;
const CHART_WIDTH = 720;
const CHART_HEIGHT = 260;
const PLOT_LEFT = 40;
const PLOT_RIGHT = 680;
const PLOT_WIDTH = PLOT_RIGHT - PLOT_LEFT;
const PLOT_TOP = 18;
const PLOT_BOTTOM = 226;

interface NumericScale {
  ids: Set<string>;
  min: number;
  max: number;
  top: number;
  height: number;
}

interface TooltipValue {
  label: string;
  color: string;
  value: string;
}

interface HistoryTooltip {
  x: number;
  y: number;
  time: number;
  values: TooltipValue[];
}

interface TooltipPoint {
  time: number;
  value: number | string | boolean;
}

interface TooltipSeries {
  id: string;
  label: string;
  color: string;
  points: TooltipPoint[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readPath(source: unknown, path: string[]): unknown {
  return path.reduce<unknown>((current, key) => (isRecord(current) ? current[key] : undefined), source);
}

function inputDateValue(date: Date): string {
  const offset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function dateFromInput(value: string): Date | undefined {
  const time = new Date(value).getTime();

  return Number.isFinite(time) ? new Date(time) : undefined;
}

function sourceColor(index: number): string {
  return ["#ff9800", "#42a5f5", "#66bb6a", "#ec407a", "#ab47bc", "#26a69a"][index % 6];
}

export class EquinoxHistoryDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    config: { attribute: false },
    language: {},
    _selectedEntityId: { state: true },
    _path: { state: true },
    _selectedSources: { state: true },
    _series: { state: true },
    _startInput: { state: true },
    _endInput: { state: true },
    _customEntityInput: { state: true },
    _customEntityIds: { state: true },
    _hiddenSourceIds: { state: true },
    _attributeMenuOpen: { state: true },
    _tooltip: { state: true },
    _loading: { state: true },
    _error: { state: true },
    _controlsCollapsed: { state: true },
    _activeRangeHours: { state: true }
  };

  static styles = css`
    .history-body {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      gap: 10px;
      overflow: hidden;
    }

    .range-row,
    .selected-row {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      overflow-x: auto;
      padding-bottom: 1px;
    }

    .range-row {
      display: grid;
      grid-template-columns: repeat(5, max-content) minmax(150px, 1fr) minmax(150px, 1fr) max-content;
      overflow: visible;
    }

    .source-row {
      display: grid;
      grid-template-columns: minmax(190px, max-content) minmax(0, 1fr) max-content;
      align-items: center;
      gap: 8px;
      min-width: 0;
      position: relative;
      z-index: 3;
    }

    .controls-header {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 2px;
    }

    .controls-toggle {
      border: 0;
      background: transparent;
      color: var(--equinox-muted-color, var(--secondary-text-color));
      cursor: pointer;
      padding: 2px 6px;
      border-radius: var(--equinox-control-radius, 8px);
      display: flex;
      align-items: center;
      font-size: 11px;
    }

    .controls-toggle:hover {
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.14));
    }

    .controls-toggle ha-icon {
      --mdc-icon-size: 16px;
    }

    .controls-panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .controls-panel[collapsed] {
      display: none;
    }

    .range-btn,
    .entity-btn,
    .entity-trigger,
    .tree-btn,
    .chip,
    .menu-close,
    .load-btn {
      border: 0;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.14));
      color: var(--equinox-text-color, var(--primary-text-color));
      min-height: 30px;
      padding: 0 10px;
      font: inherit;
      font-size: 13px;
      cursor: pointer;
      white-space: nowrap;
    }

    .range-btn[active],
    .entity-btn[active],
    .entity-trigger[open],
    .load-btn {
      background: var(--equinox-boost-color, var(--accent-color));
      color: #fff;
    }

    .range-btn:hover:not([active]) {
      background: color-mix(in srgb, var(--equinox-control-bg, rgba(128, 128, 128, 0.14)) 50%, var(--equinox-boost-color, var(--accent-color)) 50%);
      color: #fff;
    }

    .range-btn[active]:hover {
      filter: brightness(1.1);
    }

    .date-input {
      min-height: 30px;
      border: 0;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.14));
      color: var(--equinox-text-color, var(--primary-text-color));
      padding: 0 8px;
      font: inherit;
      font-size: 13px;
      min-width: 0;
      box-sizing: border-box;
    }

    .entity-input {
      min-width: 190px;
      width: 100%;
    }

    .main {
      display: block;
      gap: 10px;
      min-height: 0;
    }

    .browser,
    .chart-panel {
      min-height: 0;
      overflow: auto;
      border: 1px solid var(--equinox-border-color, var(--divider-color));
      border-radius: var(--equinox-control-radius, 8px);
      background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color)) 88%, var(--equinox-text-color) 4%);
    }

    .browser {
      padding: 8px;
    }

    .entity-picker {
      position: relative;
      min-width: 0;
    }

    .entity-trigger {
      display: inline-grid;
      grid-template-columns: minmax(0, 1fr) 18px;
      align-items: center;
      gap: 6px;
      width: 100%;
      max-width: min(44vw, 320px);
      text-align: left;
    }

    .entity-trigger span {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-trigger ha-icon {
      --mdc-icon-size: 18px;
    }

    .entity-menu {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      display: none;
      width: min(420px, calc(100vw - 48px));
      max-height: min(56vh, 420px);
      padding: 8px;
      overflow: hidden;
      border: 1px solid var(--equinox-border-color, var(--divider-color));
      border-radius: var(--equinox-control-radius, 8px);
      background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color)) 94%, var(--equinox-text-color) 3%);
      box-shadow: 0 14px 36px rgb(0 0 0 / 30%);
      box-sizing: border-box;
    }

    .entity-menu[open] {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr);
      gap: 8px;
    }

    .entity-menu-bar {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: start;
      gap: 8px;
      min-width: 0;
    }

    .entity-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      min-width: 0;
    }

    .menu-close {
      display: none;
      width: 30px;
      min-width: 30px;
      padding: 0;
      align-items: center;
      justify-content: center;
    }

    .menu-close ha-icon {
      --mdc-icon-size: 18px;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 0;
      margin-bottom: 8px;
      color: var(--equinox-muted-color, var(--secondary-text-color));
      font-size: 12px;
    }

    .crumb {
      border: 0;
      background: transparent;
      color: inherit;
      padding: 0;
      font: inherit;
      cursor: pointer;
    }

    .tree {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .tree-btn {
      width: 100%;
      display: grid;
      grid-template-columns: 22px minmax(0, 1fr) auto;
      align-items: center;
      gap: 6px;
      text-align: left;
    }

    .tree-label {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tree-type {
      color: var(--equinox-muted-color, var(--secondary-text-color));
      font-size: 11px;
    }

    .chart-panel {
      padding: 8px;
    }

    .chart-surface {
      position: relative;
    }

    .y-axis-label {
      position: absolute;
      font-size: 10px;
      color: var(--equinox-muted-color, var(--secondary-text-color));
      transform: translateY(-50%);
      white-space: nowrap;
      pointer-events: none;
      box-sizing: border-box;
      line-height: 1;
      z-index: 1;
    }

    .chart-loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .chart-loading-label {
      font-size: 11px;
      color: var(--equinox-muted-color, var(--secondary-text-color));
      background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color)) 92%, #000 8%);
      padding: 3px 10px;
      border-radius: 10px;
      border: 1px solid var(--equinox-border-color, var(--divider-color));
      opacity: 0.88;
    }

    svg {
      width: 100%;
      height: min(48vh, 360px);
      min-height: 260px;
      display: block;
    }

    .axis {
      stroke: var(--equinox-border-color, var(--divider-color));
      stroke-width: 1;
    }

    .scale-label {
      fill: var(--equinox-muted-color, var(--secondary-text-color));
      font-size: 10px;
    }

    .line {
      fill: none;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }

    .point {
      stroke: var(--equinox-card-bg, var(--card-background-color));
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .segment {
      opacity: 0.7;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
      font-size: 12px;
      color: var(--equinox-muted-color, var(--secondary-text-color));
    }

    .tooltip {
      position: absolute;
      z-index: 2;
      min-width: 170px;
      width: max-content;
      max-width: min(300px, calc(100% - 16px));
      padding: 8px;
      border-radius: var(--equinox-control-radius, 8px);
      background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color)) 88%, #000 12%);
      border: 1px solid var(--equinox-border-color, var(--divider-color));
      box-shadow: 0 8px 20px rgb(0 0 0 / 28%);
      color: var(--equinox-text-color, var(--primary-text-color));
      font-size: 12px;
      pointer-events: none;
      box-sizing: border-box;
    }

    .tooltip-time {
      margin-bottom: 6px;
      color: var(--equinox-muted-color, var(--secondary-text-color));
      font-size: 11px;
    }

    .tooltip-row {
      display: grid;
      grid-template-columns: 8px minmax(0, 1fr) auto;
      align-items: center;
      gap: 6px;
      margin-top: 3px;
    }

    .tooltip-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tooltip-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      min-width: 0;
      border: 0;
      background: transparent;
      color: inherit;
      padding: 0;
      font: inherit;
      cursor: pointer;
    }

    .legend-item[hidden-series] {
      opacity: 0.38;
    }

    .legend-count {
      opacity: 0.7;
    }

    .swatch {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex: 0 0 auto;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .chip ha-icon {
      --mdc-icon-size: 16px;
    }

    .empty,
    .error {
      padding: 20px;
      color: var(--equinox-muted-color, var(--secondary-text-color));
      text-align: center;
      font-size: 13px;
    }

    .error {
      color: var(--equinox-danger-color, #ff6b6b);
    }

    @media (max-width: 600px) {
      .history-body {
        height: 100%;
      }

      .range-row {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }

      .range-btn {
        min-width: 0;
        padding: 0 4px;
      }

      .range-row > .date-input,
      .range-row > .load-btn {
        grid-column: 1 / -1;
        width: 100%;
      }

      .source-row {
        grid-template-columns: minmax(0, 1fr) auto;
      }

      .entity-picker {
        grid-column: 1 / -1;
      }

      .entity-trigger {
        max-width: none;
      }

      .entity-menu {
        position: fixed;
        left: 16px;
        right: 16px;
        top: auto;
        bottom: 16px;
        width: auto;
        max-height: min(64vh, 520px);
        z-index: 4;
      }

      .menu-close {
        display: inline-flex;
      }

      .entity-input {
        min-width: 0;
      }

      .main {
        min-height: 0;
      }

      svg {
        min-height: 220px;
        height: 38vh;
      }
    }
  `;

  open = false;
  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  language?: string;
  private _selectedEntityId?: string;
  private _path: string[] = [];
  private _selectedSources: HistorySource[] = [];
  private _series: HistorySeries[] = [];
  private _startInput = "";
  private _endInput = "";
  private _customEntityInput = "";
  private _customEntityIds: string[] = [];
  private _hiddenSourceIds: string[] = [];
  private _attributeMenuOpen = false;
  private _tooltip?: HistoryTooltip;
  private _tooltipSeriesCacheKey = "";
  private _tooltipSeriesCache: TooltipSeries[] = [];
  private _tooltipFrame?: number;
  private _pendingTooltipPoint?: { x: number; y: number };
  private _loading = false;
  private _error = "";
  private _controlsCollapsed = false;
  private _activeRangeHours: number | undefined = DEFAULT_RANGE_HOURS;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("click", this._handleDocumentClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("click", this._handleDocumentClick);
    this._cancelCloseMenuTimer();

    if (this._tooltipFrame !== undefined) {
      cancelAnimationFrame(this._tooltipFrame);
      this._tooltipFrame = undefined;
    }
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("open") && this.open) {
      this._ensureInitialState();
    }
  }

  private _ensureInitialState(): void {
    const now = new Date();
    const start = new Date(now.getTime() - DEFAULT_RANGE_HOURS * 60 * 60 * 1000);

    this._endInput = this._endInput || inputDateValue(now);
    this._startInput = this._startInput || inputDateValue(start);
    this._selectedEntityId = this._selectedEntityId ?? this.config?.entity;

    if (this._selectedSources.length === 0) {
      this._selectedSources = this._defaultSources();
    }

    void this._loadHistory();
  }

  private _entities(): HassEntity[] {
    if (!this.hass || !this.config) {
      return [];
    }

    return [this.config.entity, this.config.diagnostic_entity, this.config.power_entity, this.config.humidity_entity, ...this._customEntityIds]
      .filter((entityId): entityId is string => typeof entityId === "string" && entityId !== "")
      .filter((entityId, index, entityIds) => entityIds.indexOf(entityId) === index)
      .map((entityId) => this.hass?.states[entityId])
      .filter((entity): entity is HassEntity => entity !== undefined);
  }

  private _defaultSources(): HistorySource[] {
    const climate = this.config?.entity ? this.hass?.states[this.config.entity] : undefined;
    const sources = [
      climate ? attributeSource(climate, ["current_temperature"], localize(this.language, "dialog.history.sources.current_temperature")) : undefined,
      climate ? attributeSource(climate, ["temperature"], localize(this.language, "dialog.history.sources.temperature")) : undefined,
      climate ? attributeSource(climate, ["hvac_action"], localize(this.language, "dialog.history.sources.hvac_action")) : undefined
    ].filter((source): source is HistorySource => source !== undefined);

    return sources;
  }

  private _selectedEntity(): HassEntity | undefined {
    return this._selectedEntityId && this.hass ? this.hass.states[this._selectedEntityId] : undefined;
  }

  private _entityLabel(entity: HassEntity): string {
    return typeof entity.attributes.friendly_name === "string" ? entity.attributes.friendly_name : entity.entity_id;
  }

  private _selectEntity(entityId: string): void {
    this._selectedEntityId = entityId;
    this._path = [];
    this._attributeMenuOpen = true;
  }

  private _toggleAttributeMenu(): void {
    this._attributeMenuOpen = !this._attributeMenuOpen;
  }

  private _closeAttributeMenu(): void {
    this._attributeMenuOpen = false;
  }

  private _closeMenuTimer?: number;

  private _scheduleCloseMenuOnDesktop(): void {
    if (window.innerWidth <= 600) return;
    this._closeMenuTimer = window.setTimeout(() => {
      this._closeMenuTimer = undefined;
      this._closeAttributeMenu();
    }, 150);
  }

  private _cancelCloseMenuTimer(): void {
    if (this._closeMenuTimer !== undefined) {
      window.clearTimeout(this._closeMenuTimer);
      this._closeMenuTimer = undefined;
    }
  }

  private _handleDocumentClick = (event: Event): void => {
    if (!this._attributeMenuOpen) return;
    const picker = this.renderRoot?.querySelector(".entity-picker");
    if (!picker || !event.composedPath().includes(picker)) {
      this._closeAttributeMenu();
    }
  };

  private _toggleControls(): void {
    this._controlsCollapsed = !this._controlsCollapsed;
  }

  private _setRange(hours: number): void {
    const end = new Date();
    const start = new Date(end.getTime() - hours * 60 * 60 * 1000);

    this._startInput = inputDateValue(start);
    this._endInput = inputDateValue(end);
    this._activeRangeHours = hours;
    void this._loadHistory();
  }

  private _setStart(event: Event): void {
    this._startInput = (event.currentTarget as HTMLInputElement).value;
    this._activeRangeHours = undefined;
  }

  private _setEnd(event: Event): void {
    this._endInput = (event.currentTarget as HTMLInputElement).value;
    this._activeRangeHours = undefined;
  }

  private _setCustomEntity(event: Event): void {
    this._customEntityInput = (event.currentTarget as HTMLInputElement).value.trim();
  }

  private _addCustomEntity(): void {
    if (!this.hass?.states[this._customEntityInput] || this._customEntityIds.includes(this._customEntityInput)) {
      return;
    }

    this._customEntityIds = [...this._customEntityIds, this._customEntityInput];
    this._selectedEntityId = this._customEntityInput;
    this._customEntityInput = "";
    this._path = [];
    this._attributeMenuOpen = true;
  }

  private _addSource(source: HistorySource): void {
    if (this._selectedSources.some((selected) => selected.id === source.id)) {
      return;
    }

    this._selectedSources = [...this._selectedSources, source];
    this._attributeMenuOpen = window.innerWidth <= 600 ? false : this._attributeMenuOpen;
    void this._loadHistory();
  }

  private _removeSource(sourceId: string): void {
    this._selectedSources = this._selectedSources.filter((source) => source.id !== sourceId);
    this._hiddenSourceIds = this._hiddenSourceIds.filter((hiddenSourceId) => hiddenSourceId !== sourceId);
    void this._loadHistory();
  }

  private _toggleSeries(sourceId: string): void {
    this._hiddenSourceIds = this._hiddenSourceIds.includes(sourceId)
      ? this._hiddenSourceIds.filter((hiddenSourceId) => hiddenSourceId !== sourceId)
      : [...this._hiddenSourceIds, sourceId];
  }

  private async _loadHistory(): Promise<void> {
    const start = dateFromInput(this._startInput);
    const end = dateFromInput(this._endInput);

    if (!this.hass || !start || !end || this._selectedSources.length === 0) {
      this._series = [];
      return;
    }

    this._loading = true;
    this._error = "";

    try {
      this._series = await fetchHistory(this.hass, this._selectedSources, start, end);
    } catch (error) {
      this._error = error instanceof Error ? error.message : String(error);
      this._series = [];
    } finally {
      this._loading = false;
    }
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _renderSources(): TemplateResult {
    const entities = this._entities();
    const selectedEntity = this._selectedEntity();

    return html`
      <div class="source-row">
        <div class="entity-picker"
          @mouseleave=${this._scheduleCloseMenuOnDesktop}
          @mouseenter=${this._cancelCloseMenuTimer}
        >
          <button class="entity-trigger" ?open=${this._attributeMenuOpen} @click=${this._toggleAttributeMenu}>
            <span>${selectedEntity ? this._entityLabel(selectedEntity) : localize(this.language, "editor.entity")}</span>
            <ha-icon icon=${this._attributeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
          </button>
          <div class="entity-menu" ?open=${this._attributeMenuOpen}
            @mouseenter=${this._cancelCloseMenuTimer}
            @mouseleave=${this._scheduleCloseMenuOnDesktop}
          >
            <div class="entity-menu-bar">
              <div class="entity-list">
                ${entities.map(
                  (entity) => html`
                    <button
                      class="entity-btn"
                      ?active=${entity.entity_id === this._selectedEntityId}
                      @click=${() => this._selectEntity(entity.entity_id)}
                    >
                      ${this._entityLabel(entity)}
                    </button>
                  `
                )}
              </div>
              <button
                class="menu-close"
                aria-label=${localize(this.language, "dialog.close")}
                title=${localize(this.language, "dialog.close")}
                @click=${this._closeAttributeMenu}
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
            <div class="browser">${this._renderBrowser()}</div>
          </div>
        </div>
        <input
          class="date-input entity-input"
          placeholder=${localize(this.language, "dialog.history.add_entity")}
          .value=${this._customEntityInput}
          @input=${this._setCustomEntity}
          @keydown=${(event: KeyboardEvent) => {
            if (event.key === "Enter") {
              this._addCustomEntity();
            }
          }}
        />
        <button class="entity-btn" @click=${this._addCustomEntity}>${localize(this.language, "dialog.history.add")}</button>
      </div>
    `;
  }

  private _renderBrowser(): TemplateResult {
    const entity = this._selectedEntity();
    const current = entity ? readPath(entity.attributes, this._path) : undefined;

    if (!entity || !isRecord(current)) {
      return html`<div class="empty">${localize(this.language, "dialog.history.no_attributes")}</div>`;
    }

    const entries = Object.entries(current).sort(([left], [right]) => left.localeCompare(right));

    return html`
      <div class="breadcrumb">
        <button class="crumb" @click=${() => { this._path = []; }}>${entity.entity_id}</button>
        ${this._path.map(
          (part, index) => html`
            <span>/</span>
            <button class="crumb" @click=${() => { this._path = this._path.slice(0, index + 1); }}>${part}</button>
          `
        )}
      </div>
      <div class="tree">
        ${this._path.length > 0
          ? html`
              <button class="tree-btn" @click=${() => { this._path = this._path.slice(0, -1); }}>
                <ha-icon icon="mdi:arrow-left"></ha-icon>
                <span class="tree-label">${localize(this.language, "dialog.back")}</span>
                <span></span>
              </button>
            `
          : this._renderStateEntry(entity)}
        ${entries.map(([key, value]) => this._renderTreeEntry(entity, key, value))}
      </div>
    `;
  }

  private _renderStateEntry(entity: HassEntity): TemplateResult | typeof nothing {
    const source = entityStateSource(entity);

    if (!source) {
      return nothing;
    }

    return html`
      <button class="tree-btn" @click=${() => this._addSource(source)}>
        <ha-icon icon="mdi:chart-line"></ha-icon>
        <span class="tree-label">state</span>
        <span class="tree-type">${source.valueType}</span>
      </button>
    `;
  }

  private _renderTreeEntry(entity: HassEntity, key: string, value: unknown): TemplateResult | typeof nothing {
    if (isRecord(value)) {
      return html`
        <button class="tree-btn" @click=${() => { this._path = [...this._path, key]; }}>
          <ha-icon icon="mdi:folder-outline"></ha-icon>
          <span class="tree-label">${key}</span>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      `;
    }

    const type = valueType(value);
    const path = [...this._path, key];
    const source = type ? attributeSource(entity, path) : undefined;

    if (!source) {
      return nothing;
    }

    return html`
      <button class="tree-btn" @click=${() => this._addSource(source)}>
        <ha-icon icon=${type === "number" ? "mdi:chart-line" : "mdi:timeline-text-outline"}></ha-icon>
        <span class="tree-label">${key}</span>
        <span class="tree-type">${type}</span>
      </button>
    `;
  }

  private _renderSelected(): TemplateResult {
    return html`
      <div class="selected-row">
        ${this._selectedSources.map(
          (source) => html`
            <button class="chip" @click=${() => this._removeSource(source.id)}>
              <span>${source.label}</span>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          `
        )}
      </div>
    `;
  }

  private _renderChart(): TemplateResult {
    if (this._error) {
      return html`<div class="error">${this._error}</div>`;
    }

    if (this._series.length === 0) {
      return html`<div class="empty">${localize(this.language, this._loading ? "dialog.history.loading" : "dialog.history.empty")}</div>`;
    }

    const visibleSeries = this._visibleSeries();

    return html`
      ${visibleSeries.length === 0 || visibleSeries.every((series) => series.points.length === 0)
        ? html`<div class="empty">${localize(this.language, "dialog.history.empty")}</div>`
        : html`
            <div class="chart-surface">
              <svg
                viewBox="0 0 ${CHART_WIDTH} ${this._chartHeight()}"
                preserveAspectRatio="none"
                @pointermove=${this._updateTooltip}
                @pointerleave=${this._clearTooltip}
                @touchstart=${this._updateTooltip}
                @touchmove=${this._updateTooltip}
              >
                <line class="axis" x1=${PLOT_LEFT} y1=${PLOT_TOP} x2=${PLOT_LEFT} y2=${PLOT_BOTTOM}></line>
                <line class="axis" x1=${PLOT_LEFT} y1=${PLOT_BOTTOM} x2=${PLOT_RIGHT} y2=${PLOT_BOTTOM}></line>
                ${this._renderScaleLabels()}
                ${this._renderNumericLines()}
                ${this._renderSegments()}
                ${this._renderTooltipGuide()}
              </svg>
              ${this._renderYAxisLabels()}
              ${this._renderTooltip()}
              ${this._loading
                ? html`<div class="chart-loading-overlay"><span class="chart-loading-label">${localize(this.language, "dialog.history.loading")}</span></div>`
                : nothing}
            </div>
          `}
      <div class="legend">
        ${this._series.map(
          (series, index) => html`
            <button
              class="legend-item"
              ?hidden-series=${this._hiddenSourceIds.includes(series.source.id)}
              @click=${() => this._toggleSeries(series.source.id)}
            >
              <span class="swatch" style=${`background: ${sourceColor(index)}`}></span>
              <span>${series.source.label}</span>
              <span class="legend-count">${series.points.length}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  private _formatTooltipValue(value: number | string | boolean): string {
    return typeof value === "number" ? value.toFixed(Math.abs(value) < 10 ? 3 : 1) : String(value);
  }

  private _tooltipSeries(): TooltipSeries[] {
    const key = `${this._series.map((series) => `${series.source.id}:${series.points.length}`).join("|")}::${this._hiddenSourceIds.join("|")}`;

    if (key === this._tooltipSeriesCacheKey) {
      return this._tooltipSeriesCache;
    }

    this._tooltipSeriesCacheKey = key;
    this._tooltipSeriesCache = this._visibleSeries()
      .filter((series) => series.points.length > 0)
      .map((series) => {
        const colorIndex = this._series.findIndex((candidate) => candidate.source.id === series.source.id);

        return {
          id: series.source.id,
          label: series.source.label,
          color: sourceColor(colorIndex),
          points: series.points.map((point) => ({ time: point.time, value: point.value }))
        };
      });

    return this._tooltipSeriesCache;
  }

  private _nearestPoint(points: TooltipPoint[], time: number): TooltipPoint | undefined {
    if (points.length === 0) {
      return undefined;
    }

    let low = 0;
    let high = points.length - 1;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);

      if (points[mid].time < time) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    const current = points[low];
    const previous = low > 0 ? points[low - 1] : undefined;

    return previous && Math.abs(previous.time - time) < Math.abs(current.time - time) ? previous : current;
  }

  private _timeFromSvgX(x: number): number {
    const bounds = this._timeBounds();
    const ratio = Math.min(Math.max((x - PLOT_LEFT) / PLOT_WIDTH, 0), 1);

    return bounds.start + ratio * (bounds.end - bounds.start);
  }

  private _eventSvgPoint(event: PointerEvent | TouchEvent): { x: number; y: number } | undefined {
    const svgElement = event.currentTarget instanceof SVGSVGElement ? event.currentTarget : undefined;
    const client = event instanceof TouchEvent ? event.touches[0] : event;

    if (!svgElement || !client) {
      return undefined;
    }

    const rect = svgElement.getBoundingClientRect();

    return {
      x: ((client.clientX - rect.left) / rect.width) * CHART_WIDTH,
      y: ((client.clientY - rect.top) / rect.height) * this._chartHeight()
    };
  }

  private _updateTooltip(event: PointerEvent | TouchEvent): void {
    const point = this._eventSvgPoint(event);

    if (!point) {
      return;
    }

    if (event instanceof TouchEvent) {
      event.preventDefault();
    }

    this._pendingTooltipPoint = point;

    if (this._tooltipFrame !== undefined) {
      return;
    }

    this._tooltipFrame = requestAnimationFrame(() => {
      this._tooltipFrame = undefined;
      this._applyTooltipUpdate();
    });
  }

  private _applyTooltipUpdate(): void {
    const point = this._pendingTooltipPoint;

    if (!point) {
      return;
    }

    const targetTime = this._timeFromSvgX(point.x);
    const values = this._tooltipSeries().flatMap((series) => {
      const nearest = this._nearestPoint(series.points, targetTime);

      return nearest
        ? [{
            label: series.label,
            color: series.color,
            value: this._formatTooltipValue(nearest.value)
          }]
        : [];
    });

    if (values.length === 0) {
      this._tooltip = undefined;
      return;
    }

    this._tooltip = {
      x: Math.min(Math.max(point.x, 120), CHART_WIDTH - 120),
      y: Math.min(Math.max(point.y, 28), this._chartHeight() - 28),
      time: targetTime,
      values
    };
  }

  private _clearTooltip(): void {
    this._pendingTooltipPoint = undefined;
    this._tooltip = undefined;
  }

  private _renderTooltipGuide() {
    return this._tooltip
      ? svg`<line class="axis" x1=${this._tooltip.x} y1="18" x2=${this._tooltip.x} y2=${this._chartHeight() - 10}></line>`
      : nothing;
  }

  private _renderTooltip(): TemplateResult | typeof nothing {
    if (!this._tooltip) {
      return nothing;
    }

    const leftPercent = (this._tooltip.x / CHART_WIDTH) * 100;
    const topPercent = (this._tooltip.y / this._chartHeight()) * 100;
    const placement = topPercent > 58 ? "translate(-50%, calc(-100% - 10px))" : "translate(-50%, 10px)";

    return html`
      <div
        class="tooltip"
        style=${`left: clamp(150px, ${leftPercent}%, calc(100% - 150px)); top: clamp(8px, ${topPercent}%, calc(100% - 8px)); transform: ${placement};`}
      >
        <div class="tooltip-time">${new Date(this._tooltip.time).toLocaleString()}</div>
        ${this._tooltip.values.map(
          (value) => html`
            <div class="tooltip-row">
              <span class="tooltip-dot" style=${`background: ${value.color}`}></span>
              <span class="tooltip-label">${value.label}</span>
              <span>${value.value}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  private _visibleSeries(): HistorySeries[] {
    return this._series.filter((series) => !this._hiddenSourceIds.includes(series.source.id));
  }

  private _timeBounds(): { start: number; end: number } {
    const start = dateFromInput(this._startInput)?.getTime() ?? Date.now() - DEFAULT_RANGE_HOURS * 60 * 60 * 1000;
    const end = dateFromInput(this._endInput)?.getTime() ?? Date.now();

    return { start, end: Math.max(end, start + 1) };
  }

  private _x(time: number): number {
    const bounds = this._timeBounds();

    return PLOT_LEFT + ((time - bounds.start) / (bounds.end - bounds.start)) * PLOT_WIDTH;
  }

  private _chartHeight(): number {
    const segmentCount = this._visibleSeries().filter((series) => series.source.valueType !== "number").length;

    return CHART_HEIGHT + Math.max(segmentCount - 1, 0) * 14;
  }

  private _numericScales(): NumericScale[] {
    const numericSeries = this._visibleSeries().filter((series) => series.source.valueType === "number" && series.points.length > 0);
    const groups: Array<{ series: HistorySeries[]; min: number; max: number }> = [];

    for (const series of numericSeries) {
      const values = series.points.map((point) => Number(point.value)).filter((value) => Number.isFinite(value));

      if (values.length === 0) {
        continue;
      }

      const min = Math.min(...values);
      const max = Math.max(...values);
      const center = (min + max) / 2;
      const compatible = groups.find((group) => {
        const groupCenter = (group.min + group.max) / 2;
        const distance = Math.abs(center - groupCenter);
        const reference = Math.max(Math.abs(center), Math.abs(groupCenter), 1);

        return distance / reference < 0.35;
      });

      if (compatible) {
        compatible.series.push(series);
        compatible.min = Math.min(compatible.min, min);
        compatible.max = Math.max(compatible.max, max);
      } else {
        groups.push({ series: [series], min, max });
      }
    }

    const bandHeight = 190 / Math.max(groups.length, 1);

    return groups.map((group, index) => ({
      ids: new Set(group.series.map((series) => series.source.id)),
      min: group.min,
      max: group.max,
      top: 28 + index * bandHeight,
      height: Math.max(bandHeight - 10, 32)
    }));
  }

  private _scaleFor(series: HistorySeries, scales: NumericScale[]): NumericScale | undefined {
    return scales.find((scale) => scale.ids.has(series.source.id));
  }

  private _y(value: number, scale: NumericScale): number {
    const span = Math.max(scale.max - scale.min, 1e-9);

    return scale.top + scale.height - ((value - scale.min) / span) * scale.height;
  }

  private _fmtAxisVal(v: number): string {
    const abs = Math.abs(v);

    if (abs >= 1000) return v.toFixed(0);
    if (abs >= 10) return v.toFixed(1);

    return v.toFixed(2);
  }

  private _renderScaleLabels() {
    const scales = this._numericScales();
    const hasRightScale = scales.length > 1;
    const result = [];

    if (hasRightScale) {
      result.push(svg`<line class="axis" x1=${PLOT_RIGHT} y1=${PLOT_TOP} x2=${PLOT_RIGHT} y2=${PLOT_BOTTOM}></line>`);
    }

    for (const [index, scale] of scales.entries()) {
      const onLeft = index % 2 === 0;
      const tickX1 = onLeft ? PLOT_LEFT - 4 : PLOT_RIGHT;
      const tickX2 = onLeft ? PLOT_LEFT : PLOT_RIGHT + 4;
      const ticks = [scale.top + scale.height, scale.top + scale.height / 2, scale.top];

      result.push(svg`<line class="axis" x1=${PLOT_LEFT} y1=${scale.top} x2=${PLOT_RIGHT} y2=${scale.top}></line>`);

      for (const y of ticks) {
        result.push(svg`<line class="axis" x1=${tickX1} y1=${y} x2=${tickX2} y2=${y}></line>`);
      }
    }

    return result;
  }

  private _renderYAxisLabels() {
    const scales = this._numericScales();
    const chartH = this._chartHeight();
    const leftWidthPct = ((PLOT_LEFT / CHART_WIDTH) * 100).toFixed(2);
    const rightStartPct = ((PLOT_RIGHT / CHART_WIDTH) * 100).toFixed(2);

    return scales.flatMap((scale, index) => {
      const onLeft = index % 2 === 0;
      const sideStyle = onLeft
        ? `left:0;width:${leftWidthPct}%;text-align:right;padding-right:5px;`
        : `left:${rightStartPct}%;right:0;padding-left:5px;`;
      const ticks = [
        { y: scale.top + scale.height, v: scale.min },
        { y: scale.top + scale.height / 2, v: (scale.min + scale.max) / 2 },
        { y: scale.top, v: scale.max }
      ];

      return ticks.map(({ y, v }) =>
        html`<span class="y-axis-label" style="top:${((y / chartH) * 100).toFixed(2)}%;${sideStyle}">${this._fmtAxisVal(v)}</span>`
      );
    });
  }

  private _renderNumericLines() {
    const numericSeries = this._visibleSeries().filter((series) => series.source.valueType === "number");
    const scales = this._numericScales();

    return numericSeries.flatMap((series) => {
      const scale = this._scaleFor(series, scales);

      if (!scale) {
        return [];
      }

      const colorIndex = this._series.findIndex((candidate) => candidate.source.id === series.source.id);

      return [
        svg`<polyline
          class="line"
          points=${series.points
            .map((point) => {
              const x = this._x(point.time);
              const y = this._y(Number(point.value), scale);

              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(" ")}
          stroke=${sourceColor(colorIndex)}
        ></polyline>`,
        ...series.points
          .filter((_, pointIndex) => pointIndex === 0 || pointIndex === series.points.length - 1)
          .map((point) => {
            const x = this._x(point.time);
            const y = this._y(Number(point.value), scale);

            return svg`<circle class="point" cx=${x} cy=${y} r="3" fill=${sourceColor(colorIndex)}></circle>`;
          })
      ];
    });
  }

  private _renderSegments() {
    const bounds = this._timeBounds();
    const rowHeight = 14;
    const top = 236;
    let segmentIndex = 0;

    return this._visibleSeries().flatMap((series) => {
      if (series.source.valueType === "number") {
        return [];
      }

      const y = top + segmentIndex * rowHeight;
      const colorIndex = this._series.findIndex((candidate) => candidate.source.id === series.source.id);
      segmentIndex += 1;

      return series.points.map((point, pointIndex) => {
        const next = series.points[pointIndex + 1]?.time ?? bounds.end;
        const x = this._x(point.time);
        const width = Math.max(this._x(next) - x, 1);
        const valueOn = point.value === true || (typeof point.value === "string" && !["off", "idle", "none", "false"].includes(point.value));

        return svg`
          <rect
            class="segment"
            x=${x}
            y=${y}
            width=${width}
            height="9"
            fill=${valueOn ? sourceColor(colorIndex) : "var(--equinox-muted-color, #777)"}
          ></rect>
        `;
      });
    });
  }

  protected render(): TemplateResult {
    return html`
      <eq-dialog
        .open=${this.open}
        .title=${localize(this.language, "dialog.history.title")}
        .language=${this.language}
        .noScroll=${true}
        .lightbox=${true}
        @eq-dialog-close=${this._dispatchClose}
      >
        <div class="history-body">
          <div>
            <div class="controls-header">
              <button class="controls-toggle" @click=${this._toggleControls}>
                <ha-icon icon=${this._controlsCollapsed ? "mdi:chevron-down" : "mdi:chevron-up"}></ha-icon>
              </button>
            </div>
            <div class="controls-panel" ?collapsed=${this._controlsCollapsed}>
              <div class="range-row">
                ${RANGE_HOURS.map(
                  (hours) => html`
                    <button class="range-btn" ?active=${this._activeRangeHours === hours} @click=${() => this._setRange(hours)}>
                      ${hours < 24 ? `${hours}h` : `${hours / 24}j`}
                    </button>
                  `
                )}
                <input class="date-input" type="datetime-local" .value=${this._startInput} @change=${this._setStart} />
                <input class="date-input" type="datetime-local" .value=${this._endInput} @change=${this._setEnd} />
                <button class="load-btn" @click=${this._loadHistory}>${localize(this.language, "dialog.history.load")}</button>
              </div>
              ${this._renderSources()}
            </div>
          </div>
          <div class="main">
            <div class="chart-panel">${this._renderChart()}</div>
          </div>
          ${this._renderSelected()}
        </div>
      </eq-dialog>
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
