import {
    deleteSoftVisit,
    getCalendar,
    getPatientVisitList,
    getVisitProfileMeasurePreference,
    getVisitProviderProfile,
    getVisits,
    searchVisits
} from '../services/visitApi';

import { addVisit, updateVisit } from '../services/editVisitApi';
import { getPractices } from '../services/practiceApi';
import { getClinicianData } from '../services/clinicianPerformanceApi';

// var moment = require('moment');
export const VISITS_REQUEST = 'VISITS_REQUEST';
export const VISITS_RECEIVE = 'VISITS_RECEIVE';
export const VISITS_FAILURE = 'VISITS_FAILURE';
export const VISITS_SELECTION = 'VISITS_SELECTION';
export const VISITS_SEARCH = 'VISITS_SEARCH';
export const VISITS_MEASUREDETAILS = 'VISITS_MEASUREDETAILS';
export const VISITS_EDIT = 'VISITS_EDIT';
export const VISITS_MEASURE_QUERY_PARAM = 'VISITS_MEASURE_QUERY_PARAM';
export const VISITS_UPDATE = 'VISITS_UPDATE';
export const VISITS_ADD = 'VISITS_ADD';

export const VISITS_SETSELECTEDCLINICIAN = 'VISITS_SETSELECTEDCLINICIAN';
export const VISITS_ADD_ACTION = 'VISITS_ADD_ACTION';
export const UPDATE_PRACTICE_VISIT = 'UPDATE_PRACTICE_VISIT';
export const UPDATE_PROVIDER_VISIT = 'UPDATE_PROVIDER_VISIT';
export const UPDATE_YEAR_VISIT = 'UPDATE_YEAR_VISIT';

export const ADD_VISIT_REQUEST = 'ADD_VISIT_REQUEST';
export const ADD_VISIT_RECEIVE = 'ADD_VISIT_RECEIVE';
export const ADD_VISIT_FAILURE = 'ADD_VISIT_FAILURE';

export const UPDATE_VISIT_REQUEST = 'UPDATE_VISIT_REQUEST';
export const UPDATE_VISIT_RECEIVE = 'UPDATE_VISIT_RECEIVE';
export const UPDATE_VISIT_FAILURE = 'UPDATE_VISIT_FAILURE';

export const EDIT_VISITS_RECEIVE = 'EDIT_VISITS_RECEIVE';
export const PATIENT_VISIT_LIST = 'PATIENT_VISIT_LIST';

export const VISIT_PRACTICE_CHANGE = 'VISIT_PRACTICE_CHANGE';
export const VISIT_CLINICIAN_CHANGE = 'VISIT_CLINICIAN_CHANGE';

export const REQUEST_SINGLE_VISIT = 'REQUEST_SINGLE_VISIT';
export const RECEIVE_SINGLE_VISIT = 'RECEIVE_SINGLE_VISIT';
export const FAILURE_SINGLE_VISIT = 'FAILURE_SINGLE_VISIT';

export const RECEIVE_VISIT = 'RECEIVE_VISIT';

const requestVisits = () => ({
    type: VISITS_REQUEST
});

const receiveVisits = payload => ({
    type: VISITS_RECEIVE,
    payload
});

// eslint-disable-next-line no-unused-vars
const receiveVisitDetails = payload => ({
    type: EDIT_VISITS_RECEIVE,
    payload
});

const failureVisits = () => ({
    type: VISITS_FAILURE
});

// export const addVisit = payload => ({
//     type: VISITS_ADD,
//     payload
// });

// export const updateVisit = payload => ({
//     type: VISITS_UPDATE,
//     payload
// });

export const editVisit = payload => ({
    type: VISITS_EDIT,
    payload
});

export const measureQueryParam = payload => ({
    type: VISITS_MEASURE_QUERY_PARAM,
    payload
});

export const receiveSearchVisit = payload => ({
    type: VISITS_SEARCH,
    payload
});

const requestVisit = () => ({
    type: ADD_VISIT_REQUEST
});

const receiveVisit = payload => ({
    type: ADD_VISIT_RECEIVE,
    payload
});

const failureVisit = () => ({
    type: ADD_VISIT_FAILURE
});

const requestUpdateVisit = () => ({
    type: UPDATE_VISIT_REQUEST
});

const receiveUpdateVisit = payload => ({
    type: UPDATE_VISIT_RECEIVE,
    payload
});

const failureUpdateVisit = () => ({
    type: UPDATE_VISIT_FAILURE
});

export const setSelectedPractice = payload => ({
    type: VISIT_PRACTICE_CHANGE,
    payload
});

