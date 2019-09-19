import axios from 'axios';

export const getPublicProfileApi = data =>
  axios.post('/api/page/getPublicProfile', data);

export const getPrivateProfileApi = data =>
  axios.post('/api/page/getPrivateProfile', data);

export const getProfileListsApi = data =>
  axios.post('/api/readinglists/getReadingList', data);

// ===============
export const getPrivateProfileMissionsApi = data =>
  axios.post('/api/page/getPrivateProfileMissions', data);

export const getPublicProfileMissionsApi = data =>
  axios.post('/api/page/getPublicProfileMissions', data);
