package com.dialekto.domain;

/**
 * Lernstufe eines Ausdrucks. Numerisch persistiert (0..3) — kompatibel zum
 * Frontend (js/store/learning.js: STATUS_UNKNOWN..STATUS_LEARNED).
 */
public enum LernStatus {
    UNKNOWN(0),
    HARD(1),
    MEDIUM(2),
    LEARNED(3);

    private final int value;

    LernStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static LernStatus fromValue(int v) {
        for (LernStatus s : values()) {
            if (s.value == v) return s;
        }
        return UNKNOWN;
    }
}
