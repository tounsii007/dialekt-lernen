import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../data/xp_store.dart';
import '../theme/app_theme.dart';

/// Zeigt die Level-Up-Feier als Overlay-Dialog. Auto-Dismiss nach ~2.8s,
/// per Tipp auch früher schließbar. Port der Web-Feier (xp-hud.js showLevelUp).
Future<void> showLevelUpCelebration(
  BuildContext context, {
  required int level,
  required String title,
}) {
  HapticFeedback.mediumImpact();
  return showGeneralDialog<void>(
    context: context,
    barrierDismissible: true,
    barrierLabel: 'Level Up',
    barrierColor: Colors.black.withValues(alpha: 0.55),
    transitionDuration: const Duration(milliseconds: 320),
    pageBuilder: (_, _, _) =>
        _LevelUpContent(level: level, title: title),
    transitionBuilder: (context, anim, _, child) {
      final curved = CurvedAnimation(parent: anim, curve: Curves.easeOutBack);
      return FadeTransition(
        opacity: anim,
        child: ScaleTransition(scale: curved, child: child),
      );
    },
  );
}

class _LevelUpContent extends StatefulWidget {
  const _LevelUpContent({required this.level, required this.title});

  final int level;
  final String title;

  @override
  State<_LevelUpContent> createState() => _LevelUpContentState();
}

class _LevelUpContentState extends State<_LevelUpContent>
    with TickerProviderStateMixin {
  late final AnimationController _confetti;
  late final AnimationController _pulse;
  bool _dismissed = false;

  @override
  void initState() {
    super.initState();
    _confetti = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2600),
    )..forward();
    _pulse = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat(reverse: true);
    _confetti.addStatusListener((s) {
      if (s == AnimationStatus.completed) _close();
    });
  }

  void _close() {
    if (_dismissed) return;
    _dismissed = true;
    if (mounted) Navigator.of(context).maybePop();
  }

  @override
  void dispose() {
    _confetti.dispose();
    _pulse.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Bis Level 10 vergibt jede Stufe einen neuen Rang-Titel.
    final isNewRank =
        widget.level > 1 && widget.title != levelTitle(widget.level - 1);
    return GestureDetector(
      onTap: _close,
      behavior: HitTestBehavior.opaque,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Positioned.fill(
            child: AnimatedBuilder(
              animation: _confetti,
              builder: (context, _) => CustomPaint(
                painter: _ConfettiPainter(_confetti.value),
              ),
            ),
          ),
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Level Up!',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 2,
                    color: Colors.white,
                  )),
              const SizedBox(height: AppSpacing.x4),
              ScaleTransition(
                scale: Tween<double>(begin: 0.92, end: 1.06).animate(
                  CurvedAnimation(parent: _pulse, curve: Curves.easeInOut),
                ),
                child: Container(
                  width: 132,
                  height: 132,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    gradient: AppColors.brandGradient,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.brand.withValues(alpha: 0.6),
                        blurRadius: 48,
                        spreadRadius: 4,
                      ),
                    ],
                  ),
                  child: Text(
                    '${widget.level}',
                    style: TextStyle(fontFamily: 'Fraunces', 
                      fontSize: 60,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: AppSpacing.x4),
              Text(
                widget.title,
                style: TextStyle(fontFamily: 'Fraunces', 
                  fontSize: 26,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: AppSpacing.x2),
              Text(
                isNewRank
                    ? '🏅 Neuer Rang freigeschaltet'
                    : 'Bleib dran — der nächste Rang wartet!',
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.white.withValues(alpha: 0.85),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// Leichtgewichtiges Konfetti ohne externe Abhängigkeit: Partikel starten als
/// Burst aus der Mitte und fallen mit der Schwerkraft nach unten.
class _ConfettiPainter extends CustomPainter {
  _ConfettiPainter(this.t);

  /// Fortschritt 0..1.
  final double t;

  static const List<Color> _palette = [
    AppColors.brand,
    AppColors.brand2,
    AppColors.pink,
    AppColors.accent,
    AppColors.warm,
  ];

  static final List<_Particle> _particles = _build();

  static List<_Particle> _build() {
    final rng = math.Random(42);
    return List.generate(80, (i) {
      final angle = rng.nextDouble() * 2 * math.pi;
      final speed = 0.25 + rng.nextDouble() * 0.55;
      return _Particle(
        vx: math.cos(angle) * speed,
        vy: math.sin(angle) * speed - 0.35,
        color: _palette[i % _palette.length],
        size: 5 + rng.nextDouble() * 7,
        rot: rng.nextDouble() * math.pi,
        rotSpeed: (rng.nextDouble() - 0.5) * 8,
      );
    });
  }

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height * 0.42;
    final paint = Paint();
    for (final p in _particles) {
      // Position: Burst + Schwerkraft (quadratischer Fall).
      final x = cx + p.vx * size.width * t;
      final y = cy + (p.vy * size.height * t) + (1.6 * size.height * t * t);
      final opacity = (1.0 - t).clamp(0.0, 1.0);
      paint.color = p.color.withValues(alpha: opacity);
      canvas.save();
      canvas.translate(x, y);
      canvas.rotate(p.rot + p.rotSpeed * t);
      canvas.drawRect(
        Rect.fromCenter(
            center: Offset.zero, width: p.size, height: p.size * 0.5),
        paint,
      );
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(_ConfettiPainter oldDelegate) => oldDelegate.t != t;
}

class _Particle {
  _Particle({
    required this.vx,
    required this.vy,
    required this.color,
    required this.size,
    required this.rot,
    required this.rotSpeed,
  });

  final double vx;
  final double vy;
  final Color color;
  final double size;
  final double rot;
  final double rotSpeed;
}
