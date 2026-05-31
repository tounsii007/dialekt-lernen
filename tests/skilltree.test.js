// Lernpfad / Skill-Tree — reines, deterministisches Modul: leitet einen linearen
// Freischalt-Pfad durch die 24 Dialekte aus state.gelernt ab. Kein persistenter
// Eigenzustand → wir setzen state.gelernt direkt und prüfen die Ableitung.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { DIALEKTE } from '../data/dialekte.js';
import { STATUS_HARD, STATUS_MEDIUM, STATUS_LEARNED } from '../js/store/learning.js';
import { resetState } from './_setup.js';
import { getLernpfad, getLernpfadSummary, STAGE_GOAL } from '../js/store/skilltree.js';

// Markiert n Ausdrücke eines Dialekts mit gegebenem Stand (default: gelernt).
function learn(dialektId, n, stand = STATUS_LEARNED) {
  for (let i = 0; i < n; i++) {
    state.gelernt[`${dialektId}.syn${i}`] = { stand };
  }
}

// Meistert die ersten k Dialekte komplett (STAGE_GOAL gelernte Ausdrücke je Dialekt).
function masterFirst(k) {
  for (let i = 0; i < k; i++) learn(DIALEKTE[i].id, STAGE_GOAL);
}

beforeEach(() => resetState());

describe('getLernpfad — Struktur', () => {
  it('liefert genau einen Knoten je Dialekt in DIALEKTE-Reihenfolge', () => {
    const nodes = getLernpfad();
    assert.equal(nodes.length, DIALEKTE.length);
    nodes.forEach((n, i) => {
      assert.equal(n.id, DIALEKTE[i].id);
      assert.equal(n.index, i);
      assert.equal(n.name, DIALEKTE[i].name);
    });
  });

  it('goal ist min(STAGE_GOAL, gesamt) je Dialekt', () => {
    const nodes = getLernpfad();
    nodes.forEach((n, i) => {
      assert.equal(n.goal, Math.min(STAGE_GOAL, DIALEKTE[i].ausdruecke.length));
    });
  });
});

describe('getLernpfad — Freischalt-Kette', () => {
  it('ohne Fortschritt: nur der erste Knoten ist frei und aktiv', () => {
    const nodes = getLernpfad();
    assert.equal(nodes[0].unlocked, true);
    assert.equal(nodes[0].current, true);
    assert.equal(nodes[0].complete, false);
    for (let i = 1; i < nodes.length; i++) {
      assert.equal(nodes[i].unlocked, false, `Knoten ${i} darf nicht frei sein`);
      assert.equal(nodes[i].current, false);
    }
  });

  it('Meistern des ersten Dialekts schaltet den zweiten frei', () => {
    masterFirst(1);
    const nodes = getLernpfad();
    assert.equal(nodes[0].complete, true);
    assert.equal(nodes[0].current, false, 'gemeisterter Knoten ist nicht mehr aktiv');
    assert.equal(nodes[1].unlocked, true);
    assert.equal(nodes[1].current, true);
    assert.equal(nodes[2].unlocked, false);
  });

  it('Knoten i ist frei genau dann, wenn Knoten i-1 gemeistert ist', () => {
    masterFirst(3);
    const nodes = getLernpfad();
    for (let i = 0; i < nodes.length; i++) {
      const expectedUnlocked = i === 0 ? true : nodes[i - 1].complete;
      assert.equal(nodes[i].unlocked, expectedUnlocked, `Knoten ${i} unlocked-Erwartung`);
    }
    // Erste 3 gemeistert → Knoten 3 ist frei + aktiv, Knoten 4 gesperrt.
    assert.equal(nodes[3].unlocked, true);
    assert.equal(nodes[3].current, true);
    assert.equal(nodes[4].unlocked, false);
  });

  it('es gibt höchstens genau einen aktiven Knoten', () => {
    masterFirst(5);
    const current = getLernpfad().filter((n) => n.current);
    assert.equal(current.length, 1);
    assert.equal(current[0].index, 5);
  });

  it('alles gemeistert: kein aktiver Knoten mehr', () => {
    masterFirst(DIALEKTE.length);
    const nodes = getLernpfad();
    assert.equal(nodes.every((n) => n.complete), true);
    assert.equal(nodes.every((n) => n.unlocked), true);
    assert.equal(nodes.some((n) => n.current), false);
  });
});

