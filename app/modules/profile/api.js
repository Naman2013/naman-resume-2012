import { API } from 'app/api';

export const getPublicProfileApi = data =>
  API.post('/api/page/getPublicProfile', data);

export const getPrivateProfileApi = data =>
  API.post('/api/page/getPrivateProfile', data);

export const getProfileListsApi = data =>
  API.post('/api/readinglists/getReadingList', data);
