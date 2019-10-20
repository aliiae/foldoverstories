import { combineReducers } from 'redux';
import story from './story';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import room from './room';
import websockets from './websockets';
import notifications from './notifications';

export default combineReducers({
  story,
  room,
  errors,
  messages,
  auth,
  websockets,
  notifications,
});
