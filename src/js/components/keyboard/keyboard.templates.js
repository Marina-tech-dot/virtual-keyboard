import { $ } from '../../core/dom'
import { keyboardRows } from './keyboardKeys'
import { KeyboardIterator } from './keyboard.Iteratror'

export const infoBlock = () => `
    <p>The virtual keyboard was created with Mac OS.</p>
    <p>Change language: Ctrl+Q</p>
  `

export function createKeyBoard($root) {
  return new Promise((resolve) => {
    for (let i = 0; i < keyboardRows.length; i++) {
      const $rootRow = $.create('div', 'key-bord__row');
      const keyBoardRowsEl = Object.values(keyboardRows[i][i + 1]);

      keyBoardRowsEl.forEach((el) => {
        if (!el.rowIterator) {
          const $rowElHTML = $.create('div', 'key-bord__row-el');
          $rowElHTML
            .addClass(el.classes)
            .textContent(el.innerText)
            .addDataAttribute(el.dataAttributes);
          $rowElHTML.html(el.appendHTML);
          $rootRow.append($rowElHTML);
        } else {
          const iterator = new KeyboardIterator(el.keboardRowsValues);
          // eslint-disable-next-line no-restricted-syntax
          for (const standartKeys of iterator) {
            $rootRow.$el.insertAdjacentHTML('beforeend', standartKeys);
          }
        }
      });
      $root.append($rootRow);
    }
    resolve($root);
  });
}
