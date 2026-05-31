import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../util/seeded_random.dart';
import 'xp_store.dart';

/// Tägliche Quests (Duolingo-Style) — portiert von js/store/quests.js.
/// Drei Quests pro Tag, deterministisch per Kalendertag rotierend, mit garantiert
/// drei verschiedenen Metriken. Fortschritt wird über [trackFromReason] aus dem
/// Lern-Flow gespeist. Bei Abschluss gibt es XP, bei allen erledigten den Bonus.
/// Persistiert als JSON { day, progress:{id:count}, completed:[ids], allDoneBonus }.

class QuestDef {
  const QuestDef({
    required this.id,
    required this.label,
    required this.hint,
    required this.metric,
    required this.target,
    required this.xp,
  });

  final String id;
  final String label;
  final String hint;
  final String metric;
  final int target;
  final int xp;
}

const List<QuestDef> questPool = [
  QuestDef(id: 'review-10', label: '10 Karten wiederholen', hint: 'Dranbleiben zahlt sich aus.', metric: 'review', target: 10, xp: 30),
  QuestDef(id: 'review-25', label: '25 Karten wiederholen', hint: 'Ein ordentlicher Lern-Block.', metric: 'review', target: 25, xp: 60),
  QuestDef(id: 'learn-5', label: '5 neue Ausdrücke lernen', hint: 'Frischer Wortschatz.', metric: 'learn', target: 5, xp: 40),
  QuestDef(id: 'learn-10', label: '10 neue Ausdrücke lernen', hint: 'Heute wächst dein Dialekt-Schatz.', metric: 'learn', target: 10, xp: 70),
  QuestDef(id: 'xp-100', label: '100 XP sammeln', hint: 'Egal womit — Hauptsache fleißig.', metric: 'xp', target: 100, xp: 40),
  QuestDef(id: 'xp-200', label: '200 XP sammeln', hint: 'Ein produktiver Tag.', metric: 'xp', target: 200, xp: 70),
  QuestDef(id: 'quiz-1', label: 'Ein Quiz meistern', hint: 'Wissen unter Beweis stellen.', metric: 'quiz', target: 1, xp: 30),
  QuestDef(id: 'quiz-3', label: 'Drei Quizze meistern', hint: 'Quiz-Marathon.', metric: 'quiz', target: 3, xp: 60),
  QuestDef(id: 'perfect-1', label: 'Ein perfektes Quiz', hint: 'Alle Antworten richtig.', metric: 'quizPerfect', target: 1, xp: 50),
  QuestDef(id: 'game-1', label: 'Ein Mini-Spiel gewinnen', hint: 'Memory & Co.', metric: 'game', target: 1, xp: 30),
];

const int dailyQuestCount = 3;
const int allDoneBonusXp = 50;

/// Eine aktive Quest samt aktuellem Fortschritt (für die UI).
class QuestView {
  const QuestView({
    required this.def,
    required this.current,
    required this.done,
  });

  final QuestDef def;
  final int current; // gekappt auf target
  final bool done;

  double get pct => def.target > 0 ? (current / def.target).clamp(0.0, 1.0) : 0.0;
}

class QuestsSummary {
  const QuestsSummary({
    required this.total,
    required this.done,
    required this.allDone,
    required this.bonusClaimed,
  });

  final int total;
  final int done;
  final bool allDone;
  final bool bonusClaimed;
}

class QuestsStore extends ChangeNotifier {
  QuestsStore._();
  static final QuestsStore instance = QuestsStore._();

  static const String _prefsKey = 'dialekto.quests';

  String? _day;
  final Map<String, int> _progress = {};
  final List<String> _completed = [];
  bool _allDoneBonus = false;
  bool _loaded = false;

  bool get isLoaded => _loaded;

