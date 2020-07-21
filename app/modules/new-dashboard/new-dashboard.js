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
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NewDashboard);