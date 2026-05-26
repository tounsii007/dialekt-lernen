// Adaptiver Lernplan: empfiehlt Karten basierend auf eigenen Schwächen.
//
// Heuristik (in Priorisierungs-Reihenfolge):
//   1. Karten mit niedrigem Retention-Score (drohen vergessen zu werden) → SRS-Stoff
//   2. Karten in Kategorien mit niedriger Erfolgsquote im Quiz
//   3. Karten aus Dialekten, die selten besucht wurden
//   4. Zufällig: noch nie gesehene Karten in derselben Kategorie
//
// Output: bis zu N empfohlene Karten mit Begründung.

import { ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { state } from '../store/state.js';
import { getCardsAtRisk, getCardRetention } from './forgetting-curve.js';

/**
 * @param {number} limit
 * @returns {Array<{entry, reason, priority}>}
 */
export function getAdaptiveRecommendations(limit = 10) {
  const recs = [];
  const seen = new Set();

  // 1) At-Risk Cards
  const atRisk = getCardsAtRisk(0.6).slice(0, Math.floor(limit * 0.4));
  for (const r of atRisk) {
    const ausdr = ALLE_AUSDRUECKE.find(a => a.dialektId === r.dialektId && a.id === r.id);
    if (!ausdr) continue;
    const key = `${r.dialektId}:${r.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    recs.push({
      entry: ausdr,
      reason: `Drohende Vergessenskurve — Retention ${Math.round(r.retention * 100)}%`,
      priority: 1,
    });
  }

  // 2) Weak Kategorien (basierend auf Quiz-Historie)
  const quizHistory = (state.quiz && state.quiz.history) || [];
  const katStats = {};
  for (const h of quizHistory) {
    if (!h?.itemRef) continue;
    const [dialektId, id] = h.itemRef.split(':');
    const ausdr = ALLE_AUSDRUECKE.find(a => a.dialektId === dialektId && a.id === id);
    if (!ausdr) continue;
    const k = ausdr.kategorie;
    katStats[k] = katStats[k] || { correct: 0, total: 0 };
    katStats[k].total++;
    if (h.correct) katStats[k].correct++;
  }
  const weakKats = Object.entries(katStats)
    .filter(([, s]) => s.total >= 3 && s.correct / s.total < 0.6)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
    .map(([k]) => k);

  for (const k of weakKats.slice(0, 2)) {
    const candidates = ALLE_AUSDRUECKE
      .filter(a => a.kategorie === k && !seen.has(`${a.dialektId}:${a.id}`))
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    for (const c of candidates) {
      seen.add(`${c.dialektId}:${c.id}`);
      recs.push({
        entry: c,
        reason: `Schwache Kategorie „${c.kategorie}" — Quiz-Trefferquote unter 60%`,
        priority: 2,
      });
    }
  }

  // 3) Selten besuchte Dialekte
  const visited = (state.visitedDialects) || {};
  const allDialektIds = [...new Set(ALLE_AUSDRUECKE.map(a => a.dialektId))];
  const rareDialekte = allDialektIds
    .filter(d => (visited[d] || 0) < 2)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  for (const d of rareDialekte) {
    const candidates = ALLE_AUSDRUECKE
      .filter(a => a.dialektId === d && !seen.has(`${a.dialektId}:${a.id}`))
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    for (const c of candidates) {
      seen.add(`${c.dialektId}:${c.id}`);
      recs.push({
        entry: c,
        reason: `Dialekt „${c.dialektName || c.dialektId}" wenig besucht — Zeit für was Neues`,
        priority: 3,
      });
    }
  }

  // 4) Bis Limit auffüllen mit zufälligen Karten
  while (recs.length < limit) {
    const c = ALLE_AUSDRUECKE[Math.floor(Math.random() * ALLE_AUSDRUECKE.length)];
    const key = `${c.dialektId}:${c.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    recs.push({ entry: c, reason: 'Auffrischung', priority: 4 });
  }

  return recs.slice(0, limit);
}
