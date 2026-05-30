import 'package:flutter_tts/flutter_tts.dart';

/// Sprachausgabe (Text-to-Speech) — Pendant zu util/speech.js der Web-App.
/// Spricht einen Ausdruck in der Sprache des jeweiligen Dialekts
/// (de-DE / de-AT / de-CH).
class TtsService {
  TtsService._();
  static final TtsService instance = TtsService._();

  final FlutterTts _tts = FlutterTts();
  bool _initialised = false;

  Future<void> _ensureInit() async {
    if (_initialised) return;
    await _tts.awaitSpeakCompletion(true);
    await _tts.setSpeechRate(0.45); // etwas langsamer für Dialekt-Verständnis
    await _tts.setPitch(1.0);
    _initialised = true;
  }

  Future<void> speak(String text, {String lang = 'de-DE'}) async {
    final t = text.trim();
    if (t.isEmpty) return;
    await _ensureInit();
    await _tts.stop();
    try {
      await _tts.setLanguage(lang);
    } catch (_) {
      await _tts.setLanguage('de-DE');
    }
    await _tts.speak(t);
  }

  Future<void> stop() async => _tts.stop();
}
