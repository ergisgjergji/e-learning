import { GET_ASSIGNMENTS, SET_ASSIGNMENTS_LOADING, SET_ASSIGNMENTS_LOADED, GET_SOLUTIONS, SET_SOLUTIONS_LOADING, SET_SOLUTIONS_LOADED } from '../actions/types';

const initialState = {
    assignments: [],
    solutions: [],
    loading: false
};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case GET_ASSIGNMENTS:
            return {
                ...state,
                assignments: action.payload
            }

        case GET_SOLUTIONS:
            return {
                ...state,
                solutions: action.payload
            }

        case SET_ASSIGNMENTS_LOADING:
        case SET_SOLUTIONS_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_ASSIGNMENTS_LOADED:
        case SET_SOLUTIONS_LOADED:
            return {
                ...state,
                loading: false
            }

        default:
            return state;   
    }
}