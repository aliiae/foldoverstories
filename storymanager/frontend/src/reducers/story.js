import {ADD_TEXT, GET_VISIBLE_TEXT} from "../actions/types";

const initialState = {
    visible_text: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VISIBLE_TEXT:
            return {
                ...state,
                visible_text: action.payload
            };
        case ADD_TEXT:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}