package com.dialekto.web.dto;

import com.dialekto.domain.AppUser;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.UUID;

/** Request/Response-DTOs rund um den (anonymen) Nutzer. */
public final class UserDtos {
    private UserDtos() { }

    /** Registrierungs-/Anmelde-Request via Geräte-ID. */
    public record RegisterRequest(
        @NotBlank @Size(max = 128) String deviceId
    ) { }

    /** Nutzer-Antwort. */
    public record UserResponse(UUID id, String deviceId, Instant createdAt) {
        public static UserResponse from(AppUser u) {
            return new UserResponse(u.getId(), u.getDeviceId(), u.getCreatedAt());
        }
    }
}
