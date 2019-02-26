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
