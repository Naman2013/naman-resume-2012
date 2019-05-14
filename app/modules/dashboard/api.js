import axios from 'axios';

export const getDashboardFeaturedObjectsApi = data =>
  axios.post('/api/reservation/getDashboardFeaturedObjects', data);