describe('getLernpfad — Zählung pro Dialekt', () => {
  it('nur STATUS_LEARNED zählt für den Fortschritt', () => {
    learn(DIALEKTE[0].id, 4, STATUS_HARD);
    learn(DIALEKTE[0].id, 3, STATUS_MEDIUM); // überschreibt syn0..2 mit MEDIUM
    const nodes = getLernpfad();
    assert.equal(nodes[0].learned, 0, 'HARD/MEDIUM dürfen nicht als gelernt zählen');
    assert.equal(nodes[0].complete, false);
  });

  it('zählt gelernte Ausdrücke korrekt; complete sobald goal erreicht', () => {
    learn(DIALEKTE[0].id, 5);
    assert.equal(getLernpfad()[0].learned, 5);
    assert.equal(getLernpfad()[0].complete, false);

    // learned ist die echte Anzahl (bei gesamt gedeckelt), nicht bei goal —
    // complete kippt, sobald goal erreicht ist.
    learn(DIALEKTE[0].id, STAGE_GOAL + 50);
    const n0 = getLernpfad()[0];
    assert.equal(n0.learned, STAGE_GOAL + 50, 'learned spiegelt die echte Anzahl');
    assert.ok(n0.learned <= n0.total, 'learned wird bei gesamt gedeckelt');
    assert.equal(n0.complete, true);
  });

  it('ignoriert korrupte Einträge und Schlüssel ohne Punkt', () => {
    state.gelernt['kaputt'] = { stand: STATUS_LEARNED }; // kein Punkt → kein Dialekt
    state.gelernt[`${DIALEKTE[0].id}.x`] = null;
    state.gelernt[`${DIALEKTE[0].id}.y`] = [STATUS_LEARNED];
    state.gelernt[`${DIALEKTE[0].id}.z`] = 'gelernt';
    const nodes = getLernpfad();
    assert.equal(nodes[0].learned, 0);
  });

  it('Fortschritt eines Dialekts beeinflusst andere nicht', () => {
    learn(DIALEKTE[1].id, STAGE_GOAL); // zweiter Dialekt voll, erster leer
    const nodes = getLernpfad();
    assert.equal(nodes[0].learned, 0);
    assert.equal(nodes[1].learned, STAGE_GOAL);
    // Knoten 1 ist zwar gemeistert, aber gesperrt (Knoten 0 noch offen).
    assert.equal(nodes[1].complete, true);
    assert.equal(nodes[1].unlocked, false);
  });
});

describe('getLernpfad — percent', () => {
  it('0 ohne Fortschritt, gerundet, bei 100 gedeckelt', () => {
    assert.equal(getLernpfad()[0].percent, 0);

    learn(DIALEKTE[0].id, Math.ceil(STAGE_GOAL / 2));
    const half = getLernpfad()[0].percent;
    assert.ok(half > 0 && half <= 100);

    learn(DIALEKTE[0].id, STAGE_GOAL + 99);
    assert.equal(getLernpfad()[0].percent, 100);
  });
});

describe('getLernpfadSummary', () => {
  it('Defaults ohne Fortschritt', () => {
    const s = getLernpfadSummary();
    assert.equal(s.totalUnits, DIALEKTE.length);
    assert.equal(s.completedUnits, 0);
    assert.equal(s.unlockedUnits, 1, 'nur der erste Dialekt ist frei');
    assert.equal(s.allComplete, false);
    assert.ok(s.current, 'es gibt einen aktuellen Knoten');
    assert.equal(s.current.id, DIALEKTE[0].id);
    assert.equal(s.current.goal, Math.min(STAGE_GOAL, DIALEKTE[0].ausdruecke.length));
  });

  it('spiegelt Teilfortschritt wider', () => {
    masterFirst(3);
    const s = getLernpfadSummary();
    assert.equal(s.completedUnits, 3);
    assert.equal(s.unlockedUnits, 4, '3 gemeistert + 1 neu freigeschaltet');
    assert.equal(s.allComplete, false);
    assert.equal(s.current.id, DIALEKTE[3].id);
  });

  it('allComplete + current=null, wenn alles gemeistert', () => {
    masterFirst(DIALEKTE.length);
    const s = getLernpfadSummary();
    assert.equal(s.completedUnits, DIALEKTE.length);
    assert.equal(s.unlockedUnits, DIALEKTE.length);
    assert.equal(s.allComplete, true);
    assert.equal(s.current, null);
  });
});
