import 'dart:math';

import '../data/models.dart';

/// Reine Spiel-Logik (Deck-Aufbau, Optionen) — ohne UI, damit testbar.
/// Genutzt von Memory (Paare) und Blitz (Zeit-Quiz).

typedef DialektAusdruck = ({Dialekt dialekt, Ausdruck ausdruck});

/// Eindeutige Übersetzungen — verhindert doppelte Karten/Optionen mit gleichem
/// Hochdeutsch-Text.
List<DialektAusdruck> uniqueByHochdeutsch(List<DialektAusdruck> source) {
  final seen = <String>{};
  final out = <DialektAusdruck>[];
  for (final p in source) {
    final key = p.ausdruck.hochdeutsch.toLowerCase().trim();
    if (key.isEmpty || seen.contains(key)) continue;
    seen.add(key);
    out.add(p);
  }
  return out;
}

/// Eine Memory-Karte (zwei je Paar: Dialekt-Ausdruck und Hochdeutsch).
class MemoryCard {
  MemoryCard({
    required this.pairId,
    required this.isDialekt,
    required this.text,
    required this.dialekt,
  });

  final int pairId;
  final bool isDialekt; // true = Dialekt-Ausdruck, false = Hochdeutsch
  final String text;
  final Dialekt dialekt;
  bool flipped = false;
  bool matched = false;
}

/// Zieht [pairs] Paare aus [pool] und baut das gemischte Karten-Deck.
List<MemoryCard> buildMemoryCards(
  List<DialektAusdruck> pool,
  int pairs,
  Random rng,
) {
  final shuffled = List.of(pool)..shuffle(rng);
  final chosen = shuffled.take(pairs).toList();
  final cards = <MemoryCard>[];
  for (var i = 0; i < chosen.length; i++) {
    final p = chosen[i];
    cards.add(MemoryCard(
        pairId: i, isDialekt: true, text: p.ausdruck.ausdruck, dialekt: p.dialekt));
    cards.add(MemoryCard(
        pairId: i,
        isDialekt: false,
        text: p.ausdruck.hochdeutsch,
        dialekt: p.dialekt));
  }
  cards.shuffle(rng);
  return cards;
}

/// Eine Blitz-Frage: Dialekt-Ausdruck + Hochdeutsch-Optionen.
class BlitzQuestion {
  const BlitzQuestion({
    required this.prompt,
    required this.dialekt,
    required this.options,
    required this.correctIndex,
  });

  final String prompt; // Dialekt-Ausdruck
  final Dialekt dialekt;
  final List<String> options; // Hochdeutsch-Kandidaten
  final int correctIndex;
}

/// Baut eine Blitz-Frage für [correct] mit [n] Optionen (1 richtig + Distraktoren).
BlitzQuestion buildBlitzQuestion(
  List<DialektAusdruck> pool,
  DialektAusdruck correct,
  Random rng, {
  int n = 4,
}) {
  final correctHd = correct.ausdruck.hochdeutsch;
  final seen = {correctHd.toLowerCase().trim()};
  final distractors = <String>[];
  final shuffled = List.of(pool)..shuffle(rng);
  for (final p in shuffled) {
    if (distractors.length >= n - 1) break;
    final hd = p.ausdruck.hochdeutsch;
    final key = hd.toLowerCase().trim();
    if (seen.contains(key)) continue;
    seen.add(key);
    distractors.add(hd);
  }
  final options = [correctHd, ...distractors]..shuffle(rng);
  return BlitzQuestion(
    prompt: correct.ausdruck.ausdruck,
    dialekt: correct.dialekt,
    options: options,
    correctIndex: options.indexOf(correctHd),
  );
}
