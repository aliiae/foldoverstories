import moxios from 'moxios';
import {
  dispatchActionFromStore, getUserMockData, moxiosWait, testStore,
} from './utils';
import {
  loadUser, login, logout, register,
} from '../store/actions/auth';

const mockData = getUserMockData();
const expectedState = {
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
    store = testStore();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('Load', () => {
    test('Store is updated correctly', () => {
      const expectedStateLoad = { ...expectedState, token: null };
      moxiosWait({ status: 200, response: expectedStateLoad });
      return dispatchActionFromStore(loadUser, store, expectedStateLoad, mockData);
    });
  });
  describe('Register', () => {
    test('Store is updated correctly', () => {
      moxiosWait({ status: 201, response: expectedState });
      return dispatchActionFromStore(register, store, expectedState, mockData);
    });
  });
  describe('Login', () => {
    test('Store is updated correctly', () => {
      moxiosWait({ status: 200, response: expectedState });
      return dispatchActionFromStore(login, store, expectedState, mockData);
    });
  });
  describe('Logout', () => {
    test('Store is updated correctly', () => {
      const expectedStateLogout = {
        ...expectedState,
        user: null,
        token: null,
        isAuthenticated: false,
      };
      moxiosWait({ status: 200, response: expectedStateLogout });
      return dispatchActionFromStore(logout, store, expectedStateLogout, mockData);
    });
  });
});
