import axios from 'axios';
import {ADD_ROOM_FAIL, ADD_ROOM_SUCCESS, GET_ROOMS, REGISTER_FAIL} from './types';
import {returnErrors} from "./messages";
import {setupTokenConfig} from "./auth";

// GET USER'S ROOMS
export const getRooms = () => (dispatch, getState) => {
  axios.get('/api/rooms/', setupTokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ROOMS,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD NEW ROOM
export const addRoom = room => (dispatch, getState) => {
  axios.post('/api/rooms/', room, setupTokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_ROOM_SUCCESS,
        payload: res.data
      });
    }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: ADD_ROOM_FAIL,
      payload: err.response.status
    });
  });
};
