package com.dialekto.service;

import com.dialekto.domain.Favorit;
import com.dialekto.repository.AusdruckRepository;
import com.dialekto.repository.FavoritRepository;
import com.dialekto.web.NotFoundException;
import com.dialekto.web.dto.FavoritDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/** Favoriten eines Nutzers. */
@Service
public class FavoritService {

    private final FavoritRepository favoritRepo;
    private final AusdruckRepository ausdruckRepo;
    private final UserService userService;

    public FavoritService(FavoritRepository favoritRepo, AusdruckRepository ausdruckRepo, UserService userService) {
        this.favoritRepo = favoritRepo;
        this.ausdruckRepo = ausdruckRepo;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public List<FavoritDto> liste(UUID userId) {
        userService.benoetige(userId);
        return favoritRepo.findByUserId(userId).stream().map(FavoritDto::from).toList();
    }

    @Transactional
    public void hinzufuegen(UUID userId, String ausdruckId) {
        userService.benoetige(userId);
        if (!ausdruckRepo.existsById(ausdruckId)) {
            throw new NotFoundException("Ausdruck nicht gefunden: " + ausdruckId);
        }
        if (!favoritRepo.existsByUserIdAndAusdruckId(userId, ausdruckId)) {
            favoritRepo.save(new Favorit(userId, ausdruckId));
        }
    }

    @Transactional
    public void entfernen(UUID userId, String ausdruckId) {
        userService.benoetige(userId);
        favoritRepo.deleteByUserIdAndAusdruckId(userId, ausdruckId);
    }
}
