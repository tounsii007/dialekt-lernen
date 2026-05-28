// Custom-Decks Tests

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { state } from '../js/store/state.js';
import {
  createDeck, getDecks, getDeck, addToDeck, removeFromDeck,
  deleteDeck, updateDeck, countDecks, deckSize,
} from '../js/store/decks.js';

beforeEach(() => { state.decks = []; });

describe('Custom-Decks', () => {
  it('createDeck legt ein Deck an', () => {
    const id = createDeck({ name: 'Mein Deck', color: '#ff0000' });
    assert.equal(typeof id, 'string');
    assert.equal(countDecks(), 1);
  });

  it('createDeck Fallback auf "Unbenanntes Deck"', () => {
    const id = createDeck({ name: '' });
    const d = getDeck(id);
    assert.equal(d.name, 'Unbenanntes Deck');
  });

  it('getDecks gibt alle zurück', () => {
    createDeck({ name: 'A' });
    createDeck({ name: 'B' });
    const all = getDecks();
    assert.equal(all.length, 2);
  });

  it('addToDeck fügt Ausdruck hinzu', () => {
    const id = createDeck({ name: 'Test' });
    addToDeck(id, { dialektId: 'bayerisch', id: 'by-001' });
    assert.equal(deckSize(id), 1);
  });

  it('addToDeck ignoriert Duplikate', () => {
    const id = createDeck({ name: 'Test' });
    addToDeck(id, { dialektId: 'bayerisch', id: 'by-001' });
    addToDeck(id, { dialektId: 'bayerisch', id: 'by-001' });
    assert.equal(deckSize(id), 1);
  });

  it('removeFromDeck entfernt korrekt', () => {
    const id = createDeck({ name: 'Test' });
    addToDeck(id, { dialektId: 'bayerisch', id: 'by-001' });
    addToDeck(id, { dialektId: 'bayerisch', id: 'by-002' });
    removeFromDeck(id, { dialektId: 'bayerisch', id: 'by-001' });
    assert.equal(deckSize(id), 1);
  });

  it('updateDeck erlaubt Name/Color-Update', () => {
    const id = createDeck({ name: 'Original' });
    updateDeck(id, { name: 'Geändert', color: '#abc123' });
    const d = getDeck(id);
    assert.equal(d.name, 'Geändert');
    assert.equal(d.color, '#abc123');
  });

  it('deleteDeck entfernt vollständig', () => {
    const id = createDeck({ name: 'Test' });
    deleteDeck(id);
    assert.equal(countDecks(), 0);
    assert.equal(getDeck(id), null);
  });

  it('addToDeck verweigert invalide Refs', () => {
    const id = createDeck({ name: 'Test' });
    addToDeck(id, null);
    addToDeck(id, { dialektId: '', id: 'x' });
    assert.equal(deckSize(id), 0);
  });
});
