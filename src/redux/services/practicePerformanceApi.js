import { GET_MEASURE_PERFORMANCE } from '@/graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '@/utils/jwtUtils';

const api = new APIHelper();

export const getMeasuresPerformance = params => {
    const requestOption = api.getRequestOption(
        GET_MEASURE_PERFORMANCE,
        params,
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Performance, requestOption, response => response);
};
