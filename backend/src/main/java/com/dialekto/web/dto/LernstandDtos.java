package com.dialekto.web.dto;

import com.dialekto.domain.Lernstand;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.time.Instant;

/** Request/Response-DTOs für den Lernstand (SRS). */
public final class LernstandDtos {
    private LernstandDtos() { }

    /** Read-DTO eines Lernstands. */
    public record LernstandDto(
        String ausdruckId,
        short status,
        double ease,
        int intervallTage,
        Instant faelligkeit,
        int wiederholungen,
        Instant aktualisiertAt
    ) {
        public static LernstandDto from(Lernstand l) {
            return new LernstandDto(l.getAusdruckId(), l.getStatus(), l.getEase(),
                l.getIntervallTage(), l.getFaelligkeit(), l.getWiederholungen(), l.getAktualisiertAt());
        }
    }

    /** Bewertung einer Karte: 1 = schwer, 2 = mittel, 3 = leicht (wie im Frontend). */
    public record BewertenRequest(@Min(1) @Max(3) int rating) { }
}
