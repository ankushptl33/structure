import { getAllPatientByEntity } from '../services/patientAPI';

export const PATIENTS_BY_ENTITY_REQUEST = 'PATIENTS_BY_ENTITY_REQUEST';
export const PATIENTS_BY_ENTITY_RECEIVE = 'PATIENTS_BY_ENTITY_RECEIVE';
export const PATIENTS_BY_ENTITY_FAILURE = 'PATIENTS_BY_ENTITY_FAILURE';
export const CLEAR_PATIENT_LIST = 'CLEAR_PATIENT_LIST';

const requestPatientInfo = () => ({
    type: PATIENTS_BY_ENTITY_REQUEST
});

const receivePatientInfo = payload => ({
    type: PATIENTS_BY_ENTITY_RECEIVE,
    payload
});

const failurePatientInfo = () => ({
    type: PATIENTS_BY_ENTITY_FAILURE
});

export const getAllPatientByEntityData = params => dispatch => {
    dispatch(requestPatientInfo());
    getAllPatientByEntity(params)
        .then(json => {
            dispatch(receivePatientInfo(json.data.getAllPatientByEntity));
        })
        .catch(ex => {
            dispatch(failurePatientInfo());
            throw new Error(ex);
        });
};

export const clearPatinetList = params => dispatch => {
    dispatch({ type: CLEAR_PATIENT_LIST, payload: [] });
};
