/* eslint-disable no-console */
import { KeyBoardComponent } from '../../core/KeyBoardComponent';
import { createMonitor } from './monitor.template';
import * as actions from '../../redux/actions';
import { $ } from '../../core/dom';
import {
  isKeyOnVirtualKeyboard, addClickedKey, cursorPositionAndTextarea, lightPressedKey, setCaretToPos,
} from './monitor.fn';
import {
  fireCapsLangShift,
  itIsLang,
  playSound,
} from '../keyboard/keyboard.fn';
import { functionalKeyValue, indicatePressedCapsLock } from '../keyboard/keyboard.fn.utils';
import { windowParametrs } from '../../core/utils';

export class MonitorComponent extends KeyBoardComponent {
  static className = 'key-bord__monic'

  static initialStyle = {
    widht: windowParametrs().monicWidth,
    height: windowParametrs().monicHeight,
  }

  constructor($root, options) {
    super($root, {
      name: 'Monitor',
      listeners: ['click', 'keyup', 'keydown'],
      ...options,
    })
  }

  init() {
    super.init()
    this.textarea = this.$root.find('#written')
    this.textarea.focus()
    this.textarea.value = this.store.getState().Textarea
    this.textarea.scrollTop = this.textarea.scrollHeight;

    this.$on('klava:clickSimbol', (text) => {
      this.textarea.focus()
      this.pressedWrittenKey(text)
      this.textarea.scrollTop = this.textarea.scrollHeight;
      this.textarea.focus()
    })

    this.$on('klava:clickBackspace', (newTextarea) => {
      this.textarea.focus()
      this.addToLS({ Textarea: newTextarea.Textarea })
      this.textarea.value = this.store.getState().Textarea
      this.textarea.selectionEnd = newTextarea.setSelectionEnd - 1
    })
    this.$on('monic:wasKeydown', (currentTextarea) => {
      this.addToLS({ Textarea: currentTextarea })
    })
    this.$on('monic:pressedKey', () => {
      document.addEventListener('keydown', (e) => {
        if (e.getModifierState('CapsLock')) {
          this.addToLS({ CapsLock: true })
        } else {
          this.addToLS({ CapsLock: false })
        }
        if (e.getModifierState('Shift')) {
          this.addToLS({ Shift: true })
        } else {
          this.addToLS({ Shift: false })
        }
      });
      indicatePressedCapsLock()
    })
    this.$on('klava:microIsOff', () => {
      this.addToLS({ Textarea: this.textarea.value });
      const $span = $('.interim__result');
      $span.insertText('')
      setTimeout(() => {
        this.textarea.scrollTop = this.textarea.scrollHeight;
        this.textarea.focus();
      }, 300);
    })
    this.$on('klava:ArrowLeftIsOn', () => {
      this.textarea.focus()
      const currentPos = this.textarea.selectionStart
      setCaretToPos(this.textarea, currentPos - 1)
      this.addToLS({ setSelectionEnd: currentPos - 1 })
    })
    this.$on('klava:ArrowRightIsOn', () => {
      this.textarea.focus()
      const currentPos = this.textarea.selectionStart
      setCaretToPos(this.textarea, currentPos + 1)
    })
  }

  toHTML() {
    return createMonitor()
  }

  addToLS(value) {
    console.log(value)
    this.$dispatch(actions.addToLS({
      value,
    }))
  }

  pressedWrittenKey(text) {
    const newTextareaAndCursorposition = addClickedKey(this.store, text)
    this.addToLS({ Textarea: newTextareaAndCursorposition.Textarea })
    this.addToLS({ setSelectionEnd: newTextareaAndCursorposition.setSelectionEnd })
    this.textarea.value = this.store.getState().Textarea
    this.textarea.selectionEnd = this.store.getState().setSelectionEnd + 1
    this.addToLS({ setSelectionEnd: newTextareaAndCursorposition.setSelectionEnd + 1 })
  }

  onClick(event) {
    const isKlavaHider = event.target.dataset.clava
    if (isKlavaHider) {
      const klavaHider = $(event.target)
      klavaHider.toggleClass(['inactive'])
      this.$emit('monic:clickKlavaHider')
      this.textarea.focus();
      setTimeout(() => {
        this.textarea.scrollTop = this.textarea.scrollHeight + 1000;
      }, 400);
    }
  }

  onKeydown(event) {
    // eslint-disable-next-line no-console
    console.log(isKeyOnVirtualKeyboard(event.key))
    // if (isKeyOnVirtualKeyboard(event) === false) return
    this.$emit('monic:pressedKey')
    const pressedKey = event.key

    playSound(event, this.store)

    if (pressedKey === 'Tab') {
      event.preventDefault()
      document.onkeyup = () => {
        document.onkeyup = null
        this.$emit('klava:clickSimbol', functionalKeyValue('Tab'))
      }
    }
    lightPressedKey(event)

    if (lightPressedKey(event).Lang) {
      this.addToLS({ lastInputWasThroughKeydown: true })
      this.addToLS(lightPressedKey(event))
      itIsLang(this.store)
      fireCapsLangShift('Lang')
    }

    this.addToLS({ setSelectionEnd: cursorPositionAndTextarea().currentCursorPos })
  }

  onKeyup() {
    this.$emit('monic:wasKeydown', this.textarea.value)
  }
}
