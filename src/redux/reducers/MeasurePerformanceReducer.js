import {
    MEASURE_PERFORMANCE_FAILURE,
    MEASURE_PERFORMANCE_RECEIVE,
    MEASURE_PERFORMANCE_REQUEST
} from '../actions/MeasurePerformanceAction';

const initialState = {
    isLoading: true,
    isFailure: false,
    MeasurePerformanceData: []
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEASURE_PERFORMANCE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case MEASURE_PERFORMANCE_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                MeasurePerformanceData: action.payload
            };
        case MEASURE_PERFORMANCE_FAILURE:
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
