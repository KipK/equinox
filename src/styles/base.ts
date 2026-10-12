import { css } from "lit";

export const baseStyles = css`
  :host {
    display: block;
    color: var(--equinox-text-color);
    font-family: var(--paper-font-body1_-_font-family, var(--ha-font-family-body, inherit));
    --equinox-radius: var(--ha-card-border-radius, var(--ha-border-radius-lg, 8px));
  }

  button {
    font: inherit;
  }

  ha-icon {
    display: inline-flex;
    width: 22px;
    height: 22px;
  }
`;
