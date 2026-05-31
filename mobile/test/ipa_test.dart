// Tests für die IPA-Konvertierung + Silbentrennung — Port von tests/ipa.test.js.

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/util/ipa.dart';

void main() {
  group('toIpa', () {
    test('Mehrzeichen-Regeln', () {
      expect(toIpa('sch'), 'ʃ');
      expect(toIpa('Zeit'), 't͡saɪ̯t');
    });

    test('w→v, einzelne Ersetzungen', () {
      expect(toIpa('Wasser').contains('v'), isTrue);
      expect(toIpa('Wasser').contains('w'), isFalse);
    });

    test('ohne Dialekt bleibt g erhalten', () {
      expect(toIpa('gut'), 'gut');
    });

    test('Kölsch-Override: g→j', () {
      expect(toIpa('gut', 'koelsch'), 'jut');
      expect(formatIpa('gut', 'koelsch'), '/jut/');
    });

    test('formatIpa umschließt mit Schrägstrichen', () {
      expect(formatIpa('sch'), '/ʃ/');
    });

    test('leere Eingabe', () {
      expect(toIpa(''), '');
    });
  });

  group('splitSyllables', () {
    test('mehrsilbiges Wort (maximaler Anlaut)', () {
      expect(splitSyllables('Buchstabe'), ['Buch', 'sta', 'be']);
    });

    test('einsilbiges Wort bleibt ganz', () {
      expect(splitSyllables('Haus'), ['Haus']);
    });

    test('Phrase wird über Wortgrenzen flach zerlegt', () {
      final s = splitSyllables('guten Morgen');
      expect(s.length, greaterThanOrEqualTo(3));
      expect(s.first, 'gu');
    });

    test('leere Eingabe → leere Liste', () {
      expect(splitSyllables('   '), isEmpty);
    });
  });
}
