import { $ } from '../../core/dom'
import { unCapitalize } from '../../core/utils'
import { keysChangerList } from '../keyboard/keyboardKeys'

export function isKeyOnVirtualKeyboard(key) {
  const keyOnVirtKeyboard = Object.entries(keysChangerList.ru).flat()
    .concat(Object.entries(keysChangerList.simbols).flat());
  return keyOnVirtKeyboard.includes(key)
}

export function lightPressedKey(event) {
  let pressedKey = event.key
  const lang = { Lang: '' }

  if (pressedKey === ' ') {
    pressedKey = 'Space'
  } else if (pressedKey.charCodeAt() >= 65 && pressedKey.charCodeAt() <= 90
    && pressedKey.length === 1) {
    pressedKey = pressedKey.toLowerCase()
    lang.Lang = 'ru'
  } else if (unCapitalize(pressedKey).charCodeAt() >= 1072
              && unCapitalize(pressedKey).charCodeAt() <= 1103
              && pressedKey.length === 1) {
    const enRuSimbArray = Object.entries(keysChangerList.ru).filter(([enSimb, ruSimb]) => {
      if (unCapitalize(pressedKey) === ruSimb) {
        return enSimb
      }
    }).flat()[0]
    pressedKey = enRuSimbArray
    lang.Lang = 'en'
  }

  const keyWrittable = $(document).find(`[data-write= "${pressedKey || unCapitalize(pressedKey)}"]`)
  const keyUnwritableCorrectName = $(document).find(`[data-functional= "${pressedKey}"]`)
  const nesesseryKey = keyWrittable || keyUnwritableCorrectName
  if (nesesseryKey) {
    $(nesesseryKey).addClassSetTimeout(['key-shown'], 200)
  }

  if (!lang.Lang) {
    if (pressedKey.length === 1) {
      lang.Lang = 'ru'
    }
  }

  return lang
}

export function isCapsOn(event, lang) {
  if (event.getModifierState('CapsLock')) {
    lang = { ...lang, Capslock: true }
  }
  lang = { ...lang, Capslock: false }
  return lang
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  } else if (input.createTextRange) {
    const range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

export function setCaretToPos(input, pos) {
  setSelectionRange(input, pos, pos);
}

export function addClickedKey(store, simbol) {
  let newTextareaValue

  if (store.getState().setSelectionEnd) {
    const currentCursorPos = store.getState().setSelectionEnd
    newTextareaValue = cursorPositionAndTextarea().currentTextarea.value.slice(0, currentCursorPos)
      + simbol
      + cursorPositionAndTextarea().currentTextarea.value.slice(currentCursorPos)
    return {
      Textarea: newTextareaValue,
      setSelectionEnd: currentCursorPos,
    }
  }

  const currentCursorPos = cursorPositionAndTextarea().currentTextarea.selectionStart
  newTextareaValue = cursorPositionAndTextarea().currentTextarea.value + simbol
  return {
    Textarea: newTextareaValue,
    setSelectionEnd: currentCursorPos,
  }
}

export function cursorPositionAndTextarea() {
  const currentTextarea = document.querySelector('#written')
  return {
    currentTextarea,
    currentCursorPos: currentTextarea.selectionStart,
  }
}
