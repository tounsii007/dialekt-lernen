import 'package:flutter/material.dart';

import '../data/favorites_store.dart';
import '../data/models.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/favorite_button.dart';
import '../widgets/glass_card.dart';
import '../widgets/placeholder_view.dart';
import 'dialekt_detail_screen.dart';

class FavoritenScreen extends StatelessWidget {
  const FavoritenScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = FavoritesStore.instance;
    final repo = DialektRepository.instance;
    final surfaces = AppSurfaces.of(context);

    return AuroraBackground(
      child: SafeArea(
        bottom: false,
        child: ListenableBuilder(
          listenable: store,
          builder: (context, _) {
            final entries = <({Dialekt dialekt, Ausdruck ausdruck})>[];
            for (final d in repo.dialekte) {
              for (final a in d.ausdruecke) {
                if (store.isFavorite(d.id, a.id)) {
                  entries.add((dialekt: d, ausdruck: a));
                }
              }
            }

            if (entries.isEmpty) {
              return const PlaceholderView(
                emoji: '🤍',
                title: 'Noch keine Favoriten',
                message:
                    'Tippe das Herz an einem Ausdruck (in einem Dialekt), um ihn hier zu sammeln.',
                accent: AppColors.accent,
              );
            }

            return ListView(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.x5,
                AppSpacing.x5,
                AppSpacing.x5,
                120,
              ),
              children: [
                Text('❤️ Favoriten',
                    style: Theme.of(context).textTheme.headlineMedium
                        ?.copyWith(fontSize: 26)),
                const SizedBox(height: AppSpacing.x2),
                Text('${entries.length} gemerkt',
                    style: TextStyle(color: surfaces.textMuted)),
                const SizedBox(height: AppSpacing.x5),
                for (final e in entries) ...[
                  _FavTile(dialekt: e.dialekt, ausdruck: e.ausdruck),
                  const SizedBox(height: AppSpacing.x3),
                ],
              ],
            );
          },
        ),
      ),
    );
  }
}

class _FavTile extends StatelessWidget {
  const _FavTile({required this.dialekt, required this.ausdruck});

  final Dialekt dialekt;
  final Ausdruck ausdruck;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      accent: dialekt.color,
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.x4,
        AppSpacing.x2,
        AppSpacing.x2,
        AppSpacing.x2,
      ),
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => DialektDetailScreen(dialekt: dialekt),
        ),
      ),
      child: Row(
        children: [
          Text(dialekt.flag, style: const TextStyle(fontSize: 26)),
          const SizedBox(width: AppSpacing.x3),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  ausdruck.ausdruck,
                  style: Theme.of(context)
                      .textTheme
                      .titleLarge
                      ?.copyWith(fontSize: 16),
                ),
                const SizedBox(height: 2),
                Text(
                  ausdruck.hochdeutsch,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(fontSize: 13, color: surfaces.textMuted),
                ),
              ],
            ),
          ),
          FavoriteButton(dialektId: dialekt.id, ausdruckId: ausdruck.id),
        ],
      ),
    );
  }
}
