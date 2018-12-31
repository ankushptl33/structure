import { GET_LOCATIONS } from '@/graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '@/utils/jwtUtils';

const api = new APIHelper();

export const getLocationData = params => {
    const requestOption = api.getRequestOption(GET_LOCATIONS, params, api.Actions.View, getJwt());
    return api.PegasusAPI(api.Resources.Location, requestOption, response => response);
};
