import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'favorites_store.dart';
import 'repository.dart';
import 'srs_store.dart';
import 'streak_store.dart';
import 'xp_store.dart';

/// Achievements — portiert von js/store/achievements.js.
/// Definitionen liegen im Code; persistiert werden nur Freischalt-Zeitpunkte
/// (id → ts) sowie besuchte Dialekte, als JSON
/// { "unlocked": {id:ts}, "visited": [ids] }.

class Rarity {
  const Rarity(this.id, this.label, this.points, this.order);
  final String id;
  final String label;
  final int points;
  final int order;
}

abstract final class Rarities {
  static const Rarity common = Rarity('common', 'Häufig', 10, 0);
  static const Rarity rare = Rarity('rare', 'Selten', 25, 1);
  static const Rarity epic = Rarity('epic', 'Episch', 50, 2);
  static const Rarity legendary = Rarity('legendary', 'Legendär', 100, 3);
  static const List<Rarity> all = [common, rare, epic, legendary];
}

/// Statistik-Schnappschuss, gegen den die Achievement-Bedingungen prüfen.
/// Felder für noch nicht portierte Features (Quiz, Notizen, Decks, Pfad, Chest)
/// haben Defaults, sodass diese Achievements vorerst einfach verschlossen
/// bleiben, ohne die Logik zu brechen.
class AchievementStats {
  const AchievementStats({
    this.gelerntCount = 0,
    this.streak = 0,
    this.level = 0,
    this.favCount = 0,
    this.quizCount = 0,
    this.bestQuiz = 0,
    this.visitedCount = 0,
    this.totalDialects = 0,
    this.totalAvailable = 0,
    this.noteCount = 0,
    this.deckCount = 0,
    this.pathCompleted = 0,
    this.pathTotal = 0,
    this.chestStreak = 0,
    this.visitedIds = const <String>{},
  });

  final int gelerntCount;
  final int streak;
  final int level;
  final int favCount;
  final int quizCount;
  final int bestQuiz;
  final int visitedCount;
  final int totalDialects;
  final int totalAvailable;
  final int noteCount;
  final int deckCount;
  final int pathCompleted;
  final int pathTotal;
  final int chestStreak;
  final Set<String> visitedIds;
}

class AchievementDef {
  const AchievementDef({
    required this.id,
    required this.icon,
    required this.title,
    required this.desc,
    required this.rarity,
    required this.check,
  });

  final String id;
  final String icon;
  final String title;
  final String desc;
  final Rarity rarity;
  final bool Function(AchievementStats s) check;
}

