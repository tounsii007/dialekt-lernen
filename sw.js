// Dialekto · Service Worker
//
// Strategien:
//   - Navigation (HTML): network-first → fallback auf Cache (für Updates)
//   - Statische Assets (JS/CSS/Daten): stale-while-revalidate
//   - Bilder: cache-first mit Größenlimit
//   - Externe Fonts: stale-while-revalidate
//   - Nicht-GET-Requests immer durchreichen.
//
// Versionierung:
//   APP_VERSION wird via `node tools/sync-version.mjs` aus js/version.js
//   gespiegelt. Alte Caches werden in 'activate' aufgeräumt.
//
// Precache-Liste:
//   Wird ebenfalls von tools/sync-version.mjs automatisch erzeugt — sie
//   spiegelt den gesamten App-Modul-Graphen + die Dialekt-Daten, damit
//   ein Offline-First-Load funktioniert.

// === BEGIN VERSION (managed by tools/sync-version.mjs) ===
const APP_VERSION = '2.1.71';
// === END VERSION ===

const VERSION = `dialekto-v${APP_VERSION}`;
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const IMAGE_CACHE = `${VERSION}-images`;
const FONT_CACHE = `${VERSION}-fonts`;

// === BEGIN PRECACHE (managed by tools/sync-version.mjs) ===
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './styles.min.css',
  './sw.js',
  './data/dialekte.js',
  './data/kategorien.js',
  './js/app.js',
  './js/nav.js',
  './js/router.js',
  './js/search.js',
  './js/shortcuts.js',
  './js/store.js',
  './js/theme.js',
  './js/util.js',
  './js/version.js',
  './data/translations/en.js',
  './data/translations/es.js',
  './data/translations/fr.js',
  './data/translations/tr.js',
  './js/data/lektionen.js',
  './js/store/achievements.js',
  './js/store/avatar.js',
  './js/store/challenges.js',
  './js/store/chest.js',
  './js/store/daily.js',
  './js/store/decks.js',
  './js/store/favorites.js',
  './js/store/goals.js',
  './js/store/league.js',
  './js/store/learning.js',
  './js/store/long-goals.js',
  './js/store/notes.js',
  './js/store/notifications.js',
  './js/store/presets.js',
  './js/store/progress-sync.js',
  './js/store/quests.js',
  './js/store/quiz.js',
  './js/store/settings.js',
  './js/store/skilltree.js',
  './js/store/srs.js',
  './js/store/state.js',
  './js/store/streak.js',
  './js/store/suggestions.js',
  './js/store/theme.js',
  './js/store/transfer.js',
  './js/store/xp.js',
  './js/util/adaptive-plan.js',
  './js/util/api-types.js',
  './js/util/api.js',
  './js/util/audio-analysis.js',
  './js/util/cloze.js',
  './js/util/combo-hud.js',
  './js/util/combo.js',
  './js/util/comparison.js',
  './js/util/daily-goal.js',
  './js/util/dialect-progress.js',
  './js/util/dom.js',
  './js/util/etymology.js',
  './js/util/feedback.js',
  './js/util/flags.js',
  './js/util/forgetting-curve.js',
  './js/util/forvo.js',
  './js/util/fsrs-fuzz.js',
  './js/util/fsrs-optimizer.js',
  './js/util/fsrs.js',
  './js/util/fuzzy.js',
  './js/util/hangman.js',
  './js/util/i18n.js',
  './js/util/icons.js',
  './js/util/indexed-db.js',
  './js/util/inline-confirm.js',
  './js/util/ipa.js',
  './js/util/learn-cache.js',
  './js/util/minimal-pairs.js',
  './js/util/modal.js',
  './js/util/motion.js',
  './js/util/network.js',
  './js/util/onboarding.js',
  './js/util/pdf-export.js',
  './js/util/pomodoro.js',
  './js/util/progressive-disclosure.js',
  './js/util/pronunciation.js',
  './js/util/pull-to-refresh.js',
  './js/util/push.js',
  './js/util/pwa.js',
  './js/util/random.js',
  './js/util/recommendations.js',
  './js/util/recorder.js',
  './js/util/related-expressions.js',
  './js/util/ripple.js',
  './js/util/route.js',
  './js/util/schema.js',
  './js/util/search-index.js',
  './js/util/season.js',
  './js/util/shadowing.js',
  './js/util/share-card.js',
  './js/util/shortcuts-overlay.js',
  './js/util/sounds.js',
  './js/util/speech.js',
  './js/util/srs-worker-host.js',
  './js/util/srs-worker.js',
  './js/util/text.js',
  './js/util/time-heatmap.js',
  './js/util/timing.js',
  './js/util/toast.js',
  './js/util/translations.js',
  './js/util/voice-profiles.js',
  './js/util/voice-viz-webgpu.js',
  './js/util/waveform.js',
  './js/util/week-review.js',
  './js/util/xp-hud.js',
  './js/vendor/driver.js',
  './js/views/decks.js',
  './js/views/dialektDetail.js',
  './js/views/entdecken.js',
  './js/views/favoriten.js',
  './js/views/home.js',
  './js/views/idiome.js',
  './js/views/karte.js',
  './js/views/klangpaare.js',
  './js/views/lektionen.js',
  './js/views/lernen.js',
  './js/views/lernpfad.js',
  './js/views/liga.js',
  './js/views/partials.js',
  './js/views/quiz.js',
  './js/views/sammlung.js',
  './js/views/settings.js',
  './js/views/shadowing.js',
  './js/views/share.js',
  './js/views/spiele.js',
  './js/views/statistiken.js',
  './js/views/suggestEditModal.js',
  './js/views/vergleich.js',
  './js/views/favoriten/achievements-panel.js',
  './js/views/favoriten/chest-panel.js',
  './js/views/favoriten/heatmap-panel.js',
  './js/views/favoriten/list-panel.js',
  './js/views/favoriten/notifications-panel.js',
  './js/views/favoriten/speech-panel.js',
  './js/views/favoriten/stats-panel.js',
  './js/views/favoriten/streak-panel.js',
  './js/views/favoriten/suggestions-panel.js',
  './js/views/favoriten/tools-panel.js',
  './js/views/favoriten/xp-panel.js',
  './js/views/home/adaptive.js',
  './js/views/home/challenges.js',
  './js/views/home/daily-expression.js',
  './js/views/home/dashboard.js',
  './js/views/home/dialekt-grid.js',
  './js/views/home/fakt.js',
  './js/views/home/features.js',
  './js/views/home/hero.js',
  './js/views/home/league.js',
  './js/views/home/long-goals.js',
  './js/views/home/pomodoro.js',
  './js/views/home/quests.js',
  './js/views/home/season-banner.js',
  './js/views/lernen/flashcard.js',
  './js/views/lernen/setup.js',
  './js/views/lernen/state.js',
  './js/views/lernen/summary.js',
  './js/views/quiz/constants.js',
  './js/views/quiz/question-builder.js',
  './js/views/quiz/question.js',
  './js/views/quiz/result.js',
  './js/views/quiz/setup.js',
  './js/views/quiz/state.js',
];
// === END PRECACHE ===

