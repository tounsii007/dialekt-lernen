import 'package:flutter/material.dart';

import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/dialekt_card.dart';
import '../widgets/glass_card.dart';
import 'dialekt_detail_screen.dart';
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
            GlassCard(
              accent: AppColors.accent,
              padding: const EdgeInsets.all(AppSpacing.x4),
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const VergleichScreen()),
              ),
              child: Row(
                children: [
                  const Text('🌍', style: TextStyle(fontSize: 22)),
                  const SizedBox(width: AppSpacing.x3),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Dialekte vergleichen',
                            style: TextStyle(
                                fontSize: 14.5, fontWeight: FontWeight.w700)),
                        const SizedBox(height: 2),
                        Text(
                          'Dasselbe Wort quer durch die Regionen',
                          style: TextStyle(
                              fontSize: 12.5, color: surfaces.textMuted),
                        ),
                      ],
                    ),
                  ),
                  Icon(Icons.chevron_right_rounded, color: surfaces.textMuted),
                ],
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
