package com.dialekto.web.dto;

import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Stabiles JSON-Format für paginierte Antworten.
 *
 * <p>Spring serialisiert {@link Page}/{@code PageImpl} mit einer internen,
 * nicht stabilen Struktur (u.&nbsp;a. {@code pageable}, {@code sort}), vor der
 * Spring selbst warnt. Dieses Record bildet ausschließlich die von den Clients
 * (Web {@code js/util/api.js} → {@code Page}-Typedef, Mobile) tatsächlich
 * benötigten Felder ab und hält das Vertragsformat damit explizit und stabil.
 *
 * <p>Feldnamen und Semantik sind absichtlich identisch zu den gleichnamigen
 * {@link Page}-Eigenschaften, sodass keine Client-Anpassung nötig ist:
 * <ul>
 *   <li>{@code content}        – die Elemente der aktuellen Seite</li>
 *   <li>{@code totalElements}  – Gesamtanzahl über alle Seiten</li>
 *   <li>{@code totalPages}     – Gesamtanzahl der Seiten</li>
 *   <li>{@code number}         – Index der aktuellen Seite (0-basiert)</li>
 *   <li>{@code size}           – angeforderte Seitengröße</li>
 *   <li>{@code first}          – ob dies die erste Seite ist</li>
 *   <li>{@code last}           – ob dies die letzte Seite ist</li>
 * </ul>
 *
 * @param <T> Typ der Seitenelemente
 */
public record PagedResponse<T>(
    List<T> content,
    long totalElements,
    int totalPages,
    int number,
    int size,
    boolean first,
    boolean last
) {
    /** Übernimmt die vom Client genutzten Felder 1:1 aus einer Spring-{@link Page}. */
    public static <T> PagedResponse<T> from(Page<T> page) {
        return new PagedResponse<>(
            page.getContent(),
            page.getTotalElements(),
            page.getTotalPages(),
            page.getNumber(),
            page.getSize(),
            page.isFirst(),
            page.isLast()
        );
    }
}
