import { API } from 'app/api';

export const getDashboardFeaturedObjectsApi = data =>
  API.post('/api/reservation/getDashboardFeaturedObjects', data);

export const getDashboardPageApi = data =>
  API.post('/api/page/dashboard', data);
