// Tests für die Tages-Streak-Logik (Kern-Port von js/store/streak.js).

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/streak_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final streak = StreakStore.instance;

  // Feste Tage, damit die Tests unabhängig vom heutigen Datum laufen.
  final d1 = DateTime(2026, 3, 10);
  final d2 = DateTime(2026, 3, 11);
  final d3 = DateTime(2026, 3, 12);
  final d5 = DateTime(2026, 3, 14); // Lücke zu d3

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    streak.debugReset();
    await streak.load();
  });

  test('erster Lerntag startet die Serie bei 1', () async {
    expect(await streak.register(d1), 1);
    expect(streak.count, 1);
    expect(streak.activeDays, 1);
  });

  test('mehrfaches Lernen am selben Tag erhöht die Serie nicht', () async {
    await streak.register(d1);
    expect(await streak.register(d1), 1);
    expect(streak.count, 1);
    expect(streak.activeDays, 1);
  });

  test('konsekutive Tage erhöhen die Serie', () async {
    await streak.register(d1);
    expect(await streak.register(d2), 2);
    expect(await streak.register(d3), 3);
    expect(streak.activeDays, 3);
  });

  test('Lücke > 1 Tag setzt die Serie auf 1 zurück', () async {
    await streak.register(d1);
    await streak.register(d2);
    expect(streak.count, 2);
    expect(await streak.register(d5), 1); // d4 ausgelassen
    expect(streak.count, 1);
    expect(streak.activeDays, 3); // d1, d2, d5 alle erfasst
  });

  test('DST-Übergang bleibt ein lückenloser Folgetag', () async {
    // Deutschland: Sommerzeit-Umstellung in der Nacht 28.→29.03.2026 (23h-Tag).
    await streak.register(DateTime(2026, 3, 28));
    expect(await streak.register(DateTime(2026, 3, 29)), 2);
  });

  test('Monatswechsel zählt als konsekutiv', () async {
    await streak.register(DateTime(2026, 3, 31));
    expect(await streak.register(DateTime(2026, 4, 1)), 2);
  });

  test('Serie & aktive Tage persistieren über Reload', () async {
    await streak.register(d1);
    await streak.register(d2);
    streak.debugReset();
    await streak.load();
    expect(streak.count, 2);
    expect(streak.activeDays, 2);
    // Nach Reload an d3 weiterzählen.
    expect(await streak.register(d3), 3);
  });

  test('Rückdatierung hält die Serie stabil', () async {
    await streak.register(d3);
    expect(streak.count, 1);
    // Ein früherer Tag (diff <= 0) darf die Serie nicht erhöhen.
    expect(await streak.register(d1), 1);
  });
}
