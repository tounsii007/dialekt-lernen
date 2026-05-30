import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/placeholder_view.dart';

class FavoritenScreen extends StatelessWidget {
  const FavoritenScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const AuroraBackground(
      child: SafeArea(
        child: PlaceholderView(
          emoji: '❤️',
          title: 'Favoriten',
          message:
              'Markiere Ausdrücke als Favorit und finde sie hier wieder — kommt im nächsten Update.',
          accent: AppColors.accent,
        ),
      ),
    );
  }
}
