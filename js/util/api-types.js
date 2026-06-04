// Zentrale Typdefinitionen (JSDoc) für die Backend-API + passende Enums.
// Die @typedef-Blöcke sind reine Typ-/IDE-Dokumentation; zur Laufzeit werden
// nur die eingefrorenen Enum-Objekte exportiert (spiegeln die Backend-Enums).

/**
 * @typedef {Object} Dialekt
 * @property {string} id
 * @property {string} name
 * @property {string} region
 * @property {string} bundesland
 * @property {string} flag
 * @property {string} farbe
 * @property {string} beschreibung
 * @property {string} sprecher
 * @property {string} lang
 */

/**
 * @typedef {Object} Ausdruck
 * @property {string} id
 * @property {string} dialektId
 * @property {string} ausdruck
 * @property {string} hochdeutsch
 * @property {string} bedeutung
 * @property {string} beispiel
 * @property {string} beispielHd
 * @property {string} kategorie
 */

/**
 * @typedef {Object} Kategorie
 * @property {string} id
 * @property {string} label
 */

/**
 * @typedef {Object} ApiUser
 * @property {string} id
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Favorit
 * @property {string} ausdruckId
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Lernstand
 * @property {string} ausdruckId
 * @property {0|1|2|3} status            Lernstatus (siehe LernStatus)
 * @property {number} ease               SM-2-Ease-Faktor
 * @property {number} intervallTage
 * @property {?string} faelligkeit       ISO-Zeitstempel oder null
 * @property {number} wiederholungen
 * @property {string} aktualisiertAt
 */

/**
 * @typedef {Object} Page
 * @property {Array<*>} content
 * @property {number} totalElements
 * @property {number} number
 * @property {number} size
 */

/** Bewertungsstufen (UI/API), identisch zu js/store/srs.js und Backend-Enum Rating. @enum {number} */
export const Rating = Object.freeze({ HARD: 1, MEDIUM: 2, EASY: 3 });

/** Lernstatus-Stufen, identisch zu js/store/learning.js und Backend-Enum LernStatus. @enum {number} */
export const LernStatus = Object.freeze({ UNKNOWN: 0, HARD: 1, MEDIUM: 2, LEARNED: 3 });
