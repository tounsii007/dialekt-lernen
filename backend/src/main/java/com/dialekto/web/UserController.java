package com.dialekto.web;

import com.dialekto.domain.AppUser;
import com.dialekto.service.UserService;
import com.dialekto.web.dto.UserDtos.RegisterRequest;
import com.dialekto.web.dto.UserDtos.UserResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Registrierung/Anmeldung anonymer Nutzer via Geräte-ID. */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    /** Legt den Nutzer zur Geräte-ID an oder gibt den bestehenden zurück. */
    @PostMapping
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest req) {
        AppUser user = service.registriere(req.deviceId());
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.from(user));
    }
}
