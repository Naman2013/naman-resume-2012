import axios from 'axios';

export const getImageDetailsApi = data =>
  axios.post('/api/images/getImageDetails', data);
