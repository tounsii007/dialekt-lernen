package com.dialekto.web.dto;

import com.dialekto.domain.Ausdruck;

/** Read-DTO für einen Ausdruck. */
public record AusdruckDto(
    String id,
    String dialektId,
    String ausdruck,
    String hochdeutsch,
    String bedeutung,
    String beispiel,
    String beispielHd,
    String kategorie
) {
    public static AusdruckDto from(Ausdruck a) {
        return new AusdruckDto(a.getId(), a.getDialektId(), a.getAusdruck(), a.getHochdeutsch(),
            a.getBedeutung(), a.getBeispiel(), a.getBeispielHd(), a.getKategorie());
    }
}
