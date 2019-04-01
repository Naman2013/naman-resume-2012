import { createSelector } from 'reselect';

export const selectImageDetails = state => state.imageDetails;

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
