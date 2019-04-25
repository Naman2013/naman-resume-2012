import { createSelector } from 'reselect';

export const myPicturesFilters = state => state.myPicturesFilters;

export const selectMyPicturesFilters = () =>
  createSelector(
    myPicturesFilters,
    state => state
  );