/// Vollständiger Katalog (deckungsgleich mit der Web-App).
const List<AchievementDef> achievements = [
  // Lernen
  AchievementDef(id: 'firstCard', icon: '🌱', title: 'Erste Karte', desc: 'Du hast deine erste Karte bewertet.', rarity: Rarities.common, check: _firstCard),
  AchievementDef(id: 'tenCards', icon: '🎯', title: '10 gelernt', desc: 'Zehn Ausdrücke als gelernt markiert.', rarity: Rarities.common, check: _tenCards),
  AchievementDef(id: 'fiftyCards', icon: '🚀', title: '50 gelernt', desc: 'Fünfzig Ausdrücke beherrscht — wow!', rarity: Rarities.rare, check: _fiftyCards),
  AchievementDef(id: 'hundredCards', icon: '👑', title: '100 gelernt', desc: 'Hundert Ausdrücke! Profi-Liga.', rarity: Rarities.rare, check: _hundredCards),
  AchievementDef(id: 'twoHundred', icon: '🏅', title: '200 gelernt', desc: 'Zweihundert Ausdrücke — Dialektforscher!', rarity: Rarities.epic, check: _twoHundred),
  AchievementDef(id: 'fiveHundred', icon: '💎', title: '500 gelernt', desc: 'Fünfhundert Ausdrücke — Mundartmeister!', rarity: Rarities.epic, check: _fiveHundred),
  AchievementDef(id: 'thousand', icon: '🌟', title: '1000 gelernt', desc: 'Eintausend Ausdrücke — Dialekt-Legende!', rarity: Rarities.legendary, check: _thousand),
  AchievementDef(id: 'twoThousand', icon: '🎖️', title: '2000 gelernt', desc: 'Zweitausend Ausdrücke — Mundart-Kenner!', rarity: Rarities.legendary, check: _twoThousand),
  AchievementDef(id: 'allMaster', icon: '🏆', title: 'Alle gelernt', desc: 'Alle verfügbaren Ausdrücke gemeistert — der absolute Wahnsinn!', rarity: Rarities.legendary, check: _allMaster),

  // Streak
  AchievementDef(id: 'streak3', icon: '🔥', title: '3-Tage-Streak', desc: 'Drei Tage in Folge gelernt.', rarity: Rarities.common, check: _streak3),
  AchievementDef(id: 'streak7', icon: '🌟', title: '7-Tage-Streak', desc: 'Eine Woche durchgezogen.', rarity: Rarities.rare, check: _streak7),
  AchievementDef(id: 'streak30', icon: '⭐', title: '30-Tage-Streak', desc: 'Ein ganzer Monat — Disziplin pur.', rarity: Rarities.epic, check: _streak30),
  AchievementDef(id: 'streak100', icon: '🌈', title: '100-Tage-Streak', desc: '100 Tage am Stück — legendär!', rarity: Rarities.legendary, check: _streak100),

  // Quiz
  AchievementDef(id: 'firstQuiz', icon: '🎲', title: 'Erstes Quiz', desc: 'Du hast dein erstes Quiz abgeschlossen.', rarity: Rarities.common, check: _firstQuiz),
  AchievementDef(id: 'perfectQuiz', icon: '🏆', title: 'Perfektes Quiz', desc: 'Ein Quiz mit 100% gelöst.', rarity: Rarities.rare, check: _perfectQuiz),
  AchievementDef(id: 'tenQuizzes', icon: '🎓', title: '10 Quizze', desc: 'Zehn Quiz-Runden absolviert.', rarity: Rarities.rare, check: _tenQuizzes),
  AchievementDef(id: 'fiftyQuizzes', icon: '🧠', title: '50 Quizze', desc: 'Fünfzig Quizze — du bist süchtig!', rarity: Rarities.epic, check: _fiftyQuizzes),

  // Explorer
  AchievementDef(id: 'visit3', icon: '🗺️', title: 'Entdecker', desc: 'Drei verschiedene Dialekte angeschaut.', rarity: Rarities.common, check: _visit3),
  AchievementDef(id: 'visit6', icon: '🧭', title: 'Viel-Reisender', desc: 'Sechs Dialekte besucht.', rarity: Rarities.rare, check: _visit6),
  AchievementDef(id: 'visitAll', icon: '🌍', title: 'Welt-Reisender', desc: 'Alle Dialekte besucht.', rarity: Rarities.epic, check: _visitAll),

  // Favoriten
  AchievementDef(id: 'fav5', icon: '💖', title: '5 Favoriten', desc: 'Fünf Ausdrücke favorisiert.', rarity: Rarities.common, check: _fav5),
  AchievementDef(id: 'fav25', icon: '🌹', title: '25 Favoriten', desc: 'Eine richtige Sammlung.', rarity: Rarities.rare, check: _fav25),
  AchievementDef(id: 'fav100', icon: '💐', title: '100 Favoriten', desc: 'Hundert Lieblingsausdrücke — Sammler!', rarity: Rarities.epic, check: _fav100),

  // XP / Level
  AchievementDef(id: 'level5', icon: '⚡', title: 'Level 5', desc: 'Level 5 erreicht — du sammelst fleißig XP.', rarity: Rarities.rare, check: _level5),
  AchievementDef(id: 'level10', icon: '🌠', title: 'Level 10', desc: 'Level 10 — ein wahrer XP-Magnet.', rarity: Rarities.epic, check: _level10),
  AchievementDef(id: 'level20', icon: '☄️', title: 'Level 20', desc: 'Level 20 erreicht — Mundart-Veteran.', rarity: Rarities.legendary, check: _level20),

  // Notizen
  AchievementDef(id: 'firstNote', icon: '✍️', title: 'Erste Notiz', desc: 'Eine eigene Notiz zu einem Ausdruck geschrieben.', rarity: Rarities.common, check: _firstNote),
  AchievementDef(id: 'notes10', icon: '📓', title: 'Notizensammler', desc: 'Zehn eigene Notizen verfasst.', rarity: Rarities.rare, check: _notes10),

  // Eigene Decks
  AchievementDef(id: 'firstDeck', icon: '🗂️', title: 'Deck-Baumeister', desc: 'Dein erstes eigenes Deck erstellt.', rarity: Rarities.common, check: _firstDeck),

  // Lernpfad
  AchievementDef(id: 'pathStart', icon: '🧗', title: 'Pfad-Pionier', desc: 'Den ersten Dialekt auf dem Lernpfad gemeistert.', rarity: Rarities.rare, check: _pathStart),
  AchievementDef(id: 'pathHalf', icon: '🏞️', title: 'Halbe Strecke', desc: 'Die Hälfte des Lernpfads gemeistert.', rarity: Rarities.epic, check: _pathHalf),
  AchievementDef(id: 'pathAll', icon: '🗺️', title: 'Pfad-Meister', desc: 'Den gesamten Lernpfad abgeschlossen — alle Dialekte gemeistert!', rarity: Rarities.legendary, check: _pathAll),

  // Chest
  AchievementDef(id: 'chest7', icon: '🎁', title: 'Schatzsammler', desc: 'Den Tages-Chest sieben Tage in Folge geöffnet.', rarity: Rarities.rare, check: _chest7),
  AchievementDef(id: 'chest30', icon: '💰', title: 'Schatzmeister', desc: 'Dreißig Tages-Chests in Folge geöffnet.', rarity: Rarities.legendary, check: _chest30),

  // Spezial
  AchievementDef(id: 'north', icon: '⚓', title: 'Nördlichkeit', desc: 'Den Plattdeutsch-Dialekt besucht.', rarity: Rarities.common, check: _north),
  AchievementDef(id: 'south', icon: '🥨', title: 'Südlichkeit', desc: 'Den Bayerischen Dialekt besucht.', rarity: Rarities.common, check: _south),
  AchievementDef(id: 'ruhr', icon: '⚒️', title: 'Ruhrpottler', desc: 'Den Ruhrpott-Dialekt entdeckt.', rarity: Rarities.common, check: _ruhr),
  AchievementDef(id: 'swiss', icon: '🏔️', title: 'Eidgenosse', desc: 'Schwizerdütsch besucht.', rarity: Rarities.common, check: _swiss),
  AchievementDef(id: 'fraenkisch', icon: '🏰', title: 'Frankenkönig', desc: 'Den fränkischen Dialekt aus Nürnberg entdeckt.', rarity: Rarities.common, check: _fraenkisch),
  AchievementDef(id: 'alemannisch', icon: '🌲', title: 'Schwarzwäldler', desc: 'Den alemannischen Dialekt besucht.', rarity: Rarities.common, check: _alemannisch),
];

