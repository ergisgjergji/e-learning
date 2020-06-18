import { GET_STUDENTS, GET_TEACHERS, GET_USER, DELETE_STUDENT, DELETE_TEACHER } from '../actions/types';

const initialState = {
    students: [],
    teachers: [],
    current_user: {}
};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case GET_STUDENTS:
            return {
                ...state,
                students: action.payload
            }

        case GET_TEACHERS:
            localStorage.removeItem('token');
            return {
                ...state,
                teachers: action.payload
            };

        case GET_USER:
            return {
                ...state,
                current_user: action.payload
            };

        case DELETE_STUDENT: {
             return {
                ...state,
                students: state.students.filter(student => student.id !== action.payload)
            };
        }
        
        case DELETE_TEACHER: {
            return {
               ...state,
               teachers: state.teachers.filter(teacher => teacher.id !== action.payload)
           };
       }

        default:
            return state;
            
    }
}