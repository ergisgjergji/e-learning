import { GET_TESTBASE_LIST, GET_STUDENT_COMPLETED_TESTS } from '../actions/types';

const initialState = {
    testbase_list: [],
    student_completed_tests: []
};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case GET_TESTBASE_LIST:
            return {
                ...state,
                testbase_list: action.payload
            }
        
        case GET_STUDENT_COMPLETED_TESTS:
            return {
                ...state,
                student_completed_tests: action.payload
            }

        default:
            return state;   
    }
}