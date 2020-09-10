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
    getQuestMapControlAction,
    getObjectMapControlAction,
    getNewDashObsAction,
    getObsStatusAction,
    getCommunityExplorationAction,
    getCommunityFameAction,
    getMyRankAction,
    getTopMembersAction,
    getTopStudentsAction,
    getMostActiveClubsAction,
    getTopSchoolClubsAction,
    getGravityByDomainAction,
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
    makeQuestMapControlSelector,
    makeObjectMapControlSelector,
    makeObsWidgetDataSelector,
    makeObsStatusSelector,
    makeCommunityExplorationSelector,
    makeCommunityFameSelector,
    makeMyRankSelector,
    makeTopMembersSelector,
    makeTopStudentsSelector,
    makeMostActiveClubsSelector,
    makeTopSchoolClubsSelector,
    makeGetGravityByDomainSelector
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
    questMapControls: makeQuestMapControlSelector(),
    objectMapControls: makeObjectMapControlSelector(),
    obsWidgetData: makeObsWidgetDataSelector(),
    obsStatus: makeObsStatusSelector(),
    communityExploration: makeCommunityExplorationSelector(),
    communityFame: makeCommunityFameSelector(),
    myRank: makeMyRankSelector(),
    topMembers: makeTopMembersSelector(),
    topStudents: makeTopStudentsSelector(),
    mostActiveClubs: makeMostActiveClubsSelector(),
    topSchoolClubs: makeTopSchoolClubsSelector(),
    gravityByDomain: makeGetGravityByDomainSelector(),
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
    getQuestMapControlAction,
    getNewDashObsAction,
    getObsStatusAction,
    getObjectMapControlAction,
    getCommunityExplorationAction,
    getCommunityFameAction,
    getMyRankAction,
    getTopMembersAction,
    getTopStudentsAction,
    getMostActiveClubsAction,
    getTopSchoolClubsAction,
    getGravityByDomainAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NewDashboard);