// Bedingungen als Top-Level-Funktionen, damit der const-Katalog gültig ist.
bool _firstCard(AchievementStats s) => s.gelerntCount >= 1;
bool _tenCards(AchievementStats s) => s.gelerntCount >= 10;
bool _fiftyCards(AchievementStats s) => s.gelerntCount >= 50;
bool _hundredCards(AchievementStats s) => s.gelerntCount >= 100;
bool _twoHundred(AchievementStats s) => s.gelerntCount >= 200;
bool _fiveHundred(AchievementStats s) => s.gelerntCount >= 500;
bool _thousand(AchievementStats s) => s.gelerntCount >= 1000;
bool _twoThousand(AchievementStats s) => s.gelerntCount >= 2000;
bool _allMaster(AchievementStats s) =>
    s.totalAvailable > 0 && s.gelerntCount >= s.totalAvailable;
bool _streak3(AchievementStats s) => s.streak >= 3;
bool _streak7(AchievementStats s) => s.streak >= 7;
bool _streak30(AchievementStats s) => s.streak >= 30;
bool _streak100(AchievementStats s) => s.streak >= 100;
bool _firstQuiz(AchievementStats s) => s.quizCount >= 1;
bool _perfectQuiz(AchievementStats s) => s.bestQuiz >= 100;
bool _tenQuizzes(AchievementStats s) => s.quizCount >= 10;
bool _fiftyQuizzes(AchievementStats s) => s.quizCount >= 50;
bool _visit3(AchievementStats s) => s.visitedCount >= 3;
bool _visit6(AchievementStats s) => s.visitedCount >= 6;
bool _visitAll(AchievementStats s) =>
    s.totalDialects > 0 && s.visitedCount >= s.totalDialects;
