import 'dart:convert';
import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'models.dart';

/// Eigene Decks: benutzerdefinierte Listen aus Ausdrücken quer über alle
/// Dialekte. Port von js/store/decks.js. Refs als {dialektId, id}.
/// Persistiert als JSON-Liste unter 'dialekto.decks'.

const String defaultDeckColor = '#8338ec';

class Deck {
  Deck({
    required this.id,
    required this.name,
    required this.color,
    required this.expressionIds,
    required this.createdAt,
  });

  final String id;
  String name;
  String color; // Hex
  final List<AusdruckRef> expressionIds;
  final int createdAt;

  int get size => expressionIds.length;

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'color': color,
        'createdAt': createdAt,
        'expressionIds': [
          for (final r in expressionIds)
            {'dialektId': r.dialektId, 'id': r.id},
        ],
      };

  factory Deck.fromJson(Map<String, dynamic> j) => Deck(
        id: '${j['id']}',
        name: ('${j['name']}').trim().isEmpty ? 'Unbenanntes Deck' : '${j['name']}',
        color: ('${j['color']}').trim().isEmpty ? defaultDeckColor : '${j['color']}',
        createdAt: (j['createdAt'] as num?)?.toInt() ?? 0,
        expressionIds: ((j['expressionIds'] as List?) ?? const [])
            .whereType<Map>()
            .map((m) => (dialektId: '${m['dialektId']}', id: '${m['id']}'))
            .where((r) => r.dialektId.isNotEmpty && r.id != 'null' && r.id.isNotEmpty)
            .toList(),
      );
}

class DecksStore extends ChangeNotifier {
  DecksStore._();
  static final DecksStore instance = DecksStore._();

  static const String _prefsKey = 'dialekto.decks';

  final List<Deck> _decks = [];
  bool _loaded = false;
  int _seq = 0; // monotone Sequenz für kollisionsfreie IDs

  bool get isLoaded => _loaded;
  int get count => _decks.length;

  /// Alle Decks, neueste zuerst.
  List<Deck> get decks =>
      [..._decks]..sort((a, b) => b.createdAt.compareTo(a.createdAt));

  Deck? getDeck(String id) {
    for (final d in _decks) {
      if (d.id == id) return d;
    }
    return null;
  }

  bool contains(String deckId, AusdruckRef ref) {
    final d = getDeck(deckId);
    return d != null && d.expressionIds.any((x) => _same(x, ref));
  }

  int deckSize(String deckId) => getDeck(deckId)?.size ?? 0;

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null && raw.isNotEmpty) {
      try {
        final list = json.decode(raw);
        if (list is List) {
          _decks
            ..clear()
            ..addAll(list
                .whereType<Map<String, dynamic>>()
                .map(Deck.fromJson));
        }
      } catch (_) {
        // Korrupte Daten ignorieren — Decks starten leer.
      }
    }
    _loaded = true;
    notifyListeners();
  }

  String _makeId() {
    _seq++;
    final t = DateTime.now().microsecondsSinceEpoch.toRadixString(36);
    final r = Random().nextInt(1 << 31).toRadixString(36);
    return 'deck_${t}_${_seq}_$r';
  }

  /// Legt ein Deck an und liefert seine ID.
  Future<String> createDeck({
    required String name,
    String color = defaultDeckColor,
    List<AusdruckRef> expressionIds = const [],
  }) async {
    final cleanName = name.trim().isEmpty ? 'Unbenanntes Deck' : name.trim();
    final cleanColor = color.trim().isEmpty ? defaultDeckColor : color.trim();
    final id = _makeId();
    _decks.add(Deck(
      id: id,
      name: cleanName,
      color: cleanColor,
      expressionIds: [...expressionIds],
      createdAt: DateTime.now().millisecondsSinceEpoch + _seq,
    ));
    notifyListeners();
    await _persist();
    return id;
  }

  /// Fügt einen Ausdruck hinzu (Duplikate werden ignoriert).
  Future<bool> addToDeck(String deckId, AusdruckRef ref) async {
    final d = getDeck(deckId);
    if (d == null) return false;
    if (d.expressionIds.any((x) => _same(x, ref))) return false;
    d.expressionIds.add(ref);
    notifyListeners();
    await _persist();
    return true;
  }

  Future<bool> removeFromDeck(String deckId, AusdruckRef ref) async {
    final d = getDeck(deckId);
    if (d == null) return false;
    final before = d.expressionIds.length;
    d.expressionIds.removeWhere((x) => _same(x, ref));
    final changed = d.expressionIds.length != before;
    if (changed) {
      notifyListeners();
      await _persist();
    }
    return changed;
  }

  Future<bool> deleteDeck(String deckId) async {
    final before = _decks.length;
    _decks.removeWhere((d) => d.id == deckId);
    final changed = _decks.length != before;
    if (changed) {
      notifyListeners();
      await _persist();
    }
    return changed;
  }

  Future<bool> updateDeck(String deckId, {String? name, String? color}) async {
    final d = getDeck(deckId);
    if (d == null) return false;
    if (name != null && name.trim().isNotEmpty) d.name = name.trim();
    if (color != null && color.trim().isNotEmpty) d.color = color.trim();
    notifyListeners();
    await _persist();
    return true;
  }

  static bool _same(AusdruckRef a, AusdruckRef b) =>
      a.dialektId == b.dialektId && a.id == b.id;

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _prefsKey,
      json.encode([for (final d in _decks) d.toJson()]),
    );
  }

  Future<void> reload() async {
    _loaded = false;
    _decks.clear();
    await load();
  }

  @visibleForTesting
  void debugReset() {
    _decks.clear();
    _seq = 0;
    _loaded = false;
  }
}
