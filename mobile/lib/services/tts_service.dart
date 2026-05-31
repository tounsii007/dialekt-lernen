import 'package:flutter_tts/flutter_tts.dart';

/// Sprachausgabe (Text-to-Speech) — Pendant zu util/speech.js der Web-App.
/// Spricht einen Ausdruck in der Sprache des jeweiligen Dialekts
/// (de-DE / de-AT / de-CH).
class TtsService {
  TtsService._();
  static final TtsService instance = TtsService._();

  static const double normalRate = 0.45; // Standard (langsam für Dialekte)
  static const double slowRate = 0.25; // Slow-Mo für Silben-Genauigkeit

  final FlutterTts _tts = FlutterTts();
  bool _initialised = false;
  double _rate = normalRate;

  Future<void> _ensureInit() async {
    if (_initialised) return;
    await _tts.awaitSpeakCompletion(true);
    await _tts.setSpeechRate(_rate);
    await _tts.setPitch(1.0);
    _initialised = true;
  }

  Future<void> speak(String text, {String lang = 'de-DE', double? rate}) async {
    final t = text.trim();
    if (t.isEmpty) return;
    await _ensureInit();
    await _tts.stop();
    final target = rate ?? normalRate;
    if (target != _rate) {
      _rate = target;
      await _tts.setSpeechRate(target);
    }
    try {
      await _tts.setLanguage(lang);
    } catch (_) {
      await _tts.setLanguage('de-DE');
    }
    await _tts.speak(t);
  }

  /// Liest betont langsam vor (für Silben-/Aussprache-Genauigkeit).
  Future<void> speakSlow(String text, {String lang = 'de-DE'}) =>
      speak(text, lang: lang, rate: slowRate);

  Future<void> stop() async => _tts.stop();
}
