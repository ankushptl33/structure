import { getLocationData } from '@/redux/services/locationPerformanceApi';
import { getMeasures } from '../actions/practiceMeasureAction';

export const LOCATIONS_REQUEST = 'LOCATIONS_REQUEST';
export const LOCATIONS_RECEIVE = 'LOCATIONS_RECEIVE';
export const LOCATIONS_FAILURE = 'LOCATIONS_FAILURE';
export const LOCATION_CHANGE = 'LOCATION_CHANGE';
export const LOCATION_REMOVE = 'LOCATION_REMOVE';

const requestLocations = () => ({
    type: LOCATIONS_REQUEST
});

const receiveLocations = payload => ({
    type: LOCATIONS_RECEIVE,
    payload
});

const failureLocations = () => ({
    type: LOCATIONS_FAILURE
});

export const updateLocationId = payload => ({
    type: LOCATION_CHANGE,
    payload
});

export const clearLocation = () => ({
    type: LOCATION_REMOVE
});

export const getLocations = (params, getMeasureParam) => {
    return dispatch => {
        dispatch(requestLocations());
        getLocationData(params)
            .then(data => {
                if (data.data.getLocations === null) dispatch(failureLocations());
                else {
                    if (data.data.getLocations.length > 0) {
                        getMeasureParam.EntityId = data.data.getLocations[0].id;
                        dispatch(getMeasures(getMeasureParam));
                    }
                    dispatch(receiveLocations(data.data.getLocations));
                }
            })
            .catch(ex => {
                dispatch(failureLocations());
                throw new Error(ex);
            });
    };
};
