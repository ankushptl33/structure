import { GET_PRACTICE, GET_PRACTICE_LOCATION_COUNT, GET_PRACTICE_PROVIDER_COUNT } from '@/graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '../../utils/jwtUtils';

const api = new APIHelper();

export const getPractices = () => {
    const requestOption = api.getRequestOption(
        GET_PRACTICE,
        {
            input: {
                inactive: false,
                orderBy: 'name'
            }
        },
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Practice, requestOption, response => response);
};

export const getProviderCount = param => {
    const queryInput = { input: { practiceid: param, inactive: false } };
    const requestOption = api.getRequestOption(
        GET_PRACTICE_PROVIDER_COUNT,
        queryInput,
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Provider, requestOption, response => response);
};

export const getLocationCount = param => {
    const queryInput = { input: { practiceid: param, inactive: false } };
    const requestOption = api.getRequestOption(
        GET_PRACTICE_LOCATION_COUNT,
        queryInput,
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Location, requestOption, response => response);
};
