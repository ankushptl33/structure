import { getMeasuresList, setUserFavoriteMeasure } from '../services/practiceMeasureApi';
import { formateDate } from '@/helper/commonFunction';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const PRACTICE_PERFORMANCE_REQUEST = 'PRACTICE_PERFORMANCE_REQUEST';
export const PRACTICE_PERFORMANCE_RECEIVE = 'PRACTICE_PERFORMANCE_RECEIVE';
export const PRACTICE_PERFORMANCE_FAILURE = 'PRACTICE_PERFORMANCE_FAILURE';
export const CLEAR_PRACTICE_PERFORMANCE = 'CLEAR_PRACTICE_PERFORMANCE';
export const UPDATE_SELECTED_MEASUREID = 'UPDATE_SELECTED_MEASUREID';
export const IS_USER_FAVORITE_MEASURE = 'SHOW_FAVORITE_MEASURE';
export const UPDATE_USER_FAVORITE_MEASURE = 'UPDATE_USER_FAVORITE_MEASURE';

const requestPracticePerformance = () => ({
    type: PRACTICE_PERFORMANCE_REQUEST
});

const receivePracticePerformance = payload => ({
    type: PRACTICE_PERFORMANCE_RECEIVE,
    payload
});

// eslint-disable-next-line no-unused-vars
const failurePracticePerformance = () => ({
    type: PRACTICE_PERFORMANCE_FAILURE
});

const clearPerformanceReq = () => ({
    type: CLEAR_PRACTICE_PERFORMANCE
});

const updateSelectedMeasureId = payload => ({
    type: UPDATE_SELECTED_MEASUREID,
    payload
});

export const updateMeasureIDSelection = param => {
    return dispatch => {
        dispatch(updateSelectedMeasureId(param));
    };
};

export const updateMeasureSelectionAndViewMeasureDetails = (param, callback) => {
    return dispatch => {
        dispatch(updateSelectedMeasureId(param));
        // eslint-disable-next-line standard/no-callback-literal
        callback(true);
    };
};

export const clearPerformance = () => {
    return dispatch => {
        dispatch(clearPerformanceReq());
    };
};

export const getMeasures = params => {
    return dispatch => {
        dispatch(requestPracticePerformance());
        getMeasuresList({
            input: {
                measuresetid: params.MeasuresetId,
                inactive: false,
                orderBy: 'listorder'
            }
        })
            .then(data => {
                let measureGrid = data.data.getMeasures;
                let returnValue = [];
                measureGrid.map((obj, index) => {
                    returnValue.push({
                        isFavourite: obj.IsFavorite,
                        favourite: {
                            icon: obj.IsFavorite ? ['fas', 'heart'] : ['fal', 'heart']
                        },
                        practiceid: params.EntityId,
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
                                EntityName: params.EntityName,
                                EntityId: params.EntityId,
                                ParentEntityId: params.ParentEntityId,
                                ParentEntityName: params.ParentEntityName,
                                DurationFrom: formateDate(
                                    new Date(params.DurationFrom),
                                    'YYYY-MM-DD'
                                ),
                                DurationTo: formateDate(new Date(params.DurationTo), 'YYYY-MM-DD'),
                                Flag: params.Flag,
                                MeasureId: obj.measureno,
                                Unit: REGISTRY_UNIT_NAME,
                                IsPatientSpecific: 1
                            },
                            isStopPropagation: false
                        }
                    });
                });
                dispatch(receivePracticePerformance(returnValue));
            })
            .catch(ex => {
                // dispatch(failurePracticePerformance());
                // throw new Error(ex);
                console.log('exception: ', ex);
            });
    };
};

export const isUserFavoriteMeasureAction = payload => {
    return dispatch => {
        dispatch({ type: IS_USER_FAVORITE_MEASURE, payload });
    };
};

export const setUserFavoriteMeasureAction = params => {
    return dispatch => {
        setUserFavoriteMeasure({
            input: {
                measureid: params.measureId,
                IsFavorite: !params.isFavorite
            }
        }).then(json => {
            dispatch({
                type: UPDATE_USER_FAVORITE_MEASURE,
                payload: params.measureId
            });
        });
    };
};

// Object.defineProperty(Date.prototype, 'formateDate', {
//   get: function() {
//     return function(dateFormat) {
//       var _date = new Date(this);

//       return fnDateFormat(
//         fnFormatNumber(_date.getMonth() + 1),
//         fnFormatNumber(_date.getDate()),
//         fnFormatNumber(_date.getFullYear()),
//         dateFormat,
//       ).join(dateFormat.replace(/[^-/:]/g, '').replace(/([-\/:])+/g, '$1'));
//     };

//     function fnFormatNumber(number) {
//       if (/[0-9]+/.test(number)) {
//         number = Number(number);
//         return number < 9 ? ('0' + number).toString() : number.toString();
//       }
//       return number;
//     }

//     function fnDateFormat(mm, dd, yy, dateFormat) {
//       switch (dateFormat.toUpperCase().replace(/[^A-Z]/gi, '')) {
//         case 'MMDDYYYY':
//           return new Array(mm, dd, yy);
//         case 'DDMMYYYY':
//           return new Array(dd, mm, yy);
//         case 'YYYYMMDD':
//           return new Array(yy, mm, dd);
//         default:
//           return new Array(mm, dd, yy);
//       }
//     }
//   },
//   enumerable: false,
// });
