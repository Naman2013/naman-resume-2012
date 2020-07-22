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

  export const makePrivateProfileMissionSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.privateProfileMission
  );
  
  export const makeUserActiveObjectSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.userActiveObject
  );

  export const makeUserPopularObservationSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.userPopularObservation
  );

  export const makeMissionImagesSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.missionImages
  );

  export const makeGalleryListSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.galleryList
  );

  export const makeRecentGravityActionSelector = () =>
  createSelector(
    selectStarParyList,
    state => state.recentGravityAction
  );