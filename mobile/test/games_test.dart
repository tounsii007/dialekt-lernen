// Tests für die reine Spiel-Logik (Memory-Deck, Blitz-Fragen).

import 'dart:math';

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/models.dart';
import 'package:dialekto/util/games.dart';

DialektAusdruck p(String dId, String expr, String hd) {
  final d = Dialekt.fromJson({'id': dId, 'name': dId, 'ausdruecke': const []});
  final a = Ausdruck.fromJson(
      {'id': '$dId-$hd', 'ausdruck': expr, 'hochdeutsch': hd});
  return (dialekt: d, ausdruck: a);
}

void main() {
  final pool = [
    p('a', 'Bub', 'Junge'),
    p('b', 'Knab', 'Junge'), // doppeltes Hochdeutsch
    p('c', 'Mädsche', 'Mädchen'),
    p('d', 'Haisle', 'Häuschen'),
    p('e', 'Gosch', 'Mund'),
    p('f', 'Hax', 'Bein'),
  ];

  test('uniqueByHochdeutsch entfernt doppelte Übersetzungen', () {
    final u = uniqueByHochdeutsch(pool);
    final hds = u.map((x) => x.ausdruck.hochdeutsch.toLowerCase()).toList();
    expect(hds.toSet().length, hds.length);
    expect(u.length, 5); // 'Junge' nur einmal
  });

  test('buildMemoryCards: 2 Karten je Paar, je eine Seite', () {
    final u = uniqueByHochdeutsch(pool);
    final cards = buildMemoryCards(u, 4, Random(1));
    expect(cards.length, 8);
    for (var i = 0; i < 4; i++) {
      final ofPair = cards.where((c) => c.pairId == i).toList();
      expect(ofPair.length, 2);
      expect(ofPair.where((c) => c.isDialekt).length, 1);
      expect(ofPair.where((c) => !c.isDialekt).length, 1);
    }
  });

  test('buildMemoryCards zieht nicht mehr als verfügbar', () {
    final u = uniqueByHochdeutsch(pool);
    final cards = buildMemoryCards(u, 100, Random(1));
    expect(cards.length, u.length * 2);
  });

  test('buildBlitzQuestion: n Optionen, korrekter Index, enthält Lösung', () {
    final u = uniqueByHochdeutsch(pool);
    final correct = u.firstWhere((x) => x.ausdruck.hochdeutsch == 'Mund');
    final q = buildBlitzQuestion(u, correct, Random(2));
    expect(q.options.length, 4);
    expect(q.prompt, 'Gosch');
    expect(q.options[q.correctIndex], 'Mund');
    expect(q.options.toSet().length, 4); // keine Duplikate
  });

  test('buildBlitzQuestion: kleiner Pool → so viele Optionen wie möglich', () {
    final small = [p('a', 'x', 'Eins'), p('b', 'y', 'Zwei')];
    final q = buildBlitzQuestion(small, small[0], Random(3));
    expect(q.options.length, 2);
    expect(q.options[q.correctIndex], 'Eins');
  });
}
