import {
    MEASURES_FAILURE,
    MEASURES_RECEIVE,
    MEASURES_REQUEST,
    SAVED_ANSWER,
    SAVING_ANSWER
} from '@/redux/actions/fetchMeasuresActions';

const initialState = {
    isLoading: false,
    isFailure: false,
    measures: null,
    isSaving: null,
    isSaved: null
};

const measuresReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEASURES_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false,
                isSaving: null,
                isSaved: null
            };
        case MEASURES_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                isSaving: null,
                isSaved: null,
                measures: action.payload
            };
        case MEASURES_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        case SAVING_ANSWER:
            return {
                ...state,
                isSaving: true,
                isSaved: false
            };
        case SAVED_ANSWER:
            return {
                ...state,
                isSaving: false,
                isSaved: true
            };
        default:
            return state;
    }
};

export default measuresReducer;
