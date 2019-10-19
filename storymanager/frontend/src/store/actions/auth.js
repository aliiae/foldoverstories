import axios from 'axios';
import returnErrors from './messages';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  AUTH_GUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_ROOMS,
} from './types';
import setupTokenConfig from './setupTokenConfig';


export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  if (!getState().auth.token) {
    return dispatch({ type: AUTH_GUEST });
  }
  return axios.get('/api/auth/user', setupTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    username,
    password,
  });
  return axios.post('/api/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
      });
    });
};


// eslint-disable-next-line arrow-body-style
export const logout = () => (dispatch, getState) => {
  return axios.post('/api/auth/logout/', null, setupTokenConfig(getState))
    .then(() => {
      dispatch({ type: CLEAR_ROOMS });
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const register = ({ username, password }) => (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const body = JSON.stringify({
    username,
    password,
  });
  return axios.post('/api/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
    });
};
