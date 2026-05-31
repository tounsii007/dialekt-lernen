import 'package:flutter/material.dart';

import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/brand_logo.dart';
import '../widgets/dialekt_card.dart';
import '../widgets/gradient_button.dart';
import 'dialekt_detail_screen.dart';
import 'search_screen.dart';
import 'settings_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, required this.onOpenTab});

  /// Wechselt einen Tab in der AppShell (0=Start … 4=Favoriten).
  final ValueChanged<int> onOpenTab;

  @override
  Widget build(BuildContext context) {
    final repo = DialektRepository.instance;
    final surfaces = AppSurfaces.of(context);
    final preview = repo.dialekte.take(5).toList();

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
            // Topbar mini
            Row(
              children: [
                const BrandLogo(size: 38),
                const SizedBox(width: AppSpacing.x3),
                Text(
                  'Dialekto',
                  style: const TextStyle(fontFamily: 'Fraunces').copyWith(
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const Spacer(),
                IconButton(
                  tooltip: 'Suchen',
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const SearchScreen()),
                  ),
                  icon: Icon(Icons.search_rounded, color: surfaces.textMuted),
                ),
                IconButton(
                  tooltip: 'Einstellungen',
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const SettingsScreen()),
                  ),
                  icon: Icon(Icons.settings_rounded, color: surfaces.textMuted),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.x6),

            // Eyebrow
            Container(
              padding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.x3,
                vertical: 6,
              ),
              decoration: BoxDecoration(
                color: AppColors.brand.withValues(alpha: 0.14),
                borderRadius: BorderRadius.circular(AppRadii.pill),
              ),
              child: const Text(
                '✨  Deutsche Sprachvielfalt entdecken',
                style: TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w600,
                  color: AppColors.brand,
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.x4),

            // Headline mit Gradient-Wort
            RichText(
              text: TextSpan(
                style: const TextStyle(fontFamily: 'Fraunces').copyWith(
                  fontSize: 34,
                  height: 1.1,
                  fontWeight: FontWeight.w700,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
                children: [
                  const TextSpan(text: 'Lerne Dialekte aus '),
                  TextSpan(
                    text: 'ganz Deutschland',
                    style: const TextStyle(fontFamily: 'Fraunces').copyWith(
                      fontSize: 34,
                      height: 1.1,
                      fontWeight: FontWeight.w700,
                      foreground: Paint()
                        ..shader = AppColors.brandGradient.createShader(
                          const Rect.fromLTWH(0, 0, 300, 60),
                        ),
                    ),
                  ),
                  const TextSpan(text: '.'),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.x3),
            Text(
              'Vom Frankfurter „Ei guude" bis zum Wiener „Schmäh": '
              'regionale Ausdrücke entdecken, mit Karteikarten lernen und '
              'im Quiz testen — alles erklärt auf Hochdeutsch.',
              style: TextStyle(
                fontSize: 14.5,
                height: 1.5,
                color: surfaces.textMuted,
              ),
            ),
            const SizedBox(height: AppSpacing.x5),

            // CTAs
            Wrap(
              spacing: AppSpacing.x3,
              runSpacing: AppSpacing.x3,
              children: [
                GradientButton(
                  label: 'Dialekte entdecken',
                  icon: Icons.explore_rounded,
                  onPressed: () => onOpenTab(1),
                ),
                GradientButton(
                  label: 'Karteikarten',
                  variant: BtnVariant.secondary,
                  icon: Icons.style_rounded,
                  onPressed: () => onOpenTab(2),
                ),
                GradientButton(
                  label: 'Quiz',
                  variant: BtnVariant.ghost,
                  onPressed: () => onOpenTab(3),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.x6),

            // Stats
            Row(
              children: [
                _Stat(value: '${repo.dialekte.length}', label: 'Dialekte'),
                _Stat(value: '${repo.totalAusdruecke}', label: 'Ausdrücke'),
                _Stat(
                  value: '${repo.kategorien.length}',
                  label: 'Kategorien',
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.x7),

            // Dialekt-Vorschau
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Beliebte Dialekte',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                TextButton(
                  onPressed: () => onOpenTab(1),
                  child: const Text('Alle ansehen'),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.x3),
            for (final d in preview) ...[
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

class _Stat extends StatelessWidget {
  const _Stat({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Expanded(
      child: Column(
        children: [
          ShaderMask(
            shaderCallback: (b) => AppColors.brandGradient.createShader(b),
            child: Text(
              value,
              style: const TextStyle(fontFamily: 'Fraunces').copyWith(
                fontSize: 28,
                fontWeight: FontWeight.w700,
                color: Colors.white,
              ),
            ),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(fontSize: 12, color: surfaces.textMuted),
          ),
        ],
      ),
    );
  }
}
