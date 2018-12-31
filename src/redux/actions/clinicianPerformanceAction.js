import { getClinicianData } from '../services/clinicianPerformanceApi';
import { getMeasures } from '../actions/practiceMeasureAction';

export const CLINICIANS_REQUEST = 'CLINICIANS_REQUEST';
export const CLINICIANS_RECEIVE = 'CLINICIANS_RECEIVE';
export const CLINICIANS_FAILURE = 'CLINICIANS_FAILURE';
export const CLINICIANS_CHANGE = 'CLINICIANS_CHANGE';
export const CLINICIANS_REMOVE = 'CLINICIANS_REMOVE';

const requestClinicians = () => ({
    type: CLINICIANS_REQUEST
});

const receiveClinicians = payload => ({
    type: CLINICIANS_RECEIVE,
    payload
});

const failureClinicians = () => ({
    type: CLINICIANS_FAILURE
});

export const updateClinicianId = payload => ({
    type: CLINICIANS_CHANGE,
    payload
});

export const clearClinicianData = () => ({
    type: CLINICIANS_REMOVE
});

export const getClinicians = (params, getMeasureParam) => {
    return dispatch => {
        dispatch(requestClinicians());
        getClinicianData(params)
            .then(data => {
                if (data.data.getProvidersByPracticeId.length > 0) {
                    getMeasureParam.EntityId = data.data.getProvidersByPracticeId[0].id;
                    dispatch(getMeasures(getMeasureParam));
                }
                dispatch(receiveClinicians(data.data.getProvidersByPracticeId));
            })
            .catch(ex => {
                dispatch(failureClinicians());
                throw new Error(ex);
            });
    };
};
