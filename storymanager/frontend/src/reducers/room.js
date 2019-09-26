import {
  ADD_ROOM_FAIL, ADD_ROOM_SUCCESS, CLEAR_ROOMS, GET_ROOMS,
} from '../actions/types';

const initialState = { rooms: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM_SUCCESS:
      return {
        ...state,
        ...action.payload,
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
