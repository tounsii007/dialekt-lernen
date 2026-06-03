package com.dialekto.web.dto;

import com.dialekto.domain.Favorit;
import java.time.Instant;

/** Read-DTO für einen Favoriten. */
public record FavoritDto(String ausdruckId, Instant createdAt) {
    public static FavoritDto from(Favorit f) {
        return new FavoritDto(f.getAusdruckId(), f.getCreatedAt());
    }
}
