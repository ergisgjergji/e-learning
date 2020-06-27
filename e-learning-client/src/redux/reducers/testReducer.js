import { GET_TESTBASE_LIST, GET_STUDENT_COMPLETED_TESTS, GET_TEST } from '../actions/types';

const initialState = {
    testbase_list: [],
    student_completed_tests: [],
    current_test: {}
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

        case GET_TEST:
            return {
                ...state,
                current_test: action.payload
            }

        default:
            return state;   
    }
}