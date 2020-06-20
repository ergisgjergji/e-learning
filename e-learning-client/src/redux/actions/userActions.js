import axios from 'axios';
import { GET_STUDENTS, GET_TEACHERS, GET_USER, DELETE_STUDENT, DELETE_TEACHER, GET_ERRORS } from './types';
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

export const deleteStudent = (id) => dispatch => {
    
    axios.delete(`/api/user/${id}`)
        .then(res => dispatch({
            type: DELETE_STUDENT,
            payload: id
        }));
};

export const deleteTeacher = (id) => dispatch => {
    
    axios.delete(`/api/user/${id}`)
        .then(res => dispatch({
            type: DELETE_TEACHER,
            payload: id
        }));
};

export const addUser = (user, history) => dispatch => {

    axios.post("/api/user", user)
        .then(res => {
            if(user.role === "STUDENT") {
                history.push({
                    pathname: '/adminPanel/students',
                    notification_message: "Student added successfully."
                });
            }
            else if(user.role === "TEACHER") {
                history.push({
                    pathname: '/adminPanel/teachers',
                    notification_message: "Teacher added successfully."
                });
            }
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const updateUser = (user, history) => dispatch => {

    axios.put("/api/user", user)
        .then(res => {
            if(user.role === "STUDENT") {
                history.push({
                    pathname: '/adminPanel/students',
                    notification_message: "Changes were saved successfully."
                });
            }
            if(user.role === "TEACHER") {
                history.push({
                    pathname: '/adminPanel/teachers',
                    notification_message: "Changes were saved successfully."
                });
            }
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const resetPassword = (resetPasswordModel, fromRoute, history) => dispatch => {
    
    axios.post(`/api/user/reset-password`, resetPasswordModel)
        .then(res => {
            history.push(fromRoute);
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            history.push("/adminPanel");
        });
}

export const getUser = (id, history) => dispatch => {

    axios.get(`/api/user/${id}`)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => history.goBack());
}