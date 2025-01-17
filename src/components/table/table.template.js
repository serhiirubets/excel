import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/consts';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    const data = state.dataState[id];
    return `
      <div
        class="cell"
        contenteditable="true"
        data-type="cell"
        data-col="${col}"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width: ${getWidth(state, col)}"
      >
      ${parse(data) || ''}
      </div>
  `;
  };
}

function toColumn({col, index, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}"
      style="height: ${getHeight(state, index)}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function withWidth(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state, index),
    };
  };
}

const colsCount = CODES.Z - CODES.A + 1;

function toChar(el, i) {
  return String.fromCharCode(CODES.A + i);
}

function getWidth(state, index) {
  return (state.colState[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state.rowState[index] || DEFAULT_HEIGHT) + 'px';
}

export function createTable(rowsCount = 15, state) {
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidth(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols, state));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(row + 1, cells, state));
  }
  return rows.join('');
}
