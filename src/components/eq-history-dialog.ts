import { LitElement, css, html, nothing, svg, type PropertyValues, type TemplateResult } from "lit";
import { attributeSource, entityStateSource, fetchHistory, valueType, type HistorySeries, type HistorySource } from "../data/history";
import { ensureDateRangePicker } from "../ha/load-components";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/ha";

const RANGE_HOURS = [1, 6, 24, 72, 168];
const DEFAULT_RANGE_HOURS = 24;
const CHART_WIDTH = 720;
const PLOT_LEFT = 40;
const PLOT_RIGHT = 680;
const PLOT_WIDTH = PLOT_RIGHT - PLOT_LEFT;
const PLOT_TOP = 18;
const GRAPH_TOP = 28;
const GRAPH_HEIGHT = 180;
const GRAPH_GAP = 34;
const GRAPH_BOTTOM_PADDING = 18;
const GRAPH_STEP = GRAPH_HEIGHT + GRAPH_GAP;

interface NumericScale {
  ids: Set<string>;
  min: number;
  max: number;
  precision: number;
  top: number;
  height: number;
}

interface NumericPoint {
  time: number;
  value: number;
}

interface NumericLineRenderData {
  id: string;
  color: string;
  points: string;
}

interface SegmentRenderData {
  id: string;
  x: number;
  y: number;
  width: number;
  fill: string;
}

interface HeatingAreaRenderData {
  id: string;
  points: string;
}

interface YAxisLabelRenderData {
  y: number;
  value: string;
}

interface ChartRenderData {
  visibleSeries: HistorySeries[];
  timeBounds: { start: number; end: number };
  numericScales: NumericScale[];
  plotBottom: number;
  chartHeight: number;
  numericLines: NumericLineRenderData[];
  segments: SegmentRenderData[];
  heatingAreas: HeatingAreaRenderData[];
  yAxisLabels: YAxisLabelRenderData[];
}

