import {
    MEASURE_FILTER_FAILURE,
    MEASURE_FILTER_RECEIVE,
    MEASURE_FILTER_REQUEST,
    UPDATE_MEASURE_FILTER_TO_REDUX_STORE
} from '../actions/measureFliterActions';

const initialState = {
    isLoading: false,
    isFailure: false,
    MeasureFilterData: {
        MeasureSet: null,
        Duration: null,
        Year: null
    },
    SelectedMeasureSet: null,
    SelectedDuration: null,
    SelectedYear: null,
    SelectedDurationFlag: null,
    SelectedDurationFrom: null,
    SelectedDurationTo: null
};

const measurefliter = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MEASURE_FILTER_TO_REDUX_STORE:
            return {
                ...state,
                SelectedMeasureSet: action.payload.SelectedMeasureSet,
                SelectedDuration: action.payload.SelectedDuration,
                SelectedYear: action.payload.SelectedYear
            };
        case MEASURE_FILTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case MEASURE_FILTER_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                MeasureFilterData: action.payload,
                SelectedMeasureSet: action.payload.MeasureSet[0].id,
                SelectedDuration: action.payload.Duration[0].id,
                SelectedDurationFlag: action.payload.Duration[0].flag,
                SelectedDurationFrom: action.payload.Duration[0].startdate,
                SelectedDurationTo: action.payload.Duration[0].enddate,
                SelectedYear: action.payload.Year[0].id
            };
        case MEASURE_FILTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };

        default:
            return state;
    }
};

export default measurefliter;
