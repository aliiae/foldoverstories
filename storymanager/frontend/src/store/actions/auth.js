import axios from 'axios';
import { returnErrors } from './messages';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL, REGISTER_SUCCESS, CLEAR_ROOMS,
} from './types';
import { getRooms } from './room';
import { setupTokenConfig } from './utils';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios.get('/api/auth/user', setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, password });
  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(getRooms());
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    });
};


export const logout = () => (dispatch, getState) => {
  axios.post('/api/auth/logout/', null, setupTokenConfig(getState))
    .then(() => {
      dispatch({ type: CLEAR_ROOMS });
      dispatch({ type: LOGOUT_SUCCESS });
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const register = ({ username, password }) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, password });
  axios.post('/api/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL, payload: err.response.data,
      });
    });
};