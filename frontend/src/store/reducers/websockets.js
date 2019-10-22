import {
  USER_ONLINE, USER_OFFLINE, WS_CONNECTING, WS_OPENED, WS_CLOSED, SET_WS_STATUS,
} from '../actions/types';

const initialState = {
  isOnline: true,
  ws: {
    connecting: false,
    opened: false,
    status: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_ONLINE:
      return { ...state, isOnline: true };
    case USER_OFFLINE:
      return { ...state, isOnline: false };
    case WS_CONNECTING:
      return { ...state, ws: { ...state.ws, connecting: true } };
    case WS_OPENED:
      return { ...state, ws: { ...state.ws, connecting: false, opened: true } };
    case WS_CLOSED:
      return { ...state, ws: { ...state.ws, connecting: false, opened: false } };
    case SET_WS_STATUS:
      return { ...state, ws: { ...state.ws, status: action.payload } };
    default:
      return state;
  }
}
