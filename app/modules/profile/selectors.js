import { createSelector } from 'reselect';
// import _ from 'lodash/fp';

export const selectProfile = state => state.profile;

export const makeProfileLoadingSelector = () =>
  createSelector(
    selectProfile,
    state => state.isFetching,
  );

export const makePublicProfileUserDataSelector = () =>
  createSelector(
    selectProfile,
    state => state.publicProfileData,
  );
