import {
  ADD_TEXT, CLEAR_STORY, GET_VISIBLE_TEXT, LAST_TURN,
} from '../actions/types';

const initialState = {
  visibleText: null,
  isLastTurn: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VISIBLE_TEXT:
    case ADD_TEXT:
      return {
        ...state,
        ...action.payload,
      };
    case LAST_TURN:
      if (state.isLastTurn === true) {
        return state;
      }
      return {
        ...state,
        isLastTurn: true,
      };
    case CLEAR_STORY:
      return initialState;
    default:
      return state;
  }
}
