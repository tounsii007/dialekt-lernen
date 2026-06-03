package com.dialekto.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Ein Ausdruck/Begriff eines Dialekts (Stammdaten). */
@Entity
@Table(name = "ausdruck")
public class Ausdruck {

    @Id
    private String id;

    @Column(name = "dialekt_id", nullable = false)
    private String dialektId;

    @Column(columnDefinition = "text", nullable = false)
    private String ausdruck;

    @Column(columnDefinition = "text")
    private String hochdeutsch;

    @Column(columnDefinition = "text")
    private String bedeutung;

    @Column(columnDefinition = "text")
    private String beispiel;

    @Column(name = "beispiel_hd", columnDefinition = "text")
    private String beispielHd;

    private String kategorie;

    public Ausdruck() { }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getDialektId() { return dialektId; }
    public void setDialektId(String dialektId) { this.dialektId = dialektId; }
    public String getAusdruck() { return ausdruck; }
    public void setAusdruck(String ausdruck) { this.ausdruck = ausdruck; }
    public String getHochdeutsch() { return hochdeutsch; }
    public void setHochdeutsch(String hochdeutsch) { this.hochdeutsch = hochdeutsch; }
    public String getBedeutung() { return bedeutung; }
    public void setBedeutung(String bedeutung) { this.bedeutung = bedeutung; }
    public String getBeispiel() { return beispiel; }
    public void setBeispiel(String beispiel) { this.beispiel = beispiel; }
    public String getBeispielHd() { return beispielHd; }
    public void setBeispielHd(String beispielHd) { this.beispielHd = beispielHd; }
    public String getKategorie() { return kategorie; }
    public void setKategorie(String kategorie) { this.kategorie = kategorie; }
}
