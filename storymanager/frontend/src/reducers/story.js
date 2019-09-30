import {
  ADD_TEXT, GET_USERS, GET_VISIBLE_TEXT, WRONG_TURN,
} from '../actions/types';

const initialState = {
  visible_text: '',
  users: [],
  correct_turn: true,
  room: null,
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
        correct_turn: false,
      };
    default:
      return state;
  }
}