interface ChartRenderCache {
  seriesRef: HistorySeries[];
  hiddenKey: string;
  startTime: number;
  endTime: number;
  data: ChartRenderData;
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
    _startDate: { state: true },
    _endDate: { state: true },
    _customEntityInput: { state: true },
    _customEntityIds: { state: true },
    _hiddenSourceIds: { state: true },
    _attributeMenuOpen: { state: true },
    _tooltip: { state: true },
    _loading: { state: true },
    _error: { state: true },
    _controlsCollapsed: { state: true },
    _activeRangeHours: { state: true },
    _fullscreen: { state: true }
  };

  static styles = css`
    .history-body {
      width: 100%;
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      gap: 10px;
      overflow: hidden;
    }

    .selected-row {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      overflow-x: auto;
      padding-bottom: 1px;
    }

    .range-row {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow: visible;
      position: relative;
      z-index: 3;
    }

    .dialog-fullscreen-btn {
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
    }

    .dialog-fullscreen-btn:hover {
      background: rgba(128, 128, 128, 0.15);
    }

    .controls-shell {
      width: max-content;
      max-width: 100%;
      margin-left: auto;
    }

    .controls-panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: max-content;
      max-width: 100%;
    }

    .controls-panel[collapsed] {
      display: none;
    }

    .range-btn,
    .entity-btn,
    .entity-trigger,
    .tree-btn,
    .chip,
    .menu-close {
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
    .entity-trigger[open] {
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

    .main {
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .browser,
    .chart-panel {
      min-height: 0;
      border: 1px solid var(--equinox-border-color, var(--divider-color));
      border-radius: var(--equinox-control-radius, 8px);
      background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color)) 88%, var(--equinox-text-color) 4%);
    }

    .browser {
      overflow: auto;
      padding: 8px;
    }

    .chart-panel {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .entity-picker {
      position: relative;
      width: 170px;
      flex-shrink: 0;
    }

    .entity-trigger {
      display: inline-grid;
      grid-template-columns: minmax(0, 1fr) 18px;
      align-items: center;
      gap: 6px;
      width: 100%;
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
      grid-template-rows: auto auto minmax(0, 1fr);
      gap: 8px;
    }

    .entity-menu-top {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .entity-menu-top ha-entity-picker {
      display: block;
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
      overflow-y: auto;
      flex: 1;
      min-height: 0;
    }

    .y-axis-label {
      position: absolute;
      font-size: 11px;
      color: var(--equinox-muted-color, var(--secondary-text-color));
      transform: translateY(-50%);
      white-space: nowrap;
      pointer-events: none;
      box-sizing: border-box;
      line-height: 1;
      z-index: 1;
    }

    .chart-tooltip-clip {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      pointer-events: none;
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
      display: block;
    }

    .axis {
      stroke: var(--equinox-border-color, var(--divider-color));
      stroke-width: 1;
    }

    .graph-separator {
      stroke: color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 64%, var(--equinox-text-color, var(--primary-text-color)) 36%);
      stroke-width: 1.2;
      stroke-dasharray: 3 5;
    }

    .scale-label {
      fill: var(--equinox-muted-color, var(--secondary-text-color));
      font-size: 10px;
      pointer-events: none;
    }

    .line {
      fill: none;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }

    .segment {
      opacity: 0.7;
    }

    .climate-heating-area {
      fill: var(--equinox-boost-color, var(--accent-color));
      opacity: 0.22;
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

    .swatch {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex: 0 0 auto;
      box-sizing: border-box;
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
      .dialog-fs-toggle {
        display: none;
      }

      .controls-shell,
      .controls-panel {
        width: 100%;
      }

      .range-row {
        flex-wrap: wrap;
      }

      .range-row > .entity-picker {
        width: 100%;
      }

      .range-btn {
        flex: 1;
        min-width: 0;
        padding: 0 4px;
      }

      .entity-menu {
        position: fixed;
        left: 16px;
        right: 16px;
        top: auto;
        bottom: auto;
        width: auto;
        max-height: min(64vh, 420px);
        z-index: 100;
      }

      .menu-close {
        display: inline-flex;
      }

      .main {
        min-height: 0;
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
  private _startDate?: Date;
  private _endDate?: Date;
  private _customEntityInput = "";
  private _customEntityIds: string[] = [];
  private _hiddenSourceIds: string[] = [];
  private _attributeMenuOpen = false;
  private _tooltip?: HistoryTooltip;
  private _tooltipSeriesCacheSeriesRef?: HistorySeries[];
  private _tooltipSeriesCacheKey = "";
  private _tooltipSeriesCache: TooltipSeries[] = [];
  private _tooltipFrame?: number;
  private _pendingTooltipPoint?: { x: number; y: number };
  private _chartRenderCache?: ChartRenderCache;
  private _loading = false;
  private _error = "";
  private _controlsCollapsed = true;
  private _activeRangeHours: number | undefined = DEFAULT_RANGE_HOURS;
  private _fullscreen = false;
  private _entityPickerOpen = false;
  private _isMouseOutsideEntityPicker = false;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("click", this._handleDocumentClick);
    void ensureDateRangePicker().then(() => this.requestUpdate());
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
    if (changed.has("_attributeMenuOpen") && this._attributeMenuOpen) {
      this._positionEntityMenuMobile();
    }
  }

  private _positionEntityMenuMobile(): void {
    if (window.innerWidth > 600) return;
    const trigger = this.renderRoot?.querySelector(".entity-trigger") as HTMLElement | null;
    const menu = this.renderRoot?.querySelector(".entity-menu") as HTMLElement | null;
    if (!trigger || !menu) return;
    const rect = trigger.getBoundingClientRect();
    menu.style.top = `${rect.bottom + 6}px`;
  }

  private _ensureInitialState(): void {
    const now = new Date();
    const start = new Date(now.getTime() - DEFAULT_RANGE_HOURS * 60 * 60 * 1000);

    this._controlsCollapsed = true;
    this._endDate = this._endDate ?? now;
    this._startDate = this._startDate ?? start;
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
    this._isMouseOutsideEntityPicker = false;
    this._entityPickerOpen = false;
  }

  private _closeMenuTimer?: number;

  private _scheduleCloseMenuOnDesktop(): void {
    if (window.innerWidth <= 600) return;
    this._isMouseOutsideEntityPicker = true;
    if (this._entityPickerOpen) return;
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
    this._isMouseOutsideEntityPicker = false;
  }

  private _onEntityPickerOpened(): void {
    this._entityPickerOpen = true;
    this._cancelCloseMenuTimer();
  }

  private _onEntityPickerFocusOut(): void {
    this._entityPickerOpen = false;
    if (this._isMouseOutsideEntityPicker) {
      this._closeAttributeMenu();
    }
  }

  private _onEntityPickerClosed(): void {
    this._entityPickerOpen = false;
    if (this._isMouseOutsideEntityPicker) {
      this._closeAttributeMenu();
    }
  }

  private _handleDocumentClick = (event: Event): void => {
    if (!this._attributeMenuOpen || this._entityPickerOpen) return;
    const picker = this.renderRoot?.querySelector(".entity-picker");
    if (!picker || !event.composedPath().includes(picker)) {
      this._closeAttributeMenu();
    }
  };

  private _toggleControls(): void {
    this._controlsCollapsed = !this._controlsCollapsed;
  }

  private _toggleFullscreen(): void {
    this._fullscreen = !this._fullscreen;
  }

  private _setRange(hours: number): void {
    const end = new Date();
    const start = new Date(end.getTime() - hours * 60 * 60 * 1000);

    this._startDate = start;
    this._endDate = end;
    this._activeRangeHours = hours;
    void this._loadHistory();
  }

  private _onDateRangeChanged(event: CustomEvent): void {
    const { startDate, endDate } = event.detail as { startDate: Date; endDate: Date };
    this._startDate = startDate;
    this._endDate = endDate;
    this._activeRangeHours = undefined;
    void this._loadHistory();
  }

  private _onEntityPickerChanged(event: CustomEvent): void {
    const entityId = (event.detail as { value: string }).value;

    if (!entityId) {
      return;
    }

    const knownIds = new Set(this._entities().map((entity) => entity.entity_id));

    if (!knownIds.has(entityId)) {
      this._customEntityIds = [...this._customEntityIds, entityId];
    }

    this._selectedEntityId = entityId;
    this._path = [];
    this._customEntityInput = "";
    this._isMouseOutsideEntityPicker = false;
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
    const start = this._startDate;
    const end = this._endDate;

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

  private _renderEntityPicker(): TemplateResult {
    const entities = this._entities();
    const selectedEntity = this._selectedEntity();

    return html`
      <div class="entity-picker"
        @mouseleave=${this._scheduleCloseMenuOnDesktop}
        @mouseenter=${this._cancelCloseMenuTimer}
        @picker-opened=${this._onEntityPickerOpened}
        @picker-closed=${this._onEntityPickerClosed}
      >
        <button class="entity-trigger" ?open=${this._attributeMenuOpen} @click=${this._toggleAttributeMenu}>
          <span>${selectedEntity ? this._entityLabel(selectedEntity) : localize(this.language, "editor.entity")}</span>
          <ha-icon icon=${this._attributeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        <div class="entity-menu" ?open=${this._attributeMenuOpen}>
          <div class="entity-menu-top">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._customEntityInput}
              .placeholder=${localize(this.language, "dialog.history.add_entity")}
              @value-changed=${this._onEntityPickerChanged}
              @focusin=${this._onEntityPickerOpened}
              @focusout=${this._onEntityPickerFocusOut}
            ></ha-entity-picker>
            <button
              class="menu-close"
              aria-label=${localize(this.language, "dialog.close")}
              title=${localize(this.language, "dialog.close")}
              @click=${this._closeAttributeMenu}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
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
          <div class="browser">${this._renderBrowser()}</div>
        </div>
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

    const chartData = this._chartData();

    return html`
      ${chartData.visibleSeries.length === 0 || chartData.visibleSeries.every((series) => series.points.length === 0)
        ? html`<div class="empty">${localize(this.language, "dialog.history.empty")}</div>`
        : html`
            <div class="chart-surface">
              <svg
                viewBox="0 0 ${CHART_WIDTH} ${chartData.chartHeight}"
                height="${chartData.chartHeight}"
                preserveAspectRatio="none"
                @pointermove=${this._updateTooltip}
                @pointerleave=${this._clearTooltip}
                @touchstart=${this._updateTooltip}
                @touchmove=${this._updateTooltip}
              >
                <line class="axis" x1=${PLOT_LEFT} y1=${PLOT_TOP} x2=${PLOT_LEFT} y2=${chartData.plotBottom}></line>
                <line class="axis" x1=${PLOT_LEFT} y1=${chartData.plotBottom} x2=${PLOT_RIGHT} y2=${chartData.plotBottom}></line>
                ${this._renderScaleLabels(chartData)}
                ${this._renderClimateHeatingAreas(chartData)}
                ${this._renderNumericLines(chartData)}
                ${this._renderSegments(chartData)}
                ${this._renderTooltipGuide(chartData)}
              </svg>
              ${this._renderYAxisLabels(chartData)}
              <div class="chart-tooltip-clip" style="height: ${chartData.chartHeight}px">
                ${this._renderTooltip()}
              </div>
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
              <span class="swatch" style=${this._legendSwatchStyle(series, index)}></span>
              <span>${series.source.label}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  private _formatTooltipValue(value: number | string | boolean): string {
    return String(value);
  }

  private _legendSwatchStyle(series: HistorySeries, index: number): string {
    if (this._isClimateHvacActionSource(series.source)) {
      return "background: color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 22%, transparent); border: 1px solid var(--equinox-boost-color, var(--accent-color));";
    }

    return `background: ${this._seriesColor(series, index)}`;
  }

  private _seriesColor(series: HistorySeries, index: number): string {
    if (this._isClimateHvacActionSource(series.source)) {
      return "var(--equinox-boost-color, var(--accent-color))";
    }
    if (this._isClimateCurrentTemperatureSource(series.source)) {
      return "#42a5f5";
    }
    if (this._isClimateSetpointSource(series.source)) {
      return "#ff9800";
    }
    return sourceColor(index);
  }

  private _tooltipSeries(): TooltipSeries[] {
    const key = `${this._series.map((series) => `${series.source.id}:${series.points.length}`).join("|")}::${this._hiddenSourceIds.join("|")}`;

    if (this._tooltipSeriesCacheSeriesRef === this._series && key === this._tooltipSeriesCacheKey) {
      return this._tooltipSeriesCache;
    }

    this._tooltipSeriesCacheSeriesRef = this._series;
    this._tooltipSeriesCacheKey = key;
    this._tooltipSeriesCache = this._visibleSeries()
      .filter((series) => series.points.length > 0)
      .map((series) => {
        const colorIndex = this._series.findIndex((candidate) => candidate.source.id === series.source.id);

        return {
          id: series.source.id,
          label: series.source.label,
          color: this._seriesColor(series, colorIndex),
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
    const bounds = this._chartData().timeBounds;
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

  private _renderTooltipGuide(chartData: ChartRenderData) {
    return this._tooltip
      ? svg`<line class="axis" x1=${this._tooltip.x} y1="18" x2=${this._tooltip.x} y2=${chartData.chartHeight - 10}></line>`
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
        style=${`left: clamp(150px, ${leftPercent}%, calc(100% - 150px)); top: ${this._tooltip.y.toFixed(1)}px; transform: ${placement};`}
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

  private _chartData(): ChartRenderData {
    const hiddenKey = this._hiddenSourceIds.join("|");
    const cache = this._chartRenderCache;

    if (
      cache &&
      cache.seriesRef === this._series &&
      cache.hiddenKey === hiddenKey &&
      cache.startTime === (this._startDate?.getTime() ?? 0) &&
      cache.endTime === (this._endDate?.getTime() ?? 0)
    ) {
      return cache.data;
    }

    const visibleSeries = this._visibleSeries();
    const timeBounds = this._timeBounds();
    const numericScales = this._numericScalesFor(visibleSeries);
    const plotBottom = this._plotBottomFor(numericScales);
    const chartHeight = this._chartHeightFor(visibleSeries, plotBottom);
    const data: ChartRenderData = {
      visibleSeries,
      timeBounds,
      numericScales,
      plotBottom,
      chartHeight,
      numericLines: this._buildNumericLines(visibleSeries, numericScales, timeBounds),
      segments: this._buildSegments(visibleSeries, plotBottom, timeBounds),
      heatingAreas: this._buildClimateHeatingAreas(visibleSeries, numericScales, timeBounds),
      yAxisLabels: this._buildYAxisLabels(numericScales)
    };

    this._chartRenderCache = {
      seriesRef: this._series,
      hiddenKey,
      startTime: this._startDate?.getTime() ?? 0,
      endTime: this._endDate?.getTime() ?? 0,
      data
    };

    return data;
  }

  private _timeBounds(): { start: number; end: number } {
    const start = this._startDate?.getTime() ?? Date.now() - DEFAULT_RANGE_HOURS * 60 * 60 * 1000;
    const end = this._endDate?.getTime() ?? Date.now();

    return { start, end: Math.max(end, start + 1) };
  }

  private _xFor(time: number, bounds: { start: number; end: number }): number {
    return PLOT_LEFT + ((time - bounds.start) / (bounds.end - bounds.start)) * PLOT_WIDTH;
  }

  private _plotBottomFor(scales: NumericScale[]): number {
    const n = Math.max(scales.length, 1);

    return GRAPH_TOP + (n - 1) * GRAPH_STEP + GRAPH_HEIGHT + GRAPH_BOTTOM_PADDING;
  }

  private _chartHeight(): number {
    return this._chartData().chartHeight;
  }

  private _chartHeightFor(visibleSeries: HistorySeries[], plotBottom: number): number {
    const segmentCount = visibleSeries.filter((series) => series.source.valueType !== "number" && !this._isClimateHvacActionSource(series.source)).length;

    return plotBottom + 34 + Math.max(segmentCount - 1, 0) * 14;
  }

  private _numericScalesFor(visibleSeries: HistorySeries[]): NumericScale[] {
    const numericSeries = visibleSeries.filter((series) => series.source.valueType === "number" && series.points.length > 0);
    const groups: Array<{ key: string; series: HistorySeries[]; min: number; max: number; precision: number }> = [];

    for (const series of numericSeries) {
      const values = series.points.map((point) => Number(point.value)).filter((value) => Number.isFinite(value));

      if (values.length === 0) {
        continue;
      }

      const min = Math.min(...values);
      const max = Math.max(...values);
      const precision = Math.max(...values.map((value) => this._valuePrecision(value)));
      const key = this._scaleKey(series.source);
      const group = groups.find((candidate) => candidate.key === key);

      if (group) {
        group.series.push(series);
        group.min = Math.min(group.min, min);
        group.max = Math.max(group.max, max);
        group.precision = Math.max(group.precision, precision);
      } else {
        groups.push({ key, series: [series], min, max, precision });
      }
    }

    return groups.map((group, index) => {
      const range = this._paddedRange(group.min, group.max, group.precision);

      return {
        ids: new Set(group.series.map((series) => series.source.id)),
        min: range.min,
        max: range.max,
        precision: group.precision,
        top: GRAPH_TOP + index * GRAPH_STEP,
        height: GRAPH_HEIGHT
      };
    });
  }

  private _scaleKey(source: HistorySource): string {
    if (this._isClimateTemperatureSource(source)) {
      return `climate:${source.entityId}:temperature`;
    }

    if (source.kind === "entity_state" && source.valueType === "number" && source.unit) {
      return `unit:${source.unit}`;
    }

    return `source:${source.id}`;
  }

  private _sourcePath(source: HistorySource): string | undefined {
    return source.path?.join(".");
  }

  private _isConfigClimateSource(source: HistorySource): boolean {
    return source.entityId === this.config?.entity && source.entityId.startsWith("climate.");
  }

  private _isClimateTemperatureSource(source: HistorySource): boolean {
    const path = this._sourcePath(source);

    return this._isConfigClimateSource(source) && source.kind === "entity_attribute" && (path === "current_temperature" || path === "temperature");
  }

  private _isClimateCurrentTemperatureSource(source: HistorySource): boolean {
    return this._isConfigClimateSource(source) && source.kind === "entity_attribute" && this._sourcePath(source) === "current_temperature";
  }

  private _isClimateSetpointSource(source: HistorySource): boolean {
    return this._isConfigClimateSource(source) && source.kind === "entity_attribute" && this._sourcePath(source) === "temperature";
  }

  private _isClimateHvacActionSource(source: HistorySource): boolean {
    return this._isConfigClimateSource(source) && source.kind === "entity_attribute" && this._sourcePath(source) === "hvac_action";
  }

  private _valuePrecision(value: number): number {
    if (!Number.isFinite(value) || Number.isInteger(value)) {
      return 0;
    }

    const text = value.toString().toLowerCase();

    if (text.includes("e-")) {
      const [coefficient, exponent] = text.split("e-");
      const coefficientDecimals = coefficient.split(".")[1]?.length ?? 0;

      return Math.min(coefficientDecimals + Number(exponent), 4);
    }

    return Math.min(text.split(".")[1]?.length ?? 0, 4);
  }

  private _roundToPrecision(value: number, precision: number): number {
    const factor = 10 ** precision;

    return Math.round(value * factor) / factor;
  }

  private _paddedRange(min: number, max: number, precision: number): { min: number; max: number } {
    const span = max - min;

    if (span < 1e-6) {
      const padding = Math.max(Math.abs(max) * 0.05, 1);

      return {
        min: this._roundToPrecision(min - padding, precision),
        max: this._roundToPrecision(max + padding, precision)
      };
    }

    const padding = span * 0.08;

    return {
      min: this._roundToPrecision(min - padding, precision),
      max: this._roundToPrecision(max + padding, precision)
    };
  }

  private _scaleFor(series: HistorySeries, scales: NumericScale[]): NumericScale | undefined {
    return scales.find((scale) => scale.ids.has(series.source.id));
  }

  private _y(value: number, scale: NumericScale): number {
    const span = scale.max - scale.min;

    if (span < 1e-6) {
      return scale.top + scale.height / 2;
    }

    return scale.top + scale.height - ((value - scale.min) / span) * scale.height;
  }

  private _fmtAxisVal(v: number, precision: number): string {
    return v.toFixed(precision);
  }

  private _renderScaleLabels(chartData: ChartRenderData) {
    const scales = chartData.numericScales;
    const result = [];

    for (const [index, scale] of scales.entries()) {
      const tickX1 = PLOT_LEFT - 4;
      const tickX2 = PLOT_LEFT;
      const ticks = [scale.top + scale.height, scale.top + scale.height / 2, scale.top];

      if (index > 0) {
        const separatorY = scale.top - GRAPH_GAP / 2;

        result.push(svg`<line class="graph-separator" x1=${PLOT_LEFT} y1=${separatorY} x2=${PLOT_RIGHT} y2=${separatorY}></line>`);
      }

      result.push(svg`<line class="axis" x1=${PLOT_LEFT} y1=${scale.top} x2=${PLOT_RIGHT} y2=${scale.top}></line>`);

      for (const y of ticks) {
        result.push(svg`<line class="axis" x1=${tickX1} y1=${y} x2=${tickX2} y2=${y}></line>`);
      }
    }

    return result;
  }

  private _buildYAxisLabels(scales: NumericScale[]): YAxisLabelRenderData[] {
    return scales.flatMap((scale) => {
      const ticks = [
        { y: scale.top + scale.height, v: scale.min },
        { y: scale.top + scale.height / 2, v: (scale.min + scale.max) / 2 },
        { y: scale.top, v: scale.max }
      ];

      return ticks.map(({ y, v }) => ({ y, value: this._fmtAxisVal(v, scale.precision) }));
    });
  }

  private _renderYAxisLabels(chartData: ChartRenderData) {
    const leftWidthPct = ((PLOT_LEFT / CHART_WIDTH) * 100).toFixed(2);
    const sideStyle = `left:0;width:${leftWidthPct}%;text-align:right;padding-right:6px;`;

    return chartData.yAxisLabels.map(
      (label) => html`<span class="y-axis-label" style="top:${label.y.toFixed(1)}px;${sideStyle}">${label.value}</span>`
    );
  }

  private _displayNumericPoints(series: HistorySeries, bounds: { start: number; end: number }): NumericPoint[] {
    const points = series.points
      .map((point) => ({ time: point.time, value: Number(point.value) }))
      .filter((point) => Number.isFinite(point.value));
    const maxPointCount = PLOT_WIDTH * 4;

    if (points.length <= maxPointCount) {
      return points;
    }

    const buckets = new Map<number, Array<NumericPoint & { index: number }>>();

    points.forEach((point, index) => {
      const bucket = Math.floor(this._xFor(point.time, bounds));
      const bucketPoints = buckets.get(bucket);

      if (bucketPoints) {
        bucketPoints.push({ ...point, index });
      } else {
        buckets.set(bucket, [{ ...point, index }]);
      }
    });

    const selected = new Map<number, NumericPoint & { index: number }>();

    for (const bucketPoints of buckets.values()) {
      const first = bucketPoints[0];
      const last = bucketPoints[bucketPoints.length - 1];
      const min = bucketPoints.reduce((current, point) => (point.value < current.value ? point : current), first);
      const max = bucketPoints.reduce((current, point) => (point.value > current.value ? point : current), first);

      for (const point of [first, min, max, last]) {
        selected.set(point.index, point);
      }
    }

    return [...selected.values()]
      .sort((left, right) => left.index - right.index)
      .map(({ time, value }) => ({ time, value }));
  }

  private _buildNumericLines(visibleSeries: HistorySeries[], scales: NumericScale[], bounds: { start: number; end: number }): NumericLineRenderData[] {
    const numericSeries = visibleSeries.filter((series) => series.source.valueType === "number");

    return numericSeries.flatMap((series) => {
      const scale = this._scaleFor(series, scales);

      if (!scale) {
        return [];
      }

      const colorIndex = this._series.findIndex((candidate) => candidate.source.id === series.source.id);
      const color = this._seriesColor(series, colorIndex);
      const displayPoints = this._displayNumericPoints(series, bounds);
      const points = displayPoints
        .map((point) => {
          const x = this._xFor(point.time, bounds);
          const y = this._y(point.value, scale);

          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");

      return [{ id: series.source.id, color, points }];
    });
  }

  private _renderNumericLines(chartData: ChartRenderData) {
    return chartData.numericLines.map((line) => svg`<polyline class="line" points=${line.points} stroke=${line.color}></polyline>`);
  }

  private _temperatureAt(points: Array<{ time: number; value: number }>, time: number): number | undefined {
    if (points.length === 0) {
      return undefined;
    }

    if (time <= points[0].time) {
      return points[0].value;
    }

    const last = points[points.length - 1];

    if (time >= last.time) {
      return last.value;
    }

    for (let index = 0; index < points.length - 1; index += 1) {
      const left = points[index];
      const right = points[index + 1];

      if (time >= left.time && time <= right.time) {
        const span = right.time - left.time;

        return span <= 0 ? left.value : left.value + ((time - left.time) / span) * (right.value - left.value);
      }
    }

    return undefined;
  }

  private _buildClimateHeatingAreas(
    visibleSeries: HistorySeries[],
    scales: NumericScale[],
    bounds: { start: number; end: number }
  ): HeatingAreaRenderData[] {
    const temperatureSeries = visibleSeries.find((series) => this._isClimateCurrentTemperatureSource(series.source));
    const hvacActionSeries = visibleSeries.find((series) => this._isClimateHvacActionSource(series.source));

    if (!temperatureSeries || !hvacActionSeries) {
      return [];
    }

    const scale = this._scaleFor(temperatureSeries, scales);

    if (!scale) {
      return [];
    }

    const temperaturePoints = temperatureSeries.points
      .map((point) => ({ time: point.time, value: Number(point.value) }))
      .filter((point) => Number.isFinite(point.value))
      .sort((left, right) => left.time - right.time);
    const heatingRanges = this._stateRanges(hvacActionSeries, bounds)
      .filter((range) => range.value === "heating")
      .reduce<Array<{ start: number; end: number }>>((ranges, range) => {
        const previous = ranges[ranges.length - 1];

        if (previous && Math.abs(previous.end - range.start) < 1) {
          previous.end = range.end;
        } else {
          ranges.push({ start: range.start, end: range.end });
        }

        return ranges;
      }, []);

    return heatingRanges.flatMap(({ start, end }, index) => {
      const topPoints = [
        { time: start, value: this._temperatureAt(temperaturePoints, start) },
        ...temperaturePoints.filter((candidate) => candidate.time > start && candidate.time < end),
        { time: end, value: this._temperatureAt(temperaturePoints, end) }
      ].filter((candidate): candidate is { time: number; value: number } => candidate.value !== undefined);

      if (topPoints.length === 0) {
        return [];
      }

      const bottom = scale.top + scale.height;
      const polygonPoints = [
        `${this._xFor(start, bounds).toFixed(1)},${bottom.toFixed(1)}`,
        ...topPoints.map((candidate) => `${this._xFor(candidate.time, bounds).toFixed(1)},${this._y(candidate.value, scale).toFixed(1)}`),
        `${this._xFor(end, bounds).toFixed(1)},${bottom.toFixed(1)}`
      ].join(" ");

      return [{ id: `${hvacActionSeries.source.id}:${index}`, points: polygonPoints }];
    });
  }

  private _renderClimateHeatingAreas(chartData: ChartRenderData) {
    return chartData.heatingAreas.map((area) => svg`<polygon class="climate-heating-area" points=${area.points}></polygon>`);
  }

  private _stateRanges(series: HistorySeries, bounds: { start: number; end: number }): Array<{ start: number; end: number; value: number | string | boolean }> {
    return series.points.flatMap((point, pointIndex) => {
      const start = Math.max(point.time, bounds.start);
      const end = Math.min(series.points[pointIndex + 1]?.time ?? bounds.end, bounds.end);

      return end > start ? [{ start, end, value: point.value }] : [];
    });
  }

  private _buildSegments(visibleSeries: HistorySeries[], plotBottom: number, bounds: { start: number; end: number }): SegmentRenderData[] {
    const rowHeight = 14;
    const top = plotBottom + 10;
    let segmentIndex = 0;

    return visibleSeries.flatMap((series) => {
      if (series.source.valueType === "number" || this._isClimateHvacActionSource(series.source)) {
        return [];
      }

      const y = top + segmentIndex * rowHeight;
      const colorIndex = this._series.findIndex((candidate) => candidate.source.id === series.source.id);
      segmentIndex += 1;

      const ranges = this._stateRanges(series, bounds);
      const merged = ranges.reduce<Array<{ start: number; end: number; fill: string }>>((segments, range) => {
        const valueOn = range.value === true || (typeof range.value === "string" && !["off", "idle", "none", "false"].includes(range.value));
        const fill = valueOn ? sourceColor(colorIndex) : "var(--equinox-muted-color, #777)";
        const previous = segments[segments.length - 1];

        if (previous && previous.fill === fill && Math.abs(previous.end - range.start) < 1) {
          previous.end = range.end;
        } else {
          segments.push({ start: range.start, end: range.end, fill });
        }

        return segments;
      }, []);

      return merged.map((segment, index) => {
        const x = this._xFor(segment.start, bounds);
        const width = Math.max(this._xFor(segment.end, bounds) - x, 1);

        return { id: `${series.source.id}:${index}`, x, y, width, fill: segment.fill };
      });
    });
  }

  private _renderSegments(chartData: ChartRenderData) {
    return chartData.segments.map(
      (segment) => svg`
        <rect
          class="segment"
          x=${segment.x}
          y=${segment.y}
          width=${segment.width}
          height="9"
          fill=${segment.fill}
        ></rect>
      `
    );
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
        <button
          slot="headerActionItems"
          class="dialog-fullscreen-btn"
          aria-label=${localize(this.language, this._controlsCollapsed ? "dialog.history.show_controls" : "dialog.history.hide_controls")}
          title=${localize(this.language, this._controlsCollapsed ? "dialog.history.show_controls" : "dialog.history.hide_controls")}
          @click=${this._toggleControls}
        >
          <ha-icon icon=${this._controlsCollapsed ? "mdi:chevron-down" : "mdi:chevron-up"}></ha-icon>
        </button>
        <button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-fs-toggle"
          aria-label=${localize(this.language, this._fullscreen ? "dialog.history.exit_fullscreen" : "dialog.history.fullscreen")}
          title=${localize(this.language, this._fullscreen ? "dialog.history.exit_fullscreen" : "dialog.history.fullscreen")}
          @click=${this._toggleFullscreen}
        >
          <ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
        </button>
        <div class="history-body">
          <div class="controls-shell">
            <div class="controls-panel" ?collapsed=${this._controlsCollapsed}>
              <div class="range-row">
                ${this._renderEntityPicker()}
                ${RANGE_HOURS.map(
                  (hours) => html`
                    <button class="range-btn" ?active=${this._activeRangeHours === hours} @click=${() => this._setRange(hours)}>
                      ${hours < 24 ? `${hours}h` : `${hours / 24}j`}
                    </button>
                  `
                )}
                <ha-date-range-picker
                  .startDate=${this._startDate ?? new Date(Date.now() - DEFAULT_RANGE_HOURS * 3600000)}
                  .endDate=${this._endDate ?? new Date()}
                  time-picker
                  @value-changed=${this._onDateRangeChanged}
                ></ha-date-range-picker>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="chart-panel">${this._renderChart()}</div>
          </div>
          ${this._renderSelected()}
        </div>
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
