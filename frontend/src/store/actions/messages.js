import { CLEAR_ERROR, GET_ERRORS } from './types';

// RETURN ERRORS
export default function returnErrors(msg, status) {
  return {
    type: GET_ERRORS,
    payload: {
      msg,
      status,
    },
  };
}

export function clearErrors() {
  return { type: CLEAR_ERROR };
}
