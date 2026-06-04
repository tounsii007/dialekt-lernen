// sw.js — Service-Worker-Strategien (Sandbox-Tests).
//
// METHODE: Der echte sw.js-Quelltext wird in einer node:vm-Sandbox mit
// gemockten Service-Worker-Globals (self, caches, fetch, Response, URL,
// clients, registration) evaluiert. sw.js bleibt dabei STRUKTURELL
// unangetastet — kein Umbau, kein Export, kein importScripts. Wir prüfen die
// reinen Helfer (isNavigationRequest, trimCache, networkFirst,
// staleWhileRevalidate, Strategie-Auswahl) sowie die Lifecycle-Handler
// (install/activate/fetch/message), indem wir die per addEventListener
// registrierten Callbacks aus der Sandbox abgreifen und gezielt feuern.
//
// Warum das den SW nicht bricht: sw.js wird unverändert ausgeführt; ein
// Fehler in den Mocks/Tests kann die ausgelieferte Datei nicht verändern.
// Die top-level `function`/`const`-Deklarationen landen — da sw.js als
// klassisches Script (kein Modul) in der vm läuft — als Eigenschaften des
// Sandbox-Globals und sind so direkt testbar.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SW_SOURCE = readFileSync(join(ROOT, 'sw.js'), 'utf8');

const ORIGIN = 'https://example.test';

// --- Minimal-Mocks der Service-Worker-Plattform -----------------------------

// In-Memory-Cache, der die von sw.js genutzte CacheStorage-API abdeckt.
class FakeCache {
  constructor() {
    // Map<string urlKey, Response>
    this.store = new Map();
    this.putCalls = [];
  }
  _key(req) {
    return typeof req === 'string' ? req : req.url;
  }
  async match(req) {
    return this.store.get(this._key(req));
  }
  async put(req, res) {
    const key = this._key(req);
    this.putCalls.push(key);
    this.store.set(key, res);
  }
  // install-Pfad nutzt addAll / add (Precache der App-Shell).
  async add(req) {
    this.store.set(this._key(req), new FakeResponse('precached', { status: 200 }));
  }
  async addAll(reqs) {
    for (const r of reqs) await this.add(r);
  }
  async delete(req) {
    return this.store.delete(this._key(req));
  }
  async keys() {
    // Reihenfolge-stabil: in Einfügereihenfolge (wie echte CacheStorage).
    return [...this.store.keys()].map((url) => ({ url }));
  }
}

class FakeCacheStorage {
  constructor() {
    this.caches = new Map(); // Map<name, FakeCache>
    this.deleted = [];
  }
  async open(name) {
    if (!this.caches.has(name)) this.caches.set(name, new FakeCache());
    return this.caches.get(name);
  }
  async keys() {
    return [...this.caches.keys()];
  }
  async delete(name) {
    this.deleted.push(name);
    return this.caches.delete(name);
  }
  async match(req) {
    for (const c of this.caches.values()) {
      const hit = await c.match(req);
      if (hit) return hit;
    }
    return undefined;
  }
}

// Schlanker Response-Ersatz mit clone()/ok wie von sw.js erwartet.
class FakeResponse {
  constructor(body, init = {}) {
    this.body = body;
    this.status = init.status ?? 200;
    this.statusText = init.statusText ?? '';
    this.ok = this.status >= 200 && this.status < 300;
    this._tag = init._tag; // Test-Marker zur Identifikation
  }
  clone() {
    return new FakeResponse(this.body, {
      status: this.status,
      statusText: this.statusText,
      _tag: this._tag,
    });
  }
}

// Request-Stub mit Header-Map und destination/mode/method wie im SW genutzt.
function makeRequest(url, { mode = 'no-cors', method = 'GET', destination = '', accept = '' } = {}) {
  return {
    url,
    mode,
    method,
    destination,
    headers: {
      get(name) {
        if (String(name).toLowerCase() === 'accept') return accept;
        return null;
      },
    },
  };
}

