import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../data/models.dart';
import '../data/repository.dart';
import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/gradient_button.dart';
import '../widgets/placeholder_view.dart';

const int _kQuestionCount = 10;

class QuizScreen extends StatefulWidget {
  const QuizScreen({super.key});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _Question {
  _Question({
    required this.dialekt,
    required this.ausdruck,
    required this.options,
    required this.correctIndex,
  });

  final Dialekt dialekt;
  final Ausdruck ausdruck;
  final List<String> options;
  final int correctIndex;
}

class _QuizScreenState extends State<QuizScreen> {
  final _rng = math.Random();
  List<_Question> _questions = [];
  int _index = 0;
  int? _selected;
  int _score = 0;
  bool _finished = false;
  bool _ready = false; // true, sobald _generate() einmal gelaufen ist

  @override
  void initState() {
    super.initState();
    _generate();
  }

  void _generate() {
    final pairs = List<({Dialekt dialekt, Ausdruck ausdruck})>.from(
      DialektRepository.instance.alleMitDialekt,
    )..shuffle(_rng);

    final allMeanings = DialektRepository.instance.alleAusdruecke
        .map((a) => a.hochdeutsch)
        .where((s) => s.trim().isNotEmpty)
        .toSet()
        .toList();

    final questions = <_Question>[];
    for (final p in pairs) {
      if (questions.length >= _kQuestionCount) break;
      final correct = p.ausdruck.hochdeutsch.trim();
      if (correct.isEmpty) continue;

      final distractors = <String>{};
      var guard = 0;
      while (distractors.length < 3 && guard < 200) {
        guard++;
        final cand = allMeanings[_rng.nextInt(allMeanings.length)];
        if (cand != correct) distractors.add(cand);
      }
      if (distractors.length < 3) continue;

      final options = [correct, ...distractors]..shuffle(_rng);
      questions.add(_Question(
        dialekt: p.dialekt,
        ausdruck: p.ausdruck,
        options: options,
        correctIndex: options.indexOf(correct),
      ));
    }

    setState(() {
      _questions = questions;
      _index = 0;
      _selected = null;
      _score = 0;
      _finished = false;
      _ready = true;
    });
  }

  void _answer(int i) {
    if (_selected != null) return;
    setState(() {
      _selected = i;
      if (i == _questions[_index].correctIndex) _score++;
    });
  }

