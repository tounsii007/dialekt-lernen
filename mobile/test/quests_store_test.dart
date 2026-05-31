// Tests für den Quests-Store — Port von tests/quests.test.js.
// Prüft Tagesschlüssel-Padding, deterministische Auswahl, Fortschritts-Kappung,
// XP-Vergabe ohne Doppelzählung, Abschluss-Bonus und reasonToMetrics.

import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/quests_store.dart';
import 'package:dialekto/data/xp_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final quests = QuestsStore.instance;
  final xp = XpStore.instance;

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    xp.debugReset();
    quests.debugReset();
    await xp.load();
    await quests.load();
  });

  test('dayKey paddet Monat und Tag auf zwei Stellen', () {
    expect(QuestsStore.dayKey(DateTime(2026, 5, 31)), '2026-05-31');
    expect(QuestsStore.dayKey(DateTime(2026, 1, 5)), '2026-01-05');
    expect(QuestsStore.dayKey(DateTime(2026, 12, 9)), '2026-12-09');
  });

  test('dailyQuests liefert 3 verschiedene Metriken, deterministisch', () {
    final a = quests.dailyQuests();
    expect(a.length, 3);
    expect(a.map((q) => q.metric).toSet().length, 3);

    final b = quests.dailyQuests().map((q) => q.id).toList();
    expect(a.map((q) => q.id).toList(), b);
  });

  test('Fortschritt kappt, Abschluss vergibt XP, kein Doppelzählen', () async {
    final first = quests.dailyQuests().first;

    await quests.trackMetric(first.metric, first.target + 5);
    final view = quests
        .activeWithProgress()
        .firstWhere((v) => v.def.id == first.id);
    expect(view.current, first.target); // gekappt
    expect(view.done, true);
    expect(xp.total, first.xp); // genau einmal vergeben

    // Erneutes Tracken derselben Metrik darf nichts mehr gutschreiben.
    final afterComplete = xp.total;
    await quests.trackMetric(first.metric, 5);
    expect(xp.total, afterComplete);

    // Nicht-positive Beträge werden ignoriert.
    await quests.trackMetric(first.metric, 0);
    expect(xp.total, afterComplete);
  });

  test('Alle-erledigt-Bonus genau einmal', () async {
    final active = quests.dailyQuests();
    for (final q in active) {
      await quests.trackMetric(q.metric, q.target);
    }
    expect(quests.allDoneBonus, true);

    final summary = quests.summary();
    expect(summary.allDone, true);
    expect(summary.bonusClaimed, true);
    expect(summary.done, summary.total);

    final expectedXp =
        active.fold<int>(0, (a, q) => a + q.xp) + allDoneBonusXp;
    expect(xp.total, expectedXp);

    // Weiteres Tracken vergibt den Bonus nicht erneut.
    await quests.trackMetric(active.first.metric, active.first.target);
    expect(xp.total, expectedXp);
  });

  test('reasonToMetrics bildet Reasons korrekt ab', () {
    expect(QuestsStore.reasonToMetrics('card-learned', 10), <({String metric, int amount})>[
      (metric: 'learn', amount: 1),
      (metric: 'review', amount: 1),
      (metric: 'xp', amount: 10),
    ]);
    expect(QuestsStore.reasonToMetrics('card-reviewed', 5), <({String metric, int amount})>[
      (metric: 'review', amount: 1),
      (metric: 'xp', amount: 5),
    ]);
    expect(QuestsStore.reasonToMetrics('quiz-correct', 8), <({String metric, int amount})>[
      (metric: 'quiz', amount: 1),
      (metric: 'xp', amount: 8),
    ]);
    expect(QuestsStore.reasonToMetrics('quiz-perfect', 50), <({String metric, int amount})>[
      (metric: 'quizPerfect', amount: 1),
      (metric: 'xp', amount: 50),
    ]);
    expect(QuestsStore.reasonToMetrics('memory-win', 30), <({String metric, int amount})>[
      (metric: 'game', amount: 1),
      (metric: 'xp', amount: 30),
    ]);
    // Unbekannter Reason → nur XP.
    expect(QuestsStore.reasonToMetrics('whatever', 7), <({String metric, int amount})>[
      (metric: 'xp', amount: 7),
    ]);
    // Eigene Belohnungs-Reasons werden ignoriert (kein Aufschaukeln).
    expect(QuestsStore.reasonToMetrics('quest-review-10', 30), const <({String metric, int amount})>[]);
    expect(QuestsStore.reasonToMetrics('challenge-foo', 30), const <({String metric, int amount})>[]);
    // Nicht-positiver Betrag → kein XP-Eintrag.
    expect(QuestsStore.reasonToMetrics('card-learned', 0), <({String metric, int amount})>[
      (metric: 'learn', amount: 1),
      (metric: 'review', amount: 1),
    ]);
  });

  test('summary im Startzustand', () {
    final s = quests.summary();
    expect(s.total, 3);
    expect(s.done, 0);
    expect(s.allDone, false);
    expect(s.bonusClaimed, false);
  });

  test('Tageswechsel setzt Fortschritt beim Laden zurück', () async {
    SharedPreferences.setMockInitialValues(<String, Object>{
      'dialekto.quests': json.encode(<String, dynamic>{
        'day': '2000-01-01',
        'progress': <String, int>{'review-10': 5},
        'completed': <String>['review-10'],
        'allDoneBonus': true,
      }),
    });
    quests.debugReset();
    await quests.load();
    expect(quests.progressOf('review-10'), 0);
    expect(quests.allDoneBonus, false);
  });
}
