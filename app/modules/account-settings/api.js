import axios from 'axios';

export const getApi = data => axios.post('/api/', data);

export const getAccountSettingsApi = data =>
  axios.post('/api/page/accountSettings', data);
