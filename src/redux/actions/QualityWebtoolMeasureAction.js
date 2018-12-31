import {
    getMeasuresList,
    getWebtoolProfileMeasurePreference,
    getWebtoolProviderProfile,
    setWebtoolProfileMeasurePreference,
    webtoolcreateProfile
} from '../services/QualityWebtoolMeasureService';
import { getClinicianData } from '../services/clinicianPerformanceApi';
import { getWebtoolCalendar } from '@/redux/services/measureFilterApi';
import { getPractices } from '../services/practiceApi';

export const WEBTOOL_PRACTICES_REQUEST = 'WEBTOOL_PRACTICES_REQUEST';
export const WEBTOOL_PRACTICES_RECEIVE = 'WEBTOOL_PRACTICES_RECEIVE';
export const WEBTOOL_PRACTICES_FAILURE = 'WEBTOOL_PRACTICES_FAILURE';
export const WEBTOOL_PRACTICE_CHANGE = 'WEBTOOL_PRACTICE_CHANGE';

export const WEBTOOL_CLINICIANS_REQUEST = 'WEBTOOL_LINICIANS_REQUEST';
export const WEBTOOL_CLINICIANS_RECEIVE = 'WEBTOOL_LINICIANS_RECEIVE';
export const WEBTOOL_CLINICIANS_FAILURE = 'WEBTOOL_LINICIANS_FAILURE';

export const PROVIDER_CHANGE = 'PROVIDER_CHANGE';
export const YEAR_CHANGE = 'YEAR_CHANGE';
export const MEASURE_GET = 'MEASURE_GET';

export const WEBTOOL_MEASURE_REQUEST = 'WEBTOOL_MEASURE_REQUEST';
export const WEBTOOL_MEASURE_RECEIVE = 'WEBTOOL_MEASURE_RECEIVE';
export const WEBTOOL_MEASURE_FAILURE = 'WEBTOOL_MEASURE_FAILURE';

export const WEBTOOL_YEAR_REQUEST = 'WEBTOOL_YEAR_REQUEST';
export const WEBTOOL_YEAR_RECEIVE = 'WEBTOOL_YEAR_RECEIVE';
export const WEBTOOL_YEAR_FAILURE = 'WEBTOOL_YEAR_FAILURE';

export const MEASURE_SELECTION_CHANGE = 'MEASURE_SELECTION_CHANGE';
export const WEBTOOL_ALLMEASURESHOW = 'WEBTOOL_ALLMEASURESHOW';

export const WEBTOOL_PROVIDERPROFILE_REQUEST = 'WEBTOOL_PROVIDERPROFILE_REQUEST';
export const WEBTOOL_PROVIDERPROFILE_RECEIVE = 'WEBTOOL_PROVIDERPROFILE_RECEIVE';
export const WEBTOOL_PROVIDERPROFILE_FAILURE = 'WEBTOOL_PROVIDERPROFILE_FAILURE';

export const WEBTOOL_GETPROVIDER_PROFILE = 'WEBTOOL_GETPROVIDER_PROFILE';

export const WEBTOOL_CREATEPROFILE_REQUEST = 'WEBTOOL_CREATEPROFILE_REQUEST';
export const WEBTOOL_CREATEPROFILE_RECEIVE = 'WEBTOOL_CREATEPROFILE_RECEIVE';
export const WEBTOOL_CREATEPROFILE_FAILURE = 'WEBTOOL_CREATEPROFILE_FAILURE';

export const WEBTOOL_PROVIDERPROFILEPREFERENCE_REQUEST =
    'WEBTOOL_PROVIDERPROFILEPREFERENCE_REQUEST';
export const WEBTOOL_PROVIDERPROFILEPREFERENCE_RECEIVE =
    'WEBTOOL_PROVIDERPROFILEPREFERENCE_RECEIVE';
export const WEBTOOL_PROVIDERPROFILEPREFERENCE_FAILURE =
    'WEBTOOL_PROVIDERPROFILEPREFERENCE_FAILURE';

export const WEBTOOL_GETPROVIDERPROFILEPREFERENCE_REQUEST =
    'WEBTOOL_GETPROVIDERPROFILEPREFERENCE_REQUEST';
export const WEBTOOL_GETPROVIDERPROFILEPREFERENCE_RECEIVE =
    'WEBTOOL_GETPROVIDERPROFILEPREFERENCE_RECEIVE';
export const WEBTOOL_GETPROVIDERPROFILEPREFERENCE_FAILURE =
    'WEBTOOL_GETPROVIDERPROFILEPREFERENCE_FAILURE';

