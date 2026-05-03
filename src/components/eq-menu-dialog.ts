import { LitElement, css, html, nothing } from "lit";
import { localize } from "../localize/localize";
import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";
import type { EquinoxViewModel } from "../types/view-model";
import "./eq-dialog";

export class EquinoxMenuDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    viewModel: { attribute: false },
    config: { attribute: false },
    language: {}
  };

  static styles = css`
    .option-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 4px;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      width: 100%;
      text-align: left;
    }

    .option-row:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.12);
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

    .option-label {
      flex: 1;
      font-size: 15px;
    }

    .option-trailing {
      display: flex;
      align-items: center;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    }

    .boost-time {
      color: var(--equinox-accent-color, #7c4dff);
      font-size: 13px;
      font-weight: 500;
    }
  `;

  open = false;
  hass?: HomeAssistant;
  viewModel?: EquinoxViewModel;
  config?: EquinoxCardConfig;
  language?: string;

  private _dispatchClose(): void {
    this.dispatchEvent(new CustomEvent("eq-dialog-close", { bubbles: true, composed: true }));
  }

  private _dispatchAndClose(eventName: string): void {
    this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true }));
    this._dispatchClose();
  }

  private _dispatchOpen(eventName: string): void {
    this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true }));
  }

  private _showRegulation(): boolean {
    return this.config?.additional_dashboards !== "disabled";
  }

  private _showBoost(): boolean {
    return (
      this.viewModel?.vt?.timedPreset.isActive === true ||
      !!this.viewModel?.vt?.timedPresetManager ||
      (this.viewModel?.climate.presetModes.includes("boost") ?? false)
    );
  }

  protected render() {
    const showRegulation = this._showRegulation();
    const showBoost = this._showBoost();
    const timedPresetActive = this.viewModel?.vt?.timedPreset.isActive === true;
    const remainingTimeMin = this.viewModel?.vt?.timedPreset.remainingTimeMin;

    const title = localize(this.language, "dialog.menu.title");

    return html`
      <eq-dialog
        .open=${this.open}
        .title=${title}
        .language=${this.language}
        @eq-dialog-close=${this._dispatchClose}
      >
        <!-- Regulation entry -->
        ${showRegulation
          ? html`
              <button
                class="option-row"
                @click=${() => this._dispatchAndClose("equinox-open-regulation")}
              >
                <span class="option-icon">
                  <ha-icon icon="mdi:chart-line" style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${localize(this.language, "dialog.menu.regulation")}</span>
                <span class="option-trailing">
                  <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
                </span>
              </button>
            `
          : nothing}

        <!-- Boost entry -->
        ${showBoost
          ? html`
              <button
                class="option-row"
                @click=${() => this._dispatchOpen("equinox-open-boost")}
              >
                <span class="option-icon">
                  <ha-icon icon="mdi:timer-outline" style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${localize(this.language, "dialog.menu.boost")}</span>
                <span class="option-trailing">
                  ${timedPresetActive && typeof remainingTimeMin === "number"
                    ? html`<span class="boost-time">${remainingTimeMin} min</span>`
                    : html`<ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>`}
                </span>
              </button>
            `
          : nothing}

        <!-- History entry (always visible) -->
        <button
          class="option-row"
          @click=${() => this._dispatchAndClose("equinox-open-history")}
        >
          <span class="option-icon">
            <ha-icon icon="mdi:chart-bar" style="--mdc-icon-size: 24px;"></ha-icon>
          </span>
          <span class="option-label">${localize(this.language, "dialog.menu.history")}</span>
          <span class="option-trailing">
            <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
          </span>
        </button>
      </eq-dialog>
    `;
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
