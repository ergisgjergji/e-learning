import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers ({
    authStore: authReducer,
    errorStore: errorReducer
});