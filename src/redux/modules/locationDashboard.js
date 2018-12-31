import { getActionCreator, getActionType, getActionTypes, getReducer } from '@/utils/redux';
import { getLocationData } from '@/redux/services/locationPerformanceApi';

// Types
export const LocationListTypes = getActionTypes('LOCATIONLIST');
export const UpdateSelectedLocationIdType = getActionType('UPDATESELECTEDLOCATIONID');
export const UpdateSelectedLocationIdAction = getActionCreator(UpdateSelectedLocationIdType);

export const getLocationAction = queryParam => ({
    types: LocationListTypes,
    callAPI: () => getLocationData(queryParam)
});

const initialState = {
    islocationLoading: true,
    location: [],
    selectedLocationId: null
};

// Reducer
export default getReducer(initialState, {
    [LocationListTypes.READY]: state => ({
        ...state,
        islocationLoading: true
    }),
    [LocationListTypes.SUCCESS]: (state, { payload }) => ({
        ...state,
        location: payload.getLocations,
        selectedLocationId: payload.getLocations.length !== 0 && payload.getLocations[0].id,
        islocationLoading: false
    }),
    [UpdateSelectedLocationIdType]: (state, { payload }) => ({
        ...state,
        selectedLocationId: payload
    }),
    [LocationListTypes.ERROR]: () => initialState
});
