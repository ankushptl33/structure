import { SINGLE_MEASURE_PERFORMANCE } from '@/graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '@/utils/jwtUtils';

const api = new APIHelper();

export const getSingleMeasurePerformance = params => {
    debugger;
    const requestOption = api.getRequestOption(
        SINGLE_MEASURE_PERFORMANCE,
        params,
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Export, requestOption, response => {
        return response;
    });
};
