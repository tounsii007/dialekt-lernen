package com.dialekto;

import com.dialekto.domain.AppUser;
import com.dialekto.service.FavoritService;
import com.dialekto.service.UserService;
import com.dialekto.domain.Ausdruck;
import com.dialekto.domain.Dialekt;
import com.dialekto.repository.AusdruckRepository;
import com.dialekto.repository.DialektRepository;
import com.dialekto.web.dto.FavoritDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Lädt den vollen Spring-Context (verifiziert Entities, Repositories, Services,
 * Controller, JPA-Mappings) gegen eine In-Memory-H2 und prüft den Favoriten-
 * Fluss end-to-end über die Service-Schicht.
 */
@SpringBootTest
@ActiveProfiles("test")
class DialektoApplicationTests {

    @Autowired DialektRepository dialektRepo;
    @Autowired AusdruckRepository ausdruckRepo;
    @Autowired UserService userService;
    @Autowired FavoritService favoritService;

    @Test
    void contextLoads() {
        assertThat(dialektRepo).isNotNull();
    }

    @Test
    void favoritenFlowFunktioniert() {
        // Stammdaten anlegen
        Dialekt d = new Dialekt();
        d.setId("testdialekt");
        d.setName("Testdialekt");
        dialektRepo.save(d);

        Ausdruck a = new Ausdruck();
        a.setId("t-001");
        a.setDialektId("testdialekt");
        a.setAusdruck("Testwort");
        ausdruckRepo.save(a);

        // Nutzer registrieren (Geräte-ID)
        AppUser user = userService.registriere("geraet-abc");
        assertThat(user.getId()).isNotNull();

        // Favorit hinzufügen + idempotent
        favoritService.hinzufuegen(user.getId(), "t-001");
        favoritService.hinzufuegen(user.getId(), "t-001");
        List<FavoritDto> favs = favoritService.liste(user.getId());
        assertThat(favs).hasSize(1);
        assertThat(favs.get(0).ausdruckId()).isEqualTo("t-001");

        // Favorit entfernen
        favoritService.entfernen(user.getId(), "t-001");
        assertThat(favoritService.liste(user.getId())).isEmpty();
    }
}
