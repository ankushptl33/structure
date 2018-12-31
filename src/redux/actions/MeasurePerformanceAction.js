import { getMeasuresPerformance } from '../services/practicePerformanceApi';
import { fnGetPerformanceBarCSSClass } from '@/helper/commonFunction';

export const MEASURE_PERFORMANCE_REQUEST = 'MEASURE_PERFORMANCE_REQUEST';
export const MEASURE_PERFORMANCE_RECEIVE = 'MEASURE_PERFORMANCE_RECEIVE';
export const MEASURE_PERFORMANCE_FAILURE = 'MEASURE_PERFORMANCE_FAILURE';

const requestMeasurePerformance = () => ({
    type: MEASURE_PERFORMANCE_REQUEST
});

const receiveMeasurePerformance = payload => ({
    type: MEASURE_PERFORMANCE_RECEIVE,
    payload
});

const failureMeasurePerformance = () => ({
    type: MEASURE_PERFORMANCE_FAILURE
});

export const getPerformanceData = params => {
    return dispatch => {
        let measurePerformance;
        dispatch(requestMeasurePerformance());
        getMeasuresPerformance({
            input: {
                EntityName: params.EntityName,
                EntityId: params.EntityId,
                ParentEntityId: params.ParentEntityId,
                ParentEntityName: params.ParentEntityName,
                DurationFrom: params.DurationFrom,
                DurationTo: params.DurationTo,
                Flag: params.Flag,
                MeasureId: params.MeasureId,
                Unit: params.Unit,
                IsPatientSpecific: params.IsPatientSpecific
            }
        })
            .then(json => {
                let returnValue = json.data.getMeasurePerformanceAverage;
                measurePerformance = {
                    performanceData: {
                        performanceText: 'Achieved Performance',
                        performance: returnValue.EntityAverage,
                        performancePosition: 'left',
                        benchMark: [
                            {
                                label: 'Registry Average',
                                data: returnValue.RegistryAverage,
                                position: 'above',
                                colorcode: ''
                            },
                            {
                                label: 'Registry BenchMark',
                                data: returnValue.RegistryBenchmark,
                                position: 'above',
                                colorcode: ''
                            },
                            {
                                label: 'CMS Benchmark',
                                data: returnValue.CMSBenchmark,
                                position: 'below',
                                colorcode: ''
                            }
                        ],
                        colorcode: fnGetPerformanceBarCSSClass(returnValue.EntityComparison)
                    }
                };
                dispatch(receiveMeasurePerformance(measurePerformance));
            })
            .catch(ex => {
                dispatch(failureMeasurePerformance());
            });
    };
};
