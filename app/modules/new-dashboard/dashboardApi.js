import { API } from 'app/api';

export function fetchStartPartyList(data) {
  return API.get('/api/events/upcoming', data);
}

export function getUserGravityStatus(data) {
  return API.post('/api/newdashboard/getUserGravityStatus', data);
}

export function getMyPictures(data) {
  return API.post('/api/images/getMyPictures', data);
}

export function getDashboardFeaturedObjects(data) {
  return API.post('/api/reservation/getDashboardFeaturedObjects', data);
}

export function getMyClubList(data) {
  return API.post('/api/profile/groups', data);
}

export function getBookmarksList(data) {
  return API.post('/api/readinglists/getReadingList', data);
}

export function getPrivateProfile(data) {
  return API.post('/api/page/getPrivateProfile', data);
}

export function getPrivateProfileMission(data) {
  return API.post('/api/page/getPrivateProfileMissions', data);
}

export function getUserActiveObject(data) {
  return API.post('/api/newdashboard/getUserActiveObjects', data);
}

export function getUserPouplarObservation(data) {
  return API.post('/api/newdashboard/getUserPopularObservations', data);
}

export function getMissionImages(data) {
  return API.post('/api/images/getMissionImages', data);
}

export function getGalleryList(data) {
  return API.post('/api/images/getGalleryList', data);
}

export function getRecentGravityActions(data) {
  return API.post('/api/newdashboard/getRecentGravityActions', data);
}

export function getWeatherActions(data) {
  return API.get('/api/obs/getWXData', { params: data });
}

export function getSkyRating(data) {
  return API.post('/api/widget/seeingConditions', data);
}

export function getQuestMapControls(data) {
  return API.post('/api/quests/getQuestMapControls', data);
}

export function getObjectMapControls(data) {
  return API.post('/api/images/getObjectMapControls', data);
}

export function getQuestCard(data) {
  return API.post('/api/quests/getQuestCard', data);
}

export function getObjectCard(data) {
  return API.post('/api/images/getObjectCard', data);
}

export function getObservatoryList(data) {
  return API.post('/api/obs/list', data);
}

export function getQuestMap(data) {
  return API.post('/api/quests/getQuestMap', data);
}

export function getObjectMap(data) {
  return API.post('/api/images/getObjectMap', data);
}

export function getSocialSharingInfo(data) {
  return API.post('/api/content/getSocialSharingInfo', data);
}

export function getNewDahObs(data) {
  return API.post('/api/widget/newDashboardObs', data);
}

export function getObsStatus(obsId) {
  return API.get('/api/obs/getObservatoryStatus?obsId='+obsId);
}

export function getImageDetails(data) {
  return API.post('/api/images/getImageDetails',data);
}

export function getCommunityExploration(data) {
  return API.post('/api/newdashboard/getFeaturedObservationsAndActivities',data);
}

export function handleLikeReq(data) {
  return API.post('/api/images/like',data);
}

export function getCommunityFame(data) {
  return API.post('/api/newdashboard/getCommunityStats',data);
}

export function getMyRank(data) {
  return API.post('/api/leaderboards/myRank',data);
}

export function getTopMembers(data) {
  return API.post('/api/leaderboards/topMembers',data);
}

export function getTopStudents(data) {
  return API.post('/api/leaderboards/topStudents',data);
}

export function getMostActiveClubs(data) {
  return API.post('/api/leaderboards/mostActiveClubs',data);
}

export function getTopSchoolClubs(data) {
  return API.post('/api/leaderboards/topSchoolClubs',data);
}

export function getGravityByDomain(data) {
  return API.post('/api/newdashboard/getGravityByDomain',data);
}

export function getDashboardMissionList(data) {
  return API.post('/api/reservation/getDashboardMissionList',data);
}

export function getTopCommunityObjects(data) {
  return API.post('/api/leaderboards/topCommunityObjects',data);
}

export function getTopCommunityObservations(data) {
  return API.post('/api/leaderboards/topCommunityObservations',data);
}

export function getPhotoHubHeadings(data) {
  return API.post('/api/images/newDashboardPhotoHubSection',data);
}

export function setObjectMap(data) {
  return API.post('/api/images/setObjectMap',data);
}


