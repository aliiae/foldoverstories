import moxios from 'moxios';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../store/reducers';
import { middleware } from '../store/store';


export const findByTestAttr = (Component, attr) => {
  return Component.find(`[data-test='${attr}']`);
};

export const getUserMockData = () => {
  return { username: 'test-username', password: 'test-password' };
};

export const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

export const moxiosWait = (response) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith(response);
  });
};

export const dispatchActionFromStore = (action, store, expectedState, ...args) => {
  return store.dispatch(action(args))
    .then(() => {
      const newState = store.getState();
      expect(newState.auth).toStrictEqual(expectedState);
    });
};
