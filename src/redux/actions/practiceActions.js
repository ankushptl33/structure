import { getLocationCount, getPractices, getProviderCount } from '../services/practiceApi';
import { getPracticesRefreshDates } from '../actions/practiceRefreshDateAction';

export const PRACTICES_REQUEST = 'PRACTICES_REQUEST';
export const PRACTICES_RECEIVE = 'PRACTICES_RECEIVE';
export const PRACTICES_FAILURE = 'PRACTICES_FAILURE';
export const PRACTICE_CHANGE = 'PRACTICE_CHANGE';

const requestPractices = () => ({
    type: PRACTICES_REQUEST
});

const receivePractices = payload => ({
    type: PRACTICES_RECEIVE,
    payload
});

const failurePractices = () => ({
    type: PRACTICES_FAILURE
});

export const updatePracticeId = payload => ({
    type: PRACTICE_CHANGE,
    payload
});

export const practiceChange = selectedPracticeId => {
    return dispatch => {
        getProviderCnt(selectedPracticeId, providerCnt => {
            getLocationCnt(selectedPracticeId, locationCnt => {
                const practiceData = {
                    selectedPracticeId,
                    providerCnt,
                    locationCnt
                };
                dispatch(updatePracticeId(practiceData));
            });
        });
    };
};

export const getPracticeData = () => {
    return dispatch => {
        dispatch(requestPractices());
        getPractices()
            .then(data => {
                const practiceList = data.data.getPractices;
                const defaultSelectedPracticeId = practiceList[0].id;
                getProviderCnt(defaultSelectedPracticeId, providerCnt => {
                    getLocationCnt(defaultSelectedPracticeId, locationCnt => {
                        dispatch(getPracticesRefreshDates(practiceList[0].id));
                        const practiceData = {
                            practiceList,
                            providerCnt,
                            locationCnt
                        };
                        dispatch(receivePractices(practiceData));
                    });
                });
            })
            .catch(ex => {
                dispatch(failurePractices());
                throw new Error(ex);
            });
    };
};

export const getProviderCnt = (param, callback) => {
    try {
        getProviderCount(param).then(data => {
            callback(data.data.getProviderCount.count);
        });
    } catch (ex) {
        throw new Error(ex);
    }
};

export const getLocationCnt = (param, callback) => {
    try {
        getLocationCount(param).then(data => {
            callback(data.data.getLocationCount.count);
        });
    } catch (ex) {
        throw new Error(ex);
    }
};
