import { createSelector } from 'reselect';

export const selectMissions = state => state.missions;

export const makeMissionsLoadingSelector = () =>
  createSelector(
    selectMissions,
    state => state.isFetching
  );

export const makeMissionsPageSetupSelector = () =>
  createSelector(
    selectMissions,
    state => state.pageSetup
  );

export const makeBySlooh1000Selector = () =>
  createSelector(
    selectMissions,
    state => state.bySlooh1000
  );

export const makeBySlooh1000CategoryListSelector = () =>
  createSelector(
    makeBySlooh1000Selector(),
    state => state.categoryList
  );
