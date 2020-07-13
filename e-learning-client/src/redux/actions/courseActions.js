import axios from 'axios';
import { GET_COURSES, GET_COURSE, DELETE_COURSE, GET_REGISTERED_STUDENTS, GET_NONREGISTERED_STUDENTS, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';

import { toast } from 'react-toastify';
import validateError from './serverError';

export const getCourses = () => dispatch => {

    axios.get("/api/course/all")
        .then(res => {
            dispatch({
                type: GET_COURSES,
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
};

export const deleteCourse = (id, notificationMessage) => dispatch => {
    
    axios.delete(`/api/course/${id}`)
        .then(res => {

            toast.info(notificationMessage);
            dispatch({
                type: DELETE_COURSE,
                payload: id
            })
        })
        .catch(err => {
            validateError(err);
        });
};

export const addCourse = (course, history, notificationMessage) => dispatch => {

    axios.post("/api/course", course)
        .then(res => {

            history.push('/teacherPanel');
            toast.success(notificationMessage);
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

export const getCourseById = (id, history) => dispatch => {

    axios.get(`/api/course/${id}`)
        .then(res => {
            dispatch({
                type: GET_COURSE,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            validateError(err);
            history.goBack();
        });
};

export const updateCourse = (course, history, notificationMessage) => dispatch => {

    axios.put("/api/course", course)
        .then(res => {
            
            history.push('/teacherPanel');
            toast.success(notificationMessage);
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

export const getRegisteredStudents = (id) => dispatch => {

    axios.get(`/api/course/${id}/students/registered`)
        .then(res => {
            dispatch({
                type: GET_REGISTERED_STUDENTS,
                payload: res.data
            });
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

export const getNonRegisteredStudents = (id) => dispatch => {

    axios.get(`/api/course/${id}/students/not-registered`)
        .then(res => {
            dispatch({
                type: GET_NONREGISTERED_STUDENTS,
                payload: res.data
            });
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

export const registerStudent = (course_id, student_id, notificationMessage) => dispatch => {

    axios.post(`/api/course/${course_id}/students/${student_id}`)
        .then(res => {

            toast.dismiss();
            toast.info(notificationMessage)
            
            dispatch(getRegisteredStudents(course_id));
            dispatch(getNonRegisteredStudents(course_id));
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