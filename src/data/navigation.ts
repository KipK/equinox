export interface NavigateOptions {
  replace?: boolean;
}

const HISTORY_WINDOW_MS = 24 * 60 * 60 * 1000;

function fireLocationChanged(replace: boolean): void {
  const event = new Event("location-changed", {
    bubbles: true,
    composed: true
  });

  (event as Event & { detail: NavigateOptions }).detail = { replace };
  window.dispatchEvent(event);
}

export function navigate(path: string, options?: NavigateOptions): void {
  const replace = options?.replace === true;

  if (replace) {
    window.history.replaceState(window.history.state?.root ? { root: true } : null, "", path);
  } else {
    window.history.pushState(null, "", path);
  }

  fireLocationChanged(replace);
}

export function buildHistoryPath(entityId: string, now = new Date()): string {
  const start = new Date(now.getTime() - HISTORY_WINDOW_MS);
  const params = new URLSearchParams({
    entity_id: entityId,
    start_date: start.toISOString(),
    back: "1"
  });

  return `/history?${params.toString()}`;
}
