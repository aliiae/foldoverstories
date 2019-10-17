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
  texts: null,
  finishedAt: null,
  roomTitle: null,
  currentTurnUsername: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM_SUCCESS:
    case ADD_USER_INTO_ROOM:
    case GET_ROOM_STATUS:
      return { ...state, ...action.payload };
    case GET_USERS:
      if (JSON.stringify(state.users) === JSON.stringify(action.payload)) {
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
      if (state.texts === action.payload) {
        return state;
      }
      return {
        ...state,
        texts: action.payload,
      };
    case GET_ROOMS:
      if (state.rooms === action.payload) {
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
        rooms: [],
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
