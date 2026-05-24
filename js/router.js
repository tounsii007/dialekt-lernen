// Dialekto · Router
// Lazy-loads schwere Views (lernen, quiz, vergleich, share) per dynamic import.
// Eager bleiben Home / Entdecken / Detail / Favoriten (häufig + leichtgewichtig).

import { $, $$, parseHash } from './util.js';
import {
  observeReveals, observeCounters,
  initTilt, initMagnetic, initPointerParallax, initParallax
} from './util/motion.js';
import { initNav } from './nav.js';

// Eager: Routes, die direkt verfügbar sein müssen.
import { renderHome } from './views/home.js';
import { renderEntdecken } from './views/entdecken.js';
import { renderDialektDetail } from './views/dialektDetail.js';
import { renderFavoriten } from './views/favoriten.js';

const DEFAULT_ROUTE = 'home';

const ROUTE_LABELS = {
  home:      'Startseite',
  entdecken: 'Dialekte entdecken',
  lernen:    'Karteikarten lernen',
  quiz:      'Quiz',
  vergleich: 'Dialekt-Vergleich',
  favoriten: 'Favoriten und Statistiken',
  dialekt:   'Dialekt-Details',
  share:     'Geteiltes Quiz-Resultat'
};

// Lazy: erst beim Bedarf laden + danach gecached.
const lazyLoaders = {
  lernen:    () => import('./views/lernen.js'),
  quiz:      () => import('./views/quiz.js'),
  vergleich: () => import('./views/vergleich.js'),
  share:     () => import('./views/share.js')
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
      return renderHome(app);
    case 'entdecken':
      return renderEntdecken(app);
    case 'dialekt':
      return renderDialektDetail(app, segs[1]);
    case 'favoriten':
      return renderFavoriten(app);
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
    default:
      return renderHome(app);
  }
}

async function doRender(app, route, segs, params) {
  app.setAttribute('aria-busy', 'true');
  await renderRoute(app, route, segs, params);
  observeReveals(app);
  observeCounters(app);
  initTilt(app);
  initMagnetic(app);
  initPointerParallax(app);
  initParallax(app);
  initNav();
  app.setAttribute('aria-busy', 'false');
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

  if (document.startViewTransition) {
    document.startViewTransition(() => doRender(app, route, segs, params));
  } else {
    doRender(app, route, segs, params);
  }
}

export function initRouter() {
  window.addEventListener('hashchange', router);
  router();
  // Vorladen, sobald die UI idle ist — schnelle Navigation ohne Skeleton-Blitz.
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 500));
  idle(() => {
    Object.keys(lazyLoaders).forEach((k) => { lazyCache[k] || lazyLoaders[k]().then((m) => { lazyCache[k] = m; if (k === 'lernen') lernenModule = m; else if (k === 'quiz') quizModule = m; }); });
  });
}
