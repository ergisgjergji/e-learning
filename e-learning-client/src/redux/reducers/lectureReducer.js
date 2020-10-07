import { GET_LECTURES, SET_LECTURES_LOADING, SET_LECTURES_LOADED } from '../actions/types';

const initialState = {
    lectures: [],
    loading: false
};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case GET_LECTURES:
            return {
                ...state,
                lectures: action.payload
            }

        case SET_LECTURES_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_LECTURES_LOADED:
            return {
                ...state,
                loading: false
            }

        default:
            return state;   
    }
}