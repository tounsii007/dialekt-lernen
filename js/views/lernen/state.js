// Karteikarten-Modus · Session-State
// Held in a module-local variable so all sub-views share it without prop-drilling.

let session = null;

export function getSession() {
  return session;
}

export function setSession(next) {
  session = next;
}

export function clearSession() {
  session = null;
}