export const setSelectedClinician = payload => ({
    type: VISIT_CLINICIAN_CHANGE,
    payload
});

export const measureDetailVisit = payload => ({
    type: VISITS_MEASUREDETAILS,
    payload
});

const requestSingleVisit = payload => ({
    type: REQUEST_SINGLE_VISIT
});

const receiveSingleVisit = payload => ({
    type: RECEIVE_SINGLE_VISIT,
    payload
});

const receiveVisitInfo = payload => ({
    type: RECEIVE_VISIT,
    payload
});

const failureSingleVisit = () => ({
    type: FAILURE_SINGLE_VISIT
});

export const addVisitData = params => {
    return async dispatch => {
        dispatch(requestVisit());
        try {
            let resp = await addVisit(params);

            if (resp.ok) {
                const parsedResp = await resp.json();                
                let response = parsedResp.data.createVisit;
                if (parsedResp.errors) {                    
                    response = parsedResp.errors[0];
                }
                dispatch(
                    receiveVisit({
                        ...params.input,
                        ...response
                    })
                );
            } else {                
                throw new Error("Invalid input provided");
            }
        } catch (ex) {
            dispatch(failureVisit());
        }
    };
};

export const updateVisitData = params => {
    return async dispatch => {
        dispatch(requestUpdateVisit());
        try {
            let resp = await updateVisit(params);

            if (resp.ok) {
                const parsedResp = await resp.json();
                dispatch(
                    receiveUpdateVisit({
                        ...params.input,
                        ...parsedResp.data.createVisit
                    })
                );
            } else {
                throw new Error();
            }
        } catch (ex) {
            dispatch(failureUpdateVisit());
        }
    };
};

export const selectionVisit = payload => ({
    type: VISITS_SELECTION,
    payload
});

export const selectVisit = payload => ({
    type: VISITS_SELECTION,
    payload
});

export const addVisitAction = payload => ({
    type: VISITS_ADD_ACTION,
    payload
});

export const updateSelectedPracticeforVisits = payload => ({
    type: UPDATE_PRACTICE_VISIT,
    payload
});

export const updateSelectedPracticeforVisit = payload => {
    return dispatch => {
        dispatch(updateSelectedPracticeforVisits(payload));
    };
};

export const updateSelectedProviderforVisits = payload => ({
    type: UPDATE_PROVIDER_VISIT,
    payload
});

export const updateSelectedProviderforVisit = payload => {
    return dispatch => {
        dispatch(updateSelectedProviderforVisits(payload));
    };
};

export const updateSelectedYearforVisits = payload => ({
    type: UPDATE_YEAR_VISIT,
    payload
});

export const updateSelectedYearforVisit = payload => {
    return dispatch => {
        dispatch(updateSelectedYearforVisits(payload));
    };
};

export const getVisitData = params => {
    return async dispatch => {
        dispatch(requestVisits());
        try {
            let data = await getVisits(params);
            if (data.data.getVisits) {
                const visitData = data.data.getVisits;
                dispatch(receiveVisits(visitData));
            } else {
                dispatch(failureVisits());
            }
        } catch (ex) {
            dispatch(failureVisits());
        }
    };
};

/**
 * THIS SECTION USED GET GET YEARS
 * ADDED BY - RAVIRAJ CHOUGULE
 */
export const VISIT_YEAR_FAILURE = 'VISIT_YEAR_FAILURE';
export const VISIT_YEAR_REQUEST = 'VISIT_YEAR_REQUEST';
export const VISIT_YEAR_RECEIVE = 'VISIT_YEAR_RECEIVE';
export const VISIT_YEAR_CHANGE = 'VISIT_YEAR_CHANGE';

const failureVisitYear = () => ({
    type: VISIT_YEAR_FAILURE
});

const requestVisitYear = () => ({
    type: VISIT_YEAR_REQUEST
});

const receiveVisitYear = payload => ({
    type: VISIT_YEAR_RECEIVE,
    payload
});

export const setSelectedVisitYear = payload => ({
    type: VISIT_YEAR_CHANGE,
    payload
});

export const getYearsData = () => {
    return async dispatch => {
        dispatch(requestVisitYear());
        try {
            let resp = await getCalendar();
            if (resp.ok) {
                let parsedResponse = await resp.json();
                const calendarData = parsedResponse.data.getCalendars;
                let year = [];
                let _year = [];
                // eslint-disable-next-line no-unused-vars
                let duration = [];
                // eslint-disable-next-line no-unused-vars
                let _duration = [];
                calendarData.map((obj, index) => {
                    if (_year.indexOf(obj.year) === -1) {
                        _year.push(obj.year);
                        year.push({
                            id: obj.id,
                            text: obj.year,
                            value: obj.id
                        });
                    }
                });

                dispatch(receiveVisitYear(year));
            } else {
                throw new Error();
            }
        } catch (ex) {
            dispatch(failureVisitYear());
        }
    };
};

