// Täglicher Belohnungs-Chest (Duolingo-Style „Daily Chest"), aber komplett
// offline & ohne Käufe: einmal pro Kalendertag öffenbar, Belohnung skaliert mit
// der Anzahl aufeinanderfolgender Öffnungstage. Belohnt XP, gelegentlich einen
// Streak-Freeze — alles wird durchs tägliche Erscheinen verdient, nie gekauft.

import { state, persist } from './state.js';
import { awardXp } from './xp.js';
import { grantFreeze } from './streak.js';

const DAY_MS = 86_400_000;

// Belohnungs-Parameter.
const BASE_XP = 20;        // Sockel-XP für jede Öffnung
const PER_DAY_XP = 5;      // + pro Tag in Folge
const MAX_BONUS_DAYS = 12; // ab hier deckelt der Tages-Bonus
const FREEZE_EVERY = 3;    // jeder 3. Folgetag legt einen Freeze obendrauf
const JACKPOT_EVERY = 7;   // jeder 7. Folgetag verdoppelt die XP (Jackpot)

export const CHEST_FREEZE_EVERY = FREEZE_EVERY;
export const CHEST_JACKPOT_EVERY = JACKPOT_EVERY;

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function parseKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function dayDiff(a, b) {
  if (!a || !b) return Infinity;
  return Math.round((parseKey(b) - parseKey(a)) / DAY_MS);
}

function ensureChest() {
  if (!state.chest || typeof state.chest !== 'object') {
    state.chest = { lastDay: null, claimStreak: 0, lastReward: null, totalOpened: 0 };
    return;
  }
  const c = state.chest;
  if (typeof c.lastDay !== 'string') c.lastDay = null;
  if (typeof c.claimStreak !== 'number') c.claimStreak = 0;
  if (typeof c.totalOpened !== 'number') c.totalOpened = 0;
  if (c.lastReward !== null && typeof c.lastReward !== 'object') c.lastReward = null;
}

// Welche Folge-Tageszahl ergäbe sich, wenn man am gegebenen Tag jetzt öffnet?
function nextClaimStreak(c, dayKey) {
  if (c.lastDay === dayKey) return c.claimStreak || 0; // heute schon geöffnet
  if (c.lastDay && dayDiff(c.lastDay, dayKey) === 1) return (c.claimStreak || 0) + 1;
  return 1; // allererste Öffnung oder Lücke → zurück auf 1
}

// Belohnung als reine Funktion der Folge-Tageszahl (deterministisch, testbar).
export function previewReward(streak) {
  const jackpot = streak > 0 && streak % JACKPOT_EVERY === 0;
  let xp = BASE_XP + Math.min(streak, MAX_BONUS_DAYS) * PER_DAY_XP;
  if (jackpot) xp *= 2;
  const freeze = streak > 0 && streak % FREEZE_EVERY === 0;
  return { xp, freeze, jackpot };
}

export function getChestState(dayKey = todayKey()) {
  ensureChest();
  const c = state.chest;
  const canOpen = c.lastDay !== dayKey;
  const upcoming = nextClaimStreak(c, dayKey);
  return {
    canOpen,
    claimStreak: c.claimStreak || 0,
    upcomingStreak: upcoming,
    preview: previewReward(upcoming),
    lastReward: c.lastReward ? { ...c.lastReward } : null,
    totalOpened: c.totalOpened || 0,
  };
}

// Öffnet den Chest für den gegebenen Tag. Gibt { opened, reward } zurück.
// Bei bereits geöffnetem Tag: { opened:false, reason:'already' }.
export function openChest(dayKey = todayKey()) {
  ensureChest();
  const c = state.chest;
  if (c.lastDay === dayKey) {
    return { opened: false, reason: 'already', reward: c.lastReward ? { ...c.lastReward } : null };
  }

  const streak = nextClaimStreak(c, dayKey);
  const planned = previewReward(streak);

  awardXp(planned.xp, 'chest');
  const freezeGranted = planned.freeze ? grantFreeze() : false;

  const reward = {
    xp: planned.xp,
    freeze: freezeGranted,
    jackpot: planned.jackpot,
    claimStreak: streak,
    day: dayKey,
  };

  c.lastDay = dayKey;
  c.claimStreak = streak;
  c.lastReward = reward;
  c.totalOpened = (c.totalOpened || 0) + 1;
  persist();

  return { opened: true, reward };
}
