import { $ } from '../../core/dom';
import { KeyBoardStateComponent } from '../../core/state/KeyBoardStateComponent';
import * as actions from '../../redux/actions';
import { NotionToMonitor } from '../../UI/notionToMonitor';
import { cursorPositionAndTextarea } from '../monitor/monitor.fn';
import Microphone from '../../../assets/img/microphone.svg'
import { recognition } from '../../API/SpeechRecoginition';
import { createKeyBoard } from './keyboard.templates';

import {
  changeMonitorSize,
  fireBackspace,
  fireCapsLangShift,
  itIsCaps, itIsLang, itIsSound, keyIsEnterSpaceTab, keyIsLangCapsSoundShiftBackspace, playSound,
} from './keyboard.fn';
import { toggleClassActive, toggleClassesActive } from './keyboard.fn.utils';

export class KeyboardComponent extends KeyBoardStateComponent {
  static className = 'key-bord__clava'

  static additionalClasses = ['comeback']

  constructor($root, options) {
    super($root, {
      name: 'Klava',
      listeners: ['click'],
      ...options,
    })
  }

  prepare() {
    this.addToLS({ Shift: false, Lang: 'en' })
  }

  init() {
    super.init()
    this.addToLS({ Microphone: true });

    this.$on('monic:clickKlavaHider', () => {
      changeMonitorSize()
    })
  }

  async toHTML() {
    try {
      this.$root = await createKeyBoard(this.$root)
      itIsLang(this.store, true)
    } catch {
      throw new Error('Error in painting LangBTN on initial state')
    }
  }

  addToLS(value) {
    this.$dispatch(actions.addToLS({
      value,
    }))
  }

  onClick(event) {
    event.preventDefault()
    this.addToLS({ setSelectionEnd: cursorPositionAndTextarea().currentCursorPos })

    const wasLastPressedKeydown = this.store.getState().lastInputWasThroughKeydown
    if (wasLastPressedKeydown) {
      const Lang = this.store.getState().Lang === 'ru' ? { Lang: 'en' } : { Lang: 'ru' }
      this.addToLS(Lang)
      this.addToLS({ lastInputWasThroughKeydown: false })
    }

    const isKeyWritable = event.target.dataset.write
    const isKeyUnwritable = event.target.dataset.functional
    if (isKeyWritable && this.store.getState().Microphone) {
      const simbol = $(event.target).innerText();
      this.$emit('klava:clickSimbol', simbol);
      if (this.store.getState().Shift) {
        fireCapsLangShift('Shift');
        this.addToLS({ Shift: false });
      }
    } else if (keyIsEnterSpaceTab(event) && this.store.getState().Microphone) {
      this.$emit('klava:clickSimbol', keyIsEnterSpaceTab(event));
    } else if (
      keyIsLangCapsSoundShiftBackspace(event, this.store)
      && this.store.getState().Microphone
    ) {
      const key = event.target.dataset.functional;
      const newStateValue = keyIsLangCapsSoundShiftBackspace(event, this.store);
      if (key === 'Backspace') {
        this.$emit('klava:clickBackspace', fireBackspace());
      } else if (key === 'CapsLock') {
        itIsCaps(this.store);
        fireCapsLangShift('CapsLock');
      } else if (key === 'Shift') {
        fireCapsLangShift('Shift');
      } else if (key === 'Lang') {
        itIsLang(this.store);
        fireCapsLangShift('Lang');
      } else if (key === 'Sound') {
        itIsSound(this.store);
      }

      this.addToLS(newStateValue);
    }
    if (isKeyUnwritable === 'Microphone') {
      this.addToLS({ Microphone: !this.store.getState().Microphone });
      toggleClassActive('#microphone', 'Microphone', this.store);
      toggleClassActive('#written', 'Microphone', this.store);
      toggleClassesActive('.key-bord__row-el', 0);

      const microphoneIMG = new NotionToMonitor('microphone', Microphone);

      if (!this.store.getState().Microphone) {
        microphoneIMG.show();
        recognition.start()
        recognition.addEventListener('end', recognition.start);
      } else {
        microphoneIMG.destroy();
        recognition.removeEventListener('end', recognition.start);
        recognition.stop();
        this.$emit('klava:microIsOff');
      }
    }

    if (isKeyUnwritable === 'ArrowLeft' && this.store.getState().Microphone) {
      event.preventDefault();
      this.$emit('klava:ArrowLeftIsOn');
    }
    if (isKeyUnwritable === 'ArrowRight' && this.store.getState().Microphone) {
      event.preventDefault();
      this.$emit('klava:ArrowRightIsOn');
    }

    playSound(event, this.store)
  }
}