/**
 * THIS SECTION USED GET GET PRACTICE
 * ADDED BY - RAVIRAJ CHOUGULE
 */
export const VISIT_PRACTICES_REQUEST = 'VISIT_PRACTICES_REQUEST';
export const VISIT_PRACTICES_RECEIVE = 'VISIT_PRACTICES_RECEIVE';
export const VISIT_PRACTICES_FAILURE = 'VISIT_PRACTICES_FAILURE';

const requestPractices = () => ({
    type: VISIT_PRACTICES_REQUEST
});

const receivePractices = payload => {
    return {
        type: VISIT_PRACTICES_RECEIVE,
        payload
    };
};

const failurePractices = () => ({
    type: VISIT_PRACTICES_FAILURE
});

export const getPracticeData = () => {
    return async dispatch => {
        dispatch(requestPractices());
        try {
            let resp = await getPractices();
            if (resp.data.getPractices) {
                // let practiceData = await resp.json();
                let practiceData = resp.data.getPractices;
                let practiceJsonObj = [];
                practiceData.map((obj, index) => {
                    let item = {};
                    item['id'] = obj.id;
                    item['text'] = obj.name;
                    item['value'] = obj.id;
                    practiceJsonObj.push(item);
                });

                dispatch(receivePractices(practiceJsonObj));
            } else {
                throw new Error();
            }
        } catch (ex) {
            dispatch(failurePractices());
        }
    };
};

/**
 * THIS SECTION USED GET GET PROVIDER
 * ADDED BY - RAVIRAJ CHOUGULE
 */
export const VISIT_CLINICIANS_REQUEST = 'VISIT_CLINICIANS_REQUEST';
export const VISIT_CLINICIANS_RECEIVE = 'VISIT_CLINICIANS_RECEIVE';
export const VISIT_CLINICIANS_FAILURE = 'VISIT_CLINICIANS_FAILURE';

const requestClinicians = () => ({
    type: VISIT_CLINICIANS_REQUEST
});

const receiveClinicians = payload => {    
    return {
        type: VISIT_CLINICIANS_RECEIVE,
        payload
    };
};

const failureClinicians = () => ({
    type: VISIT_CLINICIANS_FAILURE
});

export const getClinicians = params => {
    return async dispatch => {
        dispatch(requestClinicians());
        try {
            let resp = await getClinicianData(params);
            if (resp.data.getProvidersByPracticeId) {
                // let clinicianData = await resp.json();
                let clinicianData = resp.data.getProvidersByPracticeId;
                let clinicianArrayObj = [];
                clinicianData.map((obj, index) => {
                    let item = {};
                    item['id'] = obj.id;
                    item['text'] = obj.firstname + ' ' + obj.lastname + '(NPI- ' + obj.npi + ')';
                    item['value'] = obj.id;
                    clinicianArrayObj.push(item);
                });

                dispatch(receiveClinicians(clinicianArrayObj));
            } else {
                throw new Error();
            }
        } catch (ex) {            
            dispatch(failureClinicians());
        }
    };
};

/**
 * THIS SECTION USED GET GET PROVIDER PROFILE
 * ADDED BY - RAVIRAJ CHOUGULE
 */
export const VISIT_PROVIDERPROFILE_REQUEST = 'VISIT_PROVIDERPROFILE_REQUEST';
export const VISIT_PROVIDERPROFILE_RECEIVE = 'VISIT_PROVIDERPROFILE_RECEIVE';
export const VISIT_PROVIDERPROFILE_FAILURE = 'VISIT_PROVIDERPROFILE_FAILURE';

const requestProviderProfile = () => ({
    type: VISIT_PROVIDERPROFILE_REQUEST
});

const receiveProviderProfile = payload => ({
    type: VISIT_PROVIDERPROFILE_RECEIVE,
    payload
});

const failureProviderProfile = () => ({
    type: VISIT_PROVIDERPROFILE_FAILURE
});

