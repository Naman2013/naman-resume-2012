// @flow
import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';
import { set } from 'qim';
import { TInitialState } from './types';

export const TYPE = constants('account-settings', [
  '~FETCH_ACCOUNT_SETTINGS',
  '~FETCH_ACCOUNT_FORM_FIELD',
  '~GET_SUBSCRIPTION_PLANS',
  '~RESET_PASSWORD',
  'DISMISS_PASSWORD_POPUP',
  '~GET_DASHBOARD_POPUP_INFO',
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
    data: { subscriptionPlans: [] },
  },
  dashboardPopupInfo: {},
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

    [TYPE.RESET_PASSWORD_START]: resetPasswordStart,
    [TYPE.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
    [TYPE.DISMISS_PASSWORD_POPUP]: dismissResetPasswordPopup,

    [TYPE.GET_DASHBOARD_POPUP_INFO_START]: getDashboardPopupInfo,
    [TYPE.GET_DASHBOARD_POPUP_INFO_SUCCESS]: getDashboardPopupInfoSuccess,
    [TYPE.GET_DASHBOARD_POPUP_INFO_ERROR]: getDashboardPopupInfoError,
  },
  initialState
);

function getDashboardPopupInfo(state) {
  return set(['isFetching'], true, state);
}

function getDashboardPopupInfoSuccess(state, { payload }) {
  return {
    ...state,
    dashboardPopupInfo: payload,
  };
}

function getDashboardPopupInfoError(state, action) {
  return set(['serverError'], action.payload, state);
}

function fetchAccountSettings(state) {
  return set(['isFetching'], true, state);
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
    subscriptionPlans: {
      ...state.subscriptionPlans,
      isFetching: true,
      data: { subscriptionPlans: [] },
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

function resetPasswordStart(state) {
  return {
    ...state,
    isFetching: true,
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
