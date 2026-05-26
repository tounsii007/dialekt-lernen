// Vergessenskurve-Visualisierung (Ebbinghaus-inspiriert).
//
// Berechnet für jede gelernte Karte eine retention-Wahrscheinlichkeit
// basierend auf SRS-Daten (Easiness-Factor, letztes Review, Intervall).
//
// Formula: R(t) = exp(-t / S),
//   wobei S = stability = interval * easiness * 0.5
//   und t = days since last review
//
// API:
//   getCardRetention(srsCard) → number 0..1
//   getForgettingCurveData(srsCard, days = 30) → [{ day, retention }]
//   getOverallRetention() → average retention across all SRS cards

import { state } from '../store/state.js';

const MS_PER_DAY = 86400000;

export function getCardRetention(card) {
  if (!card || !card.lastReview) return 0;
  const daysSince = (Date.now() - new Date(card.lastReview).getTime()) / MS_PER_DAY;
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
  if (!card || !card.lastReview) return [];
  const lastReview = new Date(card.lastReview).getTime();
  const interval = Math.max(1, card.interval || 1);
  const ef = Math.max(1.3, card.ef || 2.5);
  const stability = interval * ef * 0.5;
  if (stability <= 0) return [];

  const out = [];
  for (let day = 0; day <= days; day++) {
    const t = (Date.now() - lastReview) / MS_PER_DAY + day;
    const retention = Math.max(0, Math.min(1, Math.exp(-t / stability)));
    out.push({ day, retention });
  }
  return out;
}

/**
 * Overall retention across all SRS cards.
 */
export function getOverallRetention() {
  const cards = (state.srs && state.srs.cards) || {};
  const values = Object.values(cards).map(getCardRetention);
  if (values.length === 0) return null;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

/**
 * Cards at risk of being forgotten (retention < 0.5).
 */
export function getCardsAtRisk(threshold = 0.5) {
  const cards = (state.srs && state.srs.cards) || {};
  return Object.entries(cards)
    .map(([key, card]) => {
      const [dialektId, id] = key.split(':');
      return { dialektId, id, retention: getCardRetention(card), card };
    })
    .filter(c => c.retention < threshold)
    .sort((a, b) => a.retention - b.retention);
}
