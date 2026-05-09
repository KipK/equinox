import { css } from "lit";

export const liquidGlowStyles = css`
  :host([theme="liquid_glow"]) {
    --equinox-card-bg: var(--ha-card-background, var(--card-background-color));
    --equinox-panel-bg: var(--secondary-background-color);
    --equinox-control-bg: var(--equinox-liquid-control-bg, var(--secondary-background-color));
    --equinox-control-active-bg: var(--equinox-liquid-control-active-bg, var(--primary-color));
    --equinox-border-color: var(--equinox-liquid-border-color, var(--divider-color));
    --equinox-text-color: var(--equinox-liquid-text-color, var(--primary-text-color));
    --equinox-muted-color: var(--equinox-liquid-muted-color, var(--secondary-text-color));
    --equinox-cool-boost-color: var(--equinox-liquid-cool-boost-color, #8fcfff);
    --equinox-shadow: var(--ha-card-box-shadow, 0 1px 2px rgb(0 0 0 / 34%));
    --equinox-liquid-glow-color: rgb(115 160 190 / 44%);
    --equinox-liquid-glow-soft: rgb(115 160 190 / 10%);
    --equinox-liquid-line-opacity-min: 0.76;
    --equinox-liquid-line-opacity-max: 1;
    --equinox-liquid-halo-opacity-min: 0.62;
    --equinox-liquid-halo-opacity-max: 1;
  }

  :host([theme="liquid_glow"]) ha-card {
    position: relative;
    isolation: isolate;
    /* Transparent on the side edges where our gradient line sits — keep top/bottom intact. */
    border-color: color-mix(in srgb, var(--equinox-border-color) 56%, transparent);
    border-left-color: transparent;
    border-right-color: transparent;
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

  @keyframes equinox-liquid-line-pulse {
    0%,
    100% {
      opacity: var(--equinox-liquid-line-opacity-min);
      filter: brightness(0.96) saturate(0.98);
    }

    50% {
      opacity: var(--equinox-liquid-line-opacity-max);
      filter: brightness(1.32) saturate(1.18) drop-shadow(0 0 3px var(--equinox-liquid-glow-color));
    }
  }

  @keyframes equinox-liquid-halo-pulse {
    0%,
    100% {
      opacity: var(--equinox-liquid-halo-opacity-min);
      filter: brightness(0.94) saturate(0.96);
    }

    50% {
      opacity: var(--equinox-liquid-halo-opacity-max);
      filter: brightness(1.34) saturate(1.18);
    }
  }

  /* The pseudo-element covers the card's border-box exactly via inset: -1px (the
     containing block for absolutely-positioned children is the padding-box, so -1px
     pushes back through the 1px border zone to the outer edge). The 1px-offset
     keyword position then puts each line on the outermost 1px of the card box. */
  :host([theme="liquid_glow"]) ha-card::before {
    inset: -1px;
    z-index: 0;
    background:
      linear-gradient(
        180deg,
        transparent 5%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 32%, transparent) 22%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 60%, transparent) 38%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 88%, transparent) 50%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 60%, transparent) 62%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 32%, transparent) 78%,
        transparent 95%
      ) left 0 top 0 / 1px 100% no-repeat,
      linear-gradient(
        180deg,
        transparent 5%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 32%, transparent) 22%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 60%, transparent) 38%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 88%, transparent) 50%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 60%, transparent) 62%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 32%, transparent) 78%,
        transparent 95%
      ) right 0 top 0 / 1px 100% no-repeat;
    box-shadow: none;
    opacity: var(--equinox-liquid-line-opacity-min);
    filter: brightness(0.96) saturate(0.98);
  }

  /* Halo extends 4px beyond each side of the card; gradient origin sits exactly on
     the outer edge of the card so the halo bleeds equally outside and inside. */
  :host([theme="liquid_glow"]) ha-card::after {
    inset: -1px -5px;
    border-radius: 0;
    z-index: 0;
    background:
      radial-gradient(ellipse 10px 65% at left 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 42%, transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 14%, transparent) 55%,
        transparent 100%
      ),
      radial-gradient(ellipse 10px 65% at right 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 42%, transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 14%, transparent) 55%,
        transparent 100%
      );
    opacity: var(--equinox-liquid-halo-opacity-min);
    filter: brightness(0.94) saturate(0.96);
  }

  :host([theme="liquid_glow"]) ha-card[active-action="heat"]::before,
  :host([theme="liquid_glow"]) ha-card[active-action="cool"]::before {
    animation: equinox-liquid-line-pulse 5.5s ease-in-out infinite;
    will-change: opacity, filter;
  }

  :host([theme="liquid_glow"]) ha-card[active-action="heat"]::after,
  :host([theme="liquid_glow"]) ha-card[active-action="cool"]::after {
    animation: equinox-liquid-halo-pulse 5.5s ease-in-out infinite;
    will-change: opacity, filter;
  }

  /* Light mode: tone down halo so the orange wash doesn't smudge the light background.
     The line itself remains visible, only the surrounding diffusion is reduced. */
  @media (prefers-color-scheme: light) {
    :host([theme="liquid_glow"]) {
      --equinox-liquid-line-opacity-min: 0.82;
      --equinox-liquid-halo-opacity-min: 0.36;
      --equinox-liquid-halo-opacity-max: 0.72;
      --equinox-panel-bg: var(--equinox-card-bg);
      --equinox-control-bg: var(--equinox-card-bg);
    }

    :host([theme="liquid_glow"]) ha-card::after {
      background:
        radial-gradient(ellipse 8px 60% at left 4px center,
          color-mix(in oklab, var(--equinox-liquid-glow-color) 30%, transparent) 0%,
          color-mix(in oklab, var(--equinox-liquid-glow-color) 8%, transparent) 55%,
          transparent 100%
        ),
        radial-gradient(ellipse 8px 60% at right 4px center,
          color-mix(in oklab, var(--equinox-liquid-glow-color) 30%, transparent) 0%,
          color-mix(in oklab, var(--equinox-liquid-glow-color) 8%, transparent) 55%,
          transparent 100%
      );
    }

    :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle],
    :host([theme="liquid_glow"]) .compact-selectors ha-control-button[active][subtle] {
      border-color: color-mix(in srgb, var(--equinox-liquid-active-tone) 72%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color) 6%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-liquid-active-tone) 16%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--control-button-background-color), color-mix(in srgb, var(--equinox-control-bg) 90%, var(--equinox-liquid-active-tone) 10%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 10%, transparent),
        inset 0 -12px 20px color-mix(in srgb, var(--equinox-liquid-active-tone) 10%, transparent),
        0 0 9px color-mix(in srgb, var(--equinox-liquid-active-tone) 16%, transparent);
    }

    :host([theme="liquid_glow"]) ha-control-button[active][subtle] .btn-icon ha-icon {
      filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 7px currentColor);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :host([theme="liquid_glow"]) ha-card[active-action="heat"]::before,
    :host([theme="liquid_glow"]) ha-card[active-action="cool"]::before,
    :host([theme="liquid_glow"]) ha-card[active-action="heat"]::after,
    :host([theme="liquid_glow"]) ha-card[active-action="cool"]::after {
      animation: none;
    }
  }

  :host([theme="liquid_glow"]) .card {
    position: relative;
    z-index: 1;
  }

  /* No glow when HVAC is off or the entity is unavailable. */
  :host([theme="liquid_glow"]) ha-card[tone="off"]::before,
  :host([theme="liquid_glow"]) ha-card[tone="off"]::after {
    display: none;
  }

  :host([theme="liquid_glow"]) ha-card[tone="heat"] {
    --equinox-liquid-glow-color: var(--equinox-heat-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-heat-color) 28%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="cool"] {
    --equinox-liquid-glow-color: var(--equinox-cool-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-cool-color) 28%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="boost"],
  :host([theme="liquid_glow"]) ha-card[tone="cool-boost"] {
    --equinox-liquid-glow-color: var(--equinox-boost-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-boost-color) 30%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="auto"] {
    --equinox-liquid-glow-color: var(--equinox-auto-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-auto-color) 22%, transparent);
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
    /* No inset 1px ring (avoids a "double frame" inside the border) and no outer
       0 0 0 1px ring (would render 1px past the segments outline now that the active
       button is extended to it via margin). The 1px border is enough; we keep the soft
       outer glow only. */
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 18%, transparent),
      inset 0 -16px 24px color-mix(in srgb, var(--equinox-liquid-active-tone) 18%, transparent),
      0 0 10px color-mix(in srgb, var(--equinox-liquid-active-tone) 28%, transparent);
  }

  /* Allow the active segment button to extend over the .segments outer border line so
     its frame coincides with the segments' visible outline instead of sitting 1px inside it.
     Buttons have an explicit width:100%/height:100%, so a negative margin alone only
     shifts them — we must also grow width/height by the same amount to cover the border. */
  :host([theme="liquid_glow"]) .segments {
    overflow: visible;
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle] {
    margin-block: -1px;
    height: calc(100% + 2px);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:first-child {
    margin-inline-start: -1px;
    width: calc(100% + 1px);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:last-child {
    margin-inline-end: -1px;
    width: calc(100% + 1px);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:only-child {
    margin: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
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

  :host([theme="liquid_glow"]) .btn-icon[tone="fan"] {
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
    color: var(--primary-color);
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
