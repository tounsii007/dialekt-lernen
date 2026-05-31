import '../data/models.dart';

/// Aggregiert äquivalente Ausdrücke quer über alle Dialekte — Port von
/// js/util/comparison.js. Gruppiert nach normalisierter Hochdeutsch-Übersetzung
/// (Token-Overlap ≥ 0.6 als Fallback für leichte Varianten).
///
/// Zur Performance bei vielen Tausend Ausdrücken nutzt diese Portierung einen
/// invertierten Token-Index: Statt jeden Kopf gegen ALLE bestehenden Gruppen zu
/// prüfen (O(n²)), werden nur Kandidaten verglichen, die mindestens ein Token
/// teilen — bei identischer „first-match"-Semantik wie das Web-Original.

typedef DialektAusdruck = ({Dialekt dialekt, Ausdruck ausdruck});

String _normalize(String s) {
  var t = s.toLowerCase();
  const map = {
    'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss',
    'á': 'a', 'à': 'a', 'â': 'a', 'é': 'e', 'è': 'e', 'ê': 'e',
  };
  map.forEach((k, v) => t = t.replaceAll(k, v));
  return t.trim();
}

Set<String> _tokenSet(String s) => _normalize(s)
    .split(RegExp(r'\s+'))
    .where((w) => w.length >= 3)
    .toSet();

double _similarity(String a, String b) {
  if (a == b) return 1;
  final setA = _tokenSet(a);
  final setB = _tokenSet(b);
  if (setA.isEmpty || setB.isEmpty) return 0;
  var hits = 0;
  for (final t in setA) {
    if (setB.contains(t)) hits++;
  }
  return hits / (setA.length > setB.length ? setA.length : setB.length);
}

/// Eine Gruppe gleichbedeutender Ausdrücke verschiedener Dialekte.
class CompareGroup {
  CompareGroup({required this.head, required this.kategorie});

  final String head; // Hochdeutsch-Kopf (Anzeige)
  final String kategorie;
  final List<DialektAusdruck> items = [];

  int get size => items.length;
}

/// Splittet auf den ersten Bedeutungs-Kopf (vor /, Komma, Gedanken-/Bindestrich).
final RegExp _headSplit = RegExp('[/,–-]+');

/// Gruppiert [pairs] nach ähnlicher Hochdeutsch-Übersetzung. Nur Gruppen mit
/// mindestens [minSize] Dialekten, absteigend nach Größe.
List<CompareGroup> buildComparison(
  List<DialektAusdruck> pairs, {
  int minSize = 2,
}) {
  final groups = <CompareGroup>[];
  final byExactHead = <String, int>{};
  final tokenIndex = <String, List<int>>{};

  for (final p in pairs) {
    final head = p.ausdruck.hochdeutsch.split(_headSplit).first.trim();
    if (head.isEmpty) continue;
    final tokens = _tokenSet(head);

    // Kandidaten in Erstell-Reihenfolge (exakter Kopf + Token-Index).
    final candidates = <int>{};
    final exact = byExactHead[head];
    if (exact != null) candidates.add(exact);
    for (final t in tokens) {
      final idxs = tokenIndex[t];
      if (idxs != null) candidates.addAll(idxs);
    }
    final sorted = candidates.toList()..sort();

    int? targetIdx;
    for (final gi in sorted) {
      if (_similarity(head, groups[gi].head) >= 0.6) {
        targetIdx = gi;
        break;
      }
    }

    if (targetIdx == null) {
      final gi = groups.length;
      final g = CompareGroup(head: head, kategorie: p.ausdruck.kategorie);
      g.items.add(p);
      groups.add(g);
      byExactHead.putIfAbsent(head, () => gi);
      for (final t in tokens) {
        (tokenIndex[t] ??= []).add(gi);
      }
    } else {
      final g = groups[targetIdx];
      // Nur ein Ausdruck pro Dialekt pro Gruppe.
      if (!g.items.any((x) => x.dialekt.id == p.dialekt.id)) {
        g.items.add(p);
      }
    }
  }

  final out = groups.where((g) => g.size >= minSize).toList();
  out.sort((a, b) => b.size - a.size);
  return out;
}

/// Filtert Gruppen nach Kategorie ('all'/leer → alle).
List<CompareGroup> filterByKategorie(
  List<CompareGroup> groups,
  String kategorie,
) {
  if (kategorie.isEmpty || kategorie == 'all') return groups;
  return groups.where((g) => g.kategorie == kategorie).toList();
}
