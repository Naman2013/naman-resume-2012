// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { set } from 'qim';
import { TInitialState } from './types';

export const TYPE = constants('account-settings', ['~FETCH_ACCOUNT_SETTINGS']);
export const ACTION = actions(TYPE);

export const initialState: TInitialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,
  accountMenuList: {},
  accountTypeSection: [],
  accountDetails: [],
  accountCancelSection: [],
};

export default handleActions(
  {
    [TYPE.FETCH_ACCOUNT_SETTINGS]: fetchAccountSettings,
    [TYPE.FETCH_ACCOUNT_SETTINGS_SUCCESS]: fetchAccountSettingsSuccess,
    [TYPE.FETCH_ACCOUNT_SETTINGS_ERROR]: fetchAccountSettingsError,
  },
  initialState
);

export function fetchAccountSettings(state) {
  return set(['isFetching'], true, state);
}

export function fetchAccountSettingsSuccess(state, action) {
  const {
    accountMenuList,
    accountTypeSection,
    accountDetails,
    accountCancelSection,
  } = action.payload;
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    accountMenuList,
    accountTypeSection,
    accountDetails,
    accountCancelSection,
  };
}

export function fetchAccountSettingsError(state, action) {
  return set(['serverError'], action.payload, state);
}
