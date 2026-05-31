import 'dart:math' as math;

/// Intervall-Fuzz + Load-Balancing für den FSRS-Scheduler. Dart-Port von
/// js/util/fsrs-fuzz.js.
///
/// Ohne Streuung landen alle Karten einer Session immer wieder am selben Tag —
/// die tägliche Last schaukelt sich zu Spitzen auf. Wir streuen jedes Intervall
/// in einem Fenster, dessen Breite mit dem Intervall wächst, und wählen darin
/// (wenn eine Lastverteilung vorliegt) den am WENIGSTEN ausgelasteten Tag —
/// deterministisch und damit gut testbar.

class FuzzRangeDef {
  const FuzzRangeDef({required this.start, required this.end, required this.factor});
  final double start;
  final double end;
  final double factor;
}

const List<FuzzRangeDef> fuzzRanges = [
  FuzzRangeDef(start: 2.5, end: 7.0, factor: 0.15),
  FuzzRangeDef(start: 7.0, end: 20.0, factor: 0.1),
  FuzzRangeDef(start: 20.0, end: double.infinity, factor: 0.05),
];

/// Mindest-Intervall, ab dem überhaupt gestreut wird.
const double fuzzMinInterval = 2.5;

int _roundedDays(double ivl) {
  if (!ivl.isFinite) return 1;
  return math.max(1, ivl.round());
}

/// Ganzzahliges [min, max]-Tagesfenster für ein Intervall — rein, ohne Zufall.
({int min, int max}) fuzzRange(double interval) {
  final ivl = interval;
  if (!ivl.isFinite || ivl < fuzzMinInterval) {
    final r = _roundedDays(ivl);
    return (min: r, max: r);
  }
  var delta = 1.0;
  for (final range in fuzzRanges) {
    delta += range.factor * math.max(math.min(ivl, range.end) - range.start, 0.0);
  }
  var min = (ivl - delta).round();
  var max = (ivl + delta).round();
  min = math.max(2, min);
  max = math.max(min, max);
  return (min: min, max: max);
}

/// Streut ein Intervall (Tage) innerhalb seines Fuzz-Fensters.
///
/// [enable] aus → gerundetes Intervall ohne Streuung. [load] (Tag-Offset →
/// Anzahl terminierter Reviews) aktiviert das Load-Balancing; Gleichstand
/// zugunsten des Tags näher am Ideal-Intervall. Ohne [load] wird [rng] genutzt.
int applyFuzz(
  double interval, {
  bool enable = true,
  Map<int, int>? load,
  double Function()? rng,
}) {
  final ivl = interval;
  if (!enable || !ivl.isFinite || ivl < fuzzMinInterval) {
    return _roundedDays(ivl);
  }
  final range = fuzzRange(ivl);
  final min = range.min;
  final max = range.max;
  if (max <= min) return min;

  if (load != null) {
    var bestDay = min;
    var bestCount = 1 << 30; // ~Unendlich
    var bestDist = double.infinity;
    for (var d = min; d <= max; d++) {
      final count = load[d] ?? 0;
      final dist = (d - ivl).abs();
      if (count < bestCount || (count == bestCount && dist < bestDist)) {
        bestDay = d;
        bestCount = count;
        bestDist = dist;
      }
    }
    return bestDay;
  }

  final rnd = rng ?? math.Random().nextDouble;
  final r = math.min(0.999999, math.max(0.0, rnd()));
  return min + (r * (max - min + 1)).floor();
}
