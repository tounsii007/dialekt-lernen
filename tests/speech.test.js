// speech.js — Voice-Picker-Logik (ohne echte SpeechSynthesis).

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';

// Stub für window.speechSynthesis vor dem Import.
const fakeVoices = [
  { name: 'Voice DE', lang: 'de-DE', default: true },
  { name: 'Voice CH', lang: 'de-CH', default: false },
  { name: 'Voice AT', lang: 'de-AT', default: false },
  { name: 'Voice EN', lang: 'en-US', default: false },
];

let pickVoice;

before(async () => {
  globalThis.window = {
    speechSynthesis: {
      getVoices: () => fakeVoices,
      addEventListener: () => {},
      cancel: () => {},
      speak: () => {},
    },
  };
  globalThis.document = {
    documentElement: { classList: { toggle: () => {} } },
  };
  ({ pickVoice } = await import('../js/util/speech.js'));
});

after(() => {
  delete globalThis.window;
  delete globalThis.document;
});

describe('pickVoice — Voice-Matching-Logik', () => {
  it('exakter Lang-Match wird bevorzugt', () => {
    const v = pickVoice('de-CH');
    assert.equal(v.name, 'Voice CH');
  });

  it('Wienerisch (de-AT) findet AT-Stimme', () => {
    const v = pickVoice('de-AT');
    assert.equal(v.name, 'Voice AT');
  });

  it('Plattdeutsch (nds) ohne exakten Match → Default-Voice', () => {
    const v = pickVoice('nds');
    assert.ok(v); // wir wollen eine Stimme zurückbekommen
    // Da keine nds-Stimme existiert und auch kein „nd-*"-Präfix-Match
    // möglich ist, sollte die Default-Voice (Voice DE) gewählt werden.
    assert.equal(v.name, 'Voice DE');
  });

  it('unbekannte Sprache fällt auf Default-Voice zurück', () => {
    const v = pickVoice('jp-JP');
    assert.equal(v.name, 'Voice DE');
  });

  it('Präfix-Match: de-XX matcht eine vorhandene de-*-Stimme', () => {
    const v = pickVoice('de-LU'); // hypothetisch
    assert.match(v.lang, /^de-/);
  });
});
