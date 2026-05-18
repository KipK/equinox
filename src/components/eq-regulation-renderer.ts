import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { localize } from "../localize/localize";
import { translateRegulationDashboardText } from "../data/regulation-dashboard-i18n";
import {
  buildRegulationSources,
  isMissingRegulationValue,
  readRegulationSourceValue,
  type RegulationDashboardValueContext
} from "../data/regulation-dashboard-values";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type {
  RegulationDashboard,
  RegulationDashboardItem,
  RegulationDashboardMetric,
  RegulationDashboardMetricGridItem,
  RegulationDashboardProgressItem,
  RegulationDashboardSection,
  RegulationDashboardSource,
  RegulationDashboardStatusItem,
  RegulationDashboardStatusMapEntry,
  RegulationDashboardTone,
  RegulationDashboardValueItem,
  RegulationDashboardValueRef
} from "../types/regulation-dashboard";

const VALUE_FALLBACK = "--";

export class EquinoxRegulationRenderer extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    dashboard: { attribute: false },
    activeSectionId: { attribute: "active-section-id" },
    language: {}
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
      gap: 14px;
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
      padding: 14px;
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
      gap: 8px;
      padding: 12px;
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
      font-size: 18px;
      line-height: 1.15;
      font-weight: 650;
      color: var(--primary-text-color);
    }

    .metric-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
      gap: 8px;
    }

    .metric {
      display: grid;
      gap: 6px;
      min-width: 0;
      padding: 10px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }

    .metric .value {
      text-align: start;
      font-size: 17px;
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
      font-size: 12px;
    }

    .progress-track {
      height: 8px;
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
      padding: 10px 12px;
    }

    .text {
      white-space: pre-line;
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
  dashboard?: RegulationDashboard;
  activeSectionId?: string;
  language?: string;

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
      case "action":
        return html`
          <aside class="note" tone="muted">
            <ha-icon icon="mdi:progress-wrench"></ha-icon>
            <p class="text">${localize(this.language, "dialog.regulation.unsupported_block")}</p>
          </aside>
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

  private _renderMetricGrid(item: RegulationDashboardMetricGridItem): TemplateResult {
    return html`
      <article class="block">
        ${this._translate(item.title_key, item.title) ? html`<h3>${this._translate(item.title_key, item.title)}</h3>` : nothing}
        <div class="metric-grid">
          ${item.metrics.map((metric) => this._renderMetric(metric))}
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
}

if (!customElements.get("eq-regulation-renderer")) {
  customElements.define("eq-regulation-renderer", EquinoxRegulationRenderer);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-regulation-renderer": EquinoxRegulationRenderer;
  }
}
