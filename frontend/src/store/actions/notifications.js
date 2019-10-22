import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types';
import createNotification from '../../factories/createNotification';

export function addNotification(options = {}) {
  return {
    type: ADD_NOTIFICATION,
    payload: createNotification(options),
  };
}

export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: id,
  };
}
