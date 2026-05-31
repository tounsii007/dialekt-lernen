import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// XP- & Level-System — portiert von js/store/xp.js.
/// Sammelt Punkte für jede Lernaktion, steigt in Levels auf, persistiert als
/// JSON { "total": int, "log": [ {amount, reason, ts} ] } (max. 50 Log-Einträge).

/// Kumulierte XP-Schwelle, ab der Level [n] abgeschlossen ist (→ Aufstieg).
/// Lv1 endet bei 100, Lv2 bei 300, Lv3 bei 600 …
int xpForLevel(int n) => 50 * n * (n + 1);

/// Aktuell erreichtes Level. Lv1 = [0,100), Lv2 = [100,300) …
int levelForXp(int xp) {
  var lvl = 1;
  while (xp >= xpForLevel(lvl)) {
    lvl++;
  }
  return lvl;
}

/// Fortschritt innerhalb des aktuellen Levels.
class LevelProgress {
  const LevelProgress({
    required this.level,
    required this.current,
    required this.needed,
    required this.progress,
  });

  final int level;
  final int current; // XP im aktuellen Level
  final int needed; // XP-Spanne dieses Levels
  final double progress; // 0..1
}

LevelProgress xpToNextLevel(int xp) {
  final lvl = levelForXp(xp);
  final base = lvl > 1 ? xpForLevel(lvl - 1) : 0;
  final needed = xpForLevel(lvl);
  final span = needed - base;
  final current = xp - base;
  return LevelProgress(
    level: lvl,
    current: current,
    needed: span,
    progress: span > 0 ? (current / span).clamp(0.0, 1.0) : 0.0,
  );
}

/// XP-Werte je Aktion (entspricht XP in js/store/xp.js).
abstract final class XpReward {
  static const int cardLearned = 10;
  static const int cardReviewed = 5;
  static const int quizCorrect = 8;
  static const int quizPerfect = 50;
  static const int streakDay = 20;
  static const int achievement = 100;
  static const int dialectVisit = 15;
  static const int noteWritten = 3;
}

const List<String> levelTitles = [
  '', // 0 — ungenutzt
  'Lehrling', // 1
  'Entdecker', // 2
  'Mundartfan', // 3
  'Dialektkenner', // 4
  'Sprachforscher', // 5
  'Mundartmeister', // 6
  'Dialektprofi', // 7
  'Sprachgenie', // 8
  'Dialektlegende', // 9
  'Meister der Mundarten', // 10+
];

String levelTitle(int level) {
  final i = level.clamp(1, levelTitles.length - 1);
  return levelTitles[i];
}

class XpLogEntry {
  const XpLogEntry({
    required this.amount,
    required this.reason,
    required this.ts,
  });

  final int amount;
  final String reason;
  final int ts; // Epoch-ms

  Map<String, dynamic> toJson() => {
        'amount': amount,
        'reason': reason,
        'ts': ts,
      };

  factory XpLogEntry.fromJson(Map<String, dynamic> j) => XpLogEntry(
        amount: (j['amount'] as num?)?.toInt() ?? 0,
        reason: (j['reason'] as String?) ?? '',
        ts: (j['ts'] as num?)?.toInt() ?? 0,
      );
}

/// Ergebnis einer XP-Vergabe — für Level-Up-Celebration.
class XpAward {
  const XpAward({
    required this.total,
    required this.levelUp,
    required this.level,
  });

  final int total;
  final bool levelUp;
  final int level;
}

class XpStore extends ChangeNotifier {
  XpStore._();
  static final XpStore instance = XpStore._();

  static const String _prefsKey = 'dialekto.xp';
  static const int _maxLog = 50;

  int _total = 0;
  final List<XpLogEntry> _log = [];
  bool _loaded = false;

  bool get isLoaded => _loaded;
  int get total => _total;
  int get level => levelForXp(_total);
  String get title => levelTitle(level);
  LevelProgress get progress => xpToNextLevel(_total);

  List<XpLogEntry> log({int limit = 10}) =>
      _log.take(limit < 0 ? 0 : limit).toList(growable: false);

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null && raw.isNotEmpty) {
      try {
        final map = json.decode(raw) as Map<String, dynamic>;
        _total = (map['total'] as num?)?.toInt() ?? 0;
        _log.clear();
        final entries = map['log'];
        if (entries is List) {
          for (final e in entries) {
            if (e is Map<String, dynamic>) _log.add(XpLogEntry.fromJson(e));
          }
        }
      } catch (_) {
        // Korrupte Daten ignorieren — XP startet bei 0.
      }
    }
    _loaded = true;
    notifyListeners();
  }

  /// Vergibt [amount] XP mit Grund [reason], hält das Log bei max. 50 Einträgen
  /// und meldet einen etwaigen Level-Aufstieg.
  Future<XpAward> award(int amount, String reason) async {
    final before = _total;
    _total += amount;
    _log.insert(
      0,
      XpLogEntry(
        amount: amount,
        reason: reason,
        ts: DateTime.now().millisecondsSinceEpoch,
      ),
    );
    if (_log.length > _maxLog) _log.removeRange(_maxLog, _log.length);

    final levelUp = levelForXp(_total) > levelForXp(before);
    notifyListeners();
    await _persist();
    return XpAward(total: _total, levelUp: levelUp, level: levelForXp(_total));
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    final map = <String, dynamic>{
      'total': _total,
      'log': _log.map((e) => e.toJson()).toList(),
    };
    await prefs.setString(_prefsKey, json.encode(map));
  }

  @visibleForTesting
  void debugReset() {
    _total = 0;
    _log.clear();
    _loaded = false;
  }
}
