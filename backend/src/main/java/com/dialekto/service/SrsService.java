package com.dialekto.service;

import com.dialekto.domain.Lernstand;
import com.dialekto.domain.Rating;
import com.dialekto.repository.AusdruckRepository;
import com.dialekto.repository.LernstandRepository;
import com.dialekto.web.NotFoundException;
import com.dialekto.web.ValidationException;
import com.dialekto.web.dto.LernstandDtos.LernstandDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

/**
 * Spaced-Repetition (SM-2), kompatibel zur Frontend-Logik (js/store/srs.js):
 * rating 1/2/3 (schwer/mittel/leicht) → quality 2/3/5, status 1/2/3.
 */
@Service
public class SrsService {

    private static final Logger log = LoggerFactory.getLogger(SrsService.class);

    private static final double INIT_EF = 2.5;
    private static final double MIN_EF = 1.3;

    private final LernstandRepository repo;
    private final AusdruckRepository ausdruckRepo;
    private final UserService userService;
    /** Selbst-Referenz über den Proxy, damit {@link #legeAnUndBewerte} mit REQUIRES_NEW greift. */
    private final SrsService self;

    public SrsService(LernstandRepository repo,
                      AusdruckRepository ausdruckRepo,
                      UserService userService,
                      @Lazy SrsService self) {
        this.repo = repo;
        this.ausdruckRepo = ausdruckRepo;
        this.userService = userService;
        this.self = self;
    }

    @Transactional(readOnly = true)
    public List<LernstandDto> liste(UUID userId) {
        userService.benoetige(userId);
        return repo.findByUserId(userId).stream().map(LernstandDto::from).toList();
    }

    @Transactional(readOnly = true)
    public List<LernstandDto> faellig(UUID userId, int limit) {
        userService.benoetige(userId);
        int safe = Math.min(Math.max(limit, 1), 200);
        return repo.findFaellig(userId, Instant.now(), PageRequest.of(0, safe))
            .stream().map(LernstandDto::from).toList();
    }

    /**
     * Bewertet eine Karte und schreibt den SM-2-Lernstand fort (Upsert).
     *
     * <p>Gibt es noch keinen Lernstand, wird er in einer eigenen Transaktion
     * ({@code REQUIRES_NEW}) angelegt. Laufen zwei Bewertungen desselben Paares
     * ({@code userId}, {@code ausdruckId}) parallel, verliert eine das Rennen am
     * UNIQUE-Constraint ({@link DataIntegrityViolationException}); nur deren innere
     * Transaktion rollt zurück. Wir lesen den nun existierenden Lernstand erneut
     * und wenden den SM-2-Schritt darauf an.
     */
    @Transactional
    public LernstandDto bewerten(UUID userId, String ausdruckId, int rating) {
        userService.benoetige(userId);
        if (!ausdruckRepo.existsById(ausdruckId)) {
            throw new NotFoundException("Ausdruck nicht gefunden: " + ausdruckId);
        }
        Rating r = parseRating(rating);

        return repo.findByUserIdAndAusdruckId(userId, ausdruckId)
            .map(ls -> bewerteUndSpeichere(ls, r))
            .orElseGet(() -> {
                try {
                    return self.legeAnUndBewerte(userId, ausdruckId, r);
                } catch (DataIntegrityViolationException konflikt) {
                    // Paralleler Request hat den Lernstand soeben angelegt: erneut lesen.
                    Lernstand ls = repo.findByUserIdAndAusdruckId(userId, ausdruckId)
                        .orElseThrow(() -> konflikt);
                    log.debug("SRS-Race aufgelöst (Re-Read): user={} ausdruck={}", userId, ausdruckId);
                    return bewerteUndSpeichere(ls, r);
                }
            });
    }

    /** Legt einen neuen Lernstand an und bewertet ihn — in eigener Transaktion (s. {@link #bewerten}). */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public LernstandDto legeAnUndBewerte(UUID userId, String ausdruckId, Rating r) {
        return bewerteUndSpeichere(new Lernstand(userId, ausdruckId), r);
    }

    private LernstandDto bewerteUndSpeichere(Lernstand ls, Rating r) {
        applySm2(ls, r);
        Lernstand saved = repo.save(ls);
        log.debug("SRS-Bewertung: user={} ausdruck={} rating={} -> status={} intervall={}d faellig={}",
            saved.getUserId(), saved.getAusdruckId(), r.getValue(),
            saved.getStatus(), saved.getIntervallTage(), saved.getFaelligkeit());
        return LernstandDto.from(saved);
    }

    /** Bewertung 1..3 in {@link Rating} übersetzen; ungültige Eingabe → fachlicher 400. */
    private Rating parseRating(int rating) {
        try {
            return Rating.fromValue(rating);
        } catch (IllegalArgumentException e) {
            // domain darf web nicht kennen: Rating wirft die JDK-Exception, hier mappen wir
            // sie auf eine fachliche ValidationException (sauberer 400 statt generischem Catch-all).
            throw new ValidationException("Ungültige Bewertung: " + rating + " (erlaubt: 1..3).");
        }
    }

    /** Wendet einen SM-2-Schritt auf den Lernstand an. */
    private void applySm2(Lernstand ls, Rating r) {
        int q = r.quality();
        double ef = ls.getEase() > 0 ? ls.getEase() : INIT_EF;
        int reps = ls.getWiederholungen();
        int interval = ls.getIntervallTage();

        if (q < 3) {
            reps = 0;
            interval = 1;
        } else {
            reps += 1;
            if (reps == 1) interval = 1;
            else if (reps == 2) interval = 6;
            else interval = Math.max(1, (int) Math.round(interval * ef));
        }

        ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
        if (ef < MIN_EF) ef = MIN_EF;

        ls.setEase(ef);
        ls.setWiederholungen(reps);
        ls.setIntervallTage(interval);
        ls.setStatus(r.resultingStatus());
        ls.setFaelligkeit(Instant.now().plus(interval, ChronoUnit.DAYS));
        ls.setAktualisiertAt(Instant.now());
    }
}
