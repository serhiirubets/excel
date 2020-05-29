import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.prepare();
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubscribers = [];
    this.subscribers = options.subscribers || [];
  }

  prepare() {

  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }

  storeChanged() {

  }

  isWatching(key) {
    return this.subscribers.includes(key);
  }
}
