import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../data/quests_store.dart';
import '../data/repository.dart';
import '../data/xp_store.dart';
import '../theme/app_theme.dart';
import '../util/games.dart';
import '../widgets/aurora_background.dart';
import '../widgets/glass_card.dart';
import '../widgets/gradient_button.dart';
import '../widgets/level_up_overlay.dart';

/// Blitz: In 60 Sekunden so viele Dialekt-Ausdrücke wie möglich der richtigen
/// Hochdeutsch-Übersetzung zuordnen. Schnelles Reaktions-Quiz.
class BlitzGameScreen extends StatefulWidget {
  const BlitzGameScreen({super.key});

  @override
  State<BlitzGameScreen> createState() => _BlitzGameScreenState();
}

class _BlitzGameScreenState extends State<BlitzGameScreen> {
  static const int _gameSeconds = 60;

  final Random _rng = Random();
  List<DialektAusdruck> _pool = [];
  BlitzQuestion? _q;
  int _score = 0;
  int _best = 0; // beste Serie
  int _streak = 0;
  int _secondsLeft = _gameSeconds;
  bool _running = false;
  bool _finished = false;
  int? _picked; // gewählter Index (für Feedback)
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _start();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _start() {
    _pool = uniqueByHochdeutsch(DialektRepository.instance.alleMitDialekt);
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() => _secondsLeft--);
      if (_secondsLeft <= 0) _finish();
    });
    setState(() {
      _score = 0;
      _best = 0;
      _streak = 0;
      _secondsLeft = _gameSeconds;
      _running = true;
      _finished = false;
      _picked = null;
      _q = _next();
    });
  }

  BlitzQuestion? _next() {
    if (_pool.length < 4) return null;
    final correct = _pool[_rng.nextInt(_pool.length)];
    return buildBlitzQuestion(_pool, correct, _rng);
  }

  void _answer(int i) {
    if (!_running || _picked != null || _q == null) return;
    final correct = i == _q!.correctIndex;
    setState(() {
      _picked = i;
      if (correct) {
        _score++;
        _streak++;
        if (_streak > _best) _best = _streak;
      } else {
        _streak = 0;
      }
    });
    Future.delayed(const Duration(milliseconds: 320), () {
      if (!mounted || !_running) return;
      setState(() {
        _picked = null;
        _q = _next();
      });
    });
  }

  Future<void> _finish() async {
    if (_finished) return;
    _timer?.cancel();
    setState(() {
      _running = false;
      _finished = true;
      _secondsLeft = 0;
    });
    final xp = (_score * 6).clamp(0, 120);
    if (xp > 0) {
      final award = await XpStore.instance.award(xp, 'memory-win');
      await QuestsStore.instance.trackFromReason('memory-win', xp);
      if (!mounted) return;
      if (award.levelUp) {
        await showLevelUpCelebration(context,
            level: award.level, title: levelTitle(award.level));
      }
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
                  Text('⚡ Blitz',
                      style: Theme.of(context)
                          .textTheme
                          .headlineMedium
                          ?.copyWith(fontSize: 23)),
                  const Spacer(),
                  _Timer(secondsLeft: _secondsLeft, total: _gameSeconds),
                ],
              ),
              const SizedBox(height: AppSpacing.x3),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _stat(context, 'Punkte', '$_score'),
                  _stat(context, 'Serie', '$_streak'),
                  _stat(context, 'Beste', '$_best'),
                ],
              ),
              const SizedBox(height: AppSpacing.x5),
              Expanded(
                child: _finished
                    ? _Summary(score: _score, best: _best, onAgain: _start)
                    : (_q == null
                        ? const Center(
                            child: Text('Zu wenig Daten für Blitz.'))
                        : _QuestionView(
                            q: _q!,
                            picked: _picked,
                            onAnswer: _answer,
                          )),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _stat(BuildContext context, String label, String value) {
    final surfaces = AppSurfaces.of(context);
    return Column(
      children: [
        Text(value,
            style: GoogleFonts.fraunces(
                fontSize: 20, fontWeight: FontWeight.w700)),
        Text(label, style: TextStyle(fontSize: 11.5, color: surfaces.textMuted)),
      ],
    );
  }
}

