-- Dialekto · Initiales Schema
-- Dialekt-Stammdaten (read-only, per Seed gefüllt) + Nutzer-Lernstand.

-- ---------- Stammdaten ----------
CREATE TABLE dialekt (
    id           VARCHAR(64)  PRIMARY KEY,
    name         VARCHAR(128) NOT NULL,
    region       VARCHAR(128),
    bundesland   VARCHAR(128),
    flag         VARCHAR(16),
    farbe        VARCHAR(16),
    beschreibung TEXT,
    sprecher     VARCHAR(64),
    lang         VARCHAR(16)
);

CREATE TABLE ausdruck (
    id          VARCHAR(64) PRIMARY KEY,
    dialekt_id  VARCHAR(64) NOT NULL REFERENCES dialekt(id),
    ausdruck    TEXT NOT NULL,
    hochdeutsch TEXT,
    bedeutung   TEXT,
    beispiel    TEXT,
    beispiel_hd TEXT,
    kategorie   VARCHAR(64)
);
CREATE INDEX idx_ausdruck_dialekt   ON ausdruck (dialekt_id);
CREATE INDEX idx_ausdruck_kategorie ON ausdruck (kategorie);

-- ---------- Nutzer (anonyme Geräte-ID; Login folgt später) ----------
CREATE TABLE app_user (
    id           UUID PRIMARY KEY,
    device_id    VARCHAR(128) NOT NULL UNIQUE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- Favoriten ----------
CREATE TABLE favorit (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    ausdruck_id VARCHAR(64) NOT NULL REFERENCES ausdruck(id),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, ausdruck_id)
);
CREATE INDEX idx_favorit_user ON favorit (user_id);

-- ---------- Lernstand / SRS ----------
CREATE TABLE lernstand (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    ausdruck_id     VARCHAR(64) NOT NULL REFERENCES ausdruck(id),
    status          SMALLINT NOT NULL DEFAULT 0,
    ease            DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    intervall_tage  INTEGER NOT NULL DEFAULT 0,
    faelligkeit     TIMESTAMPTZ,
    wiederholungen  INTEGER NOT NULL DEFAULT 0,
    aktualisiert_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, ausdruck_id)
);
CREATE INDEX idx_lernstand_user      ON lernstand (user_id);
CREATE INDEX idx_lernstand_faellig   ON lernstand (user_id, faelligkeit);

-- ---------- Fortschritt (XP / Streak) ----------
CREATE TABLE user_progress (
    user_id         UUID PRIMARY KEY REFERENCES app_user(id) ON DELETE CASCADE,
    xp              BIGINT NOT NULL DEFAULT 0,
    streak          INTEGER NOT NULL DEFAULT 0,
    last_active     DATE,
    aktualisiert_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
