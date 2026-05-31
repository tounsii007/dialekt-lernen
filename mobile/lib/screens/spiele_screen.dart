import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';
import 'blitz_game_screen.dart';
import 'memory_game_screen.dart';

/// Spiele-Hub: Auswahl der Mini-Spiele (Memory & Blitz). Port von
/// js/views/spiele.js (mobil als Hub mit mehreren Spielen).
class SpieleScreen extends StatelessWidget {
  const SpieleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return AuroraBackground(
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(
              AppSpacing.x5, AppSpacing.x4, AppSpacing.x5, AppSpacing.x7),
          children: [
            Row(
              children: [
                IconButton(
                  onPressed: () => Navigator.of(context).maybePop(),
                  icon: const Icon(Icons.arrow_back_rounded),
                ),
                Text('🎮 Mini-Spiele',
                    style: Theme.of(context)
                        .textTheme
                        .headlineMedium
                        ?.copyWith(fontSize: 24)),
              ],
            ),
            const SizedBox(height: AppSpacing.x2),
            Padding(
              padding: const EdgeInsets.only(left: AppSpacing.x2),
              child: Text(
                'Spielerisch lernen — gewinne XP und füttere deine Tagesquests.',
                style: TextStyle(
                    color: surfaces.textMuted, fontSize: 13.5, height: 1.4),
              ),
            ),
            const SizedBox(height: AppSpacing.x5),
            _GameCard(
              icon: '🧩',
              accent: AppColors.brand,
              title: 'Memory',
              description:
                  'Decke Paare auf: Dialekt-Ausdruck ↔ Hochdeutsch. Je weniger '
                  'Versuche, desto besser.',
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const MemoryGameScreen()),
              ),
            ),
            const SizedBox(height: AppSpacing.x3),
            _GameCard(
              icon: '⚡',
              accent: AppColors.warm,
              title: 'Blitz',
              description:
                  '60 Sekunden, so viele richtige Übersetzungen wie möglich. '
                  'Schnelligkeit zählt!',
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const BlitzGameScreen()),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _GameCard extends StatelessWidget {
  const _GameCard({
    required this.icon,
    required this.accent,
    required this.title,
    required this.description,
    required this.onTap,
  });

  final String icon;
  final Color accent;
  final String title;
  final String description;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      onTap: onTap,
      accent: accent,
      child: Row(
        children: [
          Container(
            width: 52,
            height: 52,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: accent.withValues(alpha: 0.16),
              borderRadius: BorderRadius.circular(AppRadii.md),
            ),
            child: Text(icon, style: const TextStyle(fontSize: 26)),
          ),
          const SizedBox(width: AppSpacing.x4),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: TextStyle(fontFamily: 'Fraunces', 
                        fontSize: 19, fontWeight: FontWeight.w700)),
                const SizedBox(height: 3),
                Text(description,
                    style: TextStyle(
                        fontSize: 12.5,
                        height: 1.4,
                        color: surfaces.textMuted)),
              ],
            ),
          ),
          const SizedBox(width: AppSpacing.x2),
          Icon(Icons.chevron_right_rounded, color: surfaces.textMuted),
        ],
      ),
    );
  }
}
