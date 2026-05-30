import 'package:flutter/material.dart';

import '../data/models.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/favorite_button.dart';
import '../widgets/glass_card.dart';

class DialektDetailScreen extends StatelessWidget {
  const DialektDetailScreen({super.key, required this.dialekt});

  final Dialekt dialekt;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Scaffold(
      body: AuroraBackground(
        child: SafeArea(
          child: CustomScrollView(
            slivers: [
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(
                    AppSpacing.x4,
                    AppSpacing.x2,
                    AppSpacing.x4,
                    0,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          IconButton(
                            onPressed: () => Navigator.of(context).pop(),
                            icon: const Icon(Icons.arrow_back_rounded),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.x2),
                      Row(
                        children: [
                          Container(
                            width: 64,
                            height: 64,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: dialekt.color.withValues(alpha: 0.16),
                              borderRadius: BorderRadius.circular(AppRadii.lg),
                            ),
                            child: Text(dialekt.flag,
                                style: const TextStyle(fontSize: 34)),
                          ),
                          const SizedBox(width: AppSpacing.x4),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(dialekt.name,
                                    style: Theme.of(context)
                                        .textTheme
                                        .headlineMedium),
                                Text(
                                  dialekt.sprecher.isEmpty
                                      ? dialekt.region
                                      : '${dialekt.region} · ${dialekt.sprecher}',
                                  style:
                                      TextStyle(color: surfaces.textMuted),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      if (dialekt.beschreibung.isNotEmpty) ...[
                        const SizedBox(height: AppSpacing.x4),
                        Text(
                          dialekt.beschreibung,
                          style: TextStyle(
                            height: 1.5,
                            color: surfaces.textMuted,
                            fontSize: 14,
                          ),
                        ),
                      ],
                      const SizedBox(height: AppSpacing.x5),
                      Text('${dialekt.ausdruecke.length} Ausdrücke',
                          style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: AppSpacing.x3),
                    ],
                  ),
                ),
              ),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(
                  AppSpacing.x4,
                  0,
                  AppSpacing.x4,
                  120,
                ),
                sliver: SliverList.separated(
                  itemCount: dialekt.ausdruecke.length,
                  separatorBuilder: (_, _) =>
                      const SizedBox(height: AppSpacing.x3),
                  itemBuilder: (_, i) => _AusdruckTile(
                    ausdruck: dialekt.ausdruecke[i],
                    accent: dialekt.color,
                    dialektId: dialekt.id,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _AusdruckTile extends StatelessWidget {
  const _AusdruckTile({
    required this.ausdruck,
    required this.accent,
    required this.dialektId,
  });

  final Ausdruck ausdruck;
  final Color accent;
  final String dialektId;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final repo = DialektRepository.instance;
    return GlassCard(
      accent: accent,
      padding: const EdgeInsets.all(AppSpacing.x4),
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          tilePadding: EdgeInsets.zero,
          childrenPadding: const EdgeInsets.only(top: AppSpacing.x2),
          title: Text(
            ausdruck.ausdruck,
            style: Theme.of(context)
                .textTheme
                .titleLarge
                ?.copyWith(fontSize: 17),
          ),
          subtitle: Padding(
            padding: const EdgeInsets.only(top: 2),
            child: Text(
              ausdruck.hochdeutsch,
              style: TextStyle(color: surfaces.textMuted, fontSize: 13.5),
            ),
          ),
          trailing: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                repo.kategorieIcon(ausdruck.kategorie),
                style: const TextStyle(fontSize: 18),
              ),
              FavoriteButton(dialektId: dialektId, ausdruckId: ausdruck.id),
            ],
          ),
          children: [
            if (ausdruck.bedeutung.isNotEmpty)
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  ausdruck.bedeutung,
                  style: TextStyle(
                    height: 1.5,
                    fontSize: 13.5,
                    color: surfaces.textMuted,
                  ),
                ),
              ),
            if (ausdruck.beispiel.isNotEmpty) ...[
              const SizedBox(height: AppSpacing.x3),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(AppSpacing.x3),
                decoration: BoxDecoration(
                  color: accent.withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(AppRadii.sm),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('„${ausdruck.beispiel}"',
                        style: const TextStyle(
                            fontStyle: FontStyle.italic, fontSize: 14)),
                    if (ausdruck.beispielHd.isNotEmpty) ...[
                      const SizedBox(height: 4),
                      Text(
                        ausdruck.beispielHd,
                        style: TextStyle(
                          fontSize: 12.5,
                          color: surfaces.textMuted,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
