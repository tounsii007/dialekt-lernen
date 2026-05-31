// Tests für die Statistik-Datenquellen: SrsStore.stats + StreakStore.heatmap.

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/srs_store.dart';
import 'package:dialekto/data/streak_store.dart';
import 'package:dialekto/util/fsrs.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('SrsStore.stats', () {
    final srs = SrsStore.instance;
    setUp(() async {
      SharedPreferences.setMockInitialValues(<String, Object>{});
      srs.debugReset();
      await srs.load();
    });

    test('zählt fresh / learning / learned', () async {
      final keys = ['a.1', 'a.2', 'a.3', 'a.4'];
      // a.2: angefangen (1× Good → reps 1)
      await srs.reviewScheduled('a.2', grade: gradeGood);
      // a.3: gemeistert (SM-2: reps 2, interval 6)
      await srs.setConfig(scheduler: 'sm2');
      await srs.review('a.3', ratingEasy);
      await srs.review('a.3', ratingEasy);
      await srs.setConfig(scheduler: 'fsrs');

      final s = srs.stats(keys);
      expect(s.total, 4);
      expect(s.fresh, 2); // a.1, a.4
      expect(s.learning, 1); // a.2
      expect(s.learned, 1); // a.3
    });

    test('due zählt keine frischen Karten; geplante sind nicht fällig', () async {
      await srs.reviewScheduled('x.1', grade: gradeGood);
      final s = srs.stats(['x.1', 'x.2']);
      expect(s.due, 0); // x.1 in Zukunft geplant, x.2 frisch (zählt nicht)
      expect(s.fresh, 1); // x.2
    });

    test('leeches ab Lapse-Schwelle', () async {
      await srs.setConfig(scheduler: 'sm2');
      for (var i = 0; i < SrsStore.leechLapses; i++) {
        await srs.review('leech.1', ratingHard); // jede Hard-Bewertung ein Lapse
      }
      final s = srs.stats(['leech.1']);
      expect(s.leeches, 1);
    });
  });

  group('StreakStore.heatmap', () {
    final streak = StreakStore.instance;
    setUp(() async {
      SharedPreferences.setMockInitialValues(<String, Object>{});
      streak.debugReset();
      await streak.load();
    });

    test('liefert weeks*7 Tage, neuester = heute, chronologisch', () {
      final now = DateTime(2026, 5, 31);
      final hm = streak.heatmap(weeks: 4, now: now);
      expect(hm.length, 28);
      expect(hm.last.date.year, 2026);
      expect(hm.last.date.month, 5);
      expect(hm.last.date.day, 31);
      expect(hm.first.date.isBefore(hm.last.date), isTrue);
    });

    test('spiegelt registrierte Aktivität', () async {
      final now = DateTime(2026, 5, 31);
      await streak.register(now);
      final hm = streak.heatmap(weeks: 2, now: now);
      expect(hm.last.count, greaterThan(0));
      expect(hm.last.active, isTrue);
      expect(hm[hm.length - 2].count, 0); // Vortag ohne Aktivität
    });
  });
}
