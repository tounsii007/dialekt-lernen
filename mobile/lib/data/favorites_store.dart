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
  Future<bool> toggle(String dialektId, String ausdruckId) async {
    final key = _key(dialektId, ausdruckId);
    final added = !_keys.contains(key);
    if (added) {
      _keys.add(key);
    } else {
      _keys.remove(key);
    }
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_prefsKey, _keys.toList());
    return added;
  }
}
