import { LitElement, css, html, nothing } from "lit";
import { baseStyles } from "../styles/base";
import { flatStyles } from "../styles/flat";

export class EquinoxIconButton extends LitElement {
  static properties = {
    icon: {},
    label: {},
    active: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    subtle: { type: Boolean, reflect: true },
    tone: { reflect: true }
  };

  static styles = [
    baseStyles,
    flatStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        width: 100%;
        min-width: 0;
        min-height: 45px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: 1px solid var(--equinox-border-color);
        border-radius: var(--equinox-control-radius);
        background: transparent;
        color: var(--equinox-muted-color);
        cursor: pointer;
        transition:
          background-color 120ms ease,
          border-color 120ms ease,
          color 120ms ease,
          transform 120ms ease;
      }

      button:hover:not(:disabled) {
        color: var(--equinox-text-color);
        background: color-mix(in srgb, var(--equinox-control-bg) 82%, var(--equinox-text-color) 18%);
      }

      button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      button:disabled {
        cursor: default;
        opacity: 0.45;
      }

      :host([active]) button {
        color: var(--equinox-text-color);
        background: var(--equinox-control-active-bg);
        border-color: transparent;
      }

      :host([active][subtle]) button {
        background: color-mix(in srgb, var(--equinox-control-bg) 74%, var(--equinox-text-color) 10%);
        border-color: transparent;
      }

      :host([tone="heat"][active]) button {
        background: color-mix(in srgb, var(--equinox-heat-color) 62%, #000000 38%);
      }

      :host([tone="heat"][active][subtle]) button {
        color: var(--equinox-heat-color);
        background: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-heat-color) 22%);
      }

      :host([tone="cool"][active]) button {
        background: color-mix(in srgb, var(--equinox-cool-color) 58%, #000000 42%);
      }

      :host([tone="cool"][active][subtle]) button {
        color: var(--equinox-cool-color);
        background: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-cool-color) 22%);
      }

      :host([tone="auto"][active]) button {
        background: color-mix(in srgb, var(--equinox-auto-color) 55%, #000000 45%);
      }

      :host([tone="auto"][active][subtle]) button {
        color: var(--equinox-auto-color);
        background: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-auto-color) 22%);
      }

      :host([tone="boost"][active]) button {
        background: color-mix(in srgb, var(--equinox-boost-color) 58%, #000000 42%);
      }

      :host([tone="boost"][active][subtle]) button {
        color: var(--equinox-boost-color);
        background: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-boost-color) 22%);
      }

      :host([tone="cool-boost"][active]) button {
        background: color-mix(in srgb, var(--equinox-cool-boost-color) 58%, #000000 42%);
      }

      :host([tone="cool-boost"][active][subtle]) button {
        color: var(--equinox-cool-boost-color);
        background: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-cool-boost-color) 22%);
      }

      :host([tone="off"][active]) button {
        background: color-mix(in srgb, var(--disabled-text-color, #7e8792) 58%, #000000 42%);
      }

      :host([tone="heat"]:not([active])) button {
        color: var(--equinox-heat-color);
      }

      :host([tone="cool"]:not([active])) button {
        color: var(--equinox-cool-color);
      }

      :host([tone="auto"]:not([active])) button {
        color: var(--equinox-auto-color);
      }

      :host([tone="boost"]:not([active])) button {
        color: var(--equinox-boost-color);
      }

      :host([tone="cool-boost"]:not([active])) button {
        color: var(--equinox-cool-boost-color);
      }

      :host([tone="off"]:not([active])) button {
        color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      .label {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `
  ];

  icon = "";
  label = "";
  active = false;
  disabled = false;
  subtle = false;
  tone?: string;

  protected render() {
    return html`
      <button
        part="button"
        type="button"
        title=${this.label}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        @click=${this._onClick}
      >
        <ha-icon .icon=${this.icon}></ha-icon>
        ${this.hasAttribute("show-label") ? html`<span class="label">${this.label}</span>` : nothing}
      </button>
    `;
  }

  private _onClick(event: Event): void {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}

if (!customElements.get("eq-icon-button")) {
  customElements.define("eq-icon-button", EquinoxIconButton);
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-icon-button": EquinoxIconButton;
  }
}
