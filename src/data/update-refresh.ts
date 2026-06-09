import { localize } from "../localize/localize";
import type { EquinoxUpdateRefreshMode } from "../types/config";

type PendingUpdate = {
  previousVersion?: string;
  currentVersion: string;
};

const VERSION_STORAGE_KEY = "equinox-card:loaded-version";
const RELOAD_SESSION_KEY = "equinox-card:update-reload";

let pendingUpdate: PendingUpdate | undefined;
let handled = false;
let cacheCleanup: Promise<number> | undefined;

function storage(): Storage | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const testKey = "equinox-card:storage-test";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch (_err) {
    return undefined;
  }
}

function sessionStorageSafe(): Storage | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const testKey = "equinox-card:session-test";
    window.sessionStorage.setItem(testKey, "1");
    window.sessionStorage.removeItem(testKey);
    return window.sessionStorage;
  } catch (_err) {
    return undefined;
  }
}

function isEquinoxBundleUrl(rawUrl: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const url = new URL(rawUrl, window.location.href);

    return url.origin === window.location.origin && (
      url.pathname.endsWith("/equinox-card.js") ||
      url.pathname.endsWith("/equinox-card.js.gz")
    );
  } catch (_err) {
    return false;
  }
}

async function cleanupEquinoxCacheEntries(): Promise<number> {
  if (typeof window === "undefined" || !("caches" in window)) {
    return 0;
  }

  let removed = 0;
  const cacheNames = await window.caches.keys();

  await Promise.all(cacheNames.map(async (cacheName) => {
    const cache = await window.caches.open(cacheName);
    const requests = await cache.keys();

    await Promise.all(requests.map(async (request) => {
      if (!isEquinoxBundleUrl(request.url)) {
        return;
      }

      if (await cache.delete(request)) {
        removed += 1;
      }
    }));
  }));

  return removed;
}

function cleanupCachesOnce(): Promise<number> {
  cacheCleanup ??= cleanupEquinoxCacheEntries().catch((err) => {
    console.warn("Equinox: failed to clean cached card resources", err);
    return 0;
  });

  return cacheCleanup;
}

function notifyUpdate(language: string | undefined, update: PendingUpdate): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const target = document.querySelector("home-assistant") ?? window;
  const message = localize(language, "card.update_available", { version: update.currentVersion });

  target.dispatchEvent(new CustomEvent("hass-notification", {
    detail: {
      message,
      duration: -1,
      dismissable: true
    },
    bubbles: true,
    composed: true
  }));
}

function reloadOnce(update: PendingUpdate): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const session = sessionStorageSafe();
  const reloadKey = `${update.previousVersion ?? "first-seen"}->${update.currentVersion}`;

  if (session?.getItem(RELOAD_SESSION_KEY) === reloadKey) {
    return false;
  }

  session?.setItem(RELOAD_SESSION_KEY, reloadKey);
  window.location.reload();

  return true;
}

export function detectEquinoxUpdate(currentVersion: string): void {
  const local = storage();

  if (!local) {
    return;
  }

  const previousVersion = local.getItem(VERSION_STORAGE_KEY);

  if (previousVersion === currentVersion) {
    return;
  }

  pendingUpdate = {
    previousVersion,
    currentVersion
  };
}

export function handleEquinoxUpdateRefresh(mode: EquinoxUpdateRefreshMode, language?: string): void {
  if (!pendingUpdate || handled) {
    return;
  }

  handled = true;
  const update = pendingUpdate;
  storage()?.setItem(VERSION_STORAGE_KEY, update.currentVersion);

  void cleanupCachesOnce().then(() => {
    if (mode === "off") {
      return;
    }

    if (mode === "reload" && reloadOnce(update)) {
      return;
    }

    notifyUpdate(language, update);
  });
}
