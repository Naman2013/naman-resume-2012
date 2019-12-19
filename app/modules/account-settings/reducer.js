// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { set } from 'qim';
import { TInitialState } from './types.js';

export const TYPE = constants('account-settings', [
  '~FETCH_ACCOUNT_SETTINGS',
  '~FETCH_ACCOUNT_FORM_FIELD',
  '~GET_SUBSCRIPTION_PLANS',
  '~RESET_PASSWORD',
  'DISMISS_PASSWORD_POPUP',
  '~GET_DASHBOARD_POPUP_INFO',
  '~GET_ACCOUNT_PREFERENCES',
  '~SET_ACCOUNT_PREFERENCE',
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
  accountPreferences: {},
  accountCancelSection: {},
  editPaymentSection: {
    curPaymentInfo: {
      cardType: null,
      last4: null,
      expirationDate: null,
    },
  },
  showForgetPasswordPopup: false,
  forgetPasswordText: '',

  subscriptionPlans: {
    isFetching: false,
    data: {},
  },
  dashboardPopupInfo: {},
};

export default handleActions(
  {
    [TYPE.FETCH_ACCOUNT_SETTINGS]: start,
    [TYPE.FETCH_ACCOUNT_SETTINGS_SUCCESS]: fetchAccountSettingsSuccess,
    [TYPE.FETCH_ACCOUNT_SETTINGS_ERROR]: error,

    [TYPE.FETCH_ACCOUNT_FORM_FIELD]: fetchAccountFormField,
    [TYPE.FETCH_ACCOUNT_FORM_FIELD_SUCCESS]: fetchAccountFormFieldSuccess,
    [TYPE.FETCH_ACCOUNT_FORM_FIELD_ERROR]: error,

    [TYPE.GET_ACCOUNT_PREFERENCES]: start,
    [TYPE.GET_ACCOUNT_PREFERENCES_SUCCESS]: getAccountPreferencesSuccess,
    [TYPE.GET_ACCOUNT_PREFERENCES_ERROR]: error,

    [TYPE.SET_ACCOUNT_PREFERENCE_SUCCESS]: setAccountPreferencesSuccess,
    [TYPE.SET_ACCOUNT_PREFERENCE_ERROR]: error,

    [TYPE.GET_SUBSCRIPTION_PLANS]: getSubscriptionPlan,
    [TYPE.GET_SUBSCRIPTION_PLANS_SUCCESS]: getSubscriptionPlanSuccess,

    [TYPE.RESET_PASSWORD_START]: start,
    [TYPE.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
    [TYPE.DISMISS_PASSWORD_POPUP]: dismissResetPasswordPopup,

    [TYPE.GET_DASHBOARD_POPUP_INFO_START]: start,
    [TYPE.GET_DASHBOARD_POPUP_INFO_SUCCESS]: getDashboardPopupInfoSuccess,
    [TYPE.GET_DASHBOARD_POPUP_INFO_ERROR]: error,
  },
  initialState
);

function start(state) {
  return set(['isFetching'], true, state);
}

function error(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    serverError: payload,
  };
}

function getDashboardPopupInfoSuccess(state, { payload }) {
  return {
    ...state,
    dashboardPopupInfo: payload,
  };
}

function fetchAccountSettingsSuccess(state, action) {
  const {
    accountMenuList,
    accountTypeSection,
    accountDetails,
    accountCancelSection,
    editPaymentSection,
  } = action.payload;
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    accountMenuList,
    accountTypeSection,
    accountDetails,
    accountCancelSection,
    editPaymentSection,
  };
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

function getAccountPreferencesSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    accountPreferences: payload,
  };
}

function setAccountPreferencesSuccess(
  state,
  { payload: { currentValue }, meta: { settingsKey } }
) {
  const { accountPreferences } = state;
  const settings = accountPreferences.settings.map(item => ({
    ...item,
    currentValue:
      item.settingsKey === settingsKey ? currentValue : item.currentValue,
  }));

  return {
    ...state,
    isFetching: false,
    accountPreferences: {
      ...accountPreferences,
      settings,
    },
  };
}

function getSubscriptionPlan(state) {
  return {
    ...state,
    subscriptionPlans: {
      ...state.subscriptionPlans,
      isFetching: true,
      data: {},
    },
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

function resetPasswordSuccess(state, { payload }) {
  return {
    ...state,
    showForgetPasswordPopup: true,
    forgetPasswordText: payload,
  };
}

export function dismissResetPasswordPopup(state) {
  return { ...state, showForgetPasswordPopup: false };
}
