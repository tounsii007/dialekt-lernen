package com.dialekto.web;

import org.springframework.http.HttpStatus;

/** Fachlicher 400 (ungültige Eingabe jenseits der Bean-Validation). */
public class ValidationException extends ApiException {
    public ValidationException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
