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