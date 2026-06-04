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

    /**
     * Volltextsuche über Ausdruck, Hochdeutsch und Bedeutung.
     *
     * <p>Der Suchbegriff fließt als LIKE-Pattern ein; die Wildcards {@code %}
     * und {@code _} (sowie der Escape-Char {@code \} selbst) im User-Input
     * werden zuvor escaped, damit sie literal und nicht als Platzhalter
     * wirken. Das {@code @Query} deklariert dazu eine {@code ESCAPE '\\'}-Klausel.
     * (Kein SQLi-Risiko — {@code :q} ist ein gebundener JPQL-Parameter; dies
     * korrigiert nur das Suchverhalten.)
     */
    default Page<Ausdruck> search(String q, Pageable pageable) {
        String escaped = (q == null ? "" : q)
            .replace("\\", "\\\\")
            .replace("%", "\\%")
            .replace("_", "\\_");
        return searchLike(escaped, pageable);
    }

    @Query("""
        SELECT a FROM Ausdruck a
        WHERE lower(a.ausdruck)    LIKE lower(concat('%', :q, '%')) ESCAPE '\\'
           OR lower(a.hochdeutsch) LIKE lower(concat('%', :q, '%')) ESCAPE '\\'
           OR lower(a.bedeutung)   LIKE lower(concat('%', :q, '%')) ESCAPE '\\'
        """)
    Page<Ausdruck> searchLike(@Param("q") String q, Pageable pageable);
}
