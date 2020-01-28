import { ACTION } from './reducer';
import {
  getAccountSettingsApi,
  saveAccountFormFieldApi,
  getSubscriptionPlansApi,
  resetPasswordApi,
  getDashboardPopupInfoApi,
} from './api';

export const getDashboardPopupInfo = () => (dispatch, getState) => {
  dispatch(ACTION.getDashboardPopupInfo());

  const { token, at, cid } = getState().user;

  return getDashboardPopupInfoApi({
    token,
    at,
    cid,
    callSource: "accountSettings",
  })
    .then(result => {
      dispatch(ACTION.getDashboardPopupInfoSuccess(result.data));
    })
    .catch(error => ACTION.getDashboardPopupInfoError(error));
};

export const fetchAccountSettingsAction = () => (dispatch, getState) => {
  dispatch(ACTION.fetchAccountSettings());

  const { token, at, cid } = getState().user;

  return getAccountSettingsApi({
    token,
    at,
    cid,
  })
    .then(result => {
      dispatch(ACTION.fetchAccountSettingsSuccess(result.data));
    })
    .catch(error => ACTION.fetchAccountSettingsError(error));
};

export const fetchAccountFormFieldAction = (formFieldName, newValue) => (
  dispatch,
  getState
) => {
  dispatch(ACTION.fetchAccountFormField());

  const { token, at, cid } = getState().user;

  return saveAccountFormFieldApi({
    token,
    at,
    cid,
    formFieldName,
    newValue,
  })
    .then(result => {
      dispatch(
        ACTION.fetchAccountFormFieldSuccess(result.data, {
          formFieldName,
          newValue,
        })
      );
    })
    .catch(error => ACTION.fetchAccountFormFieldError(error));
};

export const getSubscriptionPlans = data => (dispatch, getState) => {
  dispatch(ACTION.getSubscriptionPlans());
  const { token, at, cid } = getState().user;
  return getSubscriptionPlansApi({
    token,
    at,
    cid,
    callSource: data.callSource || 'upgrade',
    ...data,
  })
    .then(result => dispatch(ACTION.getSubscriptionPlansSuccess(result.data)))
    .catch(error => ACTION.getSubscriptionPlansError(error));
};

export const resetPassword = data => (dispatch, getState) => {
  dispatch(ACTION.resetPassword());
  const { token, at, cid } = getState().user;
  return resetPasswordApi({
    token,
    at,
    cid,
    loginEmailAddress: data,
  }).then(res => {
    dispatch(ACTION.resetPasswordSuccess(res.data.statusMessage));
  });
};

export const dismissResetPasswordPopup = () => (dispatch, getState) => {
  dispatch(ACTION.dismissPasswordPopup());
};
