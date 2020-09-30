import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import courseReducer from './courseReducer';
import testReducer from './testReducer';
import newsReducer from './newsReducer';

export default combineReducers ({
    authStore: authReducer,
    errorStore: errorReducer,
    userStore: userReducer,
    courseStore: courseReducer,
    testStore: testReducer,
    newsStore: newsReducer
});