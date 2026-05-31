import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'i18n.dart';

/// Persistente App-Einstellungen (Theme-Modus, Sprache). ChangeNotifier, damit
/// die MaterialApp bei Änderungen neu baut.
class SettingsController extends ChangeNotifier {
  SettingsController._();
  static final SettingsController instance = SettingsController._();

  static const String _themeKey = 'dialekto.themeMode';
  static const String _langKey = 'dialekto.lang';

  ThemeMode _themeMode = ThemeMode.dark;
  AppLang _lang = AppLang.de;
  bool _loaded = false;

  ThemeMode get themeMode => _themeMode;
  AppLang get lang => _lang;
  bool get isLoaded => _loaded;

  /// Übersetzt einen UI-Key in die aktuelle Sprache.
  String t(String key) => tr(_lang, key);

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    _themeMode = _parse(prefs.getString(_themeKey));
    _lang = parseLang(prefs.getString(_langKey));
    _loaded = true;
    notifyListeners();
  }

  Future<void> setThemeMode(ThemeMode mode) async {
    if (mode == _themeMode) return;
    _themeMode = mode;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_themeKey, _name(mode));
  }

  Future<void> setLang(AppLang lang) async {
    if (lang == _lang) return;
    _lang = lang;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_langKey, langCode(lang));
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
    _lang = AppLang.de;
    _loaded = false;
  }
}
