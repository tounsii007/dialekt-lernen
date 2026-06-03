package com.dialekto.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Ein Dialekt (Stammdaten, read-only per Seed gefüllt). */
@Entity
@Table(name = "dialekt")
public class Dialekt {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    private String region;
    private String bundesland;
    private String flag;
    private String farbe;

    @Column(columnDefinition = "text")
    private String beschreibung;

    private String sprecher;
    private String lang;

    public Dialekt() { }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getBundesland() { return bundesland; }
    public void setBundesland(String bundesland) { this.bundesland = bundesland; }
    public String getFlag() { return flag; }
    public void setFlag(String flag) { this.flag = flag; }
    public String getFarbe() { return farbe; }
    public void setFarbe(String farbe) { this.farbe = farbe; }
    public String getBeschreibung() { return beschreibung; }
    public void setBeschreibung(String beschreibung) { this.beschreibung = beschreibung; }
    public String getSprecher() { return sprecher; }
    public void setSprecher(String sprecher) { this.sprecher = sprecher; }
    public String getLang() { return lang; }
    public void setLang(String lang) { this.lang = lang; }
}
