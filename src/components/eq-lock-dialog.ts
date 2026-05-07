import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { localize } from "../localize/localize";
import type { HomeAssistant } from "../types/ha";

const CODE_LENGTH = 4;
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "spacer", "0", "backspace"] as const;

export class EqLockDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    hass: { attribute: false },
    entityId: { type: String },
    isLocking: { type: Boolean },
    language: { type: String },
    _code: { state: true },
    _error: { state: true },
    _loading: { state: true }
  };

  static styles = css`
    :host {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      align-items: center;
      justify-content: center;
    }

    :host([open]) {
      display: flex;
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
    }

    .dialog {
      position: relative;
      z-index: 1;
      background: var(--equinox-card-bg, var(--ha-card-background, var(--card-background-color)));
      border-radius: var(--equinox-radius, 8px);
      border: 1px solid var(--equinox-border-color, var(--divider-color));
      box-shadow: var(--equinox-shadow, 0 4px 20px rgba(0, 0, 0, 0.35));
      color: var(--equinox-text-color, var(--primary-text-color));
      width: 100%;
      max-width: 320px;
      padding: 24px 20px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 500;
    }

    .header ha-icon {
      --mdc-icon-size: 22px;
      color: var(--equinox-danger-color, var(--error-color));
    }

    .header ha-icon[unlocked] {
      color: var(--equinox-auto-color, var(--success-color));
    }

    .dots {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .dots[error] {
      animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }

    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid var(--equinox-muted-color, var(--secondary-text-color));
      background: transparent;
      transition: background 0.15s, border-color 0.15s, transform 0.15s;
    }

    .dot[filled] {
      background: var(--equinox-text-color, var(--primary-text-color));
      border-color: var(--equinox-text-color, var(--primary-text-color));
      transform: scale(1.15);
    }

    .dot[error] {
      background: var(--equinox-danger-color, var(--error-color));
      border-color: var(--equinox-danger-color, var(--error-color));
    }

    .error-msg {
      text-align: center;
      font-size: 13px;
      color: var(--equinox-danger-color, var(--error-color));
      min-height: 18px;
    }

    .keypad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .key {
      height: 56px;
      font-size: 20px;
      font-weight: 500;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, var(--secondary-background-color));
      color: var(--equinox-text-color, var(--primary-text-color));
      cursor: pointer;
      transition: background 0.12s, opacity 0.12s;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    .key:hover {
      background: color-mix(in srgb, var(--equinox-control-bg, var(--secondary-background-color)) 80%, var(--equinox-text-color, var(--primary-text-color)) 14%);
    }

    .key:active {
      opacity: 0.7;
    }

    .key[disabled] {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }

    .key ha-icon {
      --mdc-icon-size: 22px;
    }

    .cancel {
      background: transparent;
      border: 0;
      color: var(--equinox-muted-color, var(--secondary-text-color));
      font: inherit;
      font-size: 14px;
      cursor: pointer;
      padding: 4px;
      text-align: center;
      width: 100%;
      border-radius: var(--equinox-control-radius, 8px);
      transition: color 0.12s;
    }

    .cancel:hover {
      color: var(--equinox-text-color, var(--primary-text-color));
    }

    @media (max-width: 600px) {
      :host([open]) {
        align-items: flex-end;
      }

      .dialog {
        max-width: 100%;
        border-radius: var(--equinox-radius, 8px) var(--equinox-radius, 8px) 0 0;
        padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
      }
    }
  `;

  open = false;
  hass?: HomeAssistant;
  entityId = "";
  isLocking = true;
  language?: string;

  private _code = "";
  private _error = false;
  private _loading = false;

  private readonly _onKeyDown = (e: KeyboardEvent): void => {
    if (!this.open) return;
    if (e.key >= "0" && e.key <= "9") {
      this._pressDigit(e.key);
    } else if (e.key === "Backspace") {
      this._pressBackspace();
    } else if (e.key === "Escape") {
      this._cancel();
    } else if (e.key === "Enter" && this._code.length === CODE_LENGTH) {
      void this._validate();
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this._onKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._onKeyDown);
  }

  protected override updated(changed: PropertyValues): void {
    if (changed.has("open") && !this.open) {
      this._code = "";
      this._error = false;
      this._loading = false;
    }
  }

  protected override render() {
    if (!this.open) return nothing;

    const title = this.isLocking
      ? localize(this.language, "main.lock.locked")
      : localize(this.language, "main.lock.unlocked");
    const enterCode = localize(this.language, "main.lock.enter_code");
    const wrongCode = localize(this.language, "main.lock.wrong_code");
    const cancelLabel = localize(this.language, "dialog.close");

    return html`
      <div class="backdrop" @click=${this._cancel}></div>
      <div class="dialog" role="dialog" aria-modal="true">
        <div class="header">
          <ha-icon
            .icon=${this.isLocking ? "mdi:lock-outline" : "mdi:lock-open-outline"}
            ?unlocked=${!this.isLocking}
          ></ha-icon>
          <span>${title} — ${enterCode}</span>
        </div>
        <div class="dots" ?error=${this._error}>
          ${Array.from({ length: CODE_LENGTH }, (_, i) => html`
            <div
              class="dot"
              ?filled=${i < this._code.length && !this._error}
              ?error=${this._error}
            ></div>
          `)}
        </div>
        <div class="error-msg">${this._error ? wrongCode : nothing}</div>
        <div class="keypad">
          ${KEYS.map((key) => this._renderKey(key))}
        </div>
        <button class="cancel" @click=${this._cancel}>${cancelLabel}</button>
      </div>
    `;
  }

  private _renderKey(key: string) {
    if (key === "backspace") {
      return html`
        <button
          class="key"
          ?disabled=${this._loading || this._code.length === 0}
          @click=${this._pressBackspace}
        >
          <ha-icon icon="mdi:backspace-outline"></ha-icon>
        </button>
      `;
    }

    if (key === "spacer") {
      return html`<div></div>`;
    }

    return html`
      <button
        class="key"
        ?disabled=${this._loading || this._code.length >= CODE_LENGTH}
        @click=${() => this._pressDigit(key)}
      >
        ${key}
      </button>
    `;
  }

  private _pressDigit(digit: string): void {
    if (this._loading || this._code.length >= CODE_LENGTH) return;
    this._error = false;
    this._code += digit;
    if (this._code.length === CODE_LENGTH) {
      void this._validate();
    }
  }

  private _pressBackspace(): void {
    if (this._loading || this._code.length === 0) return;
    this._error = false;
    this._code = this._code.slice(0, -1);
  }

  private async _validate(): Promise<void> {
    if (this._loading || !this.hass || this._code.length < CODE_LENGTH) return;

    this._loading = true;
    const service = this.isLocking ? "lock" : "unlock";

    try {
      await this.hass.callService("versatile_thermostat", service, {
        entity_id: this.entityId,
        code: this._code
      });
      this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
    } catch {
      this._error = true;
      this._code = "";
      navigator.vibrate?.(200);
    } finally {
      this._loading = false;
    }
  }

  private _cancel(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }
}

if (!customElements.get("eq-lock-dialog")) {
  customElements.define("eq-lock-dialog", EqLockDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-lock-dialog": EqLockDialog;
  }
}
