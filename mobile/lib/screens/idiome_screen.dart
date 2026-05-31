import 'package:flutter/material.dart';

import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../util/idiome.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';
import '../widgets/speak_button.dart';
import 'dialekt_detail_screen.dart';

List<IdiomCluster>? _idiomCache;

/// Idiom-Explorer: Redensarten aus allen Dialekten, gruppiert nach Bedeutung.
/// Port von js/views/idiome.js.
class IdiomeScreen extends StatefulWidget {
  const IdiomeScreen({super.key});

  @override
  State<IdiomeScreen> createState() => _IdiomeScreenState();
}

class _IdiomeScreenState extends State<IdiomeScreen> {
  List<IdiomCluster>? _clusters;
  IdiomCluster? _selected;

  @override
  void initState() {
    super.initState();
    if (_idiomCache != null) {
      _clusters = _idiomCache;
    } else {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        final c = computeClusters(DialektRepository.instance.alleMitDialekt);
        _idiomCache = c;
        if (mounted) setState(() => _clusters = c);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuroraBackground(
      child: SafeArea(
        child: _clusters == null
            ? const Center(child: CircularProgressIndicator())
            : (_selected == null
                ? _overview(context, _clusters!)
                : _detail(context, _selected!)),
      ),
    );
  }

  Widget _overview(BuildContext context, List<IdiomCluster> clusters) {
    final surfaces = AppSurfaces.of(context);
    final total = clusters.fold<int>(0, (n, c) => n + c.size);
    return ListView(
      padding: const EdgeInsets.fromLTRB(
          AppSpacing.x5, AppSpacing.x4, AppSpacing.x5, AppSpacing.x7),
      children: [
        Row(
          children: [
            IconButton(
              onPressed: () => Navigator.of(context).maybePop(),
              icon: const Icon(Icons.arrow_back_rounded),
            ),
            Text('💬 Idiom-Explorer',
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
            'Entdecke $total Redensarten — gruppiert nach Bedeutung.',
            style: TextStyle(color: surfaces.textMuted, fontSize: 13.5),
          ),
        ),
        const SizedBox(height: AppSpacing.x4),
        if (clusters.isEmpty)
          Padding(
            padding: const EdgeInsets.all(AppSpacing.x6),
            child: Text('Noch keine Redensarten in den Daten.',
                style: TextStyle(color: surfaces.textMuted)),
          )
        else
          for (final c in clusters) ...[
            _ClusterCard(cluster: c, onTap: () => setState(() => _selected = c)),
            const SizedBox(height: AppSpacing.x3),
          ],
      ],
    );
  }

  Widget _detail(BuildContext context, IdiomCluster cluster) {
    final repo = DialektRepository.instance;
    final surfaces = AppSurfaces.of(context);
    final items = [...cluster.items]..sort(
        (a, b) => a.dialekt.name.compareTo(b.dialekt.name));
    return ListView(
      padding: const EdgeInsets.fromLTRB(
          AppSpacing.x5, AppSpacing.x4, AppSpacing.x5, AppSpacing.x7),
      children: [
        Row(
          children: [
            IconButton(
              onPressed: () => setState(() => _selected = null),
              icon: const Icon(Icons.arrow_back_rounded),
            ),
            Expanded(
              child: Text(
                '${cluster.def.emoji} ${cluster.def.label}',
                style: Theme.of(context)
                    .textTheme
                    .titleLarge
                    ?.copyWith(fontSize: 18),
              ),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.x2),
        Padding(
          padding: const EdgeInsets.only(left: AppSpacing.x2),
          child: Text(
            '${cluster.size} Redensarten · ${cluster.dialektIds.length} Dialekte',
            style: TextStyle(color: surfaces.textMuted, fontSize: 13),
          ),
        ),
        const SizedBox(height: AppSpacing.x4),
        for (final p in items) ...[
          _ExprCell(pair: p, repo: repo),
          const SizedBox(height: AppSpacing.x2),
        ],
      ],
    );
  }
}

class _ClusterCard extends StatelessWidget {
  const _ClusterCard({required this.cluster, required this.onTap});
  final IdiomCluster cluster;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final sample =
        cluster.items.take(3).map((p) => p.ausdruck.ausdruck).join(' · ');
    return GlassCard(
      onTap: onTap,
      accent: AppColors.brand2,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(cluster.def.emoji, style: const TextStyle(fontSize: 24)),
              const SizedBox(width: AppSpacing.x3),
              Expanded(
                child: Text(cluster.def.label,
                    style: const TextStyle(
                        fontSize: 15.5, fontWeight: FontWeight.w700)),
              ),
              Icon(Icons.chevron_right_rounded, color: surfaces.textMuted),
            ],
          ),
          const SizedBox(height: AppSpacing.x2),
          Text(
            '${cluster.size} Redewendungen · ${cluster.dialektIds.length} Dialekte',
            style: TextStyle(fontSize: 12, color: surfaces.textMuted),
          ),
          if (sample.isNotEmpty) ...[
            const SizedBox(height: 4),
            Text('„$sample"',
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                    fontSize: 12.5,
                    fontStyle: FontStyle.italic,
                    color: surfaces.textMuted)),
          ],
        ],
      ),
    );
  }
}

class _ExprCell extends StatelessWidget {
  const _ExprCell({required this.pair, required this.repo});
  final DialektAusdruck pair;
  final DialektRepository repo;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final color = pair.dialekt.color;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(AppRadii.md),
        onTap: () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => DialektDetailScreen(dialekt: pair.dialekt),
          ),
        ),
        child: Container(
          padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.x3, vertical: AppSpacing.x2),
          decoration: BoxDecoration(
            color: surfaces.surface.withValues(alpha: 0.4),
            borderRadius: BorderRadius.circular(AppRadii.md),
            border: Border(left: BorderSide(color: color, width: 3)),
          ),
          child: Row(
            children: [
              Text(pair.dialekt.flag, style: const TextStyle(fontSize: 16)),
              const SizedBox(width: AppSpacing.x3),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('${pair.dialekt.name} · ${pair.ausdruck.hochdeutsch}',
                        style: TextStyle(fontSize: 11.5, color: color)),
                    Text(pair.ausdruck.ausdruck,
                        style: const TextStyle(
                            fontSize: 15, fontWeight: FontWeight.w600)),
                  ],
                ),
              ),
              SpeakButton(
                  text: pair.ausdruck.ausdruck, lang: pair.dialekt.lang),
            ],
          ),
        ),
      ),
    );
  }
}
