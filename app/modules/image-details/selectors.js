import { createSelector } from 'reselect';

export const selectImageDetails = state => state.imageDetails;

export const makeTagsFetchingSelector = () =>
  createSelector(
    selectImageDetails,
    state => state.tagsData.isLoading
  );

export const makeTagListSelector = () =>
  createSelector(
    selectImageDetails,
    state => state.tagsData.tagList
  );
