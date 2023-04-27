import { $ } from '../../core/dom';
import { Emitter } from '../../core/Emitter';
import { StoreSubscriber } from '../../core/state/KeyBoardSubscriber';

export class VirtualKeyboard {
  constructor(el, options = {}) {
    this.$el = $(el)
    this.components = options.components || []
    this.emitter = new Emitter()
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'key-bord__body')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      $el.css(Component.initialStyle)
      $el.addClass(Component.additionalClasses)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach((Component) => Component.init())
  }
}
