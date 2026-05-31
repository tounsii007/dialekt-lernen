// Tests für Intervall-Fuzz + Load-Balancing — Port von tests/fsrs-fuzz.test.js.

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/util/fsrs_fuzz.dart';

void main() {
  group('fuzzRange', () {
    test('unter Mindest-Intervall → kollabiert auf einen Tag', () {
      final r = fuzzRange(1.0);
      expect(r.min, r.max);
      expect(r.min, 1);
      final r2 = fuzzRange(2.0);
      expect(r2.min, r2.max);
      expect(r2.min, 2);
    });
    test('Fenster wächst mit dem Intervall', () {
      final small = fuzzRange(5.0);
      final big = fuzzRange(60.0);
      expect((big.max - big.min) > (small.max - small.min), isTrue);
    });
    test('min >= 2, max >= min für gestreute Intervalle', () {
      final r = fuzzRange(3.0);
      expect(r.min >= 2, isTrue);
      expect(r.max >= r.min, isTrue);
    });
  });

  group('applyFuzz', () {
    test('deaktiviert → gerundetes Intervall', () {
      expect(applyFuzz(12.4, enable: false), 12);
    });
    test('kleine Intervalle werden nicht gestreut', () {
      expect(applyFuzz(1.0), 1);
      expect(applyFuzz(2.0), 2);
    });
    test('Ergebnis liegt im Fuzz-Fenster', () {
      final range = fuzzRange(30.0);
      final v = applyFuzz(30.0, rng: () => 0.5);
      expect(v >= range.min && v <= range.max, isTrue);
    });
    test('rng=0 → Fensteranfang, rng→1 → Fensterende', () {
      final range = fuzzRange(30.0);
      expect(applyFuzz(30.0, rng: () => 0.0), range.min);
      expect(applyFuzz(30.0, rng: () => 0.999999), range.max);
    });
    test('Load-Balancing wählt den am wenigsten ausgelasteten Tag', () {
      final range = fuzzRange(30.0);
      final load = <int, int>{};
      for (var d = range.min; d <= range.max; d++) {
        load[d] = 100;
      }
      final target = range.min + 1;
      load[target] = 0;
      expect(applyFuzz(30.0, load: load), target);
    });
    test('Load-Gleichstand → Tag näher am Ideal-Intervall', () {
      // Leere Last → alle count 0 → wählt den Tag am nächsten zu 30.
      expect(applyFuzz(30.0, load: <int, int>{}), 30);
    });
  });
}
