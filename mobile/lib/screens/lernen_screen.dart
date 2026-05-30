import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../data/models.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/gradient_button.dart';

class LernenScreen extends StatefulWidget {
  const LernenScreen({super.key});

  @override
  State<LernenScreen> createState() => _LernenScreenState();
}

class _LernenScreenState extends State<LernenScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _flip;
  late final List<Ausdruck> _cards;
  int _index = 0;
  bool _showBack = false;

  @override
  void initState() {
    super.initState();
    _flip = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 420),
    );
    final all = List<Ausdruck>.from(DialektRepository.instance.alleAusdruecke);
    all.shuffle(math.Random());
    _cards = all.take(30).toList();
  }

  @override
  void dispose() {
    _flip.dispose();
    super.dispose();
  }

  void _toggle() {
    setState(() => _showBack = !_showBack);
    if (_showBack) {
      _flip.forward();
    } else {
      _flip.reverse();
    }
  }

  void _next() {
    if (_cards.isEmpty) return;
    setState(() {
      _index = (_index + 1) % _cards.length;
      _showBack = false;
    });
    _flip.reverse();
  }

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);

    if (_cards.isEmpty) {
      return const AuroraBackground(
        child: Center(child: Text('Keine Karten verfügbar.')),
      );
    }

    final card = _cards[_index];

    return AuroraBackground(
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(
            AppSpacing.x5,
            AppSpacing.x5,
            AppSpacing.x5,
            120,
          ),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('🃏 Karteikarten',
                      style: Theme.of(context).textTheme.headlineMedium
                          ?.copyWith(fontSize: 24)),
                  Text('${_index + 1} / ${_cards.length}',
                      style: TextStyle(color: surfaces.textMuted)),
                ],
              ),
              const SizedBox(height: AppSpacing.x5),
              Expanded(
                child: Center(
                  child: GestureDetector(
                    onTap: _toggle,
                    child: AnimatedBuilder(
                      animation: _flip,
                      builder: (context, _) {
                        final angle = _flip.value * math.pi;
                        final isBack = angle > math.pi / 2;
                        return Transform(
                          alignment: Alignment.center,
                          transform: Matrix4.identity()
                            ..setEntry(3, 2, 0.001)
                            ..rotateY(angle),
                          child: isBack
                              ? Transform(
                                  alignment: Alignment.center,
                                  transform: Matrix4.identity()..rotateY(math.pi),
                                  child: _CardFace(
                                    title: card.hochdeutsch,
                                    subtitle: card.bedeutung,
                                    accent: AppColors.accent,
                                    tag: 'Hochdeutsch',
                                  ),
                                )
                              : _CardFace(
                                  title: card.ausdruck,
                                  subtitle: card.beispiel.isNotEmpty
                                      ? '„${card.beispiel}"'
                                      : 'Tippen zum Umdrehen',
                                  accent: AppColors.brand,
                                  tag: 'Dialekt',
                                ),
                        );
                      },
                    ),
                  ),
                ),
              ),
              const SizedBox(height: AppSpacing.x5),
              Row(
                children: [
                  Expanded(
                    child: GradientButton(
                      label: _showBack ? 'Umdrehen' : 'Aufdecken',
                      variant: BtnVariant.secondary,
                      icon: Icons.flip_rounded,
                      expand: true,
                      onPressed: _toggle,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.x3),
                  Expanded(
                    child: GradientButton(
                      label: 'Weiter',
                      icon: Icons.arrow_forward_rounded,
                      expand: true,
                      onPressed: _next,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _CardFace extends StatelessWidget {
  const _CardFace({
    required this.title,
    required this.subtitle,
    required this.accent,
    required this.tag,
  });

  final String title;
  final String subtitle;
  final Color accent;
  final String tag;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Container(
      width: double.infinity,
      constraints: const BoxConstraints(minHeight: 280, maxHeight: 420),
      padding: const EdgeInsets.all(AppSpacing.x6),
      decoration: BoxDecoration(
        color: surfaces.surface.withValues(alpha: 0.85),
        borderRadius: BorderRadius.circular(AppRadii.xl),
        border: Border.all(color: accent.withValues(alpha: 0.4), width: 1.5),
        boxShadow: [
          BoxShadow(
            color: accent.withValues(alpha: 0.25),
            blurRadius: 40,
            offset: const Offset(0, 16),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
            decoration: BoxDecoration(
              color: accent.withValues(alpha: 0.16),
              borderRadius: BorderRadius.circular(AppRadii.pill),
            ),
            child: Text(
              tag,
              style: TextStyle(
                color: accent,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.x5),
          Text(
            title,
            textAlign: TextAlign.center,
            style: Theme.of(context)
                .textTheme
                .headlineMedium
                ?.copyWith(fontSize: 26),
          ),
          if (subtitle.isNotEmpty) ...[
            const SizedBox(height: AppSpacing.x4),
            Text(
              subtitle,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 15,
                height: 1.5,
                color: surfaces.textMuted,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
