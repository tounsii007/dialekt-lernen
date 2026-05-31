import 'package:flutter/material.dart';

import '../data/quests_store.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';

/// Emoji-Icon je Quest-Metrik.
String _metricIcon(String metric) => switch (metric) {
      'review' => '🔁',
      'learn' => '📚',
      'xp' => '⚡',
      'quiz' => '🧠',
      'quizPerfect' => '🎯',
      'game' => '🎮',
      _ => '✨',
    };

/// Tägliche Quests (Duolingo-Style): drei Aufgaben pro Tag mit Fortschritt,
/// XP-Belohnung und einem Abschluss-Bonus. Port der Web-Quest-Ansicht.
class QuestsScreen extends StatelessWidget {
  const QuestsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = QuestsStore.instance;
    return AuroraBackground(
      child: SafeArea(
        child: ListenableBuilder(
          listenable: store,
          builder: (context, _) {
            final quests = store.activeWithProgress();
            final summary = store.summary();
            return ListView(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.x5,
                AppSpacing.x4,
                AppSpacing.x5,
                AppSpacing.x7,
              ),
              children: [
                _Header(done: summary.done, total: summary.total),
                const SizedBox(height: AppSpacing.x5),
                for (final q in quests) ...[
                  _QuestCard(view: q),
                  const SizedBox(height: AppSpacing.x3),
                ],
                if (summary.allDone) ...[
                  const SizedBox(height: AppSpacing.x2),
                  _BonusBanner(claimed: summary.bonusClaimed),
                ],
              ],
            );
          },
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  const _Header({required this.done, required this.total});

  final int done;
  final int total;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            IconButton(
              onPressed: () => Navigator.of(context).maybePop(),
              icon: const Icon(Icons.arrow_back_rounded),
            ),
            Text(
              '🎯 Tagesquests',
              style: Theme.of(context)
                  .textTheme
                  .headlineMedium
                  ?.copyWith(fontSize: 24),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.x2),
        Padding(
          padding: const EdgeInsets.only(left: AppSpacing.x2),
          child: Text(
            '$done / $total erledigt — täglich neu',
            style: TextStyle(color: surfaces.textMuted, fontSize: 14),
          ),
        ),
      ],
    );
  }
}

class _QuestCard extends StatelessWidget {
  const _QuestCard({required this.view});

  final QuestView view;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final def = view.def;
    final accent = view.done ? AppColors.success : AppColors.brand;
    return GlassCard(
      accent: accent,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(_metricIcon(def.metric),
                  style: const TextStyle(fontSize: 24)),
              const SizedBox(width: AppSpacing.x3),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      def.label,
                      style: const TextStyle(
                        fontSize: 15.5,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      def.hint,
                      style: TextStyle(
                        fontSize: 12.5,
                        color: surfaces.textMuted,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: AppSpacing.x2),
              if (view.done)
                const Icon(Icons.check_circle_rounded,
                    color: AppColors.success, size: 26)
              else
                _XpBadge(xp: def.xp),
            ],
          ),
          const SizedBox(height: AppSpacing.x3),
          Row(
            children: [
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(AppRadii.pill),
                  child: LinearProgressIndicator(
                    value: view.pct,
                    minHeight: 8,
                    backgroundColor: surfaces.border.withValues(alpha: 0.6),
                    valueColor: AlwaysStoppedAnimation<Color>(accent),
                  ),
                ),
              ),
              const SizedBox(width: AppSpacing.x3),
              Text(
                '${view.current} / ${def.target}',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: surfaces.textMuted,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _XpBadge extends StatelessWidget {
  const _XpBadge({required this.xp});

  final int xp;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: AppColors.warm.withValues(alpha: 0.16),
        borderRadius: BorderRadius.circular(AppRadii.pill),
      ),
      child: Text(
        '+$xp XP',
        style: const TextStyle(
          color: AppColors.warm,
          fontSize: 12.5,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class _BonusBanner extends StatelessWidget {
  const _BonusBanner({required this.claimed});

  final bool claimed;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.x5),
      decoration: BoxDecoration(
        gradient: AppColors.brandGradient,
        borderRadius: BorderRadius.circular(AppRadii.lg),
        boxShadow: [
          BoxShadow(
            color: AppColors.brand.withValues(alpha: 0.4),
            blurRadius: 30,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      child: Row(
        children: [
          const Text('🎉', style: TextStyle(fontSize: 30)),
          const SizedBox(width: AppSpacing.x3),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Alle Quests geschafft!',
                  style: TextStyle(fontFamily: 'Fraunces', 
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  claimed
                      ? 'Bonus von +$allDoneBonusXp XP gutgeschrieben.'
                      : 'Bonus +$allDoneBonusXp XP wartet auf dich.',
                  style: TextStyle(
                    fontSize: 13,
                    color: Colors.white.withValues(alpha: 0.9),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