export const WEBTOOL_SAVEMEASURES_REQUEST = 'WEBTOOL_SAVEMEASURES_REQUEST';
export const CLEAR_STATE_PROVIDERCHANGE = 'CLEAR_STATE_PROVIDERCHANGE';

export const RESET_MEASURE_CLICK = 'RESET_MEASURE_CLICK';

export const RESET_MEASURECLICK_RERENDER = 'RESET_MEASURECLICK_RERENDER';

const requestPractices = () => ({
    type: WEBTOOL_PRACTICES_REQUEST
});

const receivePractices = payload => ({
    type: WEBTOOL_PRACTICES_RECEIVE,
    payload
});

const failurePractices = () => ({
    type: WEBTOOL_PRACTICES_FAILURE
});

export const updatePracticeId = payload => ({
    type: WEBTOOL_PRACTICE_CHANGE,
    payload
});

const requestClinicians = () => ({
    type: WEBTOOL_CLINICIANS_REQUEST
});

const receiveClinicians = payload => ({
    type: WEBTOOL_CLINICIANS_RECEIVE,
    payload
});

const failureClinicians = () => ({
    type: WEBTOOL_CLINICIANS_FAILURE
});

export const changeProviderId = payload => ({
    type: PROVIDER_CHANGE,
    payload
});

export const changeyearId = payload => ({
    type: YEAR_CHANGE,
    payload
});

const requestWebtoolMeasure = () => ({
    type: WEBTOOL_MEASURE_REQUEST
});

const receiveWebtoolMeasures = payload => ({
    type: WEBTOOL_MEASURE_RECEIVE,
    payload
});

const failureWebtoolMeasures = () => ({
    type: WEBTOOL_MEASURE_FAILURE
});

const requestCreateProfile = () => ({
    type: WEBTOOL_CREATEPROFILE_REQUEST
});

const receiveCreateProfile = payload => ({
    type: WEBTOOL_CREATEPROFILE_RECEIVE,
    payload
});

const failureCreateProfile = () => ({
    type: WEBTOOL_CREATEPROFILE_FAILURE
});

const requestProfileMeasurePreference = payload => ({
    type: WEBTOOL_PROVIDERPROFILEPREFERENCE_REQUEST,
    payload
});

const receiveProfileMeasurePreference = payload => ({
    type: WEBTOOL_PROVIDERPROFILEPREFERENCE_RECEIVE,
    payload
});

const failureProfileMeasurePreference = () => ({
    type: WEBTOOL_GETPROVIDERPROFILEPREFERENCE_FAILURE
});

const requestgetProfileMeasurePreference = () => ({
    type: WEBTOOL_GETPROVIDERPROFILEPREFERENCE_REQUEST
});

const receivegetProfileMeasurePreference = payload => ({
    type: WEBTOOL_GETPROVIDERPROFILEPREFERENCE_RECEIVE,
    payload
});

const failuregetProfileMeasurePreference = () => ({
    type: WEBTOOL_PROVIDERPROFILEPREFERENCE_FAILURE
});

const requestWebtoolYear = () => ({
    type: WEBTOOL_YEAR_REQUEST
});

const receiveWebtoolYear = payload => ({
    type: WEBTOOL_YEAR_RECEIVE,
    payload
});

const failureWebtoolYear = () => ({
    type: WEBTOOL_YEAR_FAILURE
});

const requestProviderProfile = () => ({
    type: WEBTOOL_PROVIDERPROFILE_REQUEST
});

const receiveProviderProfile = payload => ({
    type: WEBTOOL_PROVIDERPROFILE_RECEIVE,
    payload
});

const failureProviderProfile = () => ({
    type: WEBTOOL_PROVIDERPROFILE_FAILURE
});

export const updateMeasureSelection = payload => ({
    type: MEASURE_SELECTION_CHANGE,
    payload
});
export const updateShowAllMasure = payload => ({
    type: WEBTOOL_ALLMEASURESHOW,
    payload
});
export const saveMeasures = payload => ({
    type: WEBTOOL_SAVEMEASURES_REQUEST,
    payload
});
export const clearStateOnProviderChange = () => ({
    type: CLEAR_STATE_PROVIDERCHANGE
});

export const onResetSelectedMeasure = payload => ({
    type: RESET_MEASURE_CLICK,
    payload
});
export const refreshRenderForResetClick = payload => ({
    type: RESET_MEASURECLICK_RERENDER,
    payload
});
// export const saveSelectedMeasures = params => {
//   return dispatch => {
//     // dispatch(requestProviderProfile());
//     //  saveSelectedMeasures(params)
//     //  .then(res => res.json())
//     //   .then(json => {
//     dispatch(saveMeasures(params));
//     //  })
//     // .catch(ex => {
//     //   dispatch(failureProviderProfile());
//     //   throw new Error(ex);
//     //});
//   };
// };

