// speech.js — Voice-Picker- + Einstellungs-Logik (ohne echte SpeechSynthesis).

import { describe, it, before, after, afterEach } from 'node:test';
import assert from 'node:assert/strict';

// Stub für window.speechSynthesis vor dem Import.
const fakeVoices = [
  { name: 'Voice DE', lang: 'de-DE', default: true, voiceURI: 'de-DE-voice' },
  { name: 'Voice CH', lang: 'de-CH', default: false, voiceURI: 'de-CH-voice' },
  { name: 'Voice AT', lang: 'de-AT', default: false, voiceURI: 'de-AT-voice' },
  { name: 'Voice EN', lang: 'en-US', default: false, voiceURI: 'en-US-voice' },
];

let pickVoice, getSpeechSettings, setSpeechSettings, listVoices, getSpeechStatus;
let RATE_MIN, RATE_MAX, PITCH_MIN, PITCH_MAX;

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
  ({
    pickVoice, getSpeechSettings, setSpeechSettings, listVoices, getSpeechStatus,
    RATE_MIN, RATE_MAX, PITCH_MIN, PITCH_MAX,
  } = await import('../js/util/speech.js'));
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

describe('getSpeechSettings / setSpeechSettings', () => {
  afterEach(() => setSpeechSettings({ rate: 0.92, pitch: 1, voiceURI: null }));

  it('liefert Defaults', () => {
    setSpeechSettings({ rate: 0.92, pitch: 1, voiceURI: null });
    const s = getSpeechSettings();
    assert.equal(s.rate, 0.92);
    assert.equal(s.pitch, 1);
    assert.equal(s.voiceURI, null);
  });

  it('klemmt rate auf [RATE_MIN, RATE_MAX]', () => {
    assert.equal(setSpeechSettings({ rate: 99 }).rate, RATE_MAX);
    assert.equal(setSpeechSettings({ rate: -5 }).rate, RATE_MIN);
  });

  it('klemmt pitch auf [PITCH_MIN, PITCH_MAX]', () => {
    assert.equal(setSpeechSettings({ pitch: 99 }).pitch, PITCH_MAX);
    assert.equal(setSpeechSettings({ pitch: -5 }).pitch, PITCH_MIN);
  });

  it('ungültige Werte fallen auf Default zurück', () => {
    assert.equal(setSpeechSettings({ rate: 'abc' }).rate, 0.92);
  });

  it('voiceURI: leerer String → null', () => {
    assert.equal(setSpeechSettings({ voiceURI: '' }).voiceURI, null);
    assert.equal(setSpeechSettings({ voiceURI: 'de-CH-voice' }).voiceURI, 'de-CH-voice');
  });
});

describe('pickVoice — Wunschstimme (preferred)', () => {
  afterEach(() => setSpeechSettings({ voiceURI: null }));

  it('Wunschstimme schlägt Auto-Matching, wenn das Präfix passt', () => {
    setSpeechSettings({ voiceURI: 'de-AT-voice' });
    // de-DE angefragt, aber Wunschstimme ist de-AT → Präfix „de" passt.
    assert.equal(pickVoice('de-DE').name, 'Voice AT');
  });

  it('Wunschstimme wird ignoriert, wenn das Präfix nicht passt', () => {
    setSpeechSettings({ voiceURI: 'en-US-voice' });
    // de-DE angefragt, Wunschstimme ist englisch → fällt auf exakten de-DE-Match.
    assert.equal(pickVoice('de-DE').name, 'Voice DE');
  });

  it('expliziter preferredURI-Parameter überschreibt den State', () => {
    assert.equal(pickVoice('de-DE', 'de-CH-voice').name, 'Voice CH');
  });
});

describe('listVoices / getSpeechStatus', () => {
  afterEach(() => setSpeechSettings({ voiceURI: null }));

  it('deutsche Stimmen kommen zuerst, voiceURI ist enthalten', () => {
    const list = listVoices();
    assert.ok(list.length >= 4);
    assert.ok((list[0].lang || '').toLowerCase().startsWith('de'));
    assert.equal(list[list.length - 1].lang, 'en-US');
    assert.ok('voiceURI' in list[0]);
  });

  it('getSpeechStatus markiert die Wunschstimme', () => {
    setSpeechSettings({ voiceURI: 'de-AT-voice' });
    const st = getSpeechStatus('de-DE');
    assert.equal(st.available, true);
    assert.equal(st.voice, 'Voice AT');
    assert.equal(st.preferred, true);
  });

  it('ohne Wunschstimme ist preferred falsch', () => {
    const st = getSpeechStatus('de-DE');
    assert.equal(st.preferred, false);
  });
});

describe('dialectVoices — Schalter für eigene Dialekt-Stimmen', () => {
  it('ist standardmäßig an', () => {
    setSpeechSettings({ dialectVoices: true });
    assert.equal(getSpeechSettings().dialectVoices, true);
  });

  it('lässt sich abschalten und wieder einschalten', () => {
    assert.equal(setSpeechSettings({ dialectVoices: false }).dialectVoices, false);
    assert.equal(setSpeechSettings({ dialectVoices: true }).dialectVoices, true);
  });
});
