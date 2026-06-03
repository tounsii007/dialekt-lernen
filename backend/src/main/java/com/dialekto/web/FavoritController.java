package com.dialekto.web;

import com.dialekto.service.FavoritService;
import com.dialekto.web.dto.FavoritDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/** Favoriten eines Nutzers verwalten. */
@RestController
@RequestMapping("/api/users/{userId}/favoriten")
public class FavoritController {

    private final FavoritService service;

    public FavoritController(FavoritService service) {
        this.service = service;
    }

    @GetMapping
    public List<FavoritDto> liste(@PathVariable UUID userId) {
        return service.liste(userId);
    }

    @PutMapping("/{ausdruckId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void hinzufuegen(@PathVariable UUID userId, @PathVariable String ausdruckId) {
        service.hinzufuegen(userId, ausdruckId);
    }

    @DeleteMapping("/{ausdruckId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void entfernen(@PathVariable UUID userId, @PathVariable String ausdruckId) {
        service.entfernen(userId, ausdruckId);
    }
}
