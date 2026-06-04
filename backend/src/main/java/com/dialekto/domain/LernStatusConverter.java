package com.dialekto.domain;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * Mappt {@link LernStatus} ↔ numerische DB-Spalte (SMALLINT 0..3).
 * autoApply = true → gilt automatisch für alle LernStatus-Felder.
 */
@Converter(autoApply = true)
public class LernStatusConverter implements AttributeConverter<LernStatus, Short> {

    @Override
    public Short convertToDatabaseColumn(LernStatus status) {
        return (short) (status == null ? LernStatus.UNKNOWN : status).getValue();
    }

    @Override
    public LernStatus convertToEntityAttribute(Short dbValue) {
        return LernStatus.fromValue(dbValue == null ? 0 : dbValue);
    }
}
