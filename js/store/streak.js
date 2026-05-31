// Tages-Streak: konsekutive Lerntage zählen — inkl. Schutz-Mechaniken
// (Streak-Freeze, Reparatur, Wochenend-Amulett) nach Duolingo-Vorbild.
// Alles lokal & offline; keine Käufe, Items werden durch Lernen verdient.

import { state, persist } from './state.js';

const DAY_MS = 86_400_000;

// Schutz-Parameter.
export const MAX_FREEZES = 2;        // max. gleichzeitig gehaltene Freezes
export const FREEZE_EARN_EVERY = 5;  // alle 5 Streak-Tage gibt es einen Freeze
export const MAX_REPAIRS = 1;        // max. gehaltene Reparatur-Token
export const REPAIR_EARN_EVERY = 20; // alle 20 Streak-Tage ein Reparatur-Token
export const REPAIR_WINDOW_DAYS = 2; // Reparatur nur binnen 2 Tagen nach Bruch

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

function isWeekendKey(key) {
  const day = parseKey(key).getDay(); // 0 = So, 6 = Sa
  return day === 0 || day === 6;
}

function dispatch(type, extra) {
  try {
    document.dispatchEvent(new CustomEvent('dialekto:streak', { detail: { type, ...extra } }));
  } catch {}
}

// Schutz-Felder defensiv anlegen (auch für Altzustände/Test-Resets).
function ensureProtectionDefaults() {
  const s = state.streak;
  if (typeof s.freezes !== 'number') s.freezes = 0;
  if (typeof s.repairs !== 'number') s.repairs = 0;
  // Wochenend-Amulett ist opt-in (Standard aus) — wie Duolingo ein Item,
  // das man bewusst ausrüstet.
  if (typeof s.weekendAmulet !== 'boolean') s.weekendAmulet = false;
  if (!s.frozenDays || typeof s.frozenDays !== 'object') s.frozenDays = {};
  if (typeof s.freezeMilestone !== 'number') s.freezeMilestone = 0;
  if (typeof s.repairMilestone !== 'number') s.repairMilestone = 0;
  if (s.lastBreak !== null && typeof s.lastBreak !== 'object') s.lastBreak = null;
}

// Versucht, die Lücke zwischen lastDay und heute zu überbrücken.
// Wochenend-Tage deckt (falls ausgerüstet) das Amulett gratis ab, der Rest
// kostet je einen Freeze. Nur bei vollständiger Deckung werden Freezes
// verbraucht — reicht es nicht, bricht der Streak und die Freezes bleiben.
function tryBridgeGap(lastDay, diff) {
  const missed = diff - 1;
  if (missed <= 0) return { survived: true };

  const start = parseKey(lastDay);
  const missedKeys = [];
  for (let i = 1; i <= missed; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    missedKeys.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
  }

  let weekendCovered = 0;
  const needFreeze = [];
  for (const k of missedKeys) {
    if (state.streak.weekendAmulet && isWeekendKey(k)) weekendCovered++;
    else needFreeze.push(k);
  }

  if (needFreeze.length > state.streak.freezes) {
    return { survived: false };
  }

  state.streak.freezes -= needFreeze.length;
  for (const k of missedKeys) {
    state.streak.frozenDays[k] =
      state.streak.weekendAmulet && isWeekendKey(k) ? 'amulet' : 'freeze';
  }
  return {
    survived: true,
    bridged: missedKeys.length,
    usedFreezes: needFreeze.length,
    weekendCovered,
  };
}

// Belohnungen an Streak-Meilensteinen vergeben (idempotent über *Milestone).
function grantMilestoneRewards() {
  const count = state.streak.count || 0;

  const fM = Math.floor(count / FREEZE_EARN_EVERY) * FREEZE_EARN_EVERY;
  if (fM >= FREEZE_EARN_EVERY && fM > state.streak.freezeMilestone) {
    state.streak.freezeMilestone = fM;
    if (state.streak.freezes < MAX_FREEZES) {
      state.streak.freezes += 1;
      dispatch('earned', { item: 'freeze', freezes: state.streak.freezes });
    }
  }

  const rM = Math.floor(count / REPAIR_EARN_EVERY) * REPAIR_EARN_EVERY;
  if (rM >= REPAIR_EARN_EVERY && rM > state.streak.repairMilestone) {
    state.streak.repairMilestone = rM;
    if (state.streak.repairs < MAX_REPAIRS) {
      state.streak.repairs += 1;
      dispatch('earned', { item: 'repair', repairs: state.streak.repairs });
    }
  }
}

