import 'package:flutter/material.dart';

import '../data/favorites_store.dart';
import '../theme/app_theme.dart';

/// Herz-Button, der den Favoriten-Status eines Ausdrucks toggelt und sich
/// reaktiv aktualisiert.
class FavoriteButton extends StatelessWidget {
  const FavoriteButton({
    super.key,
    required this.dialektId,
    required this.ausdruckId,
    this.size = 22,
  });

  final String dialektId;
  final String ausdruckId;
  final double size;

  @override
  Widget build(BuildContext context) {
    final store = FavoritesStore.instance;
    final surfaces = AppSurfaces.of(context);
    return ListenableBuilder(
      listenable: store,
      builder: (context, _) {
        final fav = store.isFavorite(dialektId, ausdruckId);
        return IconButton(
          visualDensity: VisualDensity.compact,
          tooltip: fav ? 'Aus Favoriten entfernen' : 'Zu Favoriten',
          onPressed: () => store.toggle(dialektId, ausdruckId),
          icon: Icon(
            fav ? Icons.favorite_rounded : Icons.favorite_border_rounded,
            size: size,
            color: fav ? AppColors.danger : surfaces.textMuted,
          ),
        );
      },
    );
  }
}
