import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';

export default combineReducers ({
    authStore: authReducer,
    errorStore: errorReducer,
    userStore: userReducer
});