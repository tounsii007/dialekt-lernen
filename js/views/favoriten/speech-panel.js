// Favoriten · Sprachausgabe — Stimme, Tempo, Tonhöhe für das Vorlesen.

import {
  el, toast,
  speak, isSpeechSupported, getSpeechSettings, setSpeechSettings,
  listVoices, onVoicesChanged, getSpeechStatus,
  RATE_MIN, RATE_MAX, PITCH_MIN, PITCH_MAX
} from '../../util.js';

export function renderSpeechSettings() {
  const wrap = el('section', { class: 'section speech-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, '🗣️ Sprachausgabe'),
        el('div', { class: 'lede' }, isSpeechSupported()
          ? 'Wähle Stimme, Tempo und Tonhöhe für das Vorlesen der Dialekt-Ausdrücke.'
          : 'Dein Browser unterstützt keine Sprachausgabe — diese Funktion ist nicht verfügbar.')
      )
    )
  );

  if (!isSpeechSupported()) {
    wrap.appendChild(el('div', { class: 'card' },
      el('div', { class: 'lede' }, 'Text-to-Speech wird vom Browser nicht unterstützt.')
    ));
    return wrap;
  }

  const fmt = (n) => Number(n).toFixed(2).replace(/0$/, '').replace(/\.$/, '');

  // --- Stimmen-Auswahl ---
  const select = el('select', { class: 'speech-voice-select', ariaLabel: 'Stimme wählen' });
  function populateVoices() {
    const cur = getSpeechSettings().voiceURI || '';
    select.innerHTML = '';
    select.appendChild(el('option', { value: '' }, '🔈 Automatisch (zum Dialekt passend)'));
    for (const v of listVoices()) {
      const de = (v.lang || '').toLowerCase().startsWith('de');
      const label = `${de ? '🇩🇪 ' : ''}${v.name} · ${v.lang}`;
      select.appendChild(el('option', { value: v.voiceURI }, label));
    }
    select.value = cur;
  }
  populateVoices();
  // Voices kommen in vielen Browsern erst asynchron — Picker dann nachfüllen.
  const off = onVoicesChanged(() => {
    if (!select.isConnected) { off(); return; }
    populateVoices();
  });

  // --- Eigene Stimme pro Dialekt (globaler Schalter + Mini-Demo) ---
  const dialectToggle = el('input', { type: 'checkbox', class: 'speech-toggle-input',
    role: 'switch', ariaLabel: 'Eigene Stimme pro Dialekt' });
  dialectToggle.checked = getSpeechSettings().dialectVoices;
  dialectToggle.addEventListener('change', () => {
    setSpeechSettings({ dialectVoices: dialectToggle.checked });
    toast(dialectToggle.checked ? '🎭 Dialekt-Stimmen an' : 'Dialekt-Stimmen aus', 'info', 1200);
  });

  // Gleiche Grußformeln, je Dialekt mit eigener Stimme & Aussprache — zum
  // direkten Vergleich. Bei ausgeschaltetem Schalter klingen alle gleich.
  const DEMOS = [
    { id: 'bayerisch',       lang: 'de-DE', label: '🥨 Bayerisch',      text: 'Servus, wia geht\'s da?' },
    { id: 'saechsisch',      lang: 'de-DE', label: '🗣️ Sächsisch',     text: 'Nu freilich, kee Problem!' },
    { id: 'koelsch',         lang: 'de-DE', label: '🎤 Kölsch',         text: 'Grüß dich, wie geht es dir?' },
    { id: 'schwizerduetsch', lang: 'de-CH', label: '🏔️ Schwiizerdütsch', text: 'Grüezi mitenand, wie isch es?' },
  ];
  const demoRow = el('div', { class: 'speech-demo' },
    ...DEMOS.map((d) => el('button', {
      class: 'btn btn-ghost speech-demo-btn', dataset: { magnetic: '8' },
      onClick: () => speak(d.text, d.lang, { dialektId: d.id }),
    }, d.label))
  );

  // --- Tempo & Tonhöhe ---
  const s0 = getSpeechSettings();
  const rate = el('input', { type: 'range', class: 'speech-range',
    min: String(RATE_MIN), max: String(RATE_MAX), step: '0.02', value: String(s0.rate) });
  const rateVal = el('span', { class: 'speech-range-val' }, fmt(s0.rate) + '×');
  const pitch = el('input', { type: 'range', class: 'speech-range',
    min: String(PITCH_MIN), max: String(PITCH_MAX), step: '0.02', value: String(s0.pitch) });
  const pitchVal = el('span', { class: 'speech-range-val' }, fmt(s0.pitch));

  const statusLine = el('div', { class: 'lede speech-status', style: { fontSize: '.85rem', marginTop: '4px' } });
  const refreshStatus = () => {
    const st = getSpeechStatus('de-DE');
    if (!st.available) { statusLine.textContent = 'Keine Stimme verfügbar.'; return; }
    const src = st.preferred ? 'deine Wunschstimme' : (st.exact ? 'exakt passend' : 'automatisch gewählt');
    statusLine.textContent = `Aktive Stimme: ${st.voice} (${st.voiceLang}) — ${src}.`;
  };
  refreshStatus();

  const sample = 'Grüß dich! So klingt deine gewählte Stimme.';
  const previewSoon = (() => {
    let t = null;
    return () => { clearTimeout(t); t = setTimeout(() => speak(sample, 'de-DE'), 220); };
  })();

  select.addEventListener('change', () => {
    setSpeechSettings({ voiceURI: select.value || null });
    refreshStatus();
    previewSoon();
  });
  rate.addEventListener('input', () => { rateVal.textContent = fmt(rate.value) + '×'; });
  rate.addEventListener('change', () => { setSpeechSettings({ rate: rate.value }); refreshStatus(); previewSoon(); });
  pitch.addEventListener('input', () => { pitchVal.textContent = fmt(pitch.value); });
  pitch.addEventListener('change', () => { setSpeechSettings({ pitch: pitch.value }); refreshStatus(); previewSoon(); });

  const testBtn = el('button', { class: 'btn btn-primary', dataset: { magnetic: '10' },
    onClick: () => speak(sample, 'de-DE') }, '▶ Stimme testen');
  const resetBtn = el('button', { class: 'btn btn-ghost', dataset: { magnetic: '10' },
    onClick: () => {
      setSpeechSettings({ rate: 0.92, pitch: 1, voiceURI: null, dialectVoices: true });
      const s = getSpeechSettings();
      rate.value = String(s.rate); rateVal.textContent = fmt(s.rate) + '×';
      pitch.value = String(s.pitch); pitchVal.textContent = fmt(s.pitch);
      select.value = '';
      dialectToggle.checked = true;
      refreshStatus();
      toast('Sprachausgabe zurückgesetzt', 'info', 1200);
    } }, 'Zurücksetzen');

  wrap.appendChild(el('div', { class: 'card speech-card', dataset: { spotlight: '' } },
    el('div', { class: 'speech-field speech-dialect-field' },
      el('label', { class: 'speech-toggle' },
        dialectToggle,
        el('span', { class: 'speech-toggle-text' },
          el('span', { class: 'speech-field-label' }, '🎭 Eigene Stimme pro Dialekt'),
          el('span', { class: 'speech-toggle-sub' }, 'Jeder Dialekt mit eigener Stimme & angepasster Aussprache.')
        )
      ),
      el('div', { class: 'speech-demo-hint' }, 'Zum Vergleich anhören:'),
      demoRow
    ),
    el('label', { class: 'speech-field' },
      el('span', { class: 'speech-field-label' }, 'Stimme'),
      select
    ),
    el('label', { class: 'speech-field' },
      el('span', { class: 'speech-field-label' },
        el('span', {}, 'Tempo'),
        rateVal
      ),
      rate
    ),
    el('label', { class: 'speech-field' },
      el('span', { class: 'speech-field-label' },
        el('span', {}, 'Tonhöhe'),
        pitchVal
      ),
      pitch
    ),
    el('div', { class: 'speech-actions' }, testBtn, resetBtn),
    statusLine
  ));

  return wrap;
}
