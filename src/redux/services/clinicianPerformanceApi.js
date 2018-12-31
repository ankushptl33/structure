import { GET_PROVIDERS } from '@/graphql/query';
import { getJwt } from '@/utils/jwtUtils';
import APIHelper from '@/helper/apihelper';

const api = new APIHelper();

export const getClinicianData = params => {
    const requestOption = api.getRequestOption(GET_PROVIDERS, params, api.Actions.View, getJwt());
    return api.PegasusAPI(api.Resources.Provider, requestOption, response => response);
};