class _Timer extends StatelessWidget {
  const _Timer({required this.secondsLeft, required this.total});
  final int secondsLeft;
  final int total;

  @override
  Widget build(BuildContext context) {
    final low = secondsLeft <= 10;
    return Container(
      padding:
          const EdgeInsets.symmetric(horizontal: AppSpacing.x3, vertical: 6),
      decoration: BoxDecoration(
        color: (low ? AppColors.danger : AppColors.brand).withValues(alpha: 0.16),
        borderRadius: BorderRadius.circular(AppRadii.pill),
      ),
      child: Text(
        '⏱ ${secondsLeft}s',
        style: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w700,
          color: low ? AppColors.danger : AppColors.brand,
        ),
      ),
    );
  }
}

class _QuestionView extends StatelessWidget {
  const _QuestionView(
      {required this.q, required this.picked, required this.onAnswer});
  final BlitzQuestion q;
  final int? picked;
  final ValueChanged<int> onAnswer;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return Column(
      children: [
        GlassCard(
          accent: q.dialekt.color,
          child: Column(
            children: [
              Text('${q.dialekt.flag} ${q.dialekt.name}',
                  style: TextStyle(fontSize: 12.5, color: q.dialekt.color)),
              const SizedBox(height: AppSpacing.x2),
              Text(
                q.prompt,
                textAlign: TextAlign.center,
                style: GoogleFonts.fraunces(
                    fontSize: 26, fontWeight: FontWeight.w700),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.x3),
        Text('Welche Übersetzung passt?',
            style: TextStyle(color: surfaces.textMuted, fontSize: 13)),
        const SizedBox(height: AppSpacing.x3),
        for (var i = 0; i < q.options.length; i++) ...[
          _OptionButton(
            label: q.options[i],
            state: picked == null
                ? _OptState.idle
                : (i == q.correctIndex
                    ? _OptState.correct
                    : (i == picked ? _OptState.wrong : _OptState.idle)),
            onTap: () => onAnswer(i),
          ),
          const SizedBox(height: AppSpacing.x2),
        ],
      ],
    );
  }
}

enum _OptState { idle, correct, wrong }

class _OptionButton extends StatelessWidget {
  const _OptionButton(
      {required this.label, required this.state, required this.onTap});
  final String label;
  final _OptState state;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final (bg, border) = switch (state) {
      _OptState.correct => (
          AppColors.success.withValues(alpha: 0.2),
          AppColors.success
        ),
      _OptState.wrong => (
          AppColors.danger.withValues(alpha: 0.2),
          AppColors.danger
        ),
      _OptState.idle => (
          surfaces.surface.withValues(alpha: 0.6),
          surfaces.border
        ),
    };
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        width: double.infinity,
        padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.x4, vertical: AppSpacing.x4),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(AppRadii.md),
          border: Border.all(color: border),
        ),
        child: Text(label,
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600)),
      ),
    );
  }
}

class _Summary extends StatelessWidget {
  const _Summary(
      {required this.score, required this.best, required this.onAgain});
  final int score;
  final int best;
  final VoidCallback onAgain;

  @override
  Widget build(BuildContext context) {
    final xp = (score * 6).clamp(0, 120);
    return Center(
      child: GlassCard(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(score >= 10 ? '🏆' : '⚡', style: const TextStyle(fontSize: 48)),
            const SizedBox(height: AppSpacing.x2),
            Text('Zeit abgelaufen!',
                style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: AppSpacing.x4),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _stat(context, 'Punkte', '$score'),
                _stat(context, 'Beste Serie', '$best'),
                _stat(context, 'XP', '+$xp'),
              ],
            ),
            const SizedBox(height: AppSpacing.x5),
            GradientButton(
                label: 'Nochmal', icon: Icons.refresh_rounded, onPressed: onAgain),
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
            style: GoogleFonts.fraunces(
                fontSize: 22, fontWeight: FontWeight.w700)),
        Text(label, style: TextStyle(fontSize: 11.5, color: surfaces.textMuted)),
      ],
    );
  }
}
