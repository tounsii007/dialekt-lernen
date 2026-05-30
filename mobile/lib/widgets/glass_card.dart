import 'dart:ui';

import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

/// Glassmorphism-Karte — Pendant zu .card / .dialekt-card der Web-App:
/// halbtransparente Fläche, Rahmen, weicher Schatten, optionaler Akzent.
class GlassCard extends StatelessWidget {
  const GlassCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(AppSpacing.x5),
    this.onTap,
    this.accent,
    this.radius = AppRadii.lg,
  });

  final Widget child;
  final EdgeInsetsGeometry padding;
  final VoidCallback? onTap;
  final Color? accent;
  final double radius;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final borderRadius = BorderRadius.circular(radius);

    final card = ClipRRect(
      borderRadius: borderRadius,
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
        child: Container(
          decoration: BoxDecoration(
            color: surfaces.surface.withValues(alpha: 0.72),
            borderRadius: borderRadius,
            border: Border.all(color: surfaces.border),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.18),
                blurRadius: 30,
                offset: const Offset(0, 12),
              ),
            ],
          ),
          child: accent == null
              ? Padding(padding: padding, child: child)
              : Stack(
                  children: [
                    Positioned(
                      left: 0,
                      top: 0,
                      bottom: 0,
                      child: Container(width: 4, color: accent),
                    ),
                    Padding(padding: padding, child: child),
                  ],
                ),
        ),
      ),
    );

    if (onTap == null) return card;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: borderRadius,
        onTap: onTap,
        child: card,
      ),
    );
  }
}
