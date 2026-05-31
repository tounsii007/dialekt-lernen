import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../data/streak_store.dart';
import '../data/xp_store.dart';
import '../theme/app_theme.dart';
import 'glass_card.dart';

/// Fortschritts-HUD für die Startseite: Level-Badge + Titel, XP-Fortschritts-
/// balken und Tages-Streak. Reagiert live auf XpStore und StreakStore.
class ProgressHud extends StatelessWidget {
  const ProgressHud({super.key});

  @override
  Widget build(BuildContext context) {
    final xp = XpStore.instance;
    final streak = StreakStore.instance;

    return ListenableBuilder(
      listenable: Listenable.merge([xp, streak]),
      builder: (context, _) {
        final p = xp.progress;
        return GlassCard(
          padding: const EdgeInsets.all(AppSpacing.x4),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  _LevelBadge(level: p.level),
                  const SizedBox(width: AppSpacing.x3),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          xp.title,
                          style: GoogleFonts.fraunces(
                            fontSize: 17,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        Text(
                          'Level ${p.level}',
                          style: TextStyle(
                            fontSize: 12.5,
                            color: AppSurfaces.of(context).textMuted,
                          ),
                        ),
                      ],
                    ),
                  ),
                  _StreakChip(count: streak.count),
                ],
              ),
              const SizedBox(height: AppSpacing.x3),
              _XpBar(progress: p.progress),
              const SizedBox(height: 6),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${p.current} / ${p.needed} XP',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: AppSurfaces.of(context).textMuted,
                    ),
                  ),
                  Text(
                    '${xp.total} XP gesamt',
                    style: TextStyle(
                      fontSize: 12,
                      color: AppSurfaces.of(context).textMuted,
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}

class _LevelBadge extends StatelessWidget {
  const _LevelBadge({required this.level});

  final int level;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 44,
      height: 44,
      alignment: Alignment.center,
      decoration: const BoxDecoration(
        gradient: AppColors.brandGradient,
        shape: BoxShape.circle,
      ),
      child: Text(
        '$level',
        style: GoogleFonts.fraunces(
          fontSize: 19,
          fontWeight: FontWeight.w700,
          color: Colors.white,
        ),
      ),
    );
  }
}

class _StreakChip extends StatelessWidget {
  const _StreakChip({required this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    final active = count > 0;
    final color = active ? AppColors.warm : AppSurfaces.of(context).textMuted;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: color.withValues(alpha: active ? 0.16 : 0.10),
        borderRadius: BorderRadius.circular(AppRadii.pill),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(active ? '🔥' : '🌱', style: const TextStyle(fontSize: 14)),
          const SizedBox(width: 5),
          Text(
            '$count',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}

class _XpBar extends StatelessWidget {
  const _XpBar({required this.progress});

  final double progress;

  @override
  Widget build(BuildContext context) {
    final track = AppSurfaces.of(context).border;
    return ClipRRect(
      borderRadius: BorderRadius.circular(AppRadii.pill),
      child: Stack(
        children: [
          Container(height: 10, color: track.withValues(alpha: 0.6)),
          FractionallySizedBox(
            widthFactor: progress.clamp(0.0, 1.0),
            child: Container(
              height: 10,
              decoration: const BoxDecoration(
                gradient: AppColors.brandGradient,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
