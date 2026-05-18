import { LitElement, css, html, nothing } from "lit";
import { localize } from "../localize/localize";

export class EquinoxDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    title: {},
    language: {},
    showBack: { type: Boolean, attribute: "show-back" },
    floating: { type: Boolean },
    centered: { type: Boolean },
    closeOnLeave: { type: Boolean },
    anchor: { attribute: false }
  };

  static styles = css`
    :host {
      display: block;
    }

    .scrim {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      z-index: 9000;
      border-radius: var(--equinox-radius, 12px);
    }

    .panel {
      position: absolute;
      inset: 0;
      z-index: 9001;
      background: var(--equinox-card-bg, var(--card-background-color, #1c1c1c));
      color: var(--primary-text-color);
      border-radius: var(--equinox-radius, 12px);
      overflow-y: auto;
    }

    .scrim.centered {
      position: fixed;
      inset: 0;
      border-radius: 0;
    }

    .panel.centered {
      position: fixed;
      inset: 50% auto auto 50%;
      width: var(--eq-dialog-width, min(920px, calc(100vw - 48px)));
      min-width: min(var(--eq-dialog-min-width, 360px), calc(100vw - 24px));
      max-width: calc(100vw - 24px);
      max-height: calc(100vh - 24px);
      transform: translate(-50%, -50%);
      overflow: auto;
      border: 1px solid color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 70%, transparent);
      box-shadow: 0 18px 44px rgb(0 0 0 / 34%);
    }

    @media (min-width: 601px) {
      .scrim.popover {
        position: fixed;
        inset: 0;
        background: transparent;
        border-radius: 0;
      }

      .panel.popover {
        position: fixed;
        inset: auto;
        width: max-content;
        max-width: min(calc(100vw - 24px), 520px);
        max-height: calc(100vh - 24px);
        overflow: auto;
        background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color, #1c1c1c)) 82%, transparent);
        border: 1px solid color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 70%, transparent);
        box-shadow: 0 10px 28px rgb(0 0 0 / 28%);
        backdrop-filter: blur(14px);
      }

      .panel.popover[popover] {
        margin: 0;
        padding: 0;
        color: var(--primary-text-color);
      }

      .panel.popover[popover]::backdrop {
        background: transparent;
      }

      .panel.popover .header {
        display: none;
      }

      .panel.popover .content {
        padding: 10px;
      }
    }

    @media (max-width: 600px) {
      .scrim {
        position: fixed;
        inset: 0;
        border-radius: 0;
      }

      .panel {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: auto;
        inset-inline: 0;
        border-radius: 16px 16px 0 0;
        max-height: 80vh;
        overflow-y: auto;
      }

      .panel.centered {
        left: 50%;
        right: auto;
        bottom: auto;
        top: 50%;
        inset-inline: auto;
        width: var(--eq-dialog-width, calc(100vw - 24px));
        min-width: min(var(--eq-dialog-min-width, 320px), calc(100vw - 24px));
        max-width: calc(100vw - 24px);
        max-height: calc(100vh - 24px);
        border-radius: var(--equinox-radius, 12px);
        transform: translate(-50%, -50%);
      }
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 6px 12px 6px;
    }

    .header-title {
      flex: 1;
      font-weight: 600;
      font-size: 16px;
    }

    .back-btn,
    .close-btn {
      --ha-icon-button-size: 32px;
      --ha-icon-button-padding-inline: 4px;
      color: var(--primary-text-color);
      flex-shrink: 0;
    }

    .content {
      padding: 0 16px 16px;
    }
  `;

  open = false;
  title = "";
  language?: string;
  showBack = false;
  floating = false;
  centered = false;
  closeOnLeave = false;
  anchor?: { element: HTMLElement; clientX?: number; clientY?: number };
  private _closeOnLeaveTimer?: number;

  private readonly _handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && this.open) {
      this._dispatchClose();
    }
  };

  private readonly _handleResize = (): void => {
    if (this.open && this.floating) {
      this._positionPopover();
    }
  };

  private readonly _handleScroll = (): void => {
    if (this.open && this.floating) {
      this._positionPopover();
    }
  };

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("resize", this._handleResize);
    window.addEventListener("scroll", this._handleScroll, true);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearCloseOnLeaveTimer();
    document.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener("resize", this._handleResize);
    window.removeEventListener("scroll", this._handleScroll, true);
  }

  private _clearCloseOnLeaveTimer(): void {
    if (this._closeOnLeaveTimer === undefined) {
      return;
    }

    window.clearTimeout(this._closeOnLeaveTimer);
    this._closeOnLeaveTimer = undefined;
  }

  private _scheduleCloseOnLeave(): void {
    if (!this.closeOnLeave) {
      return;
    }

    this._clearCloseOnLeaveTimer();
    this._closeOnLeaveTimer = window.setTimeout(() => {
      this._closeOnLeaveTimer = undefined;
      this._dispatchClose();
    }, 500);
  }

  private _dispatchClose(): void {
    this._clearCloseOnLeaveTimer();
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _dispatchBack(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-back", { bubbles: true, composed: true }));
  }

  protected updated(): void {
    if (!this.open) {
      this._clearCloseOnLeaveTimer();
    }

    if (this.open && this.floating) {
      void this.updateComplete.then(() => {
        this._syncNativePopover();
        this._positionPopover();
      });
    }
  }

  private _supportsNativePopover(): boolean {
    return typeof HTMLElement.prototype.showPopover === "function";
  }

  private _usesNativePopover(): boolean {
    return this.open && this.floating && window.innerWidth > 600 && this._supportsNativePopover();
  }

  private _syncNativePopover(): void {
    if (!this._usesNativePopover()) {
      return;
    }

    const panel = this.renderRoot.querySelector<HTMLElement>(".panel.popover");

    if (!panel || panel.matches(":popover-open")) {
      return;
    }

    panel.showPopover();
  }

  private _handlePopoverToggle(event: Event): void {
    const toggleEvent = event as Event & { newState?: string };

    if (toggleEvent.newState === "closed" && this.open) {
      this._dispatchClose();
    }
  }

  private _positionPopover(): void {
    const panel = this.renderRoot.querySelector<HTMLElement>(".panel.popover");

    if (!panel) {
      return;
    }

    if (window.innerWidth <= 600) {
      panel.style.left = "";
      panel.style.top = "";
      panel.style.visibility = "";
      return;
    }

    if (!this.anchor) {
      return;
    }

    const margin = 12;
    const panelRect = panel.getBoundingClientRect();
    const width = panelRect.width;
    const height = panelRect.height;
    const maxLeft = Math.max(margin, window.innerWidth - width - margin);

    if (this.anchor.clientY !== undefined) {
      const left = Math.min(Math.max(this.anchor.clientX ?? 0, margin), maxLeft);
      const top = Math.min(Math.max(this.anchor.clientY, margin), window.innerHeight - height - margin);
      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
      panel.style.visibility = "visible";
      return;
    }

    const anchorRect = this.anchor.element.getBoundingClientRect();
    const gap = 8;
    const preferredLeft = this.anchor.clientX !== undefined
      ? this.anchor.clientX - width / 2
      : anchorRect.left + anchorRect.width / 2 - width / 2;

    const belowTop = anchorRect.bottom + gap;
    const aboveTop = anchorRect.top - height - gap;
    const belowFits = belowTop + height + margin <= window.innerHeight;
    const aboveFits = aboveTop >= margin;

    let top: number;
    if (belowFits) {
      top = belowTop;
    } else if (aboveFits) {
      top = aboveTop;
    } else {
      top = Math.max(margin, window.innerHeight - height - margin);
    }

    panel.style.left = `${Math.min(Math.max(preferredLeft, margin), maxLeft)}px`;
    panel.style.top = `${Math.max(top, margin)}px`;
    panel.style.visibility = "visible";
  }

  protected render() {
    if (!this.open) {
      return nothing;
    }

    const closeLabel = localize(this.language, "dialog.close");
    const backLabel = localize(this.language, "dialog.back");
    const nativePopover = this._usesNativePopover();
    const popoverStyle = this.floating && window.innerWidth > 600 ? "left: 0; top: 0; visibility: hidden;" : "";
    const panelClass = ["panel", this.floating ? "popover" : "", this.centered ? "centered" : ""].filter(Boolean).join(" ");
    const scrimClass = ["scrim", this.floating ? "popover" : "", this.centered ? "centered" : ""].filter(Boolean).join(" ");

    return html`
      ${nativePopover
        ? nothing
        : html`<div class=${scrimClass} @click=${this._dispatchClose}></div>`}
      <div
        class=${panelClass}
        style=${popoverStyle}
        popover=${nativePopover ? "auto" : nothing}
        @toggle=${nativePopover ? this._handlePopoverToggle : undefined}
        @click=${(e: Event) => e.stopPropagation()}
        @mouseenter=${() => this._clearCloseOnLeaveTimer()}
        @mouseleave=${this.closeOnLeave ? () => this._scheduleCloseOnLeave() : undefined}
      >
        <div class="header">
          ${this.showBack
        ? html`
                <ha-icon-button class="back-btn" .label=${backLabel} @click=${this._dispatchBack}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>
                </ha-icon-button>
              `
        : nothing}
          <span class="header-title">${this.title}</span>
          <ha-icon-button class="close-btn" .label=${closeLabel} @click=${this._dispatchClose}>
            <ha-icon icon="mdi:close"></ha-icon>
          </ha-icon-button>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("eq-dialog")) {
  customElements.define("eq-dialog", EquinoxDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-dialog": EquinoxDialog;
  }
}
