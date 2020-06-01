
import {defaultStyles, defaultTitle} from '@/consts';
import {clone} from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  currentText: {},
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {},
  title: defaultTitle,
  openedDate: new Date().toJSON(),
};

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
}

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
