# Dialekto · Docker-Stack

Frontend (nginx), Backend (Spring Boot, beliebig viele Replikate) und
PostgreSQL als Container. **Alle Ports, die Replikat-Anzahl und die Zugangsdaten
sind über die `.env` konfigurierbar** — bewusst nicht die Standard-Ports.

Nur das **Frontend** ist nach außen erreichbar; nginx verteilt `/api` intern per
Round-Robin auf die Backend-Replikate. Backend und Datenbank haben keinen Host-Port.

## Start

```bash
cp .env.example .env          # Werte anpassen (v.a. Passwort!)
docker compose up -d --build
```

Dann öffnen: **http://localhost:8973**  (= `FRONTEND_PORT`)

## .env — alle Einstellungen

| Variable | Default | Bedeutung |
|----------|---------|-----------|
| `FRONTEND_PORT`     | `8973` | Öffentlicher Host-Port (Browser) |
| `NGINX_PORT`        | `8080` | Port, auf dem nginx im Container lauscht |
| `BACKEND_PORT`      | `9090` | Backend-Port (intern; Standard wäre 8080) |
| `POSTGRES_PORT`     | `6432` | PostgreSQL-Port (intern; Standard wäre 5432) |
| `BACKEND_REPLICAS`  | `2`    | **Anzahl der Backend-Instanzen** (nginx load-balanced) |
| `POSTGRES_DB/USER/PASSWORD` | `dialekto` | Datenbank-Zugang (Passwort in Prod ändern!) |
| `JAVA_OPTS`         | `-XX:MaxRAMPercentage=75.0` | JVM-Optionen je Backend-Container |
| `CORS_ORIGINS`      | `http://localhost:8973` | Erlaubte Frontend-Origin(s) |
| `BACKEND_DEBUG_PORT` / `POSTGRES_DEBUG_PORT` | `19090` / `65432` | nur fürs Debug-Override |

## Skalieren

Replikate über die `.env` (`BACKEND_REPLICAS=4`) und `docker compose up -d`,
oder zur Laufzeit:

```bash
docker compose up -d --scale backend=4
```

nginx erkennt neue/entfernte Replikate automatisch (DNS-Resolver, 10 s).

## Debug (Backend/DB direkt erreichbar)

```bash
# BACKEND_REPLICAS=1 setzen, dann:
docker compose -f docker-compose.yml -f docker-compose.debug.yml up -d
# Backend: http://localhost:19090 · Postgres: localhost:65432
```

## Befehle

```bash
docker compose ps
docker compose logs -f backend
docker compose down            # stoppen (Daten bleiben)
docker compose down -v         # stoppen + Daten löschen
```

## Images (aktuelle Versionen)

| Dienst    | Image |
|-----------|-------|
| Frontend  | `nginx:1.27-alpine` |
| Backend   | Build `maven:3.9-eclipse-temurin-21` → Runtime `eclipse-temurin:21-jre-alpine` (non-root) |
| Datenbank | `postgres:17-alpine` |

## Sicherheit

- Backend & DB ohne Host-Port (nur internes Compose-Netz); einziger Einstieg ist nginx.
- Backend-Härtung: HSTS, X-Frame-Options DENY, nosniff, CSP, Rate-Limit, strikte CORS.
- Backend-Container als unprivilegierter Nutzer.
- `.env` ist gitignored — Passwörter landen nicht im Repo.