const IMAGE_CACHE_MAX_ENTRIES = 50;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch((err) => {
        // Eine fehlende Datei darf den Install nicht abbrechen — wir loggen
        // sie und cachen den Rest individuell.
        console.warn('[SW] addAll teilweise fehlgeschlagen:', err);
        return Promise.allSettled(PRECACHE_URLS.map((u) => cache.add(u).catch(() => {})));
      }))
      .then(() => self.skipWaiting()),
  );
});

// Navigation Preload feature-gated aktivieren. Der Browser startet damit den
// Netzwerk-Request für Navigationen PARALLEL zum SW-Boot, sodass im fetch-
// Handler bereits eine Response bereitsteht (event.preloadResponse) — spart die
// SW-Startup-Latenz beim ersten Navigations-Request. Fehlschläge (z.B. nicht
// unterstützt) dürfen die Aktivierung nicht abbrechen.
async function enableNavigationPreload() {
  if (self.registration && self.registration.navigationPreload) {
    try {
      await self.registration.navigationPreload.enable();
    } catch {
      // best-effort — Offline-/Cache-Strategie funktioniert auch ohne Preload.
    }
  }
}

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))),
      )
      .then(() => enableNavigationPreload())
      .then(() => self.clients.claim())
      .then(() => {
        // Allen Clients eine Update-Nachricht senden, damit eine Toast-UI
        // anzeigen kann „neue Version geladen".
        return self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
          clients.forEach((c) => c.postMessage({ type: 'SW_ACTIVATED', version: APP_VERSION }));
        });
      }),
  );
});

