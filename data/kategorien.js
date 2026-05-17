// Zentrale Kategorien — können von allen Dialekten verwendet werden.
// Neue Kategorien einfach hier hinzufügen.
export const KATEGORIEN = {
  begruessung: { id: 'begruessung', label: 'Begrüßung & Abschied', icon: '👋' },
  alltag:      { id: 'alltag',      label: 'Alltag',              icon: '☀️' },
  essen:       { id: 'essen',       label: 'Essen & Trinken',      icon: '🥨' },
  menschen:    { id: 'menschen',    label: 'Menschen',             icon: '🧑' },
  gefuehle:    { id: 'gefuehle',    label: 'Gefühle & Ausrufe',    icon: '😄' },
  natur:       { id: 'natur',       label: 'Natur & Wetter',       icon: '🌳' },
  redensart:   { id: 'redensart',   label: 'Redensart',            icon: '💬' },
  schimpf:     { id: 'schimpf',     label: 'Schimpf & Spott',      icon: '😤' },
  zahlen:      { id: 'zahlen',      label: 'Zahlen & Zeit',        icon: '🕐' },
  orte:        { id: 'orte',        label: 'Orte & Gebäude',       icon: '🏛️' }
};

export const KATEGORIE_LIST = Object.values(KATEGORIEN);
