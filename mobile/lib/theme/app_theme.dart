import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Design-Tokens, abgeleitet aus styles.css (:root) der Web-App.
/// Eine zentrale Quelle für Farben, Radien, Abstände, Gradienten und Typografie.

class AppRadii {
  static const double sm = 8;
  static const double md = 14;
  static const double lg = 20;
  static const double xl = 28;
  static const double pill = 999;
}

class AppSpacing {
  static const double x1 = 4;
  static const double x2 = 8;
  static const double x3 = 12;
  static const double x4 = 16;
  static const double x5 = 24;
  static const double x6 = 32;
  static const double x7 = 48;
  static const double x8 = 64;
}

class AppColors {
  // Brand-Palette (≈ hsl-Werte aus styles.css)
  static const Color brand = Color(0xFF8B5CF6); // --brand / manifest theme
  static const Color brand2 = Color(0xFFC24BE0); // hsl(290 80% 58%)
  static const Color brand3 = Color(0xFF4B90F0); // hsl(215 90% 62%)
  static const Color pink = Color(0xFFF0609B); // hsl(335 85% 65%)
  static const Color accent = Color(0xFF26D9AC); // hsl(165 70% 50%)
  static const Color accent2 = Color(0xFF36C6F0); // hsl(195 85% 55%)
  static const Color warm = Color(0xFFF7A43D); // hsl(28 95% 60%)

  // Semantische State-Farben (wie Iteration 1 der Web-App)
  static const Color success = Color(0xFF34B978);
  static const Color danger = Color(0xFFE85B5B);
  static const Color warning = Color(0xFFF2A007);

  // Splash / Manifest background_color
  static const Color splashBg = Color(0xFF1A1A2E);

  // --- Dark Theme ---
  static const Color dBg = Color(0xFF0D0D16); // hsl(240 25% 7%)
  static const Color dBgElev = Color(0xFF16161F); // hsl(240 22% 11%)
  static const Color dBgSoft = Color(0xFF1C1C2B); // hsl(240 20% 14%)
  static const Color dBorder = Color(0xFF30303F); // hsl(240 15% 22%)
  static const Color dText = Color(0xFFF3F3F7); // hsl(240 15% 96%)
  static const Color dTextSoft = Color(0xFFBFBFCB); // hsl(240 10% 75%)
  static const Color dTextMuted = Color(0xFF82828F); // hsl(240 10% 55%)

  // --- Light Theme ---
  static const Color lBg = Color(0xFFF8F7FE); // hsl(250 40% 98%)
  static const Color lBgElev = Color(0xFFFFFFFF);
  static const Color lBgSoft = Color(0xFFF1EFFA); // hsl(250 30% 96%)
  static const Color lBorder = Color(0xFFDDD9EB); // hsl(250 20% 88%)
  static const Color lText = Color(0xFF17172A); // hsl(240 25% 12%)
  static const Color lTextSoft = Color(0xFF4D4D63);
  static const Color lTextMuted = Color(0xFF82828F);

  // Gradienten
  static const LinearGradient brandGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [brand, brand2, pink],
    stops: [0.0, 0.55, 1.0],
  );
  static const LinearGradient coolGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [brand3, accent],
  );
  static const LinearGradient warmGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [warm, pink],
  );
}

class AppTheme {
  static const String _displayFont = 'Fraunces';
  static const String _bodyFont = 'Inter';

  static ThemeData dark() => _build(
        brightness: Brightness.dark,
        scaffold: AppColors.dBg,
        surface: AppColors.dBgElev,
        text: AppColors.dText,
        textMuted: AppColors.dTextMuted,
        border: AppColors.dBorder,
      );

  static ThemeData light() => _build(
        brightness: Brightness.light,
        scaffold: AppColors.lBg,
        surface: AppColors.lBgElev,
        text: AppColors.lText,
        textMuted: AppColors.lTextMuted,
        border: AppColors.lBorder,
      );

  static ThemeData _build({
    required Brightness brightness,
    required Color scaffold,
    required Color surface,
    required Color text,
    required Color textMuted,
    required Color border,
  }) {
    final base = ThemeData(brightness: brightness, useMaterial3: true);
    final colorScheme = ColorScheme.fromSeed(
      seedColor: AppColors.brand,
      brightness: brightness,
    ).copyWith(
      primary: AppColors.brand,
      secondary: AppColors.accent,
      surface: surface,
      onSurface: text,
    );

    final bodyTextTheme = GoogleFonts.interTextTheme(base.textTheme).apply(
      bodyColor: text,
      displayColor: text,
    );

    return base.copyWith(
      colorScheme: colorScheme,
      scaffoldBackgroundColor: scaffold,
      canvasColor: scaffold,
      textTheme: bodyTextTheme.copyWith(
        displayLarge: GoogleFonts.fraunces(
          textStyle: bodyTextTheme.displayLarge,
          fontWeight: FontWeight.w700,
          color: text,
        ),
        headlineMedium: GoogleFonts.fraunces(
          textStyle: bodyTextTheme.headlineMedium,
          fontWeight: FontWeight.w700,
          color: text,
        ),
        titleLarge: GoogleFonts.fraunces(
          textStyle: bodyTextTheme.titleLarge,
          fontWeight: FontWeight.w600,
          color: text,
        ),
      ),
      dividerColor: border,
      iconTheme: IconThemeData(color: text),
      splashColor: AppColors.brand.withValues(alpha: 0.12),
      highlightColor: AppColors.brand.withValues(alpha: 0.06),
      extensions: <ThemeExtension<dynamic>>[
        AppSurfaces(
          surface: surface,
          border: border,
          textMuted: textMuted,
          displayFont: _displayFont,
          bodyFont: _bodyFont,
        ),
      ],
    );
  }
}

/// Zusätzliche Design-Tokens, die nicht 1:1 in ThemeData passen.
@immutable
class AppSurfaces extends ThemeExtension<AppSurfaces> {
  const AppSurfaces({
    required this.surface,
    required this.border,
    required this.textMuted,
    required this.displayFont,
    required this.bodyFont,
  });

  final Color surface;
  final Color border;
  final Color textMuted;
  final String displayFont;
  final String bodyFont;

  static AppSurfaces of(BuildContext context) =>
      Theme.of(context).extension<AppSurfaces>()!;

  @override
  AppSurfaces copyWith({
    Color? surface,
    Color? border,
    Color? textMuted,
    String? displayFont,
    String? bodyFont,
  }) =>
      AppSurfaces(
        surface: surface ?? this.surface,
        border: border ?? this.border,
        textMuted: textMuted ?? this.textMuted,
        displayFont: displayFont ?? this.displayFont,
        bodyFont: bodyFont ?? this.bodyFont,
      );

  @override
  AppSurfaces lerp(ThemeExtension<AppSurfaces>? other, double t) {
    if (other is! AppSurfaces) return this;
    return AppSurfaces(
      surface: Color.lerp(surface, other.surface, t)!,
      border: Color.lerp(border, other.border, t)!,
      textMuted: Color.lerp(textMuted, other.textMuted, t)!,
      displayFont: t < 0.5 ? displayFont : other.displayFont,
      bodyFont: t < 0.5 ? bodyFont : other.bodyFont,
    );
  }
}
