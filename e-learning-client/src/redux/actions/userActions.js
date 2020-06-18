import axios from 'axios';
import { GET_STUDENTS, GET_TEACHERS, GET_USER, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';

export const getStudents = () => dispatch => {

    axios.get("/api/user/students")
        .then(res => {
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const getTeachers = () => dispatch => {

    axios.get("/api/user/teachers")
        .then(res => {
            dispatch({
                type: GET_TEACHERS,
                payload: res.data
            })
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const getUserById = (id, history) => dispatch => {

    axios.get(`/api/user/${id}`)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => history.push("/adminPanel"));
};