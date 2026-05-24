// Barrel-Datei für den persistenten Store.
// Bestehende Imports `import { … } from './store.js'` bleiben gültig.

export { getTheme, setTheme, applyTheme, cycleTheme } from './store/theme.js';
export { isFavorit, toggleFavorit, getFavoriten } from './store/favorites.js';
export {
  setLernstand, getLernstand, getLernStats,
  STATUS_UNKNOWN, STATUS_HARD, STATUS_MEDIUM, STATUS_LEARNED
} from './store/learning.js';
export { registerStreak, getStreak, getStreakHeatmap, getActiveDays } from './store/streak.js';
export { saveQuizResult, getQuizHistory, getQuizGenauigkeit } from './store/quiz.js';
export { getDailySeed } from './store/daily.js';
export { ACHIEVEMENTS, evaluateAchievements, markDialectVisited, getVisitedDialects } from './store/achievements.js';
