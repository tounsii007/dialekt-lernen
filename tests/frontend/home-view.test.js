// Home/Hero-View — Render-Smoke + Regressionsschutz für die Beispiel-Rotatoren.
//
// Hintergrund: Das „z.B."-Wort-Karussell und die schwebenden Vorschaukarten
// zeigten früher nur eine Handvoll fest verdrahteter Beispiele. Sie ziehen jetzt
// aus ALLEN Ausdrücken (500+). Diese Tests sichern genau das ab.

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom, resetState } from '../_setup.js';

before(mountDom);
after(unmountDom);

// Reduced-Motion erzwingen → keine hängenden Rotations-Timer im Testlauf.
function silenceMotion() {
  globalThis.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
}

const { buildWordPool, buildPreviewPool } = await import('../../js/views/home/hero.js');
const { renderHome } = await import('../../js/views/home.js');

function collectText(node, acc = []) {
  if (!node) return acc;
  const kids = node.childNodes || [];
  if (kids.length === 0 && node.textContent) acc.push(node.textContent);
  for (const c of kids) collectText(c, acc);
  return acc;
}

describe('Hero · Wort-Pool (z.B.-Karussell)', () => {
  it('liefert mehr als 500 Ausdrücke (nicht nur eine Handvoll)', () => {
    const pool = buildWordPool();
    assert.ok(pool.length > 500, `erwartet > 500, war ${pool.length}`);
  });

  it('jeder Eintrag hat word/flag/name (nicht leer)', () => {
    const pool = buildWordPool();
    for (const e of pool.slice(0, 200)) {
      assert.ok(e.word && e.word.trim().length >= 2, `word ungültig: ${JSON.stringify(e)}`);
      assert.ok(e.flag && e.flag.length >= 1, `flag fehlt: ${JSON.stringify(e)}`);
      assert.ok(e.name && e.name.trim().length >= 1, `name fehlt: ${JSON.stringify(e)}`);
    }
  });

  it('schließt reine Abkürzungen/Codes aus (z.B. „RVR")', () => {
    const pool = buildWordPool();
    const offenders = pool.filter(e => /^[A-ZÄÖÜ.\d]{2,}$/.test(e.word));
    assert.equal(offenders.length, 0, `Abkürzungen im Pool: ${offenders.slice(0, 5).map(o => o.word)}`);
  });

  it('bietet echte Abwechslung — viele verschiedene Wörter & Dialekte', () => {
    const pool = buildWordPool();
    const words = new Set(pool.map(e => e.word));
    const names = new Set(pool.map(e => e.name));
    assert.ok(words.size > 400, `zu wenig verschiedene Wörter: ${words.size}`);
    assert.ok(names.size >= 10, `zu wenig verschiedene Dialekte: ${names.size}`);
  });
});

describe('Hero · Vorschaukarten-Pool', () => {
  it('liefert über 500 kartentaugliche Beispiele', () => {
    const pool = buildPreviewPool();
    assert.ok(pool.length > 500, `erwartet > 500, war ${pool.length}`);
  });

  it('Einträge haben dialekt/ausdruck/meaning + Hex-Farbe', () => {
    const pool = buildPreviewPool();
    for (const s of pool.slice(0, 200)) {
      assert.ok(s.dialekt && s.ausdruck && s.meaning, `Feld fehlt: ${JSON.stringify(s)}`);
      assert.ok(/^#[0-9a-fA-F]{6}$/.test(s.farbe), `farbe kein Hex: ${s.farbe}`);
      assert.ok(s.ausdruck.length <= 17, `Ausdruck zu lang für Karte: ${s.ausdruck}`);
    }
  });
});

describe('renderHome — Render-Smoke (FakeDOM)', () => {
  beforeEach(() => { resetState(); silenceMotion(); });

  it('rendert ohne Fehler und erzeugt Inhalt', () => {
    const root = document.createElement('div');
    renderHome(root, {});
    assert.ok(root.childNodes.length > 0, 'Home sollte Inhalt rendern');
  });

  it('zeigt Hero-Karussell, Stats und Vorschau', () => {
    const root = document.createElement('div');
    renderHome(root, {});
    const text = collectText(root).join(' ');
    assert.match(text, /z\.B\./, 'Wort-Karussell-Prefix fehlt');
    assert.match(text, /Dialekte/, 'Stats-Label „Dialekte" fehlt');
    assert.match(text, /Ausdrücke/, 'Stats-Label „Ausdrücke" fehlt');
  });
});
