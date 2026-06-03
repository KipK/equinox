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
    mobileSectionMenuOpen: { type: Boolean, attribute: "mobile-section-menu-open" }
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

    .layout[single-section] {
      grid-template-columns: minmax(0, 1fr);
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

    .mobile-navigation-shell {
      position: relative;
      min-height: calc(100dvh - 76px);
      overflow: hidden;
      margin: -12px -12px -16px;
      background: var(--equinox-card-bg, var(--card-background-color, #1c1c1c));
    }

    .mobile-current-page {
      min-width: 0;
      min-height: calc(100dvh - 76px);
      padding: 12px max(12px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
      box-sizing: border-box;
      transition: transform 0.18s ease-out, opacity 0.18s ease-out, filter 0.18s ease-out;
    }

    .mobile-navigation-shell[sheet-open] .mobile-current-page {
      pointer-events: none;
    }

    .mobile-section-fab {
      position: fixed;
      inset-inline-end: max(16px, env(safe-area-inset-right));
      inset-block-end: max(18px, env(safe-area-inset-bottom));
      z-index: 9002;
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;
      justify-items: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border: 1px solid color-mix(in srgb, var(--primary-color) 54%, var(--divider-color));
      border-radius: 50%;
      background: color-mix(in srgb, var(--primary-color) 88%, var(--card-background-color, #1c1c1c) 12%);
      color: var(--primary-text-color, #fff);
      box-shadow: 0 10px 26px rgb(0 0 0 / 28%);
      font: inherit;
      font-weight: 650;
      white-space: nowrap;
      transition: opacity 0.14s ease-out, transform 0.14s ease-out;
    }

    .mobile-section-fab ha-icon {
      --mdc-icon-size: 22px;
    }

    .mobile-navigation-shell[sheet-open] .mobile-section-fab {
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
    }

    .mobile-sheet-scrim {
      position: fixed;
      inset: 0;
      z-index: 9001;
      background: rgba(0, 0, 0, 0.28);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s ease-out;
    }

    .mobile-navigation-shell[sheet-open] .mobile-sheet-scrim {
      opacity: 1;
      pointer-events: auto;
    }

    .mobile-section-sheet {
      position: fixed;
      inset-inline: 0;
      inset-block-end: 0;
      z-index: 9003;
      max-height: min(72dvh, 520px);
      padding: 8px 12px max(16px, env(safe-area-inset-bottom));
      box-sizing: border-box;
      border-radius: 18px 18px 0 0;
      border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
      border-bottom: 0;
      background: var(--equinox-card-bg, var(--card-background-color, #1c1c1c));
      box-shadow: 0 -18px 36px rgb(0 0 0 / 30%);
      transform: translateY(100%);
      transition: transform 0.18s ease-out;
      pointer-events: none;
      overflow: auto;
    }

    .mobile-navigation-shell[sheet-open] .mobile-section-sheet {
      transform: translateY(0);
      pointer-events: auto;
    }

    .mobile-section-sheet-handle {
      width: 38px;
      height: 4px;
      margin: 2px auto 12px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--secondary-text-color) 42%, transparent);
    }

    .mobile-section-sheet-title {
      margin: 0 4px 10px;
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: 650;
    }

    .mobile-section-button {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
      width: 100%;
      min-height: 52px;
      padding: 8px 10px;
      border: 0;
      border-radius: 8px;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }

    .mobile-section-button:hover {
      background: rgba(128, 128, 128, 0.08);
    }

    .mobile-section-button[aria-current="true"] {
      color: var(--primary-color);
      font-weight: 650;
    }

    .mobile-section-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.12);
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .mobile-section-button[aria-current="true"] .mobile-section-icon,
    .mobile-section-button[aria-current="true"] .mobile-section-chevron {
      color: var(--primary-color);
    }

    .mobile-section-button span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mobile-section-chevron {
      color: var(--secondary-text-color);
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
  mobileSectionMenuOpen = false;

  protected render(): TemplateResult {
    return html`
      <eq-dialog
        close-start
        .open=${this.open}
        .title=${this._dialogTitle()}
        .language=${this.language}
        .centered=${true}
        @eq-dialog-close=${(event: Event) => this._forwardClose(event)}
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

    if (this._isMobile() && this.dashboard.sections.length > 1) {
      return this._renderMobileSectionSheet(activeSectionId);
    }

    return html`
      <div class="layout" ?single-section=${this.dashboard.sections.length === 1}>
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
              <span class="mobile-section-icon">
                <ha-icon icon=${section.icon || "mdi:view-dashboard-outline"}></ha-icon>
              </span>
              <span>${title}</span>
              <ha-icon class="mobile-section-chevron" icon="mdi:chevron-right"></ha-icon>
            </button>
          `;
        })}
      </nav>
    `;
  }

  private _renderMobileSectionSheet(activeSectionId: string | undefined): TemplateResult {
    return html`
      <div class="mobile-navigation-shell" ?sheet-open=${this.mobileSectionMenuOpen}>
        <div class="mobile-current-page">
          <eq-regulation-renderer
            .hass=${this.hass}
            .config=${this.config}
            .viewModel=${this.viewModel}
            .dashboard=${this.dashboard}
            .activeSectionId=${activeSectionId}
            .language=${this.language}
          ></eq-regulation-renderer>
        </div>
        <button
          class="mobile-section-fab"
          type="button"
          aria-label=${localize(this.language, "dialog.regulation.sections")}
          @click=${() => this._setMobileSectionMenu(true)}
        >
          <ha-icon icon="mdi:format-list-bulleted"></ha-icon>
        </button>
        <div class="mobile-sheet-scrim" @click=${() => this._setMobileSectionMenu(false)}></div>
        <div class="mobile-section-sheet" role="dialog" aria-label=${localize(this.language, "dialog.regulation.sections")}>
          <div class="mobile-section-sheet-handle"></div>
          <h3 class="mobile-section-sheet-title">${localize(this.language, "dialog.regulation.sections")}</h3>
          ${this._renderMobileSectionMenu(activeSectionId)}
        </div>
      </div>
    `;
  }

  private _dialogTitle(): string {
    const baseTitle = localize(this.language, "dialog.regulation.title");
    if (!this.dashboard) {
      return baseTitle;
    }

    const dashboardTitle = translateRegulationDashboardText(this.dashboard, this.language, this.dashboard.title_key, this.dashboard.title);
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
    this.renderRoot.querySelector<HTMLElement>(".mobile-navigation-shell")?.removeAttribute("sheet-open");
    window.requestAnimationFrame(() => this._dispatchSectionSelected(sectionId));
  }

  private _forwardClose(event: Event): void {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _setMobileSectionMenu(open: boolean): void {
    this.renderRoot.querySelector<HTMLElement>(".mobile-navigation-shell")?.toggleAttribute("sheet-open", open);
    window.requestAnimationFrame(() => this._dispatchMenuToggled(open));
  }

  private _dispatchSectionSelected(sectionId: string): void {
    this.dispatchEvent(
      new CustomEvent("equinox-regulation-section-selected", {
        detail: { sectionId },
        bubbles: true,
        composed: true
      })
    );
  }

  private _dispatchMenuToggled(open: boolean): void {
    this.dispatchEvent(
      new CustomEvent("equinox-regulation-menu-toggled", {
        detail: { open },
        bubbles: true,
        composed: true
      })
    );
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
