import { createSelector } from 'reselect';

export const selectImageDetails = state => state.imageDetails;

// TAGS
export const makeTagsFetchingSelector = () =>
  createSelector(
    selectImageDetails,
    state => state.tagsData.isFetching
  );

export const makeTagListSelector = () =>
  createSelector(
    selectImageDetails,
    state => state.tagsData.tagList
  );

// GALLERIES
export const makeGalleriesFetchingSelector = () =>
  createSelector(
    selectImageDetails,
    state => state.galleriesData.isFetching
  );

export const makeGalleryListSelector = () =>
  createSelector(
    selectImageDetails,
    state => state.galleriesData.data.galleryList
  );
