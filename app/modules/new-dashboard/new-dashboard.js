import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
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
    getDashboardMissionListAction,
    getPhotoHubHeadingAction,
    errorHandling,
  } from './actions';

import { 
  pubnubInit, 
  sendMessage, 
  setDock, 
  setTab, 
  unSubscribePubnub, 
  getActivityFeedMembers, 
  setMemberChatState } from '../../modules/pubnub-handler/actions'


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
    makeGetGravityByDomainSelector,
    makePubnubDataSelector,
    makeGetDashboardMissionListSelector,
    makePhotoHubHeadingSelector,
    makePublicProfileCardSelector,
    makeTopNavSelector,
  } from './selectors';

  
import { setPublicCardStatusAction } from '../../modules/upcoming-events/upcoming-events-actions';

import { NewDashboard } from './index';
import { validateResponseAccess } from 'app/modules/authorization/actions';

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
    pubnubData: makePubnubDataSelector(),
    dashboardMissionList: makeGetDashboardMissionListSelector(),
    photoHubHeadings: makePhotoHubHeadingSelector(),
    showPublicCard: makePublicProfileCardSelector(),
    topNav: makeTopNavSelector(),
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
    pubnubInit,
    sendMessage,
    setDock, 
    setTab, 
    unSubscribePubnub,
    getActivityFeedMembers,
    setMemberChatState,
    getDashboardMissionListAction,
    setPublicCardStatusAction,
    getPhotoHubHeadingAction,  
    // actions: bindActionCreators(
    //   {        
        errorHandling,
    //   },
    //   dispatch
    // ), 
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NewDashboard);