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

  /// Alle Ausdrücke samt zugehörigem Dialekt (für Quiz, Suche etc.).
  List<({Dialekt dialekt, Ausdruck ausdruck})> get alleMitDialekt => [
        for (final d in _dialekte)
          for (final a in d.ausdruecke) (dialekt: d, ausdruck: a),
      ];

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

  /// Normalisiert für die Suche: Kleinschreibung + Umlaut-/ß-Faltung.
  static String normalize(String s) {
    var t = s.toLowerCase();
    const map = {
      'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss',
      'á': 'a', 'à': 'a', 'â': 'a', 'é': 'e', 'è': 'e', 'ê': 'e',
    };
    map.forEach((k, v) => t = t.replaceAll(k, v));
    return t.trim();
  }

  /// Sucht Dialekte (Name/Region) und Ausdrücke (Ausdruck/Hochdeutsch).
  ({
    List<Dialekt> dialekte,
    List<({Dialekt dialekt, Ausdruck ausdruck})> ausdruecke,
  }) search(String query, {int limit = 40}) {
    final q = normalize(query);
    if (q.isEmpty) {
      return (dialekte: const [], ausdruecke: const []);
    }
    final ds = _dialekte
        .where((d) =>
            normalize(d.name).contains(q) || normalize(d.region).contains(q))
        .toList();
    final as = <({Dialekt dialekt, Ausdruck ausdruck})>[];
    for (final d in _dialekte) {
      for (final a in d.ausdruecke) {
        if (normalize(a.ausdruck).contains(q) ||
            normalize(a.hochdeutsch).contains(q)) {
          as.add((dialekt: d, ausdruck: a));
          if (as.length >= limit) return (dialekte: ds, ausdruecke: as);
        }
      }
    }
    return (dialekte: ds, ausdruecke: as);
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
