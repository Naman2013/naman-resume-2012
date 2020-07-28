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