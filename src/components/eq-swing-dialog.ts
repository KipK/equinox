import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { setSwingHorizontalMode, setSwingMode } from "../data/actions";
import { DEFAULT_THEME } from "../const";
import { SWING_HORIZONTAL_MODE_ICONS, SWING_MODE_ICONS, SWING_ORDER } from "../data/climate-modes";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

function orderedModes(values: string[]): string[] {
  const unique = [...new Set(values)];
  const ordered = SWING_ORDER.filter((mode) => unique.includes(mode));
  const extra = unique.filter((mode) => !SWING_ORDER.includes(mode));

  return [...ordered, ...extra];
}

export class EquinoxSwingDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    viewModel: { attribute: false },
    config: { attribute: false },
    language: {},
    floating: { type: Boolean },
    closeOnLeave: { type: Boolean },
    anchor: { attribute: false }
  };

  static styles = css`
    .swing-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: min(320px, calc(100vw - 48px));
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .group-title {
      color: var(--secondary-text-color, var(--equinox-muted-color, #9aa0a6));
      font-size: 12px;
      font-weight: var(--ha-font-weight-medium, 500);
      line-height: 1;
      padding-inline: 2px;
    }

    .swing-grid {
      display: flex;
      overflow: hidden;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      border: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .swing-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      height: 45px;
      border-radius: 0;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      flex: 1;
      min-width: 56px;
    }

    .swing-option:not(:last-child) {
      border-inline-end: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .swing-option:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.12);
    }

    .swing-option[active] {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--primary-color) 22%);
    }

    .swing-option-icon,
    .option-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .swing-option-label {
      display: none;
    }

    .swing-list {
      padding: 0;
      background: transparent;
    }

    ha-md-list-item {
      border-radius: var(--equinox-control-radius, 8px);
      color: var(--primary-text-color, #fff);
      --md-list-item-container-color: transparent;
      --md-list-item-label-text-size: 15px;
      --md-list-item-label-text-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-opacity: 0.08;
      --ha-md-list-item-gap: 12px;
    }

    ha-md-list-item[active] {
      color: var(--primary-color);
      --md-list-item-label-text-color: var(--primary-color);
    }

    .option-check {
      color: var(--primary-color);
    }

    .swing-desktop {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .swing-mobile {
      display: none;
    }

    :host([theme="liquid_glow"]) .swing-grid {
      overflow: visible;
    }

    :host([theme="liquid_glow"]) .swing-option[active] {
      --equinox-swing-active-tone: var(--primary-color);
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      border: 1px solid color-mix(in srgb, var(--equinox-swing-active-tone) 88%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-swing-active-tone) 24%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 86%, var(--equinox-swing-active-tone) 14%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 18%, transparent),
        inset 0 -16px 24px color-mix(in srgb, var(--equinox-swing-active-tone) 18%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-swing-active-tone) 28%, transparent);
      margin-block: -1px;
      height: calc(45px + 2px);
    }

    :host([theme="liquid_glow"]) .swing-option[active]:first-child {
      margin-inline-start: -1px;
      width: calc(100% + 1px);
      border-start-start-radius: var(--equinox-control-radius, 8px);
      border-end-start-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .swing-option[active]:last-child {
      margin-inline-end: -1px;
      width: calc(100% + 1px);
      border-start-end-radius: var(--equinox-control-radius, 8px);
      border-end-end-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .swing-option[active] .swing-option-icon,
    :host([theme="liquid_glow"]) ha-md-list-item[active] .option-icon {
      background: transparent;
      color: var(--primary-color);
    }

    :host([theme="liquid_glow"][light]) .swing-option[active] {
      border-color: color-mix(in srgb, var(--primary-color) 72%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 6%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--primary-color) 16%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 90%, var(--primary-color) 10%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent),
        inset 0 -12px 20px color-mix(in srgb, var(--primary-color) 10%, transparent),
        0 0 9px color-mix(in srgb, var(--primary-color) 16%, transparent);
    }

    @media (max-width: 600px) {
      .swing-desktop {
        display: none;
      }

      .swing-mobile {
        display: block;
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
  anchor?: { element: HTMLElement };

  protected willUpdate(): void {
    this.setAttribute("theme", this.config?.theme ?? DEFAULT_THEME);
    this.toggleAttribute("light", !this.hass?.themes?.darkMode);
  }

  private _verticalOptions(): string[] {
    return orderedModes(this.viewModel?.climate.swingModes ?? []);
  }

  private _horizontalOptions(): string[] {
    return orderedModes(this.viewModel?.climate.swingHorizontalModes ?? []);
  }

  private _swingIcon(mode: string, horizontal = false): string {
    return horizontal
      ? SWING_HORIZONTAL_MODE_ICONS[mode] ?? SWING_MODE_ICONS[mode] ?? "mdi:arrow-expand-horizontal"
      : SWING_MODE_ICONS[mode] ?? "mdi:arrow-oscillating";
  }

  private _swingLabel(mode: string): string {
    const label = localize(this.language, `main.swing.${mode}`);

    return label === `main.swing.${mode}` ? mode : label;
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private async _selectVerticalMode(mode: string): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    await setSwingMode({ hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel }, mode);
    this._dispatchClose();
  }

  private async _selectHorizontalMode(mode: string): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    await setSwingHorizontalMode({ hass: this.hass, entityId: this.config.entity, viewModel: this.viewModel }, mode);
    this._dispatchClose();
  }

  private _renderDesktopGroup(
    options: string[],
    activeMode: string | undefined,
    horizontal: boolean,
    onSelect: (mode: string) => Promise<void>
  ): TemplateResult | typeof nothing {
    if (options.length === 0) {
      return nothing;
    }

    return html`
      <div class="swing-grid">
        ${options.map(
          (mode) => html`
            <button
              class="swing-option"
              ?active=${mode === activeMode}
              @click=${() => onSelect(mode)}
              title=${this._swingLabel(mode)}
              aria-label=${this._swingLabel(mode)}
            >
              <span class="swing-option-icon">
                <ha-icon .icon=${this._swingIcon(mode, horizontal)} style="--mdc-icon-size: 24px;"></ha-icon>
              </span>
              <span class="swing-option-label">${this._swingLabel(mode)}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  private _renderMobileGroup(
    options: string[],
    activeMode: string | undefined,
    horizontal: boolean,
    onSelect: (mode: string) => Promise<void>
  ): TemplateResult | typeof nothing {
    if (options.length === 0) {
      return nothing;
    }

    return html`
      <ha-md-list class="swing-list">
        ${options.map(
          (mode) => html`
            <ha-md-list-item type="button" ?active=${mode === activeMode} @click=${() => onSelect(mode)}>
              <span class="option-icon" slot="start">
                <ha-icon .icon=${this._swingIcon(mode, horizontal)} style="--mdc-icon-size: 24px;"></ha-icon>
              </span>
              <span>${this._swingLabel(mode)}</span>
              ${mode === activeMode
                ? html`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>`
                : nothing}
            </ha-md-list-item>
          `
        )}
      </ha-md-list>
    `;
  }

  protected render() {
    const verticalOptions = this._verticalOptions();
    const horizontalOptions = this._horizontalOptions();
    const showBothGroups = verticalOptions.length > 0 && horizontalOptions.length > 0;
    const title = localize(this.language, "dialog.swing.title");

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
        <div class="swing-content">
          <div class="swing-desktop">
            ${verticalOptions.length > 0
              ? html`
                  <div class="group">
                    ${showBothGroups ? html`<span class="group-title">${localize(this.language, "dialog.swing.vertical")}</span>` : nothing}
                    ${this._renderDesktopGroup(verticalOptions, this.viewModel?.climate.swingMode, false, (mode) => this._selectVerticalMode(mode))}
                  </div>
                `
              : nothing}
            ${horizontalOptions.length > 0
              ? html`
                  <div class="group">
                    ${showBothGroups ? html`<span class="group-title">${localize(this.language, "dialog.swing.horizontal")}</span>` : nothing}
                    ${this._renderDesktopGroup(horizontalOptions, this.viewModel?.climate.swingHorizontalMode, true, (mode) => this._selectHorizontalMode(mode))}
                  </div>
                `
              : nothing}
          </div>
          <div class="swing-mobile">
            ${verticalOptions.length > 0
              ? html`
                  <div class="group">
                    ${showBothGroups ? html`<span class="group-title">${localize(this.language, "dialog.swing.vertical")}</span>` : nothing}
                    ${this._renderMobileGroup(verticalOptions, this.viewModel?.climate.swingMode, false, (mode) => this._selectVerticalMode(mode))}
                  </div>
                `
              : nothing}
            ${horizontalOptions.length > 0
              ? html`
                  <div class="group">
                    ${showBothGroups ? html`<span class="group-title">${localize(this.language, "dialog.swing.horizontal")}</span>` : nothing}
                    ${this._renderMobileGroup(horizontalOptions, this.viewModel?.climate.swingHorizontalMode, true, (mode) => this._selectHorizontalMode(mode))}
                  </div>
                `
              : nothing}
          </div>
        </div>
      </eq-dialog>
    `;
  }
}

if (!customElements.get("eq-swing-dialog")) {
  customElements.define("eq-swing-dialog", EquinoxSwingDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-swing-dialog": EquinoxSwingDialog;
  }
}
