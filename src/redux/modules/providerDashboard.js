import { getActionCreator, getActionType, getActionTypes, getReducer } from '@/utils/redux';
import { getClinicianData } from '@/redux/services/clinicianPerformanceApi';

// Types
export const ProviderListTypes = getActionTypes('PROVIDERLIST');
export const UpdateSelectedProviderIdType = getActionType('UPDATESELECTEDPROVIDERID');
export const UpdateSelectedProviderIdAction = getActionCreator(UpdateSelectedProviderIdType);

export const getProviderAction = queryParam => ({
    types: ProviderListTypes,
    callAPI: () => getClinicianData(queryParam)
});

const initialState = {
    isProviderLoading: true,
    provider: [],
    selectedProviderId: null
};

// Reducer
export default getReducer(initialState, {
    [ProviderListTypes.READY]: state => ({
        ...state,
        isProviderLoading: true
    }),
    [ProviderListTypes.SUCCESS]: (state, { payload }) => ({
        ...state,
        provider: payload.getProvidersByPracticeId,
        selectedProviderId:
            payload.getProvidersByPracticeId.length !== 0 && payload.getProvidersByPracticeId[0].id,
        isProviderLoading: false
    }),
    [UpdateSelectedProviderIdType]: (state, { payload }) => ({
        ...state,
        selectedProviderId: payload
    }),
    [ProviderListTypes.ERROR]: () => initialState
});
