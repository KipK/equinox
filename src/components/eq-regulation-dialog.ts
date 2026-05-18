import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { localize } from "../localize/localize";
import { translateRegulationDashboardText } from "../data/regulation-dashboard-i18n";
import type { RegulationDashboardLoadResult } from "../data/regulation-dashboard-loader";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { RegulationDashboard } from "../types/regulation-dashboard";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";
import "./eq-regulation-renderer";

export class EquinoxRegulationDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    hass: { attribute: false },
    config: { attribute: false },
    viewModel: { attribute: false },
    dashboard: { attribute: false },
    loadResult: { attribute: false },
    activeSectionId: { attribute: "active-section-id" },
    language: {},
    _mobileShowingSections: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      pointer-events: none;
    }

    :host([open]) {
      position: fixed;
      inset: 0;
      z-index: 9000;
      pointer-events: auto;
    }

    eq-dialog {
      --eq-dialog-width: min(920px, calc(100vw - 48px));
      --eq-dialog-min-width: 360px;
      --equinox-regulation-dialog-width: min(860px, calc(100vw - 80px));
    }

    .layout {
      display: grid;
      grid-template-columns: 200px minmax(0, 1fr);
      gap: 16px;
      width: var(--equinox-regulation-dialog-width);
      max-width: 100%;
      min-height: min(460px, calc(100vh - 160px));
    }

    .section-nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-inline-end: 12px;
      border-inline-end: 1px solid var(--divider-color);
    }

    .section-button {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px;
      align-items: center;
      min-width: 0;
      width: 100%;
      padding: 9px 10px;
      border: 0;
      border-radius: 8px;
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }

    .section-button[aria-current="true"] {
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      color: var(--primary-text-color);
      font-weight: 650;
    }

    .section-button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .section-button span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      width: min(560px, calc(100vw - 48px));
      padding: 18px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
    }

    .mobile-section-list {
      display: grid;
      gap: 8px;
      width: 100%;
      min-width: 0;
    }

    .mobile-section-button {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
      width: 100%;
      min-height: 52px;
      padding: 10px 12px;
      border: 1px solid color-mix(in srgb, var(--divider-color) 78%, transparent);
      border-radius: 8px;
      background: color-mix(in srgb, var(--card-background-color, #1c1c1c) 88%, var(--primary-text-color) 4%);
      color: var(--primary-text-color);
      font: inherit;
      text-align: start;
    }

    .mobile-section-button[aria-current="true"] {
      border-color: color-mix(in srgb, var(--primary-color) 58%, var(--divider-color));
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      font-weight: 650;
    }

    .mobile-section-button span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media (max-width: 600px) {
      eq-dialog {
        --eq-dialog-width: 100vw;
        --eq-dialog-min-width: 0;
        --equinox-regulation-dialog-width: 100%;
      }

      .layout {
        display: block;
        width: 100%;
        min-height: 0;
      }

      .section-nav {
        display: none;
      }

      .state {
        box-sizing: border-box;
        width: 100%;
      }
    }
  `;

  open = false;
  hass?: HomeAssistant;
  config?: EquinoxCardConfig;
  viewModel?: EquinoxViewModel;
  dashboard?: RegulationDashboard;
  loadResult?: RegulationDashboardLoadResult;
  activeSectionId?: string;
  language?: string;
  private _mobileShowingSections = false;

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("open") && !this.open) {
      this._mobileShowingSections = false;
    }
  }

  protected render(): TemplateResult {
    return html`
      <eq-dialog
        .open=${this.open}
        .title=${this._dialogTitle()}
        .language=${this.language}
        .centered=${true}
        .showBack=${this._showMobileSectionBack()}
        @eq-dialog-close=${(event: Event) => this._forwardClose(event)}
        @eq-dialog-back=${(event: Event) => this._handleBack(event)}
      >
        ${this._renderContent()}
      </eq-dialog>
    `;
  }

  private _renderContent(): TemplateResult {
    if (!this.open) {
      return html``;
    }

    if (!this.hass || !this.config) {
      return html`<div class="state" role="status">${localize(this.language, "dialog.regulation.loading")}</div>`;
    }

    if (this.loadResult?.status === "unavailable") {
      return html`<div class="state" role="status">${localize(this.language, "dialog.regulation.unavailable")}</div>`;
    }

    if (this.loadResult?.status === "error") {
      const key = this.loadResult.reason === "load_failed" ? "dialog.regulation.custom_not_found" : "dialog.regulation.invalid";
      return html`<div class="state" role="alert">${localize(this.language, key)}</div>`;
    }

    if (!this.dashboard || this.dashboard.kind !== "regulation-dashboard" || this.dashboard.sections.length === 0) {
      return html`<div class="state" role="alert">${localize(this.language, "dialog.regulation.invalid")}</div>`;
    }

    const activeSectionId = this._activeSectionId();

    if (this._isMobile() && this._mobileShowingSections && this.dashboard.sections.length > 1) {
      return this._renderMobileSectionMenu(activeSectionId);
    }

    return html`
      <div class="layout">
        ${this.dashboard.sections.length > 1
          ? html`
              <nav class="section-nav" aria-label=${localize(this.language, "dialog.regulation.sections")}>
                ${this.dashboard.sections.map((section) => {
                  const title = translateRegulationDashboardText(this.dashboard!, this.language, section.title_key, section.title || section.id);
                  return html`
                    <button
                      class="section-button"
                      type="button"
                      aria-current=${section.id === activeSectionId ? "true" : "false"}
                      @click=${() => this._selectSection(section.id)}
                    >
                      ${section.icon ? html`<ha-icon icon=${section.icon}></ha-icon>` : nothing}
                      <span>${title}</span>
                    </button>
                  `;
                })}
              </nav>
            `
          : nothing}
        <eq-regulation-renderer
          .hass=${this.hass}
          .config=${this.config}
          .viewModel=${this.viewModel}
          .dashboard=${this.dashboard}
          .activeSectionId=${activeSectionId}
          .language=${this.language}
        ></eq-regulation-renderer>
      </div>
    `;
  }

  private _renderMobileSectionMenu(activeSectionId: string | undefined): TemplateResult {
    return html`
      <nav class="mobile-section-list" aria-label=${localize(this.language, "dialog.regulation.sections")}>
        ${this.dashboard!.sections.map((section) => {
          const title = translateRegulationDashboardText(this.dashboard!, this.language, section.title_key, section.title || section.id);
          return html`
            <button
              class="mobile-section-button"
              type="button"
              aria-current=${section.id === activeSectionId ? "true" : "false"}
              @click=${() => this._selectSection(section.id)}
            >
              <ha-icon icon=${section.icon || "mdi:view-dashboard-outline"}></ha-icon>
              <span>${title}</span>
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
          `;
        })}
      </nav>
    `;
  }

  private _dialogTitle(): string {
    const baseTitle = localize(this.language, "dialog.regulation.title");
    if (!this.dashboard) {
      return baseTitle;
    }

    const dashboardTitle = translateRegulationDashboardText(this.dashboard, this.language, this.dashboard.title_key, this.dashboard.title);
    if (this._isMobile() && this._mobileShowingSections) {
      return dashboardTitle ? `${baseTitle} - ${dashboardTitle}` : baseTitle;
    }

    if (this._isMobile()) {
      const activeSection = this.dashboard.sections.find((section) => section.id === this._activeSectionId());
      const sectionTitle = activeSection
        ? translateRegulationDashboardText(this.dashboard, this.language, activeSection.title_key, activeSection.title || activeSection.id)
        : "";
      return sectionTitle || (dashboardTitle ? `${baseTitle} - ${dashboardTitle}` : baseTitle);
    }

    return dashboardTitle ? `${baseTitle} - ${dashboardTitle}` : baseTitle;
  }

  private _activeSectionId(): string | undefined {
    return (
      this.dashboard?.sections.find((section) => section.id === this.activeSectionId)?.id ??
      this.dashboard?.sections[0]?.id
    );
  }

  private _selectSection(sectionId: string): void {
    this.activeSectionId = sectionId;
    this._mobileShowingSections = false;
    this.dispatchEvent(
      new CustomEvent("equinox-regulation-section-selected", {
        detail: { sectionId },
        bubbles: true,
        composed: true
      })
    );
  }

  private _forwardClose(event: Event): void {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _handleBack(event: Event): void {
    event.stopPropagation();

    if (this._isMobile() && this.dashboard && this.dashboard.sections.length > 1 && !this._mobileShowingSections) {
      this._mobileShowingSections = true;
    }
  }

  private _showMobileSectionBack(): boolean {
    return this._isMobile() && !!this.dashboard && this.dashboard.sections.length > 1 && !this._mobileShowingSections;
  }

  private _isMobile(): boolean {
    return window.matchMedia("(max-width: 600px)").matches;
  }
}

if (!customElements.get("eq-regulation-dialog")) {
  customElements.define("eq-regulation-dialog", EquinoxRegulationDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-regulation-dialog": EquinoxRegulationDialog;
  }
}
