// Quiz-Historie und Genauigkeitsstatistik.

import { state, persist } from './state.js';

const MAX_HISTORY = 50;

export function saveQuizResult(score, total, dialektId) {
  const safeScore = Math.max(0, Number(score) || 0);
  const safeTotal = Math.max(0, Number(total) || 0);

  state.quizHistory.push({
    score: safeScore,
    total: safeTotal,
    dialektId,
    date: Date.now()
  });
  if (state.quizHistory.length > MAX_HISTORY) {
    state.quizHistory.splice(0, state.quizHistory.length - MAX_HISTORY);
  }

  state.lernStats.total   += safeTotal;
  state.lernStats.korrekt += safeScore;
  persist();
}

export function getQuizHistory() {
  return state.quizHistory.slice().reverse();
}

export function getQuizGenauigkeit() {
  if (!state.lernStats.total) return 0;
  return Math.round((state.lernStats.korrekt / state.lernStats.total) * 100);
}
