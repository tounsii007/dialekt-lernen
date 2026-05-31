// Tests für Combo/Multiplikator — Port von tests/combo.test.js.

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/combo_controller.dart';

void main() {
  group('comboMultiplier', () {
    test('Tier-Schwellen aufsteigend', () {
      expect(comboMultiplier(0), 1.0);
      expect(comboMultiplier(2), 1.0);
      expect(comboMultiplier(3), 1.25);
      expect(comboMultiplier(4), 1.25);
      expect(comboMultiplier(5), 1.5);
      expect(comboMultiplier(7), 1.5);
      expect(comboMultiplier(8), 1.75);
      expect(comboMultiplier(11), 1.75);
      expect(comboMultiplier(12), 2.0);
      expect(comboMultiplier(100), 2.0);
    });

    test('negativer Zähler → 1.0', () {
      expect(comboMultiplier(-3), 1.0);
    });
  });

  group('applyComboToXp', () {
    test('rundet auf ganze XP', () {
      expect(applyComboToXp(10, 1.5), 15);
      expect(applyComboToXp(10, 1.25), 13); // 12.5 → 13
      expect(applyComboToXp(8, 1.75), 14);
      expect(applyComboToXp(0, 2.0), 0);
    });

    test('robust gegen ungültige Eingaben', () {
      expect(applyComboToXp(-5, 2.0), 0);
      expect(applyComboToXp(10, 0), 10); // mult ≤ 0 → 1.0
      expect(applyComboToXp(10, double.nan), 10);
      expect(applyComboToXp(10, double.infinity), 10);
    });
  });

  group('ComboController', () {
    final combo = ComboController.instance;
    setUp(combo.reset);

    test('korrekte Treffer bauen die Combo auf', () {
      final h1 = combo.registerHit(true, 1000);
      expect(h1.count, 1);
      expect(h1.broken, false);
      final h2 = combo.registerHit(true, 2000);
      expect(h2.count, 2);
      expect(combo.count, 2);
    });

    test('Fehler bricht eine aktive Combo', () {
      combo.registerHit(true, 1000);
      combo.registerHit(true, 2000);
      final broken = combo.registerHit(false, 3000);
      expect(broken.count, 0);
      expect(broken.broken, true);
      expect(broken.multiplier, 1.0);
      expect(combo.count, 0);
    });

    test('Fehler ohne aktive Combo meldet broken=false', () {
      final h = combo.registerHit(false, 1000);
      expect(h.broken, false);
      expect(h.count, 0);
    });

    test('lange Pause kühlt ab → frische Combo', () {
      combo.registerHit(true, 1000);
      combo.registerHit(true, 2000);
      final after = combo.registerHit(true, 2000 + comboTimeoutMs + 1);
      expect(after.count, 1);
    });

    test('tierUp wird beim Überschreiten einer Schwelle gemeldet', () {
      var hit = combo.registerHit(true, 1000); // 1
      expect(hit.tierUp, false);
      hit = combo.registerHit(true, 1100); // 2
      expect(hit.tierUp, false);
      hit = combo.registerHit(true, 1200); // 3 → 1.25×
      expect(hit.tierUp, true);
      expect(hit.multiplier, 1.25);
    });

    test('best merkt sich die höchste Combo', () {
      combo.registerHit(true, 1000);
      combo.registerHit(true, 1100);
      combo.registerHit(true, 1200);
      expect(combo.best, 3);
      final broken = combo.registerHit(false, 1300);
      expect(broken.best, 3); // best bleibt erhalten
      expect(combo.count, 0);
    });
  });
}
