package com.dialekto.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.stream.Collectors;

/**
 * Einheitliche, sichere Fehlerantworten (RFC-9457 ProblemDetail) mit Logging:
 *  - 4xx (Client) → WARN/DEBUG, kurze Meldung
 *  - 5xx (Server) → ERROR inkl. Stacktrace (nur im Log, nie in der Antwort)
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(NotFoundException.class)
    ProblemDetail handleNotFound(NotFoundException e, HttpServletRequest req) {
        log.warn("404 {} {} — {}", req.getMethod(), req.getRequestURI(), e.getMessage());
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    ProblemDetail handleNoResource(NoResourceFoundException e, HttpServletRequest req) {
        log.debug("404 (keine Ressource) {} {}", req.getMethod(), req.getRequestURI());
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, "Ressource nicht gefunden.");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ProblemDetail handleValidation(MethodArgumentNotValidException e, HttpServletRequest req) {
        String msg = e.getBindingResult().getFieldErrors().stream()
            .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
            .collect(Collectors.joining("; "));
        log.warn("400 Validierung {} {} — {}", req.getMethod(), req.getRequestURI(), msg);
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,
            msg.isBlank() ? "Ungültige Eingabe." : msg);
    }

    @ExceptionHandler({
        ConstraintViolationException.class,
        MethodArgumentTypeMismatchException.class,
        HttpMessageNotReadableException.class,
        IllegalArgumentException.class
    })
    ProblemDetail handleBadRequest(Exception e, HttpServletRequest req) {
        log.warn("400 {} {} — {}", req.getMethod(), req.getRequestURI(), e.getClass().getSimpleName());
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Ungültige Anfrage.");
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    ProblemDetail handleMethodNotAllowed(HttpRequestMethodNotSupportedException e, HttpServletRequest req) {
        log.warn("405 {} {} — Methode nicht erlaubt", req.getMethod(), req.getRequestURI());
        return ProblemDetail.forStatusAndDetail(HttpStatus.METHOD_NOT_ALLOWED, "Methode nicht erlaubt.");
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    ProblemDetail handleConflict(DataIntegrityViolationException e, HttpServletRequest req) {
        log.warn("409 Datenkonflikt {} {} — {}", req.getMethod(), req.getRequestURI(),
            e.getMostSpecificCause().getMessage());
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "Datenkonflikt.");
    }

    @ExceptionHandler(Exception.class)
    ProblemDetail handleGeneric(Exception e, HttpServletRequest req) {
        log.error("500 {} {} — unerwarteter Fehler", req.getMethod(), req.getRequestURI(), e);
        return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Interner Serverfehler.");
    }
}
