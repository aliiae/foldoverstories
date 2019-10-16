import axios from 'axios';
import {
  ADD_ROOM_FAIL,
  ADD_ROOM_SUCCESS,
  ADD_USER_INTO_ROOM,
  GET_ROOMS,
  READ_ROOM_TEXTS,
  GET_ROOM_STATUS,
  LEAVE_ROOM,
} from './types';
import { returnErrors } from './messages';
import { clearStory, getUsers, getVisibleText } from './story';
import { setupTokenConfig } from './utils';

// GET USER'S ROOMS
export const getRooms = (pageNumber = 1) => (dispatch, getState) => {
  axios.get(`/api/rooms/?page=${pageNumber}`, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ROOMS,
        payload: res.data,
      });
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

/* Needed for going back on home page from the editor */
export const clearRoomTitle = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ROOM_TITLE' });
};

// ADD NEW ROOM
export const addRoom = (room) => (dispatch, getState) => {
  axios.post('/api/rooms/', room, setupTokenConfig(getState))
    .then((res) => {
      dispatch(clearStory());
      dispatch({
        type: ADD_ROOM_SUCCESS,
        payload: res.data,
      });
      dispatch(clearRoomTitle());
      dispatch(getUsers(res.data.room_title));
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
          user_left_room: res.data.user_left_room,
          user_can_write_now: res.data.user_can_write_now,
          finished_at: res.data.finished_at,
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
      dispatch(getVisibleText(roomTitle));
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// READ (GET) ROOM TEXTS
export const readRoomTexts = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/rooms/${roomTitle}/read/`, setupTokenConfig(getState))
    .then((res) => {
      dispatch(getUsers(roomTitle));
      dispatch({
        type: READ_ROOM_TEXTS,
        payload: res.data,
      });
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// LEAVE ROOM
export const leaveRoom = (roomTitle) => (dispatch, getState) => {
  axios.post(`/api/rooms/${roomTitle}/leave/`, {}, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LEAVE_ROOM,
        payload: res.data,
      });
      dispatch(getUsers(roomTitle));
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
