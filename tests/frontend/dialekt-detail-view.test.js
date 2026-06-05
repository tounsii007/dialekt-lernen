// Dialekt-Detail-View — rendert Header, Ausdrucks-Liste und Kategorie-Filter
// für einen konkreten Dialekt.

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom, resetState, tick } from '../_setup.js';

before(mountDom);
after(unmountDom);

const { renderDialektDetail } = await import('../../js/views/dialektDetail.js');
const { getDialekt } = await import('../../data/dialekte.js');

function collectText(node, acc = []) {
  if (!node) return acc;
  const kids = node.childNodes || [];
  if (kids.length === 0 && node.textContent) acc.push(node.textContent);
  for (const c of kids) collectText(c, acc);
  return acc;
}

describe('renderDialektDetail', () => {
  beforeEach(resetState);

  it('zeigt den Namen des Dialekts', async () => {
    const root = document.createElement('div');
    renderDialektDetail(root, 'hessisch');
    await tick(15);
    const text = collectText(root).join(' ');
    assert.match(text, /Hessisch/, 'Dialekt-Name fehlt');
  });

  it('rendert mindestens einen Ausdruck des Dialekts', async () => {
    const root = document.createElement('div');
    renderDialektDetail(root, 'hessisch');
    await tick(15);
    const text = collectText(root).join(' ');
    const erster = getDialekt('hessisch').ausdruecke[0].ausdruck;
    assert.match(text, new RegExp(erster.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `Ausdruck „${erster}" fehlt`);
  });

  it('unbekannter Dialekt wirft nicht (defensiver Pfad)', async () => {
    const root = document.createElement('div');
    renderDialektDetail(root, 'gibtsnicht');
    await tick(15);
    assert.ok(true);
  });
});
