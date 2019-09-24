import {combineReducers} from 'redux';
import story from './story';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
    story,
    errors,
    messages,
    auth
});