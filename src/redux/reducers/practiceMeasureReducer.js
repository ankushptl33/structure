import {
    CLEAR_PRACTICE_PERFORMANCE,
    IS_USER_FAVORITE_MEASURE,
    PRACTICE_PERFORMANCE_FAILURE,
    PRACTICE_PERFORMANCE_RECEIVE,
    PRACTICE_PERFORMANCE_REQUEST,
    UPDATE_SELECTED_MEASUREID,
    UPDATE_USER_FAVORITE_MEASURE
} from '../actions/practiceMeasureAction';

const initialState = {
    isLoading: false,
    isFailure: false,
    PracticePerformance: [],
    selectedMeasureId: '',
    isFavorites: false
};

const practicePerformance = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SELECTED_MEASUREID:
            return {
                ...state,
                selectedMeasureId: action.payload
            };
        case CLEAR_PRACTICE_PERFORMANCE:
            return {
                isLoading: false,
                isFailure: false,
                PracticePerformance: [],
                selectedMeasureId: ''
            };
        case PRACTICE_PERFORMANCE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false,
                selectedMeasureId: ''
            };
        case PRACTICE_PERFORMANCE_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                PracticePerformance: action.payload,
                selectedMeasureId: ''
            };
        case PRACTICE_PERFORMANCE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true,
                selectedMeasureId: ''
            };
        case IS_USER_FAVORITE_MEASURE:
            return Object.assign({}, state, {
                isLoading: false,
                isFailure: false,
                isFavorites: action.payload
            });
        case UPDATE_USER_FAVORITE_MEASURE:
            let PracticePerformance = state.PracticePerformance.filter(value => {
                if (value.measureId == action.payload) {
                    value.isFavourite = !value.isFavourite;
                    value.favourite.name = value.isFavourite ? ['fas', 'heart'] : ['fal', 'heart'];
                }
                return value;
            });
            return Object.assign({}, state, {
                PracticePerformance: PracticePerformance
            });
        default:
            return state;
    }
};

export default practicePerformance;
