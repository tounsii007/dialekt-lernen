// Tests für die täglichen Lernziele (Port von js/store/goals.js).

import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/goals_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final goals = GoalsStore.instance;

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    goals.debugReset();
    await goals.load();
  });

  test('Standardziel ist 10', () {
    expect(goals.target, 10);
    expect(goals.todayProgress, 0);
    expect(goals.isMet, isFalse);
  });

  test('setTarget akzeptiert gültige Optionen, sonst Default', () async {
    await goals.setTarget(20);
    expect(goals.target, 20);
    await goals.setTarget(7); // ungültig
    expect(goals.target, 10);
  });

  test('increment erhöht den Tagesfortschritt und liefert den Stand', () async {
    expect(await goals.increment(), 1);
    expect(await goals.increment(3), 4);
    expect(goals.todayProgress, 4);
  });

  test('isMet und pct folgen Fortschritt/Ziel', () async {
    await goals.setTarget(5);
    await goals.increment(2);
    expect(goals.pct, closeTo(0.4, 1e-9));
    expect(goals.isMet, isFalse);
    await goals.increment(3);
    expect(goals.isMet, isTrue);
    expect(goals.pct, 1.0); // gedeckelt
  });

  test('history liefert die angefragte Anzahl Tage, heute zuletzt', () async {
    await goals.setTarget(5);
    await goals.increment(5);
    final h = goals.history(days: 14);
    expect(h.length, 14);
    expect(h.last.count, 5);
    expect(h.last.met, isTrue);
    expect(h.first.count, 0); // vor 13 Tagen nichts
  });

  test('Fortschritt persistiert über Reload', () async {
    await goals.setTarget(20);
    await goals.increment(7);
    goals.debugReset();
    await goals.load();
    expect(goals.target, 20);
    expect(goals.todayProgress, 7);
  });

  test('beschneidet auf die letzten 30 Tage', () async {
    // 31 alte Tage vorladen, dann heute hochzählen ⇒ ältester fällt raus.
    final progress = <String, int>{
      for (var i = 1; i <= 31; i++) '2020-1-$i': i,
    };
    SharedPreferences.setMockInitialValues(<String, Object>{
      'dialekto.goals': json.encode({'target': 10, 'progress': progress}),
    });
    goals.debugReset();
    await goals.load();
    expect(goals.trackedDays, 31);
    await goals.increment(); // +heute ⇒ 32 → auf 30 beschnitten
    expect(goals.trackedDays, 30);
  });
}