// Baut eine frische Sandbox, evaluiert sw.js darin und liefert Context +
// gesammelte Handler + Hooks für Assertions.
function loadServiceWorker(overrides = {}) {
  const listeners = {}; // type -> handler
  const postedMessages = []; // an Clients gesendete Nachrichten
  const log = { warn: [], error: [], info: [] };

  const fetchImpl = overrides.fetch
    || (async (req) => new FakeResponse('net', { _tag: 'network', status: 200 }));

  const navigationPreload = {
    enabled: false,
    enableCalls: 0,
    async enable() {
      this.enableCalls += 1;
      this.enabled = true;
      if (overrides.navigationPreloadEnableThrows) throw new Error('not supported');
    },
  };

  const clients = {
    claimCalls: 0,
    async claim() {
      this.claimCalls += 1;
    },
    async matchAll() {
      return [
        { postMessage: (m) => postedMessages.push(m) },
      ];
    },
  };

  const self = {
    location: { origin: ORIGIN },
    registration: overrides.noNavigationPreload
      ? {}
      : { navigationPreload },
    skipWaitingCalls: 0,
    skipWaiting() {
      this.skipWaitingCalls += 1;
    },
    clients,
    addEventListener(type, handler) {
      listeners[type] = handler;
    },
  };

  const caches = new FakeCacheStorage();

  // Sandbox-Global: self verweist auf sich selbst (wie im echten SW-Scope).
  const sandbox = {
    self,
    caches,
    fetch: fetchImpl,
    Response: FakeResponse,
    URL, // echtes URL aus Node — Verhalten identisch zum Browser
    console: {
      warn: (...a) => log.warn.push(a),
      error: (...a) => log.error.push(a),
      info: (...a) => log.info.push(a),
      log: () => {},
    },
    setTimeout,
    clearTimeout,
    Promise,
  };
  // `self` und der globale Scope sind im SW dasselbe Objekt.
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SW_SOURCE, sandbox, { filename: 'sw.js' });

  return {
    sandbox,
    self,
    caches,
    clients,
    navigationPreload,
    listeners,
    postedMessages,
    log,
    // Bequeme Event-Trigger.
    async dispatchInstall() {
      const promises = [];
      listeners.install({ waitUntil: (p) => promises.push(p) });
      await Promise.all(promises);
    },
    async dispatchActivate() {
      const promises = [];
      listeners.activate({ waitUntil: (p) => promises.push(p) });
      await Promise.all(promises);
    },
    // Feuert den fetch-Handler und liefert die an respondWith übergebene Response.
    async dispatchFetch(request, { preloadResponse } = {}) {
      let responded; // Promise | undefined
      const event = {
        request,
        preloadResponse,
        respondWith: (p) => { responded = p; },
        waitUntil: () => {},
      };
      listeners.fetch(event);
      return responded === undefined ? undefined : await responded;
    },
    async dispatchMessage(data, origin = ORIGIN) {
      const waited = [];
      const event = {
        data,
        origin,
        source: { postMessage: (m) => postedMessages.push(m) },
        waitUntil: (p) => waited.push(p),
      };
      listeners.message(event);
      await Promise.all(waited);
      return waited;
    },
  };
}

// =============================================================================
// 1) Reine Helfer
// =============================================================================

describe('sw: isNavigationRequest', () => {
  it('mode "navigate" → true', () => {
    const sw = loadServiceWorker();
    const req = makeRequest(`${ORIGIN}/learn`, { mode: 'navigate' });
    assert.equal(sw.sandbox.isNavigationRequest(req), true);
  });

  it('GET mit Accept: text/html → true (auch ohne navigate-mode)', () => {
    const sw = loadServiceWorker();
    const req = makeRequest(`${ORIGIN}/x`, { mode: 'no-cors', method: 'GET', accept: 'text/html,application/xhtml+xml' });
    assert.equal(sw.sandbox.isNavigationRequest(req), true);
  });

  it('reiner Asset-GET (Accept ohne html) → falsy', () => {
    const sw = loadServiceWorker();
    const req = makeRequest(`${ORIGIN}/app.js`, { mode: 'no-cors', method: 'GET', accept: '*/*' });
    assert.equal(Boolean(sw.sandbox.isNavigationRequest(req)), false);
  });

  it('fehlender Accept-Header wirft nicht (optional chaining → falsy)', () => {
    const sw = loadServiceWorker();
    const req = { url: `${ORIGIN}/x`, mode: 'no-cors', method: 'GET', headers: { get: () => null } };
    // optional chaining liefert undefined (kein Wurf) — als falsy interpretiert.
    assert.doesNotThrow(() => sw.sandbox.isNavigationRequest(req));
    assert.equal(Boolean(sw.sandbox.isNavigationRequest(req)), false);
  });
});

