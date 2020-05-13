const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="cell" contenteditable="true"></div>
`;
}

function toColumn(content) {
  return `
    <div class="column">${content}</div>
  `;
}

function createRow(index, content) {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

const colsCount = CODES.Z - CODES.A + 1;

function toChar(el, i) {
  return String.fromCharCode(CODES.A + i);
}

export function createTable(rowsCount = 15) {
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}
