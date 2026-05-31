// Tests für die Achievement-Logik (Port von js/store/achievements.js).

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/achievements_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final ach = AchievementsStore.instance;

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    ach.debugReset();
    await ach.load();
  });

  AchievementView find(List<AchievementView> items, String id) =>
      items.firstWhere((v) => v.def.id == id);

  test('Nullzustand schaltet nichts frei', () async {
    final r = await ach.evaluate(const AchievementStats());
    expect(r.justUnlocked, isEmpty);
    expect(find(r.items, 'firstCard').unlocked, isFalse);
  });

  test('Schwellen schalten passende Achievements frei', () async {
    final r = await ach.evaluate(const AchievementStats(gelerntCount: 10));
    expect(r.justUnlocked, containsAll(<String>['firstCard', 'tenCards']));
    expect(find(r.items, 'fiftyCards').unlocked, isFalse);
  });

  test('Auswertung ist idempotent — kein doppeltes Freischalten', () async {
    await ach.evaluate(const AchievementStats(gelerntCount: 10));
    final again = await ach.evaluate(const AchievementStats(gelerntCount: 10));
    expect(again.justUnlocked, isEmpty);
    expect(find(again.items, 'firstCard').unlocked, isTrue);
  });

  test('einmal freigeschaltet bleibt freigeschaltet, auch wenn Stats fallen',
      () async {
    await ach.evaluate(const AchievementStats(streak: 3));
    final r = await ach.evaluate(const AchievementStats(streak: 0));
    expect(find(r.items, 'streak3').unlocked, isTrue);
  });

  test('allMaster nur bei totalAvailable > 0', () async {
    final none = await ach.evaluate(
        const AchievementStats(gelerntCount: 0, totalAvailable: 0));
    expect(find(none.items, 'allMaster').unlocked, isFalse);
    final all = await ach.evaluate(
        const AchievementStats(gelerntCount: 5, totalAvailable: 5));
    expect(find(all.items, 'allMaster').unlocked, isTrue);
  });

  test('pathHalf nutzt Aufrundung der Hälfte', () async {
    final r = await ach
        .evaluate(const AchievementStats(pathTotal: 9, pathCompleted: 5));
    expect(find(r.items, 'pathHalf').unlocked, isTrue); // ceil(9/2)=5
    // Komplett frischer Zustand (auch Prefs leeren, sonst lädt der persistierte
    // Freischalt-Status zurück).
    SharedPreferences.setMockInitialValues(<String, Object>{});
    ach.debugReset();
    await ach.load();
    final r2 = await ach
        .evaluate(const AchievementStats(pathTotal: 9, pathCompleted: 4));
    expect(find(r2.items, 'pathHalf').unlocked, isFalse);
  });

  test('Spezial-Achievements prüfen besuchte Dialekt-IDs', () async {
    final r = await ach.evaluate(
        const AchievementStats(visitedIds: {'bayerisch', 'plattdeutsch'}));
    expect(find(r.items, 'south').unlocked, isTrue);
    expect(find(r.items, 'north').unlocked, isTrue);
    expect(find(r.items, 'swiss').unlocked, isFalse);
  });

  test('markVisited persistiert und füllt visitedIds', () async {
    await ach.markVisited('ruhrdeutsch');
    expect(ach.visitedIds, contains('ruhrdeutsch'));
    ach.debugReset();
    await ach.load();
    expect(ach.visitedIds, contains('ruhrdeutsch'));
  });

  test('score summiert Raritätspunkte und tallyt pro Stufe', () async {
    // firstCard (common=10) + fiftyCards (rare=25) freischalten.
    await ach.evaluate(const AchievementStats(gelerntCount: 50));
    final s = ach.score();
    expect(s.score, greaterThanOrEqualTo(35));
    expect(s.byRarity['common']!.unlocked, greaterThanOrEqualTo(1));
    expect(s.byRarity['rare']!.unlocked, greaterThanOrEqualTo(1));
    // maxScore ist konstant (Summe aller Definitionspunkte).
    expect(s.maxScore, greaterThan(s.score));
    // total je Stufe entspricht dem Katalog.
    final totalDefs = s.byRarity.values.fold(0, (a, b) => a + b.total);
    expect(totalDefs, achievements.length);
  });

  test('Freischaltungen persistieren über Reload', () async {
    await ach.evaluate(const AchievementStats(gelerntCount: 1));
    ach.debugReset();
    await ach.load();
    final unlocked = ach.status().where((v) => v.unlocked).map((v) => v.def.id);
    expect(unlocked, contains('firstCard'));
  });
}
