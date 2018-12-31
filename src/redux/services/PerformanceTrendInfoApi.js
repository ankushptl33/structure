import { GET_ALL_MEASURE_OUTPUT, GET_PERFORMANCE_TREND_INFO } from '@/graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '@/utils/jwtUtils';

const api = new APIHelper();

export const getPerformanceInfo = params => {
    const requestOption = api.getRequestOption(
        GET_PERFORMANCE_TREND_INFO,
        params,
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Performance, requestOption, response => {
        return response;
    });
};

export const getMeasureAllOutputPerformance = params => {
    const requestOption = api.getRequestOption(
        GET_ALL_MEASURE_OUTPUT,
        params,
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Performance, requestOption, response => {
        return response;
    });
};
