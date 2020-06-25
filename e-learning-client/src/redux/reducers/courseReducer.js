import { GET_COURSES, GET_COURSE, DELETE_COURSE, GET_REGISTERED_STUDENTS, GET_NONREGISTERED_STUDENTS } from '../actions/types';

const initialState = {
    courses: [],
    current_course: {},
    registered_students: [],
    nonregistered_students: []
};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case GET_COURSES:
            return {
                ...state,
                courses: action.payload
            }

        case GET_COURSE:
            return {
                ...state,
                current_course: action.payload
            }

        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course.id !== action.payload)
            }

        case GET_REGISTERED_STUDENTS:
            return {
                ...state,
                registered_students: action.payload
            }

        case GET_NONREGISTERED_STUDENTS:
            return {
                ...state,
                nonregistered_students: action.payload
            }

        default:
            return state;   
    }
}