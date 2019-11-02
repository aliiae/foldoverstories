import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export const middlewares = [thunkMiddleware];

const devTools = process.env.NODE_ENV === 'production'
  ? applyMiddleware(...middlewares)
  : composeWithDevTools(applyMiddleware(...middlewares));

const initialState = {};

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(rootReducer, preloadedState || initialState, devTools);

export default store;
