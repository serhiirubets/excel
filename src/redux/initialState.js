import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/consts';

const defaultState = {
  rowState: {},
  colState: {},
  currentText: {},
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {},
  title: defaultTitle,
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;

