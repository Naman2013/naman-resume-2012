import { API } from 'app/api';

export const getCommunityMissionsApi = data =>
  API.post('/api/reservation/getCommunityMissions', data);

export const getMyPicturesApi = data =>
  API.post('/api/images/getMyPictures', data);
