import axios from 'axios';

export const getFitsDataApi = data =>
  axios.post('/api/images/getMissionFITS', data);
