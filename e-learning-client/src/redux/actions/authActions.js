import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { SET_USER, LOGOUT_USER, GET_ERRORS, PASSWORD_MISMATCH } from './types';
import headersConfig from './../securityUtils/headersConfig';

import { toast } from 'react-toastify';
import validateError from './serverError';

/* 
    COMMENT:
    We handle the request 'Authorization' header in the login/logout actions.
*/

export const login = (loginRequest) => dispatch => {

    // Post -> Login Request
    axios.post("/api/auth/login", loginRequest)
        .then(res => {
            // Extract token from response data
            const { token } = res.data;
            // Store the token in localStorage
            localStorage.setItem("token", token);
            // Set our token in header requests
            headersConfig(token);
            // Decode token on React
            const decoded = jwt_decode(token);
            // dispatch to our authReducer
            dispatch({
                type: SET_USER,
                payload: decoded
            });
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const logout = () => dispatch => {
    headersConfig(false);
    dispatch({
        type: LOGOUT_USER
    });
}

export const loadUser = () => dispatch => {

    const token = localStorage.getItem('token');
    const currentTime = Date.now()/1000;

    if(token) {
        
        const decoded = jwt_decode(token);
        if(decoded.exp < currentTime) {
            dispatch({
                type: LOGOUT_USER
            });
            window.location.href = "/";
        }
        else {
            headersConfig(token);
            dispatch({
                type: SET_USER,
                payload: decoded
            });
        }
    }
}
