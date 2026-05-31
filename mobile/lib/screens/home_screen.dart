import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../data/achievements_store.dart';
import '../data/goals_store.dart';
import '../data/quests_store.dart';
import '../data/repository.dart';
import '../data/streak_store.dart';
import '../state/settings_controller.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/brand_logo.dart';
import '../widgets/dialekt_card.dart';
import '../widgets/glass_card.dart';
import '../widgets/gradient_button.dart';
import '../widgets/progress_hud.dart';
import 'achievements_screen.dart';
import 'dialekt_detail_screen.dart';
import 'goals_screen.dart';
import 'quests_screen.dart';
import 'search_screen.dart';
import 'settings_screen.dart';
import 'spiele_screen.dart';
import 'statistik_screen.dart';

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
                Expanded(
                  child: Text(
                    'Dialekto',
                    overflow: TextOverflow.ellipsis,
                    style: GoogleFonts.fraunces(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                IconButton(
                  tooltip: 'Spiele',
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const SpieleScreen()),
                  ),
                  icon: Icon(Icons.videogame_asset_rounded,
                      color: surfaces.textMuted),
                ),
                IconButton(
                  tooltip: 'Statistik',
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const StatistikScreen()),
                  ),
                  icon: Icon(Icons.bar_chart_rounded, color: surfaces.textMuted),
                ),
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
            const SizedBox(height: AppSpacing.x5),

            // In-App-Erinnerung (wenn heute noch nicht gelernt)
            _ReminderBanner(onLearn: () => onOpenTab(2)),

            // Fortschritts-HUD: Level, XP, Streak
            const ProgressHud(),
            const SizedBox(height: AppSpacing.x3),

            // Schnellzugriff: Tagesziel + Erfolge
            const _QuickTiles(),
            const SizedBox(height: AppSpacing.x3),

            // Tagesquests
            const _QuestsCard(),
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
                style: GoogleFonts.fraunces(
                  fontSize: 34,
                  height: 1.1,
                  fontWeight: FontWeight.w700,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
                children: [
                  const TextSpan(text: 'Lerne Dialekte aus '),
                  TextSpan(
                    text: 'ganz Deutschland',
                    style: GoogleFonts.fraunces(
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

class _QuickTiles extends StatelessWidget {
  const _QuickTiles();

  @override
  Widget build(BuildContext context) {
    final goals = GoalsStore.instance;
    final ach = AchievementsStore.instance;
    return Row(
      children: [
        Expanded(
          child: ListenableBuilder(
            listenable: goals,
            builder: (context, _) => _QuickTile(
              icon: '🎯',
              accent: AppColors.brand,
              title: 'Tagesziel',
              value: '${goals.todayProgress} / ${goals.target}',
              progress: goals.pct,
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const GoalsScreen()),
              ),
            ),
          ),
        ),
        const SizedBox(width: AppSpacing.x3),
        Expanded(
          child: ListenableBuilder(
            listenable: ach,
            builder: (context, _) => _QuickTile(
              icon: '🏆',
              accent: AppColors.warm,
              title: 'Erfolge',
              value: '${ach.unlockedCount} / ${achievements.length}',
              progress: achievements.isEmpty
                  ? 0.0
                  : ach.unlockedCount / achievements.length,
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const AchievementsScreen()),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _ReminderBanner extends StatelessWidget {
  const _ReminderBanner({required this.onLearn});
  final VoidCallback onLearn;

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: Listenable.merge(
          [SettingsController.instance, StreakStore.instance]),
      builder: (context, _) {
        final show = SettingsController.instance
            .shouldRemind(DateTime.now(), StreakStore.instance.lastDay);
        if (!show) return const SizedBox.shrink();
        return Padding(
          padding: const EdgeInsets.only(bottom: AppSpacing.x3),
          child: GlassCard(
            onTap: onLearn,
            accent: AppColors.warm,
            padding: const EdgeInsets.all(AppSpacing.x4),
            child: Row(
              children: [
                const Text('🔔', style: TextStyle(fontSize: 22)),
                const SizedBox(width: AppSpacing.x3),
                const Expanded(
                  child: Text(
                    'Zeit zum Lernen! Heute noch keine Karte geübt.',
                    style: TextStyle(
                        fontSize: 13.5, fontWeight: FontWeight.w600),
                  ),
                ),
                Icon(Icons.chevron_right_rounded,
                    color: AppSurfaces.of(context).textMuted),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _QuestsCard extends StatelessWidget {
  const _QuestsCard();

  @override
  Widget build(BuildContext context) {
    final store = QuestsStore.instance;
    final surfaces = AppSurfaces.of(context);
    return ListenableBuilder(
      listenable: store,
      builder: (context, _) {
        final summary = store.summary();
        final pct = summary.total == 0 ? 0.0 : summary.done / summary.total;
        return GlassCard(
          onTap: () => Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => const QuestsScreen()),
          ),
          accent: AppColors.accent,
          padding: const EdgeInsets.all(AppSpacing.x4),
          child: Row(
            children: [
              const Text('🗺️', style: TextStyle(fontSize: 22)),
              const SizedBox(width: AppSpacing.x3),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Expanded(
                          child: Text(
                            'Tagesquests',
                            style: TextStyle(
                              fontSize: 14.5,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                        Text(
                          summary.allDone
                              ? 'Alle erledigt 🎉'
                              : '${summary.done} / ${summary.total} erledigt',
                          style: TextStyle(
                            fontSize: 12.5,
                            color: surfaces.textMuted,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.x2),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(AppRadii.pill),
                      child: LinearProgressIndicator(
                        value: pct.clamp(0.0, 1.0),
                        minHeight: 6,
                        backgroundColor:
                            surfaces.border.withValues(alpha: 0.6),
                        valueColor: const AlwaysStoppedAnimation<Color>(
                          AppColors.accent,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: AppSpacing.x2),
              Icon(Icons.chevron_right_rounded, color: surfaces.textMuted),
            ],
          ),
        );
      },
    );
  }
}

class _QuickTile extends StatelessWidget {
  const _QuickTile({
    required this.icon,
    required this.accent,
    required this.title,
    required this.value,
    required this.progress,
    required this.onTap,
  });

  final String icon;
  final Color accent;
  final String title;
  final String value;
  final double progress;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      onTap: onTap,
      accent: accent,
      padding: const EdgeInsets.all(AppSpacing.x4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(icon, style: const TextStyle(fontSize: 20)),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.x2),
          Text(
            value,
            style: GoogleFonts.fraunces(
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: accent,
            ),
          ),
          const SizedBox(height: AppSpacing.x2),
          ClipRRect(
            borderRadius: BorderRadius.circular(AppRadii.pill),
            child: LinearProgressIndicator(
              value: progress.clamp(0.0, 1.0),
              minHeight: 6,
              backgroundColor: surfaces.border.withValues(alpha: 0.6),
              valueColor: AlwaysStoppedAnimation<Color>(accent),
            ),
          ),
        ],
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
              style: GoogleFonts.fraunces(
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
