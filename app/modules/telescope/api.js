import axios from 'axios';

export const getApi = data => axios.post('/api/', data);

export const getAllSkyTimelapseApi = data =>
  axios.post('/api/widget/allskyTimelapse', data);
