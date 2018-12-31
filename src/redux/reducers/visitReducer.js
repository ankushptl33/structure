import {
    ADD_VISIT_FAILURE,
    ADD_VISIT_RECEIVE,
    ADD_VISIT_REQUEST,
    EDIT_VISITS_RECEIVE,
    FAILURE_SINGLE_VISIT,
    PATIENT_VISIT_LIST,
    RECEIVE_VISIT,
    REQUEST_SINGLE_VISIT,
    UPDATE_PRACTICE_VISIT,
    UPDATE_PROVIDER_VISIT,
    UPDATE_VISIT_FAILURE,
    UPDATE_VISIT_RECEIVE,
    UPDATE_VISIT_REQUEST,
    UPDATE_YEAR_VISIT,
    VISIT_CHANGE,
    VISIT_CLINICIAN_CHANGE,
    VISIT_CLINICIANS_FAILURE,
    VISIT_CLINICIANS_RECEIVE,
    VISIT_CLINICIANS_REQUEST,
    VISIT_GETPROVIDERPROFILEPREFERENCE_FAILURE,
    VISIT_GETPROVIDERPROFILEPREFERENCE_RECEIVE,
    VISIT_GETPROVIDERPROFILEPREFERENCE_REQUEST,
    VISIT_PRACTICE_CHANGE,
    VISIT_PRACTICES_FAILURE,
    VISIT_PRACTICES_RECEIVE,
    VISIT_PRACTICES_REQUEST,
    VISIT_PROVIDERPROFILE_FAILURE,
    VISIT_PROVIDERPROFILE_RECEIVE,
    VISIT_PROVIDERPROFILE_REQUEST,
    VISIT_SOFTDELETE_FAILURE,
    VISIT_SOFTDELETE_RECEIVE,
    VISIT_SOFTDELETE_REQUEST,
    VISIT_YEAR_CHANGE,
    VISIT_YEAR_FAILURE,
    VISIT_YEAR_RECEIVE,
    VISIT_YEAR_REQUEST,
    VISITS_ADD_ACTION,
    VISITS_EDIT,
    VISITS_FAILURE,
    VISITS_MEASURE_QUERY_PARAM,
    VISITS_MEASUREDETAILS,
    VISITS_RECEIVE,
    VISITS_REQUEST,
    VISITS_SEARCH
} from '../actions/visitAction';

