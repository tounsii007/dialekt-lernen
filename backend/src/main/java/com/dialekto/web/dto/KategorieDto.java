package com.dialekto.web.dto;

import com.dialekto.domain.Kategorie;

/** Read-DTO für eine Kategorie. */
public record KategorieDto(String id, String label) {
    public static KategorieDto from(Kategorie k) {
        return new KategorieDto(k.getId(), k.getLabel());
    }
}
