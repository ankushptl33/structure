import { CREATE_ADD_VISIT, GET_EDIT_VISIT, UPDATE_VISIT } from '../../graphql/query';
// import APIHelpertest from '@/helper/MockableIOAPIHelper';
import { getJwt } from '../../utils/jwtUtils';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';
import APIHelper from '@/helper/apihelper';

export const addVisit = params => {
    const api = new APIHelper();

    if (!params.input.Unit) {
        params.input.Unit = REGISTRY_UNIT_NAME;
    }
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
            query: CREATE_ADD_VISIT,
            variables: params
        })
    };
    return fetch(api.Resources.patientVisit, requestOptions);
};

export const updateVisit = params => {
    const api = new APIHelper();
    if (!params.input.Unit) {
        params.input.Unit = REGISTRY_UNIT_NAME;
    }
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
            query: UPDATE_VISIT,
            variables: params
        })
    };

    return fetch(api.Resources.patientVisit, requestOptions);
};

export const getVisit = params => {
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
        body: JSON.stringify({ query: GET_EDIT_VISIT, variables: params })
    };
    return fetch(api.Resources.patientVisit, requestOptions);
};
