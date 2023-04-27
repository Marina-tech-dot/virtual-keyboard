import { storage } from '../../core/utils'

const stor = storage('keyBoard-state') || {}

export const keyboardRows = [
  {
    1: {
      1: {
        rowIterator: false,
        appendHTML: `
          <div class="_icon-voice" data-functional="Microphone"></div>
          <div class="circle voice" data-functional="Microphone" id="microphone"></div>
      `,
        dataAttributes: [{ functional: 'Microphone' }],
        classes: false,
        innerText: false,
      },
      2: {
        rowIterator: false,
        appendHTML: `
          <div class="_icon-sound" data-functional="Sound"></div>
          <div class="circle sound ${stor.Sound ? 'active' : ''}" data-functional="Sound" id="circle"></div>
        `,
        dataAttributes: [{ functional: 'Sound' }],
        classes: false,
        innerText: false,
      },
      3: {
        rowIterator: true,
        keboardRowsValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      },
      4: {
        rowIterator: false,
        appendHTML: false,
        dataAttributes: [{ functional: 'Backspace' }],
        classes: ['el-shift-backsp', '_icon-delete'],
        innerText: false,
      },
    },
  },
  {
    2: {
      1: {
        rowIterator: false,
        appendHTML: false,
        dataAttributes: [{ functional: 'Tab' }],
        classes: ['el-shift-backsp', '_icon-tab'],
        innerText: false,
      },
      2: {
        rowIterator: true,
        keboardRowsValues: {
          en: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
          ru: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
        },

      },
    },
  },
  {
    3: {
      1: {
        rowIterator: false,
        appendHTML: `
          <div class="circle capsLock ${stor.CapsLock ? 'active' : ''}" id="CapsLock"></div>
        `,
        dataAttributes: [{ functional: 'CapsLock' }],
        classes: ['el-caps', '_icon-caps'],
        innerText: false,
      },
      2: {
        rowIterator: true,
        keboardRowsValues: {
          en: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ':'],
          ru: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
        },
      },
      3: {
        rowIterator: false,
        appendHTML: false,
        dataAttributes: [{ functional: 'Enter' }],
        classes: ['el-enter', '_icon-enter'],
        innerText: false,
      },
    },
  },
  {
    4: {
      1: {
        rowIterator: false,
        appendHTML: false,
        dataAttributes: [{ functional: 'Shift' }],
        classes: ['el-shift-backsp', '_icon-shift'],
        innerText: false,
      },
      2: {
        rowIterator: true,
        keboardRowsValues: {
          en: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '!', '@'],
          ru: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '?', '!', '@'],
        },
      },
    },
  },
  {
    5: {
      1: {
        rowIterator: false,
        appendHTML: `
          <div class="key-bord__el-en ${stor.Lang === 'en' ? '' : 'paint'}" data-functional="Lang" data-lang="en">en</div>
          <div class="key-bord__el-slash" data-functional="Lang">/</div>
          <div class="key-bord__el-ru ${stor.Lang === 'ru' ? '' : 'paint'}" data-functional="Lang" data-lang="ru">ru</div>
        `,
        dataAttributes: [{ functional: 'Lang' }],
        classes: ['en-ru'],
        innerText: false,
      },
      2: {
        rowIterator: false,
        appendHTML: false,
        dataAttributes: [{ functional: 'Space' }],
        classes: ['el-space'],
        innerText: ' ',
      },
      3: {
        rowIterator: false,
        appendHTML: false,
        dataAttributes: [{ functional: 'ArrowLeft' }],
        classes: ['_icon-left-arrow'],
        innerText: false,
      },
      4: {
        rowIterator: false,
        appendHTML: false,
        dataAttributes: [{ functional: 'ArrowRight' }],
        classes: ['_icon-right-arrow'],
        innerText: false,
      },
    },
  },
]

export const keysChangerList = {
  ru: {
    q: 'й',
    w: 'ц',
    e: 'у',
    r: 'к',
    t: 'е',
    y: 'н',
    u: 'г',
    i: 'ш',
    o: 'щ',
    p: 'з',
    '[': 'х',
    ']': 'ъ',
    a: 'ф',
    s: 'ы',
    d: 'в',
    f: 'а',
    g: 'п',
    h: 'р',
    j: 'о',
    k: 'л',
    l: 'д',
    ';': 'ж',
    ':': 'э',
    z: 'я',
    x: 'ч',
    c: 'с',
    v: 'м',
    b: 'и',
    n: 'т',
    m: 'ь',
    ',': 'б',
    '.': 'ю',
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    '!': '!',
    '?': '?',
    '@': '@',
  },
  en: {
    q: 'q',
    w: 'w',
    e: 'e',
    r: 'r',
    t: 't',
    y: 'y',
    u: 'u',
    i: 'i',
    o: 'o',
    p: 'p',
    ']': ']',
    '[': '[',
    a: 'a',
    s: 's',
    d: 'd',
    f: 'f',
    g: 'g',
    h: 'h',
    j: 'j',
    k: 'k',
    l: 'l',
    ';': ';',
    ':': ':',
    z: 'z',
    x: 'x',
    c: 'с',
    v: 'v',
    b: 'b',
    n: 'n',
    m: 'm',
    ',': ',',
    '.': '.',
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    '!': '!',
    '?': '?',
    '@': '@',
  },
  simbols: {
    1: '!',
    2: '@',
    3: '#',
    4: '$',
    5: '%',
    6: '^',
    7: '&',
    8: '*',
    9: '(',
    0: ')',
  },
  numbers: {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    0: '0',
  },
}
