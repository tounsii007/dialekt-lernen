package com.dialekto.web;

import com.dialekto.service.SrsService;
import com.dialekto.web.dto.LernstandDtos.BewertenRequest;
import com.dialekto.web.dto.LernstandDtos.LernstandDto;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/** Lernstand / Spaced-Repetition eines Nutzers. */
@RestController
@RequestMapping("/api/users/{userId}/lernstand")
public class LernstandController {

    private final SrsService service;

    public LernstandController(SrsService service) {
        this.service = service;
    }

    @GetMapping
    public List<LernstandDto> liste(@PathVariable UUID userId) {
        return service.liste(userId);
    }

    @GetMapping("/faellig")
    public List<LernstandDto> faellig(@PathVariable UUID userId,
                                      @RequestParam(name = "limit", defaultValue = "50") int limit) {
        return service.faellig(userId, limit);
    }

    @PostMapping("/{ausdruckId}/bewerten")
    public LernstandDto bewerten(@PathVariable UUID userId,
                                 @PathVariable String ausdruckId,
                                 @Valid @RequestBody BewertenRequest req) {
        return service.bewerten(userId, ausdruckId, req.rating());
    }
}
