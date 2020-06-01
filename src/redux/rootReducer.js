import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE} from '@/redux/types';

export function rootReducer(state, action) {
  let field;
  let prevState;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state,
        [field]: getState(state, field, action),
      };

    case CHANGE_TEXT:
      prevState = state.dataState || {};
      prevState[action.data.id] = action.data.value;
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: getState(state, field, action),
      };

    case CHANGE_STYLES: {
      return {
        ...state,
        currentStyles: {
          ...state.currentStyles,
          ...action.data,
        },
      };
    }

    case APPLY_STYLE: {
      field = 'stylesState';
      const value = state[field] || {};
      action.data.ids.forEach(id => {
        value[id] = {...value[id], ...action.data.value};
      });
      return {
        ...state,
        [field]: value,
        currentStyles: {
          ...state.currentStyles,
          ...action.data.value,
        },
      };
    }

    case CHANGE_TITLE: {
      return {
        ...state,
        title: action.data,
      };
    }

    case UPDATE_DATE: {
      return {
        ...state,
        openedDate: new Date().toJSON(),
      };
    }

    default: return state;
  }
}


function getState(state, field, action) {
  return {
    ...state[field] || {},
    [action.data.id]: action.data.value,
  };
}
