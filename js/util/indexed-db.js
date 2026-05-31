// Schlanker Promise-Wrapper um IndexedDB.
//
// Verwendet in Dialekto:
//   - Database: 'dialekto-data'
//   - Stores:   'notes', 'audio' (audio wird später befüllt)
//
// Wenn IndexedDB nicht verfügbar ist (Node-Tests, alte Browser, Privacy-Modi),
// liefern alle Methoden `null` zurück bzw. werfen einen erkennbaren Fehler —
// Caller müssen einen Fallback haben (z.B. localStorage).

export const DB_NAME = 'dialekto-data';
export const DB_VERSION = 1;
export const STORE_NOTES = 'notes';
export const STORE_AUDIO = 'audio';

function getIDB() {
  try {
    if (typeof indexedDB !== 'undefined') return indexedDB;
    if (typeof globalThis !== 'undefined' && globalThis.indexedDB) return globalThis.indexedDB;
  } catch {}
  return null;
}

export function isSupported() {
  return getIDB() != null;
}

const openCache = new Map(); // name+version → Promise<IDBDatabase>

/**
 * Öffnet (oder erstellt) eine Datenbank.
 * @param {string} name
 * @param {number} version
 * @param {(db: IDBDatabase, oldVersion: number, newVersion: number) => void} upgrade
 * @returns {Promise<IDBDatabase|null>}
 */
export function open(name = DB_NAME, version = DB_VERSION, upgrade) {
  const idb = getIDB();
  if (!idb) return Promise.resolve(null);
  const cacheKey = `${name}@${version}`;
  if (openCache.has(cacheKey)) return openCache.get(cacheKey);

  const p = new Promise((resolve, reject) => {
    let req;
    try {
      req = idb.open(name, version);
    } catch (err) {
      reject(err);
      return;
    }
    req.onupgradeneeded = (e) => {
      const db = req.result;
      try {
        if (typeof upgrade === 'function') {
          upgrade(db, e.oldVersion || 0, e.newVersion || version);
        } else {
          // Default-Schema: lege die Standard-Stores an, falls sie fehlen.
          if (!db.objectStoreNames.contains(STORE_NOTES)) {
            db.createObjectStore(STORE_NOTES);
          }
          if (!db.objectStoreNames.contains(STORE_AUDIO)) {
            db.createObjectStore(STORE_AUDIO);
          }
        }
      } catch (err) {
        reject(err);
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      // Gecachte Verbindung freigeben, wenn sie geschlossen wird (anderer Tab
      // triggert ein Upgrade → versionchange, oder Browser schließt bei
      // Speicherdruck). Sonst bleibt ein geschlossenes db-Objekt im Cache und
      // ein späterer tx()-Aufruf wirft InvalidStateError statt des Fallbacks.
      db.onversionchange = () => { try { db.close(); } catch {} openCache.delete(cacheKey); };
      db.onclose = () => { openCache.delete(cacheKey); };
      resolve(db);
    };
    req.onerror = () => reject(req.error || new Error('IDB open failed'));
    req.onblocked = () => reject(new Error('IDB open blocked'));
  });

  openCache.set(cacheKey, p);
  // Bei Fehler aus Cache entfernen, damit ein Retry möglich ist.
  p.catch(() => openCache.delete(cacheKey));
  return p;
}

function tx(db, store, mode) {
  return db.transaction(store, mode).objectStore(store);
}

function reqToPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IDB request failed'));
  });
}

/**
 * Schreibt (oder überschreibt) einen Wert unter dem gegebenen Schlüssel.
 */
export async function put(store, value, key) {
  const db = await open();
  if (!db) return null;
  const os = tx(db, store, 'readwrite');
  return reqToPromise(os.put(value, key));
}

/**
 * Liest einen Wert oder undefined.
 */
export async function get(store, key) {
  const db = await open();
  if (!db) return null;
  const os = tx(db, store, 'readonly');
  return reqToPromise(os.get(key));
}

/**
 * Liefert alle Werte im Store als Array.
 */
export async function getAll(store) {
  const db = await open();
  if (!db) return [];
  const os = tx(db, store, 'readonly');
  return reqToPromise(os.getAll());
}

/**
 * Liefert alle Schlüssel im Store.
 */
export async function getAllKeys(store) {
  const db = await open();
  if (!db) return [];
  const os = tx(db, store, 'readonly');
  return reqToPromise(os.getAllKeys());
}

/**
 * Löscht einen Eintrag.
 */
export async function del(store, key) {
  const db = await open();
  if (!db) return null;
  const os = tx(db, store, 'readwrite');
  return reqToPromise(os.delete(key));
}

// Alias für Konsistenz mit der Spec (delete ist reserviertes Wort).
export { del as delete_ };
