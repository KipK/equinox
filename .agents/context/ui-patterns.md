# UI patterns

## Components and styling

- Lit elements declare reactive state with `static properties` and styles with `static styles` (the `css` tag); no decorators are used. `tsconfig.json` sets `useDefineForClassFields: false`, which that pattern relies on.
- Style modules layer: `src/styles/base.ts` (host defaults), `src/styles/flat.ts` (all design tokens), `src/styles/liquid-glow.ts` (theme layered after flat). Theme-specific selectors use `:host([theme="liquid_glow"])`; the main card mirrors the config theme to the `theme` attribute and the current mode to `ha-card[tone]`.
- Tokens come from Home Assistant first: `--equinox-heat-color: var(--state-climate-heat-color, <default>)`, same for cool, auto, dry, fan-only; boost comes from `--accent-color`. Never hard-code a mode color in a component; use `--equinox-*-color`. Tone names are logical (`heat`, `cool`, `heat-cool`, `fan-only`, `preset-*`, `boost`) and resolved by `src/data/colors.ts` and CSS `[tone="..."]` selectors; `heat_cool` is the state, `heat-cool` the tone, and Home Assistant's own variables mix hyphen and underscore (`--state-climate-heat-cool-color`, `--state-climate-fan_only-color`): every mapping is explicit, never derived from a state string.
- Light mode: components toggle a `light` attribute on the host in `willUpdate` from `hass.themes.darkMode` (`toggleAttribute("light", !this.hass?.themes?.darkMode)`) and style with `:host([light])`. Never use `prefers-color-scheme`: the OS preference is not the Home Assistant theme.
- Radius chains end on the same Home Assistant token the native element uses: card `var(--ha-card-border-radius, var(--ha-border-radius-lg, 8px))` (`--equinox-radius`), small controls `--ha-border-radius-md`, dialogs `--ha-dialog-border-radius` then `--ha-border-radius-3xl`, bottom sheet `--ha-bottom-sheet-border-radius`. Do not invent a token that Home Assistant does not define.
- Card border width follows `--ha-card-border-width`. Never use a theme length inside `calc()`: themes may write a bare `0`. `eq-main-card.ts::_syncCardBorderWidth` normalizes it with `src/data/css-length.ts::normalizeCssLength` into `--equinox-card-border-width`, which the Liquid Glow insets use.
- Dialog surfaces composite the theme color over `--equinox-dialog-opaque-base` (dark by default, white under `[light]`) so dashboard content never shows through a translucent card background.
- Card surface colors: `card_background_color` and `card_background_opacity` set `--equinox-card-surface-bg`, `--equinox-config-card-bg` and `--equinox-mode-control-bg` through `eq-main-card.ts::_cardStyle`; selector surfaces derive from them so a custom background stays coherent in both themes.

## Dialogs

- `eq-dialog.ts` is the shell: a native popover (top layer) when `showPopover` exists, a fixed-position fallback otherwise. The top layer matters: parent popups (Bubble Card, browser_mod) apply `contain: paint`, `overflow: hidden` and a low stacking context that would clip a normal absolute dialog.
- The shell clips content for rounded corners (`--eq-dialog-panel-overflow`, `--eq-dialog-content-overflow`, both default hidden/auto). A dialog that hosts the history pickers (sensor more-info) sets them `visible` while a picker is open (`eq-dialog.picker-open`), otherwise the date picker footer falls below the dialog.
- Dialogs on `ha-dialog` (history, schedule): the history dialog sets `preventScrimClose` while a history picker overlay is open (`picker-overlay-changed` event) and keeps a one-shot delayed guard for the close event that follows the picker. The schedule dialog must not set `preventScrimClose`: in `ha-dialog` it also disables Escape.
- Every dialog is opened from `eq-main-card.ts`, closes through `eq-dialog-close`, and takes `language` from the card.
- The Regulation dialog is full screen on mobile (`max-width: 600px`): multi-section dashboards open on a section, the header back button returns to an in-dialog section menu.

## Browser Back integration

- Opening history, schedule, sensor more-info or Regulation pushes a `window.history` entry carrying an `equinox` marker (`BROWSER_HISTORY_STATE_KEY`, instance id, layer, section); `popstate` reopens or closes the matching layer.
- Closing history, schedule and sensor more-info replaces the entry (`_clearBrowserHistoryState`) instead of calling `history.back()`, so a parent popup or dashboard navigation entry is not consumed. The Regulation dialog pushes one entry per section change and unwinds them with `history.go(-depth)`.

## Translations of the card UI

- Keys live in `src/localize/languages/<lang>.json`; `en.json` is the reference (most keys), `fr.json` follows, the other languages are partial. `localize()` falls back to `en`, then to the key itself.
- Lookup per key segment: exact, then lowercase; the last segment also tries the key without a `fan_` or `swing_` prefix, lowercased. Write new keys in lowercase and without those prefixes; `scripts/dedupe-translations.mjs` removes case and prefix duplicates (`--dry-run` first).
- All languages are imported statically (`src/localize/languages/index.ts`), so `localize` is synchronous; `loader.ts::ensureLanguage` is a no-op kept for API stability.
- `CARD_DESCRIPTIONS` in `src/equinox-card.ts` is the only text kept inline (needed before any element exists).
- Mode labels pass through `src/data/mode-customizations.ts::modeLabel`: a configured label wins, then the translation `main.<family>.<mode>`, then the raw mode.

