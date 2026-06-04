package com.dialekto.web;

import org.springframework.http.HttpStatus;

/** Basis für fachliche Fehler mit zugeordnetem HTTP-Status. */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
