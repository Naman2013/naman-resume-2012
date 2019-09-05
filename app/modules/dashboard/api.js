import axios from 'axios';

export const getDashboardFeaturedObjectsApi = data =>
  axios.post('/api/reservation/getDashboardFeaturedObjects', data);

export const getDashboardPageApi = data =>
  axios.post('/api/page/dashboard', data);
