import { createSelector } from 'reselect';
// import _ from 'lodash/fp';

export const selectStoryDetails = state => state.storyDetails;

export const makeStoryDetailsLoadingSelector = () =>
  createSelector(
    selectStoryDetails,
    state => state.isFetching
  );

export const makeStoryDetailsDataSelector = () =>
  createSelector(
    selectStoryDetails,
    state => state.data
  );
