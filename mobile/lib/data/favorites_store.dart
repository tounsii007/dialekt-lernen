import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Persistente Favoriten (Schlüssel "dialektId.ausdruckId") via
/// shared_preferences — Pendant zu store/favorites.js der Web-App.
class FavoritesStore extends ChangeNotifier {
  FavoritesStore._();
  static final FavoritesStore instance = FavoritesStore._();

  static const String _prefsKey = 'dialekto.favoriten';

  final Set<String> _keys = <String>{};
  bool _loaded = false;

  /// Optionaler Write-Through ans Backend (von BackendSync gesetzt; entkoppelt,
  /// damit der Store den ApiService nicht kennen muss). Fire-and-forget.
  Future<void> Function(String ausdruckId, bool added)? remoteSync;

  bool get isLoaded => _loaded;
  int get count => _keys.length;
  List<String> get keys => _keys.toList();

  String _key(String dialektId, String ausdruckId) => '$dialektId.$ausdruckId';

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    _keys
      ..clear()
      ..addAll(prefs.getStringList(_prefsKey) ?? const <String>[]);
    _loaded = true;
    notifyListeners();
  }

  bool isFavorite(String dialektId, String ausdruckId) =>
      _keys.contains(_key(dialektId, ausdruckId));

  Future<void> reload() async {
    _loaded = false;
    await load();
  }

  /// Nur für Tests: setzt den In-Memory-Zustand zurück, damit load() erneut
  /// aus (gemockten) Prefs lesen kann.
  @visibleForTesting
  void debugReset() {
    _keys.clear();
    _loaded = false;
  }

  /// Toggelt einen Favoriten und persistiert. Liefert true, wenn hinzugefügt.
  ///
  /// Optimistisch: der In-Memory-Zustand wird sofort geändert (UI reagiert
  /// unmittelbar). Schlägt das Persistieren fehl, wird der Zustand
  /// zurückgerollt + notifyListeners() erneut gefeuert, damit In-Memory und
  /// Persistenz nicht dauerhaft auseinanderlaufen.
  Future<bool> toggle(String dialektId, String ausdruckId) async {
    final key = _key(dialektId, ausdruckId);
    final added = !_keys.contains(key);
    if (added) {
      _keys.add(key);
    } else {
      _keys.remove(key);
    }
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setStringList(_prefsKey, _keys.toList());
    } catch (e) {
      // Rollback bei Persistenz-Fehler.
      if (added) {
        _keys.remove(key);
      } else {
        _keys.add(key);
      }
      notifyListeners();
      debugPrint('FavoritesStore.toggle: persist failed, rolled back: $e');
      return !added;
    }
    // Write-through ans Backend (falls verbunden) — fehlertolerant.
    try {
      remoteSync?.call(ausdruckId, added);
    } catch (_) { /* lokal bleibt führend */ }
    return added;
  }

  /// Merged vom Backend gelieferte Favoriten-Keys ("dialektId.ausdruckId") in
  /// den lokalen Bestand (Union) und persistiert. Löst keinen Write-Through aus.
  void mergeRemote(List<String> keys) {
    var changed = false;
    for (final k in keys) {
      if (_keys.add(k)) changed = true;
    }
    if (!changed) return;
    SharedPreferences.getInstance()
        .then((p) => p.setStringList(_prefsKey, _keys.toList()));
    notifyListeners();
  }
}
