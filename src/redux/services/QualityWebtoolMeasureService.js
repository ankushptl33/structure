// import { GET_PRACTICE } from '../../graphql/query';
// import APIHelper from '@/helper/apiHelper';
// import { getJwt } from '../../utils/jwtUtils';

// export const getWebtoolMeasures = () => {
//   //debugger;;
//   return fetch("http://demo8514396.mockable.io/measureget");
// };

import {
    CREATE_PREFERENCE_MEASURE,
    CREATE_PROVIDER_PROFILE,
    GET_PREFERENCE_MEASURE,
    GET_PROVIDER_PROFILE,
    GET_WEBTOOL_MEASURES
} from '../../graphql/query';
import { getJwt } from '../../utils/jwtUtils';

import APIHelper from '@/helper/apihelper';

export const getWebtoolYeasList = () => {
    const api = new APIHelper();
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Action: api.Actions.View,
            Authorization: getJwt()
        })
        // body: JSON.stringify({ query: GET_PRACTICE, variables: {} }),
    };

    return fetch(api.Resources.Year, requestOptions);
};

export const getMeasuresList = params => {
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
        body: JSON.stringify({ query: GET_WEBTOOL_MEASURES, variables: params })
    };

    return fetch(api.Resources.Measure, requestOptions);
};

export const getWebtoolProviderProfile = params => {
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

export const webtoolcreateProfile = params => {
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
        body: JSON.stringify({
            query: CREATE_PROVIDER_PROFILE,
            variables: params
        })
    };

    return fetch(api.Resources.qualityPreference, requestOptions);
};

export const setWebtoolProfileMeasurePreference = params => {
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
        body: JSON.stringify({
            query: CREATE_PREFERENCE_MEASURE,
            variables: params
        })
    };
    return fetch(api.Resources.qualityPreference, requestOptions);
};

export const getWebtoolProfileMeasurePreference = params => {
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
