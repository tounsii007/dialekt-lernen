import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../data/models.dart';
import '../data/repository.dart';
import '../data/srs_store.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/gradient_button.dart';
import '../widgets/speak_button.dart';

const int _kSessionSize = 20;

typedef _Card = ({Dialekt dialekt, Ausdruck ausdruck, String key});

class LernenScreen extends StatefulWidget {
  const LernenScreen({super.key});

  @override
  State<LernenScreen> createState() => _LernenScreenState();
}

class _LernenScreenState extends State<LernenScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _flip;
  List<_Card> _session = [];
  int _index = 0;
  bool _showBack = false;
  bool _finished = false;
  bool _studyAhead = false;
  final Map<int, int> _ratings = {}; // rating -> count

  @override
  void initState() {
    super.initState();
    _flip = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 420),
    );
    _buildSession();
  }

  @override
  void dispose() {
    _flip.dispose();
    super.dispose();
  }

  void _buildSession({bool studyAhead = false}) {
    final srs = SrsStore.instance;
    final now = DateTime.now().millisecondsSinceEpoch;
    final all = <_Card>[
      for (final p in DialektRepository.instance.alleMitDialekt)
        (
          dialekt: p.dialekt,
          ausdruck: p.ausdruck,
          key: '${p.dialekt.id}.${p.ausdruck.id}',
        ),
    ];

    List<_Card> pool;
    if (studyAhead) {
      pool = List.of(all)..shuffle(math.Random());
    } else {
      // Fällige zuerst (nach due sortiert), dann neue Karten.
      final due = all.where((c) => !srs.isNew(c.key) && srs.isDue(c.key, now)).toList()
        ..sort((a, b) =>
            (srs.get(a.key)?.due ?? 0).compareTo(srs.get(b.key)?.due ?? 0));
      final fresh = all.where((c) => srs.isNew(c.key)).toList()
        ..shuffle(math.Random());
      pool = [...due, ...fresh];
    }

    setState(() {
      _session = pool.take(_kSessionSize).toList();
      _index = 0;
      _showBack = false;
      _finished = _session.isEmpty;
      _studyAhead = studyAhead;
      _ratings.clear();
    });
    _flip.reset();
  }

  void _toggle() {
    setState(() => _showBack = !_showBack);
    if (_showBack) {
      _flip.forward();
    } else {
      _flip.reverse();
    }
  }

  Future<void> _rate(int rating) async {
    final card = _session[_index];
    await SrsStore.instance.review(card.key, rating);
    if (!mounted) return; // Widget könnte während des await disposed worden sein
    _ratings.update(rating, (v) => v + 1, ifAbsent: () => 1);
    if (_index + 1 >= _session.length) {
      setState(() => _finished = true);
      return;
    }
    setState(() {
      _index++;
      _showBack = false;
    });
    _flip.reset();
  }

  @override
  Widget build(BuildContext context) {
    if (_finished) {
      return AuroraBackground(
        child: SafeArea(child: _buildSummary(context)),
      );
    }
    return AuroraBackground(
      child: SafeArea(bottom: false, child: _buildSessionView(context)),
    );
  }

  Widget _buildSessionView(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final card = _session[_index];

    return Padding(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.x5,
        AppSpacing.x5,
        AppSpacing.x5,
        120,
      ),
      child: Column(
        children: [
          Row(
            children: [
              Text('🃏 Lernen',
                  style: Theme.of(context).textTheme.headlineMedium
                      ?.copyWith(fontSize: 24)),
              const Spacer(),
              SpeakButton(
                text: card.ausdruck.ausdruck,
                lang: card.dialekt.lang,
              ),
              Text('${_index + 1} / ${_session.length}',
                  style: TextStyle(color: surfaces.textMuted)),
            ],
          ),
          const SizedBox(height: AppSpacing.x3),
          Row(
            children: [
              Text(card.dialekt.flag, style: const TextStyle(fontSize: 16)),
              const SizedBox(width: 6),
              Text(
                _studyAhead ? '${card.dialekt.name} · Üben' : card.dialekt.name,
                style: TextStyle(color: card.dialekt.color, fontSize: 13),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.x4),
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
                                title: card.ausdruck.hochdeutsch,
                                subtitle: card.ausdruck.bedeutung,
                                accent: AppColors.accent,
                                tag: 'Hochdeutsch',
                              ),
                            )
                          : _CardFace(
                              title: card.ausdruck.ausdruck,
                              subtitle: card.ausdruck.beispiel.isNotEmpty
                                  ? '„${card.ausdruck.beispiel}"'
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
          const SizedBox(height: AppSpacing.x4),
          if (!_showBack)
            GradientButton(
              label: 'Aufdecken',
              icon: Icons.visibility_rounded,
              expand: true,
              onPressed: _toggle,
            )
          else
            Row(
              children: [
                _RateButton(
                  label: 'Schwer',
                  color: AppColors.danger,
                  onTap: () => _rate(ratingHard),
                ),
                const SizedBox(width: AppSpacing.x2),
                _RateButton(
                  label: 'Mittel',
                  color: AppColors.warning,
                  onTap: () => _rate(ratingMed),
                ),
                const SizedBox(width: AppSpacing.x2),
                _RateButton(
                  label: 'Leicht',
                  color: AppColors.success,
                  onTap: () => _rate(ratingEasy),
                ),
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildSummary(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final reviewed = _ratings.values.fold(0, (a, b) => a + b);
    final srs = SrsStore.instance;
    final remainingDue = srs.dueCount(
      DialektRepository.instance.alleMitDialekt
          .map((p) => '${p.dialekt.id}.${p.ausdruck.id}'),
    );

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.x6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(reviewed == 0 ? '🎉' : '✅',
                style: const TextStyle(fontSize: 64)),
            const SizedBox(height: AppSpacing.x4),
            Text(
              reviewed == 0 ? 'Alles erledigt!' : 'Session geschafft',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: AppSpacing.x3),
            Text(
              reviewed == 0
                  ? 'Aktuell sind keine Karten fällig. Komm später wieder — oder übe schon mal voraus.'
                  : '$reviewed Karten gelernt · noch $remainingDue fällig',
              textAlign: TextAlign.center,
              style: TextStyle(color: surfaces.textMuted, height: 1.5),
            ),
            const SizedBox(height: AppSpacing.x6),
            if (remainingDue > 0)
              GradientButton(
                label: 'Weiter lernen',
                icon: Icons.play_arrow_rounded,
                onPressed: () => _buildSession(),
              )
            else
              GradientButton(
                label: 'Voraus üben',
                icon: Icons.fast_forward_rounded,
                onPressed: () => _buildSession(studyAhead: true),
              ),
          ],
        ),
      ),
    );
  }
}

class _RateButton extends StatelessWidget {
  const _RateButton({
    required this.label,
    required this.color,
    required this.onTap,
  });

  final String label;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(AppRadii.md),
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: AppSpacing.x4),
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.14),
              borderRadius: BorderRadius.circular(AppRadii.md),
              border: Border.all(color: color.withValues(alpha: 0.6)),
            ),
            child: Text(
              label,
              style: TextStyle(color: color, fontWeight: FontWeight.w600),
            ),
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
      constraints: const BoxConstraints(minHeight: 260, maxHeight: 420),
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
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
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
          Flexible(
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
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
            ),
          ),
        ],
      ),
    );
  }
}
