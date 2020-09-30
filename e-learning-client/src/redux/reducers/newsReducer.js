import { GET_NEWS_LIST, GET_NEWS_COUNT, SET_NEWS_LOADING, SET_NEWS_LOADED } from '../actions/types';

const initialState = {
    news_list: [],
    loading: false,
    count: 0,
    news: {}
};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case GET_NEWS_LIST:
            return {
                ...state,
                news_list: action.payload
            }

        case GET_NEWS_COUNT:
            return {
                ...state,
                count: action.payload
            }

        case SET_NEWS_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_NEWS_LOADED:
            return {
                ...state,
                loading: false
            }

        default:
            return state;   
    }
}