import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {$} from '@core/dom';
import {defaultTitle} from '@/consts';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(e) {
    const $target = $(e.target);
    this.$dispatch(changeTitle($target.text()));
  }


  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="excel__title-input" value="${title}">

      <div>
        <button><span class="material-icons">delete</span></button>
        <button><span class="material-icons">exit_to_app</span></button>
      </div>
    `;
  }
}
