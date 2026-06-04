package com.dialekto.web;

import org.springframework.http.HttpStatus;

/** Fachlicher 409 (Konflikt, z. B. doppelte/inkonsistente Daten). */
public class ConflictException extends ApiException {
    public ConflictException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
