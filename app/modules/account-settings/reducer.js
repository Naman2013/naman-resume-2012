// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { TInitialState } from './types';

export const TYPE = constants('account-settings', []);
export const ACTION = actions(TYPE);

export const initialState: TInitialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,

  // mocked
  accountTypeItems: [
    {label: 'USD/Monthly', name: '$00.00'},
    {label: 'Joined', name: 'Sept. 12'},
    {label: 'Renews', name: 'Oct. 22, 2019'},
    {label: 'Status', name: 'Active'}
  ],
  accountDetailsOptions: [
    {count: 1, name: 'Name on account', type: 'John Snow'},
    {count: 1, name: 'Display name', type: 'Epic Knight'}
  ],
  paymentDetailsOptions: [
    {count: 1, name: 'Payment method', type: 'Credit card'},
    {count: 1, name: 'Display location', type: 'Some place on map'},
  ]
};

export default handleActions(
  {
    //actions
  },
  initialState
);

function setFetching(state) {
  return { ...state, isFetching: true, isLoaded: false };
}

function setServerError(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
    isLoaded: false,
  };
}
