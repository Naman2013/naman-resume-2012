import { API } from 'app/api';

export const getStoryDetailsApi = data =>
  API.post('/api/content/getPost', data);
