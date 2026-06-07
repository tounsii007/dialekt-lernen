// Favoriten & Statistiken · Haupt-View (Orchestrator)
//
// Schlanke Komposition thematischer Panels (analog zu views/lernen/). Jedes
// Panel liegt unter ./favoriten/ und exportiert eine reine renderXxx()-Funktion,
// die einen DOM-Knoten zurückgibt. Panels, die einen Voll-Re-Render auslösen,
// bekommen dieselbe `rerender`-Closure wie zuvor durchgereicht.

import { el } from '../util.js';
import { t } from '../util/i18n.js';
import {
  getFavoriten, getLernStats, getQuizGenauigkeit, getStreak, getQuizHistory,
  getActiveDays, getVisitedDialects,
  getChestState, getLernpfadSummary, countNotes
} from '../store.js';
import { DIALEKTE } from '../../data/dialekte.js';
import { getXp, xpToNextLevel } from '../store/xp.js';
import { getDecks } from '../store/decks.js';

import { renderXpCard } from './favoriten/xp-panel.js';
import { renderChestCard } from './favoriten/chest-panel.js';
import { renderStatsCards, renderQuizTrend } from './favoriten/stats-panel.js';
import { renderHeatmap } from './favoriten/heatmap-panel.js';
import { renderStreakProtection } from './favoriten/streak-panel.js';
import { renderAchievements } from './favoriten/achievements-panel.js';
import { renderNotificationSettings } from './favoriten/notifications-panel.js';
import { renderSpeechSettings } from './favoriten/speech-panel.js';
import { renderDataTools } from './favoriten/tools-panel.js';
import { renderSuggestionsPanel } from './favoriten/suggestions-panel.js';
import { renderFavoritenList } from './favoriten/list-panel.js';

export function renderFavoriten(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });
  const rerender = () => renderFavoriten(root);

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, t('view.favoriten.title')),
      el('div', { class: 'lede' }, t('view.favoriten.lede'))
    )
  ));

  // XP Card
  view.appendChild(renderXpCard());

  // Täglicher Belohnungs-Chest (offline verdient)
  view.appendChild(renderChestCard(rerender));

  // Stats
  const stats = getLernStats();
  const acc = getQuizGenauigkeit();
  const streak = getStreak();
  const favs = getFavoriten();
  const history = getQuizHistory();

  view.appendChild(renderStatsCards({
    gelernt: stats.gelernt,
    inArbeit: stats.inArbeit,
    acc,
    streak,
    favCount: favs.length
  }));

  // Streak heatmap — GitHub-style
  view.appendChild(renderHeatmap());

  // Streak-Schutz (Freeze/Reparatur/Wochenend-Amulett)
  view.appendChild(renderStreakProtection(rerender));

  // Achievements
  const lernpfad = getLernpfadSummary();
  const achView = renderAchievements({
    gelerntCount: stats.gelernt,
    streak,
    quizCount: history.length,
    bestQuiz: history.reduce((m, h) => Math.max(m, Math.round((h.score / h.total) * 100)), 0),
    visitedCount: getVisitedDialects().length,
    totalDialects: DIALEKTE.length,
    totalAvailable: DIALEKTE.reduce((sum, d) => sum + d.ausdruecke.length, 0),
    favCount: favs.length,
    level: xpToNextLevel(getXp()).level,
    noteCount: countNotes(),
    deckCount: getDecks().length,
    pathCompleted: lernpfad.completedUnits,
    pathTotal: lernpfad.totalUnits,
    chestStreak: getChestState().claimStreak
  });
  view.appendChild(achView);

  // Quiz-Verlauf — Sparkline + letzte Ergebnisse (nur wenn Verlauf vorhanden)
  const quizTrend = renderQuizTrend(history, acc);
  if (quizTrend) view.appendChild(quizTrend);

  // Benachrichtigungen (Tägliche Erinnerung)
  view.appendChild(renderNotificationSettings());

  // Sprachausgabe (Stimme / Tempo / Tonhöhe)
  view.appendChild(renderSpeechSettings());

  // Daten-Tools (Export/Import/Reset)
  view.appendChild(renderDataTools());

  // Korrektur-Vorschläge (lokal)
  view.appendChild(renderSuggestionsPanel(rerender));

  // Favoriten + Bulk-Aktionen
  view.appendChild(renderFavoritenList(favs, rerender));

  root.appendChild(view);
}
