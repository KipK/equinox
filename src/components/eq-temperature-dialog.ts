import { LitElement, css, html } from "lit";
import { setTemperature } from "../data/actions";
import { DEFAULT_THEME } from "../const";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

function finite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export class EquinoxTemperatureDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    viewModel: { attribute: false },
    config: { attribute: false },
    language: {},
    floating: { type: Boolean },
    closeOnLeave: { type: Boolean },
    anchor: { attribute: false },
    _temperature: { state: true },
    _low: { state: true },
    _high: { state: true }
  };

  static styles = css`
    .temperature-body {
      display: grid;
      gap: 16px;
      min-width: min(320px, calc(100vw - 56px));
      max-width: calc(100vw - 48px);
      padding: 4px 0 2px;
      color: var(--primary-text-color, #fff);
    }

    .value-row {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
    }

    .value-main {
      display: inline-flex;
      align-items: baseline;
      justify-content: center;
      gap: 1px;
      font-size: 32px;
      line-height: 1;
      font-weight: var(--ha-font-weight-medium, 500);
      color: var(--eq-temperature-tone, var(--primary-text-color, #fff));
      white-space: nowrap;
    }

    .value-input,
    .range-input {
      width: 4.5ch;
      min-width: 0;
      padding: 0;
      border: 0;
      border-radius: 0;
      outline: none;
      background: transparent;
      color: inherit;
      font: inherit;
      line-height: inherit;
      text-align: end;
      cursor: pointer;
    }

    .value-input:focus,
    .range-input:focus {
      cursor: text;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .value-unit {
      color: inherit;
    }

    .slider-panel {
      display: grid;
      gap: 8px;
      min-width: 0;
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.62));
      font-size: 12px;
      line-height: 1;
    }

    .single-slider,
    .range-slider {
      --eq-slider-track: color-mix(in srgb, var(--primary-text-color, #fff) 12%, transparent);
      --eq-slider-active: var(--eq-temperature-tone, var(--primary-color, #03a9f4));
      --eq-slider-thumb-size: 22px;
      position: relative;
      height: 42px;
      display: flex;
      align-items: center;
    }

    .single-slider {
      --eq-single-value: 50%;
    }

    .range-slider {
      --eq-range-low: 0%;
      --eq-range-high: 100%;
    }

    .single-track,
    .range-track {
      position: absolute;
      left: calc(var(--eq-slider-thumb-size) / 2);
      right: calc(var(--eq-slider-thumb-size) / 2);
      top: 50%;
      height: 6px;
      transform: translateY(-50%);
      border-radius: 999px;
      pointer-events: none;
    }

    .single-track {
      background:
        linear-gradient(
          90deg,
          var(--eq-slider-active) 0%,
          var(--eq-slider-active) var(--eq-single-value),
          var(--eq-slider-track) var(--eq-single-value),
          var(--eq-slider-track) 100%
        );
    }

    .range-track {
      background:
        linear-gradient(
          90deg,
          var(--equinox-heat-color, #ff8a1c) 0%,
          var(--equinox-heat-color, #ff8a1c) var(--eq-range-low),
          var(--eq-slider-track) var(--eq-range-low),
          var(--eq-slider-track) var(--eq-range-high),
          var(--equinox-cool-color, #4da1ff) var(--eq-range-high),
          var(--equinox-cool-color, #4da1ff) 100%
        );
    }

    .single-slider input {
      position: absolute;
      inset-inline: 0;
      top: 50%;
      width: 100%;
      height: 22px;
      margin: 0;
      transform: translateY(-50%);
      appearance: none;
      background: transparent;
      cursor: pointer;
    }

    .single-slider input::-webkit-slider-thumb {
      appearance: none;
      width: 22px;
      height: 22px;
      margin-top: -8px;
      border-radius: 50%;
      border: 0;
      background: currentColor;
      box-shadow: 0 2px 8px rgb(0 0 0 / 28%);
      pointer-events: auto;
    }

    .single-slider input::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 0;
      background: currentColor;
      box-shadow: 0 2px 8px rgb(0 0 0 / 28%);
      pointer-events: auto;
    }

    .single-slider input::-webkit-slider-runnable-track {
      appearance: none;
      height: 6px;
      background: transparent;
    }

    .single-slider input::-moz-range-track {
      height: 6px;
      background: transparent;
    }

    .range-thumb {
      position: absolute;
      left: var(--eq-thumb-position);
      top: 50%;
      width: var(--eq-slider-thumb-size);
      height: var(--eq-slider-thumb-size);
      padding: 0;
      transform: translate(-50%, -50%);
      border: 0;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 2px 8px rgb(0 0 0 / 28%);
      cursor: pointer;
      touch-action: none;
    }

    .range-thumb:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }

    .range-thumb.low {
      color: var(--equinox-heat-color, #ff8a1c);
      z-index: 2;
    }

    .range-thumb.high {
      color: var(--equinox-cool-color, #4da1ff);
      z-index: 1;
    }

    .range-values {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 24px;
      min-height: 32px;
    }

    .range-value {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 1px;
      min-width: 0;
      font-size: 28px;
      line-height: 1;
      font-weight: var(--ha-font-weight-medium, 500);
      white-space: nowrap;
    }

    .range-value[bound="low"] {
      color: var(--equinox-heat-color, #ff8a1c);
    }

    .range-value[bound="high"] {
      color: var(--equinox-cool-color, #4da1ff);
    }

    .disabled {
      opacity: 0.45;
      pointer-events: none;
    }
  `;

  open = false;
  hass?: HomeAssistant;
  viewModel?: EquinoxViewModel;
  config?: EquinoxCardConfig;
  language?: string;
  floating = false;
  closeOnLeave = false;
  anchor?: { element: HTMLElement };
  private _temperature?: number;
  private _low?: number;
  private _high?: number;

  protected willUpdate(changed: Map<string, unknown>): void {
    this.setAttribute("theme", this.config?.theme ?? DEFAULT_THEME);
    this.toggleAttribute("light", !this.hass?.themes?.darkMode);

    if (changed.has("open") && this.open) {
      this._syncValuesFromModel();
    }
  }

  private _syncValuesFromModel(): void {
    this._temperature = this.viewModel?.climate.targetTemperature;
    this._low = this.viewModel?.climate.targetTemperatureRange?.low;
    this._high = this.viewModel?.climate.targetTemperatureRange?.high;
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _isDisabled(): boolean {
    return !this.hass || this.viewModel?.climate.availability !== "available" || this.viewModel?.vt?.lock.isUserLocked === true;
  }

  private _min(): number {
    return finite(this.viewModel?.climate.minTemp) ? this.viewModel.climate.minTemp : 7;
  }

  private _max(): number {
    return finite(this.viewModel?.climate.maxTemp) ? this.viewModel.climate.maxTemp : 35;
  }

  private _step(): number {
    return finite(this.viewModel?.climate.targetTempStep) && this.viewModel.climate.targetTempStep > 0
      ? this.viewModel.climate.targetTempStep
      : 0.5;
  }

  private _stepDecimals(): number {
    const step = String(this._step());
    return step.includes(".") ? (step.split(".")[1]?.length ?? 0) : 0;
  }

  private _snap(value: number): number {
    const step = this._step();
    const min = this._min();
    const snapped = Math.round((value - min) / step) * step + min;

    return Number(clamp(snapped, min, this._max()).toFixed(this._stepDecimals()));
  }

  private _format(value: number | undefined): string {
    if (!finite(value)) {
      return "--.-°";
    }

    const decimals = this._stepDecimals();

    return `${new Intl.NumberFormat(this.language, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)}°`;
  }

  private _formatInput(value: number | undefined): string {
    if (!finite(value)) {
      return "";
    }

    const decimals = this._stepDecimals();

    return new Intl.NumberFormat(this.language, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  private _parseInput(value: string): number | undefined {
    const normalized = value.trim().replace(",", ".");
    const parsed = Number.parseFloat(normalized);

    return Number.isFinite(parsed) ? parsed : undefined;
  }

  private _hasRangeControl(): boolean {
    const mode = this.viewModel?.climate.hvacMode;
    const range = this.viewModel?.climate.targetTemperatureRange;

    return (mode === "heat_cool" || mode === "auto") && (finite(range?.low) || finite(range?.high));
  }

  private _singleValue(): number {
    return this._snap(finite(this._temperature) ? this._temperature : this.viewModel?.climate.targetTemperature ?? this._min());
  }

  private _lowValue(): number {
    return this._snap(finite(this._low) ? this._low : this.viewModel?.climate.targetTemperatureRange?.low ?? this._min());
  }

  private _highValue(): number {
    return this._snap(finite(this._high) ? this._high : this.viewModel?.climate.targetTemperatureRange?.high ?? this._max());
  }

  private _rangePercent(value: number): string {
    const min = this._min();
    const span = this._max() - min;

    return span > 0 ? `${((value - min) / span) * 100}%` : "0%";
  }

  private _singlePercent(): string {
    return this._rangePercent(this._singleValue());
  }

  private _onSingleInput(event: Event): void {
    this._temperature = this._snap(Number((event.target as HTMLInputElement).value));
  }

  private _onTextFocus(event: Event): void {
    (event.target as HTMLInputElement).select();
  }

  private _onTextKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      (event.target as HTMLInputElement).blur();
      return;
    }

    if (event.key === "Escape") {
      this._syncValuesFromModel();
      (event.target as HTMLInputElement).blur();
    }
  }

  private async _onSingleTextBlur(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const parsed = this._parseInput(input.value);

    if (parsed === undefined || this._isDisabled()) {
      input.value = this._formatInput(this._singleValue());
      return;
    }

    this._temperature = this._snap(parsed);
    input.value = this._formatInput(this._singleValue());
    await this._commitSingle();
  }

  private async _commitSingle(): Promise<void> {
    if (!this.hass || !this.config || !this.viewModel || this._isDisabled()) {
      return;
    }

    await setTemperature(
      { hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel },
      { temperature: this._singleValue() }
    );
  }

  private _setRangeValue(bound: "low" | "high", value: number): void {
    const snapped = this._snap(value);

    if (bound === "low") {
      this._low = Math.min(snapped, this._highValue());
      return;
    }

    this._high = Math.max(snapped, this._lowValue());
  }

  private _rangePointerValue(event: PointerEvent): number {
    const slider = (event.currentTarget as HTMLElement).closest(".range-slider");
    const track = slider?.querySelector<HTMLElement>(".range-track");
    const rect = (track ?? slider)?.getBoundingClientRect();

    if (!rect || rect.width <= 0) {
      return this._min();
    }

    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    return this._min() + ratio * (this._max() - this._min());
  }

  private _onRangePointerDown(bound: "low" | "high", event: PointerEvent): void {
    if (this._isDisabled()) return;
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    this._setRangeValue(bound, this._rangePointerValue(event));
  }

  private _onRangePointerMove(bound: "low" | "high", event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (this._isDisabled() || !target.hasPointerCapture(event.pointerId)) return;
    event.preventDefault();
    this._setRangeValue(bound, this._rangePointerValue(event));
  }

  private _onRangePointerUp(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }
    void this._commitRange();
  }

  private _onRangeKeyDown(bound: "low" | "high", event: KeyboardEvent): void {
    if (this._isDisabled()) return;

    const current = bound === "low" ? this._lowValue() : this._highValue();
    let next: number | undefined;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = current - this._step();
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = current + this._step();
        break;
      case "Home":
        next = this._min();
        break;
      case "End":
        next = this._max();
        break;
      default:
        return;
    }

    event.preventDefault();
    this._setRangeValue(bound, next);
    void this._commitRange();
  }

  private async _onRangeTextBlur(bound: "low" | "high", event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const parsed = this._parseInput(input.value);

    if (parsed === undefined || this._isDisabled()) {
      input.value = this._formatInput(bound === "low" ? this._lowValue() : this._highValue());
      return;
    }

    const value = this._snap(parsed);

    if (bound === "low") {
      this._low = Math.min(value, this._highValue());
    } else {
      this._high = Math.max(value, this._lowValue());
    }

    input.value = this._formatInput(bound === "low" ? this._lowValue() : this._highValue());
    await this._commitRange();
  }

  private _tone(): string {
    if (this.viewModel?.vt?.timedPreset.isActive) {
      return "boost";
    }

    const mode = this.viewModel?.climate.hvacMode;

    if (this.viewModel?.climate.availability !== "available" || mode === "off") {
      return "unavailable";
    }

    return mode ?? "";
  }

  private _toneColor(): string {
    switch (this._tone()) {
      case "heat":
      case "boost":
        return "var(--equinox-heat-color, #ff8a1c)";
      case "cool":
        return "var(--equinox-cool-color, #4da1ff)";
      case "heat_cool":
      case "heat-cool":
        return "var(--equinox-heat-cool-color, #9b5cff)";
      case "off":
      case "unavailable":
        return "var(--disabled-text-color, rgba(128, 128, 128, 0.5))";
      default:
        return "var(--equinox-auto-color, var(--primary-color, #03a9f4))";
    }
  }

  private async _commitRange(): Promise<void> {
    if (!this.hass || !this.config || !this.viewModel || this._isDisabled()) {
      return;
    }

    await setTemperature(
      { hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel },
      { targetTempLow: this._lowValue(), targetTempHigh: this._highValue() }
    );
  }

  protected render() {
    const title = localize(this.language, "editor.options.primary_display.setpoint");

    return html`
      <eq-dialog
        .open=${this.open}
        .title=${title}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        ${this._hasRangeControl() ? this._renderRange() : this._renderSingle()}
      </eq-dialog>
    `;
  }

  private _renderSingle() {
    const value = this._singleValue();

    return html`
      <div class="temperature-body ${this._isDisabled() ? "disabled" : ""}">
        <div class="value-row">
          <span class="value-main" style=${`--eq-temperature-tone: ${this._toneColor()};`}>
            <input
              class="value-input"
              type="text"
              inputmode="decimal"
              .value=${this._formatInput(value)}
              ?disabled=${this._isDisabled()}
              @focus=${this._onTextFocus}
              @keydown=${this._onTextKeyDown}
              @blur=${this._onSingleTextBlur}
            >
            <span class="value-unit">°</span>
          </span>
        </div>
        <div class="slider-panel">
          <div class="single-slider" style=${`--eq-temperature-tone: ${this._toneColor()}; --eq-single-value: ${this._singlePercent()};`}>
            <div class="single-track"></div>
            <input
              type="range"
              min=${this._min()}
              max=${this._max()}
              step=${this._step()}
              .value=${String(value)}
              ?disabled=${this._isDisabled()}
              @input=${this._onSingleInput}
              @change=${this._commitSingle}
            >
          </div>
          <div class="slider-labels">
            <span>${this._format(this._min())}</span>
            <span>${this._format(this._max())}</span>
          </div>
        </div>
      </div>
    `;
  }

  private _renderRange() {
    const low = this._lowValue();
    const high = this._highValue();

    return html`
      <div class="temperature-body ${this._isDisabled() ? "disabled" : ""}">
        <div class="range-values">
          <span class="range-value" bound="low">
            <input
              class="range-input"
              type="text"
              inputmode="decimal"
              .value=${this._formatInput(low)}
              ?disabled=${this._isDisabled()}
              @focus=${this._onTextFocus}
              @keydown=${this._onTextKeyDown}
              @blur=${(event: Event) => this._onRangeTextBlur("low", event)}
            >
            <span class="value-unit">°</span>
          </span>
          <span class="range-value" bound="high">
            <input
              class="range-input"
              type="text"
              inputmode="decimal"
              .value=${this._formatInput(high)}
              ?disabled=${this._isDisabled()}
              @focus=${this._onTextFocus}
              @keydown=${this._onTextKeyDown}
              @blur=${(event: Event) => this._onRangeTextBlur("high", event)}
            >
            <span class="value-unit">°</span>
          </span>
        </div>
        <div class="slider-panel">
          <div
            class="range-slider"
            style=${`--eq-range-low: ${this._rangePercent(low)}; --eq-range-high: ${this._rangePercent(high)};`}
          >
            <div class="range-track"></div>
            <button
              class="range-thumb low"
              type="button"
              role="slider"
              aria-valuemin=${this._min()}
              aria-valuemax=${this._max()}
              aria-valuenow=${low}
              aria-valuetext=${this._format(low)}
              style=${`--eq-thumb-position: ${this._rangePercent(low)};`}
              ?disabled=${this._isDisabled()}
              @pointerdown=${(event: PointerEvent) => this._onRangePointerDown("low", event)}
              @pointermove=${(event: PointerEvent) => this._onRangePointerMove("low", event)}
              @pointerup=${(event: PointerEvent) => this._onRangePointerUp(event)}
              @pointercancel=${(event: PointerEvent) => this._onRangePointerUp(event)}
              @keydown=${(event: KeyboardEvent) => this._onRangeKeyDown("low", event)}
            ></button>
            <button
              class="range-thumb high"
              type="button"
              role="slider"
              aria-valuemin=${this._min()}
              aria-valuemax=${this._max()}
              aria-valuenow=${high}
              aria-valuetext=${this._format(high)}
              style=${`--eq-thumb-position: ${this._rangePercent(high)};`}
              ?disabled=${this._isDisabled()}
              @pointerdown=${(event: PointerEvent) => this._onRangePointerDown("high", event)}
              @pointermove=${(event: PointerEvent) => this._onRangePointerMove("high", event)}
              @pointerup=${(event: PointerEvent) => this._onRangePointerUp(event)}
              @pointercancel=${(event: PointerEvent) => this._onRangePointerUp(event)}
              @keydown=${(event: KeyboardEvent) => this._onRangeKeyDown("high", event)}
            ></button>
          </div>
          <div class="slider-labels">
            <span>${this._format(this._min())}</span>
            <span>${this._format(this._max())}</span>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("eq-temperature-dialog")) {
  customElements.define("eq-temperature-dialog", EquinoxTemperatureDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-temperature-dialog": EquinoxTemperatureDialog;
  }
}
