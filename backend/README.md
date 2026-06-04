# Dialekto Backend

REST-API + PostgreSQL-Backend für die Dialekto-Lern-App (Spring Boot 3.4, Java 21).

## Schnellstart (lokale Entwicklung)

1. **PostgreSQL starten** (Docker Desktop muss laufen):
   ```bash
   cd backend
   docker compose up -d
   ```
   Startet PostgreSQL 17 (`postgres:17-alpine`) auf `127.0.0.1:5432`
   (DB/User/Passwort jeweils `dialekto`). Diese Dev-Compose-Datei
   (`backend/docker-compose.yml`) startet **nur** die Datenbank — das Backend
   läuft daneben lokal per Maven.

2. **Backend starten**:
   ```bash
   mvn spring-boot:run
   ```
   Beim ersten Start werden die Dialekt-Daten (24 Dialekte, ~6700 Ausdrücke) aus
   `src/main/resources/seed/dialekte.json` importiert. API unter `http://localhost:8080`.

3. **Tests** (nutzen In-Memory-H2, kein Docker nötig):
   ```bash
   mvn test
   ```

> **Produktiv-Stack:** Der komplette Stack (nginx-Frontend + Backend-Replikate +
> Postgres) wird über die **Root**-`docker-compose.yml` orchestriert. Dort laufen
> Backend und Datenbank auf bewusst nicht-standardmäßigen, **nur intern**
> erreichbaren Ports (Postgres `6432`, Backend `9090`); öffentlich erreichbar ist
> nur das Frontend (`FRONTEND_PORT`, Default `8973`). Details siehe
> [`../ARCHITECTURE.md`](../ARCHITECTURE.md) und [`../.env.example`](../.env.example).

## API-Überblick

Alle Pfade unter `/api`; Nutzer werden anonym über eine Geräte-ID identifiziert
(`userId` ist die vom Server vergebene UUID).

### Stammdaten (read-only)

| Methode | Pfad | Zweck |
|---------|------|-------|
| GET     | `/api/dialekte`                         | Alle Dialekte |
| GET     | `/api/dialekte/{id}`                    | Ein Dialekt |
| GET     | `/api/dialekte/{id}/ausdruecke`         | Ausdrücke eines Dialekts |
| GET     | `/api/kategorien`                       | Alle Kategorien |
| GET     | `/api/ausdruecke/{id}`                  | Ein Ausdruck |
| GET     | `/api/ausdruecke/search?q=&page=&size=` | Volltextsuche (paginiert, `size` 1–100) |

### Nutzer & Favoriten

| Methode | Pfad | Zweck |
|---------|------|-------|
| POST    | `/api/users`                                  | Nutzer via Geräte-ID anlegen/finden (201) |
| GET     | `/api/users/{userId}/favoriten`               | Favoriten des Nutzers |
| PUT     | `/api/users/{userId}/favoriten/{ausdruckId}`  | Favorit hinzufügen (204) |
| DELETE  | `/api/users/{userId}/favoriten/{ausdruckId}`  | Favorit entfernen (204) |

### Lernstand / Spaced-Repetition (SRS)

| Methode | Pfad | Zweck |
|---------|------|-------|
| GET     | `/api/users/{userId}/lernstand`                       | Kompletter Lernstand des Nutzers |
| GET     | `/api/users/{userId}/lernstand/faellig?limit=`        | Fällige Karten (Default `limit=50`) |
| POST    | `/api/users/{userId}/lernstand/{ausdruckId}/bewerten` | Karte bewerten (SM-2-Update) |

### Fortschritt (XP / Streak)

| Methode | Pfad | Zweck |
|---------|------|-------|
| GET     | `/api/users/{userId}/progress`          | XP- und Streak-Stand abrufen |
| PUT     | `/api/users/{userId}/progress`          | XP/Streak setzen (Sync vom Client) |

### Betrieb

| Methode | Pfad | Zweck |
|---------|------|-------|
| GET     | `/actuator/health`                      | Health-Check |
| GET     | `/actuator/info`                        | Build-/App-Infos |

## Konfiguration (Umgebungsvariablen)

- `DB_URL` (Default `jdbc:postgresql://localhost:5432/dialekto`)
- `DB_USER`, `DB_PASSWORD` (Default `dialekto`)
- `SERVER_PORT` (Default `8080`)
- `CORS_ORIGINS` (Default `http://localhost:5173,http://127.0.0.1:5173`)
- `LOG_LEVEL` (Default `INFO`; setzt das Log-Level für `com.dialekto`)

> Im Docker-Produktiv-Stack werden diese Variablen aus der `.env` befüllt
> (siehe [`../.env.example`](../.env.example)) — u. a. `SERVER_PORT=9090`,
> `CORS_ORIGINS=http://localhost:8973` und ein Postgres-Port von `6432`.

## Sicherheit

`SecurityConfig` betreibt die API **stateless** (keine Server-Session, CSRF aus,
da token-/geräte-basiert) mit strikter CORS-Whitelist und Security-Headern
(HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
Referrer-Policy, restriktive CSP — die API liefert ausschließlich JSON).
Erreichbar sind nur `/api/**`, `/actuator/health` und `/actuator/info`; alles
andere wird abgelehnt.

## Status & Roadmap

Umgesetzt: Setup, Schema (Flyway) + Kategorie-Tabelle, Daten-Import, Read-API für
Stammdaten, Nutzer (Geräte-ID), Favoriten-Sync, Frontend- und Flutter-Anbindung,
**Lernstand/SRS-Sync (SM-2)** sowie **XP/Streak-Fortschritt**, dazu Security-Härtung
(Spring Security, Header, CORS) und der Docker-Produktiv-Stack.

Roadmap: Quiz-Ergebnisse, eigene Decks, Notizen, Quests/Challenges/Liga sowie
Login/JWT (echte Accounts statt reiner Geräte-ID).
