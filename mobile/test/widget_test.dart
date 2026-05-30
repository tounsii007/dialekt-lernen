// Unit-Tests ohne Asset-/Netzwerk-Abhängigkeit (Daten/Fonts werden hier
// bewusst nicht geladen, um die Tests deterministisch zu halten).

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/models.dart';

void main() {
  group('hexColor', () {
    test('parst 6-stelligen Hex', () {
      expect(hexColor('#e63946'), const Color(0xFFE63946));
    });

    test('parst ohne Raute', () {
      expect(hexColor('8b5cf6'), const Color(0xFF8B5CF6));
    });

    test('expandiert 3-stelligen Hex', () {
      expect(hexColor('#fff'), const Color(0xFFFFFFFF));
    });

    test('fällt bei Müll auf Fallback zurück', () {
      expect(hexColor('keine-farbe'), const Color(0xFF8B5CF6));
    });
  });

  group('Modelle', () {
    test('Dialekt.fromJson liest Felder + Ausdrücke', () {
      final d = Dialekt.fromJson({
        'id': 'hessisch',
        'name': 'Hessisch',
        'region': 'Hessen',
        'flag': '🦁',
        'farbe': '#e63946',
        'ausdruecke': [
          {'id': 'h-001', 'ausdruck': 'Ei guude!', 'hochdeutsch': 'Hallo!'},
        ],
      });
      expect(d.name, 'Hessisch');
      expect(d.color, const Color(0xFFE63946));
      expect(d.ausdruecke, hasLength(1));
      expect(d.ausdruecke.first.ausdruck, 'Ei guude!');
    });
  });
}
