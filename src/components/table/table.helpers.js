import {getRange} from '@core/utils';

export function shouldResize(e) {
  return e.target.dataset.resize;
}

export function isCell(e) {
  return e.target.dataset.type === 'cell';
}

export function getMatrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = getRange(current.col, target.col);
  const rows = getRange(current.row, target.row);
  return cols.reduce((res, col) => {
    rows.forEach(row => res.push(`${row}:${col}`));
    return res;
  }, []);
}

export function getNextSelector(key, {col, row}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
