package com.dialekto.service;

import com.dialekto.domain.AppUser;
import com.dialekto.domain.UserProgress;
import com.dialekto.repository.AppUserRepository;
import com.dialekto.repository.UserProgressRepository;
import com.dialekto.web.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

/** Verwaltet anonyme Nutzer (Geräte-ID). Login folgt in einer späteren Iteration. */
@Service
public class UserService {

    private final AppUserRepository userRepo;
    private final UserProgressRepository progressRepo;

    public UserService(AppUserRepository userRepo, UserProgressRepository progressRepo) {
        this.userRepo = userRepo;
        this.progressRepo = progressRepo;
    }

    /** Findet den Nutzer zur Geräte-ID oder legt ihn (samt Fortschritts-Datensatz) neu an. */
    @Transactional
    public AppUser registriere(String deviceId) {
        return userRepo.findByDeviceId(deviceId)
            .map(u -> {
                u.setLastSeenAt(Instant.now());
                return u;
            })
            .orElseGet(() -> {
                AppUser u = userRepo.save(new AppUser(UUID.randomUUID(), deviceId));
                progressRepo.save(new UserProgress(u.getId()));
                return u;
            });
    }

    @Transactional(readOnly = true)
    public AppUser benoetige(UUID userId) {
        return userRepo.findById(userId)
            .orElseThrow(() -> new NotFoundException("Nutzer nicht gefunden: " + userId));
    }
}
