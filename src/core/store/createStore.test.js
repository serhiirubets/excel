import {createStore} from './createStore';

const initialState = {
  count: 0,
};

const reducer = (state = 0, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1};
  }

  return state;
};

describe('createStore:', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('Should return store object', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBe(undefined);
  });

  test('Should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('Should return object as a state with count 1', () => {
    expect(store.getState()).toEqual(initialState);
    store.dispatch({type: 'ADD'});
    expect(store.getState().count).toBe(1);
  });

  test('Should not change state if type is not defined', () => {
    store.dispatch({type: 'ANY_TYPE_VALUE'});
    expect(store.getState()).toEqual(initialState);
  });

  test('Should call subscriber', () => {
    store.subscribe(handler);
    store.dispatch({type: 'ADD'});
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('Should not call sub if unsub', () => {
    const subscribtion = store.subscribe(handler);

    subscribtion.unsubscribe();
    store.dispatch({type: 'ADD'});
    expect(handler).not.toHaveBeenCalled();
  });

  test('Should dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'});
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1200);
    });
  });
});
