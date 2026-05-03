import { LitElement, css, html, nothing } from "lit";
import { localize } from "../localize/localize";

export class EquinoxDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    title: {},
    language: {},
    centerContent: { type: Boolean, attribute: "center-content" },
    showBack: { type: Boolean, attribute: "show-back" },
    noScroll: { type: Boolean, attribute: "no-scroll" },
    floating: { type: Boolean },
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

    .panel.no-scroll {
      overflow: hidden;
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
        max-height: min(calc(100vh - 24px), 220px);
        overflow: auto;
        background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color, #1c1c1c)) 82%, transparent);
        border: 1px solid color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 70%, transparent);
        box-shadow: 0 10px 28px rgb(0 0 0 / 28%);
        backdrop-filter: blur(14px);
      }

      .panel.popover.no-scroll {
        overflow: hidden;
      }

      .panel.popover .header {
        display: none;
      }

      .panel.popover .content {
        padding: 10px;
      }

      .panel.center-content {
        display: flex;
        flex-direction: column;
      }

      .panel.center-content .content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
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

      .panel.no-scroll {
        height: min(80vh, calc(100vh - 24px));
        overflow: hidden;
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
      width: 32px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      flex-shrink: 0;
    }

    .back-btn:hover,
    .close-btn:hover {
      background: rgba(128, 128, 128, 0.15);
    }

    .content {
      padding: 0 16px 16px;
    }

    .panel.no-scroll .content {
      height: calc(100% - 40px);
      box-sizing: border-box;
      overflow: hidden;
    }
  `;

  open = false;
  title = "";
  language?: string;
  centerContent = false;
  showBack = false;
  noScroll = false;
  floating = false;
  anchor?: { element: HTMLElement };

  // Arrow function so the same reference is used for add/remove listener.
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
    document.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener("resize", this._handleResize);
    window.removeEventListener("scroll", this._handleScroll, true);
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _dispatchBack(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-back", { bubbles: true, composed: true }));
  }

  protected updated(): void {
    if (this.open && this.floating) {
      void this.updateComplete.then(() => this._positionPopover());
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

    const anchorRect = this.anchor.element.getBoundingClientRect();
    const margin = 12;
    const gap = 8;
    const panelRect = panel.getBoundingClientRect();
    const width = panelRect.width;
    const height = panelRect.height;
    const maxLeft = Math.max(margin, window.innerWidth - width - margin);
    const maxTop = Math.max(margin, window.innerHeight - height - margin);
    const preferredLeft = anchorRect.left + anchorRect.width / 2 - width / 2;
    const preferredTop = anchorRect.top - height - gap;
    const belowTop = anchorRect.top + anchorRect.height + gap;
    const top = preferredTop >= margin ? preferredTop : belowTop;

    panel.style.left = `${Math.min(Math.max(preferredLeft, margin), maxLeft)}px`;
    panel.style.top = `${Math.min(Math.max(top, margin), maxTop)}px`;
    panel.style.visibility = "visible";
  }

  protected render() {
    if (!this.open) {
      return nothing;
    }

    const closeLabel = localize(this.language, "dialog.close");
    const backLabel = localize(this.language, "dialog.back");
    const popoverStyle = this.floating && window.innerWidth > 600 ? "left: 0; top: 0; visibility: hidden;" : "";
    const panelClass = [
      "panel",
      this.centerContent ? "center-content" : "",
      this.noScroll ? "no-scroll" : "",
      this.floating ? "popover" : ""
    ].filter(Boolean).join(" ");

    return html`
      <div class=${this.floating ? "scrim popover" : "scrim"} @click=${this._dispatchClose}></div>
      <div class=${panelClass} style=${popoverStyle} @click=${(e: Event) => e.stopPropagation()}>
        <div class="header">
          ${this.showBack
            ? html`
                <button class="back-btn" aria-label=${backLabel} title=${backLabel} @click=${this._dispatchBack}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>
                </button>
              `
            : nothing}
          <span class="header-title">${this.title}</span>
          <button class="close-btn" aria-label=${closeLabel} title=${closeLabel} @click=${this._dispatchClose}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
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
