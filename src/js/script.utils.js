import { $ } from './core/dom'

const wrapperTempl = () => `
    <div class="wrapper">
    <main class="key-bord" id="keyboard">
    </main>
  </div>
  `

export const addWrapper = () => {
  const $body = $('body');
  $body.html(wrapperTempl())
}

const infoBlockTempl = () => `
    <div class="key-bord__info">
      <p>The virtual keyboard was created with Mac OS.</p>
      <p>Change language: Ctrl+Q</p>
    </div>
  `
export const addInfoBlock = () => {
  const $keyboardBody = $('.key-bord__body');
  $keyboardBody.$el.insertAdjacentHTML('beforeend', infoBlockTempl())
}