export function registerStreak() {
  const today = todayKey();
  ensureProtectionDefaults();
  if (!state.streak.days) state.streak.days = {};

  // Veralteten Bruch (außerhalb des Reparaturfensters) verwerfen.
  if (state.streak.lastBreak && dayDiff(state.streak.lastBreak.brokenOn, today) > REPAIR_WINDOW_DAYS) {
    state.streak.lastBreak = null;
  }

  // Heute als aktiv markieren (idempotent).
  const wasActive = state.streak.days[today];
  state.streak.days[today] = (state.streak.days[today] || 0) + 1;

  if (state.streak.lastDay === today) {
    if (!wasActive) persist();
    return state.streak.count;
  }

  const diff = dayDiff(state.streak.lastDay, today);
  if (!state.streak.lastDay) {
    // Allererster aktiver Tag (oder frisch zurückgesetzt) — Serie startet bei 1.
    state.streak.count = state.streak.count || 1;
  } else if (diff === 1) {
    state.streak.count += 1;
  } else if (diff > 1) {
    const bridge = tryBridgeGap(state.streak.lastDay, diff);
    if (bridge.survived) {
      state.streak.count += 1;
      dispatch('frozen', {
        bridged: bridge.bridged,
        usedFreezes: bridge.usedFreezes,
        weekendCovered: bridge.weekendCovered,
        freezes: state.streak.freezes,
        count: state.streak.count,
      });
    } else {
      // Streak reißt — für eine mögliche Reparatur merken.
      state.streak.lastBreak = {
        prevCount: state.streak.count,
        prevLastDay: state.streak.lastDay,
        brokenOn: today,
      };
      const couldRepair = state.streak.repairs > 0;
      state.streak.count = 1;
      dispatch('broken', { prevCount: state.streak.lastBreak.prevCount, canRepair: couldRepair, repairs: state.streak.repairs });
    }
  } else {
    state.streak.count = state.streak.count || 1;
  }

  state.streak.lastDay = today;
  grantMilestoneRewards();
  persist();
  return state.streak.count;
}

export function getStreak() {
  return state.streak.count || 0;
}

// Schutz-Übersicht für die UI.
export function getStreakProtection() {
  ensureProtectionDefaults();
  return {
    count: state.streak.count || 0,
    freezes: state.streak.freezes,
    maxFreezes: MAX_FREEZES,
    repairs: state.streak.repairs,
    maxRepairs: MAX_REPAIRS,
    weekendAmulet: state.streak.weekendAmulet,
    canRepair: canRepairStreak(),
    lastBreak: state.streak.lastBreak ? { ...state.streak.lastBreak } : null,
  };
}

export function setWeekendAmulet(on) {
  ensureProtectionDefaults();
  state.streak.weekendAmulet = !!on;
  persist();
  return state.streak.weekendAmulet;
}

export function canRepairStreak(nowKey = todayKey()) {
  ensureProtectionDefaults();
  const b = state.streak.lastBreak;
  if (!b) return false;
  if (state.streak.repairs <= 0) return false;
  const since = dayDiff(b.brokenOn, nowKey);
  return since >= 0 && since <= REPAIR_WINDOW_DAYS;
}

// Gebrochenen Streak gegen ein Reparatur-Token wiederherstellen.
export function repairStreak(nowKey = todayKey()) {
  if (!canRepairStreak(nowKey)) return false;
  const b = state.streak.lastBreak;
  state.streak.repairs -= 1;
  // Vorherige Serie + den heutigen aktiven Tag fortführen.
  state.streak.count = b.prevCount + 1;
  state.streak.lastDay = nowKey;
  state.streak.lastBreak = null;
  persist();
  dispatch('repaired', { count: state.streak.count, repairs: state.streak.repairs });
  return true;
}

// Aktivität pro Tag der letzten `weeks` Wochen (Default 16), keyed YYYY-M-D.
// `frozen` markiert per Freeze/Amulett überbrückte Tage für die Heatmap.
export function getStreakHeatmap(weeks = 16) {
  const days = (state.streak && state.streak.days) || {};
  const frozen = (state.streak && state.streak.frozenDays) || {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const total = weeks * 7;
  const out = [];
  for (let i = total - 1; i >= 0; i--) {
    // Kalender-Arithmetik statt ms-Subtraktion — sonst kippt der Tag an
    // DST-Übergängen (z. B. 25h-Tag) auf das falsche Datum.
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    out.push({ date: d, key, count: days[key] || 0, frozen: frozen[key] || null });
  }
  return out;
}

// Total days the user logged in/learned (lifetime).
export function getActiveDays() {
  return Object.keys((state.streak && state.streak.days) || {}).length;
}
