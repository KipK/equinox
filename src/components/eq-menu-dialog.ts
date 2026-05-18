import { LitElement, css, html, nothing } from "lit";
import { localize } from "../localize/localize";
import { translateRegulationDashboardText } from "../data/regulation-dashboard-i18n";
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
    anchor: { attribute: false },
    _submenu: { state: true }
  };

  static styles = css`
    .menu-list {
      width: 100%;
      min-width: 0;
      max-width: 100%;
      padding: 0;
      background: transparent;
      box-sizing: border-box;
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

    .back-item {
      --md-list-item-label-text-color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
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
  private _submenu: "regulation" | null = null;

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("open") && !this.open) {
      this._submenu = null;
    }
  }

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

  protected render() {
    const showRegulation = this._showRegulation();
    const showBoost = this._showBoost();
    const timedPresetActive = this.viewModel?.vt?.timedPreset.isActive === true;
    const remainingTimeMin = this.viewModel?.vt?.timedPreset.remainingTimeMin;
    const title =
      this._submenu === "regulation"
        ? localize(this.language, "dialog.menu.regulation")
        : localize(this.language, "dialog.menu.title");

    if (this._submenu === "regulation") {
      return this._renderRegulationSubmenu(title);
    }

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
        <ha-md-list class="menu-list">
          ${showRegulation
            ? html`
                <ha-md-list-item type="button" @click=${() => this._openRegulationMenuEntry()}>
                  <span class="option-icon" slot="start">
                    <ha-icon icon="mdi:chart-line" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${localize(this.language, "dialog.menu.regulation")}</span>
                  <span class="option-trailing" slot="end">
                    <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
                  </span>
                </ha-md-list-item>
              `
            : nothing}

          ${showBoost
            ? html`
                <ha-md-list-item type="button" @click=${() => this._dispatchOpen("equinox-open-boost")}>
                  <span class="option-icon" tone=${timedPresetActive ? "boost" : ""} slot="start">
                    <ha-icon icon="mdi:timer-outline" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${localize(this.language, "dialog.menu.boost")}</span>
                  <span class="option-trailing" slot="end">
                    ${timedPresetActive && typeof remainingTimeMin === "number"
                      ? html`<span class="boost-time">${remainingTimeMin} min</span>`
                      : html`<ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>`}
                  </span>
                </ha-md-list-item>
              `
            : nothing}

          <ha-md-list-item type="button" @click=${() => this._dispatchOpen("equinox-open-history")}>
            <span class="option-icon" slot="start">
              <ha-icon icon="mdi:chart-bar" style="--mdc-icon-size: 24px;"></ha-icon>
            </span>
            <span>${localize(this.language, "dialog.menu.history")}</span>
            <span class="option-trailing" slot="end">
              <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
            </span>
          </ha-md-list-item>
        </ha-md-list>
      </eq-dialog>
    `;
  }

  private _renderRegulationSubmenu(title: string) {
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
        @eq-dialog-back=${() => { this._submenu = null; }}
      >
        <ha-md-list class="menu-list">
          ${this.regulationDashboard?.sections.map((section) => {
            const title = translateRegulationDashboardText(
              this.regulationDashboard!,
              this.language,
              section.title_key,
              section.title || section.id
            );

            return html`
              <ha-md-list-item type="button" @click=${() => this._dispatchAndClose("equinox-open-regulation", { sectionId: section.id })}>
                <span class="option-icon" slot="start">
                  <ha-icon icon=${section.icon || "mdi:view-dashboard-outline"} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span>${title}</span>
              </ha-md-list-item>
            `;
          })}
        </ha-md-list>
      </eq-dialog>
    `;
  }

  private _openRegulationMenuEntry(): void {
    const sections = this.regulationDashboard?.sections ?? [];
    const isMobile = window.innerWidth <= 600;

    if (isMobile && sections.length > 1) {
      this._submenu = "regulation";
      return;
    }

    this._dispatchAndClose("equinox-open-regulation", sections.length === 1 ? { sectionId: sections[0].id } : undefined);
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
