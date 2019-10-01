import axios from 'axios';
import {
  ADD_ROOM_FAIL, ADD_ROOM_SUCCESS, ADD_USER_INTO_ROOM, GET_ROOMS, READ_ROOM_TEXTS, GET_ROOM_STATUS,
} from './types';
import { returnErrors } from './messages';
import { setupTokenConfig } from './auth';
import { getUsers } from './story';

// GET USER'S ROOMS
export const getRooms = () => (dispatch, getState) => {
  axios.get('/api/rooms/', setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ROOMS,
        payload: res.data,
      });
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD NEW ROOM
export const addRoom = (room) => (dispatch, getState) => {
  axios.post('/api/rooms/', room, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_ROOM_SUCCESS,
        payload: res.data,
      });
      dispatch(getRooms());
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADD_ROOM_FAIL,
      });
    });
};

// GET ROOM STATUS
export const getRoomStatus = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/rooms/${roomTitle}/`, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ROOM_STATUS,
        payload: {
          is_finished: res.data.is_finished,
        },
      });
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// ADD USER INTO ROOM
export const addUserIntoRoom = (roomTitle) => (dispatch, getState) => {
  axios.post(`/api/rooms/${roomTitle}/users/`, null, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_USER_INTO_ROOM,
        payload: res.data,
      });
      dispatch(getUsers(roomTitle));
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// READ (GET) ROOM TEXTS
export const readRoomTexts = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/rooms/${roomTitle}/read/`, setupTokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: READ_ROOM_TEXTS,
        payload: res.data,
      });
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
