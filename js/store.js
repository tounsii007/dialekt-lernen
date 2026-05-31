// Barrel-Datei für den persistenten Store.
// Bestehende Imports `import { … } from './store.js'` bleiben gültig.

export {
  getTheme, setTheme, applyTheme, cycleTheme,
  getTypography, setTypography, applyTypography, toggleDyslexicFont
} from './store/theme.js';
export { isFavorit, toggleFavorit, getFavoriten } from './store/favorites.js';
export {
  setLernstand, getLernstand, getLernStats,
  STATUS_UNKNOWN, STATUS_HARD, STATUS_MEDIUM, STATUS_LEARNED
} from './store/learning.js';
export {
  registerStreak, getStreak, getStreakHeatmap, getActiveDays,
  getStreakProtection, setWeekendAmulet, canRepairStreak, repairStreak,
  MAX_FREEZES, MAX_REPAIRS, REPAIR_WINDOW_DAYS
} from './store/streak.js';
export { saveQuizResult, getQuizHistory, getQuizGenauigkeit } from './store/quiz.js';
export { getDailySeed } from './store/daily.js';
export { ACHIEVEMENTS, evaluateAchievements, markDialectVisited, getVisitedDialects } from './store/achievements.js';
export {
  reviewCard, getCardSrs, getDueCards, getSrsStats,
  RATING_HARD, RATING_MED, RATING_EASY
} from './store/srs.js';
export {
  exportState, exportStateAsString, downloadStateFile,
  importState, resetAllData,
  encodeQuizShare, decodeQuizShare,
  exportToCsv, downloadCsvFile
} from './store/transfer.js';
export { PRESETS, getPreset, setPreset, applyPreset } from './store/presets.js';
export { getNote, setNote, countNotes, getAllNotes } from './store/notes.js';
export { getLernpfad, getLernpfadSummary, STAGE_GOAL } from './store/skilltree.js';
