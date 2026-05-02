import { LitElement, css, html, nothing } from "lit";
import { localize } from "../localize/localize";

export class EquinoxDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    title: {},
    language: {}
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
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 6px 12px 6px;
    }

    .header-title {
      font-weight: 600;
      font-size: 16px;
    }

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

    .close-btn:hover {
      background: rgba(128, 128, 128, 0.15);
    }

    .content {
      padding: 0 16px 16px;
    }
  `;

  open = false;
  title = "";
  language?: string;

  // Arrow function so the same reference is used for add/remove listener.
  private readonly _handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && this.open) {
      this._dispatchClose();
    }
  };

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  protected render() {
    if (!this.open) {
      return nothing;
    }

    const closeLabel = localize(this.language, "dialog.close");

    return html`
      <div class="scrim" @click=${this._dispatchClose}></div>
      <div class="panel" @click=${(e: Event) => e.stopPropagation()}>
        <div class="header">
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
