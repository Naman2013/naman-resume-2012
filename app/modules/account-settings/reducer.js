// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { set } from 'qim';
import { TInitialState } from './types';

export const TYPE = constants('account-settings', [
  '~FETCH_ACCOUNT_SETTINGS',
  '~FETCH_ACCOUNT_FORM_FIELD',
  '~GET_SUBSCRIPTION_PLANS',
]);
export const ACTION = actions(TYPE);

export const initialState: TInitialState = {
  isFetching: false,
  isFetchingFormField: false,
  isLoaded: false,
  serverError: null,
  accountMenuList: {},
  accountTypeSection: {},
  accountDetails: {},
  accountCancelSection: {},

  subscriptionPlans: {
    isFetching: false,
    data: {},
  },
};

export default handleActions(
  {
    [TYPE.FETCH_ACCOUNT_SETTINGS]: fetchAccountSettings,
    [TYPE.FETCH_ACCOUNT_SETTINGS_SUCCESS]: fetchAccountSettingsSuccess,
    [TYPE.FETCH_ACCOUNT_SETTINGS_ERROR]: fetchAccountSettingsError,

    [TYPE.FETCH_ACCOUNT_FORM_FIELD]: fetchAccountFormField,
    [TYPE.FETCH_ACCOUNT_FORM_FIELD_SUCCESS]: fetchAccountFormFieldSuccess,
    [TYPE.FETCH_ACCOUNT_FORM_FIELD_ERROR]: fetchAccountFormFieldError,

    [TYPE.GET_SUBSCRIPTION_PLANS]: getSubscriptionPlan,
    [TYPE.GET_SUBSCRIPTION_PLANS_SUCCESS]: getSubscriptionPlanSuccess,
  },
  initialState
);

function fetchAccountSettings(state) {
  return set(['isFetching'], true, state);
}

function fetchAccountSettingsSuccess(state, action) {
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

function fetchAccountSettingsError(state, action) {
  return set(['serverError'], action.payload, state);
}

function fetchAccountFormField(state) {
  return set(['isFetchingFormField'], true, state);
}

function fetchAccountFormFieldSuccess(state, action) {
  const { status } = action.payload;
  const { formFieldName, newValue } = action.meta;
  return status === 'success'
    ? {
        ...state,
        isFetchingFormField: false,
        accountDetails: {
          ...state.accountDetails,
          formFields: {
            ...state.accountDetails.formFields,
            [formFieldName]: {
              ...state.accountDetails.formFields[formFieldName],
              currentValue: newValue,
            },
          },
        },
      }
    : { ...state, isFetchingFormField: false };
}

function fetchAccountFormFieldError(state, action) {
  return set(['serverError'], action.payload, state);
}

function getSubscriptionPlan(state) {
  return {
    ...state,
    subscriptionPlans: { ...state.subscriptionPlans, isFetching: true },
  };
}

function getSubscriptionPlanSuccess(state, { payload }) {
  return {
    ...state,
    subscriptionPlans: {
      ...state.subscriptionPlans,
      isFetching: false,
      data: payload,
    },
  };
}
