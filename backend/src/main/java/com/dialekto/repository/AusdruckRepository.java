package com.dialekto.repository;

import com.dialekto.domain.Ausdruck;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AusdruckRepository extends JpaRepository<Ausdruck, String> {

    List<Ausdruck> findByDialektId(String dialektId);

    List<Ausdruck> findByKategorie(String kategorie);

    @Query("""
        SELECT a FROM Ausdruck a
        WHERE lower(a.ausdruck)    LIKE lower(concat('%', :q, '%'))
           OR lower(a.hochdeutsch) LIKE lower(concat('%', :q, '%'))
           OR lower(a.bedeutung)   LIKE lower(concat('%', :q, '%'))
        """)
    Page<Ausdruck> search(@Param("q") String q, Pageable pageable);
}
