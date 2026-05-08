import { css } from "lit";

export const liquidGlowStyles = css`
  :host([theme="liquid_glow"]) {
    --equinox-card-bg: var(--ha-card-background, var(--card-background-color));
    --equinox-panel-bg: var(--equinox-liquid-panel-bg, var(--secondary-background-color));
    --equinox-control-bg: var(--equinox-liquid-control-bg, var(--secondary-background-color));
    --equinox-control-active-bg: var(--equinox-liquid-control-active-bg, var(--primary-color));
    --equinox-border-color: var(--equinox-liquid-border-color, var(--divider-color));
    --equinox-text-color: var(--equinox-liquid-text-color, var(--primary-text-color));
    --equinox-muted-color: var(--equinox-liquid-muted-color, var(--secondary-text-color));
    --equinox-cool-boost-color: var(--equinox-liquid-cool-boost-color, #8fcfff);
    --equinox-shadow: var(--ha-card-box-shadow, 0 1px 2px rgb(0 0 0 / 34%));
    --equinox-liquid-glow-color: rgb(115 160 190 / 44%);
    --equinox-liquid-glow-soft: rgb(115 160 190 / 10%);
  }

  :host([theme="liquid_glow"]) ha-card {
    position: relative;
    isolation: isolate;
    border-color: color-mix(in srgb, var(--equinox-border-color) 56%, transparent);
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 5%, transparent),
      var(--equinox-shadow);
  }

  :host([theme="liquid_glow"]) ha-card::before,
  :host([theme="liquid_glow"]) ha-card::after {
    content: "";
    position: absolute;
    pointer-events: none;
    border-radius: inherit;
  }

  :host([theme="liquid_glow"]) ha-card::before {
    inset: -1px;
    z-index: 0;
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 14%, transparent) 0%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 24%, transparent) 26%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 18%, transparent) 39%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 48%, transparent) 50%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 18%, transparent) 61%,
        transparent 100%
      ) 0.5px 0 / 1px 100% no-repeat,
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 12%, transparent) 0%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 22%, transparent) 28%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 14%, transparent) 41%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 38%, transparent) 50%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 14%, transparent) 62%,
        transparent 100%
      ) calc(100% - 1.5px) 0 / 1px 100% no-repeat,
      radial-gradient(ellipse 2px 32px at 0.5px 50%, color-mix(in srgb, var(--equinox-text-color) 10%, var(--equinox-liquid-glow-color)) 0%, color-mix(in srgb, var(--equinox-liquid-glow-color) 68%, transparent) 32%, transparent 76%),
      radial-gradient(ellipse 2px 28px at calc(100% - 0.5px) 50%, color-mix(in srgb, var(--equinox-text-color) 8%, var(--equinox-liquid-glow-color)) 0%, color-mix(in srgb, var(--equinox-liquid-glow-color) 48%, transparent) 32%, transparent 76%);
    box-shadow:
      -6px 0 16px -14px var(--equinox-liquid-glow-color),
      6px 0 16px -14px var(--equinox-liquid-glow-color),
      inset 5px 0 14px -16px var(--equinox-liquid-glow-color),
      inset -5px 0 14px -16px var(--equinox-liquid-glow-color);
  }

  :host([theme="liquid_glow"]) ha-card::after {
    inset: -1px;
    z-index: 0;
    background:
      radial-gradient(ellipse 12px 78px at 0.5px 50%, var(--equinox-liquid-glow-soft) 0%, transparent 74%),
      radial-gradient(ellipse 10px 70px at calc(100% - 0.5px) 50%, var(--equinox-liquid-glow-soft) 0%, transparent 76%);
    opacity: 0.58;
  }

  :host([theme="liquid_glow"]) .card {
    position: relative;
    z-index: 1;
  }

  :host([theme="liquid_glow"]) ha-card[tone="heat"] {
    --equinox-liquid-glow-color: var(--equinox-heat-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-heat-color) 7%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="cool"] {
    --equinox-liquid-glow-color: var(--equinox-cool-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-cool-color) 7%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="boost"],
  :host([theme="liquid_glow"]) ha-card[tone="cool-boost"] {
    --equinox-liquid-glow-color: var(--equinox-boost-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-boost-color) 8%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="auto"] {
    --equinox-liquid-glow-color: var(--equinox-auto-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-auto-color) 6%, transparent);
  }

  :host([theme="liquid_glow"]) .segments,
  :host([theme="liquid_glow"]) .compact-selectors ha-control-button {
    border-color: var(--equinox-border-color);
    background: var(--equinox-control-bg);
    box-shadow: none;
  }

  :host([theme="liquid_glow"]) .segments ha-control-button:not(:last-child) {
    border-inline-end-color: var(--equinox-border-color);
  }

  :host([theme="liquid_glow"]) .step {
    --control-button-background-color: var(--equinox-control-bg);
    --control-button-icon-color: var(--equinox-text-color);
    box-shadow: none;
    filter: none;
  }

  :host([theme="liquid_glow"]) ha-control-button[active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-text-color);
    --control-button-background-color: var(--equinox-control-active-bg);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--equinox-liquid-active-tone) 58%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 18%, transparent),
      inset 0 -18px 28px color-mix(in srgb, var(--equinox-liquid-active-tone) 22%, transparent),
      0 0 16px color-mix(in srgb, var(--equinox-liquid-active-tone) 28%, transparent);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="heat"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-heat-color);
    --control-button-icon-color: var(--equinox-heat-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-heat-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="cool"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-cool-color);
    --control-button-icon-color: var(--equinox-cool-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-cool-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="auto"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-auto-color);
    --control-button-icon-color: var(--equinox-auto-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-auto-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="boost"][active][subtle],
  :host([theme="liquid_glow"]) ha-control-button[tone="cool-boost"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-boost-color);
    --control-button-icon-color: var(--equinox-boost-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-boost-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="off"][active][subtle] {
    --equinox-liquid-active-tone: var(--disabled-text-color, var(--equinox-muted-color));
    --control-button-icon-color: var(--disabled-text-color, var(--equinox-muted-color));
    --control-button-background-color: var(--equinox-control-bg);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle],
  :host([theme="liquid_glow"]) .compact-selectors ha-control-button[active][subtle] {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    border: 1px solid color-mix(in srgb, var(--equinox-liquid-active-tone) 88%, transparent);
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color) 10%, transparent) 0%, transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-liquid-active-tone) 24%, transparent) 0%, transparent 58%),
      linear-gradient(180deg, var(--control-button-background-color), color-mix(in srgb, var(--equinox-control-bg) 86%, var(--equinox-liquid-active-tone) 14%));
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--equinox-liquid-active-tone) 86%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 18%, transparent),
      inset 0 -16px 24px color-mix(in srgb, var(--equinox-liquid-active-tone) 18%, transparent),
      0 0 0 1px color-mix(in srgb, var(--equinox-liquid-active-tone) 48%, transparent),
      0 0 10px color-mix(in srgb, var(--equinox-liquid-active-tone) 28%, transparent);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[tone="off"][active][subtle],
  :host([theme="liquid_glow"]) .compact-selectors ha-control-button[tone="off"][active][subtle] {
    border-color: var(--equinox-border-color);
    background: var(--equinox-control-bg);
    box-shadow: none;
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:first-child {
    --control-button-border-radius: var(--equinox-control-radius) 0 0 var(--equinox-control-radius);
    border-start-start-radius: var(--equinox-control-radius);
    border-end-start-radius: var(--equinox-control-radius);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:last-child {
    --control-button-border-radius: 0 var(--equinox-control-radius) var(--equinox-control-radius) 0;
    border-start-end-radius: var(--equinox-control-radius);
    border-end-end-radius: var(--equinox-control-radius);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:only-child {
    --control-button-border-radius: var(--equinox-control-radius);
    border-radius: var(--equinox-control-radius);
  }

  :host([theme="liquid_glow"]) .compact-selectors ha-control-button[active][subtle] {
    --control-button-border-radius: var(--equinox-control-radius);
    border-radius: var(--equinox-control-radius);
  }

  :host([theme="liquid_glow"]) .btn-icon {
    background: rgba(128, 128, 128, 0.10);
    box-shadow: inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 8%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="heat"] {
    background: color-mix(in srgb, var(--equinox-heat-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="cool"] {
    background: color-mix(in srgb, var(--equinox-cool-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="auto"] {
    background: color-mix(in srgb, var(--equinox-auto-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="boost"] {
    background: color-mix(in srgb, var(--equinox-boost-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="cool-boost"] {
    background: color-mix(in srgb, var(--equinox-cool-boost-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) ha-control-button[active][subtle] .btn-icon {
    background: transparent;
    box-shadow: none;
  }

  :host([theme="liquid_glow"]) ha-control-button[active][subtle] .btn-icon ha-icon {
    filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 11px currentColor);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="heat"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-heat-color);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="cool"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-cool-color);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="auto"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-auto-color);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="boost"][active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone="cool-boost"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-boost-color);
  }
`;
