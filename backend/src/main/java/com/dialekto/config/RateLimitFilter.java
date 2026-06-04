package com.dialekto.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Einfaches In-Memory-Rate-Limiting pro Client-IP (Fixed-Window) für /api/**.
 * Schützt vor Brute-Force/Scraping ohne externe Abhängigkeit. Als Schlüssel
 * dient {@code request.getRemoteAddr()}: Bei aktivem
 * {@code server.forward-headers-strategy: framework} hat Spring die echte
 * Client-IP bereits aus X-Forwarded-* aufgelöst. Den Header selbst zu parsen
 * wäre angreifbar, da ein Client beliebige X-Forwarded-For-Werte mitschicken
 * und so das Limit unterlaufen könnte.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RateLimitFilter extends OncePerRequestFilter {

    private static final int  MAX_REQUESTS = 120;     // pro Fenster
    private static final long WINDOW_MS    = 60_000;  // 1 Minute
    private static final int  MAX_TRACKED_IPS = 50_000;

    private final Map<String, Window> buckets = new ConcurrentHashMap<>();

    private static final class Window {
        long start;
        int count;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        if (!req.getRequestURI().startsWith("/api/")) {
            chain.doFilter(req, res);
            return;
        }
        final long now = System.currentTimeMillis();
        if (buckets.size() > MAX_TRACKED_IPS) {
            buckets.entrySet().removeIf(e -> now - e.getValue().start >= WINDOW_MS);
        }
        final String ip = clientIp(req);
        final Window w = buckets.compute(ip, (k, cur) -> {
            if (cur == null || now - cur.start >= WINDOW_MS) {
                Window fresh = new Window();
                fresh.start = now;
                fresh.count = 1;
                return fresh;
            }
            cur.count++;
            return cur;
        });

        if (w.count > MAX_REQUESTS) {
            long retryAfter = (WINDOW_MS - (now - w.start)) / 1000 + 1;
            res.setStatus(429); // 429 Too Many Requests (nicht als Servlet-Konstante vorhanden)
            res.setHeader("Retry-After", String.valueOf(retryAfter));
            res.setContentType("application/json;charset=UTF-8");
            res.getWriter().write("{\"error\":\"Zu viele Anfragen — bitte später erneut versuchen.\"}");
            return;
        }
        chain.doFilter(req, res);
    }

    private static String clientIp(HttpServletRequest req) {
        // getRemoteAddr() liefert die von Spring (forward-headers-strategy=framework)
        // bereits aufgelöste echte Client-IP. Den X-Forwarded-For-Header hier selbst
        // zu parsen wäre spoofbar — ein Client könnte das Limit mit beliebigen Werten umgehen.
        return req.getRemoteAddr();
    }
}
