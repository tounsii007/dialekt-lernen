import '../data/favorites_store.dart';
import '../data/repository.dart';
import '../data/srs_store.dart';
import 'api_service.dart';

/// Verbindet die App beim Start mit dem Backend (sofern erreichbar) und
/// synchronisiert den Nutzer-State (Favoriten + Lernstand/SRS). Ist das Backend
/// offline, bleibt alles lokal — die App funktioniert unverändert weiter.
class BackendSync {
  BackendSync._();

  static final ApiService _api = ApiService();
  static bool _online = false;

  static bool get isOnline => _online;

  /// Nicht-blockierend beim App-Start aufrufen.
  static Future<void> init() async {
    if (!await _api.isAvailable()) {
      _online = false;
      return;
    }
    _online = true;
    try {
      await _api.registerUser();
    } catch (_) {
      // Registrierung optional — Lesen funktioniert auch ohne.
    }

    // Favoriten-Write-Through verdrahten (entkoppelt vom Store).
    FavoritesStore.instance.remoteSync = (ausdruckId, added) async {
      try {
        if (added) {
          await _api.addFavorit(ausdruckId);
        } else {
          await _api.removeFavorit(ausdruckId);
        }
      } catch (_) {
        // lokal bleibt führend
      }
    };

    // Lernstand/SRS-Write-Through verdrahten (entkoppelt vom Store) — beim
    // Bewerten einer Karte wird die Bewertung fehlertolerant ans Backend
    // gespiegelt. rating: 1 = schwer, 2 = mittel, 3 = leicht.
    SrsStore.instance.remoteSync = (ausdruckId, rating) async {
      try {
        await _api.bewerten(ausdruckId, rating);
      } catch (_) {
        // lokal bleibt führend
      }
    };

    await _mergeFavorites();
    await _mergeLernstand();
  }

  /// ausdruckId → dialektId (das Backend kennt nur die ausdruckId). Stellt vorab
  /// sicher, dass das Repository geladen ist (idempotent).
  static Future<Map<String, String>> _dialektOfAusdruck() async {
    final repo = DialektRepository.instance;
    await repo.load();
    return <String, String>{
      for (final pair in repo.alleMitDialekt) pair.ausdruck.id: pair.dialekt.id,
    };
  }

  /// Lädt die Backend-Favoriten und merged sie in den lokalen Store.
  static Future<void> _mergeFavorites() async {
    List<String> remote;
    try {
      remote = await _api.fetchFavoriten(); // Liste von ausdruckId
    } catch (_) {
      return;
    }
    final dialektOf = await _dialektOfAusdruck();
    final keys = <String>[];
    for (final ausdruckId in remote) {
      final dialektId = dialektOf[ausdruckId];
      if (dialektId != null) keys.add('$dialektId.$ausdruckId');
    }
    await FavoritesStore.instance.load();
    FavoritesStore.instance.mergeRemote(keys);
  }

  /// Lädt den Backend-Lernstand und merged ihn in den lokalen SRS-Store
  /// (jüngerer Stand gewinnt). Das Backend terminiert per SM-2; die gemergten
  /// Records sind daher SM-2-Records (`sched:'sm2'`), die SrsStore bei Bedarf
  /// faul in den FSRS-Raum übersetzt.
  static Future<void> _mergeLernstand() async {
    List<Map<String, dynamic>> remote;
    try {
      remote = await _api.fetchLernstand();
    } catch (_) {
      return;
    }
    final dialektOf = await _dialektOfAusdruck();
    final records = <String, CardSrs>{};
    for (final ls in remote) {
      final ausdruckId = ls['ausdruckId']?.toString();
      if (ausdruckId == null) continue;
      final dialektId = dialektOf[ausdruckId];
      if (dialektId == null) continue;
      final last = _parseInstantMs(ls['aktualisiertAt']);
      final due = _parseInstantMs(ls['faelligkeit']);
      records['$dialektId.$ausdruckId'] = CardSrs(
        ef: (ls['ease'] as num?)?.toDouble() ?? SrsStore.initEf,
        reps: (ls['wiederholungen'] as num?)?.toInt() ?? 0,
        interval: (ls['intervallTage'] as num?)?.toInt() ?? 0,
        due: due ?? DateTime.now().millisecondsSinceEpoch,
        lapses: 0, // Backend-Read-DTO liefert keine Lapses → lokal übernommen
        last: last ?? 0,
      );
    }
    await SrsStore.instance.load();
    await SrsStore.instance.mergeRemote(records);
  }

  /// Parst einen ISO-8601-Zeitstempel (Backend `Instant`) zu Epoch-ms; null
  /// bei fehlendem/ungültigem Wert.
  static int? _parseInstantMs(Object? v) {
    if (v == null) return null;
    return DateTime.tryParse(v.toString())?.millisecondsSinceEpoch;
  }
}
