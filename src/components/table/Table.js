import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, getMatrix, getNextSelector} from '@/components/table/table.helpers';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

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
    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });

    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.$emit('table:select', $cell);
    this.selection.select($cell);
  }
  toHTML() {
    return createTable(25);
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
      resizeHandler(e, this.$root);
    } else if (isCell(e)) {
      const $target = $(event.target);
      if (e.shiftKey) {
        const $cells = getMatrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($(e.target));
      }
    }
  }

  onInput(evt) {
    this.$emit('table:input', $(evt.target).text());
  }
}

