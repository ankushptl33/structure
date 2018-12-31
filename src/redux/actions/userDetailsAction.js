import { userdetailApi } from '../services/userdetailApi';

export const USER_DETAIL_REQUEST = 'USER_DETAIL_REQUEST';
export const USER_DETAIL_RECEIVE = 'USER_DETAIL_RECEIVE';
export const USER_DETAIL_FAILURE = 'USER_DETAIL_FAILURE';

const requestUserInfo = () => ({
    type: USER_DETAIL_REQUEST
});

const receiveUserInfo = payload => ({
    type: USER_DETAIL_RECEIVE,
    payload
});

const failureUserInfo = () => ({
    type: USER_DETAIL_FAILURE
});

export const getAllUserDetail = params => {
    return dispatch => {
        dispatch(requestUserInfo());

        userdetailApi(params)
            .then(json => {
                dispatch(receiveUserInfo(json.data.data.user));
            })
            .catch(ex => {
                dispatch(failureUserInfo());
            });
    };
};