describe('sw: isFontRequest / isImageRequest', () => {
  it('Google-Fonts-Hosts → true', () => {
    const sw = loadServiceWorker();
    assert.equal(sw.sandbox.isFontRequest(new URL('https://fonts.googleapis.com/css2?x')), true);
    assert.equal(sw.sandbox.isFontRequest(new URL('https://fonts.gstatic.com/s/a.woff2')), true);
  });
  it('fremder Host → false', () => {
    const sw = loadServiceWorker();
    assert.equal(sw.sandbox.isFontRequest(new URL(`${ORIGIN}/x`)), false);
  });
  it('destination "image" → true, sonst false', () => {
    const sw = loadServiceWorker();
    assert.equal(sw.sandbox.isImageRequest(makeRequest('x', { destination: 'image' })), true);
    assert.equal(sw.sandbox.isImageRequest(makeRequest('x', { destination: 'script' })), false);
  });
});

describe('sw: trimCache (Größenlimit)', () => {
  it('löscht die ältesten Einträge bis maxEntries erreicht ist', async () => {
    const sw = loadServiceWorker();
    const cache = await sw.caches.open('img');
    for (let i = 0; i < 5; i++) {
      await cache.put(`${ORIGIN}/img/${i}.png`, new FakeResponse('x'));
    }
    await sw.sandbox.trimCache('img', 3);
    const keys = (await cache.keys()).map((k) => k.url);
    assert.equal(keys.length, 3);
    // FIFO: die zwei ältesten (0,1) sind weg, 2..4 bleiben.
    assert.deepEqual(keys, [`${ORIGIN}/img/2.png`, `${ORIGIN}/img/3.png`, `${ORIGIN}/img/4.png`]);
  });

  it('unter dem Limit bleibt alles erhalten', async () => {
    const sw = loadServiceWorker();
    const cache = await sw.caches.open('img');
    await cache.put(`${ORIGIN}/a.png`, new FakeResponse('x'));
    await cache.put(`${ORIGIN}/b.png`, new FakeResponse('x'));
    await sw.sandbox.trimCache('img', 50);
    assert.equal((await cache.keys()).length, 2);
  });
});

// =============================================================================
// 2) networkFirst — inkl. Navigation Preload + Offline-Fallback
// =============================================================================

