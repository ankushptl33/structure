import {
    PRACTICE_REFRESH_DATE_FAILURE,
    PRACTICE_REFRESH_DATE_RECEIVE,
    PRACTICE_REFRESH_DATE_REQUEST
} from '../actions/practiceRefreshDateAction';

const initialState = {
    isLoading: true,
    isFailure: false,
    practiceRefreshDate: null
};

const practiceRefreshDateReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRACTICE_REFRESH_DATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case PRACTICE_REFRESH_DATE_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                practiceRefreshDate: action.payload
            };
        case PRACTICE_REFRESH_DATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        default:
            return state;
    }
};

export default practiceRefreshDateReducer;
