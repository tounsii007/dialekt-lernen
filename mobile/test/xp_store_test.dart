// Tests für das XP- & Level-System (Port von js/store/xp.js).

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/xp_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final xp = XpStore.instance;

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    xp.debugReset();
    await xp.load();
  });

  group('xpForLevel', () {
    test('kumulierte Schwellen folgen 50*n*(n+1)', () {
      expect(xpForLevel(1), 100);
      expect(xpForLevel(2), 300);
      expect(xpForLevel(3), 600);
      expect(xpForLevel(4), 1000);
    });
  });

  group('levelForXp', () {
    test('Grenzen je Level', () {
      expect(levelForXp(0), 1);
      expect(levelForXp(99), 1);
      expect(levelForXp(100), 2);
      expect(levelForXp(299), 2);
      expect(levelForXp(300), 3);
    });
  });

  group('xpToNextLevel', () {
    test('Start: Level 1, 0/100', () {
      final p = xpToNextLevel(0);
      expect(p.level, 1);
      expect(p.current, 0);
      expect(p.needed, 100);
      expect(p.progress, 0.0);
    });

    test('Mitte Level 1: 50/100 → 0.5', () {
      final p = xpToNextLevel(50);
      expect(p.level, 1);
      expect(p.current, 50);
      expect(p.needed, 100);
      expect(p.progress, closeTo(0.5, 1e-9));
    });

    test('Levelgrenze 100: Level 2, 0/200', () {
      final p = xpToNextLevel(100);
      expect(p.level, 2);
      expect(p.current, 0);
      expect(p.needed, 200);
      expect(p.progress, 0.0);
    });
  });

  group('levelTitle', () {
    test('bekannte Titel', () {
      expect(levelTitle(1), 'Lehrling');
      expect(levelTitle(5), 'Sprachforscher');
      expect(levelTitle(10), 'Meister der Mundarten');
    });

    test('clamped: hohe Level → letzter Titel, 0 → erster echter Titel', () {
      expect(levelTitle(99), 'Meister der Mundarten');
      expect(levelTitle(0), 'Lehrling');
    });
  });

  test('award summiert XP und liefert Gesamtstand', () async {
    final a = await xp.award(XpReward.cardReviewed, 'card-reviewed');
    expect(a.total, 5);
    expect(xp.total, 5);
    await xp.award(XpReward.quizPerfect, 'quiz-perfect');
    expect(xp.total, 55);
  });

  test('award meldet Level-Up beim Überschreiten der Schwelle', () async {
    final a1 = await xp.award(90, 'a');
    expect(a1.levelUp, isFalse);
    expect(a1.level, 1);
    final a2 = await xp.award(20, 'b'); // 90 → 110 ⇒ Level 2
    expect(a2.levelUp, isTrue);
    expect(a2.level, 2);
  });

  test('Log ist neueste-zuerst und bei 50 Einträgen gedeckelt', () async {
    for (var i = 0; i < 60; i++) {
      await xp.award(1, 'r$i');
    }
    final log = xp.log(limit: 100);
    expect(log.length, 50);
    expect(log.first.reason, 'r59'); // jüngster zuerst
    expect(xp.total, 60);
  });

  test('XP & Log persistieren über Reload', () async {
    await xp.award(120, 'big');
    xp.debugReset();
    await xp.load();
    expect(xp.total, 120);
    expect(xp.level, 2);
    expect(xp.log().first.reason, 'big');
  });

  test('Getter title spiegelt aktuelles Level', () async {
    expect(xp.title, 'Lehrling');
    await xp.award(100, 'lvlup'); // → Level 2
    expect(xp.level, 2);
    expect(xp.title, 'Entdecker');
  });
}
