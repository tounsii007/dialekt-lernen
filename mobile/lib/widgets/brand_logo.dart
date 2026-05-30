import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

/// App-Logo: abgerundetes Gradient-Tile mit Sprech-Symbol — passend zum
/// Favicon/Icon der Web-App (🗣️ auf Brand-Lila).
class BrandLogo extends StatelessWidget {
  const BrandLogo({super.key, this.size = 64});

  final double size;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        gradient: AppColors.brandGradient,
        borderRadius: BorderRadius.circular(size * 0.28),
        boxShadow: [
          BoxShadow(
            color: AppColors.brand.withValues(alpha: 0.45),
            blurRadius: size * 0.5,
            offset: Offset(0, size * 0.12),
          ),
        ],
      ),
      alignment: Alignment.center,
      child: Text(
        '🗣️',
        style: TextStyle(fontSize: size * 0.5),
      ),
    );
  }
}
