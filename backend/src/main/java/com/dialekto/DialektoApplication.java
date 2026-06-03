package com.dialekto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Einstiegspunkt des Dialekto-Backends.
 *
 * REST-API + PostgreSQL-Persistenz für die Dialekto-Lern-App. Liefert die
 * Dialekt-/Ausdruck-Daten und persistiert den Nutzer-Lernstand (pro Geräte-ID).
 */
@SpringBootApplication
public class DialektoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DialektoApplication.class, args);
    }
}
