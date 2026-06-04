package com.dialekto.service;

import com.dialekto.domain.AppUser;
import com.dialekto.domain.UserProgress;
import com.dialekto.repository.AppUserRepository;
import com.dialekto.repository.UserProgressRepository;
import com.dialekto.web.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

/** Verwaltet anonyme Nutzer (Geräte-ID). Login folgt in einer späteren Iteration. */
@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final AppUserRepository userRepo;
    private final UserProgressRepository progressRepo;

    public UserService(AppUserRepository userRepo, UserProgressRepository progressRepo) {
        this.userRepo = userRepo;
        this.progressRepo = progressRepo;
    }

    /** Findet den Nutzer zur Geräte-ID oder legt ihn (samt Fortschritts-Datensatz) neu an. */
    @Transactional
    public AppUser registriere(String deviceId) {
        Optional<AppUser> existing = userRepo.findByDeviceId(deviceId);
        if (existing.isPresent()) {
            AppUser u = existing.get();
            u.setLastSeenAt(Instant.now());
            log.debug("Bekannter Nutzer angemeldet: {}", u.getId());
            return u;
        }
        AppUser u = userRepo.save(new AppUser(UUID.randomUUID(), deviceId));
        progressRepo.save(new UserProgress(u.getId()));
        // Geräte-ID nicht im Klartext loggen (Datenschutz) — nur ein kurzer Hash.
        log.info("Neuer Nutzer angelegt: {} (Gerät #{})", u.getId(),
            Integer.toHexString(deviceId.hashCode()));
        return u;
    }

    @Transactional(readOnly = true)
    public AppUser benoetige(UUID userId) {
        return userRepo.findById(userId)
            .orElseThrow(() -> new NotFoundException("Nutzer nicht gefunden: " + userId));
    }
}
