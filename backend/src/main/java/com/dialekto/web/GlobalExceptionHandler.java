package com.dialekto.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
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

    @ExceptionHandler(ApiException.class)
    ProblemDetail handleApi(ApiException e, HttpServletRequest req) {
        HttpStatus status = e.getStatus();
        if (status.is5xxServerError()) {
            log.error("{} {} {} — {}", status.value(), req.getMethod(), req.getRequestURI(), e.getMessage());
        } else {
            log.warn("{} {} {} — {}", status.value(), req.getMethod(), req.getRequestURI(), e.getMessage());
        }
        return ProblemDetail.forStatusAndDetail(status, e.getMessage());
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

    /**
     * Letzte Verteidigungslinie für DB-Integritätsverletzungen. Die erwarteten
     * UNIQUE-Races (Nutzer-Registrierung, Lernstand-Upsert) lösen die Services
     * bereits transparent per Re-Read auf; erreicht eine Verletzung dennoch den
     * Handler, ist 409 die korrekte Antwort (keine internen Details preisgeben).
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    ProblemDetail handleConflict(DataIntegrityViolationException e, HttpServletRequest req) {
        log.warn("409 Datenkonflikt {} {} — {}", req.getMethod(), req.getRequestURI(),
            e.getMostSpecificCause().getMessage());
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "Datenkonflikt.");
    }

    @ExceptionHandler(OptimisticLockingFailureException.class)
    ProblemDetail handleOptimisticLock(OptimisticLockingFailureException e, HttpServletRequest req) {
        log.warn("409 {} {} — gleichzeitige Änderung", req.getMethod(), req.getRequestURI());
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT,
            "Daten wurden zwischenzeitlich geändert — bitte erneut versuchen.");
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    ProblemDetail handleMissingParam(MissingServletRequestParameterException e, HttpServletRequest req) {
        log.warn("400 {} {} — fehlender Parameter '{}'", req.getMethod(), req.getRequestURI(), e.getParameterName());
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Fehlender Parameter: " + e.getParameterName());
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    ProblemDetail handleMediaType(HttpMediaTypeNotSupportedException e, HttpServletRequest req) {
        log.warn("415 {} {} — Medientyp nicht unterstützt", req.getMethod(), req.getRequestURI());
        return ProblemDetail.forStatusAndDetail(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Medientyp nicht unterstützt.");
    }

    @ExceptionHandler(AccessDeniedException.class)
    ProblemDetail handleAccessDenied(AccessDeniedException e, HttpServletRequest req) {
        log.warn("403 {} {} — Zugriff verweigert", req.getMethod(), req.getRequestURI());
        return ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, "Zugriff verweigert.");
    }

    @ExceptionHandler(Exception.class)
    ProblemDetail handleGeneric(Exception e, HttpServletRequest req) {
        log.error("500 {} {} — unerwarteter Fehler", req.getMethod(), req.getRequestURI(), e);
        return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Interner Serverfehler.");
    }
}
