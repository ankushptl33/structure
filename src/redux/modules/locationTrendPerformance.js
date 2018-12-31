// import { push } from 'react-router-redux';
import { getLocationData } from '../services/locationPerformanceApi';
import { getMeasureAllOutputPerformance } from '../services/PerformanceTrendInfoApi';
import { AppLoad, getActionCreator, getActionType, getActionTypes, getReducer } from '@/utils/redux';

// Types
export const LocationTypes = getActionTypes('LOCATION');
export const LocationPerformanceTypes = getActionTypes('LOCATIONPERFORMANCE');
export const LoadLocationTrendType = getActionType('LOCATIONTREND');
// Actions
export const LoadLocationTrend = getActionCreator(LoadLocationTrendType);

export const getlocations = params => {
    return {
        types: LocationTypes,
        callAPI: () => getLocationData(params.locations),
        handleAction: ({ type, payload, store }) => {
            switch (type) {
                case LocationTypes.SUCCESS:
                    store.dispatch({ type: AppLoad, payload: true });
                    var data =
                        payload.getLocations &&
                        payload.getLocations.map(m => {
                            var performanceInput = Object.create(params.measureComputations);
                            performanceInput.input = {
                                ...performanceInput.input,
                                EntityId: m.id
                            };
                            return Promise.resolve(
                                getMeasureAllOutputPerformance(performanceInput).then(res => {
                                    var tempData =
                                        res.data &&
                                        res.data.getMeasureOutputByEntity &&
                                        res.data.getMeasureOutputByEntity;
                                    return {
                                        ...tempData,
                                        performance: {
                                            performanceData: {
                                                ...params.measureComputations.input,
                                                EntityId: tempData && tempData.EntityId
                                            }
                                        }
                                    };
                                })
                            );
                        });
                    if (data === null) {
                        store.dispatch({ type: AppLoad, payload: false });
                    } else {
                        var resolveddata = Promise.all(data);
                        resolveddata.then(d => {
                            var mergeArray = d.map((m, i) => {
                                return {
                                    ...m,
                                    name: payload.getLocations[i].name,
                                    id: payload.getLocations[i].id
                                };
                            });
                            store.dispatch(LoadLocationTrend(mergeArray));
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    };
};

const initialState = {
    isLoading: false,
    Locations: []
};

// Reducer
export default getReducer(initialState, {
    [AppLoad]: (state, { payload }) => ({
        ...state,
        isLoading: payload
    }),
    [LoadLocationTrendType]: (state, { payload }) => {
        return {
            ...state,
            Locations: payload,
            isLoading: false
        };
    },
    [LocationTypes.ERROR]: () => initialState
});
