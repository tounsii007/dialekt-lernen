// Tests für die Vergleichs-Gruppierung — Port von tests/comparison.test.js.

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/models.dart';
import 'package:dialekto/util/comparison.dart';

DialektAusdruck pair(
  String dId,
  String hd, {
  String kat = 'alltag',
  String ausdruck = 'x',
}) {
  final d = Dialekt.fromJson({'id': dId, 'name': dId, 'ausdruecke': const []});
  final a = Ausdruck.fromJson({
    'id': '$dId-1',
    'ausdruck': ausdruck,
    'hochdeutsch': hd,
    'kategorie': kat,
  });
  return (dialekt: d, ausdruck: a);
}

void main() {
  test('gruppiert gleiche Bedeutung über Dialekte', () {
    final groups = buildComparison([
      pair('a', 'Junge', ausdruck: 'Bub'),
      pair('b', 'Junge', ausdruck: 'Knab'),
    ]);
    expect(groups.length, 1);
    expect(groups.first.size, 2);
    expect(groups.first.head, 'Junge');
  });

  test('nur ein Ausdruck pro Dialekt pro Gruppe', () {
    final groups = buildComparison([
      pair('a', 'Junge', ausdruck: 'Bub'),
      pair('a', 'Junge', ausdruck: 'Bua'), // selber Dialekt → ignoriert
      pair('b', 'Junge', ausdruck: 'Knab'),
    ]);
    expect(groups.length, 1);
    expect(groups.first.size, 2);
  });

  test('minSize filtert Einzelgruppen', () {
    final groups = buildComparison([
      pair('a', 'Junge'),
      pair('b', 'Junge'),
      pair('a', 'Mädchen'), // nur 1 Dialekt
    ]);
    expect(groups.length, 1);
    expect(groups.first.head, 'Junge');
  });

  test('Token-Overlap merged Varianten (Umstellung), aber nicht schwache', () {
    final merged = buildComparison([
      pair('a', 'der Junge'),
      pair('b', 'Junge der'),
    ]);
    expect(merged.length, 1);
    expect(merged.first.size, 2);

    final split = buildComparison([
      pair('a', 'kleiner Junge'),
      pair('b', 'Junge'),
    ], minSize: 1);
    expect(split.length, 2);
  });

  test('Kopf wird auf Trenner gesplittet', () {
    final g = buildComparison([
      pair('a', 'Kartoffel / Erdapfel'),
      pair('b', 'Kartoffel'),
    ]);
    expect(g.length, 1);
    expect(g.first.head, 'Kartoffel');
  });

  test('sortiert nach Gruppengröße absteigend', () {
    final g = buildComparison([
      pair('a', 'Junge'),
      pair('b', 'Junge'),
      pair('c', 'Junge'),
      pair('a', 'Haus'),
      pair('b', 'Haus'),
    ]);
    expect(g.first.head, 'Junge');
    expect(g.first.size, 3);
    expect(g.last.size, 2);
  });

  test('filterByKategorie', () {
    final g = buildComparison([
      pair('a', 'Junge', kat: 'menschen'),
      pair('b', 'Junge', kat: 'menschen'),
      pair('a', 'Haus', kat: 'wohnen'),
      pair('b', 'Haus', kat: 'wohnen'),
    ]);
    expect(filterByKategorie(g, 'all').length, 2);
    final menschen = filterByKategorie(g, 'menschen');
    expect(menschen.length, 1);
    expect(menschen.first.head, 'Junge');
  });
}
