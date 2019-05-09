import { ACTION } from './reducer';
import {
  getAccountSettingsApi,
  saveAccountFormFieldApi,
  getSubscriptionPlansApi,
} from './api';

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
    callSource: 'upgrade',
    ...data,
  })
    .then(result => dispatch(ACTION.getSubscriptionPlansSuccess(result.data)))
    .catch(error => ACTION.getSubscriptionPlansError(error));
};
