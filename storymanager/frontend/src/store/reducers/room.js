import equal from 'fast-deep-equal';
import { CLEAR_ROOMS, GET_ROOMS } from '../actions/types';

const initialState = {
  rooms: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      if (equal(state.rooms, action.payload)) {
        return state;
      }
      return {
        ...state,
        rooms: action.payload,
      };
    case CLEAR_ROOMS:
      return {
        ...state,
        rooms: null,
      };
    default:
      return state;
  }
}
