import axios from 'axios';

export const getCommunityMissionsApi = data =>
  axios.post('/api/reservation/getCommunityMissions', data);

export const getMyPicturesApi = data =>
  axios.post('/api/images/getMyPictures', data);
