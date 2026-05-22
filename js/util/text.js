// Textnormalisierung für diakritisch tolerantes Suchen.

const DIACRITICS_REGEX = /[̀-ͯ]/g;

export function normalize(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS_REGEX, '')
    .replace(/ß/g, 'ss');
}
