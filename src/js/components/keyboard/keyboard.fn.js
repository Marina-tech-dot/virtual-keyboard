import {
  css,
  storage, windowParametrs,
} from '../../core/utils'
import {
  addTitleToSound,
  changeStoreTo, functionalKeyValue, importAll, isItNessesaryKey,
  soundSRC, toggleClassActive, toggleLangBTN,
} from './keyboard.fn.utils'
import { keysChangerList } from './keyboardKeys'
import { $ } from '../../core/dom'
import { cursorPositionAndTextarea } from '../monitor/monitor.fn'

export function standartKeyTemplate(value, attribute) {
  const LocStorage = storage('keyBoard-state') || {}
  let textContent = value
  if (LocStorage.CapsLock) {
    if (typeof value === 'string') { textContent = value.toUpperCase() }
  }
  return `
    <div class="key-bord__row-el" data-write="${attribute}" data-voice="write">${textContent}</div>
  `
}

export function keyIsEnterSpaceTab(event) {
  const keyCode = event.target.dataset.functional
  const keys = ['Enter', 'Tab', 'Space']
  if (isItNessesaryKey(keys, keyCode)) {
    return functionalKeyValue(keyCode)
  }
  return false
}

export function keyIsLangCapsSoundShiftBackspace(event, store) {
  const keyCode = event.target.dataset.functional
  const keys = ['Lang', 'CapsLock', 'Shift', 'Sound', 'Backspace']

  if (isItNessesaryKey(keys, keyCode)) {
    return changeStoreTo(keyCode, store)
  }
  return false
}

export function itIsSound(store) {
  toggleClassActive('#circle', 'Sound', store)
}

export function itIsCaps(store) {
  toggleClassActive('#CapsLock', 'CapsLock', store)
}

export function itIsLang(store, isItInitialState) {
  const storeKeys = store.getState()
  let { Lang } = storeKeys

  if (isItInitialState) {
    Lang = Lang === 'en' ? 'ru' : 'en'
  }
  toggleLangBTN(`[data-lang="${Lang}"]`, Lang)
}

export function playSound(event, store) {
  const soundsList = []
  const soundListTitles = ['arrowLeft', 'arrowRight', 'backspace', 'capsLock', 'enter', 'lang', 'microphone', 'shift', 'sound', 'space', 'tab', 'writtenKey']
  importAll(soundsList, require.context('../../../assets/audio/', true, /\.mp3$/))
  const soundListWithTitles = addTitleToSound(soundsList, soundListTitles)

  store = store.getState()
  if (!store.Sound) return

  const audio = document.createElement('audio');

  let key
  if (event.target.dataset.write || event.target.dataset.functional) {
    key = event.target.dataset.write
      ? 'writtenKey'
      : event.target.dataset.functional;
  } else {
    key = soundListTitles.includes(event.key) ? event.key
      : event.key === ' ' ? 'space' : 'writtenKey';
  }

  audio.src = `${soundSRC(soundListWithTitles, key)}`
  audio.play()
  audio.volume = 0.7;
}

