import 'package:flutter/material.dart';

/// Wandelt einen Hex-String wie "#e63946" in eine Flutter-[Color].
Color hexColor(String hex, {Color fallback = const Color(0xFF8B5CF6)}) {
  var h = hex.trim().replaceFirst('#', '');
  if (h.length == 3) {
    h = h.split('').map((c) => '$c$c').join();
  }
  if (h.length == 6) h = 'FF$h';
  final value = int.tryParse(h, radix: 16);
  if (value == null) return fallback;
  return Color(value);
}

@immutable
class Ausdruck {
  const Ausdruck({
    required this.id,
    required this.ausdruck,
    required this.hochdeutsch,
    required this.bedeutung,
    required this.beispiel,
    required this.beispielHd,
    required this.kategorie,
  });

  final String id;
  final String ausdruck;
  final String hochdeutsch;
  final String bedeutung;
  final String beispiel;
  final String beispielHd;
  final String kategorie;

  factory Ausdruck.fromJson(Map<String, dynamic> j) => Ausdruck(
        id: (j['id'] ?? '') as String,
        ausdruck: (j['ausdruck'] ?? '') as String,
        hochdeutsch: (j['hochdeutsch'] ?? '') as String,
        bedeutung: (j['bedeutung'] ?? '') as String,
        beispiel: (j['beispiel'] ?? '') as String,
        beispielHd: (j['beispiel_hd'] ?? '') as String,
        kategorie: (j['kategorie'] ?? '') as String,
      );
}

@immutable
class Dialekt {
  const Dialekt({
    required this.id,
    required this.name,
    required this.region,
    required this.bundesland,
    required this.flag,
    required this.farbe,
    required this.beschreibung,
    required this.sprecher,
    required this.lang,
    required this.ausdruecke,
  });

  final String id;
  final String name;
  final String region;
  final String bundesland;
  final String flag;
  final String farbe;
  final String beschreibung;
  final String sprecher;
  final String lang;
  final List<Ausdruck> ausdruecke;

  Color get color => hexColor(farbe);

  factory Dialekt.fromJson(Map<String, dynamic> j) => Dialekt(
        id: (j['id'] ?? '') as String,
        name: (j['name'] ?? '') as String,
        region: (j['region'] ?? '') as String,
        bundesland: (j['bundesland'] ?? '') as String,
        flag: (j['flag'] ?? '🗣️') as String,
        farbe: (j['farbe'] ?? '#8B5CF6') as String,
        beschreibung: (j['beschreibung'] ?? '') as String,
        sprecher: (j['sprecher'] ?? '') as String,
        lang: (j['lang'] ?? 'de-DE') as String,
        ausdruecke: ((j['ausdruecke'] ?? []) as List)
            .map((e) => Ausdruck.fromJson(e as Map<String, dynamic>))
            .toList(),
      );
}

@immutable
class Kategorie {
  const Kategorie({required this.id, required this.label, required this.icon});

  final String id;
  final String label;
  final String icon;

  factory Kategorie.fromJson(Map<String, dynamic> j) => Kategorie(
        id: (j['id'] ?? '') as String,
        label: (j['label'] ?? '') as String,
        icon: (j['icon'] ?? '🏷️') as String,
      );
}
