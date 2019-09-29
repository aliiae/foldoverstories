import axios from 'axios';
import {
  ADD_TEXT, GET_USERS, GET_VISIBLE_TEXT, WRONG_TURN,
} from './types';
import { createMessage, returnErrors } from './messages';
import { setupTokenConfig } from './auth';

const getLastItemOrEmpty = (array) => {
  if (array.length === 0) return '';
  return array[array.length - 1];
};

// GET VISIBLE TEXT
export const getVisibleText = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/texts/${roomTitle}/`, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_VISIBLE_TEXT,
        payload: getLastItemOrEmpty(res.data).visible_text,
      });
    }).catch((err) => {
      if (err.response.data.detail === 'Incorrect turn') {
        dispatch({ type: WRONG_TURN });
      } else {
        dispatch(returnErrors(err.response.data, err.response.status));
      }
    });
};

export const getUsers = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/rooms/${roomTitle}/`, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD NEW TEXT
export const addText = (text, roomTitle) => (dispatch, getState) => {
  axios.post(`/api/texts/${roomTitle}/`, text, setupTokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addText: 'Thank you, your text has been added' }));
      dispatch({
        type: ADD_TEXT,
        payload: res.data,
      });
      dispatch(getUsers(roomTitle));
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
