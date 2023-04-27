import { storage } from '../core/utils'

const defaultState = {
  Lang: 'en',
  CapsLock: false,
  Sound: false,
  Shift: false,
  Textarea: '',
  Microphone: false,
  setSelectionEnd: '',
}

export const initialState = storage('keyBoard-state') ? storage('keyBoard-state') : defaultState
