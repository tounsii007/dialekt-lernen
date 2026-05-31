// Lernpfad / Skill-Tree: eine geführte Reise durch alle Dialekte mit
// Duolingo-artiger Freischalt-Logik. Komplett offline & rein datengetrieben —
// es gibt keinen eigenen persistenten Zustand, der Fortschritt wird live aus
// `state.gelernt` abgeleitet. Die Reihenfolge folgt dem DIALEKTE-Register.
//
// Prinzip: Ein Dialekt gilt als „gemeistert", sobald STAGE_GOAL Ausdrücke
// gelernt sind. Der nächste Dialekt schaltet erst dann frei — so entsteht ein
// linearer Pfad mit genau einer aktiven Stufe.

import { state } from './state.js';
import { DIALEKTE } from '../../data/dialekte.js';
import { STATUS_LEARNED } from './learning.js';

// Anzahl gelernter Ausdrücke, um eine Dialekt-Stufe zu meistern.
export const STAGE_GOAL = 12;

// Gelernte (Stand >= LEARNED) Ausdrücke pro Dialekt zählen.
// Schlüssel in state.gelernt sind `${dialektId}.${ausdruckId}`; dialektId
// enthält keinen Punkt, daher splittet der erste Punkt sauber.
function learnedPerDialect() {
  const counts = {};
  const g = state.gelernt || {};
  for (const key in g) {
    const e = g[key];
    if (!e || typeof e !== 'object' || Array.isArray(e)) continue;
    if ((e.stand ?? 0) < STATUS_LEARNED) continue;
    const dot = key.indexOf('.');
    if (dot < 0) continue;
    const did = key.slice(0, dot);
    counts[did] = (counts[did] || 0) + 1;
  }
  return counts;
}

// Vollständiger Pfad: ein Knoten pro Dialekt in fester Reihenfolge.
// `unlocked` ist ein Präfix — Knoten i ist frei, wenn alle vorigen gemeistert
// sind. Dadurch existiert immer höchstens eine aktive (freie, offene) Stufe.
export function getLernpfad() {
  const counts = learnedPerDialect();
  const nodes = [];
  let prevComplete = true; // erste Stufe ist immer freigeschaltet
  for (let i = 0; i < DIALEKTE.length; i++) {
    const d = DIALEKTE[i];
    const total = d.ausdruecke.length;
    const goal = Math.min(STAGE_GOAL, total);
    const learned = Math.min(counts[d.id] || 0, total);
    const complete = learned >= goal; // goal kann 0 sein (leerer Dialekt) → frei
    const unlocked = prevComplete;
    nodes.push({
      index: i,
      id: d.id,
      name: d.name,
      flag: d.flag,
      farbe: d.farbe,
      region: d.region,
      total,
      goal,
      learned,
      complete,
      unlocked,
      // Aktive Stufe: freigeschaltet, aber noch nicht gemeistert.
      current: unlocked && !complete,
      percent: goal > 0 ? Math.min(100, Math.round((learned / goal) * 100)) : 100,
    });
    prevComplete = complete;
  }
  return nodes;
}

// Kompakt-Übersicht für Home/HUD.
export function getLernpfadSummary() {
  const nodes = getLernpfad();
  const completedUnits = nodes.filter((n) => n.complete).length;
  const unlockedUnits = nodes.filter((n) => n.unlocked).length;
  const current = nodes.find((n) => n.current) || null;
  return {
    totalUnits: nodes.length,
    completedUnits,
    unlockedUnits,
    allComplete: completedUnits === nodes.length,
    current: current
      ? { id: current.id, name: current.name, flag: current.flag, learned: current.learned, goal: current.goal, percent: current.percent }
      : null,
  };
}
