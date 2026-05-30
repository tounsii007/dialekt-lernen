import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

enum BtnVariant { primary, secondary, ghost }

/// Buttons im Web-Stil: primary (Brand-Gradient), secondary (Fläche + Rahmen),
/// ghost (transparent).
class GradientButton extends StatelessWidget {
  const GradientButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.variant = BtnVariant.primary,
    this.icon,
    this.expand = false,
  });

  final String label;
  final VoidCallback? onPressed;
  final BtnVariant variant;
  final IconData? icon;
  final bool expand;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final isPrimary = variant == BtnVariant.primary;

    final Color fg = switch (variant) {
      BtnVariant.primary => Colors.white,
      BtnVariant.secondary => Theme.of(context).colorScheme.onSurface,
      BtnVariant.ghost => AppColors.brand,
    };

    final content = Row(
      mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (icon != null) ...[
          Icon(icon, size: 18, color: fg),
          const SizedBox(width: AppSpacing.x2),
        ],
        Flexible(
          child: Text(
            label,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              color: fg,
              fontWeight: FontWeight.w600,
              fontSize: 15,
            ),
          ),
        ),
      ],
    );

    final radius = BorderRadius.circular(AppRadii.md);

    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: radius,
        onTap: onPressed,
        child: Ink(
          decoration: BoxDecoration(
            gradient: isPrimary ? AppColors.brandGradient : null,
            color: switch (variant) {
              BtnVariant.primary => null,
              BtnVariant.secondary => surfaces.surface.withValues(alpha: 0.7),
              BtnVariant.ghost => Colors.transparent,
            },
            borderRadius: radius,
            border: variant == BtnVariant.secondary
                ? Border.all(color: surfaces.border)
                : null,
            boxShadow: isPrimary
                ? [
                    BoxShadow(
                      color: AppColors.brand.withValues(alpha: 0.35),
                      blurRadius: 20,
                      offset: const Offset(0, 8),
                    ),
                  ]
                : null,
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.x5,
              vertical: AppSpacing.x3 + 2,
            ),
            child: content,
          ),
        ),
      ),
    );
  }
}
