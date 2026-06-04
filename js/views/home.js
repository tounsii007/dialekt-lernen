// Startseite (Default-/Startseite, eager geladen) · schlanker Orchestrator.
//
// Komponiert die thematischen Sub-Panels aus ./home/ in genau der bisherigen
// Reihenfolge. Jeder Abschnitt lebt in einer eigenen Datei (Vorbild: ./lernen/),
// damit diese „Kitchen-Sink"-View wartbar bleibt. Reiner Struktur-Split:
// optisch und funktional identisch zum Monolithen.
//
// Render-Strategie (unverändert): Hero + Dashboard rendern sofort (kritisch für
// den ersten Eindruck); die nicht-kritischen Gamification-Sektionen werden
// gestaffelt nach dem ersten Paint via setTimeout nachgereicht (kein Long-Task,
// zuverlässig auch in Hintergrund-Tabs — anders als requestIdleCallback). Die
// animierten Hero-Timer kapselt ./home/hero.js und stoppt sie selbst beim
// View-Wechsel.

import { el } from '../util.js';
import { ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { getStreak, getLernStats } from '../store.js';
import { getCurrentSeason } from '../util/season.js';

import { renderSeasonBanner } from './home/season-banner.js';
import { renderHero } from './home/hero.js';
import { renderDashboard } from './home/dashboard.js';
import { renderAdaptiveRecommendationsSection } from './home/adaptive.js';
import { renderLeagueSection } from './home/league.js';
import { renderQuestsSection } from './home/quests.js';
import { renderChallengesSection } from './home/challenges.js';
import { renderLongGoalsSection } from './home/long-goals.js';
import { renderDailyExpression } from './home/daily-expression.js';
import { renderDialektFakt } from './home/fakt.js';
import { renderDialektGrid } from './home/dialekt-grid.js';
import { renderFeatures } from './home/features.js';

export function renderHome(root, params = {}) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  const stats = getLernStats();
  const streak = getStreak();
  const totalExpr = ALLE_AUSDRUECKE.length;
  const dailyFocus = !!(params && (params.daily === '1' || params.daily === 1 || params.daily === true));

  // Seasonal banner — wenn aktuell eine Saison läuft, ganz oben einblenden.
  const seasonId = getCurrentSeason();
  if (seasonId) {
    view.appendChild(renderSeasonBanner(seasonId));
  }

  // Hero — Eyebrow zufällig; Überschrift & Beschreibung rotieren live (Timer
  // gekapselt in ./home/hero.js, Selbst-Stopp beim View-Wechsel).
  view.appendChild(renderHero({ stats, streak, totalExpr }));

  // Personal dashboard — "Heute lernen" + Recent + Activity (kritisch, sofort)
  const dash = renderDashboard();
  if (dash) view.appendChild(dash);

  // Non-kritische Sektionen — gestaffelt nach dem ersten Paint nachrendern.
  const placeholders = {
    reco: el('div', { class: 'home-section-placeholder' }),
    league: el('div', { class: 'home-section-placeholder' }),
    quests: el('div', { class: 'home-section-placeholder' }),
    challenges: el('div', { class: 'home-section-placeholder' }),
    longGoals: el('div', { class: 'home-section-placeholder' }),
  };
  view.appendChild(placeholders.reco);
  view.appendChild(placeholders.league);
  view.appendChild(placeholders.quests);
  view.appendChild(placeholders.challenges);
  view.appendChild(placeholders.longGoals);

  // Gestaffelt nach dem ersten Paint nachrendern. Bewusst setTimeout statt
  // requestIdleCallback: letzteres feuert in versteckten/Hintergrund-Tabs gar
  // nicht (auch nicht mit { timeout }), wodurch diese Sektionen dort nie
  // erschienen. setTimeout feuert zuverlässig und hält den Initial-Render
  // trotzdem frei (eigene Tasks nach dem Paint). Jeder Callback ist isoliert,
  // damit ein Fehler in einer Sektion die übrigen nicht verhindert.
  const after = (i, cb) => setTimeout(() => { try { cb(); } catch {} }, 60 + i * 40);
  after(0, () => {
    const recoSection = renderAdaptiveRecommendationsSection();
    if (recoSection) placeholders.reco.replaceWith(recoSection);
    else placeholders.reco.remove();
  });
  after(1, () => placeholders.league.replaceWith(renderLeagueSection()));
  after(2, () => placeholders.quests.replaceWith(renderQuestsSection()));
  after(3, () => placeholders.challenges.replaceWith(renderChallengesSection()));
  after(4, () => placeholders.longGoals.replaceWith(renderLongGoalsSection()));

  // Daily expression (inkl. Fokus-Scroll/-Highlight bei daily=1 — in der Sektion)
  view.appendChild(renderDailyExpression(dailyFocus));

  // „Wusstest du?" — rotierender Dialekt-Fakt
  view.appendChild(renderDialektFakt());

  // Dialekt grid
  view.appendChild(renderDialektGrid());

  // Features section — animated stroke icons
  view.appendChild(renderFeatures());

  root.appendChild(view);
}
