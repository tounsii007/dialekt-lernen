import 'dart:convert';
import 'dart:math';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../data/models.dart';

/// REST-Client für das Dialekto-Backend.
///
/// Identifiziert den Nutzer über eine anonyme Geräte-ID (SharedPreferences).
/// Schlägt eine Anfrage fehl oder ist das Backend nicht erreichbar, werfen die
/// Methoden eine [ApiException] bzw. liefern `false` — die App fällt dann auf
/// die lokal gebündelten Assets zurück.
class ApiService {
  ApiService({String? baseUrl, http.Client? client})
      : baseUrl = baseUrl ?? defaultBaseUrl,
        _client = client ?? http.Client();

  /// Standard-Backend-URL. Im Android-Emulator zeigt 10.0.2.2 auf den Host-PC;
  /// per `--dart-define=DIALEKTO_API=http://<host>:<port>` überschreibbar.
  static const String defaultBaseUrl = String.fromEnvironment(
    'DIALEKTO_API',
    defaultValue: 'http://10.0.2.2:8973',
  );

  static const String _kDeviceId = 'dialekto.deviceId';
  static const String _kUserId = 'dialekto.userId';
  static const Duration _timeout = Duration(seconds: 8);

  final String baseUrl;
  final http.Client _client;
  String? _userId;

  // ---------- Identität ----------

  Future<String> _deviceId() async {
    final prefs = await SharedPreferences.getInstance();
    var id = prefs.getString(_kDeviceId);
    if (id == null) {
      id = _newDeviceId();
      await prefs.setString(_kDeviceId, id);
    }
    return id;
  }

  /// Erzeugt eine neue, kryptografisch sichere Geräte-ID: 16 Zufallsbytes aus
  /// [Random.secure] als Hex-String. Die Geräte-ID ist faktisch ein Geheimnis,
  /// darf also nicht vorhersehbar sein.
  static String _newDeviceId() {
    final rnd = Random.secure();
    final bytes = List<int>.generate(16, (_) => rnd.nextInt(256));
    return bytes.map((b) => b.toRadixString(16).padLeft(2, '0')).join();
  }

  /// Legt den Nutzer zur Geräte-ID an (oder findet ihn) und cached die User-ID.
  Future<Map<String, dynamic>> registerUser() async {
    final res = await _client
        .post(
          Uri.parse('$baseUrl/api/users'),
          headers: const {'Content-Type': 'application/json'},
          body: jsonEncode({'deviceId': await _deviceId()}),
        )
        .timeout(_timeout);
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw ApiException(res.statusCode, 'Registrierung fehlgeschlagen');
    }
    final data = jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
    final id = data['id'] as String?;
    if (id != null) {
      _userId = id;
      (await SharedPreferences.getInstance()).setString(_kUserId, id);
    }
    return data;
  }

  Future<String> _ensureUserId() async {
    if (_userId != null) return _userId!;
    final cached = (await SharedPreferences.getInstance()).getString(_kUserId);
    if (cached != null) return _userId = cached;
    final id = (await registerUser())['id'] as String?;
    if (id == null) throw ApiException(0, 'Keine Nutzer-ID erhalten');
    return id;
  }

  // ---------- Stammdaten ----------

  Future<List<Dialekt>> fetchDialekte() async {
    final list = await _getJsonList('/api/dialekte');
    return list.map((j) => Dialekt.fromJson(j as Map<String, dynamic>)).toList();
  }

  Future<List<Ausdruck>> fetchAusdruecke(String dialektId) async {
    final list = await _getJsonList('/api/dialekte/$dialektId/ausdruecke');
    return list.map((j) => Ausdruck.fromJson(j as Map<String, dynamic>)).toList();
  }

  // ---------- Favoriten ----------

  Future<List<String>> fetchFavoriten() async {
    final uid = await _ensureUserId();
    final list = await _getJsonList('/api/users/$uid/favoriten');
    return list
        .map((j) => (j as Map<String, dynamic>)['ausdruckId'] as String)
        .toList();
  }

  Future<void> addFavorit(String ausdruckId) async {
    final uid = await _ensureUserId();
    await _send('PUT', '/api/users/$uid/favoriten/$ausdruckId');
  }

  Future<void> removeFavorit(String ausdruckId) async {
    final uid = await _ensureUserId();
    await _send('DELETE', '/api/users/$uid/favoriten/$ausdruckId');
  }

  // ---------- Lernstand / SRS ----------

  /// Bewertet eine Karte. rating: 1 = schwer, 2 = mittel, 3 = leicht.
  Future<Map<String, dynamic>> bewerten(String ausdruckId, int rating) async {
    final uid = await _ensureUserId();
    final res = await _client
        .post(
          Uri.parse('$baseUrl/api/users/$uid/lernstand/$ausdruckId/bewerten'),
          headers: const {'Content-Type': 'application/json'},
          body: jsonEncode({'rating': rating}),
        )
        .timeout(_timeout);
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw ApiException(res.statusCode, 'Bewertung fehlgeschlagen');
    }
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }

  // ---------- Erreichbarkeit ----------

  Future<bool> isAvailable() async {
    try {
      final res = await _client
          .get(Uri.parse('$baseUrl/actuator/health'))
          .timeout(const Duration(seconds: 3));
      return res.statusCode == 200;
    } catch (_) {
      return false;
    }
  }

  // ---------- intern ----------

  Future<List<dynamic>> _getJsonList(String path) async {
    final res = await _client.get(Uri.parse('$baseUrl$path')).timeout(_timeout);
    if (res.statusCode != 200) throw ApiException(res.statusCode, 'GET $path');
    return jsonDecode(utf8.decode(res.bodyBytes)) as List<dynamic>;
  }

  Future<void> _send(String method, String path) async {
    final req = http.Request(method, Uri.parse('$baseUrl$path'));
    final res = await _client.send(req).timeout(_timeout);
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw ApiException(res.statusCode, '$method $path');
    }
  }

  void dispose() => _client.close();
}

/// Fehler bei einer Backend-Anfrage.
class ApiException implements Exception {
  ApiException(this.statusCode, [this.message]);

  final int statusCode;
  final String? message;

  @override
  String toString() =>
      'ApiException($statusCode${message != null ? ': $message' : ''})';
}
