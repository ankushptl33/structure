import {
    GET_CALENDAR,
    GET_PATIENT_VISIT,
    GET_PREFERENCE_MEASURE,
    GET_PROVIDER_PROFILE,
    GET_VISIT
} from '../../graphql/query';
import { DELETE_SOFT_VISIT } from '../../graphql/mutation';
import APIHelperService from '@/helper/MockableIOAPIHelper';
import APIHelper from '@/helper/apihelper';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';
import { getJwt } from '../../utils/jwtUtils';

const api = new APIHelper();
export const getVisits = params => {
    const requestOption = api.getRequestOption(GET_VISIT, params, api.Actions.View, getJwt());
    return api.PegasusAPI(api.Resources.patientVisit, requestOption, response => {
        return response;
    });
};

export const searchVisits = () => {
    const api = new APIHelperService();
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Action: api.Actions.View,
            Authorization: getJwt()
        })
        // body: JSON.stringify({ query: GET_VISIT, variables: {} }),
    };

    return fetch(api.Resources.SearchVisit, requestOptions);
};

export const deleteSoftVisit = params => {
    const requestOption = api.getRequestOption(
        DELETE_SOFT_VISIT,
        params,
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.patientVisit, requestOption, response => {
        return response;
    });
};

export const getCalendar = () => {
    const api = new APIHelper();
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Action: api.Actions.View,
            Authorization: getJwt()
        }),
        body: JSON.stringify({ query: GET_CALENDAR, variables: {} })
    };

    return fetch(api.Resources.Measure, requestOptions);
};

export const getVisitProviderProfile = params => {
    const api = new APIHelper();
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Action: api.Actions.View,
            Authorization: getJwt()
        }),
        body: JSON.stringify({ query: GET_PROVIDER_PROFILE, variables: params })
    };

    return fetch(api.Resources.qualityPreference, requestOptions);
};

export const getVisitProfileMeasurePreference = params => {
    const api = new APIHelper();
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Action: api.Actions.View,
            Authorization: getJwt()
        }),
        body: JSON.stringify({ query: GET_PREFERENCE_MEASURE, variables: params })
    };
    return fetch(api.Resources.qualityPreference, requestOptions);
};

export const getPatientVisitList = params => {
    /**
     * TODO - remove hardcoded values once search API is in place
     */
    params = {
        input: {
            PracticeId: 23,
            ProviderId: 1652,
            Unit: REGISTRY_UNIT_NAME,
            Year: 2018,
            PageSize: 50,
            PageNumber: 1
        }
    };

    const requestOption = api.getRequestOption(
        GET_PATIENT_VISIT,
        params,
        api.Actions.View,
        getJwt()
    );

    return api.PegasusAPI(api.Resources.patientVisit, requestOption, response => {
        return response;
    });
    // return fetch('http://192.168.105.169:7007/webtool', requestOptions);
};
