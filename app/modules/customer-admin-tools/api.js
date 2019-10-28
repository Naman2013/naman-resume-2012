import { API } from 'app/api';

export const getApi = data => API.post('/api/', data);

export const getCustomerAdminToolsApi = data =>
  API.post('/api/page/customerAdminTools', data);
