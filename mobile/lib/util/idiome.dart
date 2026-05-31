import '../data/models.dart';

/// Idiom-Cluster: gruppiert Redensarten (kategorie == 'redensart') nach geteilter
/// hochdeutscher Bedeutung — Port von js/views/idiome.js (Cluster-Heuristik).

typedef DialektAusdruck = ({Dialekt dialekt, Ausdruck ausdruck});

class ClusterDef {
  const ClusterDef({
    required this.id,
    required this.label,
    required this.emoji,
    required this.keywords,
  });

  final String id;
  final String label;
  final String emoji;
  final List<String> keywords;
}

/// Spezifische Cluster ZUERST — sonst klauen breite (z. B. „verneinung")
/// die spezifischen Treffer. Verbatim aus dem Web portiert.
const List<ClusterDef> clusterDefs = [
  ClusterDef(id: 'fragen-anhang', label: 'Frage-Anhängsel („gell, woll, ne?")', emoji: '❔', keywords: ['nicht wahr', 'oder?', '/ oder', 'oder ', 'gell', 'gelle', 'odda', 'wer? / nicht']),
  ClusterDef(id: 'zustimmung', label: 'Ausdrücke der Zustimmung', emoji: '👍', keywords: ['passt', 'in ordnung', 'alles klar', 'okay', 'einverstanden', 'stimmt', 'sicher', 'jawohl', 'natuerlich', 'gerne']),
  ClusterDef(id: 'verneinung', label: 'Verneinungen & „Geht nicht"', emoji: '🚫', keywords: ['nicht', 'nichts', 'keine', 'kein ', 'niemals', 'gar nichts', 'unmoeglich', 'auf keinen fall']),
  ClusterDef(id: 'erstaunen', label: 'Ausrufe des Erstaunens', emoji: '😲', keywords: ['mein gott', 'allmaechtig', 'um himmels willen', 'ach du', 'oh weh', 'um gottes willen', 'wahnsinn', 'krass', 'unglaublich', 'donnerwetter', 'verflixt', 'mannometer']),
  ClusterDef(id: 'reden-schwatzen', label: 'Reden, Schnacken, Schwätzen', emoji: '🗣️', keywords: ['reden', 'plappern', 'schwatzen', 'quatschen', 'schnacken', 'erzaehlen', 'quatsch', 'unsinn', 'witz', 'witze', 'schnauze', 'plaudern']),
  ClusterDef(id: 'menschen-charakter', label: 'Über Menschen & Charakter', emoji: '🧑', keywords: ['mensch', 'kerl', 'typ', 'frau', 'mann', 'kind', 'nachbar', 'kollege', 'fremder', 'liebling', 'streber', 'aengstlich', 'verrueckt', 'spinner', 'narr', 'trottel', 'depp', 'idiot']),
  ClusterDef(id: 'wetter-zeit', label: 'Wetter & Zeit', emoji: '🌦️', keywords: ['regen', 'sonne', 'wetter', 'kalt', 'warm', 'nass', 'frostig', 'stuermisch', 'nieselt', 'matschig', 'morgen', 'gestern', 'heute', 'spaeter', 'gleich', 'sofort', 'frueher']),
  ClusterDef(id: 'koerper-gefuehl', label: 'Körper, Müdigkeit & Gefühle', emoji: '😴', keywords: ['muede', 'erschoepft', 'kaputt', 'krank', 'gesund', 'hunger', 'durst', 'satt', 'froh', 'traurig', 'aerger', 'wut', 'gluecklich']),
  ClusterDef(id: 'essen-trinken', label: 'Rund ums Essen & Trinken', emoji: '🍽️', keywords: ['essen', 'lecker', 'kaese', 'brot', 'wurst', 'bier', 'wein', 'kartoffel', 'kuchen', 'leckerei', 'futter']),
  ClusterDef(id: 'kultur-brauchtum', label: 'Kultur & Brauchtum', emoji: '🎭', keywords: ['karneval', 'fasching', 'fasnet', 'maibaum', 'volksfest', 'oktoberfest', 'kirmes', 'kirchweih', 'sitzung']),
];

const ClusterDef fallbackCluster =
    ClusterDef(id: 'sonstige', label: 'Weitere Redensarten', emoji: '💬', keywords: []);

/// Normalisierung wie js/util/text.js (NFD-Strip): für deutsche Umlaute genügt
/// die Einzelbuchstaben-Faltung (ü→u, ä→a, ö→o, ß→ss).
String _normalize(String s) {
  var t = s.toLowerCase();
  const map = {
    'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss',
    'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a',
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'í': 'i', 'ì': 'i', 'î': 'i',
    'ó': 'o', 'ò': 'o', 'ô': 'o',
    'ú': 'u', 'ù': 'u', 'û': 'u',
    'ç': 'c', 'ñ': 'n',
  };
  map.forEach((k, v) => t = t.replaceAll(k, v));
  return t;
}

class IdiomCluster {
  IdiomCluster(this.def);
  final ClusterDef def;
  final List<DialektAusdruck> items = [];

  int get size => items.length;
  Set<String> get dialektIds => {for (final p in items) p.dialekt.id};
}

bool _matches(ClusterDef def, String hdNorm) =>
    def.keywords.any((kw) => hdNorm.contains(kw));

/// Berechnet Cluster aus allen Redensarten. Jeder Ausdruck landet in höchstens
/// einem Cluster (erstes Match gewinnt).
List<IdiomCluster> computeClusters(List<DialektAusdruck> pairs) {
  final clusters = [for (final d in clusterDefs) IdiomCluster(d)];
  final fallback = IdiomCluster(fallbackCluster);

  for (final p in pairs) {
    if (p.ausdruck.kategorie != 'redensart') continue;
    final hdNorm = _normalize(p.ausdruck.hochdeutsch);
    IdiomCluster? target;
    for (final c in clusters) {
      if (_matches(c.def, hdNorm)) {
        target = c;
        break;
      }
    }
    (target ?? fallback).items.add(p);
  }

  final out = clusters.where((c) => c.items.isNotEmpty).toList();
  if (fallback.items.isNotEmpty) out.add(fallback);
  return out;
}

/// Anzahl Redensarten insgesamt (für die Kopfzeile).
int countRedensarten(List<DialektAusdruck> pairs) =>
    pairs.where((p) => p.ausdruck.kategorie == 'redensart').length;
