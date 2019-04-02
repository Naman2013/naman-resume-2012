import axios from 'axios';

export const getPublicProfileApi = data =>
  axios.post('/api/page/getPublicProfile', data);

export const getPrivateProfileApi = data =>
  axios.post('/api/page/getPrivateProfile', data);

export const getProfileListsApi = data =>
  axios.post('/api/readinglists/getReadingList', data);
