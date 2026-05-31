import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Persistente App-Einstellungen (Theme-Modus). ChangeNotifier, damit die
/// MaterialApp bei Änderungen neu baut.
class SettingsController extends ChangeNotifier {
  SettingsController._();
  static final SettingsController instance = SettingsController._();

  static const String _themeKey = 'dialekto.themeMode';

  ThemeMode _themeMode = ThemeMode.dark;
  bool _loaded = false;

  ThemeMode get themeMode => _themeMode;
  bool get isLoaded => _loaded;

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    _themeMode = _parse(prefs.getString(_themeKey));
    _loaded = true;
    notifyListeners();
  }

  Future<void> setThemeMode(ThemeMode mode) async {
    if (mode == _themeMode) return;
    final previous = _themeMode;
    _themeMode = mode;
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_themeKey, _name(mode));
    } catch (e) {
      // Rollback bei Persistenz-Fehler, damit Anzeige und gespeicherter Wert
      // nicht auseinanderlaufen.
      _themeMode = previous;
      notifyListeners();
      debugPrint('SettingsController.setThemeMode: persist failed, rolled back: $e');
    }
  }

  static ThemeMode _parse(String? s) => switch (s) {
        'light' => ThemeMode.light,
        'system' => ThemeMode.system,
        _ => ThemeMode.dark,
      };

  static String _name(ThemeMode m) => switch (m) {
        ThemeMode.light => 'light',
        ThemeMode.system => 'system',
        ThemeMode.dark => 'dark',
      };

  @visibleForTesting
  void debugReset() {
    _themeMode = ThemeMode.dark;
    _loaded = false;
  }
}
