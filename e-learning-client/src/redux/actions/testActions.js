import axios from 'axios';
import { GET_TESTBASE_LIST, GET_STUDENT_COMPLETED_TESTS, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';
import store from './../store';

export const getTestBaseList = (id) => dispatch => {

    axios.get(`/api/testbase/${id}/all`)
        .then(res => {
            dispatch({
                type: GET_TESTBASE_LIST,
                payload: res.data
            })
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const addTest = (id, testBase, fromRoute, history) => dispatch => {
    
    axios.post(`/api/testbase/${id}`, testBase)
        .then(res => {

            if(fromRoute)
                history.push({
                    pathname: fromRoute,
                    notification_message: "Test created successfully."
                });
            else
                history.push({
                    pathname: "/teacherPanel",
                    notification_message: "Test created successfully."
                });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            history.push("/teacherPanel");
        });
}

export const getStudentCompletedTests = (course_id, student_id, history) => dispatch => {

    axios.get(`/api/test/${course_id}/${student_id}/completed`)
        .then(res => {
            dispatch({
                type: GET_STUDENT_COMPLETED_TESTS,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            history.goBack();
        })
}