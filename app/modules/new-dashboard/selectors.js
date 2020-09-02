import { createSelector } from 'reselect';

export const newDashList = state => state.newDashboard;


export const makeStarPartyListSelector = () =>
  createSelector(
    newDashList,
    state => state.upcomingStarPartyList
  );

  export const makeUserGravityStatusSelector = () =>
  createSelector(
    newDashList,
    state => state.userGravityStatus
  );

  export const makePhotoHubSelector = () =>
  createSelector(
    newDashList,
    state => state.photoHub
  );

  export const makeDashboardFeaturedObjectsSelector = () =>
  createSelector(
    newDashList,
    state => state.dashboardFeaturedObjects
  );

  export const makeMyClubListSelector = () =>
  createSelector(
    newDashList,
    state => state.myClubList
  );

  export const makeBookmarkListSelector = () =>
  createSelector(
    newDashList,
    state => state.bookmarkList
  );

  export const makePrivateProfileSelector = () =>
  createSelector(
    newDashList,
    state => state.privteProfile
  );

  export const makeNewDashFetchingSelector = () =>
  createSelector(
    newDashList,
    state => state.isFetching
  );

  export const makePrivateProfileMissionSelector = () =>
  createSelector(
    newDashList,
    state => state.privateProfileMission
  );
  
  export const makeUserActiveObjectSelector = () =>
  createSelector(
    newDashList,
    state => state.userActiveObject
  );

  export const makeUserPopularObservationSelector = () =>
  createSelector(
    newDashList,
    state => state.userPopularObservation
  );

  export const makeMissionImagesSelector = () =>
  createSelector(
    newDashList,
    state => state.missionImages
  );

  export const makeGalleryListSelector = () =>
  createSelector(
    newDashList,
    state => state.galleryList
  );

  export const makeRecentGravityActionSelector = () =>
  createSelector(
    newDashList,
    state => state.recentGravityAction
  );
  
  export const makeWeatherStatusSelector = () =>
  createSelector(
    newDashList,
    state => state.weatherStatus
  );

  export const makeSkyConditionSelector = () =>
  createSelector(
    newDashList,
    state => state.skyConditions
  );

  export const makeObservatoryListSelector = () =>
  createSelector(
    newDashList,
    state => state.observatoryList
  );

  export const makeQuestMapControlSelector = () =>
  createSelector(
    newDashList,
    state => state.questMapControls
  );

  export const makeObjectMapControlSelector = () =>
  createSelector(
    newDashList,
    state => state.objectMapControls
  );

  export const makeObsWidgetDataSelector = () =>
  createSelector(
    newDashList,
    state => state.obsWidgetData
  );

  export const makeObsStatusSelector = () =>
  createSelector(
    newDashList,
    state => state.obsStatus
  );

  export const makeCommunityExplorationSelector = () =>
  createSelector(
    newDashList,
    state => state.communityExploration
  );

  export const makeCommunityFameSelector = () =>
  createSelector(
    newDashList,
    state => state.communityFame
  );