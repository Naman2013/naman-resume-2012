import { createSelector } from 'reselect';

export const myPicturesFilters = state => state.myPicturesFilters;

export const objectTypeList = state => state.objectTypeList;

export const photoHubs = state => state.photoHubs;


export const selectTelescopeList = () =>
  createSelector(
    myPicturesFilters,
    state => state.telescopes.telescopesList
  );

export const selectTimeList = () =>
  createSelector(
    myPicturesFilters,
    state => state.times.timesList
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

export const photoHubsUploadToMyPicturesPageDataSelector = () =>
  createSelector(
    photoHubs,
    state => state.uploadToMyPicturesPageData
  );
