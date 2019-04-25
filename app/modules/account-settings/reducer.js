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

  // TODO: get rid from mocked data
  // mocked
  accountTypeItems: [
    { label: 'USD/Monthly', name: '$00.00' },
    { label: 'Joined', name: 'Sept. 12' },
    { label: 'Renews', name: 'Oct. 22, 2019' },
    { label: 'Status', name: 'Active' },
  ],
  accountDetailsOptions: [
    { count: 1, name: 'Name on account', type: 'John Snow' },
    { count: 1, name: 'Display name', type: 'Epic Knight' },
  ],
  paymentDetailsOptions: [
    { count: 1, name: 'Payment method', type: 'Credit card' },
    { count: 1, name: 'Display location', type: 'Some place on map' },
  ],
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
