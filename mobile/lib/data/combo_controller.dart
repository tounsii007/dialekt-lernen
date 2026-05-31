import 'package:flutter/foundation.dart';

/// Session-Combo / XP-Multiplikator — Port von js/util/combo.js.
/// Aufeinanderfolgende korrekte Reviews bauen eine Combo auf, die den XP-Gewinn
/// multipliziert. Ein Fehler bricht sie; eine lange Pause kühlt die Session ab
/// und startet neu. Bewusst NICHT persistiert — gilt nur innerhalb einer Sitzung.

const int comboTimeoutMs = 3 * 60 * 1000;

/// Schwellen (count ≥ at → mult), absteigend.
const List<({int at, double mult})> comboTiers = [
  (at: 12, mult: 2.0),
  (at: 8, mult: 1.75),
  (at: 5, mult: 1.5),
  (at: 3, mult: 1.25),
  (at: 0, mult: 1.0),
];

double comboMultiplier(int count) {
  final n = count < 0 ? 0 : count;
  for (final t in comboTiers) {
    if (n >= t.at) return t.mult;
  }
  return 1.0;
}

/// XP × Multiplikator, ganzzahlig gerundet und robust.
int applyComboToXp(int baseXp, double multiplier) {
  final b = baseXp < 0 ? 0 : baseXp;
  final m = (multiplier.isFinite && multiplier > 0) ? multiplier : 1.0;
  return (b * m).round();
}

/// Ergebnis eines registrierten Reviews.
class ComboHit {
  const ComboHit({
    required this.count,
    required this.multiplier,
    required this.broken,
    required this.tierUp,
    required this.best,
  });

  final int count;
  final double multiplier;
  final bool broken;
  final bool tierUp;
  final int best;
}

class ComboController extends ChangeNotifier {
  ComboController._();
  static final ComboController instance = ComboController._();

  int _count = 0;
  int _best = 0;
  int _lastAt = 0;

  int get count => _count;
  int get best => _best;
  double get multiplier => comboMultiplier(_count);

  /// Registriert ein Review. [correct]=false bricht die Combo.
  ComboHit registerHit(bool correct, [int? nowMs]) {
    final now = nowMs ?? DateTime.now().millisecondsSinceEpoch;
    if (!correct) {
      final wasActive = _count > 0;
      _count = 0;
      _lastAt = now;
      notifyListeners();
      return ComboHit(
        count: 0,
        multiplier: 1.0,
        broken: wasActive,
        tierUp: false,
        best: _best,
      );
    }

    final prevMult = comboMultiplier(_count);
    if (_lastAt != 0 && (now - _lastAt) > comboTimeoutMs) {
      _count = 1; // Session abgekühlt → frische Combo
    } else {
      _count += 1;
    }
    _lastAt = now;
    if (_count > _best) _best = _count;

    final mult = comboMultiplier(_count);
    notifyListeners();
    return ComboHit(
      count: _count,
      multiplier: mult,
      broken: false,
      tierUp: mult > prevMult,
      best: _best,
    );
  }

  /// Setzt die Combo zurück (neue Session).
  void reset() {
    _count = 0;
    _best = 0;
    _lastAt = 0;
    notifyListeners();
  }
}
