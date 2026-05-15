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
    --equinox-liquid-line-edge-stop: 5%;
    --equinox-liquid-line-soft-stop: 22%;
    --equinox-liquid-line-mid-stop: 38%;
    --equinox-liquid-line-edge-alpha: 32%;
    --equinox-liquid-line-mid-alpha: 60%;
    --equinox-liquid-line-peak-alpha: 88%;
    --equinox-liquid-halo-size: 10px 65%;
    --equinox-liquid-halo-alpha: 42%;
    --equinox-liquid-halo-fade-alpha: 14%;
    --equinox-liquid-line-filter-min: brightness(0.96) saturate(0.98);
    --equinox-liquid-line-filter-max: brightness(1.46) saturate(1.24) drop-shadow(0 0 5px var(--equinox-liquid-glow-color));
    --equinox-liquid-line-height-min: 72%;
    --equinox-liquid-line-height-max: 100%;
  }

  :host([theme="liquid_glow"]) ha-card {
    position: relative;
    isolation: isolate;
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
      filter: var(--equinox-liquid-line-filter-min);
      background-size:
        1px var(--equinox-liquid-line-height-min),
        1px var(--equinox-liquid-line-height-min);
    }

    50% {
      opacity: var(--equinox-liquid-line-opacity-max);
      filter: var(--equinox-liquid-line-filter-max);
      background-size:
        1px var(--equinox-liquid-line-height-max),
        1px var(--equinox-liquid-line-height-max);
    }
  }

  @keyframes equinox-liquid-halo-pulse {
    0%,
    100% {
      opacity: var(--equinox-liquid-halo-opacity-min);
      filter: brightness(0.94) saturate(0.96);
      transform: scaleY(0.72);
    }

    50% {
      opacity: var(--equinox-liquid-halo-opacity-max);
      filter: brightness(1.34) saturate(1.18);
      transform: scaleY(1);
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
        transparent var(--equinox-liquid-line-edge-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-edge-alpha), transparent) var(--equinox-liquid-line-soft-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-mid-alpha), transparent) var(--equinox-liquid-line-mid-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-peak-alpha), transparent) 50%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-mid-alpha), transparent) calc(100% - var(--equinox-liquid-line-mid-stop)),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-edge-alpha), transparent) calc(100% - var(--equinox-liquid-line-soft-stop)),
        transparent calc(100% - var(--equinox-liquid-line-edge-stop))
      ) left 0 center / 1px 100% no-repeat,
      linear-gradient(
        180deg,
        transparent var(--equinox-liquid-line-edge-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-edge-alpha), transparent) var(--equinox-liquid-line-soft-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-mid-alpha), transparent) var(--equinox-liquid-line-mid-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-peak-alpha), transparent) 50%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-mid-alpha), transparent) calc(100% - var(--equinox-liquid-line-mid-stop)),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-edge-alpha), transparent) calc(100% - var(--equinox-liquid-line-soft-stop)),
        transparent calc(100% - var(--equinox-liquid-line-edge-stop))
      ) right 0 center / 1px 100% no-repeat;
    box-shadow: none;
    opacity: var(--equinox-liquid-line-opacity-min);
    filter: var(--equinox-liquid-line-filter-min);
  }

  /* Halo extends 4px beyond each side of the card; gradient origin sits exactly on
     the outer edge of the card so the halo bleeds equally outside and inside. */
  :host([theme="liquid_glow"]) ha-card::after {
    inset: -1px -5px;
    border-radius: 0;
    z-index: 0;
    background:
      radial-gradient(ellipse var(--equinox-liquid-halo-size) at left 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-halo-alpha), transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-halo-fade-alpha), transparent) 55%,
        transparent 100%
      ),
      radial-gradient(ellipse var(--equinox-liquid-halo-size) at right 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-halo-alpha), transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-halo-fade-alpha), transparent) 55%,
        transparent 100%
    );
    opacity: var(--equinox-liquid-halo-opacity-min);
    filter: brightness(0.94) saturate(0.96);
    transform-origin: center;
  }

  :host([theme="liquid_glow"]) ha-card[active-action="heat"]::before,
  :host([theme="liquid_glow"]) ha-card[active-action="cool"]::before {
    --equinox-liquid-line-edge-stop: 0%;
    --equinox-liquid-line-soft-stop: 10%;
    --equinox-liquid-line-mid-stop: 26%;
    --equinox-liquid-line-edge-alpha: 22%;
    --equinox-liquid-line-mid-alpha: 72%;
    --equinox-liquid-line-peak-alpha: 100%;
    animation: equinox-liquid-line-pulse 5.5s ease-in-out infinite;
    will-change: background-size, opacity, filter;
  }

  :host([theme="liquid_glow"]) ha-card[active-action="heat"]::after,
  :host([theme="liquid_glow"]) ha-card[active-action="cool"]::after {
    --equinox-liquid-halo-size: 14px 86%;
    --equinox-liquid-halo-alpha: 54%;
    --equinox-liquid-halo-fade-alpha: 20%;
    animation: equinox-liquid-halo-pulse 5.5s ease-in-out infinite;
    will-change: transform, opacity, filter;
  }

  /* Light mode: tone down halo so the orange wash doesn't smudge the light background.
     Detected via hass.themes.darkMode reflected as a [light] attribute on :host. */
  :host([theme="liquid_glow"][light]) {
    --equinox-liquid-line-opacity-min: 0.88;
    --equinox-liquid-halo-opacity-min: 0.4;
    --equinox-liquid-halo-opacity-max: 0.88;
    --equinox-liquid-line-filter-min: brightness(1.02) saturate(1.08);
    --equinox-liquid-line-filter-max: brightness(1.72) saturate(1.42) drop-shadow(0 0 6px var(--equinox-liquid-glow-color));
    --equinox-liquid-line-height-min: 66%;
    --equinox-panel-bg: var(--equinox-card-bg);
    --equinox-control-bg: var(--equinox-card-bg);
  }

  :host([theme="liquid_glow"][light]) ha-card[active-action="heat"]::before,
  :host([theme="liquid_glow"][light]) ha-card[active-action="cool"]::before {
    --equinox-liquid-line-soft-stop: 8%;
    --equinox-liquid-line-mid-stop: 22%;
    --equinox-liquid-line-edge-alpha: 40%;
    --equinox-liquid-line-mid-alpha: 86%;
    --equinox-liquid-line-peak-alpha: 100%;
  }

  :host([theme="liquid_glow"][light]) ha-card::after {
    --equinox-liquid-halo-size: 10px 72%;
    --equinox-liquid-halo-alpha: 34%;
    --equinox-liquid-halo-fade-alpha: 10%;
  }

  :host([theme="liquid_glow"][light]) ha-card[active-action="heat"]::after,
  :host([theme="liquid_glow"][light]) ha-card[active-action="cool"]::after {
    --equinox-liquid-halo-size: 12px 82%;
    --equinox-liquid-halo-alpha: 42%;
    --equinox-liquid-halo-fade-alpha: 14%;
  }

  :host([theme="liquid_glow"][light]) .segments ha-control-button[active][subtle],
  :host([theme="liquid_glow"][light]) .compact-selectors ha-control-button[active][subtle] {
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

  :host([theme="liquid_glow"][light]) ha-control-button[active][subtle] .btn-icon ha-icon {
    filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 7px currentColor);
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

  /* When glow_on_action_only is set, hide glow unless there is active heating/cooling. */
  :host([theme="liquid_glow"][border-glow-on-action]) ha-card:not([active-action])::before,
  :host([theme="liquid_glow"][border-glow-on-action]) ha-card:not([active-action])::after {
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

  :host([theme="liquid_glow"]) ha-card[tone="heat-cool"] {
    --equinox-liquid-glow-color: var(--equinox-heat-cool-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-heat-cool-color) 24%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="dry"] {
    --equinox-liquid-glow-color: var(--equinox-dry-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-dry-color) 24%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="fan-only"] {
    --equinox-liquid-glow-color: var(--equinox-fan-only-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-fan-only-color) 24%, transparent);
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

  :host([theme="liquid_glow"]) ha-control-button[tone="heat-cool"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-heat-cool-color);
    --control-button-icon-color: var(--equinox-heat-cool-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-heat-cool-color) 22%);
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

  /* HA-aligned dry/fan_only tones + preset/fan/swing palettes. The active-tone
     CSS variable is set per attribute value, then a single generic rule below
     paints the button background and icon color from that variable. */
  :host([theme="liquid_glow"]) ha-control-button[tone="dry"][active][subtle]            { --equinox-liquid-active-tone: var(--equinox-dry-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-only"][active][subtle]       { --equinox-liquid-active-tone: var(--equinox-fan-only-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-eco"][active][subtle]     { --equinox-liquid-active-tone: var(--equinox-preset-eco-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-away"][active][subtle]    { --equinox-liquid-active-tone: var(--equinox-preset-away-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-comfort"][active][subtle] { --equinox-liquid-active-tone: var(--equinox-preset-comfort-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-home"][active][subtle]    { --equinox-liquid-active-tone: var(--equinox-preset-home-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-sleep"][active][subtle]   { --equinox-liquid-active-tone: var(--equinox-preset-sleep-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-frost"][active][subtle]   { --equinox-liquid-active-tone: var(--equinox-preset-frost-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-activity"][active][subtle]{ --equinox-liquid-active-tone: var(--equinox-preset-activity-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-auto"][active][subtle]       { --equinox-liquid-active-tone: var(--equinox-fan-auto-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-low"][active][subtle]        { --equinox-liquid-active-tone: var(--equinox-fan-low-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-medium"][active][subtle]     { --equinox-liquid-active-tone: var(--equinox-fan-medium-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-high"][active][subtle]       { --equinox-liquid-active-tone: var(--equinox-fan-high-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-focus"][active][subtle]      { --equinox-liquid-active-tone: var(--equinox-fan-focus-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-diffuse"][active][subtle]    { --equinox-liquid-active-tone: var(--equinox-fan-diffuse-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="swing-on"][active][subtle]       { --equinox-liquid-active-tone: var(--equinox-swing-on-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="swing-vertical"][active][subtle] { --equinox-liquid-active-tone: var(--equinox-swing-vertical-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="swing-horizontal"][active][subtle] { --equinox-liquid-active-tone: var(--equinox-swing-horizontal-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="swing-both"][active][subtle]     { --equinox-liquid-active-tone: var(--equinox-swing-both-color); }

  /* Single generic paint rule for all new tones. Heat/cool/auto/heat-cool/boost/off
     keep their dedicated rules above (with explicit icon-color and background). */
  :host([theme="liquid_glow"]) ha-control-button[active][subtle][tone^="preset-"],
  :host([theme="liquid_glow"]) ha-control-button[active][subtle][tone^="fan-"]:not([tone="fan-off"]),
  :host([theme="liquid_glow"]) ha-control-button[active][subtle][tone^="swing-"]:not([tone="swing-off"]),
  :host([theme="liquid_glow"]) ha-control-button[tone="dry"][active][subtle],
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-only"][active][subtle] {
    --control-button-icon-color: var(--equinox-liquid-active-tone);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-liquid-active-tone) 22%);
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

  :host([theme="liquid_glow"]) .btn-icon[tone="heat-cool"] {
    background: color-mix(in srgb, var(--equinox-heat-cool-color) 15%, transparent);
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

  /* New tone group icons — set --eq-tone-color per attribute value, then
     paint background and color from that variable in one shared rule. */
  :host([theme="liquid_glow"]) .btn-icon[tone="dry"]                { --eq-tone-color: var(--equinox-dry-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-only"]           { --eq-tone-color: var(--equinox-fan-only-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="muted"]              { --eq-tone-color: var(--equinox-muted-tone-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-eco"]         { --eq-tone-color: var(--equinox-preset-eco-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-away"]        { --eq-tone-color: var(--equinox-preset-away-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-comfort"]     { --eq-tone-color: var(--equinox-preset-comfort-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-home"]        { --eq-tone-color: var(--equinox-preset-home-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-sleep"]       { --eq-tone-color: var(--equinox-preset-sleep-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-frost"]       { --eq-tone-color: var(--equinox-preset-frost-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-activity"]    { --eq-tone-color: var(--equinox-preset-activity-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-auto"]           { --eq-tone-color: var(--equinox-fan-auto-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-low"]            { --eq-tone-color: var(--equinox-fan-low-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-medium"]         { --eq-tone-color: var(--equinox-fan-medium-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-high"]           { --eq-tone-color: var(--equinox-fan-high-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-focus"]          { --eq-tone-color: var(--equinox-fan-focus-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-diffuse"]        { --eq-tone-color: var(--equinox-fan-diffuse-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-on"]           { --eq-tone-color: var(--equinox-swing-on-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-vertical"]     { --eq-tone-color: var(--equinox-swing-vertical-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-horizontal"]   { --eq-tone-color: var(--equinox-swing-horizontal-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-both"]         { --eq-tone-color: var(--equinox-swing-both-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="lock-locked"]        { --eq-tone-color: var(--equinox-lock-locked-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="lock-unlocked"]      { --eq-tone-color: var(--equinox-lock-unlocked-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-off"],
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-off"]          { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }

  :host([theme="liquid_glow"]) .btn-icon[tone^="preset-"],
  :host([theme="liquid_glow"]) .btn-icon[tone^="fan-"],
  :host([theme="liquid_glow"]) .btn-icon[tone^="swing-"],
  :host([theme="liquid_glow"]) .btn-icon[tone^="lock-"],
  :host([theme="liquid_glow"]) .btn-icon[tone="dry"],
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-only"],
  :host([theme="liquid_glow"]) .btn-icon[tone="muted"] {
    background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
    color: var(--eq-tone-color);
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

  :host([theme="liquid_glow"]) ha-control-button[tone="heat-cool"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-heat-cool-color);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="boost"][active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone="cool-boost"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-boost-color);
  }

  /* Active state for new tone groups: icon inherits the per-tone color and
     drops its tinted background (active state already provides the glow). */
  :host([theme="liquid_glow"]) ha-control-button[tone^="preset-"][active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone^="fan-"]:not([tone="fan-off"])[active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone^="swing-"]:not([tone="swing-off"])[active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone="dry"][active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-only"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-liquid-active-tone);
  }
`;
