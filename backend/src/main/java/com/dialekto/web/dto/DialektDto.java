package com.dialekto.web.dto;

import com.dialekto.domain.Dialekt;

/** Read-DTO für einen Dialekt. */
public record DialektDto(
    String id,
    String name,
    String region,
    String bundesland,
    String flag,
    String farbe,
    String beschreibung,
    String sprecher,
    String lang
) {
    public static DialektDto from(Dialekt d) {
        return new DialektDto(d.getId(), d.getName(), d.getRegion(), d.getBundesland(),
            d.getFlag(), d.getFarbe(), d.getBeschreibung(), d.getSprecher(), d.getLang());
    }
}
