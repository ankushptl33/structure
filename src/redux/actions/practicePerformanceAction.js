import { getMeasuresPerformance } from '../services/practicePerformanceApi';
import { ENTITYCOMPARISONFLAG } from '../../helper/constants';

export const PRACTICE_PERFORMANCE_REQUEST = 'PRACTICE_PERFORMANCE_REQUEST';
export const PRACTICE_PERFORMANCE_RECEIVE = 'PRACTICE_PERFORMANCE_RECEIVE';
export const PRACTICE_PERFORMANCE_FAILURE = 'PRACTICE_PERFORMANCE_FAILURE';

// eslint-disable-next-line no-unused-vars
const requestPracticePerformance = () => ({
    type: PRACTICE_PERFORMANCE_REQUEST
});

// eslint-disable-next-line no-unused-vars
const receivePracticePerformance = payload => ({
    type: PRACTICE_PERFORMANCE_RECEIVE,
    payload
});

// eslint-disable-next-line no-unused-vars
const failurePracticePerformance = () => ({
    type: PRACTICE_PERFORMANCE_FAILURE
});

export const getMeasuresPerformanceData = params => {
    // eslint-disable-next-line no-unused-vars
    let measurePerformance;
    return getMeasuresPerformance({
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
            IsPatientSpecific: params.IsPatientSpecific,
            EntityComparisonFlag: ENTITYCOMPARISONFLAG
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
                            label: 'CMS Average',
                            data: returnValue.CMSBenchmark,
                            position: 'below',
                            colorcode: ''
                        }
                    ],
                    colorcode: 'progress-bar-success'
                }
            };
        })
        .catch(ex => {
            throw new Error(ex);
        });
};
