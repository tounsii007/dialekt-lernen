import '../data/favorites_store.dart';
import '../data/repository.dart';
import 'api_service.dart';

/// Verbindet die App beim Start mit dem Backend (sofern erreichbar) und
/// synchronisiert den Nutzer-State (Favoriten). Ist das Backend offline,
/// bleibt alles lokal — die App funktioniert unverändert weiter.
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

    await _mergeFavorites();
  }

  /// Lädt die Backend-Favoriten und merged sie in den lokalen Store.
  static Future<void> _mergeFavorites() async {
    List<String> remote;
    try {
      remote = await _api.fetchFavoriten(); // Liste von ausdruckId
    } catch (_) {
      return;
    }
    final repo = DialektRepository.instance;
    await repo.load(); // idempotent — stellt den ausdruckId→dialektId-Lookup sicher
    final dialektOf = <String, String>{
      for (final pair in repo.alleMitDialekt) pair.ausdruck.id: pair.dialekt.id,
    };
    final keys = <String>[];
    for (final ausdruckId in remote) {
      final dialektId = dialektOf[ausdruckId];
      if (dialektId != null) keys.add('$dialektId.$ausdruckId');
    }
    await FavoritesStore.instance.load();
    FavoritesStore.instance.mergeRemote(keys);
  }
}
