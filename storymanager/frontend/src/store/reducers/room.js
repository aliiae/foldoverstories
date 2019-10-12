import {
  ADD_ROOM_FAIL,
  ADD_ROOM_SUCCESS,
  ADD_USER_INTO_ROOM,
  CLEAR_ROOMS,
  GET_ROOM_STATUS,
  GET_ROOMS, LEAVE_ROOM,
  READ_ROOM_TEXTS,
  CLEAR_ROOM_TITLE,
} from '../actions/types';

const initialState = {
  rooms: null,
  user_left_room: null,
  texts: [],
  is_finished: null,
  finished_at: null,
  room_title: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM_SUCCESS:
    case ADD_USER_INTO_ROOM:
    case GET_ROOM_STATUS:
      return { ...state, ...action.payload };
    case LEAVE_ROOM:
      return { ...state, user_left_room: true };
    case READ_ROOM_TEXTS:
      return { ...state, texts: action.payload };
    case GET_ROOMS:
      return { ...state, rooms: action.payload };
    case ADD_ROOM_FAIL:
      return { ...state, status: action.payload };
    case CLEAR_ROOMS:
      return { ...state, rooms: [] };
    case CLEAR_ROOM_TITLE:
      return { ...state, room_title: null };
    default:
      return state;
  }
}
