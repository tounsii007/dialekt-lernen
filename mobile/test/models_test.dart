// Adversariale Tests für das JSON-Parsing der Modelle.
// Ziel: Robustheit gegen fehlende Felder, falsche Typen und Müll-Eingaben —
// solche Daten dürfen NICHT zum Absturz führen.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/models.dart';

void main() {
  group('hexColor — Kantenfälle', () {
    test('6-stelliger Hex', () {
      expect(hexColor('#e63946'), const Color(0xFFE63946));
    });
    test('ohne Raute', () {
      expect(hexColor('8b5cf6'), const Color(0xFF8B5CF6));
    });
    test('3-stellig wird expandiert', () {
      expect(hexColor('#0f8'), const Color(0xFF00FF88));
    });
    test('8-stellig (mit Alpha) bleibt erhalten', () {
      expect(hexColor('80FF0000'), const Color(0x80FF0000));
    });
    test('Großschreibung', () {
      expect(hexColor('#ABCDEF'), const Color(0xFFABCDEF));
    });
    test('leerer String → Fallback', () {
      expect(hexColor(''), const Color(0xFF8B5CF6));
    });
    test('ungültige Länge (5) → Fallback', () {
      expect(hexColor('#12345'), const Color(0xFF8B5CF6));
    });
    test('Nicht-Hex-Zeichen → Fallback', () {
      expect(hexColor('#zzzzzz'), const Color(0xFF8B5CF6));
    });
    test('eigener Fallback wird genutzt', () {
      expect(
        hexColor('müll', fallback: const Color(0xFF000000)),
        const Color(0xFF000000),
      );
    });
  });

  group('Ausdruck.fromJson — Robustheit', () {
    test('alle Felder fehlen → leere Strings, kein Wurf', () {
      final a = Ausdruck.fromJson(<String, dynamic>{});
      expect(a.id, '');
      expect(a.ausdruck, '');
      expect(a.hochdeutsch, '');
    });

    test('null-Werte werden zu leeren Strings', () {
      final a = Ausdruck.fromJson({'id': null, 'ausdruck': null});
      expect(a.id, '');
      expect(a.ausdruck, '');
    });

    test('numerische/boolesche Werte werden koerziert (kein as-String-Crash)', () {
      final a = Ausdruck.fromJson({
        'id': 42,
        'ausdruck': true,
        'hochdeutsch': 3.14,
      });
      expect(a.id, '42');
      expect(a.ausdruck, 'true');
      expect(a.hochdeutsch, '3.14');
    });

    test('beispiel_hd-Mapping', () {
      final a = Ausdruck.fromJson({'beispiel_hd': 'Hochdeutsch-Satz'});
      expect(a.beispielHd, 'Hochdeutsch-Satz');
    });
  });

  group('Dialekt.fromJson — Robustheit', () {
    test('fehlende Felder → Defaults, kein Wurf', () {
      final d = Dialekt.fromJson(<String, dynamic>{});
      expect(d.flag, '🗣️');
      expect(d.farbe, '#8B5CF6');
      expect(d.lang, 'de-DE');
      expect(d.ausdruecke, isEmpty);
    });

    test('ausdruecke als falscher Typ (Map statt List) → leere Liste', () {
      final d = Dialekt.fromJson({'ausdruecke': {'nope': 1}});
      expect(d.ausdruecke, isEmpty);
    });

    test('ausdruecke mit Nicht-Map-Elementen werden gefiltert', () {
      final d = Dialekt.fromJson({
        'ausdruecke': [
          'kaputt',
          42,
          {'id': 'x-1', 'ausdruck': 'Gut'},
        ],
      });
      expect(d.ausdruecke, hasLength(1));
      expect(d.ausdruecke.first.id, 'x-1');
    });

    test('leerer flag/farbe → Default', () {
      final d = Dialekt.fromJson({'flag': '', 'farbe': ''});
      expect(d.flag, '🗣️');
      expect(d.farbe, '#8B5CF6');
    });

    test('color-Getter parst Farbe', () {
      final d = Dialekt.fromJson({'farbe': '#e63946'});
      expect(d.color, const Color(0xFFE63946));
    });
  });

  group('Kategorie.fromJson', () {
    test('fehlendes icon → Fallback-Emoji', () {
      final k = Kategorie.fromJson({'id': 'x', 'label': 'X'});
      expect(k.icon, '🏷️');
    });
  });
}
