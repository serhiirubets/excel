import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {$} from '@core/dom';
import {defaultTitle} from '@/consts';
import {debounce} from '@core/utils';
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick(e) {
    const $target = $(e.target);
    if ($target.data.button === 'remove') {
      const desition = confirm('Вы действительно хотите удалить эту таблицу ?');

      if (desition) {
        debugger
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }


  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="excel__title-input" value="${title}">

      <div>
        <button><span class="material-icons" data-button="remove">delete</span></button>
        <button><span class="material-icons" data-button="exit">exit_to_app</span></button>
      </div>
    `;
  }
}
