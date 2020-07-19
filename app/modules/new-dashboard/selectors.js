import { createSelector } from 'reselect';

export const selectStarParyList = state => state.newDashboard;


export const makeStarPartyListSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.upcomingStarPartyList
  );

  export const makeUserGravityStatusSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.userGravityStatus
  );

  export const makePhotoHubSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.photoHub
  );

  export const makeDashboardFeaturedObjectsSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.dashboardFeaturedObjects
  );

  export const makeMyClubListSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.myClubList
  );

  export const makeBookmarkListSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.bookmarkList
  );

  export const makePrivateProfileSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.privteProfile
  );

  export const makeNewDashFetchingSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.isFetching
  );
  