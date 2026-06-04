// Dialekto · Router
// Lazy-loads schwere Views (lernen, quiz, vergleich, share) per dynamic import.
// Eager bleiben Home / Entdecken / Detail / Favoriten (häufig + leichtgewichtig).

import { $, $$, parseHash, initLinkInterception, ROUTE_EVENT } from './util.js';
import {
  observeReveals, observeCounters,
  initTilt, initMagnetic, initPointerParallax, initParallax
} from './util/motion.js';
import { initNav, syncMobileNav } from './nav.js';
import { attachPullToRefresh } from './util/pull-to-refresh.js';
import { maybeShowTip } from './util/progressive-disclosure.js';
import { state } from './store/state.js';

// Eager: Routes, die direkt verfügbar sein müssen.
import { renderHome } from './views/home.js';
import { renderEntdecken } from './views/entdecken.js';
import { renderDialektDetail } from './views/dialektDetail.js';

const DEFAULT_ROUTE = 'home';

// Letzte gerenderte Route — um Fokus-Handover nur bei echtem View-Wechsel
// (nicht bei In-View-Re-Renders/Pull-to-Refresh derselben Route) auszulösen.
let lastRenderedRoute = null;

const ROUTE_LABELS = {
  home:      'Startseite',
  entdecken: 'Dialekte entdecken',
  lernen:    'Karteikarten lernen',
  quiz:      'Quiz',
  vergleich: 'Dialekt-Vergleich',
  favoriten: 'Favoriten und Statistiken',
  karte:        'Dialekt-Karte',
  statistiken:  'Lernstatistiken',
  dialekt:      'Dialekt-Details',
  decks:        'Eigene Decks',
  share:     'Geteiltes Quiz-Resultat',
  spiele:    'Mini-Spiele',
  sammlung:  'Ausdrücke-Sammlung',
  idiome:    'Idiom-Explorer',
  lektionen: 'Mini-Lektionen',
  liga:      'Lokale Liga',
  lernpfad:  'Lernpfad',
  shadowing: 'Shadowing-Trainer',
  klangpaare: 'Klangpaare-Hörtrainer'
};

// Lazy: erst beim Bedarf laden + danach gecached.
const lazyLoaders = {
  favoriten:   () => import('./views/favoriten.js'),
  karte:       () => import('./views/karte.js'),
  statistiken: () => import('./views/statistiken.js'),
  lernen:    () => import('./views/lernen.js'),
  quiz:      () => import('./views/quiz.js'),
  vergleich: () => import('./views/vergleich.js'),
  decks:     () => import('./views/decks.js'),
  share:     () => import('./views/share.js'),
  spiele:    () => import('./views/spiele.js'),
  sammlung:  () => import('./views/sammlung.js'),
  idiome:    () => import('./views/idiome.js'),
  lektionen: () => import('./views/lektionen.js'),
  liga:      () => import('./views/liga.js'),
  lernpfad:  () => import('./views/lernpfad.js'),
  shadowing: () => import('./views/shadowing.js'),
  klangpaare: () => import('./views/klangpaare.js')
};
const lazyCache = {};

let lernenModule = null;
let quizModule = null;

function updateActiveNav(route) {
  const active = route === '' ? DEFAULT_ROUTE : route;
  $$('.nav-link').forEach(a => {
    a.classList.toggle('is-active', a.dataset.route === active);
  });
  const announcer = $('#routeAnnouncer');
  if (announcer) {
    const label = ROUTE_LABELS[active] || active;
    announcer.textContent = `Bereich gewechselt: ${label}`;
  }
}

function showSkeleton(app, kind = 'grid') {
  app.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'view skeleton-view';
  if (kind === 'flashcard') {
    wrap.innerHTML = `
      <div class="skeleton-line tall" style="width:50%;margin-bottom:24px"></div>
      <div class="skeleton-card" style="max-width:540px;margin:0 auto;height:380px"></div>
    `;
  } else if (kind === 'quiz') {
    wrap.innerHTML = `
      <div class="skeleton-line tall" style="width:60%;margin:0 auto 24px;max-width:520px"></div>
      <div class="skeleton-card" style="max-width:640px;margin:0 auto;height:240px"></div>
    `;
  } else {
    wrap.innerHTML = `
      <div class="skeleton-line tall" style="width:40%;margin-bottom:24px"></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px">
        ${Array.from({length: 6}).map(() => `<div class="skeleton-card"></div>`).join('')}
      </div>
    `;
  }
  app.appendChild(wrap);
}

async function loadLazy(route) {
  if (lazyCache[route]) return lazyCache[route];
  if (!lazyLoaders[route]) return null;
  lazyCache[route] = await lazyLoaders[route]();
  return lazyCache[route];
}

