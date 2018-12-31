import { PRACTICE_CHANGE, PRACTICES_FAILURE, PRACTICES_RECEIVE, PRACTICES_REQUEST } from '../actions/practiceActions';

const initialState = {
    isLoading: true,
    isFailure: false,
    practices: null,
    SelectedPracticeId: '',
    providerCount: null,
    locationCount: null
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRACTICE_CHANGE:
            return {
                ...state,
                SelectedPracticeId: action.payload.selectedPracticeId,
                providerCount: action.payload.providerCnt,
                locationCount: action.payload.locationCnt
            };
        case PRACTICES_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case PRACTICES_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                practices: action.payload.practiceList,
                SelectedPracticeId: action.payload.practiceList[0].id,
                providerCount: action.payload.providerCnt,
                locationCount: action.payload.locationCnt
            };
        case PRACTICES_FAILURE:
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
