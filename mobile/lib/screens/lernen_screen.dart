import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../data/achievements_store.dart';
import '../data/combo_controller.dart';
import '../data/goals_store.dart';
import '../data/models.dart';
import '../data/quests_store.dart';
import '../data/repository.dart';
import '../data/srs_store.dart';
import '../data/streak_store.dart';
import '../data/xp_store.dart';
import '../util/fsrs.dart';
import '../util/haptics.dart';
import '../util/interval_format.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/gradient_button.dart';
import '../widgets/level_up_overlay.dart';
import '../widgets/speak_button.dart';

const int _kSessionSize = 20;

typedef _Card = ({Dialekt dialekt, Ausdruck ausdruck, String key});

class LernenScreen extends StatefulWidget {
  const LernenScreen({super.key});

  @override
  State<LernenScreen> createState() => _LernenScreenState();
}

class _LernenScreenState extends State<LernenScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _flip;
  List<_Card> _session = [];
  int _index = 0;
  bool _showBack = false;
  bool _finished = false;
  bool _studyAhead = false;
  final Map<int, int> _ratings = {}; // rating -> count

  @override
  void initState() {
    super.initState();
    _flip = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 420),
    );
    _buildSession();
  }

  @override
  void dispose() {
    _flip.dispose();
    super.dispose();
  }

  void _buildSession({bool studyAhead = false}) {
    ComboController.instance.reset();
    final srs = SrsStore.instance;
    final now = DateTime.now().millisecondsSinceEpoch;
    final all = <_Card>[
      for (final p in DialektRepository.instance.alleMitDialekt)
        (
          dialekt: p.dialekt,
          ausdruck: p.ausdruck,
          key: '${p.dialekt.id}.${p.ausdruck.id}',
        ),
    ];

    List<_Card> pool;
    if (studyAhead) {
      pool = List.of(all)..shuffle(math.Random());
    } else {
      // Fällige zuerst — nach Retrievability sortiert (am stärksten vom
      // Vergessen bedrohte zuerst, schlägt Ankis reine Fälligkeits-Sortierung),
      // `due` als stabiler Gleichstand-Tie. Dann neue Karten.
      final due = all.where((c) => !srs.isNew(c.key) && srs.isDue(c.key, now)).toList()
        ..sort((a, b) {
          final byR = srs.retrievabilityOf(a.key, now)
              .compareTo(srs.retrievabilityOf(b.key, now));
          if (byR != 0) return byR;
          return (srs.get(a.key)?.due ?? 0).compareTo(srs.get(b.key)?.due ?? 0);
        });
      final fresh = all.where((c) => srs.isNew(c.key)).toList()
        ..shuffle(math.Random());
      pool = [...due, ...fresh];
    }

    setState(() {
      _session = pool.take(_kSessionSize).toList();
      _index = 0;
      _showBack = false;
      _finished = _session.isEmpty;
      _studyAhead = studyAhead;
      _ratings.clear();
    });
    _flip.reset();
  }

  void _toggle() {
    setState(() => _showBack = !_showBack);
    if (_showBack) {
      _flip.forward();
    } else {
      _flip.reverse();
    }
  }

  Future<void> _rate(int grade) async {
    final card = _session[_index];
    final wasNew = SrsStore.instance.isNew(card.key);
    final correct = grade != gradeAgain;
    correct ? Haptics.light() : Haptics.error();

    await SrsStore.instance.reviewScheduled(card.key, grade: grade);
    await StreakStore.instance.register();
    await GoalsStore.instance.increment();

    // Combo aufbauen/brechen und XP mit Multiplikator gutschreiben.
    final combo = ComboController.instance.registerHit(correct);
    final baseXp = wasNew ? XpReward.cardLearned : XpReward.cardReviewed;
    final gainedXp = applyComboToXp(baseXp, combo.multiplier);
    final reason = wasNew ? 'card-learned' : 'card-reviewed';
    final award = await XpStore.instance.award(gainedXp, reason);
    await QuestsStore.instance.trackFromReason(reason, gainedXp);

    _ratings.update(grade, (v) => v + 1, ifAbsent: () => 1);

    if (!mounted) return;
    if (award.levelUp) {
      await showLevelUpCelebration(
        context,
        level: award.level,
        title: levelTitle(award.level),
      );
      if (!mounted) return;
    }

    if (_index + 1 >= _session.length) {
      await AchievementsStore.instance.evaluateFromStores();
      if (!mounted) return;
      setState(() => _finished = true);
      return;
    }
    setState(() {
      _index++;
      _showBack = false;
    });
    _flip.reset();
  }

  @override
  Widget build(BuildContext context) {
    if (_finished) {
      return AuroraBackground(
        child: SafeArea(child: _buildSummary(context)),
      );
    }
    return AuroraBackground(
      child: SafeArea(bottom: false, child: _buildSessionView(context)),
    );
  }

  Widget _buildSessionView(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final card = _session[_index];
    // FSRS-Intervall-Vorschau je Bewertung (null im SM-2-Modus → keine Hints).
    final preview = SrsStore.instance.previewFor(card.key);

    return Padding(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.x5,
        AppSpacing.x5,
        AppSpacing.x5,
        120,
      ),
      child: Column(
        children: [
          Row(
            children: [
              Text('🃏 Lernen',
                  style: Theme.of(context).textTheme.headlineMedium
                      ?.copyWith(fontSize: 24)),
              const Spacer(),
              const _ComboBadge(),
              SpeakButton(
                text: card.ausdruck.ausdruck,
                lang: card.dialekt.lang,
              ),
              Text('${_index + 1} / ${_session.length}',
                  style: TextStyle(color: surfaces.textMuted)),
            ],
          ),
          const SizedBox(height: AppSpacing.x3),
          Row(
            children: [
              Text(card.dialekt.flag, style: const TextStyle(fontSize: 16)),
              const SizedBox(width: 6),
              Text(
                _studyAhead ? '${card.dialekt.name} · Üben' : card.dialekt.name,
                style: TextStyle(color: card.dialekt.color, fontSize: 13),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.x4),
          Expanded(
            child: Center(
              child: GestureDetector(
                onTap: _toggle,
                child: AnimatedBuilder(
                  animation: _flip,
                  builder: (context, _) {
                    final angle = _flip.value * math.pi;
                    final isBack = angle > math.pi / 2;
                    return Transform(
                      alignment: Alignment.center,
                      transform: Matrix4.identity()
                        ..setEntry(3, 2, 0.001)
                        ..rotateY(angle),
                      child: isBack
                          ? Transform(
                              alignment: Alignment.center,
                              transform: Matrix4.identity()..rotateY(math.pi),
                              child: _CardFace(
                                title: card.ausdruck.hochdeutsch,
                                subtitle: card.ausdruck.bedeutung,
                                accent: AppColors.accent,
                                tag: 'Hochdeutsch',
                              ),
                            )
                          : _CardFace(
                              title: card.ausdruck.ausdruck,
                              subtitle: card.ausdruck.beispiel.isNotEmpty
                                  ? '„${card.ausdruck.beispiel}"'
                                  : 'Tippen zum Umdrehen',
                              accent: AppColors.brand,
                              tag: 'Dialekt',
                            ),
                    );
                  },
                ),
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.x4),
          if (!_showBack)
            GradientButton(
              label: 'Aufdecken',
              icon: Icons.visibility_rounded,
              expand: true,
              onPressed: _toggle,
            )
          else
            Row(
              children: [
                _RateButton(
                  label: 'Nochmal',
                  color: AppColors.danger,
                  hint: preview == null ? null : formatInterval(preview[gradeAgain]!),
                  onTap: () => _rate(gradeAgain),
                ),
                const SizedBox(width: AppSpacing.x2),
                _RateButton(
                  label: 'Schwer',
                  color: AppColors.warning,
                  hint: preview == null ? null : formatInterval(preview[gradeHard]!),
                  onTap: () => _rate(gradeHard),
                ),
                const SizedBox(width: AppSpacing.x2),
                _RateButton(
                  label: 'Gut',
                  color: AppColors.accent2,
                  hint: preview == null ? null : formatInterval(preview[gradeGood]!),
                  onTap: () => _rate(gradeGood),
                ),
                const SizedBox(width: AppSpacing.x2),
                _RateButton(
                  label: 'Leicht',
                  color: AppColors.success,
                  hint: preview == null ? null : formatInterval(preview[gradeEasy]!),
                  onTap: () => _rate(gradeEasy),
                ),
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildSummary(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final reviewed = _ratings.values.fold(0, (a, b) => a + b);
    final srs = SrsStore.instance;
    final remainingDue = srs.dueCount(
      DialektRepository.instance.alleMitDialekt
          .map((p) => '${p.dialekt.id}.${p.ausdruck.id}'),
    );

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.x6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(reviewed == 0 ? '🎉' : '✅',
                style: const TextStyle(fontSize: 64)),
            const SizedBox(height: AppSpacing.x4),
            Text(
              reviewed == 0 ? 'Alles erledigt!' : 'Session geschafft',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: AppSpacing.x3),
            Text(
              reviewed == 0
                  ? 'Aktuell sind keine Karten fällig. Komm später wieder — oder übe schon mal voraus.'
                  : '$reviewed Karten gelernt · noch $remainingDue fällig',
              textAlign: TextAlign.center,
              style: TextStyle(color: surfaces.textMuted, height: 1.5),
            ),
            const SizedBox(height: AppSpacing.x6),
            if (remainingDue > 0)
              GradientButton(
                label: 'Weiter lernen',
                icon: Icons.play_arrow_rounded,
                onPressed: () => _buildSession(),
              )
            else
              GradientButton(
                label: 'Voraus üben',
                icon: Icons.fast_forward_rounded,
                onPressed: () => _buildSession(studyAhead: true),
              ),
          ],
        ),
      ),
    );
  }
}

class _RateButton extends StatelessWidget {
  const _RateButton({
    required this.label,
    required this.color,
    required this.onTap,
    this.hint,
  });

  final String label;
  final Color color;
  final VoidCallback onTap;

  /// Optionaler Intervall-Hinweis (FSRS-Vorschau) unter dem Label.
  final String? hint;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(AppRadii.md),
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.symmetric(
              vertical: AppSpacing.x3,
              horizontal: 2,
            ),
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.14),
              borderRadius: BorderRadius.circular(AppRadii.md),
              border: Border.all(color: color.withValues(alpha: 0.6)),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: color,
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                  ),
                ),
                if (hint != null) ...[
                  const SizedBox(height: 2),
                  Text(
                    hint!,
                    style: TextStyle(
                      color: color.withValues(alpha: 0.78),
                      fontSize: 11,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Live-Combo-Anzeige im Kopf: erscheint ab 2 in Folge, zeigt Zähler und (ab
/// Tier-Schwelle) den XP-Multiplikator.
class _ComboBadge extends StatelessWidget {
  const _ComboBadge();

  static String _fmtMult(double m) =>
      m.toStringAsFixed(2).replaceFirst(RegExp(r'\.?0+$'), '');

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: ComboController.instance,
      builder: (context, _) {
        final combo = ComboController.instance;
        if (combo.count < 2) return const SizedBox.shrink();
        final mult = combo.multiplier;
        final label = mult > 1.0
            ? '🔥 ${combo.count} · ${_fmtMult(mult)}×'
            : '🔥 ${combo.count}';
        return Padding(
          padding: const EdgeInsets.only(right: AppSpacing.x2),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            decoration: BoxDecoration(
              color: AppColors.warm.withValues(alpha: 0.16),
              borderRadius: BorderRadius.circular(AppRadii.pill),
              border: Border.all(color: AppColors.warm.withValues(alpha: 0.5)),
            ),
            child: Text(
              label,
              style: const TextStyle(
                color: AppColors.warm,
                fontSize: 12.5,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        );
      },
    );
  }
}

class _CardFace extends StatelessWidget {
  const _CardFace({
    required this.title,
    required this.subtitle,
    required this.accent,
    required this.tag,
  });

  final String title;
  final String subtitle;
  final Color accent;
  final String tag;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Container(
      width: double.infinity,
      constraints: const BoxConstraints(minHeight: 260, maxHeight: 420),
      padding: const EdgeInsets.all(AppSpacing.x6),
      decoration: BoxDecoration(
        color: surfaces.surface.withValues(alpha: 0.85),
        borderRadius: BorderRadius.circular(AppRadii.xl),
        border: Border.all(color: accent.withValues(alpha: 0.4), width: 1.5),
        boxShadow: [
          BoxShadow(
            color: accent.withValues(alpha: 0.25),
            blurRadius: 40,
            offset: const Offset(0, 16),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
            decoration: BoxDecoration(
              color: accent.withValues(alpha: 0.16),
              borderRadius: BorderRadius.circular(AppRadii.pill),
            ),
            child: Text(
              tag,
              style: TextStyle(
                color: accent,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.x5),
          Flexible(
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    title,
                    textAlign: TextAlign.center,
                    style: Theme.of(context)
                        .textTheme
                        .headlineMedium
                        ?.copyWith(fontSize: 26),
                  ),
                  if (subtitle.isNotEmpty) ...[
                    const SizedBox(height: AppSpacing.x4),
                    Text(
                      subtitle,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 15,
                        height: 1.5,
                        color: surfaces.textMuted,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
