import axios from 'axios';

export const getCommunityMissionsApi = data =>
  axios.post('/api/reservation/getCommunityMissions', data);