  /// Kalendertag als "YYYY-MM-DD" (mit führenden Nullen — wie quests.js).
  static String dayKey([DateTime? now]) {
    final d = now ?? DateTime.now();
    final m = d.month.toString().padLeft(2, '0');
    final day = d.day.toString().padLeft(2, '0');
    return '${d.year}-$m-$day';
  }

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null && raw.isNotEmpty) {
      try {
        final map = json.decode(raw) as Map<String, dynamic>;
        _day = map['day'] as String?;
        _progress.clear();
        final p = map['progress'];
        if (p is Map) {
          p.forEach((k, v) {
            if (v is num) _progress['$k'] = v.toInt();
          });
        }
        _completed
          ..clear()
          ..addAll(
            (map['completed'] as List?)?.whereType<String>() ??
                const <String>[],
          );
        _allDoneBonus = map['allDoneBonus'] == true;
      } catch (_) {
        // Korrupte Daten ignorieren.
      }
    }
    _loaded = true;
    _rollDay();
    notifyListeners();
  }

  /// Setzt bei Tageswechsel Fortschritt/Bonus zurück. Liefert den heutigen Key.
  String _rollDay() {
    final day = dayKey();
    if (_day != day) {
      _day = day;
      _progress.clear();
      _completed.clear();
      _allDoneBonus = false;
    }
    return day;
  }

  /// Die drei Tages-Quests (deterministisch, garantiert verschiedene Metriken).
  List<QuestDef> dailyQuests() {
    final day = _rollDay();
    final rng = SeededRandom(seedFromString(day));

    // Eindeutige Metriken in Pool-Reihenfolge, dann Fisher-Yates-Shuffle.
    final metrics = <String>[];
    for (final q in questPool) {
      if (!metrics.contains(q.metric)) metrics.add(q.metric);
    }
    for (var i = metrics.length - 1; i > 0; i--) {
      final j = (rng.next() * (i + 1)).floor();
      final tmp = metrics[i];
      metrics[i] = metrics[j];
      metrics[j] = tmp;
    }
    final chosen = metrics.take(
      dailyQuestCount < metrics.length ? dailyQuestCount : metrics.length,
    );

    return [
      for (final metric in chosen)
        () {
          final variants = questPool.where((q) => q.metric == metric).toList();
          return variants[(rng.next() * variants.length).floor()];
        }(),
    ];
  }

  QuestView _viewFor(QuestDef def) {
    final raw = _progress[def.id] ?? 0;
    return QuestView(
      def: def,
      current: raw > def.target ? def.target : raw,
      done: raw >= def.target,
    );
  }

  List<QuestView> activeWithProgress() =>
      [for (final q in dailyQuests()) _viewFor(q)];

  QuestsSummary summary() {
    final active = activeWithProgress();
    final done = active.where((q) => q.done).length;
    return QuestsSummary(
      total: active.length,
      done: done,
      allDone: active.isNotEmpty && done == active.length,
      bonusClaimed: _allDoneBonus,
    );
  }

  /// Erhöht alle aktiven Quests der Metrik [metric] um [amount]; schaltet bei
  /// Erreichen des Ziels XP frei und vergibt einmalig den Abschluss-Bonus.
  Future<void> trackMetric(String metric, [int amount = 1]) async {
    if (amount <= 0) return;
    _rollDay();
    final active = dailyQuests();
    var dirty = false;
    for (final q in active) {
      if (q.metric != metric) continue;
      if (_completed.contains(q.id)) continue;
      final next = (_progress[q.id] ?? 0) + amount;
      _progress[q.id] = next;
      dirty = true;
      if (next >= q.target) {
        _completed.add(q.id);
        await XpStore.instance.award(q.xp, 'quest-${q.id}');
      }
    }
    if (!_allDoneBonus &&
        active.isNotEmpty &&
        active.every((q) => _completed.contains(q.id))) {
      _allDoneBonus = true;
      dirty = true;
      await XpStore.instance.award(allDoneBonusXp, 'quest-bonus');
    }
    if (dirty) {
      notifyListeners();
      await _persist();
    }
  }

  /// XP-Reason → Quest-Metriken (Port von reasonToMetrics). Eigene Belohnungs-
  /// Reasons (quest-/challenge-) werden ignoriert, damit sich nichts aufschaukelt.
  static List<({String metric, int amount})> reasonToMetrics(
    String reason,
    int amount,
  ) {
    final out = <({String metric, int amount})>[];
    switch (reason) {
      case 'card-learned':
        out.add((metric: 'learn', amount: 1));
        out.add((metric: 'review', amount: 1));
      case 'card-reviewed':
        out.add((metric: 'review', amount: 1));
      case 'quiz-correct':
        out.add((metric: 'quiz', amount: 1));
      case 'quiz-perfect':
        out.add((metric: 'quizPerfect', amount: 1));
      case 'memory-win':
        out.add((metric: 'game', amount: 1));
    }
    if (amount > 0 &&
        !reason.startsWith('quest-') &&
        !reason.startsWith('challenge-')) {
      out.add((metric: 'xp', amount: amount));
    }
    return out;
  }

  /// Bequemer Hook für den Lern-Flow: übersetzt einen XP-Reason in Metriken
  /// und trackt sie.
  Future<void> trackFromReason(String reason, int amount) async {
    for (final m in reasonToMetrics(reason, amount)) {
      await trackMetric(m.metric, m.amount);
    }
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _prefsKey,
      json.encode(<String, dynamic>{
        'day': _day,
        'progress': _progress,
        'completed': _completed,
        'allDoneBonus': _allDoneBonus,
      }),
    );
  }

  Future<void> reload() async {
    _loaded = false;
    await load();
  }

  @visibleForTesting
  int progressOf(String id) => _progress[id] ?? 0;

  @visibleForTesting
  bool get allDoneBonus => _allDoneBonus;

  @visibleForTesting
  void debugReset() {
    _day = null;
    _progress.clear();
    _completed.clear();
    _allDoneBonus = false;
    _loaded = false;
  }
}
