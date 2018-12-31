import {
    PRACTICE_PERFORMANCE_FAILURE,
    PRACTICE_PERFORMANCE_RECEIVE,
    PRACTICE_PERFORMANCE_REQUEST
} from '../actions/practicePerformanceAction';

const initialState = {
    isLoading: false,
    isFailure: false,
    PracticePerformance: []
};

const practicePerformance = (state = initialState, action) => {
    switch (action.type) {
        case PRACTICE_PERFORMANCE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case PRACTICE_PERFORMANCE_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                PracticePerformance: action.payload
            };
        case PRACTICE_PERFORMANCE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        default:
            return state;
    }
};

export default practicePerformance;