  void _next() {
    if (_index + 1 >= _questions.length) {
      setState(() => _finished = true);
      return;
    }
    setState(() {
      _index++;
      _selected = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_questions.isEmpty) {
      // Vor dem ersten _generate()-Lauf: Ladezustand. Danach mit leerer Liste:
      // echter Leer-/Fehlerzustand statt eines unendlichen Spinners (tritt auf,
      // wenn die Daten <4 distinkte Bedeutungen liefern → keine Frage baubar).
      return AuroraBackground(
        child: SafeArea(
          child: !_ready
              ? const Center(child: CircularProgressIndicator())
              : PlaceholderView(
                  emoji: '🧩',
                  title: 'Quiz nicht verfügbar',
                  message:
                      'Es sind zu wenige Ausdrücke vorhanden, um ein Quiz zu erstellen. '
                      'Schau später noch einmal vorbei.',
                  accent: Theme.of(context).colorScheme.primary,
                ),
        ),
      );
    }
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
          child: _finished ? _buildResult(context) : _buildQuestion(context),
        ),
      ),
    );
  }

  Widget _buildQuestion(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final q = _questions[_index];
    final answered = _selected != null;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('🎯 Quiz',
                style: Theme.of(context).textTheme.headlineMedium
                    ?.copyWith(fontSize: 24)),
            Text('Frage ${_index + 1}/${_questions.length}',
                style: TextStyle(color: surfaces.textMuted)),
          ],
        ),
        const SizedBox(height: AppSpacing.x3),
        ClipRRect(
          borderRadius: BorderRadius.circular(AppRadii.pill),
          child: LinearProgressIndicator(
            value: (_index + (answered ? 1 : 0)) / _questions.length,
            minHeight: 6,
            backgroundColor: surfaces.border,
            valueColor: const AlwaysStoppedAnimation(AppColors.brand),
          ),
        ),
        const SizedBox(height: AppSpacing.x5),
        Expanded(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
          padding: const EdgeInsets.all(AppSpacing.x5),
          decoration: BoxDecoration(
            color: surfaces.surface.withValues(alpha: 0.8),
            borderRadius: BorderRadius.circular(AppRadii.lg),
            border: Border.all(color: q.dialekt.color.withValues(alpha: 0.4)),
          ),
          child: Column(
            children: [
              Text(q.dialekt.flag, style: const TextStyle(fontSize: 30)),
              const SizedBox(height: AppSpacing.x2),
              Text('Was bedeutet …',
                  style: TextStyle(color: surfaces.textMuted, fontSize: 13)),
              const SizedBox(height: 4),
              Text(
                '„${q.ausdruck.ausdruck}"',
                textAlign: TextAlign.center,
                style: Theme.of(context)
                    .textTheme
                    .headlineMedium
                    ?.copyWith(fontSize: 24),
              ),
              const SizedBox(height: 4),
              Text(q.dialekt.name,
                  style: TextStyle(color: q.dialekt.color, fontSize: 13)),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.x5),
        for (var i = 0; i < q.options.length; i++) ...[
          _OptionButton(
            label: q.options[i],
            state: !answered
                ? _OptionState.idle
                : i == q.correctIndex
                    ? _OptionState.correct
                    : i == _selected
                        ? _OptionState.wrong
                        : _OptionState.dimmed,
            onTap: () => _answer(i),
          ),
          const SizedBox(height: AppSpacing.x3),
        ],
              ],
            ),
          ),
        ),
        const SizedBox(height: AppSpacing.x3),
        if (answered)
          GradientButton(
            label: _index + 1 >= _questions.length ? 'Ergebnis' : 'Weiter',
            icon: Icons.arrow_forward_rounded,
            expand: true,
            onPressed: _next,
          ),
      ],
    );
  }

  Widget _buildResult(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    final pct = (_score / _questions.length * 100).round();
    final emoji = pct >= 90
        ? '🏆'
        : pct >= 70
            ? '🎉'
            : pct >= 50
                ? '👍'
                : '💪';

    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(emoji, style: const TextStyle(fontSize: 64)),
          const SizedBox(height: AppSpacing.x4),
          ShaderMask(
            shaderCallback: (b) => AppColors.brandGradient.createShader(b),
            child: Text(
              '$pct%',
              style: const TextStyle(fontFamily: 'Fraunces').copyWith(
                fontSize: 56,
                fontWeight: FontWeight.w700,
                color: Colors.white,
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.x2),
          Text(
            '$_score von ${_questions.length} richtig',
            style: TextStyle(fontSize: 16, color: surfaces.textMuted),
          ),
          const SizedBox(height: AppSpacing.x6),
          GradientButton(
            label: 'Nochmal spielen',
            icon: Icons.refresh_rounded,
            onPressed: _generate,
          ),
        ],
      ),
    );
  }
}

enum _OptionState { idle, correct, wrong, dimmed }

class _OptionButton extends StatelessWidget {
  const _OptionButton({
    required this.label,
    required this.state,
    required this.onTap,
  });

  final String label;
  final _OptionState state;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);

    final (Color border, Color bg, IconData? icon, Color iconColor) =
        switch (state) {
      _OptionState.correct => (
          AppColors.success,
          AppColors.success.withValues(alpha: 0.16),
          Icons.check_circle_rounded,
          AppColors.success,
        ),
      _OptionState.wrong => (
          AppColors.danger,
          AppColors.danger.withValues(alpha: 0.14),
          Icons.cancel_rounded,
          AppColors.danger,
        ),
      _OptionState.dimmed => (
          surfaces.border,
          surfaces.surface.withValues(alpha: 0.4),
          null,
          surfaces.textMuted,
        ),
      _OptionState.idle => (
          surfaces.border,
          surfaces.surface.withValues(alpha: 0.7),
          null,
          surfaces.textMuted,
        ),
    };

    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(AppRadii.md),
        onTap: state == _OptionState.idle ? onTap : null,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.x4,
            vertical: AppSpacing.x4,
          ),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(AppRadii.md),
            border: Border.all(color: border, width: 1.5),
          ),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  label,
                  style: TextStyle(
                    fontSize: 15,
                    color: state == _OptionState.dimmed
                        ? surfaces.textMuted
                        : Theme.of(context).colorScheme.onSurface,
                  ),
                ),
              ),
              if (icon != null) Icon(icon, color: iconColor, size: 20),
            ],
          ),
        ),
      ),
    );
  }
}
