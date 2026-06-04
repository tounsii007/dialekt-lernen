package com.dialekto.web;

import org.springframework.http.HttpStatus;

/** Fachlicher 404 (Ressource nicht gefunden). */
public class NotFoundException extends ApiException {
    public NotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
