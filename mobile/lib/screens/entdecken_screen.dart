import 'package:flutter/material.dart';

import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/dialekt_card.dart';
import '../widgets/glass_card.dart';
import 'dialekt_detail_screen.dart';
import 'idiome_screen.dart';
import 'lektionen_screen.dart';
import 'vergleich_screen.dart';

class EntdeckenScreen extends StatelessWidget {
  const EntdeckenScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final repo = DialektRepository.instance;
    final surfaces = AppSurfaces.of(context);

    return AuroraBackground(
      child: SafeArea(
        bottom: false,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(
            AppSpacing.x5,
            AppSpacing.x5,
            AppSpacing.x5,
            120,
          ),
          children: [
            Text('🗺️ Dialekte entdecken',
                style: Theme.of(context).textTheme.headlineMedium
                    ?.copyWith(fontSize: 26)),
            const SizedBox(height: AppSpacing.x2),
            Text(
              '${repo.dialekte.length} Dialekte · ${repo.totalAusdruecke} Ausdrücke',
              style: TextStyle(color: surfaces.textMuted),
            ),
            const SizedBox(height: AppSpacing.x4),
            _FeatureCard(
              emoji: '🌍',
              accent: AppColors.accent,
              title: 'Dialekte vergleichen',
              subtitle: 'Dasselbe Wort quer durch die Regionen',
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const VergleichScreen()),
              ),
            ),
            const SizedBox(height: AppSpacing.x3),
            _FeatureCard(
              emoji: '📖',
              accent: AppColors.brand3,
              title: 'Mini-Lektionen',
              subtitle: 'Sprache, Geschichte & Kultur kurz erklärt',
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const LektionenScreen()),
              ),
            ),
            const SizedBox(height: AppSpacing.x3),
            _FeatureCard(
              emoji: '💬',
              accent: AppColors.brand2,
              title: 'Idiom-Explorer',
              subtitle: 'Redensarten gruppiert nach Bedeutung',
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const IdiomeScreen()),
              ),
            ),
            const SizedBox(height: AppSpacing.x5),
            for (final d in repo.dialekte) ...[
              DialektCard(
                dialekt: d,
                onTap: () => Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => DialektDetailScreen(dialekt: d),
                  ),
                ),
              ),
              const SizedBox(height: AppSpacing.x3),
            ],
          ],
        ),
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  const _FeatureCard({
    required this.emoji,
    required this.accent,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final String emoji;
  final Color accent;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      accent: accent,
      padding: const EdgeInsets.all(AppSpacing.x4),
      onTap: onTap,
      child: Row(
        children: [
          Text(emoji, style: const TextStyle(fontSize: 22)),
          const SizedBox(width: AppSpacing.x3),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: const TextStyle(
                        fontSize: 14.5, fontWeight: FontWeight.w700)),
                const SizedBox(height: 2),
                Text(subtitle,
                    style:
                        TextStyle(fontSize: 12.5, color: surfaces.textMuted)),
              ],
            ),
          ),
          Icon(Icons.chevron_right_rounded, color: surfaces.textMuted),
        ],
      ),
    );
  }
}
