import { getMeasuresList, saveWebtoolAnswers } from '@/redux/services/getMeasuresApi';

export const MEASURES_REQUEST = 'MEASURES_REQUEST';
export const MEASURES_RECEIVE = 'MEASURES_RECEIVE';
export const MEASURES_FAILURE = 'MEASURES_FAILURE';
export const MEASURE_RECEIVE_BY_ID = 'MEASURE_RECEIVE_BY_ID';
export const SAVING_ANSWER = 'SAVING_ANSWER';
export const SAVED_ANSWER = 'SAVED_ANSWER';

const requestMeasures = () => ({
    type: MEASURES_REQUEST
});

const receiveMeasures = payload => ({
    type: MEASURES_RECEIVE,
    payload
});

const failureMeasures = () => ({
    type: MEASURES_FAILURE
});

const savingAnswer = () => ({
    type: SAVING_ANSWER
});

const savedAnswer = () => ({
    type: SAVED_ANSWER
});

export const getMeasures = params => {
    return async dispatch => {
        dispatch(requestMeasures());
        try {
            let measureInfo = await getMeasuresList(params);
            if (measureInfo.ok) {
                let parsedMeasureInfo = await measureInfo.json();
                dispatch(receiveMeasures(parsedMeasureInfo));
            } else {
                throw new Error();
            }
        } catch (error) {
            dispatch(failureMeasures());
        }
    };
};

export const saveAnswers = params => {
    return async dispatch => {
        dispatch(savingAnswer());
        saveWebtoolAnswers(params)
            .then(data => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw new Error();
                }
            })
            .then(data => {
                dispatch(savedAnswer(data));
            })
            .catch(ex => {
                dispatch(failureMeasures());
            });
    };
};
