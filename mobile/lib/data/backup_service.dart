import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../state/settings_controller.dart';
import 'achievements_store.dart';
import 'decks_store.dart';
import 'favorites_store.dart';
import 'goals_store.dart';
import 'notes_store.dart';
import 'quests_store.dart';
import 'srs_store.dart';
import 'streak_store.dart';
import 'xp_store.dart';

/// Export/Import des gesamten lokalen Lernstands als JSON — Port der Idee aus
/// js/store/transfer.js. Sichert die SharedPreferences-Schlüssel aller Stores
/// und stellt sie wieder her (in-place reload, kein Neustart nötig).
class BackupService {
  BackupService._();

  static const String format = 'dialekto-mobile';
  static const int version = 1;

  /// Schlüssel, die als JSON-String persistiert sind (getString/setString).
  static const List<String> _stringKeys = [
    'dialekto.srs',
    'dialekto.srs.config',
    'dialekto.xp',
    'dialekto.streak',
    'dialekto.goals',
    'dialekto.quests',
    'dialekto.achievements',
    'dialekto.decks',
    'dialekto.notes',
    'dialekto.themeMode',
    'dialekto.lang',
    'dialekto.haptics',
    'dialekto.reminder',
    'dialekto.reminderHour',
  ];

  /// Schlüssel, die als String-Liste persistiert sind (Favoriten).
  static const String _favKey = 'dialekto.favoriten';

  /// Liefert den Lernstand als (eingerücktes) JSON.
  static Future<String> exportJson({String? exportedAt}) async {
    final prefs = await SharedPreferences.getInstance();
    final data = <String, dynamic>{};
    for (final k in _stringKeys) {
      final v = prefs.getString(k);
      if (v != null) data[k] = v;
    }
    final fav = prefs.getStringList(_favKey);
    if (fav != null) data[_favKey] = fav;

    return const JsonEncoder.withIndent('  ').convert({
      'format': format,
      'version': version,
      'exportedAt': ?exportedAt,
      'data': data,
    });
  }

  /// Importiert einen Snapshot, schreibt die Prefs und lädt alle Stores neu.
  static Future<({bool ok, String? error, int restored})> importJson(
      String text) async {
    Object? parsed;
    try {
      parsed = json.decode(text);
    } catch (_) {
      return (ok: false, error: 'Kein gültiges JSON.', restored: 0);
    }
    if (parsed is! Map || parsed['format'] != format) {
      return (
        ok: false,
        error: 'Unbekanntes Format (erwartet „$format").',
        restored: 0
      );
    }
    final data = parsed['data'];
    if (data is! Map) {
      return (ok: false, error: 'Keine data-Sektion gefunden.', restored: 0);
    }

    final prefs = await SharedPreferences.getInstance();
    var restored = 0;
    for (final k in _stringKeys) {
      final v = data[k];
      if (v is String) {
        await prefs.setString(k, v);
        restored++;
      }
    }
    final fav = data[_favKey];
    if (fav is List) {
      await prefs.setStringList(_favKey, fav.whereType<String>().toList());
      restored++;
    }

    await reloadAll();
    return (ok: true, error: null, restored: restored);
  }

  /// Lädt alle persistierten Stores neu (nach einem Import).
  static Future<void> reloadAll() async {
    await SrsStore.instance.reload();
    await XpStore.instance.reload();
    await StreakStore.instance.reload();
    await GoalsStore.instance.reload();
    await QuestsStore.instance.reload();
    await AchievementsStore.instance.reload();
    await FavoritesStore.instance.reload();
    await DecksStore.instance.reload();
    await NotesStore.instance.reload();
    await SettingsController.instance.reload();
  }
}
