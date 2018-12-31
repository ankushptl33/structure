import { TRENDINFO_FAILURE, TRENDINFO_RECEIVE, TRENDINFO_REQUEST } from '../actions/performanceTrendInfoAction';

const initialState = {
    isLoading: true,
    isFailure: false,
    PerformanceTrendInfoData: []
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRENDINFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case TRENDINFO_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                PerformanceTrendInfoData: action.payload
            };
        case TRENDINFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        default:
            return state;
    }
};

export default filterReducer;
