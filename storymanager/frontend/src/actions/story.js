import axios from 'axios';
import { getRooms } from './room';
import {
  ADD_TEXT, GET_USERS, GET_VISIBLE_TEXT, WRONG_TURN,
} from './types';
import { returnErrors } from './messages';
import { setupTokenConfig } from './auth';

const getLastItemOrEmpty = (array) => {
  if (array.length === 0) return '';
  return array[array.length - 1];
};

// GET VISIBLE TEXT
export const getVisibleText = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/texts/${roomTitle}/`, setupTokenConfig(getState))
    .then((res) => {
      const lastItem = getLastItemOrEmpty(res.data);
      dispatch({
        type: GET_VISIBLE_TEXT,
        payload: {
          visible_text: lastItem.visible_text,
          room: lastItem.room,
        },
      });
    }).catch((err) => {
      if (err.response.data.detail === 'Incorrect turn') {
        dispatch({ type: WRONG_TURN });
      } else {
        dispatch(returnErrors(err.response.data, err.response.status));
      }
    });
};

// GET ROOM'S USERS
export const getUsers = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/rooms/${roomTitle}/users/`, setupTokenConfig(getState))
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
      dispatch({
        type: ADD_TEXT,
        payload: res.data,
      });
      dispatch(getUsers(roomTitle));
      // dispatch(getRooms());
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