const initialState = {
    isLoading: true,
    isFailure: false,
    loadingDateTime: null,
    modifiedDateTime: null,
    visitList: null,
    totalVisitRecord: null,
    editVisit: null,
    deleteVisit: null,
    measureDetailVisit: null,
    measureQueryParam: null,
    isYearLoading: true,
    isYearFailure: false,
    yearList: null,
    selectedVisitYearUid: null,
    selectedVisitYearValue: null,
    selectedVisitYear: null,
    isPracticeLoading: true,
    isPracticeFailure: false,
    practices: null,
    selectedVisitPracticeId: null,
    isProviderLoading: true,
    isProviderFailure: false,
    providers: null,
    selectedVisitProviderId: null,
    visitProviderProfileId: null,
    visitProviderProfileMeasure: null,
    visitDetails: null,
    singleVisitDetails: null
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case VISITS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case VISITS_RECEIVE: {
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                loadingDateTime: new Date(Date.now()),
                visitList: action.payload,
                totalVisitRecord:
                    action.payload && action.payload.length ? action.payload[0].TotalRecords : 0
            };
        }
        case VISITS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        case VISIT_CHANGE:
            return {
                ...state
            };
        case VISITS_ADD_ACTION:
            return {
                ...state,
                visitAction: action.payload
            };
        case VISITS_EDIT:
            return {
                ...state,
                editVisit: action.payload
            };
        case VISITS_MEASURE_QUERY_PARAM:
            return {
                ...state,
                measureQueryParam: action.payload
            };

        case VISIT_SOFTDELETE_REQUEST:
            return {
                ...state
            };
        case VISIT_SOFTDELETE_RECEIVE:
            return {
                ...state,
                deleteVisit: action.payload
            };
        case VISIT_SOFTDELETE_FAILURE:
            return {
                ...state
            };
        case VISITS_MEASUREDETAILS:
            return {
                ...state,
                measureDetailVisit: action.payload
            };
        case VISITS_SEARCH:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                visits: action.payload
            };

        case VISIT_YEAR_REQUEST:
            return {
                ...state,
                isYearLoading: true,
                isYearFailure: false
            };
        case VISIT_YEAR_RECEIVE:
            return {
                ...state,
                isYearLoading: false,
                isYearFailure: false,
                yearList: action.payload === [] ? [] : action.payload
            };
        case VISIT_YEAR_FAILURE:
            return {
                ...state,
                isYearLoading: false,
                isYearFailure: true
            };
        case VISIT_YEAR_CHANGE: {
            return {
                ...state,
                selectedVisitYearUid: action.payload.selectedYearId,
                selectedVisitYearValue: action.payload.selectedYear
            };
        }
        case VISIT_PRACTICE_CHANGE:
            return {
                ...state,
                selectedVisitPracticeId: action.payload
            };
        case VISIT_PRACTICES_REQUEST:
            return {
                ...state,
                isPracticeLoading: true,
                isPracticeFailure: false
            };
        case VISIT_PRACTICES_RECEIVE:
            return {
                ...state,
                isPracticeLoading: false,
                isPracticeFailure: false,
                practices: action.payload === [] ? [] : action.payload
            };
        case VISIT_PRACTICES_FAILURE: {
            return {
                ...state,
                isPracticeLoading: false,
                isPracticeFailure: true
            };
        }
        case VISIT_CLINICIANS_REQUEST:
            return {
                ...state,
                isProviderLoading: true,
                isProviderFailure: false
            };
        case VISIT_CLINICIANS_RECEIVE: {
            return {
                ...state,
                isProviderLoading: false,
                isProviderFailure: false,
                providers: action.payload === [] ? [] : action.payload
            };
        }
        case VISIT_CLINICIANS_FAILURE:
            return {
                ...state,
                isProviderLoading: false,
                isProviderFailure: true
            };

        case VISIT_CLINICIAN_CHANGE: {
            return {
                ...state,
                selectedVisitProviderId: action.payload
            };
        }
        case VISIT_PROVIDERPROFILE_REQUEST:
            return {
                ...state
            };
        case VISIT_PROVIDERPROFILE_RECEIVE:
            return {
                ...state,
                visitProviderProfileId: action.payload === null ? '' : action.payload[0].id
            };
        case VISIT_PROVIDERPROFILE_FAILURE:
            return {
                ...state
            };

        case VISIT_GETPROVIDERPROFILEPREFERENCE_REQUEST:
            return {
                ...state
            };
        case VISIT_GETPROVIDERPROFILEPREFERENCE_RECEIVE:
            return {
                ...state,
                visitProviderProfileMeasure: action.payload
            };
        case VISIT_GETPROVIDERPROFILEPREFERENCE_FAILURE:
            return {
                ...state
            };

        case UPDATE_PRACTICE_VISIT:
            return {
                ...state,
                selectedPracticeInVisit: action.payload
            };
        case UPDATE_PROVIDER_VISIT:
            return {
                ...state,
                selectedProviderInVisit: action.payload
            };
        case UPDATE_YEAR_VISIT:
            return {
                ...state,
                selectedYearInVisit: action.payload
            };
        case ADD_VISIT_REQUEST:
            return {
                ...state,
                measureDetailVisit: action.payload,
                lastSavedVisitUid: null,
                lastSavedPatientUid: null
            };
        case ADD_VISIT_RECEIVE:
            return {
                ...state,
                measureDetailVisit: action.payload
            };
        case PATIENT_VISIT_LIST: {
            return {
                ...state,
                patientVisitList: action.payload,
                isFailure: false
            };
        }
        case ADD_VISIT_FAILURE:
            return {
                ...state
            };

        case UPDATE_VISIT_REQUEST:
            return {
                ...state,
                measureDetailVisit: action.payload,
                lastSavedVisitUid: null,
                lastSavedPatientUid: null
            };
        case UPDATE_VISIT_RECEIVE:
            return {
                ...state,
                measureDetailVisit: action.payload
            };
        case UPDATE_VISIT_FAILURE:
            return {
                ...state
            };

        case EDIT_VISITS_RECEIVE:
            return {
                ...state,
                visitDetails: action.payload
            };

        case REQUEST_SINGLE_VISIT:
            return {
                ...state
            };

        case RECEIVE_VISIT:
            return {
                ...state,
                singleVisitDetails: action.payload
            };
        case FAILURE_SINGLE_VISIT:
            return {
                ...state
            };

        default:
            return state;
    }
};

export default filterReducer;
