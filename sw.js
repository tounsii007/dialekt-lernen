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
const APP_VERSION = '2.1.19';
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
  './styles.css',
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
  './data/dialekte/alemannisch.js',
  './data/dialekte/badisch.js',
  './data/dialekte/bayerisch.js',
  './data/dialekte/berlinisch.js',
  './data/dialekte/brandenburgisch.js',
  './data/dialekte/fraenkisch.js',
  './data/dialekte/hessisch.js',
  './data/dialekte/kaerntnerisch.js',
  './data/dialekte/koelsch.js',
  './data/dialekte/mecklenburgisch.js',
  './data/dialekte/oberpfaelzisch.js',
  './data/dialekte/ostfriesisch.js',
  './data/dialekte/pfaelzisch.js',
  './data/dialekte/plattdeutsch.js',
  './data/dialekte/ruhrdeutsch.js',
  './data/dialekte/saarlaendisch.js',
  './data/dialekte/saechsisch.js',
  './data/dialekte/schwaebisch.js',
  './data/dialekte/schwizerduetsch.js',
  './data/dialekte/steirisch.js',
  './data/dialekte/thueringisch.js',
  './data/dialekte/tirolerisch.js',
  './data/dialekte/vorarlbergerisch.js',
  './data/dialekte/wienerisch.js',
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
  './js/util/voice-viz-webgpu.js',
  './js/util/waveform.js',
  './js/util/week-review.js',
  './js/util/xp-hud.js',
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

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))),
      )
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

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    if (fresh.ok) cache.put(req, fresh.clone());
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
    event.respondWith(networkFirst(req, STATIC_CACHE));
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
