import { getActionCreator, getActionType, getActionTypes, getReducer } from '@/utils/redux';
import { getLocationCount, getPractices, getProviderCount } from '@/redux/services/practiceApi';
import { getPracticesRefreshDate } from '@/redux/services/practiceRefreshDateApi';

// Types
export const PracticeListTypes = getActionTypes('PRACTICELIST');
export const PracticeChangeTypes = getActionTypes('PRACTICECHANGE');
export const SetSelectedPracticeType = getActionType('SETSELECTEDPRACTICE');

// Actions
export const SetSelectedPracticeAction = getActionCreator(SetSelectedPracticeType);

export const getSelectedPracticeData = async (
    selectedPracticeId,
    selectedPracticeName,
    selectedPracticeExternalID
) => {
    const response = await Promise.all([
        getProviderCount(selectedPracticeId),
        getLocationCount(selectedPracticeId),
        getPracticesRefreshDate(selectedPracticeId)
    ]);
    return {
        data: {
            id: selectedPracticeId,
            name: selectedPracticeName,
            externalID: selectedPracticeExternalID,
            providerCnt: response[0].data.getProviderCount.count,
            locationCnt: response[1].data.getLocationCount.count,
            refreshDateData: [
                {
                    label: 'Updated On',
                    format: 'MMM Do YYYY HH:mm',
                    date:
                        response[2].data.getPracticeRefreshStatus &&
                        response[2].data.getPracticeRefreshStatus.length > 0 &&
                        response[2].data.getPracticeRefreshStatus[0].lastrefreshtime &&
                        new Date(
                            Number(response[2].data.getPracticeRefreshStatus[0].lastrefreshtime)
                        ),
                    title: 'Last when the practice date was refreshed & measure re-calculated'
                },
                {
                    label: 'Start Date',
                    format: 'MMM Do YYYY',
                    date:
                        response[2].data.getPracticeRefreshStatus &&
                        response[2].data.getPracticeRefreshStatus.length > 0 &&
                        response[2].data.getPracticeRefreshStatus[0].startdate &&
                        new Date(Number(response[2].data.getPracticeRefreshStatus[0].startdate)),
                    title: 'Start date of the duration against which the date was last refreshed'
                },
                {
                    label: 'End Date',
                    format: 'MMM Do YYYY',
                    date:
                        response[2].data.getPracticeRefreshStatus &&
                        response[2].data.getPracticeRefreshStatus.length > 0 &&
                        response[2].data.getPracticeRefreshStatus[0].enddate &&
                        new Date(Number(response[2].data.getPracticeRefreshStatus[0].enddate)),
                    title: 'End date of the duration against which the date was refreshed'
                }
            ]
        }
    };
};

export const getPracticeListAction = () => ({
    types: PracticeListTypes,
    callAPI: () => getPractices(),
    handleAction: async ({ type, payload, store }) => {
        switch (type) {
            case PracticeListTypes.SUCCESS: {
                const selectedPracticeId = payload.getPractices && payload.getPractices[0].id;
                const selectedPracticeName = payload.getPractices && payload.getPractices[0].name;
                const selectedPracticeExternalID =
                    payload.getPractices && payload.getPractices[0].externalid;
                store.dispatch(
                    SetSelectedPracticeAction(
                        (await getSelectedPracticeData(
                            selectedPracticeId,
                            selectedPracticeName,
                            selectedPracticeExternalID
                        )).data
                    )
                );
                break;
            }
            default:
                break;
        }
    }
});

export const onPracticeChangeAction = param => ({
    types: PracticeChangeTypes,
    callAPI: () => getSelectedPracticeData(param),
    handleAction: ({ type, payload, store }) => {
        switch (type) {
            case PracticeChangeTypes.SUCCESS: {
                payload.name = store
                    .getState()
                    .QualityDashboard.practiceList.filter(obj => obj.id === payload.id)[0].name;
                payload.externalID = store
                    .getState()
                    .QualityDashboard.practiceList.filter(
                        obj => obj.id === payload.id
                    )[0].externalid;
                store.dispatch(SetSelectedPracticeAction(payload));
                break;
            }
            default:
                break;
        }
    }
});

const initialState = {
    isLoading: true,
    practiceList: [],
    selectedPractice: {
        id: null,
        name: null,
        externalID: null,
        providerCnt: null,
        locationCnt: null,
        refreshDateData: []
    }
};

// Reducer
export default getReducer(initialState, {
    [PracticeListTypes.SUCCESS]: (state, { payload }) => ({
        ...state,
        practiceList: payload.getPractices
    }),
    [SetSelectedPracticeType]: (state, { payload }) => ({
        ...state,
        selectedPractice: payload,
        isLoading: false
    }),
    [PracticeListTypes.ERROR]: () => initialState
});
