import {
  LANG,
  editFinal,
  editInterim,
} from './SpeechRecognitions.utils';
import { $ } from '../core/dom';
import { capitalize } from '../core/utils';

let finalTranscript = ''

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 1;
recognition.lang = LANG[JSON.parse(localStorage.getItem('keyBoard-state'))?.Lang] || 'en';

recognition.onend = () => {
  finalTranscript = '';
};

recognition.onresult = (e) => {
  const $textarea = $('.key-bord__text');
  const $span = $('.interim__result');

  let interimTranscript = ''
  for (let i = e.resultIndex; i < e.results.length; ++i) {
    if (e.results[i].isFinal) {
      const result = editFinal(e.results[i][0].transcript);
      finalTranscript += `${capitalize(result.trim())}. `;

      $textarea.$el.value = `${
        JSON.parse(localStorage.getItem('keyBoard-state')).Textarea
      } ${finalTranscript} `;

      $span.insertText('')
    } else {
      interimTranscript = editInterim(e.results[i][0].transcript);
      $span.insertText(` ${interimTranscript}`);
    }
  }
}