export const getYearsData = () => {
    return dispatch => {
        dispatch(requestWebtoolYear());
        getWebtoolCalendar()
            .then(response => response.json())
            .then(response => {
                const calendarData = response.data.getCalendars;
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
                            name: obj.year,
                            value: obj.id
                        });
                    }
                });

                dispatch(receiveWebtoolYear(year));
            })
            .catch(ex => {
                dispatch(failureWebtoolYear());
                throw new Error(ex);
            });
    };
};

export const getClinicians = params => {
    return dispatch => {
        dispatch(requestClinicians());
        getClinicianData(params)
            .then(data => data)
            .then(data => {
                dispatch(receiveClinicians(data.data.getProvidersByPracticeId));
            })
            .catch(ex => {
                dispatch(failureClinicians());
                throw new Error(ex);
            });
    };
};

// export const measureDataGet = () => {
//   return dispatch => {
//     dispatch(requestWebtoolMeasure());
//     getWebtoolMeasures()
//       .then(res => res.json())
//       .then(json => {
//         dispatch(receiveWebtoolMeasures(json));
//       })
//       .catch(ex => {
//         dispatch(failureWebtoolMeasures());
//         throw new Error(ex);
//       });
//   };
// };

export const getMeasures = params => {
    return dispatch => {
        dispatch(requestWebtoolMeasure());
        getMeasuresList(params)
            .then(data => {
                return data.json();
            })
            .then(data => {
                dispatch(receiveWebtoolMeasures(data.data.getMeasures));
            })
            .catch(ex => {
                dispatch(failureWebtoolMeasures());
                throw new Error(ex);
            });
    };
};

export const getPracticeData = () => {
    return dispatch => {
        dispatch(requestPractices());
        getPractices()
            .then(data => data)
            .then(data => {
                dispatch(receivePractices(data.data.getPractices));
            })
            .catch(ex => {
                dispatch(failurePractices());
                throw new Error(ex);
            });
    };
};

export const getProviderProfile = params => {
    return async dispatch => {
        dispatch(requestProviderProfile());
        if (!params.input.providerid) {
        } else {
            try {
                let profileInfo = await getWebtoolProviderProfile(params);
                if (profileInfo.ok) {
                    let parsedProfileInfo = await profileInfo.json();
                    dispatch(receiveProviderProfile(parsedProfileInfo.data.getProfiles));
                } else {
                    throw new Error();
                }
            } catch (ex) {
                dispatch(failureProviderProfile());
            }
        }
    };
};

export const createProfile = params => {
    return async dispatch => {
        dispatch(requestCreateProfile());
        if (!params.input.providerid) {
        } else {
            try {
                let profileInfo = await webtoolcreateProfile(params);
                if (profileInfo.ok) {
                    let parsedProfileInfo = await profileInfo.json();
                    dispatch(receiveCreateProfile(parsedProfileInfo.data.createProfile));
                } else {
                    throw new Error();
                }
            } catch (ex) {
                dispatch(failureCreateProfile());
            }
        }
    };
};

export const getProfileMeasurePreference = params => {
    return async dispatch => {
        dispatch(requestgetProfileMeasurePreference());

        try {
            let profilePref = await getWebtoolProfileMeasurePreference(params);
            if (profilePref.ok) {
                let parsedProfileInfo = await profilePref.json();

                let measureList = [];
                parsedProfileInfo.data.getProfileMeasurePreferences.map(measure => {
                    measureList.push(measure.measureid);
                });
                dispatch(receivegetProfileMeasurePreference(measureList));
            } else {
                throw new Error();
            }
        } catch (ex) {
            dispatch(failuregetProfileMeasurePreference());
        }
    };
};

export const setProfileMeasurePreference = params => {
    return async dispatch => {
        dispatch(requestProfileMeasurePreference(params.input.measureidList));
        // setWebtoolProfileMeasurePreference(params)
        //     .then(res => res.json())
        //     .then(json => {
        //         dispatch(
        //             receiveProfileMeasurePreference( json.data.setProfileMeasurePreference )
        //         );
        //     })
        //     .catch(ex => {
        //         dispatch(failureProfileMeasurePreference());
        //         throw new Error(ex);
        //     });
        try {
            let profilePref = await setWebtoolProfileMeasurePreference(params);
            if (profilePref.ok) {
                let parsedProfileInfo = await profilePref.json();

                dispatch(receiveProfileMeasurePreference(parsedProfileInfo));
            } else {
                throw new Error();
            }
        } catch (ex) {
            dispatch(failureProfileMeasurePreference());
        }
    };
};
