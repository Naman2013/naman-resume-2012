import axios from 'axios';

export const API_URL = '/api/images/getMyPictures';

export const getMissionDetailsApi = data => axios.post(API_URL, data);
