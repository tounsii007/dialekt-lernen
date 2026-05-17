// Lokaler Persistenz-Store für Theme, Favoriten, Lernfortschritt, Streak

const KEY = 'dialekto.v1';

function loadAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

const state = loadAll();

// Defaults
state.theme       = state.theme       || 'auto';   // 'light' | 'dark' | 'auto'
state.favoriten   = state.favoriten   || [];        // [{ dialektId, ausdruckId }]
state.gelernt     = state.gelernt     || {};        // { 'dialektId.ausdruckId': { stand: 0..3, last: timestamp } }
state.streak      = state.streak      || { count: 0, lastDay: null };
state.quizHistory = state.quizHistory || [];        // [{ score, total, date }]
state.lernStats   = state.lernStats   || { total: 0, korrekt: 0 };

function persist() { saveAll(state); }

// --- Theme ---
export function getTheme() { return state.theme; }
export function setTheme(t) { state.theme = t; persist(); applyTheme(); }
export function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}
export function cycleTheme() {
  const next = state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'auto' : 'light';
  setTheme(next);
  return next;
}

// --- Favoriten ---
function favKey(d, a) { return `${d}.${a}`; }
export function isFavorit(dialektId, ausdruckId) {
  return state.favoriten.includes(favKey(dialektId, ausdruckId));
}
export function toggleFavorit(dialektId, ausdruckId) {
  const k = favKey(dialektId, ausdruckId);
  const i = state.favoriten.indexOf(k);
  if (i >= 0) state.favoriten.splice(i, 1);
  else state.favoriten.push(k);
  persist();
  return i < 0;
}
export function getFavoriten() {
  return state.favoriten.map(k => {
    const [dialektId, ausdruckId] = k.split('.');
    return { dialektId, ausdruckId };
  });
}

// --- Lernfortschritt ---
// stand: 0 = unbekannt, 1 = schwer, 2 = mittel, 3 = leicht/gelernt
export function setLernstand(dialektId, ausdruckId, stand) {
  state.gelernt[favKey(dialektId, ausdruckId)] = { stand, last: Date.now() };
  persist();
  registerStreak();
}
export function getLernstand(dialektId, ausdruckId) {
  return state.gelernt[favKey(dialektId, ausdruckId)]?.stand ?? 0;
}
export function getLernStats() {
  const entries = Object.values(state.gelernt);
  const gelernt = entries.filter(e => e.stand >= 3).length;
  const inArbeit = entries.filter(e => e.stand > 0 && e.stand < 3).length;
  return { gelernt, inArbeit, gesamt: entries.length };
}

// --- Streak ---
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function dayDiff(a, b) {
  if (!a || !b) return Infinity;
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  return Math.round((new Date(by, bm - 1, bd) - new Date(ay, am - 1, ad)) / 86400000);
}
export function registerStreak() {
  const today = todayKey();
  if (state.streak.lastDay === today) return state.streak.count;
  const diff = dayDiff(state.streak.lastDay, today);
  if (diff === 1) state.streak.count += 1;
  else if (diff > 1) state.streak.count = 1;
  else state.streak.count = state.streak.count || 1;
  state.streak.lastDay = today;
  persist();
  return state.streak.count;
}
export function getStreak() { return state.streak.count || 0; }

// --- Quiz ---
export function saveQuizResult(score, total, dialektId) {
  state.quizHistory.push({ score, total, dialektId, date: Date.now() });
  if (state.quizHistory.length > 50) state.quizHistory.shift();
  state.lernStats.total += total;
  state.lernStats.korrekt += score;
  persist();
}
export function getQuizHistory() { return state.quizHistory.slice().reverse(); }
export function getQuizGenauigkeit() {
  if (state.lernStats.total === 0) return 0;
  return Math.round((state.lernStats.korrekt / state.lernStats.total) * 100);
}

// --- Daily expression ---
export function getDailySeed() {
  const d = new Date();
  return d.getFullYear() * 1000 + (d.getMonth() + 1) * 50 + d.getDate();
}
