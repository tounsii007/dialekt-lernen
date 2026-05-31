// Tests für die Idiom-Cluster-Heuristik — Port von tests/idiome.test.js.

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/models.dart';
import 'package:dialekto/util/idiome.dart';

DialektAusdruck p(String dId, String expr, String hd,
    {String kat = 'redensart'}) {
  final d = Dialekt.fromJson({'id': dId, 'name': dId, 'ausdruecke': const []});
  final a = Ausdruck.fromJson({
    'id': '$dId-x',
    'ausdruck': expr,
    'hochdeutsch': hd,
    'kategorie': kat,
  });
  return (dialekt: d, ausdruck: a);
}

void main() {
  test('gruppiert nach Keyword', () {
    final clusters = computeClusters([
      p('a', 'schwätze', 'viel reden'),
      p('b', 'nix', 'geht nicht'),
    ]);
    final ids = {for (final c in clusters) c.def.id};
    expect(ids.contains('reden-schwatzen'), isTrue);
    expect(ids.contains('verneinung'), isTrue);
  });

  test('ignoriert Nicht-Redensarten', () {
    final clusters = computeClusters([p('a', 'x', 'reden', kat: 'alltag')]);
    expect(clusters, isEmpty);
  });

  test('first-match-Priorität: spezifisch vor breit', () {
    // „nicht wahr" (fragen-anhang, früher) gewinnt vor „nicht" (verneinung).
    final clusters = computeClusters([p('a', 'gell', 'nicht wahr')]);
    expect(clusters.single.def.id, 'fragen-anhang');
  });

  test('Fallback-Cluster für Unzuordbares', () {
    final clusters = computeClusters([p('a', 'xy', 'Xylophon')]);
    expect(clusters.single.def.id, 'sonstige');
  });

  test('countRedensarten zählt nur Redensarten', () {
    final pairs = [
      p('a', 'x', 'reden'),
      p('b', 'y', 'Haus', kat: 'wohnen'),
    ];
    expect(countRedensarten(pairs), 1);
  });

  test('Cluster trackt Dialekt-Menge', () {
    final clusters = computeClusters([
      p('a', 'schwätze', 'viel reden'),
      p('b', 'babbele', 'viel reden'),
    ]);
    final c = clusters.firstWhere((c) => c.def.id == 'reden-schwatzen');
    expect(c.size, 2);
    expect(c.dialektIds.length, 2);
  });
}
