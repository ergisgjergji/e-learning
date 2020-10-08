import axios from 'axios';
import { GET_LECTURES, SET_LECTURES_LOADING, SET_LECTURES_LOADED, ADD_LECTURE_MATERIALS, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';

import { toast } from 'react-toastify';
import validateError from './serverError';

export const getLectures = (course_name) => dispatch => {

    dispatch({ type: SET_LECTURES_LOADING });

    axios.get(`/api/lectures/${course_name}/all`)
        .then(res => {

            const lectures = res.data;
            // Sort by 'id' ASC
            lectures.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

            dispatch({
                type: GET_LECTURES,
                payload: lectures
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

export const addLecture = (course_name, formData, notification_message) => dispatch => {

    axios.post(`/api/lectures/${course_name}`, formData)
        .then(res => {
            toast.success(notification_message);
            dispatch(getLectures(course_name));
            dispatch(clearErrors());
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const deleteLecture = (course_name, lecture_id, notification_message) => dispatch => {

    axios.delete(`/api/lectures/${course_name}/${lecture_id}`)
        .then(res => {
            toast.info(notification_message);
            dispatch(getLectures(course_name));
            dispatch(clearErrors());
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const addLectureMaterials = (course_name, lecture_id, formData, notification_message) => dispatch => {

    axios.post(`/api/lectures/${course_name}/${lecture_id}`, formData)
        .then(res => {

            toast.success(notification_message);
            dispatch({
                type: ADD_LECTURE_MATERIALS,
                payload: res.data
            })
            dispatch(clearErrors());
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}