// Tests für den Notizen-Store — Port von tests/notes.test.js.

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/notes_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final store = NotesStore.instance;

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    store.debugReset();
    await store.load();
  });

  test('setNote / getNote / hasNote / count', () async {
    await store.setNote('koelsch', 'k-001', 'Merksatz');
    expect(store.getNote('koelsch', 'k-001'), 'Merksatz');
    expect(store.hasNote('koelsch', 'k-001'), isTrue);
    expect(store.count, 1);
  });

  test('leerer Text löscht die Notiz', () async {
    await store.setNote('a', 'b', 'x');
    await store.setNote('a', 'b', '   ');
    expect(store.getNote('a', 'b'), '');
    expect(store.count, 0);
  });

  test('kürzt auf maxLen', () async {
    await store.setNote('a', 'b', 'x' * 400);
    expect(store.getNote('a', 'b').length, NotesStore.maxLen);
  });

  test('all() ist unveränderlich', () async {
    await store.setNote('a', 'b', 'n');
    final all = store.all();
    expect(all['a.b'], 'n');
    expect(() => all['c'] = 'y', throwsUnsupportedError);
  });

  test('Persistenz über Reload', () async {
    await store.setNote('a', 'b', 'keep');
    store.debugReset();
    await store.load();
    expect(store.getNote('a', 'b'), 'keep');
  });
}
