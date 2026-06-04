package com.dialekto.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Protokolliert jede API-Anfrage mit Methode, Pfad, Status-Code und Dauer.
 * Status &lt; 400 → DEBUG (erfolgreiche Antworten nicht im Normalbetrieb fluten),
 * 4xx → WARN, 5xx → ERROR. Läuft direkt nach dem Rate-Limit-Filter.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 10)
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        if (!req.getRequestURI().startsWith("/api/")) {
            chain.doFilter(req, res);
            return;
        }
        final long start = System.nanoTime();
        try {
            chain.doFilter(req, res);
        } finally {
            final long ms = (System.nanoTime() - start) / 1_000_000;
            final int status = res.getStatus();
            final String method = req.getMethod();
            final String uri = req.getRequestURI();
            if (status >= 500) {
                log.error("{} {} -> {} ({} ms)", method, uri, status, ms);
            } else if (status >= 400) {
                log.warn("{} {} -> {} ({} ms)", method, uri, status, ms);
            } else {
                log.debug("{} {} -> {} ({} ms)", method, uri, status, ms);
            }
        }
    }
}
