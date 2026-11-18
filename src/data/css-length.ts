// Normalizes a theme-provided CSS length (e.g. `--ha-card-border-width`) so it can be used
// inside calc(). Themes often write a bare `0`, which `border` accepts but calc() treats as a
// number, invalidating any declaration mixing it with lengths.
// Returns undefined when the value is empty or not a valid length, so callers keep their fallback.
export function normalizeCssLength(
  raw: string | undefined,
  isValidLength: (value: string) => boolean = defaultIsValidLength
): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(value)) return `${Number(value)}px`;
  return isValidLength(value) ? value : undefined;
}

function defaultIsValidLength(value: string): boolean {
  return typeof CSS !== "undefined" && typeof CSS.supports === "function"
    ? CSS.supports("width", value)
    : false;
}
