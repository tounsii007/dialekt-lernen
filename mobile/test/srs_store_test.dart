// Tests für die SM-2 Spaced-Repetition-Logik.

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/srs_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final srs = SrsStore.instance;
  const key = 'hessisch.h-001';

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    srs.debugReset();
    await srs.load();
  });

  test('neue Karte ist fällig und neu', () {
    expect(srs.isNew(key), isTrue);
    expect(srs.isDue(key), isTrue);
    expect(srs.get(key), isNull);
  });

  test('Leicht-Bewertung: reps=1, interval=1, nicht mehr sofort fällig', () async {
    await srs.review(key, ratingEasy);
    final c = srs.get(key)!;
    expect(c.reps, 1);
    expect(c.interval, 1);
    expect(c.due, greaterThan(DateTime.now().millisecondsSinceEpoch));
    expect(srs.isDue(key), isFalse);
  });

  test('Intervall-Progression bei wiederholtem Leicht: 1 → 6 → ~6*ef', () async {
    await srs.review(key, ratingEasy); // reps1 → interval 1
    expect(srs.get(key)!.interval, 1);
    await srs.review(key, ratingEasy); // reps2 → interval 6
    expect(srs.get(key)!.interval, 6);
    await srs.review(key, ratingEasy); // reps3 → round(6*ef)
    expect(srs.get(key)!.reps, 3);
    expect(srs.get(key)!.interval, greaterThan(6));
  });

  test('Schwer-Bewertung: Lapse setzt reps zurück, erhöht lapses', () async {
    await srs.review(key, ratingEasy);
    await srs.review(key, ratingEasy);
    await srs.review(key, ratingHard);
    final c = srs.get(key)!;
    expect(c.reps, 0);
    expect(c.interval, 1);
    expect(c.lapses, 1);
  });

  test('EF bleibt >= 1.3 auch nach vielen Schwer-Bewertungen', () async {
    for (var i = 0; i < 12; i++) {
      await srs.review(key, ratingHard);
    }
    expect(srs.get(key)!.ef, greaterThanOrEqualTo(1.3));
  });

  test('EF steigt bei Leicht, sinkt bei Schwer', () async {
    await srs.review(key, ratingEasy);
    final efAfterEasy = srs.get(key)!.ef;
    expect(efAfterEasy, greaterThan(2.5));

    srs.debugReset();
    await srs.load();
    await srs.review(key, ratingHard);
    expect(srs.get(key)!.ef, lessThan(2.5));
  });

  test('Lernstand persistiert über Reload', () async {
    await srs.review(key, ratingEasy);
    await srs.review(key, ratingEasy);

    srs.debugReset();
    await srs.load();

    final c = srs.get(key);
    expect(c, isNotNull);
    expect(c!.reps, 2);
    expect(c.interval, 6);
  });

  test('dueCount zählt neue + fällige Karten', () async {
    final keys = ['a.1', 'a.2', 'a.3'];
    expect(srs.dueCount(keys), 3); // alle neu
    await srs.review('a.1', ratingEasy);
    expect(srs.dueCount(keys), 2); // a.1 jetzt geplant
  });

  test('learnedCount zählt Karten mit reps >= 1', () async {
    await srs.review('a.1', ratingEasy);
    await srs.review('a.2', ratingHard); // reps bleibt 0 (Lapse)
    expect(srs.learnedCount, 1);
  });
}
