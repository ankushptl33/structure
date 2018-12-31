import { getCalendar, getMeasureSet } from '@/redux/services/measureFilterApi';

export const MEASURE_FILTER_REQUEST = 'MEASURE_FILTER_REQUEST';
export const MEASURE_FILTER_RECEIVE = 'MEASURE_FILTER_RECEIVE';
export const MEASURE_FILTER_FAILURE = 'MEASURE_FILTER_FAILURE';

export const UPDATE_MEASURE_FILTER_TO_REDUX_STORE = 'UPDATE_MEASURE_FILTER_TO_REDUX_STORE';

const requestMeasureFilter = () => ({
    type: MEASURE_FILTER_REQUEST
});

const receiveMeasureFilter = payload => ({
    type: MEASURE_FILTER_RECEIVE,
    payload
});

const failureMeasureFilter = () => ({
    type: MEASURE_FILTER_FAILURE
});

export const updateMeasureFilterToReduxStore = payload => ({
    type: UPDATE_MEASURE_FILTER_TO_REDUX_STORE,
    payload
});

export const getMeasureFilterData = () => {
    const MeasureFilterData = {
        MeasureSet: null,
        Duration: null,
        Year: null
    };

    return dispatch => {
        dispatch(requestMeasureFilter());
        getMeasureSet()
            .then(response => {
                MeasureFilterData.MeasureSet = response.data.getMeasureSets;
                getCalendar().then(response => {
                    const calendarData = response.data.getCalendars;
                    const year = [];
                    const _year = [];
                    const duration = [];
                    const _duration = [];
                    calendarData.map((obj, index) => {
                        if (_year.indexOf(obj.year) === -1) {
                            _year.push(obj.year);
                            year.push({
                                id: obj.id,
                                name: obj.year,
                                value: obj.id
                            });
                        }
                        if (_duration.indexOf(`${obj.year}${obj.duration}`) === -1) {
                            _duration.push(`${obj.year}${obj.duration}`);
                            duration.push({
                                id: obj.id,
                                name: obj.duration,
                                value: obj.duration,
                                flag: obj.flag,
                                startdate: new Date(Number(obj.startdate)),
                                enddate: new Date(Number(obj.enddate))
                            });
                        }
                    });
                    MeasureFilterData.Year = year;
                    MeasureFilterData.Duration = duration;
                    dispatch(receiveMeasureFilter(MeasureFilterData));
                });
            })
            .catch(ex => {
                dispatch(failureMeasureFilter());
                throw new Error(ex);
            });
    };
};
