import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribers: ['currentText'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('.excel__formula-input');
    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value);
    });
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  toHTML() {
    return `
      <div class="excel__formula-info">fx</div>
      <div class="excel__formula-input" contenteditable="true" spellcheck="false"></div>
    `;
  }
}
