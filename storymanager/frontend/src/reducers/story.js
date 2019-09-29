import {
  ADD_TEXT, GET_USERS, GET_VISIBLE_TEXT, WRONG_TURN,
} from '../actions/types';

const initialState = {
  visible_text: '',
  usernames: [],
  correct_turn: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VISIBLE_TEXT:
      return {
        ...state,
        visible_text: action.payload,
      };
    case ADD_TEXT:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        usernames: action.payload.users.map((user) => user.username),
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
