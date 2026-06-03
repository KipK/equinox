import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import type { AttributeUnitMap, BetterHistoryConfig } from "@kipk/ha-better-history";
import { equinoxAttributeUnits, loadEquinoxStaticAttributeUnits } from "../data/attribute-units";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

export type SensorMoreInfoTarget =
  | { kind: "power" }
  | { kind: "entity"; entityId: string; icon?: string; attribute?: string | string[]; unit?: string; label?: string };

interface SensorMoreInfoMetric {
  id: string;
  icon: string;
  entityId: string;
  attribute?: string | string[];
  name: string;
  value: string;
  unit?: string;
  displayUnit?: string;
  scaleGroup: string;
  scalePreference?: "auto" | "primary" | "secondary";
  color?: string;
  valueColor?: string;
  lastChanged?: string;
}

type HassEntityWithTimestamps = HassEntity & {
  last_changed?: string;
  last_updated?: string;
};

type HomeAssistantWithConfig = HomeAssistant & {
  config?: {
    unit_system?: {
      temperature?: string;
    };
  };
};

const HA_MORE_INFO_BLUE = "var(--primary-color, #03a9f4)";
const POWER_BOOST_COLOR = "var(--equinox-boost-color, var(--accent-color, #b06cff))";

function finite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function readObject(source: unknown): Record<string, unknown> | undefined {
  return typeof source === "object" && source !== null ? (source as Record<string, unknown>) : undefined;
}

function readPath(source: unknown, path: string[]): unknown {
  return path.reduce<unknown>((current, key) => readObject(current)?.[key], source);
}

function normalizeAttribute(attribute: string | string[] | undefined): string[] | undefined {
  if (Array.isArray(attribute)) return attribute;
  if (typeof attribute === "string" && attribute !== "") return [attribute];
  return undefined;
}

function attributeKey(attribute: string | string[] | undefined): string {
  return normalizeAttribute(attribute)?.join(".") ?? "state";
}

function stateTimestamp(stateObj: HassEntity | undefined): string | undefined {
  const record = stateObj as HassEntityWithTimestamps | undefined;
  return record?.last_updated ?? record?.last_changed;
}

function hasPath(attributes: Record<string, unknown>, path: string[]): boolean {
  return readPath(attributes, path) !== undefined;
}

export class EquinoxSensorMoreInfoDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    config: { attribute: false },
    viewModel: { attribute: false },
    language: {},
    target: { attribute: false },
    _controlsVisible: { state: true },
    _toolsOpen: { state: true },
    _staticAttributeUnits: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    eq-dialog {
      --eq-dialog-width: min(560px, calc(100vw - 48px));
      --eq-dialog-min-width: 360px;
      --eq-dialog-content-padding: 0 16px 8px;
      --eq-dialog-radius: 28px;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 18px;
      min-width: 0;
      padding-top: var(--ha-space-3, 12px);
      color: var(--primary-text-color);
    }

    .more-info-title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 0;
      margin: 0;
      padding-left: 1px;
    }

    .more-info-title p {
      margin: 0;
      min-width: 0;
      width: calc(100% - 1px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .more-info-title .breadcrumb {
      width: auto;
      max-width: calc(100% - 2px);
      overflow: visible;
      text-overflow: clip;
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-m, 14px);
      line-height: 16px;
      padding: 0 0 0 2px;
      margin: 0;
    }

    .more-info-title .main {
      color: var(--primary-text-color);
      font-size: var(--ha-font-size-xl, 24px);
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: var(--ha-line-height-condensed, 1.2);
    }

    .sensor-summary {
      display: flex;
      flex-direction: column;
      gap: 0;
      min-width: 0;
    }

    .sensor-row {
      display: grid;
      grid-template-columns: 32px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      min-width: 0;
      padding: 8px 0;
    }

    .sensor-icon {
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--state-icon-color, var(--paper-item-icon-color, var(--secondary-text-color)));
      flex: 0 0 auto;
    }

    .sensor-icon ha-icon {
      --mdc-icon-size: 21px;
    }

    .sensor-main {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }

    .sensor-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: var(--ha-font-weight-medium, 500);
      line-height: 1.25;
    }

    .sensor-updated {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.2;
    }

    .sensor-value {
      min-width: 0;
      max-width: 180px;
      overflow-wrap: anywhere;
      text-align: right;
      font-size: 14px;
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: 1.2;
    }

    .history-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      min-height: 32px;
      margin-bottom: -8px;
    }

    .history-title {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--primary-text-color);
      font-size: var(--ha-font-size-xl, 24px);
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: var(--ha-line-height-condensed, 1.2);
    }

    .history-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 0 0 auto;
    }

    .history-heading ha-icon-button {
      --ha-icon-button-size: 34px;
      --ha-icon-button-padding-inline: 5px;
      color: var(--primary-text-color);
    }

    .history-heading ha-icon-button.tools-button ha-icon {
      --mdc-icon-size: 18px;
    }

    .history {
      display: flex;
      width: 100%;
      min-width: 0;
      min-height: 300px;
      height: min(46vh, 420px);
      --better-history-min-height: 0px;
    }

    .empty {
      padding: 14px 4px;
      color: var(--secondary-text-color);
      text-align: center;
      font-size: 14px;
    }

    @media (max-width: 600px) {
      eq-dialog {
        --eq-dialog-width: 100vw;
        --eq-dialog-min-width: 0;
        --eq-dialog-mobile-content-padding: 12px max(12px, env(safe-area-inset-right)) max(8px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
      }

      .history {
        min-height: 320px;
        height: 50vh;
      }

      .sensor-value {
        max-width: 128px;
      }
    }
  `;

  open = false;
  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  viewModel?: EquinoxViewModel;
  language?: string;
  target?: SensorMoreInfoTarget;
  private _controlsVisible = false;
  private _toolsOpen = false;
  private _staticAttributeUnits?: AttributeUnitMap;
  private _attributeUnitsLoadStarted = false;
  private _configCacheKey = "";
  private _configCache?: BetterHistoryConfig;

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("open") && this.open) {
      this._controlsVisible = false;
      this._toolsOpen = false;
    }
  }

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

  private _language(): string | undefined {
    return this.language ?? this.hass?.locale?.language ?? this.hass?.language;
  }

  private _dialogTitle(): string {
    if (this.target?.kind === "power") {
      return localize(this._language(), "dialog.sensor_more_info.power_title");
    }

    if (this.target?.kind === "entity") {
      const stateObj = this.hass?.states[this.target.entityId];
      const name = this.target.label ?? this._friendlyName(stateObj) ?? this.target.entityId;
      return name || localize(this._language(), "dialog.sensor_more_info.title");
    }

    return localize(this._language(), "dialog.sensor_more_info.title");
  }

  private _dialogBreadcrumb(): string | undefined {
    return this._climateTitle();
  }

  private _climateTitle(): string | undefined {
    if (!this.config) return undefined;
    const climate = this.hass?.states[this.config.entity];
    return this.config.name ?? this._friendlyName(climate) ?? this.config.entity;
  }

  private _friendlyName(stateObj: HassEntity | undefined): string | undefined {
    const value = stateObj?.attributes.friendly_name;
    return typeof value === "string" && value !== "" ? value : undefined;
  }

  private _entityIcon(stateObj: HassEntity | undefined, entityId: string): string {
    const icon = stateObj?.attributes.icon;
    if (typeof icon === "string" && icon !== "") return icon;

    const domain = entityId.split(".")[0];
    switch (domain) {
      case "sensor":
        return "mdi:eye";
      case "binary_sensor":
        return "mdi:radiobox-marked";
      case "climate":
        return "mdi:thermostat";
      case "input_number":
        return "mdi:counter";
      default:
        return "mdi:information-outline";
    }
  }

  private _temperatureUnit(): string {
    const unit = (this.hass as HomeAssistantWithConfig | undefined)?.config?.unit_system?.temperature;
    return typeof unit === "string" && unit !== "" ? unit : "°";
  }

  private _formatNumber(value: number, maximumFractionDigits = 1): string {
    return new Intl.NumberFormat(this._language(), {
      maximumFractionDigits,
      minimumFractionDigits: maximumFractionDigits === 0 ? 0 : 1
    }).format(value);
  }

  private _formatPercent(value?: number): string {
    return finite(value) ? `${this._formatNumber(value, 0)}%` : "--%";
  }

  private _formatStateValue(value: unknown, unit?: string, displayUnit?: string): string {
    if (value === undefined || value === null || value === "") return "--";

    const numeric = typeof value === "number" ? value : Number(value);
    const suffix = displayUnit ?? unit;
    if (Number.isFinite(numeric) && typeof value !== "boolean") {
      return `${this._formatNumber(numeric)}${suffix && suffix !== "temperature" ? ` ${suffix}` : suffix === "temperature" ? "°" : ""}`;
    }

    return `${String(value)}${suffix && suffix !== "temperature" ? ` ${suffix}` : suffix === "temperature" ? "°" : ""}`;
  }

  private _relativeTime(timestamp: string | undefined): string | undefined {
    if (!timestamp) return undefined;

    const time = Date.parse(timestamp);
    if (!Number.isFinite(time)) return undefined;

    const diffSeconds = Math.round((time - Date.now()) / 1000);
    const absSeconds = Math.abs(diffSeconds);
    const formatter = new Intl.RelativeTimeFormat(this._language(), { numeric: "auto", style: "short" });

    if (absSeconds < 60) return formatter.format(diffSeconds, "second");
    if (absSeconds < 3600) return formatter.format(Math.round(diffSeconds / 60), "minute");
    if (absSeconds < 86400) return formatter.format(Math.round(diffSeconds / 3600), "hour");
    return formatter.format(Math.round(diffSeconds / 86400), "day");
  }

  private _metricValueFromAttribute(stateObj: HassEntity | undefined, attribute: string | string[] | undefined): unknown {
    const path = normalizeAttribute(attribute);
    if (!path) return stateObj?.state;
    return readPath(stateObj?.attributes, path);
  }

  private _entityMetrics(target: Extract<SensorMoreInfoTarget, { kind: "entity" }>): SensorMoreInfoMetric[] {
    const stateObj = this.hass?.states[target.entityId];
    const attribute = target.attribute;
    const rawValue = this._metricValueFromAttribute(stateObj, attribute);
    const entityUnit = typeof stateObj?.attributes.unit_of_measurement === "string" ? stateObj.attributes.unit_of_measurement : undefined;
    const unit = target.unit === "temperature" ? this._temperatureUnit() : target.unit ?? (attribute ? undefined : entityUnit);
    const displayUnit = target.unit === "temperature" ? "temperature" : unit;
    const name = target.label ?? this._friendlyName(stateObj) ?? target.entityId;

    return [{
      id: `${target.entityId}:${attributeKey(attribute)}`,
      icon: target.icon ?? this._entityIcon(stateObj, target.entityId),
      entityId: target.entityId,
      attribute,
      name,
      value: this._formatStateValue(rawValue, unit, displayUnit),
      unit,
      displayUnit,
      scaleGroup: "sensor",
      color: HA_MORE_INFO_BLUE,
      lastChanged: stateTimestamp(stateObj)
    }];
  }

  private _powerAttributeMetric(): SensorMoreInfoMetric | undefined {
    if (!this.config || !this.hass) return undefined;

    const vt = this.viewModel?.vt;
    const climate = this.hass.states[this.config.entity];
    if (!vt || !climate) return undefined;

    const attrs = climate.attributes;
    if (vt.types.includes("over_valve") || vt.types.includes("over_climate_valve")) {
      const attribute = hasPath(attrs, ["valve_open_percent"])
        ? "valve_open_percent"
        : hasPath(attrs, ["vtherm_over_valve", "valve_open_percent"])
          ? ["vtherm_over_valve", "valve_open_percent"]
          : hasPath(attrs, ["vtherm_over_climate_valve", "valve_regulation", "valve_open_percent"])
            ? ["vtherm_over_climate_valve", "valve_regulation", "valve_open_percent"]
            : "valve_open_percent";

      return finite(vt.powerValve.valveOpenPercent)
        ? {
            id: "valve-open-percent",
            icon: "mdi:pipe-valve",
            entityId: this.config.entity,
            attribute,
            name: localize(this._language(), "dialog.sensor_more_info.valve_opening"),
            value: this._formatPercent(vt.powerValve.valveOpenPercent),
            unit: "%",
            displayUnit: "%",
            scaleGroup: "power-popup",
            scalePreference: "secondary",
            color: HA_MORE_INFO_BLUE,
            lastChanged: stateTimestamp(climate)
          }
        : undefined;
    }

    if (vt.types.includes("over_switch")) {
      const attribute = hasPath(attrs, ["power_percent"])
        ? "power_percent"
        : hasPath(attrs, ["vtherm_over_switch", "power_percent"])
          ? ["vtherm_over_switch", "power_percent"]
          : hasPath(attrs, ["vtherm_over_climate", "valve_regulation", "power_percent"])
            ? ["vtherm_over_climate", "valve_regulation", "power_percent"]
            : "power_percent";

      return finite(vt.powerValve.powerPercent)
        ? {
            id: "power-percent",
            icon: "mdi:meter-electric",
            entityId: this.config.entity,
            attribute,
            name: localize(this._language(), "dialog.sensor_more_info.power_request"),
            value: this._formatPercent(vt.powerValve.powerPercent),
            unit: "%",
            displayUnit: "%",
            scaleGroup: "power-popup",
            scalePreference: "secondary",
            color: HA_MORE_INFO_BLUE,
            lastChanged: stateTimestamp(climate)
          }
        : undefined;
    }

    return undefined;
  }

  private _powerMetrics(): SensorMoreInfoMetric[] {
    if (!this.config || !this.hass) return [];

    const metrics: SensorMoreInfoMetric[] = [];
    const powerEntityId = this.config.power_entity;
    const powerState = powerEntityId ? this.hass.states[powerEntityId] : undefined;
    const powerUnit = typeof powerState?.attributes.unit_of_measurement === "string" ? powerState.attributes.unit_of_measurement : undefined;

    if (powerEntityId && powerState) {
      metrics.push({
        id: "instant-power",
        icon: "mdi:flash",
        entityId: powerEntityId,
        name: this._friendlyName(powerState) ?? powerEntityId,
        value: this._formatStateValue(powerState.state, powerUnit),
        unit: powerUnit,
        displayUnit: powerUnit,
        scaleGroup: "power-popup",
        scalePreference: "primary",
        color: POWER_BOOST_COLOR,
        valueColor: POWER_BOOST_COLOR,
        lastChanged: stateTimestamp(powerState)
      });
    }

    const percentMetric = this._powerAttributeMetric();
    if (percentMetric) {
      metrics.push({
        ...percentMetric,
        scalePreference: metrics.length > 0 ? "secondary" : "primary"
      });
    }

    return metrics;
  }

  private _metrics(): SensorMoreInfoMetric[] {
    if (!this.target) return [];
    if (this.target.kind === "power") return this._powerMetrics();
    return this._entityMetrics(this.target);
  }

  private _betterHistoryConfig(metrics: SensorMoreInfoMetric[]): BetterHistoryConfig {
    const key = metrics
      .map((metric) =>
        `${metric.id}|${metric.entityId}|${attributeKey(metric.attribute)}|${metric.unit ?? ""}|${metric.scaleGroup}|${metric.scalePreference ?? ""}|${metric.color ?? ""}`
      )
      .join(";");

    if (key === this._configCacheKey && this._configCache) return this._configCache;
    this._configCacheKey = key;
    this._configCache = {
      hours: 24,
      showDatePicker: true,
      showEntityPicker: true,
      showLegend: true,
      showTooltip: true,
      showScale: true,
      showGrid: true,
      showExportButton: false,
      showImportButton: false,
      showTimeRangeSelector: true,
      showLineModeButtons: true,
      autoScaleSplit: true,
      debugPerformance: false,
      title: undefined,
      series: metrics.map((metric) => ({
        entity: metric.entityId,
        attribute: metric.attribute,
        label: metric.name,
        color: metric.color,
        unit: metric.unit,
        group: metric.scaleGroup,
        scalePreference: metric.scalePreference
      }))
    };

    return this._configCache;
  }

  private _renderMetric(metric: SensorMoreInfoMetric): TemplateResult {
    const relative = this._relativeTime(metric.lastChanged);

    return html`
      <div class="sensor-row">
        <span class="sensor-icon"><ha-icon .icon=${metric.icon}></ha-icon></span>
        <div class="sensor-main">
          <span class="sensor-name">${metric.name}</span>
          ${relative ? html`<span class="sensor-updated">${relative}</span>` : nothing}
        </div>
        <span class="sensor-value" style=${metric.valueColor ? `color: ${metric.valueColor};` : ""}>${metric.value}</span>
      </div>
    `;
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  protected render(): TemplateResult {
    const metrics = this._metrics();
    const breadcrumb = this._dialogBreadcrumb();
    const title = this._dialogTitle();

    return html`
      <eq-dialog
        centered
        close-start
        .open=${this.open}
        .title=${title}
        .language=${this.language}
        @eq-dialog-close=${() => this._dispatchClose()}
      >
        <div slot="title" class="more-info-title">
          ${breadcrumb ? html`<p class="breadcrumb">${breadcrumb}</p>` : nothing}
          <p class="main">${title}</p>
        </div>
        <div class="content">
          ${metrics.length > 0
            ? html`<div class="sensor-summary">${metrics.map((metric) => this._renderMetric(metric))}</div>`
            : html`<div class="empty">${localize(this._language(), "dialog.sensor_more_info.unavailable")}</div>`}
          ${metrics.length > 0
            ? html`
                <div class="history-heading">
                  <span class="history-title">${localize(this._language(), "dialog.history.title")}</span>
                  <span class="history-actions">
                    <ha-icon-button
                      class="tools-button"
                      .label=${localize(this._language(), "dialog.history.tools")}
                      ?active=${this._toolsOpen}
                      @click=${() => { this._toolsOpen = !this._toolsOpen; }}
                    >
                      <ha-icon icon="mdi:tools"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      .label=${localize(
                        this._language(),
                        this._controlsVisible ? "dialog.history.hide_controls" : "dialog.history.show_controls"
                      )}
                      @click=${() => { this._controlsVisible = !this._controlsVisible; }}
                    >
                      <ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
                    </ha-icon-button>
                  </span>
                </div>
              `
            : nothing}
          ${this.open && metrics.length > 0
            ? html`
                <equinox-better-history
                  .hass=${this.hass}
                  .config=${this._betterHistoryConfig(metrics)}
                  .attributeUnits=${equinoxAttributeUnits(this._staticAttributeUnits)}
                  .language=${this.language}
                  .showControls=${this._controlsVisible}
                  .toolsOpen=${this._toolsOpen}
                  class="history"
                ></equinox-better-history>
              `
            : nothing}
        </div>
      </eq-dialog>
    `;
  }
}

if (!customElements.get("eq-sensor-more-info-dialog")) {
  customElements.define("eq-sensor-more-info-dialog", EquinoxSensorMoreInfoDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-sensor-more-info-dialog": EquinoxSensorMoreInfoDialog;
  }
}
