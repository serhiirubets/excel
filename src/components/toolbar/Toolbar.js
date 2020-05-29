import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/consts';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribers: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);

      this.$emit('toolbar:applyStyle', value);
    }
  }


  storeChanged(changes) {
    console.log(changes);
    this.setState(changes.currentStyles);
  }

  toHTML() {
    return this.template;
  }
}
