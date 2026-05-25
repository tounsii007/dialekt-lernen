// Dialekto · Service Worker
// Strategien:
//   - Navigation (HTML): network-first → fallback auf Cache (für Updates)
//   - Statische Assets (JS/CSS/Daten): stale-while-revalidate
//   - Bilder: cache-first mit Größenlimit
//   - Externe Fonts: stale-while-revalidate
//   - Nicht-GET-Requests immer durchreichen.
//
// Versionierung: Bei jedem Release neuen VERSION-Suffix vergeben. Alte
// Caches werden in 'activate' aufgeräumt.

const VERSION = 'dialekto-v2';
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const IMAGE_CACHE = `${VERSION}-images`;
const FONT_CACHE = `${VERSION}-fonts`;

const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './js/app.js',
  './js/router.js',
  './js/util.js',
  './js/store.js',
];

// Max images to keep in the runtime image cache (LRU-ish).
const IMAGE_CACHE_MAX_ENTRIES = 50;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
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
      .then(() => self.clients.claim()),
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
    .catch(() => cached);
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

  if (!isSameOrigin) return; // Pass through unknown third-party requests

  if (isNavigationRequest(req)) {
    event.respondWith(networkFirst(req, STATIC_CACHE));
    return;
  }

  if (isImageRequest(req)) {
    event.respondWith(cacheFirstImage(req));
    return;
  }

  // Static assets (JS/CSS/JSON) — stale-while-revalidate so updates
  // arrive within one extra load without a hard reload.
  event.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE));
});

// Allows the page to trigger clearing or an update probe.
self.addEventListener('message', (event) => {
  if (event.data === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))),
    );
  }
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
