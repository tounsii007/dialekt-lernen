import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

/// Schimmer-Platzhalter für Ladezustände (Skeleton-Loader).
class SkeletonBox extends StatefulWidget {
  const SkeletonBox({
    super.key,
    this.width,
    this.height = 16,
    this.radius = AppRadii.sm,
  });

  final double? width;
  final double height;
  final double radius;

  @override
  State<SkeletonBox> createState() => _SkeletonBoxState();
}

class _SkeletonBoxState extends State<SkeletonBox>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1200),
  )..repeat();

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final base = surfaces.border.withValues(alpha: 0.45);
    final hi = surfaces.border.withValues(alpha: 0.12);
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        final dx = _c.value * 2 - 1; // -1 … 1
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(widget.radius),
            gradient: LinearGradient(
              begin: Alignment(dx - 1, 0),
              end: Alignment(dx + 1, 0),
              colors: [base, hi, base],
              stops: const [0.35, 0.5, 0.65],
            ),
          ),
        );
      },
    );
  }
}

/// Liste aus Karten-Platzhaltern — als Ladezustand für Listen-Screens.
class SkeletonCardList extends StatelessWidget {
  const SkeletonCardList({super.key, this.count = 6});

  final int count;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(
          AppSpacing.x5, AppSpacing.x4, AppSpacing.x5, AppSpacing.x5),
      itemCount: count,
      separatorBuilder: (_, _) => const SizedBox(height: AppSpacing.x3),
      itemBuilder: (context, _) => Container(
        padding: const EdgeInsets.all(AppSpacing.x4),
        decoration: BoxDecoration(
          color: surfaces.surface.withValues(alpha: 0.4),
          borderRadius: BorderRadius.circular(AppRadii.lg),
          border: Border.all(color: surfaces.border.withValues(alpha: 0.5)),
        ),
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SkeletonBox(width: 140, height: 14),
            SizedBox(height: AppSpacing.x3),
            SkeletonBox(height: 12),
            SizedBox(height: AppSpacing.x2),
            SkeletonBox(width: 200, height: 12),
          ],
        ),
      ),
    );
  }
}
