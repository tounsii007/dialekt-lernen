import 'package:flutter/material.dart';

import '../data/models.dart';
import '../theme/app_theme.dart';
import 'glass_card.dart';

/// Karte für einen Dialekt — Flagge, Name, Region, Anzahl Ausdrücke.
class DialektCard extends StatelessWidget {
  const DialektCard({super.key, required this.dialekt, required this.onTap});

  final Dialekt dialekt;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      onTap: onTap,
      accent: dialekt.color,
      padding: const EdgeInsets.all(AppSpacing.x4),
      child: Row(
        children: [
          Container(
            width: 52,
            height: 52,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: dialekt.color.withValues(alpha: 0.14),
              borderRadius: BorderRadius.circular(AppRadii.md),
            ),
            child: Text(dialekt.flag, style: const TextStyle(fontSize: 28)),
          ),
          const SizedBox(width: AppSpacing.x4),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  dialekt.name,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontSize: 18,
                      ),
                ),
                const SizedBox(height: 2),
                Text(
                  dialekt.region,
                  style: TextStyle(fontSize: 13, color: surfaces.textMuted),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '${dialekt.ausdruecke.length}',
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  fontSize: 16,
                  color: dialekt.color,
                ),
              ),
              Text('Ausdrücke',
                  style: TextStyle(fontSize: 11, color: surfaces.textMuted)),
            ],
          ),
          const SizedBox(width: AppSpacing.x2),
          Icon(Icons.chevron_right_rounded, color: surfaces.textMuted),
        ],
      ),
    );
  }
}
