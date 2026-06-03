package com.dialekto.repository;

import com.dialekto.domain.Lernstand;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LernstandRepository extends JpaRepository<Lernstand, Long> {
    List<Lernstand> findByUserId(UUID userId);
    Optional<Lernstand> findByUserIdAndAusdruckId(UUID userId, String ausdruckId);
}
