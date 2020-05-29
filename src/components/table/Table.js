import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, getMatrix, getNextSelector} from '@/components/table/table.helpers';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/consts';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options = []) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value));
      this.updateTextIntStore(value);
    });

    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  selectCell($cell) {
    this.$emit('table:select', $cell);
    this.selection.select($cell);
    this.$dispatch(actions.changeStyles($cell.getStyles(Object.keys(defaultStyles))));
  }
  toHTML() {
    return createTable(25, this.store.getState());
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(e, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error', e.message);
    }
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];

    if (keys.includes(e.key) && !e.shiftKey) {
      e.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(getNextSelector(e.key, id));
      this.selectCell($next);
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e);
    } else if (isCell(e)) {
      const $target = $(e.target);
      if (e.shiftKey) {
        const $cells = getMatrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  updateTextIntStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }));
  }

  onInput(evt) {
    this.updateTextIntStore($(evt.target).text());
  }
}

