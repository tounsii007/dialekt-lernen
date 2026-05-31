/// Deterministischer Seed-RNG — Port von js/util/random.js.
/// LCG (Numerical Recipes): gleicher Seed ⇒ gleiche Folge. Genutzt für die
/// tagesdeterministische Quest-Auswahl (und später Spiele).
class SeededRandom {
  SeededRandom(int seed) : _s = seed & 0xFFFFFFFF;

  int _s;

  /// Nächster Wert in [0, 1).
  double next() {
    _s = (_s * 1664525 + 1013904223) & 0xFFFFFFFF;
    return _s / 0x100000000;
  }

  /// Index in [0, length).
  int nextInt(int length) => (next() * length).floor();
}

/// Hash eines Strings → 32-Bit-Seed (gleiche Formel wie quests.js daySeed).
int seedFromString(String s) {
  var h = 0;
  for (var i = 0; i < s.length; i++) {
    h = (h * 31 + s.codeUnitAt(i)) & 0xFFFFFFFF;
  }
  return h == 0 ? 1 : h;
}
