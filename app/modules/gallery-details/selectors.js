import { createSelector } from 'reselect';

export const selectGalleryDetails = state => state.galleryDetails;

export const makeGalleryDetailsLoadingSelector = () =>
  createSelector(
    selectGalleryDetails,
    state => state.isFetching
  );

export const makeGalleryDetailsTitleSelector = () =>
  createSelector(
    selectGalleryDetails,
    state => state.galleryTitle
  );

export const makeGalleryDetailsDateCreatedSelector = () =>
  createSelector(
    selectGalleryDetails,
    state => state.galleryDateCreated
  );

export const makeGalleryDetailsImageCountSelector = () =>
  createSelector(
    selectGalleryDetails,
    state => state.imageCount
  );

export const makeGalleryDetailsImageListSelector = () =>
  createSelector(
    selectGalleryDetails,
    state => state.imageList
  );

export const makeGalleryDetailsCanEditSelector = () =>
  createSelector(
    selectGalleryDetails,
    state => state.canEditFlag
  );

export const makeGalleryDetailsApiURLSelector = () =>
  createSelector(
    selectGalleryDetails,
    state => state.apiURL
  );
