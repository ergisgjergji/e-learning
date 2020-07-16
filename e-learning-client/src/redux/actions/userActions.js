import axios from 'axios';
import { GET_STUDENTS, GET_TEACHERS, GET_USER, DELETE_STUDENT, DELETE_TEACHER, UPDATE_USER, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';
import store from './../store';

import { toast } from 'react-toastify';
import validateError from './serverError';

export const getStudents = () => dispatch => {

    axios.get("/api/user/students")
        .then(res => {
            dispatch({
                type: GET_STUDENTS,
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

export const getTeachers = () => dispatch => {

    axios.get("/api/user/teachers")
        .then(res => {
            dispatch({
                type: GET_TEACHERS,
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

export const getUserById = (id, history) => dispatch => {

    axios.get(`/api/user/${id}`)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
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
};

export const deleteStudent = (id, notificationMessage) => dispatch => {
    
    axios.delete(`/api/user/${id}`)
        .then(res => {

            toast.info(notificationMessage);
            dispatch({
                type: DELETE_STUDENT,
                payload: id
            });
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const deleteTeacher = (id, notificationMessage) => dispatch => {
    
    axios.delete(`/api/user/${id}`)
        .then(res => {

            toast.info(notificationMessage);
            dispatch({
                type: DELETE_TEACHER,
                payload: id
            })
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const addUser = (user, history, notificationMessage) => dispatch => {

    axios.post("/api/user", user)
        .then(res => {

            if(user.role === "STUDENT") {
                history.push('/adminPanel/students');
                toast.success(notificationMessage);
            }
            else if(user.role === "TEACHER") {
                history.push('/adminPanel/teachers');
                toast.success(notificationMessage);
            }
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

export const updateUser = (user, history, notificationMessage) => dispatch => {

    axios.put("/api/user", user)
        .then(res => {

            toast.success(notificationMessage);

            if(user.role === "STUDENT")
                history.push('/adminPanel/students');

            if(user.role === "TEACHER")
                history.push('/adminPanel/teachers');

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

export const updateProfile = (user, history, notificationMessage) => dispatch => {

    axios.put("/api/user", user)
        .then(res => {

            let route = "/";
            switch(user.role) {
                case "ADMIN":
                    route = "/adminPanel"; break;
                case "TEACHER":
                    route = "/teacherPanel"; break;
                case "STUDENT":
                    route = "/studentPanel"; break;
            }

            history.push(route);
            toast.success(notificationMessage);

            const updatedUser = { username: user.username, full_name: user.full_name };
            dispatch({
                type: UPDATE_USER,
                payload: updatedUser
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

export const resetPassword = (resetPasswordModel, fromRoute, history, notificationMessage) => dispatch => {
    
    axios.post(`/api/user/reset-password`, resetPasswordModel)
        .then(res => {
            history.push(fromRoute);
            toast.success(notificationMessage);
            dispatch(clearErrors());
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            history.push("/adminPanel");
        });
}

export const changePassword = (changePasswordModel, history, notificationMessage) => dispatch => {

    axios.post(`/api/user/change-password`, changePasswordModel)
        .then(res => {

            let route = "/";
            switch(store.getState().authStore.user.role) {
                case "ADMIN":
                    route = "/adminPanel"; break;
                case "TEACHER":
                    route = "/teacherPanel"; break;
                case "STUDENT":
                    route = "/studentPanel"; break;
            }
            
            history.push(route);
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

