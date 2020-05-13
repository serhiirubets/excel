import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  onInput(event) {
    console.log(this)
    console.log('Formula input', event.target.textContent);
  }

  onClick() {

  }

  toHTML() {
    return `
      <div class="excel__formula-info">fx</div>
      <div class="excel__formula-input" contenteditable="true" spellcheck="false"></div>
    `;
  }
}
