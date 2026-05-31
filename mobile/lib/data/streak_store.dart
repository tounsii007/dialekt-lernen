import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Tages-Streak: konsekutive Lerntage zählen — Kern portiert von
/// js/store/streak.js (Schutz-Mechaniken Freeze/Repair/Amulett folgen später).
/// Persistiert als JSON { "count": int, "lastDay": "Y-M-D"?, "days": {key:int} }.
///
/// Tages-Arithmetik läuft über DateTime.utc (Mitternacht), damit DST-Übergänge
/// (23h/25h-Tage) nicht auf das falsche Datum kippen.
class StreakStore extends ChangeNotifier {
  StreakStore._();
  static final StreakStore instance = StreakStore._();

  static const String _prefsKey = 'dialekto.streak';

  int _count = 0;
  String? _lastDay;
  final Map<String, int> _days = {};
  bool _loaded = false;

  bool get isLoaded => _loaded;
  int get count => _count;
  String? get lastDay => _lastDay;
  int get activeDays => _days.length;
  Map<String, int> get days => Map.unmodifiable(_days);

  static String _dayKey(DateTime d) => '${d.year}-${d.month}-${d.day}';

  static DateTime _parse(String key) {
    final p = key.split('-');
    return DateTime.utc(int.parse(p[0]), int.parse(p[1]), int.parse(p[2]));
  }

  /// Ganztägige Differenz b − a; bei fehlendem Wert „unendlich".
  static int _dayDiff(String? a, String? b) {
    if (a == null || b == null) return 1 << 30;
    return _parse(b).difference(_parse(a)).inDays;
  }

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null && raw.isNotEmpty) {
      try {
        final map = json.decode(raw) as Map<String, dynamic>;
        _count = (map['count'] as num?)?.toInt() ?? 0;
        _lastDay = map['lastDay'] as String?;
        _days.clear();
        final d = map['days'];
        if (d is Map) {
          d.forEach((k, v) {
            if (v is num) _days['$k'] = v.toInt();
          });
        }
      } catch (_) {
        // Korrupte Daten ignorieren — Streak startet bei 0.
      }
    }
    _loaded = true;
    notifyListeners();
  }

  /// Markiert [now] (Default: heute) als aktiven Lerntag und aktualisiert die
  /// Serie: +1 bei lückenlosem Folgetag, Reset auf 1 bei Lücke. Gibt den neuen
  /// Streak-Zählerstand zurück.
  Future<int> register([DateTime? now]) async {
    final today = _dayKey(now ?? DateTime.now());
    final wasActive = _days.containsKey(today);
    _days[today] = (_days[today] ?? 0) + 1;

    if (_lastDay == today) {
      if (!wasActive) {
        notifyListeners();
        await _persist();
      }
      return _count;
    }

    final diff = _dayDiff(_lastDay, today);
    if (_lastDay == null) {
      if (_count == 0) _count = 1;
    } else if (diff == 1) {
      _count += 1;
    } else if (diff > 1) {
      _count = 1; // Lücke → Serie reißt (ohne Schutz-Items)
    } else {
      if (_count == 0) _count = 1; // diff <= 0 (z. B. Rückdatierung)
    }

    _lastDay = today;
    notifyListeners();
    await _persist();
    return _count;
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _prefsKey,
      json.encode(<String, dynamic>{
        'count': _count,
        'lastDay': _lastDay,
        'days': _days,
      }),
    );
  }

  @visibleForTesting
  void debugReset() {
    _count = 0;
    _lastDay = null;
    _days.clear();
    _loaded = false;
  }
}
