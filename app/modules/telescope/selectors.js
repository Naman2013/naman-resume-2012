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
