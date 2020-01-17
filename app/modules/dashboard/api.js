import { API } from 'app/api';

export const getDashboardFeaturedObjectsApi = data =>
  API.post('/api/reservation/getDashboardFeaturedObjects', data);

export const getGuestDashboardApi = data =>
  API.post('/api/page/guestDashboard', data);
