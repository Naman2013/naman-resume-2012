import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  cancelReservation,
  cancelPiggyback,
  grabPiggyback,
  reservePiggyback,
} from 'app/modules/missions/thunks';

import { reserveCommunityMission } from 'app/modules/telescope/thunks';

import {
  makePiggybackMissionsFirstSlot,
  makePiggybackReservedMissionData,
  makePiggybackReservedMissionSelector,
} from 'app/modules/missions/selectors';

import { makeUserSelector } from 'app/modules/user/selectors';

import {
  makeQueueTabReservedCommunityMissionDataSelector,
  makeQueueTabReservedCommunityMissionSelector,
} from 'app/modules/telescope/selectors';

import {
    fetchStarPartyDataAction,
    getUserGravityDataAction,
    getMyPicturesDataAction,
    getDashboardFeaturedObjectsDataAction,
    getMyClubListDataAction,
    getBookmarkListDataAction,
    getPrivateProfileDataAction,
    getPrivateProfileMissionDataAction,
    getUserActiveObjectDataAction,
    getUserPopularObservationDataAction,
    getMissionImagesDataAction,
    getGalleryListDataAction,
    getRecentGravityDataAction,
    getWeatherDataAction,
    getSkyAction,
    getObservatoryListAction,
  } from './actions';


import { makeStarPartyListSelector,
    makeUserGravityStatusSelector ,
    makePhotoHubSelector,
    makeDashboardFeaturedObjectsSelector,
    makeMyClubListSelector,
    makeBookmarkListSelector,
    makePrivateProfileSelector,
    makeNewDashFetchingSelector,
    makePrivateProfileMissionSelector,
    makeUserActiveObjectSelector,
    makeUserPopularObservationSelector,
    makeMissionImagesSelector,
    makeGalleryListSelector,
    makeRecentGravityActionSelector,
    makeWeatherStatusSelector,
    makeSkyConditionSelector,
    makeObservatoryListSelector,
  } from './selectors';
  
import { NewDashboard } from './index';

const mapStateToProps = createStructuredSelector({
    upcomingStarPartyList: makeStarPartyListSelector(),
    userGravityStatus: makeUserGravityStatusSelector(),
    photoHub: makePhotoHubSelector(),
    dashboardFeaturedObjects: makeDashboardFeaturedObjectsSelector(),
    myClubList: makeMyClubListSelector(),
    bookmarkList: makeBookmarkListSelector(),
    privateProfile: makePrivateProfileSelector(),
    isFetching: makeNewDashFetchingSelector(),
    privateProfileMission: makePrivateProfileMissionSelector(),
    userActiveObject: makeUserActiveObjectSelector(),
    userPopularObservation: makeUserPopularObservationSelector(),
    piggyBackMissionSlot: makePiggybackMissionsFirstSlot(),
    piggybackReservedMissionData: makePiggybackReservedMissionData(),
    piggybackReservedMission: makePiggybackReservedMissionSelector(),
    reservedCommunityMissionData: makeQueueTabReservedCommunityMissionDataSelector(),
    reservedCommunityMission: makeQueueTabReservedCommunityMissionSelector(),
    user: makeUserSelector(),
    // missionImages: makeMissionImagesSelector(),
    // galleryList: makeGalleryListSelector(),
    recentGravityAction: makeRecentGravityActionSelector(),
    weatherStatus: makeWeatherStatusSelector(),
    skyConditions: makeSkyConditionSelector(),
    observatoryList: makeObservatoryListSelector(),
});

const mapDispatchToProps = {
    fetchStarPartyDataAction, 
    getUserGravityDataAction,
    getMyPicturesDataAction,
    getDashboardFeaturedObjectsDataAction,
    getMyClubListDataAction,
    getBookmarkListDataAction,
    getPrivateProfileDataAction,
    getPrivateProfileMissionDataAction,
    getUserActiveObjectDataAction,
    getUserPopularObservationDataAction,
    cancelReservation,
    cancelPiggyback,
    grabPiggyback,
    reservePiggyback,
    reserveCommunityMission,
    getMissionImagesDataAction,
    getGalleryListDataAction,
    getRecentGravityDataAction,
    getWeatherDataAction,
    getObservatoryListAction,
    getSkyAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NewDashboard);