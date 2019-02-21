import { createSelector } from 'reselect';
// import _ from 'lodash/fp';

export const selectPublicProfile = state => state.publicProfile;

export const makePublicProfileLoadingSelector = () =>
  createSelector(
    selectPublicProfile,
    state => state.isFetching,
  );

export const makePublicProfileUserDataSelector = () =>
  createSelector(
    selectPublicProfile,
    state => state.data,
  );
