import 'package:flutter/material.dart';

import '../data/models.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';
import 'lektion_detail_screen.dart';

/// Mini-Lektionen: kurze Artikel über Sprache, Geschichte und Kultur der
/// Dialekte. Port von js/views/lektionen.js (mobile Liste + Detail).
class LektionenScreen extends StatefulWidget {
  const LektionenScreen({super.key});

  @override
  State<LektionenScreen> createState() => _LektionenScreenState();
}

class _LektionenScreenState extends State<LektionenScreen> {
  static const _katLabels = {
    'sprache': '🗣️ Sprache',
    'geschichte': '📜 Geschichte',
    'kultur': '🎭 Kultur',
    'regionen': '🗺️ Regionen',
  };

  String _activeKat = 'all';

  @override
  Widget build(BuildContext context) {
    final repo = DialektRepository.instance;
    final surfaces = AppSurfaces.of(context);
    final all = repo.lektionen;
    final usedKats = {for (final l in all) l.kategorie};
    final filtered = _activeKat == 'all'
        ? all
        : all.where((l) => l.kategorie == _activeKat).toList();

    final chips = <({String id, String label})>[
      (id: 'all', label: '📚 Alle'),
      for (final entry in _katLabels.entries)
        if (usedKats.contains(entry.key))
          (id: entry.key, label: entry.value),
    ];

    return AuroraBackground(
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(
              AppSpacing.x5, AppSpacing.x4, AppSpacing.x5, AppSpacing.x7),
          children: [
            Row(
              children: [
                IconButton(
                  onPressed: () => Navigator.of(context).maybePop(),
                  icon: const Icon(Icons.arrow_back_rounded),
                ),
                Text('📖 Mini-Lektionen',
                    style: Theme.of(context)
                        .textTheme
                        .headlineMedium
                        ?.copyWith(fontSize: 23)),
              ],
            ),
            const SizedBox(height: AppSpacing.x2),
            Padding(
              padding: const EdgeInsets.only(left: AppSpacing.x2),
              child: Text(
                '${all.length} kurze Artikel über Sprache, Geschichte & Kultur.',
                style: TextStyle(color: surfaces.textMuted, fontSize: 13.5),
              ),
            ),
            const SizedBox(height: AppSpacing.x4),
            SizedBox(
              height: 36,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: chips.length,
                separatorBuilder: (_, _) => const SizedBox(width: AppSpacing.x2),
                itemBuilder: (context, i) => _KatChip(
                  label: chips[i].label,
                  selected: _activeKat == chips[i].id,
                  onTap: () => setState(() => _activeKat = chips[i].id),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.x4),
            for (final l in filtered) ...[
              _LektionCard(
                lektion: l,
                onTap: () => Navigator.of(context).push(
                  MaterialPageRoute(
                      builder: (_) => LektionDetailScreen(lektion: l)),
                ),
              ),
              const SizedBox(height: AppSpacing.x3),
            ],
          ],
        ),
      ),
    );
  }
}

class _KatChip extends StatelessWidget {
  const _KatChip(
      {required this.label, required this.selected, required this.onTap});
  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding:
            const EdgeInsets.symmetric(horizontal: AppSpacing.x3, vertical: 6),
        decoration: BoxDecoration(
          gradient: selected ? AppColors.brandGradient : null,
          color: selected ? null : surfaces.surface.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(AppRadii.pill),
          border: Border.all(
              color: selected
                  ? Colors.transparent
                  : surfaces.border.withValues(alpha: 0.7)),
        ),
        alignment: Alignment.center,
        child: Text(label,
            style: TextStyle(
                fontSize: 12.5,
                fontWeight: FontWeight.w600,
                color: selected ? Colors.white : surfaces.textMuted)),
      ),
    );
  }
}

class _LektionCard extends StatelessWidget {
  const _LektionCard({required this.lektion, required this.onTap});
  final Lektion lektion;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return GlassCard(
      onTap: onTap,
      accent: AppColors.brand3,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(lektion.emoji, style: const TextStyle(fontSize: 28)),
          const SizedBox(width: AppSpacing.x3),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(lektion.title,
                    style: TextStyle(fontFamily: 'Fraunces', 
                        fontSize: 16, height: 1.25, fontWeight: FontWeight.w700)),
                const SizedBox(height: 4),
                Text(lektion.summary,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                        fontSize: 12.5, height: 1.4, color: surfaces.textMuted)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
