import { storage } from '../../core/utils'

export function isItNessesaryKey(arrKeys, keyCode) {
  return !!arrKeys.includes(keyCode)
}

export function functionalKeyValue(keyCode) {
  const simb = {
    Enter: '\n',
    Tab: '\t',
    Space: ' ',
  }
  return simb[keyCode]
}

export function changeStoreTo(keyCode, store) {
  store = store.getState()
  let answer = ''
  if (keyCode !== 'Lang') {
    answer = store ? !store[keyCode] : true
    return { [keyCode]: answer }
  }
  answer = store[keyCode] === 'en' ? 'ru' : 'en'
  return { [keyCode]: `${answer}` }
}

export function toggleClassActive(id, keyCode, store) {
  const el = document.querySelector(id)
  store = store.getState()
  if (store[keyCode]) {
    el.classList.remove('active')
    return false
  }
  el.classList.add('active')
  return true
}

export function toggleClassesActive(id, index) {
  const els = document.querySelectorAll(id);
  els.forEach((el, ind) => {
    if (ind !== index) {
      el.classList.toggle('active');
      el.style.CursorPointer = 'none'
    }
  })
}

export function indicatePressedCapsLock() {
  const el = document.querySelector('#CapsLock')
  const LocStorage = storage('keyBoard-state')
  const { CapsLock } = LocStorage
  if (CapsLock) {
    el.classList.add('active')
  } else {
    el.classList.remove('active')
  }
}

export function toggleLangBTN(id, lang) {
  const activeElDataAtrib = lang === 'en' ? 'ru' : 'en'
  const elInactive = document.querySelector(id)
  const elActive = document.querySelector(`[data-lang="${activeElDataAtrib}"]`)
  elInactive.classList.add('paint')
  elActive.classList.remove('paint')
  return false
}

export function importAll(arr, r) {
  r.keys().forEach((s, i) => arr[i] = r(s));
}

export function addTitleToSound(soundsList, soundListTitles) {
  const soundListWithTitles = soundsList.map((el, ind) => {
    const title = soundListTitles[ind]
    return { [title]: el }
  })
  return soundListWithTitles
}

export function soundSRC(soundListWithTitles, key) {
  soundListWithTitles = soundListWithTitles.map((obj) => {
    if (Object.keys(obj).join('') === key) {
      return obj[key]
    }
    return ''
  })
  return soundListWithTitles.join('')
}

export function toggleClassSetTimeout(el, classes, delay) {
  setTimeout(() => {
    el.classList.toggle(...classes)
  }, delay)
}
