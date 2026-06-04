-- V2 · Schema-Optimierung: Kategorie-Lookup, Optimistic Locking, Datenintegrität.

-- Kategorie-Referenztabelle (wird vom DataSeeder vor den Ausdrücken befüllt).
CREATE TABLE kategorie (
    id    VARCHAR(64) PRIMARY KEY,
    label VARCHAR(128) NOT NULL
);

-- Fremdschlüssel ausdruck.kategorie → kategorie.id (referenzielle Integrität).
ALTER TABLE ausdruck
    ADD CONSTRAINT fk_ausdruck_kategorie
    FOREIGN KEY (kategorie) REFERENCES kategorie (id);

-- Optimistic Locking (von Hibernate @Version genutzt).
ALTER TABLE lernstand     ADD COLUMN version BIGINT NOT NULL DEFAULT 0;
ALTER TABLE favorit       ADD COLUMN version BIGINT NOT NULL DEFAULT 0;
ALTER TABLE user_progress ADD COLUMN version BIGINT NOT NULL DEFAULT 0;

-- Datenintegrität (CHECK-Constraints).
ALTER TABLE lernstand     ADD CONSTRAINT chk_lernstand_status   CHECK (status BETWEEN 0 AND 3);
ALTER TABLE lernstand     ADD CONSTRAINT chk_lernstand_ease     CHECK (ease > 0);
ALTER TABLE lernstand     ADD CONSTRAINT chk_lernstand_interval CHECK (intervall_tage >= 0);
ALTER TABLE lernstand     ADD CONSTRAINT chk_lernstand_wdh      CHECK (wiederholungen >= 0);
ALTER TABLE user_progress ADD CONSTRAINT chk_progress_xp        CHECK (xp >= 0);
ALTER TABLE user_progress ADD CONSTRAINT chk_progress_streak    CHECK (streak >= 0);

-- Zusätzlicher Index für Streak-/Aktivitäts-Auswertungen.
CREATE INDEX idx_progress_last_active ON user_progress (last_active);
