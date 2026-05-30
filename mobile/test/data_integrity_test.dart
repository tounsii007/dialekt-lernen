// Integritätstests gegen das echte gebündelte Daten-Asset
// (mobile/assets/data/dialekte.json). Findet strukturelle Schwachstellen, die
// Favoriten, Quiz oder SRS brechen könnten: doppelte IDs, leere Pflichtfelder,
// ungültige Farben, kollidierende Favoriten-Schlüssel.

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/repository.dart';

final _hex = RegExp(r'^#[0-9a-fA-F]{6}$');

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final repo = DialektRepository.instance;

  setUpAll(() async {
    await repo.load();
  });

  test('lädt Dialekte und Ausdrücke', () {
    expect(repo.dialekte, isNotEmpty);
    expect(repo.totalAusdruecke, greaterThan(100));
  });

  test('Dialekt-IDs sind eindeutig', () {
    final ids = repo.dialekte.map((d) => d.id).toList();
    expect(ids.toSet().length, ids.length,
        reason: 'doppelte Dialekt-IDs: ${_dupes(ids)}');
  });

  test('jeder Dialekt hat id, name und gültige Hex-Farbe', () {
    for (final d in repo.dialekte) {
      expect(d.id, isNotEmpty);
      expect(d.name, isNotEmpty);
      expect(_hex.hasMatch(d.farbe), isTrue,
          reason: 'ungültige Farbe "${d.farbe}" bei ${d.id}');
    }
  });

  test('jeder Ausdruck hat id, ausdruck und hochdeutsch', () {
    for (final d in repo.dialekte) {
      for (final a in d.ausdruecke) {
        expect(a.id, isNotEmpty, reason: 'leere ID in ${d.id}');
        expect(a.ausdruck, isNotEmpty, reason: 'leerer Ausdruck ${a.id}');
        expect(a.hochdeutsch, isNotEmpty,
            reason: 'leere Übersetzung bei ${d.id}/${a.id}');
      }
    }
  });

  test('Ausdruck-IDs sind innerhalb eines Dialekts eindeutig', () {
    for (final d in repo.dialekte) {
      final ids = d.ausdruecke.map((a) => a.id).toList();
      expect(ids.toSet().length, ids.length,
          reason: 'doppelte Ausdruck-IDs in ${d.id}: ${_dupes(ids)}');
    }
  });

  test('globale Favoriten-Schlüssel "dialektId.ausdruckId" sind eindeutig', () {
    final keys = <String>[];
    for (final d in repo.dialekte) {
      for (final a in d.ausdruecke) {
        keys.add('${d.id}.${a.id}');
      }
    }
    expect(keys.toSet().length, keys.length,
        reason: 'kollidierende Favoriten-Schlüssel: ${_dupes(keys)}');
  });

  test('Quiz ist möglich: genug eindeutige Übersetzungen für Distraktoren', () {
    final meanings = repo.alleAusdruecke
        .map((a) => a.hochdeutsch.trim())
        .where((s) => s.isNotEmpty)
        .toSet();
    expect(meanings.length, greaterThanOrEqualTo(4),
        reason: 'Quiz braucht mind. 4 verschiedene Antwortoptionen');
  });

  test('kategorieIcon liefert nie leer (Fallback funktioniert)', () {
    for (final d in repo.dialekte) {
      for (final a in d.ausdruecke) {
        expect(repo.kategorieIcon(a.kategorie), isNotEmpty);
      }
    }
  });
}

String _dupes(List<String> xs) {
  final seen = <String>{};
  final dupes = <String>{};
  for (final x in xs) {
    if (!seen.add(x)) dupes.add(x);
  }
  return dupes.take(10).join(', ');
}