async function renderRoute(app, route, segs, params) {
  switch (route) {
    case '':
    case 'home':
      return renderHome(app, params);
    case 'entdecken':
      return renderEntdecken(app);
    case 'dialekt':
      return renderDialektDetail(app, segs[1]);
    case 'favoriten': {
      showSkeleton(app, 'grid');
      const m = await loadLazy('favoriten');
      if (!m) return;
      return m.renderFavoriten(app);
    }
    case 'karte': {
      showSkeleton(app, 'grid');
      const m = await loadLazy('karte');
      if (!m) return;
      return m.renderKarte(app);
    }
    case 'statistiken': {
      showSkeleton(app, 'grid');
      const m = await loadLazy('statistiken');
      if (!m) return;
      return m.renderStatistiken(app);
    }
    case 'lernen': {
      if (!lernenModule) {
        showSkeleton(app, 'flashcard');
        lernenModule = await loadLazy('lernen');
      }
      return lernenModule.renderLernen(app, params);
    }
    case 'quiz': {
      if (!quizModule) {
        showSkeleton(app, 'quiz');
        quizModule = await loadLazy('quiz');
      }
      return quizModule.renderQuiz(app);
    }
    case 'vergleich': {
      const m = await loadLazy('vergleich');
      if (!m) return;
      showSkeleton(app, 'grid');
      return m.renderVergleich(app);
    }
    case 'share': {
      const m = await loadLazy('share');
      if (!m) return;
      return m.renderShare(app, segs[1]);
    }
    case 'decks': {
      const m = await loadLazy('decks');
      if (!m) return;
      return m.renderDecks(app);
    }
    case 'spiele': {
      const m = await loadLazy('spiele');
      if (!m) return;
      return m.renderSpiele(app);
    }
    case 'sammlung': {
      const m = await loadLazy('sammlung');
      if (!m) return;
      return m.renderSammlung(app);
    }
    case 'idiome': {
      const m = await loadLazy('idiome');
      if (!m) return;
      return m.renderIdiome(app, params);
    }
    case 'lektionen': {
      const m = await loadLazy('lektionen');
      if (!m) return;
      return m.renderLektionen(app, params);
    }
    case 'liga': {
      const m = await loadLazy('liga');
      if (!m) return;
      return m.renderLiga(app);
    }
    case 'lernpfad': {
      const m = await loadLazy('lernpfad');
      if (!m) return;
      return m.renderLernpfad(app);
    }
    case 'shadowing': {
      const m = await loadLazy('shadowing');
      if (!m) return;
      return m.renderShadowing(app, params);
    }
    case 'klangpaare': {
      const m = await loadLazy('klangpaare');
      if (!m) return;
      return m.renderKlangpaare(app, params);
    }
    default:
      return renderHome(app);
  }
}

async function doRender(app, route, segs, params, focusContent = false) {
  app.setAttribute('aria-busy', 'true');
  await renderRoute(app, route, segs, params);
  observeReveals(app);
  observeCounters(app);
  initTilt(app);
  initMagnetic(app);
  initPointerParallax(app);
  initParallax(app);
  initNav();
  syncMobileNav();
  app.setAttribute('aria-busy', 'false');

  // Fokus-Handover: nur beim echten View-/Routen-Wechsel den Fokus auf den
  // Inhalt setzen (app hat tabindex=-1). So landen Tastatur-/Screenreader-
  // Nutzer nach einem Link-Klick im neuen Inhalt statt im alten Kontext.
  // preventScroll, damit das eigene Smooth-Scrollen nach oben erhalten bleibt.
  if (focusContent) {
    try { app.focus({ preventScroll: true }); } catch {}
  }

  // Progressive Disclosure: nach der Willkommens-Tour höchstens ein
  // kontextueller Tipp pro Navigation (gedrosselt, einmalig je Tipp).
  if (state.onboarded) {
    setTimeout(() => {
      try {
        maybeShowTip({
          route,
          learned: Object.keys(state.gelernt || {}).length,
        });
      } catch {}
    }, 1200);
  }
}

export async function router() {
  const app = $('#app');
  if (!app) return;

  const { segs, params } = parseHash();
  const route = segs[0] || DEFAULT_ROUTE;

  updateActiveNav(route);

  if (route !== 'lernen' && lernenModule?.resetLernSession) lernenModule.resetLernSession();
  if (route !== 'quiz'   && quizModule?.resetQuizSession)   quizModule.resetQuizSession();

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Fokus-Handover nur bei echtem View-Wechsel. Schlüssel inkl. Detail-Segment
  // (z. B. dialekt/hessisch), damit auch ein Wechsel zwischen zwei Detailseiten
  // den Fokus mitnimmt; ein Re-Render derselben Route (Pull-to-Refresh) nicht.
  const renderKey = (route === 'dialekt' || route === 'share') ? `${route}/${segs[1] || ''}` : route;
  const focusContent = renderKey !== lastRenderedRoute;
  lastRenderedRoute = renderKey;

  if (document.startViewTransition) {
    // Bei schnellem Hash-Wechsel kann die vorherige Transition abgebrochen werden
    // → InvalidStateError. Das ist harmlos, also schlucken.
    try {
      const t = document.startViewTransition(() => doRender(app, route, segs, params, focusContent));
      // .finished kann mit AbortError rejecten; .ready kann mit InvalidStateError rejecten
      t.ready?.catch(() => {});
      t.finished?.catch(() => {});
    } catch (e) {
      // Falls die Transition gar nicht startet, direkt rendern
      doRender(app, route, segs, params, focusContent);
    }
  } else {
    doRender(app, route, segs, params, focusContent);
  }
}

export function initRouter() {
  initLinkInterception();                       // interne <a>-Klicks → History-API
  window.addEventListener('popstate', router);  // Zurück/Vorwärts im Browser
  window.addEventListener(ROUTE_EVENT, router); // programmatische go()-Navigation
  router();
  // Pull-to-Refresh (Mobile): am Seitenanfang nach unten ziehen lädt die
  // aktuelle Ansicht neu.
  attachPullToRefresh({ onRefresh: () => router() });
  // Vorladen, sobald die UI idle ist — schnelle Navigation ohne Skeleton-Blitz.
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 500));
  idle(() => {
    Object.keys(lazyLoaders).forEach((k) => { lazyCache[k] || lazyLoaders[k]().then((m) => { lazyCache[k] = m; if (k === 'lernen') lernenModule = m; else if (k === 'quiz') quizModule = m; }); });
  });
}
