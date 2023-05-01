import { DomListener } from './DomListeners';

export class KeyBoardComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.emitter = options.emitter
    this.unsubscribers = []
    this.store = options.store
    this.subscribe = options.subscribe || []

    this.prepare()
  }

  prepare() {}

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
  }

  $emit(event, ...arg) {
    this.emitter.emit(event, ...arg)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() { }

  isWatching(key) {
    return this.subscribe.includes(key)
  }
}
