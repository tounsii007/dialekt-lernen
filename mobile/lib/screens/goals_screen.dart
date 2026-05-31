import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../data/goals_store.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';

/// Tagesziel-Screen: Ring mit heutigem Fortschritt, Zielauswahl (5/10/20/50)
/// und ein 14-Tage-Verlauf. Reagiert live auf den GoalsStore.
class GoalsScreen extends StatelessWidget {
  const GoalsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final goals = GoalsStore.instance;
    return Scaffold(
      body: AuroraBackground(
        child: SafeArea(
          child: ListenableBuilder(
            listenable: goals,
            builder: (context, _) => ListView(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.x4,
                AppSpacing.x2,
                AppSpacing.x4,
                120,
              ),
              children: [
                Row(
                  children: [
                    IconButton(
                      onPressed: () => Navigator.of(context).pop(),
                      icon: const Icon(Icons.arrow_back_rounded),
                    ),
                    const SizedBox(width: AppSpacing.x1),
                    Text(
                      '🎯 Tagesziel',
                      style: Theme.of(context).textTheme.headlineMedium
                          ?.copyWith(fontSize: 24),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.x4),
                _GoalRing(
                  progress: goals.todayProgress,
                  target: goals.target,
                  pct: goals.pct,
                  isMet: goals.isMet,
                ),
                const SizedBox(height: AppSpacing.x6),
                Text(
                  'Ziel pro Tag',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: AppSpacing.x3),
                Wrap(
                  spacing: AppSpacing.x3,
                  runSpacing: AppSpacing.x3,
                  children: [
                    for (final opt in goals.options)
                      _TargetChip(
                        key: ValueKey('goal-target-$opt'),
                        value: opt,
                        selected: opt == goals.target,
                        onTap: () => goals.setTarget(opt),
                      ),
                  ],
                ),
                const SizedBox(height: AppSpacing.x6),
                Text(
                  'Letzte 14 Tage',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: AppSpacing.x3),
                _HistoryChart(days: goals.history(days: 14)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _GoalRing extends StatelessWidget {
  const _GoalRing({
    required this.progress,
    required this.target,
    required this.pct,
    required this.isMet,
  });

  final int progress;
  final int target;
  final double pct;
  final bool isMet;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final ringColor = isMet ? AppColors.success : AppColors.brand;
    return GlassCard(
      padding: const EdgeInsets.all(AppSpacing.x6),
      child: Column(
        children: [
          SizedBox(
            width: 180,
            height: 180,
            child: Stack(
              alignment: Alignment.center,
              children: [
                SizedBox(
                  width: 180,
                  height: 180,
                  child: CircularProgressIndicator(
                    value: pct,
                    strokeWidth: 14,
                    strokeCap: StrokeCap.round,
                    backgroundColor: surfaces.border.withValues(alpha: 0.5),
                    valueColor: AlwaysStoppedAnimation<Color>(ringColor),
                  ),
                ),
                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      '$progress',
                      style: GoogleFonts.fraunces(
                        fontSize: 44,
                        fontWeight: FontWeight.w700,
                        color: ringColor,
                      ),
                    ),
                    Text(
                      'von $target',
                      style: TextStyle(
                        fontSize: 14,
                        color: surfaces.textMuted,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.x4),
          Text(
            isMet ? '🎉 Tagesziel erreicht!' : 'Noch ${target - progress} Karten',
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w600,
              color: isMet ? AppColors.success : surfaces.textMuted,
            ),
          ),
        ],
      ),
    );
  }
}

class _TargetChip extends StatelessWidget {
  const _TargetChip({
    super.key,
    required this.value,
    required this.selected,
    required this.onTap,
  });

  final int value;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(AppRadii.pill),
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.x5,
            vertical: AppSpacing.x3,
          ),
          decoration: BoxDecoration(
            gradient: selected ? AppColors.brandGradient : null,
            color: selected ? null : surfaces.surface.withValues(alpha: 0.6),
            borderRadius: BorderRadius.circular(AppRadii.pill),
            border: Border.all(
              color: selected ? Colors.transparent : surfaces.border,
            ),
          ),
          child: Text(
            '$value',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: selected ? Colors.white : surfaces.textMuted,
            ),
          ),
        ),
      ),
    );
  }
}

class _HistoryChart extends StatelessWidget {
  const _HistoryChart({required this.days});

  final List<DayProgress> days;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final maxCount = days.fold<int>(
      1,
      (m, d) => d.count > m ? d.count : m,
    );
    return GlassCard(
      padding: const EdgeInsets.all(AppSpacing.x4),
      child: SizedBox(
        height: 140,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            for (final d in days)
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 2),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        d.count > 0 ? '${d.count}' : '',
                        style: TextStyle(
                          fontSize: 9,
                          color: surfaces.textMuted,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Container(
                        height: (100 * d.count / maxCount).clamp(3.0, 100.0),
                        decoration: BoxDecoration(
                          color: d.met
                              ? AppColors.success
                              : (d.count > 0
                                  ? AppColors.brand
                                  : surfaces.border),
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${d.date.day}',
                        style: TextStyle(
                          fontSize: 9,
                          color: surfaces.textMuted,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
