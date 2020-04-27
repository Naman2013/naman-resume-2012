import { createSelector } from 'reselect';

export const selectAuthorization = state => state.authorization;

export const makeErrorDataSelector = () =>
  createSelector(
    selectAuthorization,
    state => state.errorData
  );

export const makeIssueWithUserAccountModalVisibleSelector = () =>
  createSelector(
    selectAuthorization,
    state => state.issueWithUserAccountModalVisible
  );

export const makeSubscriptionPlansCallSourceSelector = () =>
  createSelector(
    selectAuthorization,
    state => state.subscriptionPlansCallSource
  );

  export const makeupsellCallSourceSelector = () =>
  createSelector(
    selectAuthorization,
    state => state.upsellCallSource
  );