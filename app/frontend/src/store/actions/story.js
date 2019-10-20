import axios from 'axios';
import {
  ADD_TEXT,
  GET_VISIBLE_TEXT,
  WRONG_TURN,
  LAST_TURN,
  LEAVE_ROOM,
  ADD_ROOM_SUCCESS,
  ADD_ROOM_FAIL,
  GET_ROOM_STATUS, ADD_USER_INTO_ROOM, READ_ROOM_TEXTS, GET_USERS,
} from './types';
import returnErrors from './messages';
import setupTokenConfig from './setupTokenConfig';


// GET VISIBLE TEXT
export const getVisibleText = (roomTitle) => (dispatch, getState) => {
  axios.get(`/api/texts/${roomTitle}/`, setupTokenConfig(getState))
    .then((res) => {
      const lastItem = res.data.length > 0 ? res.data[0] : {};
      dispatch({
        type: GET_VISIBLE_TEXT,
        payload: {
          visibleText: lastItem.visibleText || '',
        },
      });
    })
    .catch((err) => {
      if (err.response.data.currentTurnUsername) {
        dispatch({
          type: WRONG_TURN,
          payload: err.response.data.currentTurnUsername,
        });
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
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const clearStory = () => (dispatch) => {
  dispatch({ type: 'CLEAR_STORY' });
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
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD NEW ROOM
export const addRoom = () => (dispatch, getState) => {
  dispatch(clearStory());
  return axios.post('/api/rooms/', null, setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_ROOM_SUCCESS,
        payload: res.data,
      });
      return res.data.roomTitle;
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
        payload: res.data,
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
