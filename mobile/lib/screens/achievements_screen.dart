import 'package:flutter/material.dart';

import '../data/achievements_store.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';

/// Farbe je Rarität — abgeleitet aus der Brand-Palette.
Color rarityColor(Rarity r) {
  switch (r.id) {
    case 'rare':
      return AppColors.brand3;
    case 'epic':
      return AppColors.brand2;
    case 'legendary':
      return AppColors.warm;
    case 'common':
    default:
      return AppColors.accent;
  }
}

/// Erfolge-Screen: Sammler-Punktestand, Aufschlüsselung pro Rarität und ein
/// Raster aller Achievements (gesperrt ausgegraut, freigeschaltet farbig).
class AchievementsScreen extends StatefulWidget {
  const AchievementsScreen({super.key});

  @override
  State<AchievementsScreen> createState() => _AchievementsScreenState();
}

class _AchievementsScreenState extends State<AchievementsScreen> {
  @override
  void initState() {
    super.initState();
    // Beim Öffnen frisch auswerten — fängt zwischenzeitlich erreichte Erfolge.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      AchievementsStore.instance.evaluateFromStores();
    });
  }

  @override
  Widget build(BuildContext context) {
    final store = AchievementsStore.instance;
    return Scaffold(
      body: AuroraBackground(
        child: SafeArea(
          child: ListenableBuilder(
            listenable: store,
            builder: (context, _) {
              final items = store.status();
              final s = store.score();
              return ListView(
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
                        '🏆 Erfolge',
                        style: Theme.of(context).textTheme.headlineMedium
                            ?.copyWith(fontSize: 24),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.x4),
                  _ScoreHeader(score: s),
                  const SizedBox(height: AppSpacing.x5),
                  GridView.count(
                    crossAxisCount: 2,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    mainAxisSpacing: AppSpacing.x3,
                    crossAxisSpacing: AppSpacing.x3,
                    childAspectRatio: 1.0,
                    children: [
                      for (final v in items) _AchievementTile(view: v),
                    ],
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}

class _ScoreHeader extends StatelessWidget {
  const _ScoreHeader({required this.score});

  final AchievementScore score;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final unlocked = score.byRarity.values.fold(0, (a, b) => a + b.unlocked);
    final total = score.byRarity.values.fold(0, (a, b) => a + b.total);
    return GlassCard(
      padding: const EdgeInsets.all(AppSpacing.x5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              ShaderMask(
                shaderCallback: (b) => AppColors.brandGradient.createShader(b),
                child: Text(
                  '${score.score}',
                  style: TextStyle(fontFamily: 'Fraunces', 
                    fontSize: 40,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8, left: 4),
                child: Text(
                  '/ ${score.maxScore} Punkte',
                  style: TextStyle(fontSize: 14, color: surfaces.textMuted),
                ),
              ),
              const Spacer(),
              Text(
                '$unlocked / $total',
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: surfaces.textMuted,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.x4),
          Wrap(
            spacing: AppSpacing.x2,
            runSpacing: AppSpacing.x2,
            children: [
              for (final r in Rarities.all)
                _RarityChip(rarity: r, tally: score.byRarity[r.id]!),
            ],
          ),
        ],
      ),
    );
  }
}

class _RarityChip extends StatelessWidget {
  const _RarityChip({required this.rarity, required this.tally});

  final Rarity rarity;
  final RarityTally tally;

  @override
  Widget build(BuildContext context) {
    final color = rarityColor(rarity);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.14),
        borderRadius: BorderRadius.circular(AppRadii.pill),
        border: Border.all(color: color.withValues(alpha: 0.5)),
      ),
      child: Text(
        '${rarity.label} ${tally.unlocked}/${tally.total}',
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: color,
        ),
      ),
    );
  }
}

class _AchievementTile extends StatelessWidget {
  const _AchievementTile({required this.view});

  final AchievementView view;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final unlocked = view.unlocked;
    final color = rarityColor(view.def.rarity);
    return GlassCard(
      padding: const EdgeInsets.all(AppSpacing.x4),
      accent: unlocked ? color : null,
      child: Opacity(
        opacity: unlocked ? 1.0 : 0.55,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Stack(
              alignment: Alignment.center,
              children: [
                Container(
                  width: 52,
                  height: 52,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: color.withValues(alpha: unlocked ? 0.18 : 0.08),
                    shape: BoxShape.circle,
                  ),
                  child: Text(
                    view.def.icon,
                    style: const TextStyle(fontSize: 26),
                  ),
                ),
                if (!unlocked)
                  Icon(
                    Icons.lock_rounded,
                    size: 18,
                    color: surfaces.textMuted,
                  ),
              ],
            ),
            const SizedBox(height: AppSpacing.x2),
            Text(
              view.def.title,
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: unlocked
                    ? Theme.of(context).colorScheme.onSurface
                    : surfaces.textMuted,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              view.def.desc,
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontSize: 10.5,
                height: 1.3,
                color: surfaces.textMuted,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
