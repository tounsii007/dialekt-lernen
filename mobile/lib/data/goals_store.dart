import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Tägliche Lernziele — portiert von js/store/goals.js.
/// User wählt ein Tagesziel (5/10/20/50 Karten); der Fortschritt wird pro Tag
/// getrackt (Key "Y-M-D") und auf die letzten 30 Tage beschränkt.
/// Persistiert als JSON { "target": int, "progress": {key:int} }.

const List<int> goalOptions = [5, 10, 20, 50];
const int defaultGoal = 10;

/// Ein Tageseintrag für die Verlaufsanzeige.
class DayProgress {
  const DayProgress({
    required this.date,
    required this.count,
    required this.met,
  });

  final DateTime date;
  final int count;
  final bool met;
}

class GoalsStore extends ChangeNotifier {
  GoalsStore._();
  static final GoalsStore instance = GoalsStore._();

  static const String _prefsKey = 'dialekto.goals';
  static const int _maxDays = 30;

  int _target = defaultGoal;
  final Map<String, int> _progress = {};
  bool _loaded = false;

  bool get isLoaded => _loaded;
  List<int> get options => goalOptions;
  int get target => _target;
  int get todayProgress => _progress[_dayKey(DateTime.now())] ?? 0;
  bool get isMet => todayProgress >= _target;
  double get pct => _target > 0 ? (todayProgress / _target).clamp(0.0, 1.0) : 0.0;

  static String _dayKey(DateTime d) => '${d.year}-${d.month}-${d.day}';

  // YYYY-M-D ohne Null-Polsterung → chronologisch sortierbare Ordnungszahl,
  // damit beim Beschneiden die ältesten (nicht lexikografisch kleinsten) gehen.
  static int _ord(String key) {
    final p = key.split('-');
    final y = int.tryParse(p.isNotEmpty ? p[0] : '') ?? 0;
    final m = int.tryParse(p.length > 1 ? p[1] : '') ?? 0;
    final d = int.tryParse(p.length > 2 ? p[2] : '') ?? 0;
    return y * 10000 + m * 100 + d;
  }

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null && raw.isNotEmpty) {
      try {
        final map = json.decode(raw) as Map<String, dynamic>;
        final t = (map['target'] as num?)?.toInt();
        _target = (t != null && goalOptions.contains(t)) ? t : defaultGoal;
        _progress.clear();
        final p = map['progress'];
        if (p is Map) {
          p.forEach((k, v) {
            if (v is num) _progress['$k'] = v.toInt();
          });
        }
      } catch (_) {
        // Korrupte Daten ignorieren — Ziel startet auf Default.
      }
    }
    _loaded = true;
    notifyListeners();
  }

  Future<void> setTarget(int n) async {
    _target = goalOptions.contains(n) ? n : defaultGoal;
    notifyListeners();
    await _persist();
  }

  /// Erhöht den heutigen Fortschritt um [by], beschneidet auf 30 Tage und
  /// liefert den neuen Tagesstand.
  Future<int> increment([int by = 1]) async {
    final key = _dayKey(DateTime.now());
    _progress[key] = (_progress[key] ?? 0) + by;
    if (_progress.length > _maxDays) {
      final keys = _progress.keys.toList()
        ..sort((a, b) => _ord(a) - _ord(b)); // alt → neu
      for (final k in keys.take(keys.length - _maxDays)) {
        _progress.remove(k);
      }
    }
    notifyListeners();
    await _persist();
    return _progress[key] ?? 0;
  }

  /// Fortschritt der letzten [days] Tage (ältester zuerst), DST-sicher über
  /// Kalender-Arithmetik.
  List<DayProgress> history({int days = 14}) {
    final now = DateTime.now();
    final out = <DayProgress>[];
    for (var i = days - 1; i >= 0; i--) {
      final d = DateTime(now.year, now.month, now.day - i);
      final count = _progress[_dayKey(d)] ?? 0;
      out.add(DayProgress(date: d, count: count, met: count >= _target));
    }
    return out;
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _prefsKey,
      json.encode(<String, dynamic>{'target': _target, 'progress': _progress}),
    );
  }

  Future<void> reload() async {
    _loaded = false;
    await load();
  }

  @visibleForTesting
  int get trackedDays => _progress.length;

  @visibleForTesting
  void debugReset() {
    _target = defaultGoal;
    _progress.clear();
    _loaded = false;
  }
}
