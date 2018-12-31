import {
    LOCATION_CHANGE,
    LOCATION_REMOVE,
    LOCATIONS_FAILURE,
    LOCATIONS_RECEIVE,
    LOCATIONS_REQUEST
} from '@/redux/actions/locationPerformanceActions';

const initialState = {
    isLoading: true,
    isFailure: false,
    locations: [],
    selectedlocationId: null
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_REMOVE:
            return {
                isLoading: true,
                isFailure: false,
                locations: [],
                selectedlocationId: null
            };
        case LOCATION_CHANGE:
            return {
                ...state,
                selectedlocationId: action.payload
            };
        case LOCATIONS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case LOCATIONS_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                locations: action.payload,
                selectedlocationId: action.payload[0].id
            };
        case LOCATIONS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        default:
            return state;
    }
};

export default locationReducer;
