package com.dialekto.web.dto;

import com.dialekto.domain.UserProgress;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.Instant;
import java.time.LocalDate;

/** Request/Response-DTOs für den Gamification-Fortschritt (XP/Streak). */
public final class ProgressDtos {
    private ProgressDtos() { }

    /** Read-DTO des Fortschritts. */
    public record ProgressResponse(long xp, int streak, LocalDate lastActive, Instant aktualisiertAt) {
        public static ProgressResponse from(UserProgress p) {
            return new ProgressResponse(p.getXp(), p.getStreak(), p.getLastActive(), p.getAktualisiertAt());
        }
    }

    /** Update-Request (absolute Werte vom Client). */
    public record ProgressUpdate(
        @PositiveOrZero long xp,
        @Min(0) int streak,
        LocalDate lastActive
    ) { }
}
