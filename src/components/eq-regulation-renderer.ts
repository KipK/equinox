import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { localize } from "../localize/localize";
import { translateRegulationDashboardText } from "../data/regulation-dashboard-i18n";
import {
  buildRegulationSources,
  isMissingRegulationValue,
  normalizeRegulationPath,
  readRegulationSourceValue,
  type RegulationDashboardValueContext
} from "../data/regulation-dashboard-values";
import { equinoxAttributeUnits, loadEquinoxStaticAttributeUnits } from "../data/attribute-units";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { AttributeUnitMap, BetterHistoryConfig } from "@kipk/ha-better-history";
import type {
  RegulationDashboard,
  RegulationDashboardActionItem,
  RegulationDashboardCondition,
  RegulationDashboardHistoryItem,
  RegulationDashboardHistoryOptions,
  RegulationDashboardHistorySeries,
  RegulationDashboardItem,
  RegulationDashboardMetric,
  RegulationDashboardMetricGridItem,
  RegulationDashboardProgressItem,
  RegulationDashboardSection,
  RegulationDashboardSource,
  RegulationDashboardStatusItem,
  RegulationDashboardTone,
  RegulationDashboardValueItem,
  RegulationDashboardValueRef
} from "../types/regulation-dashboard";
import type { EquinoxViewModel } from "../types/view-model";

const VALUE_FALLBACK = "--";
const DESTRUCTIVE_ACTION_SERVICES = new Set([
  "vtherm_smartpi.reset_smartpi_learning",
  "vtherm_smartpi.force_smartpi_calibration",
  "vtherm_smartpi.reset_smartpi_integral"
]);

