import {
  ADD_TEXT, GET_USERS, GET_VISIBLE_TEXT, LAST_TURN, WRONG_TURN,
} from '../actions/types';

const initialState = {
  visible_text: '',
  users: [],
  correct_turn: true,
  room: null,
  current_turn_username: null,
  last_turn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VISIBLE_TEXT:
    case ADD_TEXT:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case WRONG_TURN:
      return {
        ...state,
        current_turn_username: action.payload,
        correct_turn: false,
      };
    case LAST_TURN: // TODO
      return {
        ...state,
        last_turn: true,
      };
    default:
      return state;
  }
}
