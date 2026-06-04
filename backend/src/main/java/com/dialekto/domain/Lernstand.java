package com.dialekto.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;
import java.util.UUID;

/** Lernstand eines Nutzers zu einem Ausdruck (SM-2-ähnliches SRS). */
@Entity
@Table(name = "lernstand", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "ausdruck_id"}))
public class Lernstand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "ausdruck_id", nullable = false, length = 64)
    private String ausdruckId;

    @Column(nullable = false)
    private LernStatus status = LernStatus.UNKNOWN;  // via LernStatusConverter als SMALLINT

    @Column(nullable = false)
    private double ease = 2.5;

    @Column(name = "intervall_tage", nullable = false)
    private int intervallTage = 0;

    @Column(name = "faelligkeit")
    private Instant faelligkeit;

    @Column(nullable = false)
    private int wiederholungen = 0;

    @Column(name = "aktualisiert_at", nullable = false)
    private Instant aktualisiertAt = Instant.now();

    protected Lernstand() { }

    public Lernstand(UUID userId, String ausdruckId) {
        this.userId = userId;
        this.ausdruckId = ausdruckId;
    }

    public Long getId() { return id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public String getAusdruckId() { return ausdruckId; }
    public void setAusdruckId(String ausdruckId) { this.ausdruckId = ausdruckId; }
    public LernStatus getStatus() { return status; }
    public void setStatus(LernStatus status) { this.status = status; }
    public double getEase() { return ease; }
    public void setEase(double ease) { this.ease = ease; }
    public int getIntervallTage() { return intervallTage; }
    public void setIntervallTage(int intervallTage) { this.intervallTage = intervallTage; }
    public Instant getFaelligkeit() { return faelligkeit; }
    public void setFaelligkeit(Instant faelligkeit) { this.faelligkeit = faelligkeit; }
    public int getWiederholungen() { return wiederholungen; }
    public void setWiederholungen(int wiederholungen) { this.wiederholungen = wiederholungen; }
    public Instant getAktualisiertAt() { return aktualisiertAt; }
    public void setAktualisiertAt(Instant aktualisiertAt) { this.aktualisiertAt = aktualisiertAt; }
}
