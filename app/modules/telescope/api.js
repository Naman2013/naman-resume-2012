import axios from 'axios';

export const getApi = data => axios.post('/api/', data);

export const getAllSkyTimelapseApi = data =>
  axios.post('/api/widget/allskyTimelapse', data);

// Queue tab
export const getUpcomingSlotsByTelescopeApi = data =>
  axios.post('/api/reservation/getUpcomingSlotsByTelescope', data);

export const getFeaturedObjectsByTelescopeApi = data =>
  axios.post('/api/reservation/getFeaturedObjectsByTelescope', data);

export const reserveCommunityMissionApi = data =>
  axios.post('/api/reservation/reserveCommunityMission', data);
