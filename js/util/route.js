// History-API-Routing mit englischen, hash-losen URLs.
//
// Intern bleiben die deutschen Routen-Keys (karte, lernen, entdecken …); nach
// außen erscheinen englische Slugs (map, learn, explore …). Diese Map übersetzt
// in beide Richtungen — so arbeiten router.js und alle go()-Aufrufe unverändert
// mit den deutschen Keys weiter, während die sichtbare URL englisch & ohne # ist.

const SLUGS = {
  home:        '',          // Wurzel "/"
  entdecken:   'explore',
  lernen:      'learn',
  quiz:        'quiz',
  vergleich:   'compare',
  favoriten:   'favorites',
  karte:       'map',
  statistiken: 'stats',
  dialekt:     'dialect',
  decks:       'decks',
  share:       'share',
  spiele:      'games',
  sammlung:    'collection',
  idiome:      'idioms',
  lektionen:   'lessons',
  liga:        'league',
  lernpfad:    'path',
  shadowing:   'shadowing',
  klangpaare:  'sound-pairs',
};
const KEY_BY_SLUG = Object.fromEntries(Object.entries(SLUGS).map(([k, v]) => [v, k]));

export const ROUTE_EVENT = 'dialekto:route';

// Zerlegt ein Navigationsziel ("#/karte/x?y=1", "/karte/x", "karte") in Teile.
function splitTarget(target) {
  const s = String(target || '').trim().replace(/^#/, '');
  const [pathOnly, query = ''] = s.split('?');
  const segs = pathOnly.split('/').filter(Boolean);
  const key = segs.shift() || 'home';
  return { key, rest: segs, query };
}

/** Interner Routen-Key (+Rest/Query) → öffentlicher englischer Pfad. */
export function toPublicPath(target) {
  const { key, rest, query } = splitTarget(target);
  const slug = SLUGS[key] !== undefined ? SLUGS[key] : key;
  const path = '/' + [slug, ...rest].filter(Boolean).join('/');
  return path + (query ? '?' + query : '');
}

/**
 * Liest die aktuelle öffentliche URL und übersetzt sie zurück in die internen
 * (deutschen) Segmente. Name bleibt parseHash() für Abwärtskompatibilität.
 * @returns {{segs:string[], params:Object, raw:string}}
 */
export function parseHash() {
  const slugs = location.pathname.replace(/^\/+/, '').split('/').filter(Boolean);
  const first = slugs.shift() ?? '';
  const key = KEY_BY_SLUG[first] !== undefined ? KEY_BY_SLUG[first] : (first || 'home');
  const params = Object.fromEntries(new URLSearchParams(location.search).entries());
  return { segs: [key, ...slugs], params, raw: location.pathname + location.search };
}

/** Navigiert per History-API zur (englischen) URL und stößt den Router an. */
export function go(target) {
  const url = toPublicPath(target);
  if (url !== location.pathname + location.search) {
    history.pushState(null, '', url);
  }
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

// Sieht ein href wie ein interner Routen-Link aus? ("#/…", "/…", "karte")
function isInternalRouteHref(href) {
  if (!href) return false;
  if (href.startsWith('#/') || href === '#/') return true;
  // absolute, gleiche Origin, kein echtes Asset
  return false;
}

/**
 * Fängt Klicks auf interne Routen-Links (<a href="#/…"> oder data-route) global
 * ab und navigiert per History-API statt einen Voll-Reload/Hash-Sprung auszulösen.
 */
export function initLinkInterception() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (href === '#app') return; // Skip-Link
    let target = null;
    if (isInternalRouteHref(href)) {
      target = href;
    } else if (a.dataset && a.dataset.route) {
      target = '#/' + a.dataset.route;
    }
    if (target === null) return;
    e.preventDefault();
    go(target);
  });
}
