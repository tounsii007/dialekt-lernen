package com.dialekto.repository;

import com.dialekto.domain.Kategorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KategorieRepository extends JpaRepository<Kategorie, String> {
}
