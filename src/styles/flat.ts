import { css } from "lit";

export const flatStyles = css`
  :host {
    --equinox-card-bg: var(--ha-card-background, var(--card-background-color));
    --equinox-panel-bg: var(--equinox-flat-panel-bg, var(--secondary-background-color));
    --equinox-control-bg: var(--equinox-flat-control-bg, var(--secondary-background-color));
    --equinox-control-active-bg: var(--primary-color);
    --equinox-border-color: var(--equinox-flat-border-color, var(--divider-color));
    --equinox-text-color: var(--primary-text-color, #f4f0ec);
    --equinox-muted-color: var(--secondary-text-color, #aeb7c2);
    /* Climate mode palette — first choice is HA's --state-climate-{mode}-color
       so user themes flow through. The hyphen in --state-climate-heat-cool-color
       and the underscore in --state-climate-fan_only-color are quirks of the
       HA frontend authoring (see src/data/colors.ts comment). */
    --equinox-heat-color: var(--state-climate-heat-color, #ff8a1c);
    --equinox-cool-color: var(--state-climate-cool-color, #4da1ff);
    --equinox-heat-cool-color: var(--state-climate-heat-cool-color, #9b5cff);
    --equinox-dry-color: var(--state-climate-dry-color, #ff9800);
    --equinox-fan-only-color: var(--state-climate-fan_only-color, #00bcd4);
    --equinox-auto-color: var(--state-climate-auto-color, var(--success-color, #55bf6a));
    --equinox-cool-boost-color: var(--equinox-flat-cool-boost-color, #7cc7ff);
    --equinox-boost-color: var(--accent-color, #b06cff);
    --equinox-muted-tone-color: color-mix(in srgb, var(--state-icon-color, var(--secondary-text-color, #7e8792)) 70%, var(--secondary-text-color, #aeb7c2));
    --equinox-danger-color: var(--error-color, #ff5d5d);
    --equinox-warning-color: var(--warning-color, #ffa726);
    --equinox-info-color: var(--info-color, #64b5f6);
    /* Lock — semantics chosen for the thermostat use case (not HA's generic
       lock tokens). Locked = red so the color flags *why* setpoints can't be
       changed. Unlocked = the regular icon color so the common state stays
       visually quiet alongside the other status icons. */
    --equinox-lock-locked-color: var(--error-color, #ff5d5d);
    --equinox-lock-unlocked-color: var(--state-icon-color, var(--secondary-text-color, #aeb7c2));
    /* Preset palette — built from HA tokens via color-mix() so themes still flow through.
       HA has no preset_mode color tokens of its own (verified May 2026). */
    --equinox-preset-eco-color: color-mix(in srgb, var(--state-climate-auto-color, #4caf50) 85%, white);
    --equinox-preset-away-color: color-mix(in srgb, var(--state-icon-color, #44739e) 70%, var(--secondary-text-color, #aeb7c2));
    --equinox-preset-comfort-color: color-mix(in srgb, var(--state-climate-heat-color, #ff8a1c) 65%, white);
    --equinox-preset-home-color: var(--primary-color, #03a9f4);
    --equinox-preset-sleep-color: color-mix(in srgb, var(--accent-color, #b06cff) 70%, var(--state-climate-cool-color, #4da1ff));
    --equinox-preset-frost-color: color-mix(in srgb, var(--state-climate-cool-color, #4da1ff) 65%, white);
    --equinox-preset-activity-color: var(--state-climate-auto-color, #55bf6a);
    /* Fan palette — graduated tint from cool token; focus/diffuse use accents. */
    --equinox-fan-off-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792));
    --equinox-fan-auto-color: var(--state-climate-auto-color, #55bf6a);
    --equinox-fan-low-color: color-mix(in srgb, var(--state-climate-cool-color, #4da1ff) 55%, white);
    --equinox-fan-medium-color: color-mix(in srgb, var(--state-climate-cool-color, #4da1ff) 80%, white);
    --equinox-fan-high-color: var(--state-climate-cool-color, #4da1ff);
    --equinox-fan-focus-color: var(--primary-color, #03a9f4);
    --equinox-fan-diffuse-color: color-mix(in srgb, var(--state-climate-fan_only-color, #00bcd4) 80%, white);
    /* Swing palette — cyan/teal family. */
    --equinox-swing-off-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792));
    --equinox-swing-on-color: var(--state-climate-fan_only-color, #00bcd4);
    --equinox-swing-vertical-color: color-mix(in srgb, var(--state-climate-fan_only-color, #00bcd4) 80%, var(--primary-color, #03a9f4));
    --equinox-swing-horizontal-color: color-mix(in srgb, var(--state-climate-fan_only-color, #00bcd4) 80%, var(--accent-color, #b06cff));
    --equinox-swing-both-color: var(--accent-color, #b06cff);
    --equinox-radius: 8px;
    --equinox-control-radius: 8px;
    --equinox-shadow: var(--ha-card-box-shadow, 0 1px 2px rgb(0 0 0 / 34%));
  }

  :host([light]) {
    --equinox-panel-bg: var(--equinox-card-bg);
    --equinox-control-bg: var(--equinox-card-bg);
  }
`;
