// Heatmap nach Tageszeit & Wochentag — analysiert, wann der Nutzer am besten lernt.
//
// Datenquelle: state.xp.log (jeder Eintrag hat ts: timestamp)
// Output: 7×24 Matrix mit Aktivitäts-Counts (Wochentag × Stunde)

import { state } from '../store/state.js';

/**
 * @returns {{ matrix: number[][], maxCount: number, bestHour: number, bestDay: number }}
 */
export function getTimeHeatmap(rangeDays = 90) {
  const matrix = Array.from({ length: 7 }, () => new Array(24).fill(0));
  const cutoff = Date.now() - rangeDays * 86400000;

  const log = (state.xp && state.xp.log) || [];
  for (const entry of log) {
    if (!entry?.ts || entry.ts < cutoff) continue;
    const d = new Date(entry.ts);
    const day = d.getDay(); // 0=Sun
    const hour = d.getHours();
    matrix[day][hour]++;
  }

  // Auch SRS-Reviews einbeziehen, da die oft mehr Daten haben.
  // Echtes Storage liegt in state.gelernt (Feld `last`); state.srs.cards ist
  // ein optionaler Worker-Cache mit `lastReview`. Beide werden unterstützt.
  const sources = [
    (state.srs && state.srs.cards) || {},
    state.gelernt || {},
  ];
  for (const src of sources) {
    for (const card of Object.values(src)) {
      const ts = card?.lastReview
        ? new Date(card.lastReview).getTime()
        : (Number(card?.last) || 0);
      if (!ts || ts < cutoff) continue;
      const d = new Date(ts);
      matrix[d.getDay()][d.getHours()]++;
    }
  }

  // Finde Maximum + bester Slot
  let maxCount = 0, bestHour = -1, bestDay = -1;
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      if (matrix[day][hour] > maxCount) {
        maxCount = matrix[day][hour];
        bestDay = day;
        bestHour = hour;
      }
    }
  }

  return { matrix, maxCount, bestHour, bestDay };
}

export function dayName(d) {
  return ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][d];
}

export function hourLabel(h) {
  return String(h).padStart(2, '0') + ':00';
}

/**
 * Best learning slot as text — e.g. „Mo abends, 19:00 Uhr".
 */
export function describeBestSlot(bestHour, bestDay) {
  if (bestHour < 0 || bestDay < 0) return null;
  const tageszeit =
    bestHour < 6  ? 'früh morgens' :
    bestHour < 12 ? 'morgens' :
    bestHour < 14 ? 'mittags' :
    bestHour < 18 ? 'nachmittags' :
    bestHour < 22 ? 'abends' :
                    'spät abends';
  return `${dayName(bestDay)} ${tageszeit}, ${hourLabel(bestHour)}`;
}
