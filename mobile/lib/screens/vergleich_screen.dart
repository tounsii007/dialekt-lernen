import 'package:flutter/material.dart';

import '../data/models.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../util/comparison.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';
import '../widgets/skeleton.dart';
import '../widgets/speak_button.dart';
import 'dialekt_detail_screen.dart';

/// Einmalig berechnete Vergleichsgruppen (teuer bei vielen Ausdrücken) —
/// über Screen-Instanzen hinweg zwischengespeichert.
List<CompareGroup>? _cachedGroups;

/// Dialekt-Vergleich: gleichbedeutende Ausdrücke quer über die Regionen,
/// gruppiert nach Bedeutung. Port von js/views/vergleich.js.
class VergleichScreen extends StatefulWidget {
  const VergleichScreen({super.key});

  @override
  State<VergleichScreen> createState() => _VergleichScreenState();
}

class _VergleichScreenState extends State<VergleichScreen> {
  List<CompareGroup>? _groups;
  String _activeCat = 'all';

  @override
  void initState() {
    super.initState();
    if (_cachedGroups != null) {
      _groups = _cachedGroups;
    } else {
      // Nach dem ersten Frame rechnen, damit die Push-Animation flüssig bleibt.
      WidgetsBinding.instance.addPostFrameCallback((_) {
        final g = buildComparison(
          DialektRepository.instance.alleMitDialekt,
          minSize: 2,
        );
        _cachedGroups = g;
        if (mounted) setState(() => _groups = g);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuroraBackground(
      child: SafeArea(
        child: _groups == null
            ? const SkeletonCardList()
            : _buildContent(context, _groups!),
      ),
    );
  }

  Widget _buildContent(BuildContext context, List<CompareGroup> groups) {
    final repo = DialektRepository.instance;
    final surfaces = AppSurfaces.of(context);

    // Genutzte Kategorien (in Pool-Reihenfolge der Kategorien-Liste).
    final used = {for (final g in groups) g.kategorie};
    final cats = <({String id, String label, String icon})>[
      (id: 'all', label: 'Alle', icon: '🌍'),
      for (final k in repo.kategorien)
        if (used.contains(k.id)) (id: k.id, label: k.label, icon: k.icon),
    ];

    final filtered = filterByKategorie(groups, _activeCat);

    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(
                AppSpacing.x5, AppSpacing.x4, AppSpacing.x5, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    IconButton(
                      onPressed: () => Navigator.of(context).maybePop(),
                      icon: const Icon(Icons.arrow_back_rounded),
                    ),
                    Expanded(
                      child: Text(
                        '🌍 Dialekt-Vergleich',
                        style: Theme.of(context)
                            .textTheme
                            .headlineMedium
                            ?.copyWith(fontSize: 23),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.x2),
                Padding(
                  padding: const EdgeInsets.only(left: AppSpacing.x2),
                  child: Text(
                    'Wie sagt man dasselbe in verschiedenen Regionen? '
                    'Ausdrücke gruppiert nach Bedeutung.',
                    style: TextStyle(
                        color: surfaces.textMuted, fontSize: 13.5, height: 1.4),
                  ),
                ),
                const SizedBox(height: AppSpacing.x4),
                SizedBox(
                  height: 38,
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: cats.length,
                    separatorBuilder: (_, _) =>
                        const SizedBox(width: AppSpacing.x2),
                    itemBuilder: (context, i) {
                      final c = cats[i];
                      return _CatChip(
                        label: '${c.icon} ${c.label}',
                        selected: _activeCat == c.id,
                        onTap: () => setState(() => _activeCat = c.id),
                      );
                    },
                  ),
                ),
                const SizedBox(height: AppSpacing.x4),
              ],
            ),
          ),
        ),
        if (filtered.isEmpty)
          SliverFillRemaining(
            hasScrollBody: false,
            child: Center(
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.x6),
                child: Text(
                  'Keine Gruppen in dieser Kategorie. Wechsle auf „Alle".',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: surfaces.textMuted),
                ),
              ),
            ),
          )
        else
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(
                AppSpacing.x5, 0, AppSpacing.x5, AppSpacing.x7),
            sliver: SliverList.separated(
              itemCount: filtered.length,
              separatorBuilder: (_, _) =>
                  const SizedBox(height: AppSpacing.x3),
              itemBuilder: (context, i) =>
                  _GroupCard(group: filtered[i], repo: repo),
            ),
          ),
      ],
    );
  }
}

class _CatChip extends StatelessWidget {
  const _CatChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(AppRadii.pill),
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.x4, vertical: AppSpacing.x2),
          decoration: BoxDecoration(
            gradient: selected ? AppColors.brandGradient : null,
            color: selected ? null : surfaces.surface.withValues(alpha: 0.5),
            borderRadius: BorderRadius.circular(AppRadii.pill),
            border: Border.all(
              color: selected
                  ? Colors.transparent
                  : surfaces.border.withValues(alpha: 0.7),
            ),
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: selected ? Colors.white : surfaces.textMuted,
            ),
          ),
        ),
      ),
    );
  }
}

class _GroupCard extends StatelessWidget {
  const _GroupCard({required this.group, required this.repo});

  final CompareGroup group;
  final DialektRepository repo;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                '${repo.kategorieIcon(group.kategorie)} '
                '${repo.kategorieLabel(group.kategorie)}',
                style: TextStyle(fontSize: 12, color: surfaces.textMuted),
              ),
              const Spacer(),
              Text(
                '${group.size} Dialekte',
                style: TextStyle(fontSize: 12, color: surfaces.textMuted),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            group.head,
            style: Theme.of(context)
                .textTheme
                .titleLarge
                ?.copyWith(fontSize: 18),
          ),
          const SizedBox(height: AppSpacing.x3),
          for (final it in group.items) ...[
            _DialectCell(dialekt: it.dialekt, ausdruck: it.ausdruck.ausdruck),
            const SizedBox(height: AppSpacing.x2),
          ],
        ],
      ),
    );
  }
}

class _DialectCell extends StatelessWidget {
  const _DialectCell({required this.dialekt, required this.ausdruck});

  final Dialekt dialekt;
  final String ausdruck;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final color = dialekt.color;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(AppRadii.md),
        onTap: () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => DialektDetailScreen(dialekt: dialekt),
          ),
        ),
        child: Container(
          padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.x3, vertical: AppSpacing.x2),
          decoration: BoxDecoration(
            color: surfaces.surface.withValues(alpha: 0.4),
            borderRadius: BorderRadius.circular(AppRadii.md),
            border: Border(
              left: BorderSide(color: color, width: 3),
            ),
          ),
          child: Row(
            children: [
              Text(dialekt.flag, style: const TextStyle(fontSize: 16)),
              const SizedBox(width: AppSpacing.x3),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      dialekt.name,
                      style: TextStyle(fontSize: 11.5, color: color),
                    ),
                    Text(
                      ausdruck,
                      style: const TextStyle(
                          fontSize: 15, fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
              ),
              SpeakButton(text: ausdruck, lang: dialekt.lang),
            ],
          ),
        ),
      ),
    );
  }
}
