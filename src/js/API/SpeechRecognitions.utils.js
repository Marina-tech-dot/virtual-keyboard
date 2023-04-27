export const LANG = {
  en: 'en-EN',
  ru: 'ru-RU',
};

const DICTIONARY = {
  точка: '.',
  запятая: ',',
  вопрос: '?',
  восклицание: '!',
  двоеточие: ':',
  тире: '-',
  абзац: '\n',
  отступ: '\t',
};

export function editInterim(s) {
  return s
    .split(' ')
    .map((word) => {
      word = word.trim();
      return DICTIONARY[word.toLowerCase()]
        ? DICTIONARY[word.toLowerCase()]
        : word;
    })
    .join(' ');
}

export function editFinal(s) {
  return s.replace(/\s{1,}([+,?!:-])/g, '$1');
}
