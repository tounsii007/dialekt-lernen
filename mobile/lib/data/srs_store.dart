import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../util/fsrs.dart';
import '../util/fsrs_fuzz.dart';

/// Spaced-Repetition pro Karte — portiert von js/store/srs.js.
/// Unterstützt zwei Scheduler: den modernen FSRS-5 (Default, schlägt SM-2) und
/// das klassische SM-2 als verlustfreie Alternative. Records werden als Superset
/// gespeichert; FSRS-Records tragen zusätzlich difficulty/stability/state und
/// `sched:'fsrs'`. Persistiert als JSON-Map
/// { "dialektId.ausdruckId": {ef,reps,interval,due,lapses,last,[fsrs-Felder]} }.

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
    this.sched = 'sm2',
    this.difficulty = 0,
    this.stability = 0,
    this.state = 0,
  });

  double ef;
  int reps;
  int interval; // Tage
  int due; // Epoch-ms des nächsten Reviews
  int lapses;
  int last;
  String sched; // 'sm2' | 'fsrs'
  double difficulty; // FSRS (1..10)
  double stability; // FSRS (Tage)
  int state; // FSRS-Zustand (0..3)

  bool get isFsrs => sched == 'fsrs';

  Map<String, dynamic> toJson() => {
        'ef': ef,
        'reps': reps,
        'interval': interval,
        'due': due,
        'lapses': lapses,
        'last': last,
        // FSRS-Felder nur für FSRS-Records schreiben → SM-2-JSON bleibt schlank
        // und bleibt byte-identisch zu Altständen.
        if (sched == 'fsrs') ...{
          'sched': 'fsrs',
          'difficulty': difficulty,
          'stability': stability,
          'state': state,
        },
      };

  factory CardSrs.fromJson(Map<String, dynamic> j) => CardSrs(
        ef: (j['ef'] as num?)?.toDouble() ?? SrsStore.initEf,
        reps: (j['reps'] as num?)?.toInt() ?? 0,
        interval: (j['interval'] as num?)?.toInt() ?? 0,
        due: (j['due'] as num?)?.toInt() ?? 0,
        lapses: (j['lapses'] as num?)?.toInt() ?? 0,
        last: (j['last'] as num?)?.toInt() ?? 0,
        sched: (j['sched'] as String?) == 'fsrs' ? 'fsrs' : 'sm2',
        difficulty: (j['difficulty'] as num?)?.toDouble() ?? 0,
        stability: (j['stability'] as num?)?.toDouble() ?? 0,
        state: (j['state'] as num?)?.toInt() ?? 0,
      );
}

class SrsStore extends ChangeNotifier {
  SrsStore._();
  static final SrsStore instance = SrsStore._();

  static const String _prefsKey = 'dialekto.srs';
  static const String _configKey = 'dialekto.srs.config';
  static const double initEf = 2.5;
  static const double minEf = 1.3;
  static const int dayMs = 86400000;

  final Map<String, CardSrs> _cards = {};
  bool _loaded = false;

  // ── Scheduler-Konfiguration ──────────────────────────────────────────────
  String _scheduler = 'fsrs'; // 'fsrs' | 'sm2' — FSRS ist Default
  double _retention = 0.9; // Wunsch-Retention (0.7..0.97)
  bool _fuzz = true; // Intervall-Streuung / Load-Balancing

  bool get isLoaded => _loaded;
  int get learnedCount => _cards.values.where((c) => c.reps >= 1).length;
  int get reviewedTotal => _cards.length;

