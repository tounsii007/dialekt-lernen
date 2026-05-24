// Dialekto · Router
// Wertet den Location-Hash aus und ruft die passende View-Render-Funktion auf.

import { $, $$, parseHash } from './util.js';
import {
  observeReveals, observeCounters,
  initTilt, initMagnetic, initPointerParallax, initParallax
} from './util/motion.js';
import { initNav } from './nav.js';
import { renderHome } from './views/home.js';
import { renderEntdecken } from './views/entdecken.js';
import { renderDialektDetail } from './views/dialektDetail.js';
import { renderLernen, resetLernSession } from './views/lernen.js';
import { renderQuiz, resetQuizSession } from './views/quiz.js';
import { renderFavoriten } from './views/favoriten.js';
import { renderShare } from './views/share.js';
import { renderVergleich } from './views/vergleich.js';

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

function updateActiveNav(route) {
  const active = route === '' ? DEFAULT_ROUTE : route;
  $$('.nav-link').forEach(a => {
    a.classList.toggle('is-active', a.dataset.route === active);
  });
  // Routenwechsel für Screen Reader ansagen
  const announcer = $('#routeAnnouncer');
  if (announcer) {
    const label = ROUTE_LABELS[active] || active;
    announcer.textContent = `Bereich gewechselt: ${label}`;
  }
}

function renderRoute(app, route, segs, params) {
  switch (route) {
    case '':
    case 'home':
      return renderHome(app);
    case 'entdecken':
      return renderEntdecken(app);
    case 'dialekt':
      return renderDialektDetail(app, segs[1]);
    case 'lernen':
      return renderLernen(app, params);
    case 'quiz':
      return renderQuiz(app);
    case 'favoriten':
      return renderFavoriten(app);
    case 'share':
      return renderShare(app, segs[1]);
    case 'vergleich':
      return renderVergleich(app);
    default:
      return renderHome(app);
  }
}

function doRender(app, route, segs, params) {
  renderRoute(app, route, segs, params);
  // Wire scroll-driven reveals + counters + interactions for freshly rendered nodes.
  // Run synchronously to avoid relying on rAF (some throttled environments skip it).
  observeReveals(app);
  observeCounters(app);
  initTilt(app);
  initMagnetic(app);
  initPointerParallax(app);
  initParallax(app);
  // Nav indicator re-position after the active class shuffle.
  initNav();
}

export function router() {
  const app = $('#app');
  if (!app) return;

  const { segs, params } = parseHash();
  const route = segs[0] || DEFAULT_ROUTE;

  updateActiveNav(route);

  if (route !== 'lernen') resetLernSession();
  if (route !== 'quiz') resetQuizSession();

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Smooth route transitions where supported (Chromium-based)
  if (document.startViewTransition) {
    document.startViewTransition(() => doRender(app, route, segs, params));
  } else {
    doRender(app, route, segs, params);
  }
}

export function initRouter() {
  window.addEventListener('hashchange', router);
  router();
}