export class EquinoxRegulationRenderer extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    viewModel: { attribute: false },
    dashboard: { attribute: false },
    activeSectionId: { attribute: "active-section-id" },
    language: {},
    _actionError: { state: true },
    _actionPending: { state: true },
    _staticAttributeUnits: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    .state {
      display: grid;
      gap: 8px;
      padding: 18px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
    }

    .section {
      display: grid;
      gap: 10px;
      min-width: 0;
    }

    .section-header {
      display: grid;
      gap: 4px;
      padding-block-end: 2px;
    }

    h2,
    h3,
    p {
      margin: 0;
    }

    h2 {
      font-size: 18px;
      line-height: 1.25;
      font-weight: 650;
    }

    h3 {
      font-size: 14px;
      line-height: 1.3;
      font-weight: 650;
    }

    .summary,
    .description,
    .text,
    .missing,
    .meta {
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.4;
    }

    .hero,
    .block,
    .note {
      border: 1px solid color-mix(in srgb, var(--divider-color) 78%, transparent);
      border-radius: 8px;
      background: color-mix(in srgb, var(--card-background-color, #1c1c1c) 88%, var(--primary-text-color) 4%);
    }

    .hero {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 12px;
      align-items: center;
      padding: 12px;
    }

    .hero ha-icon,
    .note ha-icon,
    .status ha-icon {
      color: var(--regulation-tone-color, var(--secondary-text-color));
    }

    .hero-content {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .block {
      display: grid;
      gap: 6px;
      padding: 10px;
      min-width: 0;
    }

    .value-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    .label {
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.25;
    }

    .value {
      min-width: 0;
      overflow-wrap: anywhere;
      text-align: end;
      font-size: 17px;
      line-height: 1.15;
      font-weight: 650;
      color: var(--primary-text-color);
    }

    .metric-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }

    .metric {
      display: grid;
      gap: 4px;
      justify-items: center;
      text-align: center;
      min-width: 0;
      flex: 1 1 128px;
      max-width: 180px;
      padding: 8px 10px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }

    .metric .value {
      text-align: center;
      font-size: 16px;
    }

    .status {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
      align-items: start;
    }

    .status-pill {
      display: inline-flex;
      width: fit-content;
      max-width: 100%;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--regulation-tone-color, var(--secondary-text-color)) 16%, transparent);
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 600;
    }

    .progress-line {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      color: var(--secondary-text-color);
      font-size: 11px;
    }

    .progress-track {
      height: 6px;
      overflow: hidden;
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    }

    .progress-fill {
      width: var(--progress, 0%);
      height: 100%;
      border-radius: inherit;
      background: var(--regulation-tone-color, var(--primary-color));
    }

    .note {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
      align-items: start;
      padding: 8px 10px;
    }

    .layout-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--grid-min-width, 240px)), 1fr));
      gap: 10px;
    }

    .text {
      white-space: pre-line;
    }

    .history-block {
      display: grid;
      gap: 10px;
      min-width: 0;
      padding: 12px;
      border: 1px solid color-mix(in srgb, var(--divider-color) 78%, transparent);
      border-radius: 8px;
      background: color-mix(in srgb, var(--card-background-color, #1c1c1c) 88%, var(--primary-text-color) 4%);
    }

    .history-chart {
      display: flex;
      width: 100%;
      min-width: 0;
      height: min(360px, 46vh);
      min-height: 260px;
      --better-history-min-height: 0px;
      --better-history-surface-overflow-y: visible;
    }

    .action-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 8px;
      padding: 10px 6px;
    }

    .action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid color-mix(in srgb, var(--regulation-tone-color, var(--primary-color)) 52%, var(--divider-color));
      background: color-mix(in srgb, var(--regulation-tone-color, var(--primary-color)) 16%, transparent);
      color: var(--regulation-tone-color, var(--primary-text-color));
      cursor: pointer;
      transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
    }

    .action-button:hover:not(:disabled) {
      background: color-mix(in srgb, var(--regulation-tone-color, var(--primary-color)) 28%, transparent);
      transform: scale(1.06);
      box-shadow: 0 0 8px color-mix(in srgb, var(--regulation-tone-color, var(--primary-color)) 30%, transparent);
    }

    .action-button:active:not(:disabled) {
      transform: scale(0.94);
    }

    .action-button:disabled {
      cursor: default;
      opacity: 0.45;
    }

    .action-button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .action-button ha-icon {
      --mdc-icon-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-label {
      font-size: 11px;
      font-weight: 550;
      line-height: 1.25;
      color: var(--primary-text-color);
      max-width: 100%;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 600px) {
      .history-chart {
        height: min(320px, 42vh);
        min-height: 240px;
      }
    }

    [tone="ok"] {
      --regulation-tone-color: var(--success-color, #43a047);
    }

    [tone="info"] {
      --regulation-tone-color: var(--info-color, var(--primary-color));
    }

    [tone="warning"] {
      --regulation-tone-color: var(--warning-color, #f9a825);
    }

    [tone="danger"] {
      --regulation-tone-color: var(--error-color, #db4437);
    }

    [tone="muted"] {
      --regulation-tone-color: var(--secondary-text-color);
    }
  `;

  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  viewModel?: EquinoxViewModel;
  dashboard?: RegulationDashboard;
  activeSectionId?: string;
  language?: string;
  private _actionError?: string;
  private _actionPending?: string;
  private _staticAttributeUnits?: AttributeUnitMap;
  private _attributeUnitsLoadStarted = false;
  private readonly _historyConfigCache = new Map<string, BetterHistoryConfig>();

  connectedCallback(): void {
    super.connectedCallback();
    this._loadAttributeUnits();
  }

  private _loadAttributeUnits(): void {
    if (this._attributeUnitsLoadStarted) return;
    this._attributeUnitsLoadStarted = true;

    loadEquinoxStaticAttributeUnits().then((units) => {
      this._staticAttributeUnits = units;
      this.requestUpdate();
    });
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config || !this.dashboard) {
      return this._renderState(localize(this.language, "dialog.regulation.loading"));
    }

    const section = this._activeSection();
    if (!section) {
      return this._renderState(localize(this.language, "dialog.regulation.section_missing"));
    }

    return html`
      <section class="section" aria-labelledby="regulation-section-title">
        <div class="section-header">
          <h2 id="regulation-section-title">${this._sectionTitle(section)}</h2>
          ${this._sectionSummary(section) ? html`<p class="summary">${this._sectionSummary(section)}</p>` : nothing}
        </div>
        ${section.items.length > 0
          ? section.items.map((item) => this._renderItem(item))
          : this._renderState(localize(this.language, "dialog.regulation.empty_section"))}
      </section>
    `;
  }

  private _renderState(message: string): TemplateResult {
    return html`<div class="state" role="status">${message}</div>`;
  }

  private _activeSection(): RegulationDashboardSection | undefined {
    return (
      this.dashboard?.sections.find((section) => section.id === this.activeSectionId) ??
      this.dashboard?.sections[0]
    );
  }

  private _context(): RegulationDashboardValueContext {
    return { hass: this.hass!, config: this.config! };
  }

  private _sectionTitle(section: RegulationDashboardSection): string {
    return this._translate(section.title_key, section.title || section.id);
  }

  private _sectionSummary(section: RegulationDashboardSection): string {
    return this._translate(section.summary_key, section.summary);
  }

  private _translate(key: string | undefined, fallback?: string): string {
    return this.dashboard ? translateRegulationDashboardText(this.dashboard, this.language, key, fallback) : fallback ?? "";
  }

  private _renderItem(item: RegulationDashboardItem): TemplateResult | typeof nothing {
    if (!this._conditionMatches(item.visible_if)) {
      return nothing;
    }

    switch (item.type) {
      case "hero_status":
        return html`
          <article class="hero" tone=${item.tone ?? "info"}>
            ${item.icon ? html`<ha-icon icon=${item.icon}></ha-icon>` : html`<ha-icon icon="mdi:information-outline"></ha-icon>`}
            <div class="hero-content">
              <h3>${this._translate(item.title_key, item.title)}</h3>
              ${this._translate(item.subtitle_key, item.subtitle)
                ? html`<p class="description">${this._translate(item.subtitle_key, item.subtitle)}</p>`
                : nothing}
            </div>
          </article>
        `;
      case "value":
        return this._renderValue(item);
      case "metric_grid":
        return this._renderMetricGrid(item);
      case "status":
        return this._renderStatus(item);
      case "progress":
        return this._renderProgress(item);
      case "text":
        return html`<article class="block"><p class="text">${this._translate(item.text_key, item.text)}</p></article>`;
      case "section_note":
        return html`
          <aside class="note" tone=${item.tone ?? "muted"}>
            ${item.icon ? html`<ha-icon icon=${item.icon}></ha-icon>` : html`<ha-icon icon="mdi:note-text-outline"></ha-icon>`}
            <p class="text">${this._translate(item.text_key, item.text)}</p>
          </aside>
        `;
      case "history":
        return this._renderHistory(item);
      case "action":
        return this._renderAction(item);
      case "layout_grid":
        return html`
          <div
            class="layout-grid"
            style=${item.min_width ? `--grid-min-width: ${item.min_width}px;` : nothing}
          >
            ${item.items.map((subItem) => this._renderItem(subItem))}
          </div>
        `;
      default:
        return nothing;
    }
  }

  private _renderValue(item: RegulationDashboardValueItem): TemplateResult {
    const sourceMissing = this._sourceMissing(item.source);
    return html`
      <article class="block" tone=${this._toneForValue(item)}>
        <div class="value-row">
          <span class="label">${this._translate(item.label_key, item.label)}</span>
          <span class="value">${this._formatSourceValue(item)}</span>
        </div>
        ${sourceMissing ? html`<p class="missing">${localize(this.language, "dialog.regulation.source_missing")}</p>` : nothing}
      </article>
    `;
  }

  private _renderMetricGrid(item: RegulationDashboardMetricGridItem): TemplateResult | typeof nothing {
    const visibleMetrics = item.metrics.filter((metric) => this._conditionMatches(metric.visible_if));
    if (visibleMetrics.length === 0) {
      return nothing;
    }
    return html`
      <article class="block">
        ${this._translate(item.title_key, item.title) ? html`<h3>${this._translate(item.title_key, item.title)}</h3>` : nothing}
        <div class="metric-grid">
          ${visibleMetrics.map((metric) => this._renderMetric(metric))}
        </div>
      </article>
    `;
  }

  private _renderMetric(metric: RegulationDashboardMetric): TemplateResult {
    return html`
      <div class="metric" tone=${this._toneForValue(metric)}>
        <span class="label">${this._translate(metric.label_key, metric.label)}</span>
        <span class="value">${this._formatSourceValue(metric)}</span>
        ${this._sourceMissing(metric.source) ? html`<span class="meta">${localize(this.language, "dialog.regulation.source_missing")}</span>` : nothing}
      </div>
    `;
  }

  private _renderStatus(item: RegulationDashboardStatusItem): TemplateResult {
    const value = readRegulationSourceValue(this._context(), item.source, item.path);
    const key = isMissingRegulationValue(value) ? "" : String(value);
    const entry = item.map[key] ?? item.fallback;
    const tone = entry?.tone ?? "muted";
    const label = entry ? this._translate(entry.label_key, entry.label ?? key) : VALUE_FALLBACK;
    const description = entry ? this._translate(entry.description_key, entry.description) : "";

    return html`
      <article class="block status" tone=${tone}>
        ${entry?.icon ? html`<ha-icon icon=${entry.icon}></ha-icon>` : html`<ha-icon icon="mdi:circle-medium"></ha-icon>`}
        <div>
          ${this._translate(item.label_key, item.label) ? html`<div class="label">${this._translate(item.label_key, item.label)}</div>` : nothing}
          <div class="status-pill">${label}</div>
          ${description ? html`<p class="description">${description}</p>` : nothing}
          ${this._sourceMissing(item.source) ? html`<p class="missing">${localize(this.language, "dialog.regulation.source_missing")}</p>` : nothing}
        </div>
      </article>
    `;
  }

  private _renderProgress(item: RegulationDashboardProgressItem): TemplateResult {
    const current = this._readValueRef(item.value);
    const target = typeof item.target === "number" ? item.target : this._readValueRef(item.target);
    const currentNumber = this._asNumber(current);
    const targetNumber = this._asNumber(target);
    const percent =
      currentNumber === undefined || targetNumber === undefined || targetNumber <= 0
        ? undefined
        : Math.max(0, Math.min(100, (currentNumber / targetNumber) * 100));
    const unit = this._translate(item.unit_key, item.unit);

    return html`
      <article class="block" tone="info">
        <div class="value-row">
          <span class="label">${this._translate(item.label_key, item.label)}</span>
          <span class="value">${percent === undefined ? VALUE_FALLBACK : `${Math.round(percent)}%`}</span>
        </div>
        <div class="progress-track" aria-hidden="true">
          <div class="progress-fill" style=${`--progress:${percent ?? 0}%`}></div>
        </div>
        <div class="progress-line">
          <span>${this._formatPrimitive(current, item.digits)}${unit ? ` ${unit}` : ""}</span>
          <span>${this._formatPrimitive(target, item.digits)}${unit ? ` ${unit}` : ""}</span>
        </div>
        ${this._sourceMissing(item.value.source) ? html`<p class="missing">${localize(this.language, "dialog.regulation.source_missing")}</p>` : nothing}
      </article>
    `;
  }

  private _renderHistory(item: RegulationDashboardHistoryItem): TemplateResult {
    const betterHistoryConfig = this._betterHistoryConfig(item);
    const options = item.options ?? {};
    const showControls = this._showHistoryControls(options);
    const toolsOpen = options.tools === true || options.range_picker === true;

    if (!betterHistoryConfig.series || betterHistoryConfig.series.length === 0) {
      return html`
        <aside class="note" tone="muted">
          <ha-icon icon="mdi:chart-line"></ha-icon>
          <p class="text">${localize(this.language, "dialog.regulation.source_missing")}</p>
        </aside>
      `;
    }

    return html`
      <article class="history-block">
        ${this._translate(item.title_key, item.title) ? html`<h3>${this._translate(item.title_key, item.title)}</h3>` : nothing}
        <equinox-better-history
          class="history-chart"
          .hass=${this.hass}
          .config=${betterHistoryConfig}
          .attributeUnits=${equinoxAttributeUnits(this._staticAttributeUnits)}
          .language=${this.language}
          .showControls=${showControls}
          .toolsOpen=${toolsOpen}
          .showExportButton=${options.tools === true}
          .showImportButton=${false}
          .showLineModeButtons=${options.tools === true}
          .showTimeRangeSelector=${options.range_picker === true}
        ></equinox-better-history>
      </article>
    `;
  }

  private _renderAction(item: RegulationDashboardActionItem): TemplateResult {
    const label = this._translate(item.label_key, item.label) || item.service;
    const actionKey = this._actionKey(item);
    const locked = this._isThermostatLocked();
    const pending = this._actionPending === actionKey;
    const disabled = locked || pending || !this.hass;

    return html`
      <article class="block action-block" tone=${this._isDestructiveAction(item) ? "warning" : "info"}>
        <button
          class="action-button"
          type="button"
          ?disabled=${disabled}
          title=${label}
          aria-label=${label}
          @click=${() => this._handleActionClick(item)}
        >
          <ha-icon icon=${item.icon || "mdi:play-circle-outline"}></ha-icon>
        </button>
        <span class="action-label">${pending ? localize(this.language, "dialog.regulation.action_running") : label}</span>
        ${locked ? html`<p class="missing">${localize(this.language, "dialog.regulation.action_locked")}</p>` : nothing}
        ${this._actionError === actionKey
          ? html`<p class="missing" role="alert">${localize(this.language, "dialog.regulation.action_failed")}</p>`
          : nothing}
      </article>
    `;
  }

  private async _handleActionClick(item: RegulationDashboardActionItem): Promise<void> {
    if (!this.hass || !this.config || this._isThermostatLocked()) {
      return;
    }

    if (this._requiresConfirmation(item) && !this._confirmAction(item)) {
      return;
    }

    const service = this._parseService(item.service);
    if (!service) {
      this._actionError = this._actionKey(item);
      console.error("[equinox] Invalid regulation action service", { service: item.service });
      return;
    }

    const actionKey = this._actionKey(item);
    this._actionPending = actionKey;
    this._actionError = undefined;

    try {
      await this.hass.callService(service.domain, service.service, this._actionServiceData(item));
    } catch (error) {
      this._actionError = actionKey;
      console.error("[equinox] Regulation action failed", { action: item, error });
    } finally {
      this._actionPending = undefined;
    }
  }

  private _parseService(service: string): { domain: string; service: string } | undefined {
    const match = service.match(/^([a-z0-9_]+)\.([a-z0-9_]+)$/u);
    return match ? { domain: match[1], service: match[2] } : undefined;
  }

  private _actionServiceData(item: RegulationDashboardActionItem): Record<string, unknown> {
    return {
      ...this._resolveActionRecord(item.data),
      ...this._resolveActionRecord(item.target)
    };
  }

  private _resolveActionRecord(value: Record<string, unknown> | undefined): Record<string, unknown> {
    const resolved = this._resolveActionValue(value);
    return resolved && typeof resolved === "object" && !Array.isArray(resolved)
      ? (resolved as Record<string, unknown>)
      : {};
  }

  private _resolveActionValue(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.map((entry) => this._resolveActionValue(entry));
    }

    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, this._resolveActionValue(entry)])
      );
    }

    if (typeof value !== "string") {
      return value;
    }

    switch (value) {
      case "$climate_entity":
        return this.config?.entity;
      case "$diagnostic_entity":
        return this.config?.diagnostic_entity;
      case "$power_entity":
        return this.config?.power_entity;
      case "$humidity_entity":
        return this.config?.humidity_entity;
      case "$temperature_entity":
        return this.config?.temperature_entity;
      default:
        return value;
    }
  }

  private _requiresConfirmation(item: RegulationDashboardActionItem): boolean {
    return item.confirmation?.enabled === true || this._isCustomDashboard() || this._isDestructiveAction(item);
  }

  private _confirmAction(item: RegulationDashboardActionItem): boolean {
    const title = this._translate(item.confirmation?.title_key, item.confirmation?.title)
      || localize(this.language, "dialog.regulation.confirm_action_title");
    const text = this._translate(item.confirmation?.text_key, item.confirmation?.text)
      || localize(this.language, "dialog.regulation.confirm_action_text");

    return window.confirm(`${title}\n\n${text}`);
  }

  private _isCustomDashboard(): boolean {
    return this.config?.additional_dashboards === "custom" || this.dashboard?.algorithm === "custom";
  }

  private _isDestructiveAction(item: RegulationDashboardActionItem): boolean {
    return DESTRUCTIVE_ACTION_SERVICES.has(item.service);
  }

  private _isThermostatLocked(): boolean {
    if (this.viewModel?.vt?.lock.isUserLocked === true) {
      return true;
    }

    return readRegulationSourceValue(this._context(), "climate", "lock_manager/is_locked") === true;
  }

  private _actionKey(item: RegulationDashboardActionItem): string {
    return item.id || item.service;
  }

  private _betterHistoryConfig(item: RegulationDashboardHistoryItem): BetterHistoryConfig {
    const cacheKey = this._historyConfigCacheKey(item);
    const cached = this._historyConfigCache.get(cacheKey);
    if (cached) return cached;

    const options = item.options ?? {};
    const title = this._translate(item.title_key, item.title);
    const config: BetterHistoryConfig = {
      hours: this._historyRangeHours(item.range),
      showDatePicker: options.date_picker ?? false,
      showEntityPicker: options.entity_picker ?? false,
      showLegend: options.legend ?? true,
      showTooltip: options.tooltip ?? true,
      showScale: options.scales ?? true,
      showGrid: true,
      showExportButton: options.tools === true,
      showImportButton: false,
      showTimeRangeSelector: options.range_picker === true,
      showLineModeButtons: options.tools === true,
      debugPerformance: false,
      title: title || undefined,
      series: item.series.flatMap((series) => this._betterHistorySeries(series))
    };

    this._historyConfigCache.set(cacheKey, config);
    return config;
  }

  private _betterHistorySeries(series: RegulationDashboardHistorySeries): NonNullable<BetterHistoryConfig["series"]> {
    const entity = this._resolveHistoryEntity(series.entity);
    if (!entity) return [];

    return [
      {
        entity,
        attribute: series.attribute ? normalizeRegulationPath(series.attribute) : undefined,
        label: this._translate(series.label_key, series.label),
        unit: this._translate(series.unit_key, series.unit) || undefined,
        group: series.scale_group,
        color: series.color,
        forced: true
      }
    ];
  }

  private _resolveHistoryEntity(entity: string): string | undefined {
    switch (entity) {
      case "$climate_entity":
        return this.config?.entity || undefined;
      case "$diagnostic_entity":
        return this.config?.diagnostic_entity || undefined;
      case "$power_entity":
        return this.config?.power_entity || undefined;
      case "$humidity_entity":
        return this.config?.humidity_entity || undefined;
      case "$temperature_entity":
        return this.config?.temperature_entity || undefined;
      default:
        return entity;
    }
  }

  private _historyRangeHours(range: string | undefined): number {
    if (!range) return 24;

    const match = range.trim().toLowerCase().match(/^(\d+(?:\.\d+)?)\s*([hdw])$/u);
    if (!match) return 24;

    const value = Number(match[1]);
    if (!Number.isFinite(value) || value <= 0) return 24;

    switch (match[2]) {
      case "h":
        return value;
      case "d":
        return value * 24;
      case "w":
        return value * 24 * 7;
      default:
        return 24;
    }
  }

  private _showHistoryControls(options: RegulationDashboardHistoryOptions): boolean {
    return (
      options.date_picker === true
      || options.entity_picker === true
      || options.tools === true
      || options.range_picker === true
    );
  }

  private _historyConfigCacheKey(item: RegulationDashboardHistoryItem): string {
    return JSON.stringify({
      language: this.language ?? this.hass?.locale?.language ?? "",
      climate: this.config?.entity ?? "",
      diagnostic: this.config?.diagnostic_entity ?? "",
      power: this.config?.power_entity ?? "",
      humidity: this.config?.humidity_entity ?? "",
      temperature: this.config?.temperature_entity ?? "",
      item
    });
  }

  private _formatSourceValue(item: RegulationDashboardValueItem | RegulationDashboardMetric): string {
    const value = readRegulationSourceValue(this._context(), item.source, item.path);
    const formatted = this._formatPrimitive(value, item.digits, item.fallback);
    const unit = this._translate(item.unit_key, item.unit);
    return formatted === VALUE_FALLBACK || !unit ? formatted : `${formatted} ${unit}`;
  }

  private _formatPrimitive(value: unknown, digits?: number, fallback = VALUE_FALLBACK): string {
    if (isMissingRegulationValue(value)) {
      return fallback || VALUE_FALLBACK;
    }

    if (typeof value === "number") {
      return Number.isFinite(value) ? value.toFixed(Math.max(0, digits ?? 0)) : fallback || VALUE_FALLBACK;
    }

    if (typeof value === "boolean") {
      return value ? "true" : "false";
    }

    return String(value);
  }

  private _toneForValue(item: RegulationDashboardValueItem | RegulationDashboardMetric): RegulationDashboardTone {
    const value = readRegulationSourceValue(this._context(), item.source, item.path);
    const tone = item.tone_map?.[String(value)];
    return tone ?? "muted";
  }

  private _readValueRef(ref: RegulationDashboardValueRef): unknown {
    return readRegulationSourceValue(this._context(), ref.source, ref.path);
  }

  private _asNumber(value: unknown): number | undefined {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : undefined;
    }

    if (typeof value !== "string" || value.trim() === "") {
      return undefined;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  private _sourceMissing(source: RegulationDashboardSource): boolean {
    if (!this.hass || !this.config) {
      return true;
    }

    return buildRegulationSources(this.hass, this.config)[source] === undefined;
  }

  private _conditionMatches(condition: RegulationDashboardCondition | undefined): boolean {
    if (!condition) {
      return true;
    }

    return this._truthy(this._evaluateCondition(condition));
  }

  private _evaluateCondition(expression: unknown): unknown {
    if (Array.isArray(expression)) {
      return expression.map((entry) => this._evaluateCondition(entry));
    }

    if (!expression || typeof expression !== "object") {
      return expression;
    }

    const record = expression as Record<string, unknown>;
    if ("var" in record) {
      return this._readConditionVariable(record.var);
    }

    if ("!" in record) {
      return !this._truthy(this._evaluateCondition(record["!"]));
    }

    if ("and" in record) {
      const values = Array.isArray(record.and) ? record.and : [record.and];
      return values.every((value) => this._truthy(this._evaluateCondition(value)));
    }

    if ("or" in record) {
      const values = Array.isArray(record.or) ? record.or : [record.or];
      return values.some((value) => this._truthy(this._evaluateCondition(value)));
    }

    for (const operator of ["==", "!=", ">", ">=", "<", "<="] as const) {
      if (operator in record) {
        const operands = Array.isArray(record[operator]) ? record[operator] : [];
        const left = this._evaluateCondition(operands[0]);
        const right = this._evaluateCondition(operands[1]);
        return this._compareCondition(operator, left, right);
      }
    }

    return true;
  }

  private _readConditionVariable(value: unknown): unknown {
    if (typeof value !== "string") {
      return undefined;
    }

    const path = normalizeRegulationPath(value);
    const source = path[0] as RegulationDashboardSource | undefined;
    if (!source || !["climate", "diagnostic", "power", "humidity", "temperature", "config"].includes(source)) {
      return undefined;
    }

    return readRegulationSourceValue(this._context(), source, path.slice(1));
  }

  private _compareCondition(operator: string, left: unknown, right: unknown): boolean {
    switch (operator) {
      case "==":
        return left === right;
      case "!=":
        return left !== right;
      case ">":
        return Number(left) > Number(right);
      case ">=":
        return Number(left) >= Number(right);
      case "<":
        return Number(left) < Number(right);
      case "<=":
        return Number(left) <= Number(right);
      default:
        return false;
    }
  }

  private _truthy(value: unknown): boolean {
    return value !== false && value !== undefined && value !== null && value !== "" && value !== 0;
  }
}

if (!customElements.get("eq-regulation-renderer")) {
  customElements.define("eq-regulation-renderer", EquinoxRegulationRenderer);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-regulation-renderer": EquinoxRegulationRenderer;
  }
}
