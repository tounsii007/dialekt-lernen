// Dialekto · Router
// Wertet den Location-Hash aus und ruft die passende View-Render-Funktion auf.

import { $, $$, parseHash } from './util.js';
import { renderHome } from './views/home.js';
import { renderEntdecken } from './views/entdecken.js';
import { renderDialektDetail } from './views/dialektDetail.js';
import { renderLernen, resetLernSession } from './views/lernen.js';
import { renderQuiz, resetQuizSession } from './views/quiz.js';
import { renderFavoriten } from './views/favoriten.js';

const DEFAULT_ROUTE = 'home';

function updateActiveNav(route) {
  const active = route === '' ? DEFAULT_ROUTE : route;
  $$('.nav-link').forEach(a => {
    a.classList.toggle('is-active', a.dataset.route === active);
  });
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
    default:
      return renderHome(app);
  }
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

  renderRoute(app, route, segs, params);
}

export function initRouter() {
  window.addEventListener('hashchange', router);
  router();
}
