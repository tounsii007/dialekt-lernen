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

/** Favorisierter Ausdruck eines Nutzers. */
@Entity
@Table(name = "favorit", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "ausdruck_id"}))
public class Favorit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "ausdruck_id", nullable = false, length = 64)
    private String ausdruckId;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    protected Favorit() { }

    public Favorit(UUID userId, String ausdruckId) {
        this.userId = userId;
        this.ausdruckId = ausdruckId;
    }

    public Long getId() { return id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public String getAusdruckId() { return ausdruckId; }
    public void setAusdruckId(String ausdruckId) { this.ausdruckId = ausdruckId; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
