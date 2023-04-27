import { $ } from './core/dom'

const wrapperTemplate = () => `
    <div class="wrapper">
    <main class="key-bord" id="keyboard">
    </main>
  </div>
  `

export const addWrapper = () => {
  const $body = $('body');
  $body.html(wrapperTemplate())
}
