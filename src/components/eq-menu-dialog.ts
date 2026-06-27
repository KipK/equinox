import { LitElement, css, html, nothing } from "lit";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { RegulationDashboard } from "../types/regulation-dashboard";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

export class EquinoxMenuDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    viewModel: { attribute: false },
    config: { attribute: false },
    regulationDashboard: { attribute: false },
    regulationAvailable: { type: Boolean, attribute: "regulation-available" },
    language: {},
    floating: { type: Boolean },
    closeOnLeave: { type: Boolean },
    anchor: { attribute: false }
  };

  static styles = css`
    .menu-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      padding: 0;
      background: transparent;
      box-sizing: border-box;
    }

    .menu-item {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
      width: 100%;
      min-height: 52px;
      padding: 8px 12px;
      border-radius: var(--equinox-control-radius, 8px);
      border: 1px solid transparent;
      background: transparent;
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      font: inherit;
      font-size: 15px;
      text-align: start;
      box-sizing: border-box;
    }

    .menu-item:hover,
    .menu-item:focus-visible {
      background: color-mix(in srgb, var(--primary-text-color, #fff) 8%, transparent);
      outline: none;
    }

    .option-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .option-icon[tone="boost"] {
      color: var(--equinox-boost-color, #b06cff);
      background: color-mix(in srgb, var(--equinox-boost-color, #b06cff) 16%, transparent);
    }

    .option-trailing {
      display: flex;
      align-items: center;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    }

    .boost-time {
      color: var(--equinox-boost-color, #b06cff);
      font-size: 13px;
      font-weight: 500;
    }

  `;

  open = false;
  hass?: HomeAssistant;
  viewModel?: EquinoxViewModel;
  config?: EquinoxCardConfig;
  regulationDashboard?: RegulationDashboard;
  regulationAvailable = false;
  language?: string;
  floating = false;
  closeOnLeave = false;
  anchor?: { element: HTMLElement; clientX?: number; clientY?: number };

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _dispatchAndClose(eventName: string, detail?: Record<string, unknown>): void {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true, composed: true }));
    this._dispatchClose();
  }

  private _dispatchOpen(eventName: string): void {
    this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true }));
  }

  private _showRegulation(): boolean {
    return this.config?.additional_dashboards !== "disabled" && this.regulationAvailable;
  }

  private _showBoost(): boolean {
    return this.viewModel?.vt?.timedPreset.isActive === true || !!this.viewModel?.vt?.timedPresetManager;
  }

  private _showSwing(): boolean {
    return this.config?.show_swing_mode !== false && this.config?.display_mode !== "thin" && (
      (this.viewModel?.climate.swingModes?.length ?? 0) > 0 ||
      (this.viewModel?.climate.swingHorizontalModes?.length ?? 0) > 0
    );
  }

  protected render() {
    const showRegulation = this._showRegulation();
    const showSwing = this._showSwing();
    const showBoost = this._showBoost();
    const timedPresetActive = this.viewModel?.vt?.timedPreset.isActive === true;
    const remainingTimeMin = this.viewModel?.vt?.timedPreset.remainingTimeMin;
    const title = localize(this.language, "dialog.menu.title");

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
        <div class="menu-list" role="list">
          ${showRegulation
            ? html`
                <button class="menu-item" type="button" @click=${() => this._openRegulationMenuEntry()}>
                  <span class="option-icon">
                    <ha-icon icon="mdi:chart-line" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${localize(this.language, "dialog.menu.regulation")}</span>
                  <span class="option-trailing">
                    <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
                  </span>
                </button>
              `
            : nothing}

          ${showSwing
            ? html`
                <button class="menu-item" type="button" @click=${() => this._dispatchOpen("equinox-open-swing")}>
                  <span class="option-icon">
                    <ha-icon icon="mdi:arrow-oscillating" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${localize(this.language, "main.actions.open_swing")}</span>
                  <span class="option-trailing">
                    <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
                  </span>
                </button>
              `
            : nothing}

          ${showBoost
            ? html`
                <button class="menu-item" type="button" @click=${() => this._dispatchOpen("equinox-open-boost")}>
                  <span class="option-icon" tone=${timedPresetActive ? "boost" : ""}>
                    <ha-icon icon="mdi:timer-outline" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${localize(this.language, "dialog.menu.boost")}</span>
                  <span class="option-trailing">
                    ${timedPresetActive && typeof remainingTimeMin === "number"
                      ? html`<span class="boost-time">${remainingTimeMin} min</span>`
                      : html`<ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>`}
                  </span>
                </button>
              `
            : nothing}

          <button class="menu-item" type="button" @click=${() => this._dispatchOpen("equinox-open-history")}>
            <span class="option-icon">
              <ha-icon icon="mdi:chart-bar" style="--mdc-icon-size: 24px;"></ha-icon>
            </span>
            <span>${localize(this.language, "dialog.menu.history")}</span>
            <span class="option-trailing">
              <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
            </span>
          </button>
        </div>
      </eq-dialog>
    `;
  }

  private _openRegulationMenuEntry(): void {
    const sections = this.regulationDashboard?.sections ?? [];
    this._dispatchAndClose("equinox-open-regulation", sections.length > 0 ? { sectionId: sections[0].id } : undefined);
  }
}

if (!customElements.get("eq-menu-dialog")) {
  customElements.define("eq-menu-dialog", EquinoxMenuDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-menu-dialog": EquinoxMenuDialog;
  }
}
