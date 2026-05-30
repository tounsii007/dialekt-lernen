import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

/// Gestalteter Leer-/Bald-verfügbar-Zustand.
class PlaceholderView extends StatelessWidget {
  const PlaceholderView({
    super.key,
    required this.emoji,
    required this.title,
    required this.message,
    required this.accent,
  });

  final String emoji;
  final String title;
  final String message;
  final Color accent;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.x6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 96,
              height: 96,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: accent.withValues(alpha: 0.14),
                shape: BoxShape.circle,
              ),
              child: Text(emoji, style: const TextStyle(fontSize: 44)),
            ),
            const SizedBox(height: AppSpacing.x5),
            Text(title, style: Theme.of(context).textTheme.headlineMedium),
            const SizedBox(height: AppSpacing.x3),
            Text(
              message,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: surfaces.textMuted,
                height: 1.5,
                fontSize: 14.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
