package com.dialekto.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/** Gamification-Fortschritt eines Nutzers (XP, Streak). */
@Entity
@Table(name = "user_progress")
public class UserProgress {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Column(nullable = false)
    private long xp = 0;

    @Column(nullable = false)
    private int streak = 0;

    @Column(name = "last_active")
    private LocalDate lastActive;

    @UpdateTimestamp
    @Column(name = "aktualisiert_at", nullable = false)
    private Instant aktualisiertAt = Instant.now();

    @Version
    @Column(nullable = false)
    private long version;

    protected UserProgress() { }

    public UserProgress(UUID userId) {
        this.userId = userId;
    }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public long getXp() { return xp; }
    public void setXp(long xp) { this.xp = xp; }
    public int getStreak() { return streak; }
    public void setStreak(int streak) { this.streak = streak; }
    public LocalDate getLastActive() { return lastActive; }
    public void setLastActive(LocalDate lastActive) { this.lastActive = lastActive; }
    public Instant getAktualisiertAt() { return aktualisiertAt; }
    public void setAktualisiertAt(Instant aktualisiertAt) { this.aktualisiertAt = aktualisiertAt; }
}
