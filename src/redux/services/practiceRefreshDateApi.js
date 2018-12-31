import { GET_PRACTICE_REFRESH_DATE } from '@/graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '@/utils/jwtUtils';

const api = new APIHelper();

export const getPracticesRefreshDate = param => {
    const queryInput = { input: { practiceid: param } };
    const requestOption = api.getRequestOption(
        GET_PRACTICE_REFRESH_DATE,
        queryInput,
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Practice, requestOption, response => response);
};
