import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Persönliche Notizen pro Ausdruck (max. 280 Zeichen) — Port von
/// js/store/notes.js (ohne IndexedDB; mobil reicht SharedPreferences).
/// Key: "dialektId.ausdruckId". Persistiert als JSON-Map unter 'dialekto.notes'.
class NotesStore extends ChangeNotifier {
  NotesStore._();
  static final NotesStore instance = NotesStore._();

  static const String _prefsKey = 'dialekto.notes';
  static const int maxLen = 280;

  final Map<String, String> _notes = {};
  bool _loaded = false;

  bool get isLoaded => _loaded;
  int get count => _notes.length;

  static String key(String dialektId, String ausdruckId) =>
      '$dialektId.$ausdruckId';

  String getNote(String dialektId, String ausdruckId) =>
      _notes[key(dialektId, ausdruckId)] ?? '';

  bool hasNote(String dialektId, String ausdruckId) =>
      (_notes[key(dialektId, ausdruckId)] ?? '').isNotEmpty;

  /// Alle Notizen als unveränderliche Map (Key → Text).
  Map<String, String> all() => Map.unmodifiable(_notes);

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null && raw.isNotEmpty) {
      try {
        final map = json.decode(raw);
        if (map is Map) {
          _notes.clear();
          map.forEach((k, v) {
            if (v is String && v.isNotEmpty) _notes['$k'] = v;
          });
        }
      } catch (_) {
        // Korrupte Daten ignorieren — Notizen starten leer.
      }
    }
    _loaded = true;
    notifyListeners();
  }

  /// Setzt (oder löscht bei leerem Text) die Notiz. Auf [maxLen] gekürzt.
  Future<void> setNote(String dialektId, String ausdruckId, String text) async {
    final k = key(dialektId, ausdruckId);
    final v = text.trim();
    final clipped = v.length > maxLen ? v.substring(0, maxLen) : v;
    if (clipped.isEmpty) {
      if (!_notes.containsKey(k)) return;
      _notes.remove(k);
    } else {
      if (_notes[k] == clipped) return;
      _notes[k] = clipped;
    }
    notifyListeners();
    await _persist();
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_prefsKey, json.encode(_notes));
  }

  Future<void> reload() async {
    _loaded = false;
    _notes.clear();
    await load();
  }

  @visibleForTesting
  void debugReset() {
    _notes.clear();
    _loaded = false;
  }
}
