import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;

import 'models.dart';

/// Lädt die Dialektdaten aus dem gebündelten JSON-Asset (generiert von
/// `node tools/export-mobile-data.mjs` — gleiche Quelle wie die Web-App).
class DialektRepository {
  DialektRepository._();
  static final DialektRepository instance = DialektRepository._();

  List<Dialekt> _dialekte = const [];
  List<Kategorie> _kategorien = const [];
  bool _loaded = false;

  List<Dialekt> get dialekte => _dialekte;
  List<Kategorie> get kategorien => _kategorien;
  bool get isLoaded => _loaded;

  int get totalAusdruecke =>
      _dialekte.fold(0, (sum, d) => sum + d.ausdruecke.length);

  List<Ausdruck> get alleAusdruecke =>
      [for (final d in _dialekte) ...d.ausdruecke];

  Dialekt? byId(String id) {
    for (final d in _dialekte) {
      if (d.id == id) return d;
    }
    return null;
  }

  String kategorieLabel(String id) {
    for (final k in _kategorien) {
      if (k.id == id) return k.label;
    }
    return id;
  }

  String kategorieIcon(String id) {
    for (final k in _kategorien) {
      if (k.id == id) return k.icon;
    }
    return '🏷️';
  }

  Future<void> load() async {
    if (_loaded) return;
    final dRaw = await rootBundle.loadString('assets/data/dialekte.json');
    final kRaw = await rootBundle.loadString('assets/data/kategorien.json');

    final dJson = json.decode(dRaw) as Map<String, dynamic>;
    final kJson = json.decode(kRaw) as Map<String, dynamic>;

    _dialekte = ((dJson['dialekte'] ?? []) as List)
        .map((e) => Dialekt.fromJson(e as Map<String, dynamic>))
        .toList();
    _kategorien = ((kJson['kategorien'] ?? []) as List)
        .map((e) => Kategorie.fromJson(e as Map<String, dynamic>))
        .toList();

    _loaded = true;
  }
}
