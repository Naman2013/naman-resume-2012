import { createSelector } from 'reselect';

export const selectBrowseFindData = state => state.browseFindData;

export const makeBrowseFindDataFetchingSelector = () =>
  createSelector(
    selectBrowseFindData,
    state => state.findRunning
  );

export const makeBrowseFindDataSelector = () =>
  createSelector(
    selectBrowseFindData,
    state => state
  );