bool _fav5(AchievementStats s) => s.favCount >= 5;
bool _fav25(AchievementStats s) => s.favCount >= 25;
bool _fav100(AchievementStats s) => s.favCount >= 100;
bool _level5(AchievementStats s) => s.level >= 5;
bool _level10(AchievementStats s) => s.level >= 10;
bool _level20(AchievementStats s) => s.level >= 20;
bool _firstNote(AchievementStats s) => s.noteCount >= 1;
bool _notes10(AchievementStats s) => s.noteCount >= 10;
bool _firstDeck(AchievementStats s) => s.deckCount >= 1;
bool _pathStart(AchievementStats s) => s.pathCompleted >= 1;
bool _pathHalf(AchievementStats s) =>
    s.pathTotal > 0 && s.pathCompleted >= (s.pathTotal / 2).ceil();
bool _pathAll(AchievementStats s) =>
    s.pathTotal > 0 && s.pathCompleted >= s.pathTotal;
bool _chest7(AchievementStats s) => s.chestStreak >= 7;
bool _chest30(AchievementStats s) => s.chestStreak >= 30;
bool _north(AchievementStats s) => s.visitedIds.contains('plattdeutsch');
bool _south(AchievementStats s) => s.visitedIds.contains('bayerisch');
bool _ruhr(AchievementStats s) => s.visitedIds.contains('ruhrdeutsch');
bool _swiss(AchievementStats s) => s.visitedIds.contains('schwizerduetsch');
bool _fraenkisch(AchievementStats s) => s.visitedIds.contains('fraenkisch');
bool _alemannisch(AchievementStats s) => s.visitedIds.contains('alemannisch');

/// Anzeige-Status eines Achievements.
class AchievementView {
  const AchievementView({
    required this.def,
    required this.unlocked,
    required this.unlockedAt,
    required this.justUnlocked,
  });

  final AchievementDef def;
  final bool unlocked;
  final int? unlockedAt; // Epoch-ms
  final bool justUnlocked;
}

class EvaluateResult {
  const EvaluateResult({required this.items, required this.justUnlocked});
  final List<AchievementView> items;
  final List<String> justUnlocked;
}

class RarityTally {
  const RarityTally({required this.unlocked, required this.total});
  final int unlocked;
  final int total;
}

class AchievementScore {
  const AchievementScore({
    required this.score,
    required this.maxScore,
    required this.byRarity,
  });

  final int score;
  final int maxScore;
  final Map<String, RarityTally> byRarity;
}

class AchievementsStore extends ChangeNotifier {
  AchievementsStore._();
  static final AchievementsStore instance = AchievementsStore._();

  static const String _prefsKey = 'dialekto.achievements';

  final Map<String, int> _unlocked = {}; // id → ts
  final Set<String> _visited = <String>{};
  bool _loaded = false;

  bool get isLoaded => _loaded;
  Set<String> get visitedIds => Set.unmodifiable(_visited);
  int get visitedCount => _visited.length;
  int get unlockedCount => _unlocked.length;