  String get scheduler => _scheduler;
  double get retention => _retention;
  bool get fuzzEnabled => _fuzz;

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
    _loadConfig(prefs);
    _loaded = true;
    notifyListeners();
  }

  void _loadConfig(SharedPreferences prefs) {
    final raw = prefs.getString(_configKey);
    if (raw == null || raw.isEmpty) return;
    try {
      final m = json.decode(raw) as Map<String, dynamic>;
      _scheduler = (m['scheduler'] as String?) == 'sm2' ? 'sm2' : 'fsrs';
      _retention = ((m['retention'] as num?)?.toDouble() ?? 0.9).clamp(0.7, 0.97);
      _fuzz = m['fuzz'] != false;
    } catch (_) {
      // Korrupte Config ignorieren — Defaults bleiben aktiv.
    }
  }

  /// Aktualisiert die Scheduler-Konfiguration (Teil-Patch) und persistiert.
  Future<void> setConfig({String? scheduler, double? retention, bool? fuzz}) async {
    if (scheduler != null) _scheduler = scheduler == 'sm2' ? 'sm2' : 'fsrs';
    if (retention != null) _retention = retention.clamp(0.7, 0.97);
    if (fuzz != null) _fuzz = fuzz;
    notifyListeners();
    await _persistConfig();
  }

  // ── SM-2 ───────────────────────────────────────────────────────────────

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

  // ── FSRS ─────────────────────────────────────────────────────────────────

  /// Baut eine FSRS-Karte aus dem gespeicherten Record. FSRS-Records direkt;
  /// ein SM-2-Record mit Fortschritt wird faul übersetzt (damit ein
  /// Scheduler-Wechsel den Lernstand nicht verwirft). Neukarte → null.
  FsrsCard? _fsrsCardFor(String key) {
    final v = _cards[key];
    if (v == null) return null;
    if (v.isFsrs) {
      return FsrsCard(
        difficulty: v.difficulty <= 0 ? 5 : v.difficulty,
        stability: v.stability < sMin ? sMin : v.stability,
        due: v.due,
        lastReview: v.last,
        reps: v.reps,
        lapses: v.lapses,
        state: v.state,
      );
    }
    if (v.reps > 0) {
      return FsrsCard(
        difficulty: (8.0 - (v.ef - minEf) * 3).clamp(1.0, 10.0),
        stability: math.max(v.interval.toDouble(), sMin),
        due: v.due,
        lastReview: v.last,
        reps: v.reps,
        lapses: v.lapses,
        state: stateReview,
      );
    }
    return null;
  }

  /// Verteilung künftig fälliger Karten auf Tages-Offsets (für Load-Balancing).
  Map<int, int> _dueDayHistogram(int now) {
    final hist = <int, int>{};
    _cards.forEach((_, c) {
      final day = ((c.due - now) / dayMs).round();
      if (day <= 0) return;
      hist[day] = (hist[day] ?? 0) + 1;
    });
    return hist;
  }

  /// Wendet FSRS für einen Grade (1..4) an und persistiert den Superset-Record.
  Future<CardSrs> reviewFsrs(String key, int grade, [int? nowMs]) async {
    final now = nowMs ?? DateTime.now().millisecondsSinceEpoch;
    final g = grade.clamp(1, 4);
    final prev = _fsrsCardFor(key);
    final res = schedule(prev, g, now, desiredRetention: _retention);
    final c = res.card;

    var interval = res.interval;
    var due = c.due;
    // Load-Balancing-Fuzz nur für echte Mehrtages-Intervalle.
    if (_fuzz && interval >= 3) {
      interval = applyFuzz(interval.toDouble(), load: _dueDayHistogram(now));
      due = now + interval * dayMs;
    }

    final record = CardSrs(
      ef: initEf, // Platzhalter für Legacy-Consumer
      reps: c.reps,
      interval: interval,
      due: due,
      lapses: c.lapses,
      last: now,
      sched: 'fsrs',
      difficulty: c.difficulty,
      stability: c.stability,
      state: c.state,
    );
    _cards[key] = record;
    notifyListeners();
    await _persist();
    return record;
  }

  static int _ratingToGrade(int rating) {
    if (rating == ratingEasy) return gradeEasy;
    if (rating == ratingMed) return gradeGood;
    return gradeAgain; // ratingHard → Again
  }

  static int _gradeToRating(int grade) {
    if (grade >= gradeEasy) return ratingEasy;
    if (grade >= gradeGood) return ratingMed;
    return ratingHard; // Again/Hard → Hard (SM-2-Lapse)
  }

  /// Scheduler-agnostischer Einstieg. Liefert die UI 4 Knöpfe, wird [grade]
  /// (1..4) übergeben; sonst mappt [rating] (1..3). Routet je nach Scheduler.
  Future<CardSrs> reviewScheduled(String key, {int? rating, int? grade, int? nowMs}) {
    if (_scheduler == 'fsrs') {
      final g = grade != null ? grade.clamp(1, 4) : _ratingToGrade(rating ?? ratingMed);
      return reviewFsrs(key, g, nowMs);
    }
    final r = rating ?? _gradeToRating(grade ?? gradeGood);
    return review(key, r);
  }

  /// Intervall-Vorschau (Tage) je Bewertung — für die Anki-Stil-Buttons.
  /// Nur im FSRS-Modus sinnvoll; im SM-2-Modus null.
  Map<int, int>? previewFor(String key, [int? nowMs]) {
    if (_scheduler != 'fsrs') return null;
    final now = nowMs ?? DateTime.now().millisecondsSinceEpoch;
    return previewIntervals(_fsrsCardFor(key), now, desiredRetention: _retention);
  }

  /// Geschätzte aktuelle Retrievability (0..1) — wie wahrscheinlich die Karte
  /// JETZT noch erinnert wird. Niedrig = dringend (für die Sortierung).
  double retrievabilityOf(String key, [int? nowMs]) {
    final c = _cards[key];
    if (c == null) return 1;
    final now = nowMs ?? DateTime.now().millisecondsSinceEpoch;
    final stability = c.isFsrs
        ? math.max(c.stability, sMin)
        : math.max(c.interval.toDouble(), sMin);
    final elapsed = math.max(0.0, (now - c.last) / dayMs);
    return retrievability(elapsed, stability);
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    final map = <String, dynamic>{};
    _cards.forEach((k, v) => map[k] = v.toJson());
    await prefs.setString(_prefsKey, json.encode(map));
  }

  Future<void> _persistConfig() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _configKey,
      json.encode(<String, dynamic>{
        'scheduler': _scheduler,
        'retention': _retention,
        'fuzz': _fuzz,
      }),
    );
  }

  @visibleForTesting
  void debugReset() {
    _cards.clear();
    _scheduler = 'fsrs';
    _retention = 0.9;
    _fuzz = true;
    _loaded = false;
  }
}
