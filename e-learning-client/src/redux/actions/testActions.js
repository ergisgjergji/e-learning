import axios from 'axios';
import { GET_TESTBASE_LIST, GET_STUDENT_COMPLETED_TESTS, GET_TEST, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';

import { toast } from 'react-toastify';
import validateError from './serverError';

export const getTestBaseList = (id) => dispatch => {

    axios.get(`/api/testbase/${id}/all`)
        .then(res => {

            // Sort tests by 'id'
            let tests = res.data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
            tests.map(t => {
                // Sort questions by 'type'
                t.questions.sort((a,b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0));
            }) 

            dispatch({
                type: GET_TESTBASE_LIST,
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

export const addTest = (id, testBase, fromRoute, history, notificationMessage) => dispatch => {
    
    axios.post(`/api/testbase/${id}`, testBase)
        .then(res => {

            if(fromRoute)
                history.push(fromRoute);
            else
                history.push('/teacherPanel');
                
            toast.success(notificationMessage)
            dispatch(clearErrors());
        })
        .catch(err => {
            validateError(err);
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

            // Sort tests by 'id'
            let tests = res.data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
            tests.map(t => {
                // Sort questions by 'type'
                t.questions.sort((a,b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0));
            })            

            dispatch({
                type: GET_STUDENT_COMPLETED_TESTS,
                payload: tests
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            history.goBack();
        })
}

export const getTestById = (course_id, test_id, history) => dispatch => {

    axios.get(`/api/test/${course_id}/${test_id}`)
        .then(res => {

            // Sort questions by 'type'
            let test = res.data;
            test.questions.sort((a,b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0));

            dispatch({
                type: GET_TEST,
                payload: test
            });
                
            dispatch(clearErrors());
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            history.goBack();
        });
}

export const submitTest = (test, history, notificationMessage) => dispatch => {

    axios.post('/api/test', test)
        .then(res => {

            history.push('/studentPanel');
            toast.success(notificationMessage);
            dispatch({
                type: GET_TEST,
                payload: {}
            });
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const asyncSubmit = (test) => dispatch => {

    axios.post('/api/test', test)
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
}