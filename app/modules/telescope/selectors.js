import { createSelector } from 'reselect';
// import _ from 'lodash/fp';

export const selectTelescope = state => state.telescope;

export const makeTelescopeFetchingSelector = () =>
  createSelector(
    selectTelescope,
    state => state.isFetching
  );

export const makeTelescopeDataSelector = () =>
  createSelector(
    selectTelescope,
    state => state.data
  );

export const makeAllSkyTimelapseSelector = () =>
  createSelector(
    selectTelescope,
    state => state.allSkyTimelapse
  );

export const makeAllSkyTimelapseURLSelector = () =>
  createSelector(
    makeAllSkyTimelapseSelector(),
    state => state.data.allskyTimelapseURL
  );

export const makeAllSkyTimelapseFetchingSelector = () =>
  createSelector(
    makeAllSkyTimelapseSelector(),
    state => state.isFetching
  );
