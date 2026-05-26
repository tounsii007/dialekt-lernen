// Vergessenskurve-Visualisierung (Ebbinghaus-inspiriert).
//
// Berechnet für jede gelernte Karte eine retention-Wahrscheinlichkeit
// basierend auf SRS-Daten (Easiness-Factor, letztes Review, Intervall).
//
// Formula: R(t) = exp(-t / S),
//   wobei S = stability = interval * easiness * 0.5
//   und t = days since last review
//
// Datenquelle: state.gelernt (Key-Format: "dialektId.ausdruckId",
//   Werte enthalten last/interval/ef wie in store/srs.js definiert).
//
// API:
//   getCardRetention(srsCard) → number 0..1
//   getForgettingCurveData(srsCard, days = 30) → [{ day, retention }]
//   getOverallRetention() → average retention across all SRS cards
//   getCardsAtRisk(threshold) → Array<{ dialektId, id, retention, card }>

import { state } from '../store/state.js';

const MS_PER_DAY = 86400000;

// Akzeptiert sowohl das Storage-Format (last) als auch das hypothetische
// SRS-Worker-Format (lastReview).
function lastTs(card) {
  if (!card) return 0;
  if (card.lastReview) return new Date(card.lastReview).getTime();
  if (card.last) return Number(card.last) || 0;
  return 0;
}

export function getCardRetention(card) {
  const ts = lastTs(card);
  if (!ts) return 0;
  const daysSince = (Date.now() - ts) / MS_PER_DAY;
  const interval = Math.max(1, card.interval || 1);
  const ef = Math.max(1.3, card.ef || 2.5);
  const stability = interval * ef * 0.5;
  if (stability <= 0) return 0;
  return Math.max(0, Math.min(1, Math.exp(-daysSince / stability)));
}

/**
 * Returns retention curve for the next `days` days from now.
 * @returns {Array<{day: number, retention: number}>}
 */
export function getForgettingCurveData(card, days = 30) {
  const ts = lastTs(card);
  if (!ts) return [];
  const interval = Math.max(1, card.interval || 1);
  const ef = Math.max(1.3, card.ef || 2.5);
  const stability = interval * ef * 0.5;
  if (stability <= 0) return [];

  const out = [];
  for (let day = 0; day <= days; day++) {
    const t = (Date.now() - ts) / MS_PER_DAY + day;
    const retention = Math.max(0, Math.min(1, Math.exp(-t / stability)));
    out.push({ day, retention });
  }
  return out;
}

// Liest alle „echten" SRS-Karten aus state.gelernt
// (Records mit ef gesetzt — Legacy-Einträge ohne SRS werden gefiltert).
function readAllSrsCards() {
  const out = {};
  const gel = (state && state.gelernt) || {};
  for (const [key, v] of Object.entries(gel)) {
    if (!v || typeof v !== 'object') continue;
    // Nur Karten, für die irgendwann ein Review stattfand
    if (!v.last && !v.lastReview) continue;
    out[key] = v;
  }
  // Fallback: zusätzlich state.srs.cards (für Tests / zukünftige Worker)
  const aux = (state.srs && state.srs.cards) || {};
  for (const [k, v] of Object.entries(aux)) {
    if (!out[k]) out[k] = v;
  }
  return out;
}

/**
 * Overall retention across all SRS cards.
 */
export function getOverallRetention() {
  const cards = readAllSrsCards();
  const values = Object.values(cards).map(getCardRetention);
  if (values.length === 0) return null;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

/**
 * Cards at risk of being forgotten (retention < threshold).
 * Key-Format wird kompatibel zerlegt (Punkt oder Doppelpunkt).
 */
export function getCardsAtRisk(threshold = 0.5) {
  const cards = readAllSrsCards();
  return Object.entries(cards)
    .map(([key, card]) => {
      const sep = key.includes('.') ? '.' : ':';
      const idx = key.indexOf(sep);
      const dialektId = idx >= 0 ? key.slice(0, idx) : key;
      const id = idx >= 0 ? key.slice(idx + 1) : '';
      return { dialektId, id, retention: getCardRetention(card), card };
    })
    .filter(c => c.retention < threshold)
    .sort((a, b) => a.retention - b.retention);
}