describe('sw: networkFirst', () => {
  it('Online: liefert frische Response und cached sie (nur bei ok)', async () => {
    let fetched = 0;
    const sw = loadServiceWorker({
      fetch: async () => { fetched++; return new FakeResponse('fresh', { _tag: 'network', status: 200 }); },
    });
    const req = makeRequest(`${ORIGIN}/page`, { mode: 'navigate' });
    const res = await sw.sandbox.networkFirst(req, 'static');
    assert.equal(res._tag, 'network');
    assert.equal(fetched, 1);
    const cache = await sw.caches.open('static');
    assert.equal((await cache.match(req)) !== undefined, true);
  });

  it('Navigation Preload: nutzt preloadResponse statt eines eigenen fetch', async () => {
    let fetched = 0;
    const sw = loadServiceWorker({
      fetch: async () => { fetched++; return new FakeResponse('net', { _tag: 'network' }); },
    });
    const req = makeRequest(`${ORIGIN}/page`, { mode: 'navigate' });
    const preload = Promise.resolve(new FakeResponse('preloaded', { _tag: 'preload', status: 200 }));
    const res = await sw.sandbox.networkFirst(req, 'static', preload);
    assert.equal(res._tag, 'preload', 'Preload-Response wird bevorzugt');
    assert.equal(fetched, 0, 'kein eigener fetch, wenn Preload eine Response liefert');
    // Preload-Response wird ebenfalls gecached.
    const cache = await sw.caches.open('static');
    assert.equal((await cache.match(req)).body, 'preloaded');
  });

  it('Preload löst zu null auf (Preload aus) → fällt auf fetch zurück', async () => {
    let fetched = 0;
    const sw = loadServiceWorker({
      fetch: async () => { fetched++; return new FakeResponse('net', { _tag: 'network' }); },
    });
    const req = makeRequest(`${ORIGIN}/page`, { mode: 'navigate' });
    const res = await sw.sandbox.networkFirst(req, 'static', Promise.resolve(null));
    assert.equal(res._tag, 'network');
    assert.equal(fetched, 1);
  });

  it('Preload-Promise rejected → fällt sauber auf fetch zurück', async () => {
    let fetched = 0;
    const sw = loadServiceWorker({
      fetch: async () => { fetched++; return new FakeResponse('net', { _tag: 'network' }); },
    });
    const req = makeRequest(`${ORIGIN}/page`, { mode: 'navigate' });
    const res = await sw.sandbox.networkFirst(req, 'static', Promise.reject(new Error('preload failed')));
    assert.equal(res._tag, 'network');
    assert.equal(fetched, 1);
  });

  it('Offline + gecacht: liefert die gecachte Response', async () => {
    const sw = loadServiceWorker({ fetch: async () => { throw new Error('offline'); } });
    const req = makeRequest(`${ORIGIN}/page`, { mode: 'navigate' });
    const cache = await sw.caches.open('static');
    await cache.put(req, new FakeResponse('cached', { _tag: 'cache' }));
    const res = await sw.sandbox.networkFirst(req, 'static');
    assert.equal(res._tag, 'cache');
  });

  it('Offline + nicht gecacht + Navigation: Fallback auf ./index.html', async () => {
    const sw = loadServiceWorker({ fetch: async () => { throw new Error('offline'); } });
    const cache = await sw.caches.open('static');
    await cache.put('./index.html', new FakeResponse('<html>shell</html>', { _tag: 'shell' }));
    const req = makeRequest(`${ORIGIN}/deep/link`, { mode: 'navigate' });
    const res = await sw.sandbox.networkFirst(req, 'static');
    assert.equal(res._tag, 'shell', 'Offline-Navigation fällt auf die App-Shell zurück');
  });

  it('Offline + Preload rejected + Navigation: trotzdem index.html-Fallback', async () => {
    // Sicherstellen, dass der neue Preload-Pfad den Offline-Fallback NICHT bricht.
    const sw = loadServiceWorker({ fetch: async () => { throw new Error('offline'); } });
    const cache = await sw.caches.open('static');
    await cache.put('./index.html', new FakeResponse('shell', { _tag: 'shell' }));
    const req = makeRequest(`${ORIGIN}/x`, { mode: 'navigate' });
    const res = await sw.sandbox.networkFirst(req, 'static', Promise.reject(new Error('no preload')));
    assert.equal(res._tag, 'shell');
  });

  it('Offline + nicht gecacht + kein Navigations-Request: 503', async () => {
    const sw = loadServiceWorker({ fetch: async () => { throw new Error('offline'); } });
    const req = makeRequest(`${ORIGIN}/api/data`, { mode: 'cors', accept: 'application/json' });
    const res = await sw.sandbox.networkFirst(req, 'static');
    assert.equal(res.status, 503);
  });
});

// =============================================================================
// 3) staleWhileRevalidate
// =============================================================================

describe('sw: staleWhileRevalidate', () => {
  it('Cache-Hit: liefert sofort den Cache und revalidiert im Hintergrund', async () => {
    let fetched = 0;
    const sw = loadServiceWorker({
      fetch: async () => { fetched++; return new FakeResponse('new', { _tag: 'network', status: 200 }); },
    });
    const req = makeRequest(`${ORIGIN}/app.js`, { accept: '*/*' });
    const cache = await sw.caches.open('runtime');
    await cache.put(req, new FakeResponse('old', { _tag: 'cache' }));
    const res = await sw.sandbox.staleWhileRevalidate(req, 'runtime');
    assert.equal(res._tag, 'cache', 'sofort aus dem Cache');
    // Hintergrund-Revalidierung abwarten und prüfen, dass der Cache aktualisiert wird.
    await new Promise((r) => setTimeout(r, 5));
    assert.equal(fetched, 1);
    assert.equal((await cache.match(req)).body, 'new');
  });

  it('Cache-Miss online: holt aus dem Netz und cached', async () => {
    const sw = loadServiceWorker({
      fetch: async () => new FakeResponse('fromnet', { _tag: 'network', status: 200 }),
    });
    const req = makeRequest(`${ORIGIN}/new.js`, { accept: '*/*' });
    const res = await sw.sandbox.staleWhileRevalidate(req, 'runtime');
    assert.equal(res._tag, 'network');
    const cache = await sw.caches.open('runtime');
    assert.equal((await cache.match(req)) !== undefined, true);
  });

  it('Cache-Miss offline: kontrollierte 503 statt undefined', async () => {
    const sw = loadServiceWorker({ fetch: async () => { throw new Error('offline'); } });
    const req = makeRequest(`${ORIGIN}/missing.js`, { accept: '*/*' });
    const res = await sw.sandbox.staleWhileRevalidate(req, 'runtime');
    assert.equal(res.status, 503);
  });
});

// =============================================================================
// 4) fetch-Handler: Strategie-Auswahl
// =============================================================================

