import { LitElement, css, html, nothing } from "lit";
import { cancelTimedPreset, setPresetMode, setTimedPreset } from "../data/actions";
import { DEFAULT_THEME } from "../const";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

const DEFAULT_DURATION = 60;
const BOOST_DURATIONS = [
  15, 30, 45, 60, 75, 90, 105, 120, 150, 180, 210, 240, 300, 360, 420, 480, 600, 720, 960, 1200, 1440
];

export class EquinoxBoostDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    viewModel: { attribute: false },
    config: { attribute: false },
    language: {},
    floating: { type: Boolean },
    closeOnLeave: { type: Boolean },
    anchor: { attribute: false },
    _durationMinutes: { state: true }
  };

  static styles = css`
    .boost-body {
      display: grid;
      align-content: center;
      align-items: center;
      gap: 16px;
      justify-items: center;
      min-width: min(320px, calc(100vw - 56px));
      max-width: calc(100vw - 48px);
      overflow: visible;
      padding: 4px 0 2px;
      color: var(--primary-text-color, #fff);
    }

    .duration-value {
      display: inline-flex;
      align-items: baseline;
      justify-content: center;
      min-width: 0;
      color: var(--equinox-boost-color, var(--accent-color));
      font-size: 32px;
      line-height: 1;
      font-weight: var(--ha-font-weight-medium, 500);
      white-space: nowrap;
    }

    .duration-slider-panel {
      display: grid;
      gap: 8px;
      width: 100%;
      min-width: 0;
    }

    .duration-slider-labels {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.62));
      font-size: 12px;
      line-height: 1;
    }

    .duration-slider {
      --eq-slider-track: color-mix(in srgb, var(--primary-text-color, #fff) 12%, transparent);
      --eq-slider-active: var(--equinox-boost-color, var(--accent-color));
      --eq-slider-thumb-size: 22px;
      --eq-single-value: 50%;
      position: relative;
      height: 42px;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .duration-track {
      position: absolute;
      left: calc(var(--eq-slider-thumb-size) / 2);
      right: calc(var(--eq-slider-thumb-size) / 2);
      top: 50%;
      height: 6px;
      transform: translateY(-50%);
      border-radius: 999px;
      pointer-events: none;
      background:
        linear-gradient(
          90deg,
          var(--eq-slider-active) 0%,
          var(--eq-slider-active) var(--eq-single-value),
          var(--eq-slider-track) var(--eq-single-value),
          var(--eq-slider-track) 100%
        );
    }

    .duration-slider input {
      position: absolute;
      inset-inline: 0;
      top: 50%;
      width: 100%;
      height: 22px;
      margin: 0;
      transform: translateY(-50%);
      appearance: none;
      background: transparent;
      color: var(--eq-slider-active);
      cursor: pointer;
    }

    .duration-slider input:disabled {
      cursor: default;
      opacity: 0.45;
    }

    .duration-slider input::-webkit-slider-thumb {
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

    .duration-slider input::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 0;
      background: currentColor;
      box-shadow: 0 2px 8px rgb(0 0 0 / 28%);
      pointer-events: auto;
    }

    .duration-slider input::-webkit-slider-runnable-track {
      appearance: none;
      height: 6px;
      background: transparent;
    }

    .duration-slider input::-moz-range-track {
      height: 6px;
      background: transparent;
    }

    .action-button {
      min-width: 132px;
      width: max-content;
      min-height: 34px;
      height: 100%;
      max-height: 40px;
      display: grid;
      grid-template-columns: 22px max-content 22px;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0 10px;
      border: 1px solid color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 55%, transparent);
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      color: var(--equinox-text-color, var(--primary-text-color, #fff));
      cursor: pointer;
      font: inherit;
      font-size: clamp(13px, 1.9vh, 15px);
      font-weight: 600;
      line-height: 1.1;
      text-align: center;
    }

    .action-button ha-icon {
      color: var(--equinox-boost-color, var(--accent-color));
      --mdc-icon-size: 20px;
    }

    .action-label {
      white-space: nowrap;
    }

    .action-button:disabled {
      cursor: default;
      opacity: 0.45;
    }

    .action-button:hover:not(:disabled),
    .action-button:focus-visible:not(:disabled) {
      background: color-mix(in srgb, var(--equinox-control-bg, rgba(128, 128, 128, 0.08)) 78%, var(--equinox-boost-color, var(--accent-color)) 22%);
    }

    @media (min-width: 601px) {
      .action-button {
        max-width: none;
      }
    }

    :host([theme="liquid_glow"]) .boost-body {
      overflow: visible;
    }

    :host([theme="liquid_glow"]) .action-button {
      border-color: color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 72%, transparent);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent),
        0 0 7px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 14%, transparent);
    }

    :host([theme="liquid_glow"]) .action-button:hover:not(:disabled),
    :host([theme="liquid_glow"]) .action-button:focus-visible:not(:disabled) {
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 8%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 20%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 88%, var(--equinox-boost-color, var(--accent-color)) 12%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 14%, transparent),
        inset 0 -12px 20px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 12%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 22%, transparent);
    }

    :host([theme="liquid_glow"]) .action-button ha-icon {
      filter: drop-shadow(0 0 4px currentColor);
    }

    :host([theme="liquid_glow"][light]) .action-button {
      border-color: color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 52%, transparent);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #111)) 7%, transparent),
        0 0 6px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 8%, transparent);
    }

    :host([theme="liquid_glow"][light]) .action-button:hover:not(:disabled),
    :host([theme="liquid_glow"][light]) .action-button:focus-visible:not(:disabled) {
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #111)) 5%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 12%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 92%, var(--equinox-boost-color, var(--accent-color)) 8%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #111)) 8%, transparent),
        inset 0 -10px 18px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 8%, transparent),
        0 0 8px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 13%, transparent);
    }

    :host([theme="liquid_glow"][light]) .action-button ha-icon {
      filter: drop-shadow(0 0 2px currentColor);
    }

    @media (max-width: 600px) {
      .boost-body {
        min-width: 0;
        width: 100%;
        max-width: 100%;
        padding-top: 8px;
      }

      .action-button {
        width: 100%;
        max-width: none;
      }
    }
  `;

  open = false;
  hass?: HomeAssistant;
  viewModel?: EquinoxViewModel;
  config?: EquinoxCardConfig;
  language?: string;
  floating = false;
  closeOnLeave = false;
  anchor?: { element: HTMLElement; clientX?: number; clientY?: number };
  private _durationMinutes = DEFAULT_DURATION;

  protected willUpdate(): void {
    // Mirror the active equinox theme onto our host so :host([theme="..."]) rules apply.
    this.setAttribute("theme", this.config?.theme ?? DEFAULT_THEME);
    this.toggleAttribute("light", !this.hass?.themes?.darkMode);
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _dispatchBack(): void {
    this.dispatchEvent(new CustomEvent("equinox-open-menu", { bubbles: true, composed: true }));
  }

  private _hasTimedPreset(): boolean {
    return this.viewModel?.vt?.isVt === true && !!this.viewModel.vt.timedPresetManager;
  }

  private _isDisabled(): boolean {
    return !this.hass || !this.config || this.viewModel?.climate.availability !== "available" || this.viewModel?.vt?.lock.isUserLocked === true;
  }

  private _setDuration(value: number): void {
    if (!BOOST_DURATIONS.includes(value)) {
      return;
    }

    this._durationMinutes = value;
  }

  private _onDurationInput(event: Event): void {
    const index = Number((event.target as HTMLInputElement).value);

    if (!Number.isFinite(index)) {
      return;
    }

    this._setDuration(BOOST_DURATIONS[Math.round(index)] ?? DEFAULT_DURATION);
  }

  private async _startBoost(): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    const ctx = { hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel };
    const result = this._hasTimedPreset()
      ? await setTimedPreset(ctx, "boost", this._durationMinutes)
      : await setPresetMode(ctx, "boost");

    if (result.ok) {
      this._dispatchClose();
    }
  }

  private async _stopBoost(): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    const result = await cancelTimedPreset({
      hass: this.hass,
      entityId: this.config.entity,
      viewModel: this.viewModel
    });

    if (result.ok) {
      this._dispatchClose();
    }
  }

  private _durationIndex(duration: number): number {
    const exactIndex = BOOST_DURATIONS.indexOf(duration);

    if (exactIndex >= 0) {
      return exactIndex;
    }

    return BOOST_DURATIONS.reduce(
      (bestIndex, candidate, index) =>
        Math.abs(candidate - duration) < Math.abs(BOOST_DURATIONS[bestIndex] - duration) ? index : bestIndex,
      0
    );
  }

  private _durationPercent(duration: number): string {
    const max = BOOST_DURATIONS.length - 1;
    const index = this._durationIndex(duration);

    return max > 0 ? `${(index / max) * 100}%` : "0%";
  }

  private _formatDuration(duration: number): { value: string; unit: string } {
    if (duration < 60) {
      return { value: `${duration}${localize(this.language, "dialog.boost.minutes")}`, unit: "" };
    }

    if (duration % 60 === 0) {
      return { value: `${duration / 60}${localize(this.language, "dialog.boost.hours")}`, unit: "" };
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return { value: `${hours}${localize(this.language, "dialog.boost.hours")}${minutes}`, unit: "" };
  }

  protected render() {
    const title = localize(this.language, "dialog.boost.title");
    const timedPreset = this.viewModel?.vt?.timedPreset;
    const isActive = timedPreset?.isActive === true;
    const disabled = this._isDisabled();
    const hasTimedPreset = this._hasTimedPreset();
    const displayedDuration =
      isActive && typeof timedPreset?.remainingTimeMin === "number" ? timedPreset.remainingTimeMin : this._durationMinutes;
    const displayedDurationLabel = this._formatDuration(displayedDuration);

    return html`
      <eq-dialog
        .open=${this.open}
        .title=${title}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        .showBack=${true}
        @eq-dialog-close=${this._dispatchClose}
        @eq-dialog-back=${this._dispatchBack}
      >
        <div class="boost-body">
          ${hasTimedPreset
            ? html`
                <div class="duration-value">${displayedDurationLabel.value}</div>
                <div class="duration-slider-panel">
                  <div class="duration-slider" style=${`--eq-single-value: ${this._durationPercent(displayedDuration)};`}>
                    <div class="duration-track"></div>
                    <input
                      type="range"
                      min="0"
                      max=${BOOST_DURATIONS.length - 1}
                      step="1"
                      .value=${String(this._durationIndex(displayedDuration))}
                      ?disabled=${disabled || isActive}
                      @input=${this._onDurationInput}
                    >
                  </div>
                  <div class="duration-slider-labels">
                    <span>${this._formatDuration(BOOST_DURATIONS[0]).value}</span>
                    <span>${this._formatDuration(BOOST_DURATIONS[BOOST_DURATIONS.length - 1]).value}</span>
                  </div>
                </div>
              `
            : nothing}
          <button class="action-button" ?disabled=${disabled || (isActive && !hasTimedPreset)} @click=${isActive ? this._stopBoost : this._startBoost}>
            <ha-icon aria-hidden="true" .icon=${isActive ? "mdi:timer-off-outline" : "mdi:rocket-launch-outline"}></ha-icon>
            <span class="action-label">${localize(this.language, isActive ? "dialog.boost.stop" : "dialog.boost.start")}</span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </eq-dialog>
    `;
  }
}

if (!customElements.get("eq-boost-dialog")) {
  customElements.define("eq-boost-dialog", EquinoxBoostDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-boost-dialog": EquinoxBoostDialog;
  }
}
