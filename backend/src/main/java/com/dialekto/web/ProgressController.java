package com.dialekto.web;

import com.dialekto.service.ProgressService;
import com.dialekto.web.dto.ProgressDtos.ProgressResponse;
import com.dialekto.web.dto.ProgressDtos.ProgressUpdate;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/** XP/Streak-Fortschritt eines Nutzers. */
@RestController
@RequestMapping("/api/users/{userId}/progress")
public class ProgressController {

    private final ProgressService service;

    public ProgressController(ProgressService service) {
        this.service = service;
    }

    @GetMapping
    public ProgressResponse get(@PathVariable UUID userId) {
        return service.get(userId);
    }

    @PutMapping
    public ProgressResponse update(@PathVariable UUID userId, @Valid @RequestBody ProgressUpdate req) {
        return service.update(userId, req);
    }
}
