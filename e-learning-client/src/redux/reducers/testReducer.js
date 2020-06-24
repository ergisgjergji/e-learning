import { GET_TESTBASE_LIST } from '../actions/types';

const initialState = {
    testbase_list: []
};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case GET_TESTBASE_LIST:
            return {
                ...state,
                testbase_list: action.payload
            }

        default:
            return state;   
    }
}