import equal from 'fast-deep-equal';
import {
  ADD_ROOM_FAIL,
  ADD_ROOM_SUCCESS,
  ADD_TEXT,
  ADD_USER_INTO_ROOM, CLEAR_ROOM_TITLE,
  CLEAR_STORY,
  GET_ROOM_STATUS,
  GET_USERS,
  GET_VISIBLE_TEXT,
  LAST_TURN, LEAVE_ROOM, READ_ROOM_TEXTS,
} from '../actions/types';
import { STOPPED } from '../../components/userStatus';

const initialState = {
  visibleText: null,
  isLastTurn: null,
  users: null,
  userStatus: null,
  finishedAt: null,
  roomTitle: null,
  currentTurnUsername: null,
  texts: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VISIBLE_TEXT:
      if (state.visibleText === action.payload) {
        return state;
      }
      return {
        ...state,
        ...action.payload,
      };
    case ADD_TEXT:
      return {
        ...state,
        visibleText: action.payload.visibleText,
      };
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
      if (state.userStatus === STOPPED) {
        return state;
      }
      return {
        ...state,
        userStatus: STOPPED,
      };
    case READ_ROOM_TEXTS:
      if (equal(state.texts, action.payload)) {
        return state;
      }
      return {
        ...state,
        texts: action.payload,
      };
    case CLEAR_ROOM_TITLE:
      return {
        ...state,
        roomTitle: null,
      };
    case ADD_ROOM_FAIL:
      return state;
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
