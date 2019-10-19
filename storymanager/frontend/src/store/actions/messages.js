import { GET_ERRORS } from './types';

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
