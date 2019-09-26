import { CREATE_MESSAGE, GET_ERRORS } from './types';

// CREATE MESSAGE
export const createMessage = (msg) => ({
  type: CREATE_MESSAGE,
  payload: msg,
});

// RETURN ERRORS
export const returnErrors = (msg, status) => ({
  type: GET_ERRORS,
  payload: { msg, status },
});
