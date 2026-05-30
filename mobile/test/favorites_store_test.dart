// Tests für den persistenten Favoriten-Store (shared_preferences).
// Probt: Persistenz über "Sessions", Dedupe, Toggle-Idempotenz, Schlüsselformat.

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/favorites_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final store = FavoritesStore.instance;

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    store.debugReset();
    await store.load();
  });

  test('startet leer', () {
    expect(store.count, 0);
    expect(store.isFavorite('hessisch', 'h-001'), isFalse);
  });

  test('toggle fügt hinzu und entfernt (Idempotenz)', () async {
    final added = await store.toggle('hessisch', 'h-001');
    expect(added, isTrue);
    expect(store.isFavorite('hessisch', 'h-001'), isTrue);
    expect(store.count, 1);

    final removed = await store.toggle('hessisch', 'h-001');
    expect(removed, isFalse);
    expect(store.isFavorite('hessisch', 'h-001'), isFalse);
    expect(store.count, 0);
  });

  test('persistiert über eine "Session" hinweg (reset + reload)', () async {
    await store.toggle('bayerisch', 'b-002');
    expect(store.count, 1);

    // Simuliere Neustart: In-Memory leeren, dann erneut aus Prefs laden.
    store.debugReset();
    await store.load();

    expect(store.isFavorite('bayerisch', 'b-002'), isTrue,
        reason: 'Favorit muss aus den Prefs wiederhergestellt werden');
    expect(store.count, 1);
  });

  test('schreibt den korrekten Schlüssel in die Prefs', () async {
    await store.toggle('koelsch', 'k-003');
    final prefs = await SharedPreferences.getInstance();
    expect(prefs.getStringList('dialekto.favoriten'), contains('koelsch.k-003'));
  });

  test('dedupliziert beim Laden (doppelte Schlüssel in Prefs)', () async {
    SharedPreferences.setMockInitialValues(<String, Object>{
      'dialekto.favoriten': <String>['a.1', 'a.1', 'b.2'],
    });
    store.debugReset();
    await store.load();
    expect(store.count, 2, reason: 'Set entfernt Duplikate');
  });

  test('mehrere Favoriten unabhängig', () async {
    await store.toggle('hessisch', 'h-001');
    await store.toggle('bayerisch', 'b-001');
    expect(store.count, 2);
    await store.toggle('hessisch', 'h-001');
    expect(store.count, 1);
    expect(store.isFavorite('bayerisch', 'b-001'), isTrue);
  });

  test('load ist idempotent', () async {
    await store.toggle('saechsisch', 's-001');
    await store.load(); // erneuter Aufruf darf nichts ändern
    expect(store.count, 1);
  });
}
