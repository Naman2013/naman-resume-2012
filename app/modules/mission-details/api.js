import axios from 'axios';

export const getMissionDetailsApi = data =>
  axios.post('/api/images/getMyPictures', data);
