import axios from 'axios';
import { GET_LECTURES, SET_LECTURES_LOADING, SET_LECTURES_LOADED, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';

import { toast } from 'react-toastify';
import validateError from './serverError';

export const getLectures = (course_name) => dispatch => {

    dispatch({ type: SET_LECTURES_LOADING });

    axios.get(`/api/lectures/${course_name}/all`)
        .then(res => {
            dispatch({
                type: GET_LECTURES,
                payload: res.data
            });
            dispatch({ type: SET_LECTURES_LOADED });
            dispatch(clearErrors());
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};