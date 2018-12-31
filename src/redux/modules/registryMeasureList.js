import { getActionCreator, getActionType, getActionTypes, getReducer } from '@/utils/redux';
import { getMeasuresList, setUserFavoriteMeasure } from '@/redux/services/practiceMeasureApi';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const MeasureListTypes = getActionTypes('MEASURELIST');
export const FilterRegistryMeasureType = getActionType('FILTERREGISTRYMEASURE');
export const SetUserFavoriteMeasureTypes = getActionTypes('SETUSERFAVORITEMEASURE');
export const UpdateRegistryMeasureListType = getActionType('UPDATEREGISTRYMEASURELIST');

export const SetMeasureIdSelectionType = getActionType('SETMEASURESELECTION');

// Actions
export const SetMeasureIdSelectionAction = getActionCreator(SetMeasureIdSelectionType);

export const UpdateRegistryMeasureListAction = getActionCreator(UpdateRegistryMeasureListType);

export const SetUserFavoriteMeasureAction = params => ({
    types: SetUserFavoriteMeasureTypes,
    callAPI: () =>
        setUserFavoriteMeasure({
            input: {
                measureid: params.measureId,
                IsFavorite: !params.isFavorite
            }
        }),
    handleAction: ({ type, payload, store }) => {
        switch (type) {
            case SetUserFavoriteMeasureTypes.SUCCESS: {
                const measureList = store
                    .getState()
                    .RegistryMeasureList.registrymeasureList.filter(value => {
                        if (value.measureId === params.measureId) {
                            value.isFavourite = !value.isFavourite;
                            value.favourite.icon = value.isFavourite
                                ? ['fas', 'heart']
                                : ['fal', 'heart'];
                        }
                        return value;
                    });
                store.dispatch(UpdateRegistryMeasureListAction(measureList));
                break;
            }
            default:
                break;
        }
    }
});

export const FilterRegistryMeasureAction = getActionCreator(FilterRegistryMeasureType);

const getMeasureGridPerformanceObj = measureGrid => {
    const returnValue = [];
    measureGrid.map(obj => {
        returnValue.push({
            isFavourite: obj.IsFavorite,
            favourite: {
                icon: obj.IsFavorite ? ['fas', 'heart'] : ['fal', 'heart']
            },
            practiceid: '',
            id: obj.measureno,
            displayname: obj.displayname,
            measureId: obj.id,
            measure: {
                measure: {
                    measureno: obj.measureno,
                    displayname: obj.measuredescription,
                    measuredescription: obj.rational,
                    isinverse: obj.isinverse || false
                },
                isStopPropagation: true
            },
            performance: {
                performanceData: {
                    EntityName: '',
                    EntityId: '',
                    ParentEntityId: '',
                    ParentEntityName: '',
                    DurationFrom: '',
                    DurationTo: '',
                    Flag: '',
                    MeasureId: '',
                    Unit: REGISTRY_UNIT_NAME,
                    IsPatientSpecific: 1
                },
                isStopPropagation: false
            }
        });
    });
    return returnValue;
};

export const getMeasureListData = async params => {
    const queryParam = {
        input: {
            measuresetid: params.MeasuresetId,
            inactive: false,
            orderBy: 'listorder'
        }
    };
    const response = await getMeasuresList(queryParam);
    return {
        data: getMeasureGridPerformanceObj(response.data.getMeasures)
    };
};

export const getMeasureListAction = params => ({
    types: MeasureListTypes,
    callAPI: () => getMeasureListData(params)
});

const initialState = {
    isRegistryMeasureListLoading: true,
    registrymeasureList: [],
    favoritefilter: false,
    viewDetailsSelection: {
        id: null,
        rowData: null
    }
};

// Reducer
export default getReducer(initialState, {
    [MeasureListTypes.SUCCESS]: (state, { payload }) => ({
        ...state,
        registrymeasureList: payload,
        isRegistryMeasureListLoading: false
    }),
    [FilterRegistryMeasureType]: (state, { payload }) => ({
        ...state,
        favoritefilter: payload
    }),
    [UpdateRegistryMeasureListType]: (state, { payload }) => ({
        ...state,
        registrymeasureList: payload
    }),
    [SetMeasureIdSelectionType]: (state, { payload }) => ({
        ...state,
        viewDetailsSelection: payload
    }),
    [MeasureListTypes.ERROR]: () => initialState
});
