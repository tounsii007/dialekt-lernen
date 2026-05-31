import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import '../data/quests_store.dart';
import '../data/repository.dart';
import '../data/xp_store.dart';
import '../theme/app_theme.dart';
import '../util/games.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';
import '../widgets/gradient_button.dart';
import '../widgets/level_up_overlay.dart';

/// Memory: Dialekt-Ausdruck ↔ Hochdeutsch-Paare aufdecken. Port von
/// js/views/spiele.js (Memory-Variante).
class MemoryGameScreen extends StatefulWidget {
  const MemoryGameScreen({super.key});

  @override
  State<MemoryGameScreen> createState() => _MemoryGameScreenState();
}

class _MemoryGameScreenState extends State<MemoryGameScreen> {
  static const _difficulties = [
    (pairs: 6, cols: 3, label: '6 Paare'),
    (pairs: 8, cols: 4, label: '8 Paare'),
  ];

  int _pairs = 6;
  int _cols = 3;
  List<MemoryCard> _deck = [];
  final List<MemoryCard> _selected = [];
  int _moves = 0;
  int _matches = 0;
  bool _locked = false;
  bool _finished = false;

  final Stopwatch _watch = Stopwatch();
  Timer? _timer;
  String _elapsed = '00:00';

  @override
  void initState() {
    super.initState();
    _start(_pairs, _cols);
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _start(int pairs, int cols) {
    final pool = uniqueByHochdeutsch(DialektRepository.instance.alleMitDialekt);
    final deck = buildMemoryCards(pool, pairs, Random());
    _timer?.cancel();
    _watch
      ..reset()
      ..start();
    _timer = Timer.periodic(const Duration(milliseconds: 500), (_) {
      if (!mounted) return;
      setState(() => _elapsed = _fmt(_watch.elapsedMilliseconds));
    });
    setState(() {
      _pairs = pairs;
      _cols = cols;
      _deck = deck;
      _selected.clear();
      _moves = 0;
      _matches = 0;
      _locked = false;
      _finished = false;
      _elapsed = '00:00';
    });
  }

  static String _fmt(int ms) {
    final s = ms ~/ 1000;
    final mm = (s ~/ 60).toString().padLeft(2, '0');
    final ss = (s % 60).toString().padLeft(2, '0');
    return '$mm:$ss';
  }

  void _onTap(MemoryCard card) {
    if (_locked || _finished || card.matched || card.flipped) return;
    setState(() {
      card.flipped = true;
      _selected.add(card);
    });
    if (_selected.length < 2) return;

    _moves++;
    final a = _selected[0];
    final b = _selected[1];
    if (a.pairId == b.pairId) {
      setState(() {
        a.matched = true;
        b.matched = true;
        _matches++;
        _selected.clear();
      });
      if (_matches >= _pairs) _finish();
    } else {
      _locked = true;
      Future.delayed(const Duration(milliseconds: 850), () {
        if (!mounted) return;
        setState(() {
          a.flipped = false;
          b.flipped = false;
          _selected.clear();
          _locked = false;
        });
      });
    }
  }

  Future<void> _finish() async {
    _timer?.cancel();
    _watch.stop();
    setState(() => _finished = true);
    final xp = _pairs >= 8 ? 100 : 50;
    final award = await XpStore.instance.award(xp, 'memory-win');
    await QuestsStore.instance.trackFromReason('memory-win', xp);
    if (!mounted) return;
    if (award.levelUp) {
      await showLevelUpCelebration(context,
          level: award.level, title: levelTitle(award.level));
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuroraBackground(
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(
              AppSpacing.x5, AppSpacing.x4, AppSpacing.x5, AppSpacing.x5),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.of(context).maybePop(),
                    icon: const Icon(Icons.arrow_back_rounded),
                  ),
                  Text('🧩 Memory',
                      style: Theme.of(context)
                          .textTheme
                          .headlineMedium
                          ?.copyWith(fontSize: 23)),
                  const Spacer(),
                  for (final d in _difficulties)
                    Padding(
                      padding: const EdgeInsets.only(left: 6),
                      child: _DiffChip(
                        label: d.label,
                        selected: _pairs == d.pairs,
                        onTap: () => _start(d.pairs, d.cols),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: AppSpacing.x3),
              _Hud(moves: _moves, matches: _matches, total: _pairs, elapsed: _elapsed),
              const SizedBox(height: AppSpacing.x4),
              Expanded(
                child: _finished
                    ? _Summary(
                        moves: _moves,
                        elapsed: _elapsed,
                        xp: _pairs >= 8 ? 100 : 50,
                        onAgain: () => _start(_pairs, _cols),
                      )
                    : GridView.count(
                        crossAxisCount: _cols,
                        crossAxisSpacing: AppSpacing.x2,
                        mainAxisSpacing: AppSpacing.x2,
                        childAspectRatio: 0.78,
                        children: [
                          for (final c in _deck)
                            _MemoryTile(card: c, onTap: () => _onTap(c)),
                        ],
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _DiffChip extends StatelessWidget {
  const _DiffChip(
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
        child: Text(label,
            style: TextStyle(
                fontSize: 11.5,
                fontWeight: FontWeight.w600,
                color: selected ? Colors.white : surfaces.textMuted)),
      ),
    );
  }
}

class _Hud extends StatelessWidget {
  const _Hud(
      {required this.moves,
      required this.matches,
      required this.total,
      required this.elapsed});
  final int moves;
  final int matches;
  final int total;
  final String elapsed;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        _stat(context, 'Versuche', '$moves'),
        _stat(context, 'Paare', '$matches / $total'),
        _stat(context, 'Zeit', elapsed),
      ],
    );
  }

  Widget _stat(BuildContext context, String label, String value) {
    final surfaces = AppSurfaces.of(context);
    return Column(
      children: [
        Text(value,
            style: TextStyle(fontFamily: 'Fraunces', 
                fontSize: 20, fontWeight: FontWeight.w700)),
        Text(label, style: TextStyle(fontSize: 11.5, color: surfaces.textMuted)),
      ],
    );
  }
}

class _MemoryTile extends StatelessWidget {
  const _MemoryTile({required this.card, required this.onTap});
  final MemoryCard card;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final revealed = card.flipped || card.matched;
    final color = card.dialekt.color;
    return GestureDetector(
      onTap: onTap,
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 220),
        transitionBuilder: (child, anim) =>
            ScaleTransition(scale: anim, child: child),
        child: revealed
            ? Container(
                key: const ValueKey(true),
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: card.matched
                      ? AppColors.success.withValues(alpha: 0.18)
                      : surfaces.surface.withValues(alpha: 0.9),
                  borderRadius: BorderRadius.circular(AppRadii.md),
                  border: Border.all(
                    color: card.matched
                        ? AppColors.success
                        : color.withValues(alpha: 0.6),
                    width: 1.5,
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(card.dialekt.flag,
                        style: const TextStyle(fontSize: 14)),
                    const SizedBox(height: 4),
                    Flexible(
                      child: Text(
                        card.text,
                        textAlign: TextAlign.center,
                        maxLines: 3,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                            fontSize: 12.5, fontWeight: FontWeight.w600),
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      card.isDialekt ? 'Dialekt' : 'Hochdeutsch',
                      style: TextStyle(fontSize: 8.5, color: surfaces.textMuted),
                    ),
                  ],
                ),
              )
            : Container(
                key: const ValueKey(false),
                decoration: BoxDecoration(
                  gradient: AppColors.brandGradient,
                  borderRadius: BorderRadius.circular(AppRadii.md),
                ),
                child: const Center(
                  child: Text('?',
                      style: TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w700,
                          color: Colors.white)),
                ),
              ),
      ),
    );
  }
}

class _Summary extends StatelessWidget {
  const _Summary(
      {required this.moves,
      required this.elapsed,
      required this.xp,
      required this.onAgain});
  final int moves;
  final String elapsed;
  final int xp;
  final VoidCallback onAgain;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: GlassCard(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('🎉', style: TextStyle(fontSize: 48)),
            const SizedBox(height: AppSpacing.x2),
            Text('Alle Paare gefunden!',
                style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: AppSpacing.x4),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _stat(context, 'Versuche', '$moves'),
                _stat(context, 'Zeit', elapsed),
                _stat(context, 'XP', '+$xp'),
              ],
            ),
            const SizedBox(height: AppSpacing.x5),
            GradientButton(
              label: 'Nochmal',
              icon: Icons.refresh_rounded,
              onPressed: onAgain,
            ),
          ],
        ),
      ),
    );
  }

  Widget _stat(BuildContext context, String label, String value) {
    final surfaces = AppSurfaces.of(context);
    return Column(
      children: [
        Text(value,
            style: TextStyle(fontFamily: 'Fraunces', 
                fontSize: 22, fontWeight: FontWeight.w700)),
        Text(label, style: TextStyle(fontSize: 11.5, color: surfaces.textMuted)),
      ],
    );
  }
}
