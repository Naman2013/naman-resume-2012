import { createSelector } from 'reselect';

export const selectClubs = state => state.clubs;

export const makeTopThreadsLoadingSelector = () =>
  createSelector(
    selectClubs,
    state => state.isFetching
  );

export const makeTopThreadsSelector = () =>
  createSelector(
    selectClubs,
    state => state.topThreadsList
  );

export const makeTopThreadsDataSelector = () =>
  createSelector(
    makeTopThreadsSelector(),
    state =>
      state.map(x => {
        return {
          avatarUrl: x.avatarURL,
          displayName: x.displayName,
          freshness: x.freshness,
          threadId: x.threadId,
          title: x.title,
          totalLikes: x.totalLikes,
          authorInfo: x.authorInfo,
        };
      })
  );

export const makeGroupDeleteInvitation = () =>
  createSelector(
    selectClubs,
    state => state.groupDeleteInvitation
  );
