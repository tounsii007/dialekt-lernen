package com.dialekto.repository;

import com.dialekto.domain.Favorit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface FavoritRepository extends JpaRepository<Favorit, Long> {
    List<Favorit> findByUserId(UUID userId);
    boolean existsByUserIdAndAusdruckId(UUID userId, String ausdruckId);
    long deleteByUserIdAndAusdruckId(UUID userId, String ausdruckId);
}
