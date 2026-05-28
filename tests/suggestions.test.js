// Suggestions Tests

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { state } from '../js/store/state.js';
import {
  addSuggestion, getSuggestions, getSuggestionsFor, removeSuggestion,
  countSuggestions, exportSuggestionsAsJson,
} from '../js/store/suggestions.js';

beforeEach(() => { state.suggestions = []; });

describe('Suggestions', () => {
  it('addSuggestion legt einen Vorschlag an', () => {
    const id = addSuggestion({
      dialektId: 'bayerisch',
      id: 'by-001',
      field: 'ausdruck',
      currentValue: 'Servus',
      proposedValue: 'Griaß di',
      note: 'Standard-Form'
    });
    assert.ok(id);
    assert.equal(countSuggestions(), 1);
  });

  it('addSuggestion lehnt ungültige Felder ab', () => {
    const id = addSuggestion({
      dialektId: 'bayerisch',
      id: 'by-001',
      field: 'kategorie',  // nicht in ALLOWED_FIELDS
      currentValue: 'a',
      proposedValue: 'b'
    });
    assert.equal(id, null);
  });

  it('addSuggestion ignoriert no-change', () => {
    const id = addSuggestion({
      dialektId: 'x',
      id: 'y',
      field: 'ausdruck',
      currentValue: 'gleich',
      proposedValue: 'gleich'
    });
    assert.equal(id, null);
  });

  it('getSuggestionsFor filtert', () => {
    addSuggestion({ dialektId: 'a', id: '1', field: 'ausdruck', currentValue: 'x', proposedValue: 'y' });
    addSuggestion({ dialektId: 'b', id: '2', field: 'ausdruck', currentValue: 'x', proposedValue: 'y' });
    const a = getSuggestionsFor('a', '1');
    assert.equal(a.length, 1);
  });

  it('removeSuggestion löscht', () => {
    const id = addSuggestion({ dialektId: 'a', id: '1', field: 'ausdruck', currentValue: 'x', proposedValue: 'y' });
    removeSuggestion(id);
    assert.equal(countSuggestions(), 0);
  });

  it('exportSuggestionsAsJson gibt JSON-String zurück', () => {
    addSuggestion({ dialektId: 'a', id: '1', field: 'ausdruck', currentValue: 'x', proposedValue: 'y' });
    const json = exportSuggestionsAsJson();
    assert.equal(typeof json, 'string');
    const parsed = JSON.parse(json);
    assert.equal(parsed.format, 'dialekto-suggestions');
    assert.equal(parsed.count, 1);
    assert.ok(Array.isArray(parsed.suggestions));
  });
});
