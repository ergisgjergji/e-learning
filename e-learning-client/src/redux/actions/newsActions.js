import axios from 'axios';
import { GET_NEWS_LIST, GET_NEWS_COUNT, GET_NEWS_SINGLE, SET_NEWS_LOADING, SET_NEWS_LOADED, GET_ERRORS } from './types';
import { clearErrors } from './errorActions';

import { toast } from 'react-toastify';
import validateError from './serverError';

export const getCount = () => dispatch => {

    axios.get('/api/news/count')
        .then(res => {
            dispatch({
                type: GET_NEWS_COUNT,
                payload: res.data
            })
        })
        .catch(err => {
            validateError(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const getNewsList = (page, size) => dispatch => {

    dispatch({ type: SET_NEWS_LOADING });
    
    axios.get(`/api/news/all?page=${page}&size=${size}`)
        .then(res => {
            dispatch({
                type: GET_NEWS_LIST,
                payload: res.data
            })
            dispatch({ type: SET_NEWS_LOADED });
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

export const getNewsById = (id) => dispatch => {
    
    axios.get(`/api/news/${id}`)
        .then(res => {
            dispatch({
                type: GET_NEWS_SINGLE,
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

export const addNews = (formData, size, notification_message) => dispatch => {

    axios.post('/api/news', formData, { "Content-Type": "multipart/form-data" })
        .then(res => {
            
            toast.success(notification_message);
            dispatch(getCount());
            dispatch(getNewsList(0, size));
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

export const deleteNews = (id, size, notification_message) => dispatch => {

    axios.delete(`/api/news/${id}`)
        .then(res => {
            toast.info(notification_message);
            dispatch(getCount());
            dispatch(getNewsList(0, size));
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