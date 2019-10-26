import moxios from 'moxios';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../store/reducers';
import { middleware } from '../store/store';


export const findByTestAttr = (Component, attr) => (Component.find(`[data-test='${attr}']`));

export const getUserMockData = () => ({
  username: 'test-username',
  password: 'test-password',
});

export const createTestStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

export const moxiosWait = (response) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith(response);
  });
};
