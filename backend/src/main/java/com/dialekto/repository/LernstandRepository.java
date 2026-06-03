package com.dialekto.repository;

import com.dialekto.domain.Lernstand;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LernstandRepository extends JpaRepository<Lernstand, Long> {
    List<Lernstand> findByUserId(UUID userId);
    Optional<Lernstand> findByUserIdAndAusdruckId(UUID userId, String ausdruckId);

    /** Fällige Karten (Fälligkeit erreicht oder noch nie terminiert), älteste zuerst. */
    @Query("""
        SELECT l FROM Lernstand l
        WHERE l.userId = :userId AND (l.faelligkeit IS NULL OR l.faelligkeit <= :jetzt)
        ORDER BY l.faelligkeit ASC NULLS FIRST
        """)
    List<Lernstand> findFaellig(@Param("userId") UUID userId, @Param("jetzt") Instant jetzt, Pageable pageable);
}
