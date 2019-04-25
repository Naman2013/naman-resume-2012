import { createSelector } from 'reselect';

export const myPicturesFilters = state => state.myPicturesFilters;

export const objectTypeList = state => state.objectTypeList;

export const selectMyPicturesFilters = () =>
  createSelector(
    myPicturesFilters,
    state => state
  );

export const selectObjectTypeList = () =>
  createSelector(
    objectTypeList,
    state => state.objectListResponse.objectTypeList
  );
