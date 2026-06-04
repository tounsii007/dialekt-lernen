// Startseite · „Wusstest du?" — kurze, allgemein anerkannte Fakten rund um die
// Dialekte. Pro Render einer zufällig, damit die Startseite auch inhaltlich
// abwechselt.

import { el } from '../../util.js';

const DIALEKT_FAKTEN = [
  '„Moin" begrüßt im Norden rund um die Uhr — nicht nur morgens.',
  'Plattdeutsch gilt als eigenständige Regionalsprache, nicht bloß als Dialekt.',
  'Im Schwäbischen wird gern verkleinert: aus „Haus" wird „Häusle", aus „Spatzen" „Spätzle".',
  '„Servus" geht auf das lateinische „servus" (Diener) zurück — als höfliche Grußformel.',
  'Das Berlinische macht aus „ich" gern „icke" und aus „das" ein „det".',
  'Im Kölschen heißt es „et" statt „es" — und „Kölle Alaaf!" ist der Karnevalsruf schlechthin.',
  'Schweizerdeutsch kennt kein „ß" — geschrieben wird stets „ss".',
  'Der Wiener „Schmäh" beschreibt einen ganzen Humor-Stil, nicht nur einen einzelnen Witz.',
  '„Grüezi" ist die Schweizer Begrüßung — verkürzt aus „Gott grüez i".',
  'Im Ruhrgebiet verschmelzen Wörter gern: aus „auf dem" wird „aufm", aus „in das" „inne".',
  'Das hessische „Ei" am Satzanfang ist eine Verstärkung — „Ei guude!" heißt einfach „Hallo!".',
  'Im Fränkischen klingen „b/p" und „d/t" fast gleich: „Bassd scho" für „Passt schon".',
  'Im Alemannischen wird „k" oft zum kratzigen „ch": „Chind" statt „Kind".',
  'Österreichisch hat eigene amtliche Wörter: „Erdäpfel" (Kartoffeln), „Paradeiser" (Tomaten).',
  'Bairisch unterscheidet beim Gruß die Tageszeit nicht — „Servus" passt zum Kommen und Gehen.',
  'Sächsisch erweicht harte Laute: aus „Papa" wird schnell ein weiches „Babba".'
];

export function renderDialektFakt() {
  const fakt = DIALEKT_FAKTEN[Math.floor(Math.random() * DIALEKT_FAKTEN.length)];
  return el('section', { class: 'section', dataset: { reveal: '' }, 'aria-label': 'Dialekt-Wissen' },
    el('div', { class: 'fakt-card', dataset: { spotlight: '' } },
      el('span', { class: 'fakt-icon', 'aria-hidden': 'true' }, '💡'),
      el('div', { class: 'fakt-body' },
        el('div', { class: 'fakt-eyebrow' }, 'Wusstest du?'),
        el('p', { class: 'fakt-text' }, fakt)
      )
    )
  );
}
