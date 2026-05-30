import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// SM-2 Spaced-Repetition pro Karte — portiert von js/store/srs.js.
/// Persistiert als JSON-Map { "dialektId.ausdruckId": {ef,reps,interval,due,lapses,last} }.

const int ratingHard = 1;
const int ratingMed = 2;
const int ratingEasy = 3;

class CardSrs {
  CardSrs({
    required this.ef,
    required this.reps,
    required this.interval,
    required this.due,
    required this.lapses,
    required this.last,
  });

  double ef;
  int reps;
  int interval; // Tage
  int due; // Epoch-ms des nächsten Reviews
  int lapses;
  int last;

  Map<String, dynamic> toJson() => {
        'ef': ef,
        'reps': reps,
        'interval': interval,
        'due': due,
        'lapses': lapses,
        'last': last,
      };

  factory CardSrs.fromJson(Map<String, dynamic> j) => CardSrs(
        ef: (j['ef'] as num?)?.toDouble() ?? SrsStore.initEf,
        reps: (j['reps'] as num?)?.toInt() ?? 0,
        interval: (j['interval'] as num?)?.toInt() ?? 0,
        due: (j['due'] as num?)?.toInt() ?? 0,
        lapses: (j['lapses'] as num?)?.toInt() ?? 0,
        last: (j['last'] as num?)?.toInt() ?? 0,
      );
}

class SrsStore extends ChangeNotifier {
  SrsStore._();
  static final SrsStore instance = SrsStore._();

  static const String _prefsKey = 'dialekto.srs';
  static const double initEf = 2.5;
  static const double minEf = 1.3;
  static const int dayMs = 86400000;

  final Map<String, CardSrs> _cards = {};
  bool _loaded = false;

  bool get isLoaded => _loaded;
  int get learnedCount => _cards.values.where((c) => c.reps >= 1).length;
  int get reviewedTotal => _cards.length;

  CardSrs? get(String key) => _cards[key];

  /// Eine Karte ist fällig, wenn sie neu ist (kein Record) oder ihr due-Datum
  /// erreicht wurde.
  bool isDue(String key, [int? nowMs]) {
    final c = _cards[key];
    if (c == null) return true;
    return c.due <= (nowMs ?? DateTime.now().millisecondsSinceEpoch);
  }

  bool isNew(String key) => !_cards.containsKey(key);

  int dueCount(Iterable<String> keys) {
    final now = DateTime.now().millisecondsSinceEpoch;
    return keys.where((k) => isDue(k, now)).length;
  }

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null && raw.isNotEmpty) {
      try {
        final map = json.decode(raw) as Map<String, dynamic>;
        _cards.clear();
        map.forEach((k, v) {
          _cards[k] = CardSrs.fromJson(v as Map<String, dynamic>);
        });
      } catch (_) {
        // Korrupte Daten ignorieren — Lernstand startet leer.
      }
    }
    _loaded = true;
    notifyListeners();
  }

  static int _quality(int rating) => switch (rating) {
        ratingEasy => 5,
        ratingMed => 3,
        _ => 2,
      };

  /// Wendet SM-2 an, plant die nächste Fälligkeit und persistiert.
  Future<CardSrs> review(String key, int rating) async {
    final q = _quality(rating);
    final prev = _cards[key] ??
        CardSrs(ef: initEf, reps: 0, interval: 0, due: 0, lapses: 0, last: 0);

    var ef = prev.ef;
    var reps = prev.reps;
    var interval = prev.interval;
    var lapses = prev.lapses;

    if (q < 3) {
      reps = 0;
      interval = 1;
      lapses += 1;
    } else {
      reps += 1;
      if (reps == 1) {
        interval = 1;
      } else if (reps == 2) {
        interval = 6;
      } else {
        interval = math.max(1, (interval * ef).round());
      }
    }
    ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (ef < minEf) ef = minEf;

    final now = DateTime.now().millisecondsSinceEpoch;
    final record = CardSrs(
      ef: double.parse(ef.toStringAsFixed(3)),
      reps: reps,
      interval: interval,
      due: now + interval * dayMs,
      lapses: lapses,
      last: now,
    );
    _cards[key] = record;
    notifyListeners();
    await _persist();
    return record;
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    final map = <String, dynamic>{};
    _cards.forEach((k, v) => map[k] = v.toJson());
    await prefs.setString(_prefsKey, json.encode(map));
  }

  @visibleForTesting
  void debugReset() {
    _cards.clear();
    _loaded = false;
  }
}
