package com.dialekto.seed;

import com.dialekto.domain.Ausdruck;
import com.dialekto.domain.Dialekt;
import com.dialekto.domain.Kategorie;
import com.dialekto.repository.AusdruckRepository;
import com.dialekto.repository.DialektRepository;
import com.dialekto.repository.KategorieRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Importiert die Dialekt-Stammdaten (24 Dialekte, ~6700 Ausdrücke) aus
 * seed/dialekte.json in die Datenbank — aber nur, wenn noch keine Daten
 * vorhanden sind. Die Web-Daten bleiben damit Single Source of Truth.
 */
@Component
@Profile("!test")  // im Test-Profil deaktiviert (kein Massen-Insert in der Test-DB)
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final DialektRepository dialektRepo;
    private final AusdruckRepository ausdruckRepo;
    private final KategorieRepository kategorieRepo;
    private final ObjectMapper objectMapper;

    public DataSeeder(DialektRepository dialektRepo, AusdruckRepository ausdruckRepo,
                      KategorieRepository kategorieRepo, ObjectMapper objectMapper) {
        this.dialektRepo = dialektRepo;
        this.ausdruckRepo = ausdruckRepo;
        this.kategorieRepo = kategorieRepo;
        this.objectMapper = objectMapper;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (dialektRepo.count() > 0) {
            log.info("Seed übersprungen — DB enthält bereits {} Dialekte.", dialektRepo.count());
            return;
        }
        JsonNode root;
        ClassPathResource resource = new ClassPathResource("seed/dialekte.json");
        if (!resource.exists()) {
            log.warn("seed/dialekte.json nicht gefunden — kein Import.");
            return;
        }
        try (InputStream in = resource.getInputStream()) {
            root = objectMapper.readTree(in);
        }

        List<Dialekt> dialekte = new ArrayList<>();
        List<Ausdruck> ausdruecke = new ArrayList<>();
        Set<String> ausdruckIds = new HashSet<>();
        Set<String> kategorien = new HashSet<>();
        int duplikate = 0;

        for (JsonNode d : root.path("dialekte")) {
            Dialekt dia = new Dialekt();
            dia.setId(text(d, "id"));
            dia.setName(text(d, "name"));
            dia.setRegion(text(d, "region"));
            dia.setBundesland(text(d, "bundesland"));
            dia.setFlag(text(d, "flag"));
            dia.setFarbe(text(d, "farbe"));
            dia.setBeschreibung(text(d, "beschreibung"));
            dia.setSprecher(text(d, "sprecher"));
            dia.setLang(text(d, "lang"));
            dialekte.add(dia);

            for (JsonNode a : d.path("ausdruecke")) {
                String id = text(a, "id");
                if (id == null || !ausdruckIds.add(id)) { duplikate++; continue; }
                Ausdruck ex = new Ausdruck();
                ex.setId(id);
                ex.setDialektId(dia.getId());
                ex.setAusdruck(text(a, "ausdruck"));
                ex.setHochdeutsch(text(a, "hochdeutsch"));
                ex.setBedeutung(text(a, "bedeutung"));
                ex.setBeispiel(text(a, "beispiel"));
                ex.setBeispielHd(text(a, "beispiel_hd"));
                String kat = text(a, "kategorie");
                ex.setKategorie(kat);
                if (kat != null && !kat.isBlank()) kategorien.add(kat);
                ausdruecke.add(ex);
            }
        }

        // Reihenfolge wegen FK: Kategorien → Dialekte → Ausdrücke.
        kategorieRepo.saveAll(kategorien.stream().map(k -> new Kategorie(k, label(k))).toList());
        dialektRepo.saveAll(dialekte);
        ausdruckRepo.saveAll(ausdruecke);
        log.info("Seed abgeschlossen: {} Kategorien, {} Dialekte, {} Ausdrücke ({} doppelte IDs übersprungen).",
            kategorien.size(), dialekte.size(), ausdruecke.size(), duplikate);
    }

    private static String text(JsonNode node, String field) {
        JsonNode v = node.get(field);
        return (v == null || v.isNull()) ? null : v.asText();
    }

    /** Erzeugt aus einem Kategorie-Schlüssel ("begruessung") ein Anzeige-Label. */
    private static String label(String key) {
        String s = key.replace('_', ' ').trim();
        return s.isEmpty() ? key : Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }
}
