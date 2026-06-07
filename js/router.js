// Dialekto · Router
// Alle Views werden statisch (eager) importiert und direkt gerendert — KEIN
// Lazy-Loading. Jede Ansicht ist sofort vollständig verfügbar.

import { $, $$, parseHash, initLinkInterception, ROUTE_EVENT } from './util.js';
// Routen-Labels stammen aus der Single-Source-Registry in route.js.
import { ROUTE_LABELS } from './util/route.js';
import {
  observeReveals, observeCounters,
  initTilt, initMagnetic, initParallax
} from './util/motion.js';
import { initNav, syncMobileNav } from './nav.js';
import { attachPullToRefresh } from './util/pull-to-refresh.js';
import { maybeShowTip } from './util/progressive-disclosure.js';
import { applyI18nToDom } from './util/i18n.js';
import { state } from './store/state.js';

// Alle Views statisch importiert (eager) — kein dynamic import(), kein Skeleton.
import { renderHome } from './views/home.js';
import { renderEntdecken } from './views/entdecken.js';
import { renderDialektDetail } from './views/dialektDetail.js';
import { renderFavoriten } from './views/favoriten.js';
import { renderKarte } from './views/karte.js';
import { renderStatistiken } from './views/statistiken.js';
import { renderLernen, resetLernSession } from './views/lernen.js';
import { renderQuiz, resetQuizSession } from './views/quiz.js';
import { renderVergleich } from './views/vergleich.js';
import { renderDecks } from './views/decks.js';
import { renderShare } from './views/share.js';
import { renderSpiele } from './views/spiele.js';
import { renderSammlung } from './views/sammlung.js';
import { renderIdiome } from './views/idiome.js';
import { renderLektionen } from './views/lektionen.js';
import { renderLiga } from './views/liga.js';
import { renderLernpfad } from './views/lernpfad.js';
import { renderShadowing } from './views/shadowing.js';
import { renderKlangpaare } from './views/klangpaare.js';

const DEFAULT_ROUTE = 'home';

// Letzte gerenderte Route — um Fokus-Handover nur bei echtem View-Wechsel
// (nicht bei In-View-Re-Renders/Pull-to-Refresh derselben Route) auszulösen.
let lastRenderedRoute = null;

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

// Synchroner Dispatch auf die passende View-Render-Funktion. Alle Views sind
// statisch importiert, daher kein await/Skeleton nötig.
function renderRoute(app, route, segs, params) {
  switch (route) {
    case '':
    case 'home':        return renderHome(app, params);
    case 'entdecken':   return renderEntdecken(app);
    case 'dialekt':     return renderDialektDetail(app, segs[1]);
    case 'favoriten':   return renderFavoriten(app);
    case 'karte':       return renderKarte(app);
    case 'statistiken': return renderStatistiken(app);
    case 'lernen':      return renderLernen(app, params);
    case 'quiz':        return renderQuiz(app);
    case 'vergleich':   return renderVergleich(app);
    case 'share':       return renderShare(app, segs[1]);
    case 'decks':       return renderDecks(app);
    case 'spiele':      return renderSpiele(app);
    case 'sammlung':    return renderSammlung(app);
    case 'idiome':      return renderIdiome(app, params);
    case 'lektionen':   return renderLektionen(app, params);
    case 'liga':        return renderLiga(app);
    case 'lernpfad':    return renderLernpfad(app);
    case 'shadowing':   return renderShadowing(app, params);
    case 'klangpaare':  return renderKlangpaare(app, params);
    default:            return renderHome(app);
  }
}

function doRender(app, route, segs, params, focusContent = false) {
  app.setAttribute('aria-busy', 'true');
  renderRoute(app, route, segs, params);
  applyI18nToDom(app);   // [data-i18n]-markierte Strings der View übersetzen
  observeReveals(app);
  observeCounters(app);
  initTilt(app);
  initMagnetic(app);
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

export function router() {
  const app = $('#app');
  if (!app) return;

  const { segs, params } = parseHash();
  const route = segs[0] || DEFAULT_ROUTE;

  updateActiveNav(route);

  if (route !== 'lernen') resetLernSession();
  if (route !== 'quiz')   resetQuizSession();

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
}
