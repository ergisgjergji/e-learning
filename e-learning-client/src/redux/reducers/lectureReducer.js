import { GET_LECTURES, SET_LECTURES_LOADING, SET_LECTURES_LOADED, ADD_LECTURE_MATERIALS, REMOVE_MATERIAL } from '../actions/types';

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

        case ADD_LECTURE_MATERIALS:
        case REMOVE_MATERIAL:
            let lectures = [...state.lectures];
            let modified_lecture = action.payload;
            let index = lectures.findIndex((lect => lect.id === modified_lecture.id));
            lectures[index] = modified_lecture;
            return {
                ...state,
                lectures
            }

        default:
            return state;   
    }
}