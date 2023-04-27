import { $ } from '../core/dom'

export class NotionToMonitor {
  constructor(className, src) {
    this.className = className
    this.src = src
    this.$dom = $('.monic__screen');
  }

  show() {
    const $el = $.create('img', this.className);
    $el.$el.src = this.src
    $el.$el.alt = `${this.className} image`
    this.$dom.append($el)
    this.$el = $el;
  }

  isExist() {
    return Boolean(this.$el)
  }

  destroy() {
    const child = this.$dom.find(`.${this.className}`)
    this.$dom.removeChild(child);
  }
}