## Regulation dashboards: embedded translations

- Each dashboard JSON carries its own `translations` for `fr` and `en` only (`src/data/regulation-dashboard-i18n.ts::translateRegulationDashboardText`): normalized language, then `en`, then the inline fallback text, then the key. Dialog chrome texts (loading, unavailable, confirmation titles) use the regular `localize`.
- Fields ending in `_key` reference translations; every key used must exist in both languages and no key may be unused (enforced by the dashboard tests).
- User-facing text explains behavior in plain words: no release or bench vocabulary, no internal code names. Unknown enum codes show the raw code with a neutral tone.

## Regulation renderer semantics

- Values: `format` is `number`, `duration_s` (compact narrow unit through `Intl.NumberFormat`, seconds to days) or `datetime` (ISO strings only; an offset-aware date is shown in the Home Assistant time zone, a naive one is not converted). `value_multiplier` converts a published ratio explicitly, applied before `digits`; never infer units from path names. `divide_by` divides by a finite, strictly positive reference first (zero numerator valid; null, non-numeric or non-positive denominator gives the fallback), then multiplier and digits.
- Status: the published value is matched as a string against `map` keys (`"true"` and `"false"` for booleans). Order of resolution: exact `map`, then `prefix_map` (longest prefix wins, label template with `{value}`, suffix through `suffix_map`, then `KIND(argument)` through `argument_map`, raw when unlabelled), then `ranges`, then `fallback`. `fallback_show_value: true` shows only the raw code with a muted tone. Exact keys always beat prefixes.
- `visible_if` is a small JSON-logic subset: `var` (`<source>/<path>`), `!`, `lower`, `and`, `or`, `==`, `!=`, `>`, `>=`, `<`, `<=`. Equality is strict. An unknown operator evaluates to true. Truthiness treats `0`, `""`, `null`, `undefined` and `false` as false; to keep a valid zero use `>=` or `==` (or compare explicitly), not a bare `var`.
- Metric grids drop their invisible metrics and render nothing when none is left. A missing source adds a muted "source missing" line.
- `layout_grid`: children stretch to the tallest item in a row; `min_width` sets the auto-fit column width, `columns` fixes the count, `stretch_items: false` gives fixed-width centered flex children, `center_orphan` centers a lone last item of a two-column group on desktop. A nested `layout_grid` with its own `min_width` directly under a `stretch_items: false` parent inherits the parent's child width rule; keep pairs that must sit side by side at section level.
- Charts: `history` blocks resolve entity tokens (`$climate_entity`, `$diagnostic_entity`, `$power_entity`, `$humidity_entity`, `$temperature_entity`) and attribute paths, and mark every series `forced`. Range: `range` (`<n>h|d|w`, default 24 h), or from the value at `start` (one hour margin, capped by `max_range`). `fallback` series replaces a series whose entity token is not configured. Legend, tooltip and scales default on; pickers and tools default off. The graph height grows by 180 px per scale group beyond two so every legend fits.
- Chart configs are cached by a key including language, resolved entities and the block itself; a block with `start` is re-keyed hourly. Long default ranges are costly for debug recordings (the history response carries every attribute of the entity once per chart), so default to 24 h with `range_picker: true` for longer periods.
- Actions: service string `domain.service`; confirmation through `window.confirm`; buttons disabled while pending and when the thermostat is user-locked.
- Attribute units for chart axes come from `src/data/attributes.json`, keyed `history.<group>.<name>`; temperatures use the value `"temperature"` (resolved to the active unit), other units are literal. `scale_group` names the axis group of a series.

## Editor

- Per-element `show_*` options default to true and apply to classic, compact and thin layouts; hidden rows collapse. Feature entity selectors appear from the climate attributes (auto start/stop, auto fan), and hiding a selector keeps its YAML value.
- Text inputs stage their value locally on `input` and emit `config-changed` on `change`, so a re-render does not drop unfinished text. Objects emitted through `config-changed` keep `Object.prototype` (Home Assistant calls `hasOwnProperty` on them): build user-keyed maps with `Object.defineProperty` on a normal object (`src/data/mode-customizations.ts`), never `Object.create(null)`.
- `config-changed` updates the editor draft only; Lovelace persists it with its own Save button.

## Main card details

- The gauge shows the valve opening for valve thermostats and the requested power for switch thermostats (`eq-main-card.ts::_powerValveValue`); instant power is shown only in the dialog.
- Frost preset: visible in `heat` and `off` modes, hidden in other modes (`_hidePreset`).
- Thin layout: the setpoint always uses the popup (`eq-temperature-dialog.ts`); sliders commit on release (`_commitSingle`, `_commitRange`); heat/cool uses a double-handle range slider.