describe('sw: fetch-Handler Routing', () => {
  it('Nicht-GET wird durchgereicht (kein respondWith)', async () => {
    const sw = loadServiceWorker();
    const req = makeRequest(`${ORIGIN}/api`, { method: 'POST' });
    const res = await sw.dispatchFetch(req);
    assert.equal(res, undefined, 'POST nicht abgefangen');
  });

  it('Cross-Origin (nicht Font) wird durchgereicht', async () => {
    const sw = loadServiceWorker();
    const req = makeRequest('https://cdn.other.test/x.js', { method: 'GET', accept: '*/*' });
    const res = await sw.dispatchFetch(req);
    assert.equal(res, undefined);
  });

  it('Font-Request (cross-origin) → wird abgefangen (SWR)', async () => {
    const sw = loadServiceWorker({ fetch: async () => new FakeResponse('font', { _tag: 'font', status: 200 }) });
    const req = makeRequest('https://fonts.gstatic.com/s/a.woff2', { method: 'GET', accept: '*/*' });
    const res = await sw.dispatchFetch(req);
    assert.equal(res._tag, 'font');
  });

  it('Navigation (same-origin) → networkFirst und nutzt preloadResponse', async () => {
    let fetched = 0;
    const sw = loadServiceWorker({ fetch: async () => { fetched++; return new FakeResponse('net', { _tag: 'network' }); } });
    const req = makeRequest(`${ORIGIN}/learn`, { mode: 'navigate', method: 'GET', accept: 'text/html' });
    const preload = Promise.resolve(new FakeResponse('pre', { _tag: 'preload', status: 200 }));
    const res = await sw.dispatchFetch(req, { preloadResponse: preload });
    assert.equal(res._tag, 'preload', 'Navigation nutzt event.preloadResponse');
    assert.equal(fetched, 0);
  });

  it('Navigation ohne Preload (undefined) → networkFirst per fetch', async () => {
    let fetched = 0;
    const sw = loadServiceWorker({ fetch: async () => { fetched++; return new FakeResponse('net', { _tag: 'network' }); } });
    const req = makeRequest(`${ORIGIN}/learn`, { mode: 'navigate', method: 'GET', accept: 'text/html' });
    const res = await sw.dispatchFetch(req, { preloadResponse: undefined });
    assert.equal(res._tag, 'network');
    assert.equal(fetched, 1);
  });

  it('Bild (same-origin) → cache-first', async () => {
    let fetched = 0;
    const sw = loadServiceWorker({ fetch: async () => { fetched++; return new FakeResponse('img', { _tag: 'img', status: 200 }); } });
    const req = makeRequest(`${ORIGIN}/a.png`, { method: 'GET', destination: 'image', accept: 'image/*' });
    // 1. Aufruf: Netz + Cache.
    const r1 = await sw.dispatchFetch(req);
    assert.equal(r1._tag, 'img');
    // 2. Aufruf: aus dem Cache, kein erneuter fetch.
    const r2 = await sw.dispatchFetch(req);
    assert.equal(r2._tag, 'img');
    assert.equal(fetched, 1, 'cache-first: nur einmal aus dem Netz');
  });

  it('sonstiges Asset (same-origin) → staleWhileRevalidate (Runtime-Cache)', async () => {
    const sw = loadServiceWorker({ fetch: async () => new FakeResponse('js', { _tag: 'asset', status: 200 }) });
    const req = makeRequest(`${ORIGIN}/js/app.js`, { method: 'GET', accept: '*/*' });
    const res = await sw.dispatchFetch(req);
    assert.equal(res._tag, 'asset');
    // landet im Runtime-Cache (Versions-Präfix + -runtime).
    const runtimeName = (await sw.caches.keys()).find((n) => n.endsWith('-runtime'));
    assert.ok(runtimeName, 'Runtime-Cache wurde angelegt');
  });
});

// =============================================================================
// 5) Lifecycle: install / activate (Versionierung + Navigation Preload)
// =============================================================================

describe('sw: install', () => {
  it('precached die App-Shell und ruft skipWaiting', async () => {
    const sw = loadServiceWorker({ fetch: async () => new FakeResponse('x', { status: 200 }) });
    await sw.dispatchInstall();
    assert.ok(sw.self.skipWaitingCalls >= 1, 'skipWaiting aufgerufen');
    const staticName = (await sw.caches.keys()).find((n) => n.endsWith('-static'));
    assert.ok(staticName, 'Static-Cache angelegt');
    const cache = await sw.caches.open(staticName);
    // mind. die Kern-Shell-Einträge sind gecached.
    assert.ok((await cache.match('./index.html')) !== undefined, 'index.html precached');
    assert.ok((await cache.match('./')) !== undefined, 'Site-Root precached');
  });
});

