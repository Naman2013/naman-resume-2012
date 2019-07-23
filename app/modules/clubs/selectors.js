import { createSelector } from 'reselect';

export const selectTopThreads = state => state.clubs;

export const makeTopThreadsLoadingSelector = () =>
  createSelector(
    selectTopThreads,
    state => state.isFetching
  );

export const makeTopThreadsDataSelector = () =>
  createSelector(
    selectTopThreads,
    state =>
      state.topThreadsList.map(x => {
        return {
          avatarUrl: x.avatarURL,
          displayName: x.displayName,
          freshness: x.freshness,
          threadId: x.threadId,
          title: x.title,
          totalLikes: x.totalLikes,
        };
      })
  );