export const getProviderProfile = params => {
    return async dispatch => {
        dispatch(requestProviderProfile());
        try {
            let profileInfo = await getVisitProviderProfile(params);
            if (profileInfo.ok) {
                let parsedProfileInfo = await profileInfo.json();
                dispatch(receiveProviderProfile(parsedProfileInfo.data.getProfiles));
            } else {
                throw new Error();
            }
        } catch (ex) {
            dispatch(failureProviderProfile());
        }
    };
};

/**
 * THIS SECTION USED GET GET PROVIDER PROFILE PREFERENCE
 * ADDED BY - RAVIRAJ CHOUGULE
 */
export const VISIT_GETPROVIDERPROFILEPREFERENCE_REQUEST =
    'VISIT_GETPROVIDERPROFILEPREFERENCE_REQUEST';
export const VISIT_GETPROVIDERPROFILEPREFERENCE_RECEIVE =
    'VISIT_GETPROVIDERPROFILEPREFERENCE_RECEIVE';
export const VISIT_GETPROVIDERPROFILEPREFERENCE_FAILURE =
    'VISIT_GETPROVIDERPROFILEPREFERENCE_FAILURE';

const requestGetProfileMeasurePreference = () => ({
    type: VISIT_GETPROVIDERPROFILEPREFERENCE_REQUEST
});

const receiveGetProfileMeasurePreference = payload => ({
    type: VISIT_GETPROVIDERPROFILEPREFERENCE_RECEIVE,
    payload
});

const failureGetProfileMeasurePreference = () => ({
    type: VISIT_GETPROVIDERPROFILEPREFERENCE_FAILURE
});

export const getProfileMeasurePreference = params => {
    return async dispatch => {
        dispatch(requestGetProfileMeasurePreference());

        try {
            let profilePref = await getVisitProfileMeasurePreference(params);
            if (profilePref.ok) {
                let parsedProfileInfo = await profilePref.json();
                let measureList = [];
                parsedProfileInfo.data.getProfileMeasurePreferences.map(measure => {
                    measureList.push(measure.measureno);
                });
                dispatch(receiveGetProfileMeasurePreference(measureList));
            } else {
                throw new Error();
            }
        } catch (ex) {
            dispatch(failureGetProfileMeasurePreference());
        }
    };
};

export const VISIT_SOFTDELETE_FAILURE = 'VISIT_SOFTDELETE_FAILURE';
export const VISIT_SOFTDELETE_REQUEST = 'VISIT_SOFTDELETE_REQUEST';
export const VISIT_SOFTDELETE_RECEIVE = 'VISIT_SOFTDELETE_RECEIVE';

const failureSoftDeleteVisit = () => ({
    type: VISIT_SOFTDELETE_FAILURE
});

const requestSoftDeleteVisit = () => ({
    type: VISIT_SOFTDELETE_REQUEST
});

const receiveSoftDeleteVisit = payload => ({
    type: VISIT_SOFTDELETE_RECEIVE,
    payload
});

export const deleteSoftVisitbyId = params => {
    return async dispatch => {
        dispatch(requestSoftDeleteVisit());
        try {
            let resp = await deleteSoftVisit(params);

            if (resp.data.deleteVisit.VisitUid) {
                let visitUid = resp.data.deleteVisit.VisitUid;
                dispatch(receiveSoftDeleteVisit(visitUid));
            } else {
                dispatch(failureSoftDeleteVisit());
            }
        } catch (ex) {
            dispatch(failureSoftDeleteVisit());
        }
    };
};

export const searchVisitData = () => {
    return dispatch => {
        dispatch(requestVisits());
        searchVisits()
            .then(res => res.json())
            .then(json => {
                dispatch(receiveSingleVisit(json.ResultInfo.Data.VisitInfo));
            })
            .catch(ex => {
                dispatch(failureVisits());
            });
    };
};

export const receivedPatientVisits = payload => ({
    type: PATIENT_VISIT_LIST,
    payload
});

export const fetchListOfPatientVisits = params => {
    return async dispatch => {
        try {
            let resp = await getPatientVisitList(params);
            if (resp.data.getVisits.length) {
                dispatch(receivedPatientVisits(resp.data.getVisits));
            } else {
                throw Error();
            }
        } catch (ex) {
            dispatch(failureVisits());
        }
    };
};

export const getSingleVisit = params => {
    return async dispatch => {
        dispatch(requestSingleVisit());
        try {
            let resp = await getVisits(params);
            if (resp.data.getVisits) {
                let singleVisitData = resp.data.getVisits[0];
                dispatch(receiveVisitInfo(singleVisitData));
            } else {
                dispatch(failureSingleVisit());
            }
        } catch (ex) {
            dispatch(failureSingleVisit());
        }
    };
};
