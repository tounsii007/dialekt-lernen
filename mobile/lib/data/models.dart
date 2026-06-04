import 'package:flutter/material.dart';

/// Robuste String-Extraktion aus JSON: akzeptiert null, Zahlen, Bool etc.
/// und vermeidet `as String`-Abstürze bei unerwarteten Datentypen.
String _str(Object? v) => v == null ? '' : v.toString();

/// Robuste Listen-Extraktion: liefert immer eine List (leer bei falschem Typ).
List<dynamic> _list(Object? v) => v is List ? v : const [];

/// Wandelt einen Hex-String wie "#e63946" in eine Flutter-[Color].
Color hexColor(String hex, {Color fallback = const Color(0xFF8B5CF6)}) {
  var h = hex.trim().replaceFirst('#', '');
  if (h.length == 3) {
    h = h.split('').map((c) => '$c$c').join();
  }
  if (h.length == 6) h = 'FF$h';
  // Nur 8-stellige (AARRGGBB) Werte sind ab hier gültig. Andere Längen (z. B.
  // "#12345") würden sonst als Müll-Farbe mit Alpha 0 durchrutschen.
  if (h.length != 8) return fallback;
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
        id: _str(j['id']),
        ausdruck: _str(j['ausdruck']),
        hochdeutsch: _str(j['hochdeutsch']),
        bedeutung: _str(j['bedeutung']),
        beispiel: _str(j['beispiel']),
        // lokale Assets: 'beispiel_hd' · Backend-API: 'beispielHd'
        beispielHd: _str(j['beispiel_hd'] ?? j['beispielHd']),
        kategorie: _str(j['kategorie']),
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

  factory Dialekt.fromJson(Map<String, dynamic> j) {
    final flag = _str(j['flag']);
    final farbe = _str(j['farbe']);
    return Dialekt(
      id: _str(j['id']),
      name: _str(j['name']),
      region: _str(j['region']),
      bundesland: _str(j['bundesland']),
      flag: flag.isEmpty ? '🗣️' : flag,
      farbe: farbe.isEmpty ? '#8B5CF6' : farbe,
      beschreibung: _str(j['beschreibung']),
      sprecher: _str(j['sprecher']),
      lang: _str(j['lang']).isEmpty ? 'de-DE' : _str(j['lang']),
      ausdruecke: _list(j['ausdruecke'])
          .whereType<Map<String, dynamic>>()
          .map(Ausdruck.fromJson)
          .toList(),
    );
  }
}

@immutable
class Kategorie {
  const Kategorie({required this.id, required this.label, required this.icon});

  final String id;
  final String label;
  final String icon;

  factory Kategorie.fromJson(Map<String, dynamic> j) {
    final icon = _str(j['icon']);
    return Kategorie(
      id: _str(j['id']),
      label: _str(j['label']),
      icon: icon.isEmpty ? '🏷️' : icon,
    );
  }
}

/// Verweis auf einen Ausdruck (für verwandte Ausdrücke in Lektionen).
typedef AusdruckRef = ({String dialektId, String id});

/// Eine Mini-Lektion (Artikel) über Sprache/Kultur/Geschichte der Dialekte.
@immutable
class Lektion {
  const Lektion({
    required this.id,
    required this.title,
    required this.kategorie,
    required this.dialekte,
    required this.emoji,
    required this.summary,
    required this.content,
    required this.relatedExpressions,
  });

  final String id;
  final String title;
  final String kategorie; // 'sprache' | 'geschichte' | 'kultur' | 'regionen'
  final List<String> dialekte;
  final String emoji;
  final String summary;
  final String content; // Markdown-leicht (## Headlines, Leerzeilen = Absätze)
  final List<AusdruckRef> relatedExpressions;

  factory Lektion.fromJson(Map<String, dynamic> j) => Lektion(
        id: _str(j['id']),
        title: _str(j['title']),
        kategorie: _str(j['kategorie']),
        dialekte: _list(j['dialekte']).map(_str).toList(),
        emoji: _str(j['emoji']).isEmpty ? '📖' : _str(j['emoji']),
        summary: _str(j['summary']),
        content: _str(j['content']),
        relatedExpressions: _list(j['relatedExpressions'])
            .whereType<Map<String, dynamic>>()
            .map((r) => (dialektId: _str(r['dialektId']), id: _str(r['id'])))
            .toList(),
      );
}
