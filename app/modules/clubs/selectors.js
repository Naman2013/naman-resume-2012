import { createSelector } from 'reselect';
import { getSelectOptions } from 'app/utils/common-methods';

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

export const makeGroupsListSelector = () =>
  createSelector(
    selectClubs,
    state => state.profileGroupList
  );

export const makeTopThreadsDataSelector = () =>
  createSelector(
    makeTopThreadsSelector(),
    state => state
      // state.map(x => {
      //   return {
      //     avatarUrl: x.avatarURL,
      //     displayName: x.displayName,
      //     freshness: x.freshness,
      //     threadId: x.threadId,
      //     title: x.title,
      //     totalLikes: x.totalLikes,
      //     authorInfo: x.authorInfo,
      //   };
      // })
  );

export const makeGroupDeleteInvitation = () =>
  createSelector(
    selectClubs,
    state => state.groupDeleteInvitation
  );

/**
 * Gets the objectList from reducer
 * Returns objectList options ready for Select
 */
export const makeByGroupsListSelectOptsSelector = () =>
  createSelector(
    makeGroupsListSelector(),
    state => getSelectOptions(state, 'discussionGroupId', 'title')
  );
