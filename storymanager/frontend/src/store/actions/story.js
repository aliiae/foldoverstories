import axios from 'axios';
import {
  ADD_TEXT, GET_VISIBLE_TEXT, WRONG_TURN, LAST_TURN, LEAVE_ROOM,
} from './types';
import { returnErrors } from './messages';
import setupTokenConfig from './setupTokenConfig';


// GET VISIBLE TEXT
export const getVisibleText = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/texts/${roomTitle}/`, setupTokenConfig(getState))
    .then((res) => {
      const lastItem = res.data ? res.data[0] : {};
      dispatch({
        type: GET_VISIBLE_TEXT,
        payload: {
          visibleText: lastItem.visible_text || '',
        },
      });
    }).catch((err) => {
      if (err.response.data.current_turn_username) {
        dispatch({ type: WRONG_TURN, payload: err.response.data.current_turn_username });
      } else if (err.response.data.isLastTurn) {
        dispatch({ type: LAST_TURN });
        dispatch({ type: LEAVE_ROOM });
      } else {
        dispatch(returnErrors(err.response.data, err.response.status));
      }
    });
};

// ADD NEW TEXT
export const addText = (text, roomTitle) => (dispatch, getState) => {
  axios.post(`/api/texts/${roomTitle}/`, text, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_TEXT,
        payload: res.data,
      });
      // dispatch(getUsers(roomTitle)); // updates users' text count
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const clearStory = () => (dispatch) => {
  dispatch({ type: 'CLEAR_STORY' });
};
