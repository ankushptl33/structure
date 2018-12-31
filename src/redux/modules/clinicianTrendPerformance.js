// import { push } from 'react-router-redux';
import { getClinicianData } from '../services/clinicianPerformanceApi';
import { getMeasureAllOutputPerformance } from '../services/PerformanceTrendInfoApi';
import { AppLoad, getActionCreator, getActionType, getActionTypes, getReducer } from '@/utils/redux';

// Types
export const ProviderTypes = getActionTypes('PROVIDER');
export const ProviderPerformanceTypes = getActionTypes('PROVIDERPERFORMANCE');
export const LoadClinicianTrendType = getActionType('CLINICIANTREND');
// Actions
export const LoadClinicianTrend = getActionCreator(LoadClinicianTrendType);

export const getproviders = params => {
    return {
        types: ProviderTypes,
        callAPI: () => getClinicianData(params.clinician),
        handleAction: ({ type, payload, store }) => {
            switch (type) {
                case ProviderTypes.SUCCESS:
                    store.dispatch({ type: AppLoad, payload: true });
                    var data =
                        payload.getProvidersByPracticeId &&
                        payload.getProvidersByPracticeId.map(m => {
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
                                    firstname:
                                        payload.getProvidersByPracticeId[i].firstname +
                                        ' ' +
                                        payload.getProvidersByPracticeId[i].lastname,
                                    id: payload.getProvidersByPracticeId[i].id
                                };
                            });
                            store.dispatch(LoadClinicianTrend(mergeArray));
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
    Providers: []
};

// Reducer
export default getReducer(initialState, {
    [AppLoad]: (state, { payload }) => ({
        ...state,
        isLoading: payload
    }),
    [LoadClinicianTrendType]: (state, { payload }) => {
        return {
            ...state,
            Providers: payload,
            isLoading: false
        };
    },
    [ProviderTypes.ERROR]: () => initialState
});
