// Smart-Recommendations: leitet aus dem Lernstand und Verlauf
// drei Bucket-Listen ab, die als "Heute lernen"-Vorschläge dienen.

import { state } from '../store/state.js';
import { ALLE_AUSDRUECKE, getDialekt } from '../../data/dialekte.js';
import { STATUS_HARD, STATUS_MEDIUM, STATUS_LEARNED } from '../store/learning.js';
import { shuffle } from './random.js';

function keyFor(a) { return `${a.dialektId}.${a.id}`; }

function annotate(a) {
  const entry = state.gelernt[keyFor(a)];
  return {
    ...a,
    stand: entry?.stand ?? 0,
    last: entry?.last ?? 0
  };
}

export function getRecommendations(limit = 6) {
  const annotated = ALLE_AUSDRUECKE.map(annotate);

  // 1. Wiederholen: Karten mit "schwer" — gewichtet nach Zeit seit letztem Versuch
  const hard = annotated
    .filter((x) => x.stand === STATUS_HARD)
    .sort((a, b) => a.last - b.last)
    .slice(0, limit);

  // 2. Fast-gelernt: "mittel"-Karten, die einen weiteren Schubs brauchen
  const almost = annotated
    .filter((x) => x.stand === STATUS_MEDIUM)
    .sort((a, b) => a.last - b.last)
    .slice(0, limit);

  // 3. Neu entdecken: nie gesehen
  const fresh = shuffle(annotated.filter((x) => x.stand === 0)).slice(0, limit);

  return { hard, almost, fresh };
}

export function getRecentDialects(limit = 4) {
  const visited = (state.visited || []).slice().reverse();
  const out = [];
  const seen = new Set();
  for (const id of visited) {
    if (seen.has(id)) continue;
    const d = getDialekt(id);
    if (!d) continue;
    seen.add(id);
    out.push(d);
    if (out.length >= limit) break;
  }
  return out;
}

// Sparkline-Punkte für die letzten N Tage Aktivität (counts).
export function getActivitySeries(days = 14) {
  const map = (state.streak && state.streak.days) || {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86_400_000);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    out.push({ date: new Date(d), count: map[key] || 0 });
  }
  return out;
}

// Punkte für die letzten N Quiz-Resultate (pct 0..100).
export function getQuizSparkline(n = 10) {
  const hist = (state.quizHistory || []).slice(-n);
  return hist.map((h) => ({
    pct: h.total > 0 ? Math.round((h.score / h.total) * 100) : 0,
    date: h.date
  }));
}
