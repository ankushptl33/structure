import {
    CLEAR_PATIENT_LIST,
    PATIENTS_BY_ENTITY_FAILURE,
    PATIENTS_BY_ENTITY_RECEIVE,
    PATIENTS_BY_ENTITY_REQUEST
} from '../actions/patientAction';

const initialState = {
    isLoading: false,
    isFailure: false,
    PatientDataList: []
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case PATIENTS_BY_ENTITY_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case PATIENTS_BY_ENTITY_RECEIVE:
            return Object.assign({}, state, {
                isLoading: false,
                isFailure: false,
                PatientDataList: action.payload
            });
        case PATIENTS_BY_ENTITY_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        case CLEAR_PATIENT_LIST:
            return Object.assign({}, state, {
                PatientDataList: action.payload
            });
        default:
            return state;
    }
};

export default filterReducer;
