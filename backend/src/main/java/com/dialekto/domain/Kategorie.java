package com.dialekto.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Lookup-Tabelle der Ausdruck-Kategorien (Normalisierung). */
@Entity
@Table(name = "kategorie")
public class Kategorie {

    @Id
    @Column(length = 64)
    private String id;

    @Column(nullable = false, length = 128)
    private String label;

    public Kategorie() { }

    public Kategorie(String id, String label) {
        this.id = id;
        this.label = label;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
}
