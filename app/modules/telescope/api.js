import { API } from 'app/api';

export const getApi = data => API.post('/api/', data);

export const getAllSkyTimelapseApi = data =>
  API.post('/api/widget/allskyTimelapse', data);

// Queue tab
export const getUpcomingSlotsByTelescopeApi = data =>
  API.post('/api/reservation/getUpcomingSlotsByTelescope', data);

export const getFeaturedObjectsByTelescopeApi = data =>
  API.post('/api/reservation/getFeaturedObjectsByTelescope', data);

export const reserveCommunityMissionApi = data =>
  API.post('/api/reservation/reserveCommunityMission', data);

export const getTelescopesApi = data => API.post('/api/page/telescopes', data);

export const getObservatoryListApi = data => API.post('/api/obs/list', data);
