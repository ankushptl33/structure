import {
    CLINICIANS_CHANGE,
    CLINICIANS_FAILURE,
    CLINICIANS_RECEIVE,
    CLINICIANS_REMOVE,
    CLINICIANS_REQUEST
} from '@/redux/actions/clinicianPerformanceAction';

const initialState = {
    isLoading: true,
    isFailure: false,
    Providers: [],
    selectedProviderId: null
};

const clinicianReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLINICIANS_REMOVE:
            return {
                isLoading: true,
                isFailure: false,
                Providers: [],
                selectedProviderId: null
            };
        case CLINICIANS_CHANGE:
            return {
                ...state,
                selectedProviderId: action.payload
            };
        case CLINICIANS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case CLINICIANS_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                Providers: action.payload,
                selectedProviderId: action.payload[0].id
            };
        case CLINICIANS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        default:
            return state;
    }
};

export default clinicianReducer;
