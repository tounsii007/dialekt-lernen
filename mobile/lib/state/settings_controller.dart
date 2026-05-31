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
  static const String _hapticsKey = 'dialekto.haptics';
  static const String _reminderKey = 'dialekto.reminder';
  static const String _reminderHourKey = 'dialekto.reminderHour';

  ThemeMode _themeMode = ThemeMode.dark;
  AppLang _lang = AppLang.de;
  bool _haptics = true;
  bool _reminder = false;
  int _reminderHour = 19;
  bool _loaded = false;

  ThemeMode get themeMode => _themeMode;
  AppLang get lang => _lang;
  bool get hapticsEnabled => _haptics;
  bool get reminderEnabled => _reminder;
  int get reminderHour => _reminderHour;
  bool get isLoaded => _loaded;

  /// Übersetzt einen UI-Key in die aktuelle Sprache.
  String t(String key) => tr(_lang, key);

  static String _dayKey(DateTime d) => '${d.year}-${d.month}-${d.day}';

  /// In-App-Erinnerung fällig? (aktiviert, Stunde erreicht, heute noch nicht
  /// aktiv). [lastActiveDay] kommt aus dem Streak-Store.
  bool shouldRemind(DateTime now, String? lastActiveDay) =>
      _reminder && now.hour >= _reminderHour && lastActiveDay != _dayKey(now);

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    _themeMode = _parse(prefs.getString(_themeKey));
    _lang = parseLang(prefs.getString(_langKey));
    _haptics = prefs.getString(_hapticsKey) != 'false';
    _reminder = prefs.getString(_reminderKey) == 'true';
    _reminderHour = int.tryParse(prefs.getString(_reminderHourKey) ?? '')
            ?.clamp(0, 23) ??
        19;
    _loaded = true;
    notifyListeners();
  }

  Future<void> reload() async {
    _loaded = false;
    await load();
  }

  Future<void> setHaptics(bool on) async {
    if (on == _haptics) return;
    _haptics = on;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_hapticsKey, on ? 'true' : 'false');
  }

  Future<void> setReminder({bool? enabled, int? hour}) async {
    if (enabled != null) _reminder = enabled;
    if (hour != null) _reminderHour = hour.clamp(0, 23);
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_reminderKey, _reminder ? 'true' : 'false');
    await prefs.setString(_reminderHourKey, '$_reminderHour');
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
    _haptics = true;
    _reminder = false;
    _reminderHour = 19;
    _loaded = false;
  }
}
