import { createSelector } from 'reselect';

export const selectAccountSettings = state => state.accountSettings;

export const makeIsFetchingSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.isFetching
  );

export const makeAccountMenuListSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.accountMenuList
  );

export const makeAccountTypeSectionSelector = () =>
  createSelector(
    selectAccountSettings,
    state => state.accountTypeSection
  );
