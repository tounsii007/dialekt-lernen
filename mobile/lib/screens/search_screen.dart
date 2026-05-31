import 'dart:async';

import 'package:flutter/material.dart';

import '../data/models.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';
import '../widgets/speak_button.dart';
import 'dialekt_detail_screen.dart';

/// Volltextsuche über Dialekte und Ausdrücke — Pendant zur Web-Kommandopalette.
class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final _controller = TextEditingController();
  String _query = '';
  Timer? _debounce;

  // Debounce: repo.search() scannt ~6700 Ausdrücke synchron im build —
  // ohne Entprellung läuft das bei jedem Tastendruck und ruckelt.
  void _onChanged(String v) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 150), () {
      if (!mounted) return;
      setState(() => _query = v);
    });
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _controller.dispose();
    super.dispose();
  }

  void _openDialekt(Dialekt d) {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => DialektDetailScreen(dialekt: d)),
    );
  }

  @override
  Widget build(BuildContext context) {
    final repo = DialektRepository.instance;
    final results = repo.search(_query);
    final hasQuery = _query.trim().isNotEmpty;

    return Scaffold(
      body: AuroraBackground(
        child: SafeArea(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(
                  AppSpacing.x4,
                  AppSpacing.x3,
                  AppSpacing.x4,
                  AppSpacing.x2,
                ),
                child: Row(
                  children: [
                    IconButton(
                      onPressed: () => Navigator.of(context).pop(),
                      icon: const Icon(Icons.arrow_back_rounded),
                    ),
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        autofocus: true,
                        onChanged: _onChanged,
                        decoration: InputDecoration(
                          hintText: 'Ausdruck oder Dialekt suchen…',
                          border: InputBorder.none,
                          prefixIcon: const Icon(Icons.search_rounded),
                          suffixIcon: hasQuery
                              ? IconButton(
                                  icon: const Icon(Icons.close_rounded),
                                  onPressed: () {
                                    _debounce?.cancel();
                                    _controller.clear();
                                    setState(() => _query = '');
                                  },
                                )
                              : null,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: !hasQuery
                    ? _hint(context, 'Tippe, um zu suchen — z. B. „Servus", „Moin" oder „bayerisch".')
                    : (results.dialekte.isEmpty && results.ausdruecke.isEmpty)
                        ? _hint(context, 'Keine Treffer für „$_query".')
                        : ListView(
                            padding: const EdgeInsets.fromLTRB(
                                AppSpacing.x4, 0, AppSpacing.x4, 120),
                            children: [
                              if (results.dialekte.isNotEmpty) ...[
                                _sectionTitle(context, 'Dialekte'),
                                for (final d in results.dialekte)
                                  _DialektResult(dialekt: d, onTap: () => _openDialekt(d)),
                                const SizedBox(height: AppSpacing.x4),
                              ],
                              if (results.ausdruecke.isNotEmpty) ...[
                                _sectionTitle(context,
                                    'Ausdrücke (${results.ausdruecke.length})'),
                                for (final r in results.ausdruecke)
                                  _AusdruckResult(
                                    dialekt: r.dialekt,
                                    ausdruck: r.ausdruck,
                                    onTap: () => _openDialekt(r.dialekt),
                                  ),
                              ],
                            ],
                          ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _sectionTitle(BuildContext context, String t) => Padding(
        padding: const EdgeInsets.symmetric(vertical: AppSpacing.x3),
        child: Text(t, style: Theme.of(context).textTheme.titleLarge),
      );

  Widget _hint(BuildContext context, String text) {
    final surfaces = AppSurfaces.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.x6),
        child: Text(
          text,
          textAlign: TextAlign.center,
          style: TextStyle(color: surfaces.textMuted, height: 1.5),
        ),
      ),
    );
  }
}

class _DialektResult extends StatelessWidget {
  const _DialektResult({required this.dialekt, required this.onTap});
  final Dialekt dialekt;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.x2),
      child: GlassCard(
        onTap: onTap,
        accent: dialekt.color,
        padding: const EdgeInsets.all(AppSpacing.x3),
        child: Row(
          children: [
            Text(dialekt.flag, style: const TextStyle(fontSize: 24)),
            const SizedBox(width: AppSpacing.x3),
            Expanded(
              child: Text(dialekt.name,
                  style: Theme.of(context)
                      .textTheme
                      .titleLarge
                      ?.copyWith(fontSize: 16)),
            ),
            Text('${dialekt.ausdruecke.length}',
                style: TextStyle(color: surfaces.textMuted)),
            const SizedBox(width: 4),
            Icon(Icons.chevron_right_rounded, color: surfaces.textMuted),
          ],
        ),
      ),
    );
  }
}

class _AusdruckResult extends StatelessWidget {
  const _AusdruckResult({
    required this.dialekt,
    required this.ausdruck,
    required this.onTap,
  });
  final Dialekt dialekt;
  final Ausdruck ausdruck;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.x2),
      child: GlassCard(
        onTap: onTap,
        accent: dialekt.color,
        padding: const EdgeInsets.fromLTRB(
            AppSpacing.x3, AppSpacing.x2, AppSpacing.x2, AppSpacing.x2),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(ausdruck.ausdruck,
                      style: Theme.of(context)
                          .textTheme
                          .titleLarge
                          ?.copyWith(fontSize: 15)),
                  const SizedBox(height: 2),
                  Text(
                    '${ausdruck.hochdeutsch}  ·  ${dialekt.flag} ${dialekt.name}',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(fontSize: 12.5, color: surfaces.textMuted),
                  ),
                ],
              ),
            ),
            SpeakButton(
                text: ausdruck.ausdruck, lang: dialekt.lang, size: 20),
          ],
        ),
      ),
    );
  }
}
