import APIHelper from '@/helper/apihelper';
import { GET_MEASURES_FOR_WEBTOOL } from '../../graphql/query';
import { SAVE_WEBTOOL_FORM } from '../../graphql/mutation';
import { getJwt } from '../../utils/jwtUtils';

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
        body: JSON.stringify({
            query: GET_MEASURES_FOR_WEBTOOL,
            variables: params
        })
    };

    return fetch(api.Resources.Webtool, requestOptions);
};

export const saveWebtoolAnswers = params => {
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
            query: SAVE_WEBTOOL_FORM,
            variables: params
        })
    };

    return fetch(api.Resources.Webtool, requestOptions);
};
