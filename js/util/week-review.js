// Wochenrückblick: aggregiert die letzten 7 Tage zu einer kompakten Übersicht.
//
// Datenquellen:
//   - state.streak.days  → Lernaktivität pro Tag
//   - state.xp.log       → XP-Quellen
//   - state.quiz.history → Quiz-Ergebnisse
//   - state.gelernt      → Karten-Lernstand
//   - state.srs.cards    → SRS-Reviews
//
// Public API:
//   getWeekReview() → { period, totals, byDay, byKategorie, topDialekte, focusSuggestions }

import { state } from '../store/state.js';
import { DIALEKT_INDEX, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { KATEGORIEN } from '../../data/kategorien.js';

const DAY_MS = 86_400_000;

function dayKey(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function germanWeekday(d) {
  return ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][d.getDay()];
}

function formatDate(d) {
  return `${d.getDate()}.${d.getMonth() + 1}.`;
}

/**
 * Build a 7-day review ending today (inclusive).
 * Optional: `days` parameter for different window (e.g. 30 for monthly).
 */
export function getWeekReview(days = 7) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const start = new Date(today.getTime() - (days - 1) * DAY_MS);
  start.setHours(0, 0, 0, 0);

  // Per-day buckets
  const byDay = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * DAY_MS);
    byDay.push({
      date: new Date(d),
      key: dayKey(d),
      label: germanWeekday(d) + ' ' + d.getDate() + '.',
      activity: 0,
      xp: 0,
      quizCorrect: 0,
      quizTotal: 0,
      cardsReviewed: 0,
    });
  }
  const dayIdx = new Map(byDay.map((d, i) => [d.key, i]));

  // Streak-Aktivität
  const streakDays = (state.streak && state.streak.days) || {};
  for (const [k, v] of Object.entries(streakDays)) {
    const i = dayIdx.get(k);
    if (i !== undefined) byDay[i].activity = v;
  }

  // XP-Log
  const xpLog = (state.xp && state.xp.log) || [];
  for (const entry of xpLog) {
    if (!entry?.ts) continue;
    const d = new Date(entry.ts);
    if (d < start || d > today) continue;
    const k = dayKey(d);
    const i = dayIdx.get(k);
    if (i !== undefined) {
      byDay[i].xp += entry.amount || 0;
    }
  }

  // Quiz-Historie
  const quizHistory = (state.quiz && state.quiz.history) || [];
  for (const r of quizHistory) {
    if (!r?.ts) continue;
    const d = new Date(r.ts);
    if (d < start || d > today) continue;
    const i = dayIdx.get(dayKey(d));
    if (i !== undefined) {
      byDay[i].quizTotal++;
      if (r.correct) byDay[i].quizCorrect++;
    }
  }

  // SRS Reviews (state.srs.cards: { 'dialekt:id': { lastReview, ... } })
  const srsCards = (state.srs && state.srs.cards) || {};
  for (const [key, card] of Object.entries(srsCards)) {
    if (!card?.lastReview) continue;
    const d = new Date(card.lastReview);
    if (d < start || d > today) continue;
    const i = dayIdx.get(dayKey(d));
    if (i !== undefined) byDay[i].cardsReviewed++;
  }

  // Totals
  const totals = byDay.reduce((acc, d) => ({
    activity:      acc.activity + d.activity,
    xp:            acc.xp + d.xp,
    quizCorrect:   acc.quizCorrect + d.quizCorrect,
    quizTotal:     acc.quizTotal + d.quizTotal,
    cardsReviewed: acc.cardsReviewed + d.cardsReviewed,
    activeDays:    acc.activeDays + (d.activity > 0 ? 1 : 0),
  }), { activity: 0, xp: 0, quizCorrect: 0, quizTotal: 0, cardsReviewed: 0, activeDays: 0 });
  totals.quizAccuracy = totals.quizTotal > 0 ? Math.round((totals.quizCorrect / totals.quizTotal) * 100) : null;

  // By Kategorie (welche Themen sind gerade aktiv?)
  const byKategorie = {};
  // Wir gehen über state.gelernt: { 'dialekt:id': { stand, lastTouched? } }
  // Stand wird hier aktuell ohne Timestamp gespeichert — also schätzen wir
  // anhand von SRS lastReview, welche Kategorien diese Woche aktiv waren.
  for (const [srsKey, card] of Object.entries(srsCards)) {
    if (!card?.lastReview) continue;
    const ts = new Date(card.lastReview);
    if (ts < start || ts > today) continue;
    const [dialektId, id] = srsKey.split(':');
    const d = DIALEKT_INDEX[dialektId];
    if (!d) continue;
    const ausdr = d.ausdruecke.find(a => a.id === id);
    if (!ausdr) continue;
    const k = ausdr.kategorie || 'sonstige';
    byKategorie[k] = (byKategorie[k] || 0) + 1;
  }

  // Top-Dialekte diese Woche
  const dialektCount = {};
  for (const [srsKey, card] of Object.entries(srsCards)) {
    if (!card?.lastReview) continue;
    const ts = new Date(card.lastReview);
    if (ts < start || ts > today) continue;
    const [dialektId] = srsKey.split(':');
    dialektCount[dialektId] = (dialektCount[dialektId] || 0) + 1;
  }
  const topDialekte = Object.entries(dialektCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => {
      const d = DIALEKT_INDEX[id];
      return { id, name: d?.name || id, flag: d?.flag || '🗣️', farbe: d?.farbe || '#888', count };
    });

  // Focus-Suggestions: schwache Kategorien (wenig gelernt) UND aktive Dialekte
  const focusSuggestions = buildFocusSuggestions(topDialekte, byKategorie);

  return {
    period: {
      start: { date: start, label: formatDate(start) },
      end:   { date: today, label: formatDate(today) },
      days,
    },
    totals,
    byDay,
    byKategorie,
    topDialekte,
    focusSuggestions,
  };
}

function buildFocusSuggestions(topDialekte, byKategorie) {
  // Schauen, welche Kategorien insgesamt viele Karten haben, aber diese Woche
  // wenig genutzt wurden → das sind gute Empfehlungen für die nächste Woche.
  const usedKats = new Set(Object.keys(byKategorie));
  const allKatStats = {};
  ALLE_AUSDRUECKE.forEach(a => {
    allKatStats[a.kategorie] = (allKatStats[a.kategorie] || 0) + 1;
  });
  // Sortiere nach „groß aber ungenutzt"
  const ranked = Object.entries(allKatStats)
    .filter(([k]) => !usedKats.has(k))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k, total]) => ({
      kategorie: k,
      label:     KATEGORIEN[k]?.label || k,
      icon:      KATEGORIEN[k]?.icon || '📚',
      total,
      reason:    'Diese Woche kaum geübt — gute Themen-Session für die nächste Woche.',
    }));
  return ranked;
}
