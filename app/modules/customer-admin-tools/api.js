import axios from 'axios';

export const getApi = data => axios.post('/api/', data);

export const getCustomerAdminToolsApi = data =>
  axios.post('/api/page/customerAdminTools', data);
