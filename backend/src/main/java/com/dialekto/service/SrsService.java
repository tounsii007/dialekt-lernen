package com.dialekto.service;

import com.dialekto.domain.Lernstand;
import com.dialekto.repository.AusdruckRepository;
import com.dialekto.repository.LernstandRepository;
import com.dialekto.web.NotFoundException;
import com.dialekto.web.dto.LernstandDtos.LernstandDto;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
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

    private static final double INIT_EF = 2.5;
    private static final double MIN_EF = 1.3;

    private final LernstandRepository repo;
    private final AusdruckRepository ausdruckRepo;
    private final UserService userService;

    public SrsService(LernstandRepository repo, AusdruckRepository ausdruckRepo, UserService userService) {
        this.repo = repo;
        this.ausdruckRepo = ausdruckRepo;
        this.userService = userService;
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

    @Transactional
    public LernstandDto bewerten(UUID userId, String ausdruckId, int rating) {
        userService.benoetige(userId);
        if (!ausdruckRepo.existsById(ausdruckId)) {
            throw new NotFoundException("Ausdruck nicht gefunden: " + ausdruckId);
        }
        Lernstand ls = repo.findByUserIdAndAusdruckId(userId, ausdruckId)
            .orElseGet(() -> new Lernstand(userId, ausdruckId));
        applySm2(ls, rating);
        return LernstandDto.from(repo.save(ls));
    }

    /** Wendet einen SM-2-Schritt auf den Lernstand an. */
    private void applySm2(Lernstand ls, int rating) {
        int q = quality(rating);
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
        ls.setStatus((short) stand(rating));
        ls.setFaelligkeit(Instant.now().plus(interval, ChronoUnit.DAYS));
        ls.setAktualisiertAt(Instant.now());
    }

    private int quality(int rating) {
        return rating >= 3 ? 5 : (rating == 2 ? 3 : 2);
    }

    private int stand(int rating) {
        return rating >= 3 ? 3 : (rating == 2 ? 2 : 1);
    }
}
