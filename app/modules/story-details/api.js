import axios from 'axios';

export const getStoryDetailsApi = data =>
  axios.post('/api/content/getPost', data);
