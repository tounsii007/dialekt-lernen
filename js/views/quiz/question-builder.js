// Quiz · Fragen aus dem Pool generieren
import { shuffle } from '../../util.js';
import { DIALEKTE } from '../../../data/dialekte.js';
import { t } from '../../util/i18n.js';

export function buildQuestion(item, pool, direction) {
  const wrong = shuffle(pool.filter(p => p.id !== item.id)).slice(0, 3);
  let q = {}, options = [];
  if (direction === 'dial->hd') {
    q = { prompt: item.ausdruck, sub: `${item.dialektFlag} ${item.dialektName}`, correct: item.hochdeutsch };
    options = shuffle([item.hochdeutsch, ...wrong.map(w => w.hochdeutsch)]);
  } else if (direction === 'hd->dial') {
    q = { prompt: item.hochdeutsch, sub: t('view.question-builder.hochdeutsch'), correct: item.ausdruck, hint: item.dialektName };
    options = shuffle([item.ausdruck, ...wrong.map(w => w.ausdruck)]);
  } else {
    q = { prompt: item.ausdruck, sub: '↦ ' + item.hochdeutsch, correct: item.dialektName };
    const otherNames = shuffle(DIALEKTE.filter(d => d.id !== item.dialektId)).slice(0, 3).map(d => d.name);
    options = shuffle([item.dialektName, ...otherNames]);
  }
  return { ...q, options, item };
}
