package com.dialekto.service;

import com.dialekto.domain.AppUser;
import com.dialekto.domain.UserProgress;
import com.dialekto.repository.AppUserRepository;
import com.dialekto.repository.UserProgressRepository;
import com.dialekto.web.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
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
    /**
     * Selbst-Referenz über den Spring-Proxy: nötig, damit der Aufruf von
     * {@link #legeNeuAn(String)} tatsächlich durch die Transaktions-Advice läuft
     * (REQUIRES_NEW) und nicht als Self-Invocation am Proxy vorbei.
     */
    private final UserService self;

    public UserService(AppUserRepository userRepo,
                       UserProgressRepository progressRepo,
                       @Lazy UserService self) {
        this.userRepo = userRepo;
        this.progressRepo = progressRepo;
        this.self = self;
    }

    /**
     * Findet den Nutzer zur Geräte-ID oder legt ihn (samt Fortschritts-Datensatz) neu an.
     *
     * <p>Upsert mit Schutz gegen die Race-Condition zweier paralleler Erst-Requests
     * mit derselben Geräte-ID: Das eigentliche Anlegen läuft in einer eigenen
     * Transaktion ({@code REQUIRES_NEW}). Verliert ein Request das Rennen, schlägt
     * dort der UNIQUE-Constraint auf {@code device_id} als
     * {@link DataIntegrityViolationException} fehl; nur diese innere Transaktion
     * wird zurückgerollt. Wir lesen den nun vom Gewinner angelegten Nutzer erneut
     * und liefern ihn zurück — der Client merkt vom Konflikt nichts.
     */
    @Transactional
    public AppUser registriere(String deviceId) {
        Optional<AppUser> existing = userRepo.findByDeviceId(deviceId);
        if (existing.isPresent()) {
            return markiereGesehen(existing.get());
        }
        try {
            return self.legeNeuAn(deviceId);
        } catch (DataIntegrityViolationException konflikt) {
            // Paralleler Request war schneller: existierenden Nutzer erneut lesen.
            AppUser u = userRepo.findByDeviceId(deviceId).orElseThrow(() -> konflikt);
            log.debug("Registrierungs-Race aufgelöst (Re-Read) für Gerät #{}",
                Integer.toHexString(deviceId.hashCode()));
            return markiereGesehen(u);
        }
    }

    /**
     * Legt Nutzer + Fortschritts-Datensatz in einer eigenen Transaktion an.
     * Bei UNIQUE-Konflikt auf {@code device_id} wird nur diese Transaktion
     * zurückgerollt (siehe {@link #registriere(String)}).
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public AppUser legeNeuAn(String deviceId) {
        AppUser u = userRepo.save(new AppUser(UUID.randomUUID(), deviceId));
        progressRepo.save(new UserProgress(u.getId()));
        // Geräte-ID nicht im Klartext loggen (Datenschutz) — nur ein kurzer Hash.
        log.info("Neuer Nutzer angelegt: {} (Gerät #{})", u.getId(),
            Integer.toHexString(deviceId.hashCode()));
        return u;
    }

    private AppUser markiereGesehen(AppUser u) {
        u.setLastSeenAt(Instant.now());
        log.debug("Bekannter Nutzer angemeldet: {}", u.getId());
        return u;
    }

    @Transactional(readOnly = true)
    public AppUser benoetige(UUID userId) {
        return userRepo.findById(userId)
            .orElseThrow(() -> new NotFoundException("Nutzer nicht gefunden: " + userId));
    }
}
