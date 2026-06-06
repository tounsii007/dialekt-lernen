// voice-profiles.js — Stimmprofile, dialektales Respelling, Stimmenzuweisung.
// Reine Logik, kein DOM/SpeechSynthesis nötig.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  VOICE_PROFILES, getVoiceProfile, hasVoiceProfile, respellForTts, assignVoiceURI,
} from '../js/util/voice-profiles.js';
import { DIALEKTE } from '../data/dialekte.js';

describe('VOICE_PROFILES — Vollständigkeit & Form', () => {
  it('jeder registrierte Dialekt hat ein Stimmprofil', () => {
    for (const d of DIALEKTE) {
      assert.ok(hasVoiceProfile(d.id), `Stimmprofil fehlt für „${d.id}"`);
    }
  });

  it('Profile haben plausible rate/pitch/gender/respell', () => {
    for (const [id, p] of Object.entries(VOICE_PROFILES)) {
      assert.ok(p.rate >= 0.8 && p.rate <= 1.2, `${id}: rate außerhalb [0.8,1.2]`);
      assert.ok(p.pitch >= 0.8 && p.pitch <= 1.2, `${id}: pitch außerhalb [0.8,1.2]`);
      assert.ok(p.gender === 'm' || p.gender === 'f' || p.gender === null, `${id}: gender ungültig`);
      assert.ok(Array.isArray(p.respell), `${id}: respell ist kein Array`);
    }
  });
});

describe('getVoiceProfile', () => {
  it('bekannter Dialekt → kuratiertes Profil', () => {
    assert.equal(getVoiceProfile('bayerisch').gender, 'm');
  });
  it('unbekannter Dialekt → neutrales Profil', () => {
    const p = getVoiceProfile('gibtsnicht');
    assert.equal(p.rate, 1);
    assert.equal(p.pitch, 1);
    assert.deepEqual(p.respell, []);
  });
});

describe('respellForTts — dialektale Lautanpassung', () => {
  it('leerer Input bleibt leer', () => {
    assert.equal(respellForTts('', 'berlinisch'), '');
    assert.equal(respellForTts('   ', 'berlinisch').trim(), '');
  });

  it('Dialekt ohne Profil → unverändert', () => {
    assert.equal(respellForTts('Guten Tag', 'gibtsnicht'), 'Guten Tag');
  });

  it('Berlinisch: g→j (initial) und ich→ick', () => {
    assert.match(respellForTts('gut', 'berlinisch'), /jut/);
    assert.match(respellForTts('ich', 'berlinisch'), /\bick\b/);
  });

  it('Kölsch: ich→isch', () => {
    assert.match(respellForTts('ich', 'koelsch'), /isch/);
  });

  it('Sächsisch: ei→ee', () => {
    assert.match(respellForTts('Bein', 'saechsisch'), /been/);
  });

  it('Schwäbisch: st→scht (Fenster→fenschter)', () => {
    assert.match(respellForTts('Fenster', 'schwaebisch'), /fenschter/);
  });

  it('Schwizerdütsch: k→ch initial (Kind→chind)', () => {
    assert.match(respellForTts('Kind', 'schwizerduetsch'), /chind/);
  });

  it('liefert für nicht-leeren Input nie leer (alle Profile)', () => {
    const probe = 'Das ist ein schöner Tag mit Kindern und Wespen';
    for (const id of Object.keys(VOICE_PROFILES)) {
      const out = respellForTts(probe, id);
      assert.ok(out && out.trim().length, `Respelling lieferte leer bei „${id}"`);
    }
  });

  it('„scht" wird durch die st→scht-Regel nicht verdoppelt', () => {
    // "scht" enthält kein zusammenhängendes "st" → keine Verdopplung.
    assert.equal(/schscht/.test(respellForTts('Geschichte', 'schwaebisch')), false);
  });
});

describe('assignVoiceURI — deterministische Stimmenzuweisung', () => {
  const voices = [
    { name: 'Voice DE 1', lang: 'de-DE', voiceURI: 'de1' },
    { name: 'Voice DE 2', lang: 'de-DE', voiceURI: 'de2' },
    { name: 'Voice DE 3', lang: 'de-DE', voiceURI: 'de3' },
    { name: 'Voice AT',   lang: 'de-AT', voiceURI: 'at1' },
    { name: 'Voice CH',   lang: 'de-CH', voiceURI: 'ch1' },
    { name: 'Voice EN',   lang: 'en-US', voiceURI: 'en1' },
  ];

  it('leerer Pool → null', () => {
    assert.equal(assignVoiceURI('bayerisch', 'de-DE', []), null);
  });

  it('deterministisch: gleicher Dialekt → gleiche Stimme', () => {
    const a = assignVoiceURI('bayerisch', 'de-DE', voices);
    const b = assignVoiceURI('bayerisch', 'de-DE', voices);
    assert.equal(a, b);
    assert.ok(a);
  });

  it('de-AT-Dialekt bevorzugt die exakte AT-Stimme', () => {
    assert.equal(assignVoiceURI('wienerisch', 'de-AT', voices), 'at1');
  });

  it('de-CH-Dialekt bevorzugt die exakte CH-Stimme', () => {
    assert.equal(assignVoiceURI('schwizerduetsch', 'de-CH', voices), 'ch1');
  });

  it('wählt nie eine fremdsprachige Stimme', () => {
    assert.notEqual(assignVoiceURI('bayerisch', 'de-DE', voices), 'en1');
  });

  it('verschiedene Dialekte können verschiedene Stimmen erhalten', () => {
    const ids = ['bayerisch', 'saechsisch', 'koelsch', 'hessisch', 'berlinisch', 'plattdeutsch'];
    const assigned = new Set(ids.map((id) => assignVoiceURI(id, 'de-DE', voices)));
    assert.ok(assigned.size >= 2, 'Stimmen wurden nicht verteilt');
  });
});
