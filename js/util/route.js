// History-API-Routing mit englischen, hash-losen URLs.
//
// Intern bleiben die deutschen Routen-Keys (karte, lernen, entdecken …); nach
// außen erscheinen englische Slugs (map, learn, explore …). Diese Map übersetzt
// in beide Richtungen — so arbeiten router.js und alle go()-Aufrufe unverändert
// mit den deutschen Keys weiter, während die sichtbare URL englisch & ohne # ist.

// ── Single-Source-Routen-Registry ────────────────────────────────────────────
// Eine einzige Quelle für alle deklarativen Routen-Daten. Frühere Drift entstand,
// weil dieselben Routen an vier Stellen gepflegt wurden (SLUGS hier, ROUTE_LABELS
// + lazyLoaders + switch in router.js). Jetzt steht jede Route genau einmal hier;
// SLUGS, ROUTE_LABELS und die Liste der Lazy-Keys werden daraus abgeleitet.
//
// Eintrag je Routen-Key:
//   slug   – öffentlicher englischer URL-Pfad ('' = Wurzel "/")
//   label  – Anzeige-/A11y-Name (router.js: #routeAnnouncer)
//   lazy   – true: View wird per dynamic import() lazy geladen (gecached +
//            idle-vorgeladen). Ohne `lazy` ist die Route eager: statisch in
//            router.js importiert und direkt im switch gerendert.
//
// Die internen Keys (deutsch: 'entdecken', 'lernen', 'karte' …) sind die stabile
// API: ~80 go()-Aufrufe, data-route-Attribute und Views hängen daran — NICHT ändern.
//
// Die konkreten import()-Thunks liegen bewusst in router.js (LAZY_LOADERS),
// kolokalisiert mit loadLazy()/Idle-Preload; router.js prüft beim Init, dass
// genau die hier mit `lazy:true` markierten Keys einen Loader haben (kein Drift).
export const ROUTES = {
  home:        { slug: '',            label: 'Startseite' },                         // eager
  entdecken:   { slug: 'explore',     label: 'Dialekte entdecken' },                 // eager
  lernen:      { slug: 'learn',       label: 'Karteikarten lernen',       lazy: true },
  quiz:        { slug: 'quiz',        label: 'Quiz',                      lazy: true },
  vergleich:   { slug: 'compare',     label: 'Dialekt-Vergleich',         lazy: true },
  favoriten:   { slug: 'favorites',   label: 'Favoriten und Statistiken', lazy: true },
  karte:       { slug: 'map',         label: 'Dialekt-Karte',             lazy: true },
  statistiken: { slug: 'stats',       label: 'Lernstatistiken',           lazy: true },
  dialekt:     { slug: 'dialect',     label: 'Dialekt-Details' },                    // eager
  decks:       { slug: 'decks',       label: 'Eigene Decks',              lazy: true },
  share:       { slug: 'share',       label: 'Geteiltes Quiz-Resultat',   lazy: true },
  spiele:      { slug: 'games',       label: 'Mini-Spiele',               lazy: true },
  sammlung:    { slug: 'collection',  label: 'Ausdrücke-Sammlung',        lazy: true },
  idiome:      { slug: 'idioms',      label: 'Idiom-Explorer',            lazy: true },
  lektionen:   { slug: 'lessons',     label: 'Mini-Lektionen',            lazy: true },
  liga:        { slug: 'league',      label: 'Lokale Liga',               lazy: true },
  lernpfad:    { slug: 'path',        label: 'Lernpfad',                  lazy: true },
  shadowing:   { slug: 'shadowing',   label: 'Shadowing-Trainer',         lazy: true },
  klangpaare:  { slug: 'sound-pairs', label: 'Klangpaare-Hörtrainer',     lazy: true },
};

// Aus der Registry abgeleitet — NICHT separat pflegen.
// SLUGS: key → öffentlicher Slug (Reihenfolge = Registry-Reihenfolge).
const SLUGS = Object.fromEntries(Object.entries(ROUTES).map(([k, r]) => [k, r.slug]));
const KEY_BY_SLUG = Object.fromEntries(Object.entries(SLUGS).map(([k, v]) => [v, k]));

// ROUTE_LABELS: key → Anzeige-/A11y-Name (von router.js für #routeAnnouncer genutzt).
export const ROUTE_LABELS = Object.fromEntries(Object.entries(ROUTES).map(([k, r]) => [k, r.label]));

// LAZY_ROUTE_KEYS: alle Keys mit `lazy:true`. router.js leitet seine Loader-Map
// hieraus ab und verifiziert die Deckungsgleichheit (Drift-Schutz).
export const LAZY_ROUTE_KEYS = Object.entries(ROUTES).filter(([, r]) => r.lazy).map(([k]) => k);

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
