# Dialekto Backend

REST-API + PostgreSQL-Backend für die Dialekto-Lern-App (Spring Boot 3.4, Java 21).

## Schnellstart

1. **PostgreSQL starten** (Docker Desktop muss laufen):
   ```bash
   cd backend
   docker compose up -d
   ```
   Startet PostgreSQL 16 auf `localhost:5432` (DB/User/Passwort jeweils `dialekto`).

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

## API-Überblick

| Methode | Pfad | Zweck |
|---------|------|-------|
| GET     | `/api/dialekte`                         | Alle Dialekte |
| GET     | `/api/dialekte/{id}`                    | Ein Dialekt |
| GET     | `/api/dialekte/{id}/ausdruecke`         | Ausdrücke eines Dialekts |
| GET     | `/api/ausdruecke/{id}`                  | Ein Ausdruck |
| GET     | `/api/ausdruecke/search?q=&page=&size=` | Volltextsuche (paginiert) |
| POST    | `/api/users`                            | Nutzer via Geräte-ID anlegen/finden |
| GET     | `/api/users/{userId}/favoriten`         | Favoriten des Nutzers |
| PUT     | `/api/users/{userId}/favoriten/{ausdruckId}`    | Favorit hinzufügen |
| DELETE  | `/api/users/{userId}/favoriten/{ausdruckId}`    | Favorit entfernen |
| GET     | `/actuator/health`                      | Health-Check |

## Konfiguration (Umgebungsvariablen)

- `DB_URL` (Default `jdbc:postgresql://localhost:5432/dialekto`)
- `DB_USER`, `DB_PASSWORD` (Default `dialekto`)
- `SERVER_PORT` (Default `8080`)
- `CORS_ORIGINS` (Default `http://localhost:5173,http://127.0.0.1:5173`)

## Status & Roadmap

Erste Iteration (BE1–BE6): Setup, Schema (Flyway), Daten-Import, Read-API für
Stammdaten, Nutzer (Geräte-ID), Favoriten-Sync, Frontend-Anbindung.

Folge-Iterationen: Lernstand/SRS-Sync, XP/Streak/Gamification, Quiz-Ergebnisse,
eigene Decks, Notizen, Quests/Challenges/Liga, sowie Login/JWT (Accounts).
