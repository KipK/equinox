import { css } from "lit";

export const liquidGlowStyles = css`
  :host([theme="liquid_glow"]) {
    --equinox-card-bg: var(--ha-card-background, var(--card-background-color));
    --equinox-panel-bg: var(--equinox-liquid-panel-bg, rgb(9 22 31 / 78%));
    --equinox-control-bg: var(--equinox-liquid-control-bg, var(--secondary-background-color));
    --equinox-control-active-bg: var(--equinox-liquid-control-active-bg, rgb(31 52 66 / 90%));
    --equinox-border-color: var(--equinox-liquid-border-color, var(--divider-color));
    --equinox-text-color: var(--equinox-liquid-text-color, #eef8ff);
    --equinox-muted-color: var(--equinox-liquid-muted-color, #94a8b6);
    --equinox-cool-boost-color: var(--equinox-liquid-cool-boost-color, #8fcfff);
    --equinox-shadow: 0 16px 38px rgb(0 0 0 / 46%);
    --equinox-liquid-glow-color: rgb(115 160 190 / 52%);
    --equinox-liquid-glow-soft: rgb(115 160 190 / 20%);
  }

  :host([theme="liquid_glow"]) ha-card {
    position: relative;
    isolation: isolate;
    border-color: color-mix(in srgb, var(--equinox-border-color) 56%, transparent);
    box-shadow:
      inset 0 1px 0 rgb(255 255 255 / 5%),
      0 0 18px rgb(0 0 0 / 34%),
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
        color-mix(in srgb, var(--equinox-liquid-glow-color) 72%, transparent) 50%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 22%, transparent) 61%,
        transparent 100%
      ) 0.5px 0 / 1px 100% no-repeat,
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 12%, transparent) 0%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 22%, transparent) 28%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 14%, transparent) 41%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 56%, transparent) 50%,
        color-mix(in srgb, var(--equinox-liquid-glow-color) 16%, transparent) 62%,
        transparent 100%
      ) calc(100% - 1.5px) 0 / 1px 100% no-repeat,
      radial-gradient(ellipse 3px 34px at 0.5px 50%, color-mix(in srgb, #ffffff 18%, var(--equinox-liquid-glow-color)) 0%, var(--equinox-liquid-glow-color) 30%, transparent 74%),
      radial-gradient(ellipse 3px 30px at calc(100% - 0.5px) 50%, color-mix(in srgb, #ffffff 14%, var(--equinox-liquid-glow-color)) 0%, color-mix(in srgb, var(--equinox-liquid-glow-color) 72%, transparent) 30%, transparent 74%);
    box-shadow:
      -8px 0 22px -15px var(--equinox-liquid-glow-color),
      8px 0 22px -15px var(--equinox-liquid-glow-color),
      inset 7px 0 18px -17px var(--equinox-liquid-glow-color),
      inset -7px 0 18px -17px var(--equinox-liquid-glow-color);
  }

  :host([theme="liquid_glow"]) ha-card::after {
    inset: -1px;
    z-index: 0;
    background:
      radial-gradient(ellipse 16px 92px at 0.5px 50%, var(--equinox-liquid-glow-soft) 0%, transparent 72%),
      radial-gradient(ellipse 14px 82px at calc(100% - 0.5px) 50%, var(--equinox-liquid-glow-soft) 0%, transparent 74%);
    opacity: 0.72;
  }

  :host([theme="liquid_glow"]) .card {
    position: relative;
    z-index: 1;
  }

  :host([theme="liquid_glow"]) ha-card[tone="heat"] {
    --equinox-liquid-glow-color: var(--equinox-heat-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-heat-color) 12%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="cool"] {
    --equinox-liquid-glow-color: var(--equinox-cool-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-cool-color) 12%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="boost"],
  :host([theme="liquid_glow"]) ha-card[tone="cool-boost"] {
    --equinox-liquid-glow-color: var(--equinox-boost-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-boost-color) 13%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="auto"] {
    --equinox-liquid-glow-color: var(--equinox-auto-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-auto-color) 10%, transparent);
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
    box-shadow:
      inset 0 1px 0 rgb(255 255 255 / 8%),
      0 4px 12px rgb(0 0 0 / 24%);
  }

  :host([theme="liquid_glow"]) ha-control-button[active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-text-color);
    --control-button-background-color: var(--equinox-control-active-bg);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--equinox-liquid-active-tone) 58%, transparent),
      inset 0 1px 0 color-mix(in srgb, #ffffff 18%, transparent),
      inset 0 -18px 28px color-mix(in srgb, var(--equinox-liquid-active-tone) 22%, transparent),
      0 0 16px color-mix(in srgb, var(--equinox-liquid-active-tone) 28%, transparent);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="heat"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-heat-color);
    --control-button-icon-color: var(--equinox-heat-color);
    --control-button-background-color: color-mix(in srgb, #10202b 76%, var(--equinox-heat-color) 24%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="cool"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-cool-color);
    --control-button-icon-color: var(--equinox-cool-color);
    --control-button-background-color: color-mix(in srgb, #10263a 74%, var(--equinox-cool-color) 26%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="auto"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-auto-color);
    --control-button-icon-color: var(--equinox-auto-color);
    --control-button-background-color: color-mix(in srgb, #10202b 76%, var(--equinox-auto-color) 24%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="boost"][active][subtle],
  :host([theme="liquid_glow"]) ha-control-button[tone="cool-boost"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-boost-color);
    --control-button-icon-color: var(--equinox-boost-color);
    --control-button-background-color: color-mix(in srgb, #10202b 72%, var(--equinox-boost-color) 28%);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle],
  :host([theme="liquid_glow"]) .compact-selectors ha-control-button[active][subtle] {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    border: 1px solid color-mix(in srgb, var(--equinox-liquid-active-tone) 88%, transparent);
    background:
      linear-gradient(180deg, color-mix(in srgb, #ffffff 10%, transparent) 0%, transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-liquid-active-tone) 24%, transparent) 0%, transparent 58%),
      linear-gradient(180deg, var(--control-button-background-color), color-mix(in srgb, #121212 82%, var(--equinox-liquid-active-tone) 18%));
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--equinox-liquid-active-tone) 86%, transparent),
      inset 0 1px 0 color-mix(in srgb, #ffffff 18%, transparent),
      inset 0 -16px 24px color-mix(in srgb, var(--equinox-liquid-active-tone) 18%, transparent),
      0 0 0 1px color-mix(in srgb, var(--equinox-liquid-active-tone) 48%, transparent),
      0 0 10px color-mix(in srgb, var(--equinox-liquid-active-tone) 28%, transparent);
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
    background: transparent;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
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
