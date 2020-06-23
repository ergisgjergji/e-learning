import axios from 'axios';
import { GET_COURSES, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';
import store from './../store';

export const getCourses = () => dispatch => {

    axios.get("/api/course/all")
        .then(res => {
            dispatch({
                type: GET_COURSES,
                payload: res.data
            })
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};