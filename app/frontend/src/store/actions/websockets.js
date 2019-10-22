import {
  SET_WS_STATUS, USER_ONLINE, WS_CLOSED, WS_CONNECTING, WS_OPENED,
} from './types';

export const userOnline = () => ({
  type: USER_ONLINE,
});
export const userOffline = () => ({
  type: USER_ONLINE,
});
export const wsConnecting = () => ({
  type: WS_CONNECTING,
});
export const wsOpened = () => ({
  type: WS_OPENED,
});
export const wsClosed = () => ({
  type: WS_CLOSED,
});
export const setWsStatus = (status) => ({
  type: SET_WS_STATUS,
  payload: status,
});
