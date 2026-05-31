// Tests für die FSRS-Integration im SrsStore: Scheduler-Wahl, 4-Button-Grades,
// Retention-Config, Vorschau, Persistenz und der verlustfreie SM-2→FSRS-Wechsel.

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/srs_store.dart';
import 'package:dialekto/util/fsrs.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final srs = SrsStore.instance;
  const key = 'hessisch.h-001';

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    srs.debugReset();
    await srs.load();
  });

  test('FSRS ist der Default-Scheduler', () {
    expect(srs.scheduler, 'fsrs');
    expect(srs.retention, 0.9);
    expect(srs.fuzzEnabled, isTrue);
  });

  test('reviewScheduled (FSRS) schreibt einen FSRS-Record', () async {
    final rec = await srs.reviewScheduled(key, grade: gradeGood);
    expect(rec.isFsrs, isTrue);
    expect(rec.sched, 'fsrs');
    expect(rec.stability, greaterThan(0));
    expect(rec.difficulty, inInclusiveRange(1, 10));
    expect(rec.reps, 1);
    expect(rec.due, greaterThan(DateTime.now().millisecondsSinceEpoch));
    expect(srs.isDue(key), isFalse);
  });

  test('previewFor: vier Intervalle (FSRS), null (SM-2)', () async {
    final p = srs.previewFor(key)!;
    for (final g in [gradeAgain, gradeHard, gradeGood, gradeEasy]) {
      expect(p[g]! >= 1, isTrue);
    }
    expect(p[gradeAgain]! <= p[gradeEasy]!, isTrue);

    await srs.setConfig(scheduler: 'sm2');
    expect(srs.previewFor(key), isNull);
  });

  test('Again hält Intervall klein; Easy auf Neukarte plant weiter', () async {
    final again = await srs.reviewFsrs(key, gradeAgain);
    expect(again.interval, 1);

    // Frische Neukarte (Prefs leeren), damit Easy nicht auf den Again-Record trifft.
    SharedPreferences.setMockInitialValues(<String, Object>{});
    srs.debugReset();
    await srs.load();
    final easy = await srs.reviewFsrs(key, gradeEasy);
    expect(easy.interval, greaterThan(again.interval));
  });

  test('setConfig klammert Retention und persistiert über Reload', () async {
    await srs.setConfig(retention: 0.99); // > 0.97 → geklammert
    expect(srs.retention, 0.97);
    await srs.setConfig(scheduler: 'sm2', fuzz: false, retention: 0.8);

    srs.debugReset();
    await srs.load();
    expect(srs.scheduler, 'sm2');
    expect(srs.retention, 0.8);
    expect(srs.fuzzEnabled, isFalse);
  });

  test('FSRS-Record persistiert über Reload', () async {
    await srs.reviewScheduled(key, grade: gradeGood);
    final before = srs.get(key)!;
    srs.debugReset();
    await srs.load();
    final after = srs.get(key)!;
    expect(after.isFsrs, isTrue);
    expect(after.stability, closeTo(before.stability, 1e-6));
    expect(after.difficulty, closeTo(before.difficulty, 1e-6));
    expect(after.state, before.state);
  });

  test('SM-2-Fortschritt wird beim Wechsel zu FSRS übernommen', () async {
    await srs.setConfig(scheduler: 'sm2');
    await srs.review(key, ratingEasy); // reps 1
    await srs.review(key, ratingEasy); // reps 2, interval 6
    final sm = srs.get(key)!;
    expect(sm.isFsrs, isFalse);
    expect(sm.reps, 2);

    await srs.setConfig(scheduler: 'fsrs');
    final rec = await srs.reviewScheduled(key, grade: gradeGood);
    expect(rec.isFsrs, isTrue);
    expect(rec.reps, 3); // Fortschritt zählt weiter
    expect(rec.stability, greaterThan(0));
  });

  test('SM-2 review bleibt unverändert funktionsfähig', () async {
    await srs.setConfig(scheduler: 'sm2');
    final rec = await srs.review(key, ratingEasy);
    expect(rec.isFsrs, isFalse);
    expect(rec.reps, 1);
    expect(rec.interval, 1);
  });

  test('retrievabilityOf: frisch ~1, fällt mit der Zeit', () async {
    final now = DateTime.now().millisecondsSinceEpoch;
    await srs.reviewFsrs(key, gradeGood, now);
    final fresh = srs.retrievabilityOf(key, now);
    final later = srs.retrievabilityOf(key, now + 30 * SrsStore.dayMs);
    expect(fresh, greaterThan(0.99));
    expect(later, lessThan(fresh));
  });
}
