// Tests für Export/Import des Lernstands (BackupService).

import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:dialekto/data/backup_service.dart';
import 'package:dialekto/data/decks_store.dart';
import 'package:dialekto/data/favorites_store.dart';
import 'package:dialekto/data/notes_store.dart';
import 'package:dialekto/data/xp_store.dart';

Future<void> _freshLoad() async {
  XpStore.instance.debugReset();
  FavoritesStore.instance.debugReset();
  DecksStore.instance.debugReset();
  NotesStore.instance.debugReset();
  await XpStore.instance.load();
  await FavoritesStore.instance.load();
  await DecksStore.instance.load();
  await NotesStore.instance.load();
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    await _freshLoad();
  });

  test('Export → Import stellt den Lernstand wieder her', () async {
    await XpStore.instance.award(150, 'test');
    await FavoritesStore.instance.toggle('koelsch', 'k-001');
    final deckId = await DecksStore.instance.createDeck(name: 'Backup-Deck');
    await DecksStore.instance
        .addToDeck(deckId, (dialektId: 'koelsch', id: 'k-001'));
    await NotesStore.instance.setNote('koelsch', 'k-001', 'Notiz');

    final backup = await BackupService.exportJson(exportedAt: 'now');
    expect(backup.contains('dialekto-mobile'), isTrue);
    expect(backup.contains('dialekto.xp'), isTrue);

    // Alles löschen, dann importieren.
    SharedPreferences.setMockInitialValues(<String, Object>{});
    await _freshLoad();
    expect(XpStore.instance.total, 0);

    final res = await BackupService.importJson(backup);
    expect(res.ok, isTrue);
    expect(res.restored, greaterThan(0));
    expect(XpStore.instance.total, 150);
    expect(FavoritesStore.instance.isFavorite('koelsch', 'k-001'), isTrue);
    expect(NotesStore.instance.getNote('koelsch', 'k-001'), 'Notiz');
    expect(DecksStore.instance.count, 1);
    expect(DecksStore.instance.decks.first.name, 'Backup-Deck');
  });

  test('Import lehnt fremdes Format ab', () async {
    final res = await BackupService.importJson('{"format":"other","data":{}}');
    expect(res.ok, isFalse);
    expect(res.error, isNotNull);
  });

  test('Import meldet ungültiges JSON', () async {
    final res = await BackupService.importJson('kein json');
    expect(res.ok, isFalse);
  });
}
