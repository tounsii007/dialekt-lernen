import 'package:flutter/material.dart';

import '../services/tts_service.dart';
import '../theme/app_theme.dart';

/// Lautsprecher-Button: liest einen Ausdruck in der Dialekt-Sprache vor.
class SpeakButton extends StatelessWidget {
  const SpeakButton({
    super.key,
    required this.text,
    this.lang = 'de-DE',
    this.size = 22,
    this.color,
  });

  final String text;
  final String lang;
  final double size;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final surfaces = AppSurfaces.of(context);
    return IconButton(
      visualDensity: VisualDensity.compact,
      tooltip: 'Vorlesen',
      onPressed: () => TtsService.instance.speak(text, lang: lang),
      icon: Icon(
        Icons.volume_up_rounded,
        size: size,
        color: color ?? surfaces.textMuted,
      ),
    );
  }
}
