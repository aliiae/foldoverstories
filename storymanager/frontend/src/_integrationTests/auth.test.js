import moxios from 'moxios';
import {
  getUserMockData, moxiosWait, createTestStore,
} from './utils';
import {
  loadUser, login, logout, register,
} from '../store/actions/auth';

const compareStoreAfterDispatch = (action, store, expectedState, ...args) => {
  return store.dispatch(action(args))
    .then(() => {
      const newState = store.getState();
      expect(newState.auth)
        .toStrictEqual(expectedState);
    });
};
const mockData = getUserMockData();
const defaultExpectedState = {
  user: { username: mockData.username },
  token: 'token',
  error: null,
  isLoading: false,
  isAuthenticated: true,
};

describe('Navbar Authentication', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = createTestStore();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('Load user', () => {
    test('Store is updated correctly', () => {
      const expectedStateLoad = {
        ...defaultExpectedState,
        token: null,
      };
      moxiosWait({
        status: 200,
        response: { username: mockData.username },
      });
      return compareStoreAfterDispatch(loadUser, store, expectedStateLoad, mockData);
    });
  });

  describe('Register', () => {
    test('Store is updated correctly', () => {
      moxiosWait({
        status: 201,
        response: defaultExpectedState,
      });
      return compareStoreAfterDispatch(register, store, defaultExpectedState, mockData);
    });
  });

  describe('Login', () => {
    test('Store is updated correctly', () => {
      moxiosWait({
        status: 200,
        response: defaultExpectedState,
      });
      return compareStoreAfterDispatch(login, store, defaultExpectedState, mockData);
    });
  });

  describe('Logout', () => {
    test('Store is updated correctly', () => {
      const expectedStateLogout = {
        ...defaultExpectedState,
        user: null,
        token: null,
        isAuthenticated: false,
      };
      moxiosWait({
        status: 200,
        response: expectedStateLogout,
      });
      return compareStoreAfterDispatch(logout, store, expectedStateLogout, mockData);
    });
  });
});
