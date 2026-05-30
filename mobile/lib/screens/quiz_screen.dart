import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../widgets/aurora_background.dart';
import '../widgets/placeholder_view.dart';

class QuizScreen extends StatelessWidget {
  const QuizScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const AuroraBackground(
      child: SafeArea(
        child: PlaceholderView(
          emoji: '🎯',
          title: 'Quiz',
          message:
              'Multiple-Choice-Quiz quer durch alle Dialekte — kommt im nächsten Update.',
          accent: AppColors.pink,
        ),
      ),
    );
  }
}
