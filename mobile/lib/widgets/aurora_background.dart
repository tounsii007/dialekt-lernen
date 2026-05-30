import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

/// Hintergrund mit weichen Farbverlaufs-„Orbs" — Pendant zur .bg-aurora/.bg-orbs
/// der Web-App. Liegt hinter dem Inhalt.
class AuroraBackground extends StatelessWidget {
  const AuroraBackground({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final scaffold = Theme.of(context).scaffoldBackgroundColor;
    return Stack(
      children: [
        Positioned.fill(child: ColoredBox(color: scaffold)),
        _orb(top: -120, left: -80, size: 320, color: AppColors.brand),
        _orb(top: 120, right: -100, size: 280, color: AppColors.brand3),
        _orb(bottom: -140, left: -60, size: 340, color: AppColors.pink),
        Positioned.fill(child: child),
      ],
    );
  }

  Widget _orb({
    double? top,
    double? left,
    double? right,
    double? bottom,
    required double size,
    required Color color,
  }) {
    return Positioned(
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      child: IgnorePointer(
        child: Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: RadialGradient(
              colors: [
                color.withValues(alpha: 0.22),
                color.withValues(alpha: 0.0),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
