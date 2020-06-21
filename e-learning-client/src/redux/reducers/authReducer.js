import { SET_USER, UPDATE_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: {}
};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                token: localStorage.getItem('token')
            }

        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: {}
            };

        case UPDATE_USER:
            const currUser = state.user;
            return {
                ...state,
                user: { ...currUser, ...action.payload }
            }

        default:
            return state;
            
    }
}