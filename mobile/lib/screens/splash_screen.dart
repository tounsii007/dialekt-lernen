import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:google_fonts/google_fonts.dart';

import '../data/favorites_store.dart';
import '../data/repository.dart';
import '../data/srs_store.dart';
import '../data/streak_store.dart';
import '../data/xp_store.dart';
import '../state/settings_controller.dart';
import '../theme/app_theme.dart';
import '../widgets/brand_logo.dart';
import 'app_shell.dart';

/// Animierter In-App-Splash: übernimmt nahtlos vom nativen Splash (gleiche
/// Hintergrundfarbe), animiert Logo + Wortmarke und lädt dabei die Daten.
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _logoScale;
  late final Animation<double> _logoFade;
  late final Animation<double> _textFade;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
    _logoFade = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.0, 0.5, curve: Curves.easeOut),
    );
    _logoScale = Tween<double>(begin: 0.6, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOutBack),
      ),
    );
    _textFade = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.45, 1.0, curve: Curves.easeOut),
    );
    _controller.forward();

    // Nativen Splash entfernen, sobald der erste Frame steht.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      FlutterNativeSplash.remove();
    });
    _boot();
  }

  Future<void> _boot() async {
    final sw = Stopwatch()..start();
    try {
      await SettingsController.instance.load();
      await DialektRepository.instance.load();
      await FavoritesStore.instance.load();
      await SrsStore.instance.load();
      await XpStore.instance.load();
      await StreakStore.instance.load();
    } catch (_) {
      // Daten konnten nicht geladen werden — App startet trotzdem.
    }
    const minShowMs = 1600;
    final remaining = minShowMs - sw.elapsedMilliseconds;
    if (remaining > 0) {
      await Future<void>.delayed(Duration(milliseconds: remaining));
    }
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      PageRouteBuilder(
        transitionDuration: const Duration(milliseconds: 500),
        pageBuilder: (_, _, _) => const AppShell(),
        transitionsBuilder: (_, anim, _, child) =>
            FadeTransition(opacity: anim, child: child),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.splashBg,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            FadeTransition(
              opacity: _logoFade,
              child: ScaleTransition(
                scale: _logoScale,
                child: const BrandLogo(size: 104),
              ),
            ),
            const SizedBox(height: AppSpacing.x5),
            FadeTransition(
              opacity: _textFade,
              child: Column(
                children: [
                  ShaderMask(
                    shaderCallback: (bounds) =>
                        AppColors.brandGradient.createShader(bounds),
                    child: Text(
                      'Dialekto',
                      style: GoogleFonts.fraunces(
                        fontSize: 40,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.x2),
                  Text(
                    'Deutsche Dialekte lernen',
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      color: Colors.white.withValues(alpha: 0.7),
                      letterSpacing: 0.3,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.x7),
            SizedBox(
              width: 26,
              height: 26,
              child: CircularProgressIndicator(
                strokeWidth: 2.4,
                valueColor: AlwaysStoppedAnimation<Color>(
                  Colors.white.withValues(alpha: 0.8),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
