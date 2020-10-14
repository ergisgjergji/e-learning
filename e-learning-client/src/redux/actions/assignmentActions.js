import axios from 'axios';
import { GET_ASSIGNMENTS, GET_SOLUTIONS, SET_ASSIGNMENTS_LOADING, SET_ASSIGNMENTS_LOADED, SET_SOLUTIONS_LOADING, SET_SOLUTIONS_LOADED, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';

import { toast } from 'react-toastify';
import validateError from './serverError';

export const getCourseAssignments = (course_name) => dispatch => {

    dispatch({ type: SET_ASSIGNMENTS_LOADING });

    axios.get(`/api/assignments/${course_name}/all`)
        .then(res => {
            dispatch({
                type: GET_ASSIGNMENTS,
                payload: res.data
            })
            dispatch({ type: SET_ASSIGNMENTS_LOADED });
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

export const getStudentAssignments = () => dispatch => {

    axios.get('/api/assignments/all')
        .then(res => {
            dispatch({
                type: GET_ASSIGNMENTS,
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

export const addAssignment = (course_name, formData, notification_message) => dispatch => {

    axios.post(`/api/assignments/${course_name}`, formData)
        .then(res => {
            toast.success(notification_message);
            dispatch(getCourseAssignments(course_name));
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

export const deleteAssignment = (course_name, assignment_id, notification_message) => dispatch => {

    axios.delete(`/api/assignments/${course_name}/${assignment_id}`)
        .then(res => {
            toast.info(notification_message);
            dispatch(getCourseAssignments(course_name));
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

export const getAssignmentSolutions = (assignment_id) => dispatch => {

    dispatch({ type: SET_SOLUTIONS_LOADING });
    
    axios.get(`/api/assignments/${assignment_id}/solutions`)
        .then(res => {
            dispatch({
                type: GET_SOLUTIONS,
                payload: res.data
            });
            dispatch({ type: SET_SOLUTIONS_LOADED });
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

export const gradeSolution = (assignment_id, solution_id, formData, notification_message) => dispatch => {

    axios.post(`/api/solutions/${solution_id}/grade`, formData)
        .then(res => {
            toast.info(notification_message);
            dispatch(getAssignmentSolutions(assignment_id));
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

export const uploadSolution = (solution, formData, notification_message) => dispatch => {

    axios.post(`/api/solutions/${solution.id}`, formData)
        .then(res => {
            toast.info(notification_message);
            dispatch(getCourseAssignments(solution.course_name));
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