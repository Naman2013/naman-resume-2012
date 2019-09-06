import { createSelector } from 'reselect';
import _get from 'lodash/get';
import { getSelectOptions } from 'app/utils/common-methods';

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

export const photoHubsIsFetchingSelector = () =>
  createSelector(
    photoHubs,
    state => state.isFetching
  );

export const photoHubsUploadToMyPicturesPageDataSelector = () =>
  createSelector(
    photoHubs,
    state => state.uploadToMyPicturesPageData
  );

export const photoHubsUploadPhotoDataSelector = () =>
  createSelector(
    photoHubs,
    state => state.uploadPhotoData
  );

export const makeUploadImageDataSelector = () =>
  createSelector(
    photoHubsUploadPhotoDataSelector(),
    state => state.imageData
  );

export const makePhotoHubsCatalogListSelector = () =>
  createSelector(
    photoHubsUploadToMyPicturesPageDataSelector(),
    state => state.CatalogList
  );

export const makePhotoHubsCatalogListSelectOptsSelector = () =>
  createSelector(
    makePhotoHubsCatalogListSelector(),
    state => {
      // console.log(state);
      // const catList = _get(state, 'catalogList', []);
      return getSelectOptions(state, 'catalog', 'catFullName');
    }
  );

export const photoHubsUploadToMyPicturesDataSelector = () =>
  createSelector(
    photoHubs,
    state => state.uploadToMyPicturesData
  );
