package com.dialekto.domain;

/**
 * Bewertung einer Karteikarte (UI/API: 1 = schwer, 2 = mittel, 3 = leicht).
 * Kapselt das SM-2-Mapping (Qualität 2/3/5) und den resultierenden Lernstatus.
 */
public enum Rating {
    HARD(1, 2),
    MEDIUM(2, 3),
    EASY(3, 5);

    private final int value;    // API-/UI-Wert
    private final int quality;  // SM-2-Qualität

    Rating(int value, int quality) {
        this.value = value;
        this.quality = quality;
    }

    public int getValue() {
        return value;
    }

    public int quality() {
        return quality;
    }

    public LernStatus resultingStatus() {
        return switch (this) {
            case HARD -> LernStatus.HARD;
            case MEDIUM -> LernStatus.MEDIUM;
            case EASY -> LernStatus.LEARNED;
        };
    }

    public static Rating fromValue(int v) {
        for (Rating r : values()) {
            if (r.value == v) return r;
        }
        throw new IllegalArgumentException("Ungültige Bewertung: " + v + " (erlaubt: 1..3)");
    }
}