  Future<void> load() async {
    if (_loaded) return;
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null && raw.isNotEmpty) {
      try {
        final map = json.decode(raw) as Map<String, dynamic>;
        _unlocked.clear();
        final u = map['unlocked'];
        if (u is Map) {
          u.forEach((k, v) {
            if (v is num) _unlocked['$k'] = v.toInt();
          });
        }
        _visited.clear();
        final v = map['visited'];
        if (v is List) {
          for (final id in v) {
            if (id is String) _visited.add(id);
          }
        }
      } catch (_) {
        // Korrupte Daten ignorieren.
      }
    }
    _loaded = true;
    notifyListeners();
  }

  Future<void> markVisited(String id) async {
    if (_visited.add(id)) {
      notifyListeners();
      await _persist();
    }
  }

  /// Prüft alle Definitionen gegen [stats], schaltet neu erfüllte frei
  /// (idempotent über die gespeicherten Zeitstempel) und meldet die in diesem
  /// Aufruf freigeschalteten IDs.
  Future<EvaluateResult> evaluate(AchievementStats stats) async {
    final justUnlocked = <String>[];
    final items = <AchievementView>[];
    final now = DateTime.now().millisecondsSinceEpoch;
    for (final def in achievements) {
      final wasUnlocked = _unlocked.containsKey(def.id);
      var unlocked = wasUnlocked;
      if (!unlocked) {
        try {
          unlocked = def.check(stats);
        } catch (_) {
          unlocked = false;
        }
      }
      if (!wasUnlocked && unlocked) {
        _unlocked[def.id] = now;
        justUnlocked.add(def.id);
      }
      items.add(AchievementView(
        def: def,
        unlocked: unlocked,
        unlockedAt: _unlocked[def.id],
        justUnlocked: !wasUnlocked && unlocked,
      ));
    }
    if (justUnlocked.isNotEmpty) {
      notifyListeners();
      await _persist();
    }
    return EvaluateResult(items: items, justUnlocked: justUnlocked);
  }

  /// Baut den Statistik-Schnappschuss aus den anderen Stores und wertet aus.
  Future<EvaluateResult> evaluateFromStores() {
    final repo = DialektRepository.instance;
    return evaluate(AchievementStats(
      gelerntCount: SrsStore.instance.learnedCount,
      streak: StreakStore.instance.count,
      level: XpStore.instance.level,
      favCount: FavoritesStore.instance.count,
      visitedCount: _visited.length,
      totalDialects: repo.dialekte.length,
      totalAvailable: repo.totalAusdruecke,
      visitedIds: _visited,
    ));
  }

  /// Alle Definitionen mit aktuellem Freischalt-Status (ohne Auswertung).
  List<AchievementView> status() => [
        for (final def in achievements)
          AchievementView(
            def: def,
            unlocked: _unlocked.containsKey(def.id),
            unlockedAt: _unlocked[def.id],
            justUnlocked: false,
          ),
      ];

  /// Sammler-Punktestand + Aufschlüsselung pro Rarität.
  AchievementScore score() {
    final tally = <String, ({int unlocked, int total})>{
      for (final r in Rarities.all) r.id: (unlocked: 0, total: 0),
    };
    var score = 0;
    var maxScore = 0;
    for (final def in achievements) {
      final r = def.rarity;
      final cur = tally[r.id]!;
      final isUnlocked = _unlocked.containsKey(def.id);
      tally[r.id] = (
        unlocked: cur.unlocked + (isUnlocked ? 1 : 0),
        total: cur.total + 1,
      );
      maxScore += r.points;
      if (isUnlocked) score += r.points;
    }
    return AchievementScore(
      score: score,
      maxScore: maxScore,
      byRarity: {
        for (final e in tally.entries)
          e.key: RarityTally(unlocked: e.value.unlocked, total: e.value.total),
      },
    );
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _prefsKey,
      json.encode(<String, dynamic>{
        'unlocked': _unlocked,
        'visited': _visited.toList(),
      }),
    );
  }

  @visibleForTesting
  void debugReset() {
    _unlocked.clear();
    _visited.clear();
    _loaded = false;
  }
}
