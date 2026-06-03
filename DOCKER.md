# Dialekto · Docker-Stack

Frontend (nginx), Backend (Spring Boot) und PostgreSQL laufen als drei
Container. Nur das **Frontend** ist nach außen erreichbar; nginx leitet `/api`
intern an das Backend weiter (same-origin). Backend und Datenbank sind **nicht**
öffentlich exponiert.

## Start

```bash
cp .env.example .env          # optional: Passwort/Port anpassen
docker compose up -d --build
```

Dann öffnen: **http://localhost:8080**

Beim ersten Start importiert das Backend automatisch die 24 Dialekte / ~6700
Ausdrücke; PostgreSQL-Daten liegen im benannten Volume `dialekto-pgdata`.

## Befehle

```bash
docker compose ps            # Status der drei Dienste
docker compose logs -f backend
docker compose down          # stoppen (Daten bleiben im Volume)
docker compose down -v       # stoppen + Daten löschen
```

## Images (aktuelle Versionen)

| Dienst    | Image                              |
|-----------|------------------------------------|
| Frontend  | `nginx:1.27-alpine`                |
| Backend   | Build: `maven:3.9-eclipse-temurin-21`, Runtime: `eclipse-temurin:21-jre-alpine` (non-root) |
| Datenbank | `postgres:17-alpine`               |

> Hinweis: Für die Container wird Java **21 (LTS)** genutzt (der App-Bytecode ist
> ohnehin `release 21`) — das ist die stabile, langzeitunterstützte Wahl für den
> Betrieb. Lokal kompiliert auch ein neueres JDK.

## Sicherheit

- Backend & DB ohne Host-Port (nur internes Compose-Netz).
- Backend härtet HTTP (HSTS, X-Frame-Options DENY, nosniff, CSP, Rate-Limit, CORS).
- Backend-Container läuft als unprivilegierter Nutzer.
- Passwörter über `.env` (in Produktion zwingend ändern).
