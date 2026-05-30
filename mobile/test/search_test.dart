// Tests für die Volltextsuche (normalize + search gegen echte Daten).

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/data/repository.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final repo = DialektRepository.instance;

  setUpAll(() => repo.load());

  group('normalize', () {
    test('Kleinschreibung + Umlaut-/ß-Faltung', () {
      expect(DialektRepository.normalize('Grüße ÄÖÜ'), 'grusse aou');
    });
    test('trimmt Leerraum', () {
      expect(DialektRepository.normalize('  Moin  '), 'moin');
    });
  });

  group('search', () {
    test('leere Query liefert keine Treffer', () {
      final r = repo.search('   ');
      expect(r.dialekte, isEmpty);
      expect(r.ausdruecke, isEmpty);
    });

    test('findet Dialekt nach Namensteil', () {
      final r = repo.search('bayer');
      expect(r.dialekte.any((d) => d.id == 'bayerisch'), isTrue);
    });

    test('findet Ausdrücke (umlaut-insensitiv)', () {
      final r = repo.search('hallo');
      expect(r.ausdruecke, isNotEmpty);
    });

    test('respektiert das Limit', () {
      final r = repo.search('e', limit: 5);
      expect(r.ausdruecke.length, lessThanOrEqualTo(5));
    });
  });
}
