import equal from 'fast-deep-equal';
import {
  ADD_ROOM_FAIL,
  ADD_ROOM_SUCCESS,
  ADD_USER_INTO_ROOM,
  CLEAR_ROOMS,
  GET_ROOM_STATUS,
  GET_ROOMS, LEAVE_ROOM,
  READ_ROOM_TEXTS,
  CLEAR_ROOM_TITLE, GET_USERS,
} from '../actions/types';

const initialState = {
  rooms: null,
  users: null,
  userLeftRoom: null,
  userCanWriteNow: null,
  texts: null,
  finishedAt: null,
  roomTitle: null,
  currentTurnUsername: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM_SUCCESS:
      return { ...state, ...action.payload };
    case ADD_USER_INTO_ROOM: // no response
      return state;
    case GET_ROOM_STATUS: {
      const { rooms, texts, ...oldState } = state;
      if (equal(oldState, action.payload)) {
        return state;
      }
      return { ...state, ...action.payload };
    }
    case GET_USERS:
      if (equal(state.users, action.payload)) {
        return state;
      }
      return {
        ...state,
        users: action.payload,
      };
    case LEAVE_ROOM:
      if (state.userLeftRoom) {
        return state;
      }
      return {
        ...state,
        userLeftRoom: true,
      };
    case READ_ROOM_TEXTS:
      if (equal(state.texts, action.payload)) {
        return state;
      }
      return {
        ...state,
        texts: action.payload,
      };
    case GET_ROOMS:
      if (equal(state.rooms, action.payload)) {
        return state;
      }
      return {
        ...state,
        rooms: action.payload,
      };
    case ADD_ROOM_FAIL:
      return state;
    case CLEAR_ROOMS:
      return {
        ...state,
        rooms: null,
      };
    case CLEAR_ROOM_TITLE:
      return {
        ...state,
        roomTitle: null,
      };
    default:
      return state;
  }
}
