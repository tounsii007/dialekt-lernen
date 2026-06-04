package com.dialekto.web;

import com.dialekto.service.DialektService;
import com.dialekto.web.dto.AusdruckDto;
import com.dialekto.web.dto.DialektDto;
import com.dialekto.web.dto.KategorieDto;
import com.dialekto.web.dto.PagedResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Read-API für Dialekte und Ausdrücke. */
@RestController
@RequestMapping("/api")
public class DialektController {

    private final DialektService service;

    public DialektController(DialektService service) {
        this.service = service;
    }

    @GetMapping("/dialekte")
    public List<DialektDto> dialekte() {
        return service.alleDialekte();
    }

    @GetMapping("/kategorien")
    public List<KategorieDto> kategorien() {
        return service.alleKategorien();
    }

    @GetMapping("/dialekte/{id}")
    public DialektDto dialekt(@PathVariable String id) {
        return service.dialekt(id);
    }

    @GetMapping("/dialekte/{id}/ausdruecke")
    public List<AusdruckDto> ausdrueckeVonDialekt(@PathVariable String id) {
        return service.ausdrueckeVonDialekt(id);
    }

    @GetMapping("/ausdruecke/{id}")
    public AusdruckDto ausdruck(@PathVariable String id) {
        return service.ausdruck(id);
    }

    @GetMapping("/ausdruecke/search")
    public PagedResponse<AusdruckDto> suche(
            @RequestParam(name = "q", defaultValue = "") String q,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "20") int size) {
        int safeSize = Math.min(Math.max(size, 1), 100);
        return PagedResponse.from(service.suche(q, PageRequest.of(Math.max(page, 0), safeSize)));
    }
}
