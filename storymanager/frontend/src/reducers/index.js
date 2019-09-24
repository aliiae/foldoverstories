import {combineReducers} from 'redux';
import story from './story';
import errors from './errors';
import messages from "./messages";

export default combineReducers({
    story,
    errors,
    messages
});