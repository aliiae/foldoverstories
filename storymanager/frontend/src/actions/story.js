import axios from 'axios';
import {ADD_TEXT, GET_VISIBLE_TEXT} from './types';

// GET VISIBLE TEXT
export const getVisibleText = () => dispatch => {
    axios.get('/api/room_texts/')
        .then(res => {
            dispatch({
                type: GET_VISIBLE_TEXT,
                payload: res.data.length > 0 ? res.data[res.data.length - 1].visible_text : ""
            });
        }).catch(err => console.log(err));
};

// ADD NEW TEXT
export const addText = text => dispatch => {
    axios.post('/api/room_texts/', text)
        .then(res => {
            dispatch({
                type: ADD_TEXT,
                payload: res.data
            });
        }).catch(err => console.log(err));
};