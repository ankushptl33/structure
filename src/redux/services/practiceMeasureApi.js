import { GET_MEASURES, SET_USER_FAVORITE_MEASURE } from '@/graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '@/utils/jwtUtils';

const api = new APIHelper();

export const getMeasuresList = params => {
    const requestOption = api.getRequestOption(GET_MEASURES, params, api.Actions.View, getJwt());
    return api.PegasusAPI(api.Resources.Measure, requestOption, response => response);
};

export const setUserFavoriteMeasure = params => {
    const requestOption = api.getRequestOption(
        SET_USER_FAVORITE_MEASURE,
        params,
        api.Actions.Update,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Measure, requestOption, response => response);
};
