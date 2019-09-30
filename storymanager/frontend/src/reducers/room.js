import {
  ADD_ROOM_FAIL,
  ADD_ROOM_SUCCESS,
  ADD_USER_INTO_ROOM,
  CLEAR_ROOMS,
  GET_ROOM_STATUS,
  GET_ROOMS,
  READ_ROOM_TEXTS,
} from '../actions/types';

const initialState = { rooms: [], texts: [], is_finished: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM_SUCCESS:
    case ADD_USER_INTO_ROOM:
    case GET_ROOM_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    case READ_ROOM_TEXTS:
      return {
        ...state,
        texts: action.payload,
      };
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case ADD_ROOM_FAIL:
      return {
        ...state,
        status: action.payload,
      };
    case CLEAR_ROOMS:
      return {
        ...state,
        rooms: [],
      };
    default:
      return state;
  }
}
