import {
    CLEAR_STATE_PROVIDERCHANGE,
    MEASURE_SELECTION_CHANGE,
    PROVIDER_CHANGE,
    RESET_MEASURE_CLICK,
    RESET_MEASURECLICK_RERENDER,
    WEBTOOL_ALLMEASURESHOW,
    WEBTOOL_CLINICIANS_FAILURE,
    WEBTOOL_CLINICIANS_RECEIVE,
    WEBTOOL_CLINICIANS_REQUEST,
    WEBTOOL_CREATEPROFILE_FAILURE,
    WEBTOOL_CREATEPROFILE_RECEIVE,
    WEBTOOL_CREATEPROFILE_REQUEST,
    WEBTOOL_GETPROVIDERPROFILEPREFERENCE_FAILURE,
    WEBTOOL_GETPROVIDERPROFILEPREFERENCE_RECEIVE,
    WEBTOOL_GETPROVIDERPROFILEPREFERENCE_REQUEST,
    WEBTOOL_MEASURE_FAILURE,
    WEBTOOL_MEASURE_RECEIVE,
    WEBTOOL_MEASURE_REQUEST,
    WEBTOOL_PRACTICE_CHANGE,
    WEBTOOL_PRACTICES_FAILURE,
    WEBTOOL_PRACTICES_RECEIVE,
    WEBTOOL_PRACTICES_REQUEST,
    WEBTOOL_PROVIDERPROFILE_FAILURE,
    WEBTOOL_PROVIDERPROFILE_RECEIVE,
    WEBTOOL_PROVIDERPROFILE_REQUEST,
    WEBTOOL_PROVIDERPROFILEPREFERENCE_FAILURE,
    WEBTOOL_PROVIDERPROFILEPREFERENCE_RECEIVE,
    WEBTOOL_PROVIDERPROFILEPREFERENCE_REQUEST,
    WEBTOOL_SAVEMEASURES_REQUEST,
    WEBTOOL_YEAR_FAILURE,
    WEBTOOL_YEAR_RECEIVE,
    WEBTOOL_YEAR_REQUEST,
    YEAR_CHANGE
} from '../actions/QualityWebtoolMeasureAction';
import {
    WEBTOOL_MEASURES_FAILURE,
    WEBTOOL_MEASURES_RECEIVE,
    WEBTOOL_MEASURES_REQUEST
} from '@/redux/actions/fetchMeasuresActions';
import _ from 'lodash';

const initialState = {
    isMeasureLoading: false,
    isMeasureFailure: false,
    selectedProviderUid: '',
    isLoading: false,
    isFailure: false,
    practices: null,
    isYearLoading: false,
    isYearFailure: false,
    isProviderLoading: false,
    isProviderFailure: false,
    selectedWebtoolPracticeId: '',
    providers: '',
    isShowAllMeasure: false,
    providerProfileMeasure: '',
    profileId: '',
    createProfileId: null,
    isMeasurePreferenceSaved: null
};

const QualityWebtoolMeasureReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROVIDER_CHANGE:
            return {
                ...state,
                selectedProviderUid: action.payload,
                isShowAllMeasure: false
            };
        case YEAR_CHANGE:
            return {
                ...state,
                selectedYearUid: action.payload,
                selectedProviderUid: null,
                profileId: null,
                isShowAllMeasure: false,
                providerProfileMeasure: ''
            };
        case WEBTOOL_MEASURE_REQUEST:
            return {
                ...state,
                isMeasureLoading: true,
                isMeasureFailure: false
            };
        case WEBTOOL_MEASURE_RECEIVE:
            return {
                ...state,
                isMeasureLoading: false,
                isMeasureFailure: false,
                measurelist: action.payload
            };
        case WEBTOOL_MEASURE_FAILURE:
            return {
                ...state,
                isMeasureLoading: false,
                isMeasureFailure: true
            };

        case WEBTOOL_YEAR_REQUEST:
            return {
                ...state,
                isYearLoading: true,
                isYearFailure: false
            };
        case WEBTOOL_YEAR_RECEIVE:
            return {
                ...state,
                isYearLoading: false,
                isYearFailure: false,
                yearList: action.payload,
                selectedYearUid: action.payload[action.payload.length - 1].id
            };
        case WEBTOOL_YEAR_FAILURE:
            return {
                ...state,
                isYearLoading: false,
                isYearFailure: true
            };
        case MEASURE_SELECTION_CHANGE:
            return {
                ...state,
                selectedProfileMeasures: action.payload
            };
        case WEBTOOL_PRACTICE_CHANGE:
            return {
                ...state,
                selectedWebtoolPracticeId: action.payload,
                selectedProfileMeasures: [],
                providerProfileMeasure: [],
                profileId: ''
            };
        case WEBTOOL_PRACTICES_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case WEBTOOL_PRACTICES_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                practices: action.payload,
                selectedWebtoolPracticeId: action.payload[0].id
            };
        case WEBTOOL_PRACTICES_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        case WEBTOOL_CLINICIANS_REQUEST:
            return {
                ...state,
                isProviderLoading: true,
                isProviderFailure: false
            };
        case WEBTOOL_CLINICIANS_RECEIVE:
            return {
                ...state,
                isProviderLoading: false,
                isProviderFailure: false,
                providers: action.payload
            };
        case WEBTOOL_CLINICIANS_FAILURE:
            return {
                ...state,
                isProviderLoading: false,
                isProviderFailure: true
            };
        case WEBTOOL_ALLMEASURESHOW:
            return {
                ...state,
                isShowAllMeasure: !action.payload
            };

        case WEBTOOL_PROVIDERPROFILE_REQUEST:
            return {
                ...state
            };
        case WEBTOOL_PROVIDERPROFILE_RECEIVE:
            return {
                ...state,
                profileId: action.payload[0] ? action.payload[0].id : ''
            };
        case WEBTOOL_PROVIDERPROFILE_FAILURE:
            return {
                ...state
            };

        case WEBTOOL_CREATEPROFILE_REQUEST:
            return {
                ...state
            };
        case WEBTOOL_CREATEPROFILE_RECEIVE:
            return {
                ...state,
                createProfileId: action.payload.id
            };
        case WEBTOOL_CREATEPROFILE_FAILURE:
            return {
                ...state
            };

        case WEBTOOL_PROVIDERPROFILEPREFERENCE_REQUEST:
            return {
                ...state,
                providerProfileMeasure: action.payload,
                isMeasurePreferenceSaved: null
            };
        case WEBTOOL_PROVIDERPROFILEPREFERENCE_RECEIVE:
            return {
                ...state,
                isMeasurePreferenceSaved: action.payload.data.setMeasuresListPreferenceForProfile.id
                // providerProfileMeasure: action.payload.id,
                // ProfileMeasurePreferenceId:action.payload.id
            };
        case WEBTOOL_PROVIDERPROFILEPREFERENCE_FAILURE:
            return {
                ...state
            };

        case WEBTOOL_GETPROVIDERPROFILEPREFERENCE_REQUEST:
            return {
                ...state
            };
        case WEBTOOL_GETPROVIDERPROFILEPREFERENCE_RECEIVE:
            return {
                ...state,
                providerProfileMeasure: action.payload,
                selectedProfileMeasures: action.payload
            };
        case WEBTOOL_GETPROVIDERPROFILEPREFERENCE_FAILURE:
            return {
                ...state
            };

        case WEBTOOL_SAVEMEASURES_REQUEST:
            return {
                ...state,
                providerProfileMeasure: action.payload
            };

        case WEBTOOL_MEASURES_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case WEBTOOL_MEASURES_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                measures: action.payload
            };
        case WEBTOOL_MEASURES_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        case CLEAR_STATE_PROVIDERCHANGE:
            return {
                ...state,
                selectedProfileMeasures: [],
                providerProfileMeasure: [],
                profileId: ''
            };
        case RESET_MEASURE_CLICK:
            return {
                ...state,
                selectedProfileMeasures: _.cloneDeep(action.payload)
                // isShowAllMeasure: false
            };
        case RESET_MEASURECLICK_RERENDER:
            return {
                ...state,
                selectedProfileMeasures: _.cloneDeep(action.payload),
                providerProfileMeasure: _.cloneDeep(action.payload)
            };
        default:
            return state;
    }
};

export default QualityWebtoolMeasureReducer;
