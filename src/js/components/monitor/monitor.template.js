import { css, windowParametrs } from '../../core/utils'

export function createMonitor() {
  const styles = css({
    width: windowParametrs().textareaWidth,
    height: windowParametrs().textareaHeight,
  })

  return `
      <div class="monic__inner-screen">
        <div class="monic__screen" id="monic">
          <textarea class="key-bord__text" id="written" style="${styles}" pattern="[0-9]{3}"></textarea>
          <div class="interim">
            <p class="interim__result"></p>
          </div>
        </div>
      </div>
      <div class="monic__panel">
        <div class="monic__item">
          <p class="_icon-keyboard" data-clava=true></p>
        </div>
      </div>
    `;
}

// <p>This virtual keyboard was created with Mac OS</p>
// <p>Tab + q => change language</p>
// pattern="[0-9A-ZА-ЯЁ]"
