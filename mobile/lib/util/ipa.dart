/// Naive Deutsch→IPA-Konvertierung + heuristische Silbentrennung — Port von
/// js/util/ipa.js. Best-effort-Lernhilfe, kein 100%iges Linguistik-Werkzeug.
/// Reihenfolge der Regeln bewusst identisch zum Web (gleiche Ausgabe).
library;

// Mehr-Buchstaben-Regeln zuerst (Reihenfolge wie im Web).
const List<(String, String)> _rules = [
  ('sch', 'ʃ'),
  ('tsch', 't͡ʃ'),
  ('chs', 'ks'),
  ('ck', 'k'),
  ('qu', 'kv'),
  ('pf', 'p͡f'),
  ('ng', 'ŋ'),
  ('ie', 'iː'),
  ('ei', 'aɪ̯'),
  ('ai', 'aɪ̯'),
  ('eu', 'ɔɪ̯'),
  ('äu', 'ɔɪ̯'),
  ('au', 'aʊ̯'),
  ('ph', 'f'),
  ('th', 't'),
  ('ä', 'ɛ'),
  ('ö', 'œ'),
  ('ü', 'ʏ'),
  ('ß', 's'),
  ('z', 't͡s'),
  ('v', 'f'),
  ('w', 'v'),
  ('y', 'y'),
  ('j', 'j'),
  ('ch', 'x'),
];

const Map<String, List<(String, String)>> _dialectOverrides = {
  'schwizerduetsch': [('ch', 'χ'), ('k', 'kʰ')],
  'alemannisch': [('ch', 'χ')],
  'koelsch': [('g', 'j'), ('ch', 'ʃ')],
  'berlinisch': [('g', 'j')],
  'saechsisch': [('g', 'k'), ('t', 'd'), ('p', 'b')],
};

final RegExp _punct = RegExp(r'[!?.,;:„"]');
final RegExp _softCh = RegExp('([ɛɪei])x');
final RegExp _rVocal = RegExp(r'r(?=$| )');

/// Deutsch → naive IPA-Transkription (ohne Schrägstriche).
String toIpa(String word, [String? dialektId]) {
  if (word.isEmpty) return '';
  var s = word.toLowerCase().trim().replaceAll(_punct, '');

  final overrides = dialektId != null ? _dialectOverrides[dialektId] : null;
  if (overrides != null) {
    for (final (from, to) in overrides) {
      s = s.replaceAll(from, to);
    }
  }
  for (final (from, to) in _rules) {
    s = s.replaceAll(from, to);
  }
  // „weiches ch" nach hellen Vokalen → ç.
  s = s.replaceAllMapped(_softCh, (m) => '${m[1]}ç');
  // r am Wortende / vor Leerzeichen → ɐ (Vokalisierung).
  s = s.replaceAll(_rVocal, 'ɐ');
  return s.trim();
}

/// IPA mit Schrägstrich-Wrapper: formatIpa('Buch') → '/bux/'.
String formatIpa(String word, [String? dialektId]) =>
    '/${toIpa(word, dialektId)}/';

// ── Silbentrennung (heuristisch, maximaler Anlaut) ─────────────────────────

final RegExp _vowel = RegExp('[aeiouäöüyàáâéèêíìîóòôúùû]', caseSensitive: false);

const List<String> _onsets = [
  'schw', 'schl', 'schr', 'spr', 'str', 'spl',
  'sch', 'sp', 'st', 'sk',
  'ch', 'ck', 'ph', 'th', 'pf', 'qu',
  'pl', 'pr', 'bl', 'br', 'fl', 'fr', 'gl', 'gr', 'kl', 'kr', 'tr', 'dr',
  'gn', 'kn', 'zw', 'tw',
];

List<String> _syllabify(String w) {
  if (w.isEmpty || !_vowel.hasMatch(w)) return [w];
  final lower = w.toLowerCase();

  final runs = <List<int>>[];
  var i = 0;
  while (i < lower.length) {
    if (_vowel.hasMatch(lower[i])) {
      var j = i;
      while (j < lower.length && _vowel.hasMatch(lower[j])) {
        j++;
      }
      runs.add([i, j]);
      i = j;
    } else {
      i++;
    }
  }
  if (runs.length <= 1) return [w];

  final breaks = <int>[];
  for (var r = 1; r < runs.length; r++) {
    final clusterStart = runs[r - 1][1];
    final clusterEnd = runs[r][0];
    final cluster = lower.substring(clusterStart, clusterEnd);
    int breakPos;
    if (cluster.isEmpty) {
      breakPos = clusterEnd; // Hiatus
    } else {
      var onsetLen = 1;
      for (final o in _onsets) {
        if (o.length <= cluster.length &&
            cluster.substring(cluster.length - o.length) == o &&
            o.length > onsetLen) {
          onsetLen = o.length;
        }
      }
      breakPos = clusterEnd - onsetLen;
    }
    breaks.add(breakPos);
  }

  final parts = <String>[];
  var start = 0;
  for (final b in breaks) {
    if (b > start) {
      parts.add(w.substring(start, b));
      start = b;
    }
  }
  parts.add(w.substring(start));
  return parts.where((p) => p.isNotEmpty).toList();
}

/// Zerlegt Wort/Phrase in Silben (über Wortgrenzen hinweg flach).
List<String> splitSyllables(String text) {
  if (text.trim().isEmpty) return [];
  return text
      .trim()
      .split(RegExp(r'\s+'))
      .expand(_syllabify)
      .toList();
}
