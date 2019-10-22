import axios from 'axios';
import { GET_ROOMS } from './types';
import returnErrors from './messages';
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
