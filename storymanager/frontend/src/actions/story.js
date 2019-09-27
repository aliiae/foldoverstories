import axios from 'axios';
import { ADD_TEXT, GET_VISIBLE_TEXT } from './types';
import { createMessage, returnErrors } from './messages';
import { setupTokenConfig } from './auth';

// GET VISIBLE TEXT
export const getVisibleText = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/texts/${roomTitle}/`, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_VISIBLE_TEXT,
        payload: res.data.length > 0 ? res.data[res.data.length - 1].visible_text : '',
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
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