export function fireCapsLangShift(keyIsCapsOrLangOrShift) {
  const elToChange = document.querySelectorAll('[data-write]')

  elToChange.forEach((el) => {
    const LocStorage = storage('keyBoard-state')
    const writtenSimbol = el.getAttribute('data-write')

    if (keyIsCapsOrLangOrShift === 'CapsLock') {
      const { CapsLock } = LocStorage
      const { Lang } = LocStorage
      if (!CapsLock) {
        if (keysChangerList[Lang][writtenSimbol].toUpperCase()) {
          const textContent = keysChangerList[Lang][writtenSimbol].toUpperCase()
          el.textContent = textContent
        }
      }
      if (CapsLock) {
        const textContent = keysChangerList[Lang][writtenSimbol]
        el.textContent = textContent
      }
      return false
    }

    if (keyIsCapsOrLangOrShift === 'Shift') {
      const { Shift } = LocStorage
      const { Lang } = LocStorage
      const { CapsLock } = LocStorage

      if (keysChangerList.simbols[writtenSimbol]) {
        if (!Shift) {
          const textContent = keysChangerList.simbols[writtenSimbol]
          el.textContent = textContent
        }
        if (Shift) {
          const textContent = keysChangerList.numbers[writtenSimbol]
          el.textContent = textContent
        }
      }
      if (keysChangerList.en[writtenSimbol] && !keysChangerList.simbols[writtenSimbol]) {
        if (!Shift) {
          const textContent = keysChangerList[Lang][writtenSimbol].toUpperCase()
          el.textContent = textContent
        }
        if (Shift) {
          if (!CapsLock) {
            const textContent = keysChangerList[Lang][writtenSimbol]
            el.textContent = textContent
          }
        }
      }
    }

    if (keyIsCapsOrLangOrShift === 'Lang') {
      const { Lang } = LocStorage
      const { CapsLock } = LocStorage
      const currentLang = Lang === 'ru' ? 'en' : 'ru'
      if (CapsLock) {
        if (keysChangerList[currentLang][writtenSimbol].toUpperCase()) {
          const textContent = keysChangerList[currentLang][writtenSimbol].toUpperCase()
          el.textContent = textContent
        }
      } else {
        const textContent = keysChangerList[currentLang][writtenSimbol]
        el.textContent = textContent
      }
    }
  })
}

export function fireBackspace() {
  const values = cursorPositionAndTextarea()
  const newValue = values.currentTextarea.value.slice(0, values.currentCursorPos - 1)
    + values.currentTextarea.value.slice(values.currentCursorPos)

  return {
    Textarea: newValue,
    setSelectionEnd: values.currentCursorPos,
  }
}

export function animationPressKey(event) {
  const maxWidth = Math.max(
    event.target.getBoundingClientRect().width,
    event.target.getBoundingClientRect().height,
  )
  const leftCoord = event.pageX - event.target.getBoundingClientRect().left - maxWidth / 2
  const topCoord = event.pageY - event.target.getBoundingClientRect().top - maxWidth / 2
  const style = css({
    width: `${maxWidth}px`,
    height: `${maxWidth}px`,
    left: `${leftCoord}px`,
    top: `${topCoord}px`,
  })
  const pressedKey = event.target.dataset

  const animationCircle = `
    <div class="animation-circle" style=${style}></div>
    `

  if (pressedKey.write) {
    const keyTextValue = $(event.target).innerText()
    const $key = $(event.target).html(animationCircle)
    $key.append(keyTextValue)
    const $animationHTML = $key.children(0, $key)
    setTimeout(() => {
      $animationHTML.remove()
    }, 250)
  } else if (pressedKey.functional) {
    const key = event.target
    key.insertAdjacentHTML('beforeend', animationCircle)
    setTimeout(() => {
      key.removeChild(key.lastChild.previousSibling)
    }, 250)
  }
}

export function changeMonitorSize() {
  const clava = $(document.querySelector('.key-bord__clava'))
  const monic = $(document.querySelector('.key-bord__monic'))
  const textarea = $(document.querySelector('.key-bord__text'))
  clava.toggleClass(['comeback'])
  clava.toggleClass(['hidden'])

  if (clava.hasClass(['hidden'])) {
    monic.css({
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      transition: 'all 0.3s ease 0s',
      margin: '0px',
    })
    textarea.css({
      width: `${window.innerWidth - 30}px`,
      height: `${window.innerHeight - 100}px`,
      transition: 'all 0.3s ease 0s',
    })
    clava.css({ display: 'none' })
  } else if (clava.hasClass(['comeback'])) {
    monic.css({
      width: `${windowParametrs().monicWidth}`,
      height: `${windowParametrs().monicHeight}`,
      transition: 'all 0.3s ease 0s',
      'margin-bottom': '16px',
    })
    textarea.css({
      width: `${windowParametrs().textareaWidth}`,
      height: `${windowParametrs().textareaHeight}`,
      transition: 'all 0.3s ease 0s',
    })
    clava.css({ display: 'block' })
  }
}