describe('sw: activate', () => {
  it('löscht alte (fremd-versionierte) Caches, behält aktuelle', async () => {
    const sw = loadServiceWorker();
    // Alt-Caches + ein aktueller anlegen.
    await sw.caches.open('dialekto-v0.0.1-static');
    await sw.caches.open('dialekto-v0.0.1-runtime');
    // aktueller Cache: Name aus dem SW ableiten (Install legt -static an).
    await sw.dispatchInstall();
    const currentStatic = (await sw.caches.keys()).find((n) => n.endsWith('-static') && !n.startsWith('dialekto-v0.0.1'));
    await sw.dispatchActivate();
    const remaining = await sw.caches.keys();
    assert.ok(!remaining.includes('dialekto-v0.0.1-static'), 'alter Static-Cache gelöscht');
    assert.ok(!remaining.includes('dialekto-v0.0.1-runtime'), 'alter Runtime-Cache gelöscht');
    assert.ok(remaining.includes(currentStatic), 'aktueller Cache bleibt');
  });

  it('aktiviert Navigation Preload (feature-gated)', async () => {
    const sw = loadServiceWorker();
    await sw.dispatchActivate();
    assert.equal(sw.navigationPreload.enableCalls, 1, 'navigationPreload.enable() aufgerufen');
    assert.equal(sw.navigationPreload.enabled, true);
  });

  it('ruft clients.claim und postet SW_ACTIVATED an Clients', async () => {
    const sw = loadServiceWorker();
    await sw.dispatchActivate();
    assert.ok(sw.clients.claimCalls >= 1, 'clients.claim aufgerufen');
    const activated = sw.postedMessages.find((m) => m && m.type === 'SW_ACTIVATED');
    assert.ok(activated, 'SW_ACTIVATED-Nachricht gesendet');
    assert.ok(typeof activated.version === 'string' && activated.version.length > 0, 'Version mitgesendet');
  });

  it('Navigation Preload nicht unterstützt → activate bricht NICHT ab', async () => {
    const sw = loadServiceWorker({ noNavigationPreload: true });
    await assert.doesNotReject(() => sw.dispatchActivate());
    // Cleanup + claim laufen trotzdem.
    assert.ok(sw.clients.claimCalls >= 1);
  });

  it('navigationPreload.enable() wirft → activate schluckt den Fehler', async () => {
    const sw = loadServiceWorker({ navigationPreloadEnableThrows: true });
    await assert.doesNotReject(() => sw.dispatchActivate());
    assert.ok(sw.clients.claimCalls >= 1, 'claim trotzdem aufgerufen');
  });
});

// =============================================================================
// 6) message-Handler
// =============================================================================

describe('sw: message-Handler', () => {
  beforeEach(() => {});

  it('CLEAR_CACHE löscht alle Caches', async () => {
    const sw = loadServiceWorker();
    await sw.caches.open('a');
    await sw.caches.open('b');
    await sw.dispatchMessage('CLEAR_CACHE');
    assert.equal((await sw.caches.keys()).length, 0, 'alle Caches gelöscht');
  });

  it('Cross-Origin-Nachricht wird ignoriert (Defense-in-depth)', async () => {
    const sw = loadServiceWorker();
    await sw.caches.open('a');
    await sw.dispatchMessage('CLEAR_CACHE', 'https://evil.test');
    assert.equal((await sw.caches.keys()).length, 1, 'fremde Origin darf Cache nicht leeren');
  });

  it('SKIP_WAITING ruft self.skipWaiting', async () => {
    const sw = loadServiceWorker();
    await sw.dispatchMessage('SKIP_WAITING');
    assert.ok(sw.self.skipWaitingCalls >= 1);
  });

  it('GET_VERSION antwortet der Quelle mit SW_VERSION', async () => {
    const sw = loadServiceWorker();
    await sw.dispatchMessage('GET_VERSION');
    const reply = sw.postedMessages.find((m) => m && m.type === 'SW_VERSION');
    assert.ok(reply, 'SW_VERSION zurückgesendet');
    assert.ok(typeof reply.version === 'string' && reply.version.length > 0);
  });
});
