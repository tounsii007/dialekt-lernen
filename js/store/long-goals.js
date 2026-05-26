// Langfristige Lernziele — anders als das tägliche goals.js.
// Beispiele:
//   „Bis 31.12.2026: 200 hessische Ausdrücke gelernt"
//   „Bis 30.06.2026: alle Kategorien angefasst"
//
// Schema eines Ziels:
//   {
//     id:       'goal-1700000000',   // intern, falls nicht angegeben
//     label:    'Bis 31.12.: 200 hessische Ausdrücke',
//     deadline: '2026-12-31',         // YYYY-MM-DD, optional
//     target:   200,
//     scope:    { dialektId?: string, kategorie?: string }  // optional, defaults: any
//     createdAt: 1700000000000
//   }
//
// Fortschritt wird aus state.gelernt errechnet (alle Ausdrücke mit stand>=3,
// die zum scope passen). Persistiert als state.longGoals = [].

import { state, persist } from './state.js';
import { ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { STATUS_LEARNED } from './learning.js';

function ensureGoalsState() {
  if (!Array.isArray(state.longGoals)) state.longGoals = [];
}

function uid() {
  return 'lg-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function sanitize(goal) {
  return {
    id:        typeof goal.id === 'string' && goal.id ? goal.id : uid(),
    label:     String(goal.label || '').slice(0, 120).trim() || 'Lernziel',
    deadline:  goal.deadline ? String(goal.deadline).slice(0, 10) : null,
    target:    Math.max(1, Math.round(Number(goal.target) || 1)),
    scope:     goal.scope && typeof goal.scope === 'object' ? {
      dialektId: typeof goal.scope.dialektId === 'string' ? goal.scope.dialektId : null,
      kategorie: typeof goal.scope.kategorie === 'string' ? goal.scope.kategorie : null
    } : { dialektId: null, kategorie: null },
    createdAt: typeof goal.createdAt === 'number' ? goal.createdAt : Date.now()
  };
}

export function addLongGoal(goal) {
  ensureGoalsState();
  const clean = sanitize(goal || {});
  state.longGoals.push(clean);
  persist();
  return clean;
}

export function removeLongGoal(id) {
  ensureGoalsState();
  const before = state.longGoals.length;
  state.longGoals = state.longGoals.filter(g => g.id !== id);
  if (state.longGoals.length !== before) persist();
  return state.longGoals.length !== before;
}

function matchesScope(scope, card) {
  if (!scope) return true;
  if (scope.dialektId && card.dialektId !== scope.dialektId) return false;
  if (scope.kategorie && card.kategorie !== scope.kategorie) return false;
  return true;
}

// Wie viele Ausdrücke sind „gelernt" (stand >= LEARNED) UND passen zum scope.
function currentForScope(scope) {
  const gelernt = state.gelernt || {};
  let n = 0;
  for (const card of ALLE_AUSDRUECKE) {
    if (!matchesScope(scope, card)) continue;
    const key = `${card.dialektId}.${card.id}`;
    const e = gelernt[key];
    if (e && (e.stand ?? 0) >= STATUS_LEARNED) n += 1;
  }
  return n;
}

function decorate(goal) {
  const current = currentForScope(goal.scope);
  const progress = goal.target > 0 ? Math.min(1, current / goal.target) : 0;
  let daysLeft = null;
  if (goal.deadline) {
    const [y, m, d] = goal.deadline.split('-').map(Number);
    if (y && m && d) {
      const due = new Date(y, m - 1, d).getTime();
      daysLeft = Math.ceil((due - Date.now()) / 86_400_000);
    }
  }
  return {
    ...goal,
    current,
    progress,
    daysLeft,
    done: current >= goal.target
  };
}

export function getLongGoals() {
  ensureGoalsState();
  return state.longGoals.map(decorate);
}

// Aktualisiert nichts in state — gibt nur die ausgewerteten Ziele zurück.
// Eigentlich Alias für getLongGoals(), aber semantisch dokumentiert.
export function evaluateLongGoals() {
  return getLongGoals();
}

// Convenience für die UI: was sind sinnvolle Scopes? (Liste der Dialekte/
// Kategorien wird vom Caller aus DIALEKTE/KATEGORIEN bezogen.)
export function clearLongGoals() {
  ensureGoalsState();
  if (state.longGoals.length === 0) return;
  state.longGoals = [];
  persist();
}