function isFontRequest(url) {
  return url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com');
}

function isImageRequest(req) {
  return req.destination === 'image';
}

function isNavigationRequest(req) {
  return req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'));
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  const toDelete = keys.slice(0, keys.length - maxEntries);
  await Promise.all(toDelete.map((req) => cache.delete(req)));
}

// network-first mit optionaler Navigation-Preload-Response.
//   preloadResponse: das Promise aus event.preloadResponse (oder null/undefined).
//     Wenn der Browser bereits eine Navigations-Response vorgeladen hat, nutzen
//     wir sie statt eines eigenen fetch — spart die SW-Boot-Latenz. Liefert das
//     Preload nichts Brauchbares (null/Fehler), fällt es transparent auf fetch
//     zurück. Der Offline-Fallback auf index.html bleibt in jedem Fall erhalten.
async function networkFirst(req, cacheName, preloadResponse) {
  const cache = await caches.open(cacheName);
  try {
    let fresh;
    if (preloadResponse) {
      try {
        fresh = await preloadResponse;
      } catch {
        fresh = undefined;
      }
    }
    if (!fresh) fresh = await fetch(req);
    if (fresh && fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(req);
    if (cached) return cached;
    if (isNavigationRequest(req)) {
      const fallback = await cache.match('./index.html');
      if (fallback) return fallback;
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req)
    .then((resp) => {
      if (resp.ok) cache.put(req, resp.clone());
      return resp;
    })
    // Offline + nicht gecacht: kontrollierte 503 statt eines zu `undefined`
    // aufgelösten Promise (respondWith(Promise<undefined>) → Netzwerkfehler).
    .catch(() => cached || new Response('Offline', { status: 503, statusText: 'Service Unavailable' }));
  return cached || fetchPromise;
}

async function cacheFirstImage(req) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const resp = await fetch(req);
    if (resp.ok) {
      cache.put(req, resp.clone());
      trimCache(IMAGE_CACHE, IMAGE_CACHE_MAX_ENTRIES);
    }
    return resp;
  } catch {
    return new Response('Image unavailable', { status: 503 });
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isFontRequest(url)) {
    event.respondWith(staleWhileRevalidate(req, FONT_CACHE));
    return;
  }

  if (!isSameOrigin) return;

  if (isNavigationRequest(req)) {
    // event.preloadResponse ist gesetzt, sobald Navigation Preload aktiv ist
    // (sonst undefined) — networkFirst nutzt es bevorzugt vor einem eigenen fetch.
    event.respondWith(networkFirst(req, STATIC_CACHE, event.preloadResponse));
    return;
  }

  if (isImageRequest(req)) {
    event.respondWith(cacheFirstImage(req));
    return;
  }

  event.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE));
});

self.addEventListener('message', (event) => {
  // Defense-in-depth: nur same-origin-Nachrichten verarbeiten. Der SW-Scope ist
  // ohnehin origin-gebunden, aber so können destruktive Kommandos (CLEAR_CACHE)
  // bei künftigen Änderungen nicht versehentlich aus fremdem Kontext greifen.
  if (event.origin && event.origin !== self.location.origin) return;
  if (event.data === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))),
    );
  }
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data === 'GET_VERSION') {
    event.source?.postMessage({ type: 'SW_VERSION', version: APP_VERSION });
  }
});
