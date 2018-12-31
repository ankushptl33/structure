import { getActionTypes, getActionCreators, getReducer } from '@/utils/redux';

import { userdetailApi } from '@/redux/services/userdetailApi';
// Types
export const UserProfileType = getActionTypes('USER_PROFILE');

// Actions
export const updateUserProfileTypeAction = getActionCreators(UserProfileType);

export const userProfileAction = params => ({
    types: UserProfileType,
    callAPI: () => userdetailApi(params)
});

const initialState = {
    isLoading: true,
    isFailure: false,
    UserDataList: []
};

export default getReducer(initialState, {
    [UserProfileType.READY]: state => ({
        ...state,
        isLoading: true
    }),

    [UserProfileType.SUCCESS]: (state, { payload }) => ({
        ...state,
        isLoading: false,
        isFailure: false,
        UserDataList: payload.data.user
    }),

    [UserProfileType.ERROR]: () => initialState
});
