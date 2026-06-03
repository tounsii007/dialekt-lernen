package com.dialekto.service;

import com.dialekto.repository.AusdruckRepository;
import com.dialekto.repository.DialektRepository;
import com.dialekto.web.NotFoundException;
import com.dialekto.web.dto.AusdruckDto;
import com.dialekto.web.dto.DialektDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/** Lesezugriff auf die Dialekt-Stammdaten. */
@Service
@Transactional(readOnly = true)
public class DialektService {

    private final DialektRepository dialektRepo;
    private final AusdruckRepository ausdruckRepo;

    public DialektService(DialektRepository dialektRepo, AusdruckRepository ausdruckRepo) {
        this.dialektRepo = dialektRepo;
        this.ausdruckRepo = ausdruckRepo;
    }

    public List<DialektDto> alleDialekte() {
        return dialektRepo.findAll().stream().map(DialektDto::from).toList();
    }

    public DialektDto dialekt(String id) {
        return dialektRepo.findById(id).map(DialektDto::from)
            .orElseThrow(() -> new NotFoundException("Dialekt nicht gefunden: " + id));
    }

    public List<AusdruckDto> ausdrueckeVonDialekt(String dialektId) {
        if (!dialektRepo.existsById(dialektId)) {
            throw new NotFoundException("Dialekt nicht gefunden: " + dialektId);
        }
        return ausdruckRepo.findByDialektId(dialektId).stream().map(AusdruckDto::from).toList();
    }

    public AusdruckDto ausdruck(String id) {
        return ausdruckRepo.findById(id).map(AusdruckDto::from)
            .orElseThrow(() -> new NotFoundException("Ausdruck nicht gefunden: " + id));
    }

    public Page<AusdruckDto> suche(String q, Pageable pageable) {
        return ausdruckRepo.search(q == null ? "" : q.trim(), pageable).map(AusdruckDto::from);
    }
}
