// Tests für den Decks-Store — Port von tests/decks.test.js.

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/decks_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final store = DecksStore.instance;

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    store.debugReset();
    await store.load();
  });

  test('createDeck legt an; decks neueste zuerst', () async {
    final a = await store.createDeck(name: 'A');
    final b = await store.createDeck(name: 'B');
    expect(store.count, 2);
    expect(store.decks.first.id, b);
    expect(store.getDeck(a)!.name, 'A');
  });

  test('addToDeck dedupliziert; removeFromDeck', () async {
    final id = await store.createDeck(name: 'X');
    const ref = (dialektId: 'koelsch', id: 'k-001');
    expect(await store.addToDeck(id, ref), isTrue);
    expect(await store.addToDeck(id, ref), isFalse); // Duplikat
    expect(store.deckSize(id), 1);
    expect(store.contains(id, ref), isTrue);
    expect(await store.removeFromDeck(id, ref), isTrue);
    expect(store.deckSize(id), 0);
  });

  test('updateDeck Name/Farbe', () async {
    final id = await store.createDeck(name: 'Alt');
    await store.updateDeck(id, name: 'Neu', color: '#ff0000');
    expect(store.getDeck(id)!.name, 'Neu');
    expect(store.getDeck(id)!.color, '#ff0000');
  });

  test('deleteDeck entfernt', () async {
    final id = await store.createDeck(name: 'Weg');
    expect(await store.deleteDeck(id), isTrue);
    expect(store.getDeck(id), isNull);
  });

  test('leerer Name → Default', () async {
    final id = await store.createDeck(name: '   ');
    expect(store.getDeck(id)!.name, 'Unbenanntes Deck');
  });

  test('Persistenz über Reload', () async {
    final id = await store.createDeck(name: 'Persist');
    await store.addToDeck(id, (dialektId: 'd', id: 'a'));

    store.debugReset();
    await store.load();
    expect(store.count, 1);
    final d = store.decks.first;
    expect(d.name, 'Persist');
    expect(d.size, 1);
    expect(d.expressionIds.first.dialektId, 'd');
    expect(d.expressionIds.first.id, 'a');
  });
}
