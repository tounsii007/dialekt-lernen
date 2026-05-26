// Etymologie-Extraktion — Tests.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { extractEtymology, hasEtymology } from '../js/util/etymology.js';

describe('extractEtymology — extrahiert Wortherkunft', () => {
  it('findet einen direkten „kommt von"-Satz', () => {
    const s = 'Ein typisch hessischer Ausruf. Das Wort kommt von „Allmächtiger Gott" und drückt Erstaunen aus.';
    const out = extractEtymology(s);
    assert.equal(out.length, 1);
    assert.match(out[0], /kommt von/);
  });

  it('findet mehrere Hinweise in einem Text', () => {
    const s = 'Das Wort stammt vom lateinischen „servus" (Diener). Heute ist es eine ganz normale Begrüßung. Verwandt mit dem italienischen „ciao".';
    const out = extractEtymology(s);
    assert.equal(out.length, 2, 'Erwartet zwei Treffer (servus + verwandt mit)');
  });

  it('erkennt mittelhochdeutsche/althochdeutsche Verweise', () => {
    const s = 'Das Wort kommt vom mittelhochdeutschen „vade". Es bezeichnet etwas Langweiliges.';
    const out = extractEtymology(s);
    assert.equal(out.length, 1);
    assert.match(out[0], /mittelhochdeutschen/);
  });

  it('erkennt Sprach-Indikatoren (jiddisch, französisch)', () => {
    const s = 'Das ist jiddisch-stämmig. Heute weit verbreitet.';
    assert.equal(extractEtymology(s).length, 1);
  });

  it('liefert leeres Array, wenn keine Etymologie-Hinweise vorhanden', () => {
    const s = 'Ein bekannter hessischer Ausdruck. Wird im Alltag häufig verwendet. Auch in der Werbung beliebt.';
    assert.deepEqual(extractEtymology(s), []);
  });

  it('verkraftet null und leere Strings', () => {
    assert.deepEqual(extractEtymology(null), []);
    assert.deepEqual(extractEtymology(''), []);
    assert.deepEqual(extractEtymology(undefined), []);
  });

  it('schneidet false-positives für „vom" als Präposition NICHT raus, wenn Etym-Wörter fehlen', () => {
    // Hier kommt „vom" rein als räumliche Präposition vor — wir wollen es NICHT extrahieren.
    const s = 'Im Brauhaus trifft sich alles vom Tourist bis zum Einheimischen. Das Bier kommt frisch aus dem Fass.';
    assert.deepEqual(extractEtymology(s), [],
      'Reine Präpositional-Verwendung von „vom" soll nicht als Etymologie erkannt werden');
  });
});

describe('hasEtymology — Helfer', () => {
  it('true, wenn mindestens ein Hinweis vorhanden', () => {
    assert.equal(hasEtymology('Stammt vom lateinischen Wort.'), true);
  });
  it('false, wenn kein Hinweis vorhanden', () => {
    assert.equal(hasEtymology('Ein ganz normaler Text ohne Etymologie.'), false);
  });
  it('false bei null/empty', () => {
    assert.equal(hasEtymology(null), false);
    assert.equal(hasEtymology(''), false);
  });
});
