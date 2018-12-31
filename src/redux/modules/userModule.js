import { getActionCreator, getActionType } from '@/utils/redux';

// Types
export const ResetReduxStateType = getActionType('USER_LOGOUT');
// Actions
export const resetReduxState = getActionCreator(ResetReduxStateType);
