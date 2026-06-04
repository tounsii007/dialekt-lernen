package com.dialekto.service;

import com.dialekto.domain.UserProgress;
import com.dialekto.repository.UserProgressRepository;
import com.dialekto.web.dto.ProgressDtos.ProgressResponse;
import com.dialekto.web.dto.ProgressDtos.ProgressUpdate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/** Gamification-Fortschritt (XP/Streak) eines Nutzers. */
@Service
public class ProgressService {

    private static final Logger log = LoggerFactory.getLogger(ProgressService.class);

    private final UserProgressRepository repo;
    private final UserService userService;

    public ProgressService(UserProgressRepository repo, UserService userService) {
        this.repo = repo;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public ProgressResponse get(UUID userId) {
        userService.benoetige(userId);
        UserProgress p = repo.findById(userId).orElseGet(() -> new UserProgress(userId));
        return ProgressResponse.from(p);
    }

    /**
     * Übernimmt den Client-Stand. XP wird per max() zusammengeführt (monoton,
     * verhindert Rückschritt bei mehreren Geräten); Streak/lastActive werden
     * übernommen, wenn der Client einen jüngeren oder höheren Stand meldet.
     */
    @Transactional
    public ProgressResponse update(UUID userId, ProgressUpdate req) {
        userService.benoetige(userId);
        UserProgress p = repo.findById(userId).orElseGet(() -> new UserProgress(userId));

        p.setXp(Math.max(p.getXp(), req.xp()));

        boolean clientNewer = p.getLastActive() == null
            || (req.lastActive() != null && !req.lastActive().isBefore(p.getLastActive()));
        if (clientNewer) {
            p.setStreak(req.streak());
            p.setLastActive(req.lastActive());
        } else {
            p.setStreak(Math.max(p.getStreak(), req.streak()));
        }

        ProgressResponse out = ProgressResponse.from(repo.save(p));
        log.debug("Progress aktualisiert: user={} xp={} streak={}", userId, out.xp(), out.streak());
        return out;
    }
}
