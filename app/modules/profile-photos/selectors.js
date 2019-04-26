import { createSelector } from 'reselect';

export const myPicturesFilters = state => state.myPicturesFilters;

export const objectTypeList = state => state.objectTypeList;

export const selectTelescopeList = () =>
  createSelector(
    myPicturesFilters,
    state => state.telescopes.telescopesList
  );

export const selectSelectedFilters = () =>
  createSelector(
    myPicturesFilters,
    state => state.selectedFilters
  );

export const selectObjectTypeList = () =>
  createSelector(
    objectTypeList,
    state => state.objectListResponse.objectTypeList
  );
