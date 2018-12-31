import { getActionCreator, getActionType, getActionTypes, getReducer } from '@/utils/redux';
import { getCalendar, getMeasureSet } from '@/redux/services/measureFilterApi';
import { getMeasureListAction } from '@/redux/modules/registryMeasureList';

// Types
export const MeasureFilterTypes = getActionTypes('MEASUREFILTERTYPES');
export const MeasureFilterUpdateType = getActionType('MEASUREFILTERUPDATETYPE');

export const measureFilterUpdateAction = getActionCreator(MeasureFilterUpdateType);

export const transformCalendarData = calendarData => {
    const year = [];
    const tempyear = [];
    const duration = [];
    const tempduration = [];
    const tempseletedYearDuration = [];
    const currentYear = calendarData[0].year;

    calendarData.map(obj => {
        if (/^(\d{4}Q[1-4])$/.test(obj.duration) && currentYear === obj.year) {
            tempseletedYearDuration.push(obj);
        }

        if (tempyear.indexOf(obj.year) === -1) {
            tempyear.push(obj.year);
            year.push({
                id: obj.year,
                name: obj.year,
                value: obj.year,
                year: obj.year
            });
        }
        if (tempduration.indexOf(`${obj.year}${obj.duration}`) === -1) {
            tempduration.push(`${obj.year}${obj.duration}`);
            duration.push({
                id: obj.duration,
                name: obj.duration,
                value: obj.duration,
                flag: obj.flag,
                startdate: new Date(Number(obj.startdate)),
                enddate: new Date(Number(obj.enddate)),
                year: obj.year
            });
        }
    });

    let seletedYearDuration = {};
    seletedYearDuration = tempseletedYearDuration.reduce((first, second) => {
        return first.id > second.id
            ? {
                  id: first.id,
                  year: first.year,
                  duration: first.duration,
                  startdate: new Date(Number(first.startdate)),
                  enddate: new Date(Number(first.enddate)),
                  flag: first.flag
              }
            : {
                  id: second.id,
                  year: second.year,
                  duration: second.duration,
                  startdate: new Date(Number(second.startdate)),
                  enddate: new Date(Number(second.enddate)),
                  flag: second.flag
              };
    });
    return { year, duration, seletedYearDuration };
};

export const getMeasureFilterData = async () => {
    const response = await Promise.all([getMeasureSet(), getCalendar()]);
    const { year, duration, seletedYearDuration } = transformCalendarData(
        response[1].data.getCalendars
    );
    return {
        data: {
            measureSet: response[0].data.getMeasureSets,
            year,
            duration,
            selectedValues: {
                measureSet: response[0].data.getMeasureSets[0].id,
                year: seletedYearDuration.year,
                duration: seletedYearDuration.duration,
                durationFlag: seletedYearDuration.flag,
                durationFrom: seletedYearDuration.startdate,
                durationTo: seletedYearDuration.enddate,
                customrange: false,
                fromdate: null,
                todate: null
            }
        }
    };
};

export const getMeasureFilterDataAction = () => ({
    types: MeasureFilterTypes,
    callAPI: () => getMeasureFilterData(),
    handleAction: ({ type, payload, store }) => {
        switch (type) {
            case MeasureFilterTypes.SUCCESS: {
                const params = {
                    MeasuresetId: payload.selectedValues.measureSet
                };
                store.dispatch(getMeasureListAction(params));
                break;
            }
            default:
                break;
        }
    }
});

const initialState = {
    isLoading: true,
    measureFilterData: {
        measureSet: [],
        year: [],
        duration: [],
        selectedValues: {
            measureSet: null,
            year: null,
            duration: null,
            durationFlag: null,
            durationFrom: null,
            durationTo: null,
            customrange: false,
            fromdate: null,
            todate: null
        }
    }
};

// Reducer
export default getReducer(initialState, {
    [MeasureFilterTypes.SUCCESS]: (state, { payload }) => ({
        ...state,
        measureFilterData: payload,
        isLoading: false
    }),
    [MeasureFilterUpdateType]: (state, { payload }) => ({
        ...state,
        measureFilterData: {
            ...state.measureFilterData,
            selectedValues: payload
        }
    }),
    [MeasureFilterTypes.ERROR]: () => initialState
});
