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

  // 2) Weak Kategorien — Heuristik über state.gelernt (Lapses & Stand).
  //    Karten mit vielen Lapses oder Stand=HARD signalisieren schwache Kategorien.
  const katStats = {};
  for (const a of ALLE_AUSDRUECKE) {
    const key = `${a.dialektId}.${a.id}`;
    const entry = (state.gelernt || {})[key];
    if (!entry) continue;
    const k = a.kategorie;
    katStats[k] = katStats[k] || { reviewed: 0, struggled: 0 };
    katStats[k].reviewed++;
    const lapses = entry.lapses || 0;
    const stand = entry.stand || 0;
    if (lapses >= 2 || stand === 1) katStats[k].struggled++;
  }
  const weakKats = Object.entries(katStats)
    .filter(([, s]) => s.reviewed >= 3 && s.struggled / s.reviewed >= 0.4)
    .sort((a, b) => (b[1].struggled / b[1].reviewed) - (a[1].struggled / a[1].reviewed))
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
        reason: `Schwache Kategorie „${c.kategorie}" — viele Patzer/Lapses`,
        priority: 2,
      });
    }
  }

  // 3) Selten besuchte Dialekte. state.visited ist ein Array von Dialekt-IDs
  //    (Reihenfolge = Besuchsreihenfolge). Wir zählen Vorkommen.
  const visitedArr = Array.isArray(state.visited) ? state.visited : [];
  const visitedCount = visitedArr.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});
  const allDialektIds = [...new Set(ALLE_AUSDRUECKE.map(a => a.dialektId))];
  const rareDialekte = allDialektIds
    .filter(d => (visitedCount[d] || 0) < 2)
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
  let guard = 0;
  while (recs.length < limit && guard++ < limit * 8) {
    const c = ALLE_AUSDRUECKE[Math.floor(Math.random() * ALLE_AUSDRUECKE.length)];
    if (!c) break;
    const key = `${c.dialektId}:${c.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    recs.push({ entry: c, reason: 'Auffrischung', priority: 4 });
  }

  return recs.slice(0, limit);
}
