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
