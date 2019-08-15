import axios from 'axios';

export const API_URL = '/api/images/getGalleryPictures ';

export const getGalleryDetailsApi = data => axios.post(API_URL, data);

export const removeImageFromGalleryApi = data =>
  axios.post('/api/images/removeImageFromGallery', data);
