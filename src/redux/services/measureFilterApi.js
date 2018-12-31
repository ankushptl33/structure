import { GET_CALENDAR, GET_MEASURE_SET } from '@/graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '@/utils/jwtUtils';

const api = new APIHelper();

export const getMeasureSet = () => {
    const requestOption = api.getRequestOption(
        GET_MEASURE_SET,
        {
            input: {
                orderBy: 'name'
            }
        },
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Measure, requestOption, response => response);
};

export const getCalendar = () => {
    const requestOption = api.getRequestOption(
        GET_CALENDAR,
        {
            input: {
                orderByDesc: 'id'
            }
        },
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Measure, requestOption, response => response);
};

export const getWebtoolCalendar = () => {
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
        body: JSON.stringify({ query: GET_CALENDAR, variables: {} })
    };

    return fetch(api.Resources.Measure, requestOptions);
};
