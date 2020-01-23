import { API } from 'app/api';

export const getAboutDataApi = data => API.post('/api/page/about', data);

export const getSectionApi = data => API.post('/api/about/getSection', data);
