import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';

import 'screens/splash_screen.dart';
import 'theme/app_theme.dart';

void main() {
  final widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  // Nativen Splash halten, bis der SplashScreen ihn nach dem ersten Frame entfernt.
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  runApp(const DialektoApp());
}

class DialektoApp extends StatelessWidget {
  const DialektoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dialekto',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      // Moderne, dunkle Standard-Optik (passend zum Splash); Light bleibt verfügbar.
      themeMode: ThemeMode.dark,
      home: const SplashScreen(),
    );
  }
}
