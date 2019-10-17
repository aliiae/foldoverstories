import axios from 'axios';
import {
  ADD_ROOM_FAIL,
  ADD_ROOM_SUCCESS,
  ADD_USER_INTO_ROOM,
  GET_ROOMS,
  READ_ROOM_TEXTS,
  GET_ROOM_STATUS,
  LEAVE_ROOM, GET_USERS,
} from './types';
import { returnErrors } from './messages';
import { clearStory } from './story';
import setupTokenConfig from './setupTokenConfig';


// GET USER'S ROOMS
export const getRooms = (pageNumber = 1) => (dispatch, getState) => {
  axios.get(`/api/rooms/?page=${pageNumber}`, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ROOMS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

/* Needed for going back on home page from the editor */
export const clearRoomTitle = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ROOM_TITLE' });
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

// ADD NEW ROOM
export const addRoom = (room) => (dispatch, getState) => {
  dispatch(clearStory());
  axios.post('/api/rooms/', room, setupTokenConfig(getState))
    .then((res) => {
      dispatch(getUsers(res.data.room_title));
      dispatch({
        type: ADD_ROOM_SUCCESS,
        payload: {
          roomTitle: res.data.room_title,
          finishedAt: res.data.finished_at,
          modifiedAt: res.data.modified_at,
          userLeftRoom: res.data.user_left_room,
          userCanWriteNow: res.data.user_can_write_now,
        },
      });
    })
    .catch((err) => {
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
          roomTitle: res.data.room_title,
          finishedAt: res.data.finished_at,
          userLeftRoom: res.data.user_left_room,
          userCanWriteNow: res.data.user_can_write_now,
          currentTurnUsername: res.data.current_turn_username,
        },
      });
    })
    .catch((err) => {
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
      dispatch(getRoomStatus(roomTitle));
    })
    .catch((err) => {
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
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
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
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
