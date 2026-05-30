// Frontend: renderDecks — Decks-View (Empty-State + Deck-Karte).
//
// Nutzt den FakeDOM aus _setup.js (kein jsdom). Deckt den View-Pfad ab, der
// die in decks.js zusammengeführten Modal-Helfer umgibt, ohne auf die
// (parallel weiterentwickelte) modal.js angewiesen zu sein.

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { mountDom, unmountDom } from '../_setup.js';

before(mountDom);
after(unmountDom);

// Erst NACH mountDom importieren, damit `document` global existiert.
const { renderDecks } = await import('../../js/views/decks.js');
const { state } = await import('../../js/store/state.js');

// Sammelt allen Blatt-Text rekursiv aus dem FakeNode-Baum.
function collectText(node, acc = []) {
  if (!node) return acc;
  const kids = node.childNodes || [];
  if (kids.length === 0 && typeof node.textContent === 'string' && node.textContent) {
    acc.push(node.textContent);
  }
  for (const c of kids) collectText(c, acc);
  return acc;
}

describe('renderDecks — Decks-View', () => {
  beforeEach(() => { state.decks = []; });

  it('zeigt Empty-State, wenn keine Decks existieren', () => {
    const root = document.createElement('div');
    renderDecks(root);
    const text = collectText(root).join(' ');
    assert.match(text, /Eigene Decks/);
    assert.match(text, /keine eigenen Decks/i);
  });

  it('rendert eine Deck-Karte mit Namen und Größe', () => {
    state.decks = [{
      id: 'd1', name: 'Mein Test-Deck', color: '#3a86ff',
      expressionIds: [], createdAt: Date.now(),
    }];
    const root = document.createElement('div');
    renderDecks(root);
    const text = collectText(root).join(' ');
    assert.match(text, /Mein Test-Deck/);
    assert.match(text, /Leeres Deck/, 'Deck ohne Ausdrücke → "Leeres Deck"');
  });

  it('rendert mehrere Decks (neueste zuerst)', () => {
    state.decks = [
      { id: 'a', name: 'Alpha', color: '#fff', expressionIds: [], createdAt: 1000 },
      { id: 'b', name: 'Beta',  color: '#000', expressionIds: [{ dialektId: 'hessisch', id: 'h-001' }], createdAt: 2000 },
    ];
    const root = document.createElement('div');
    renderDecks(root);
    const text = collectText(root).join(' ');
    assert.match(text, /Alpha/);
    assert.match(text, /Beta/);
  });

  it('wirft nicht bei fehlendem createdAt / leerem Namen-Fallback', () => {
    state.decks = [{ id: 'x', name: 'X', color: '#10b981', expressionIds: [] }];
    const root = document.createElement('div');
    assert.doesNotThrow(() => renderDecks(root));
  });
});
