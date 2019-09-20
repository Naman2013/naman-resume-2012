import { API } from 'app/api';

export const API_URL = '/api/images/getGalleryPictures ';

export const getGalleryDetailsApi = data => API.post(API_URL, data);

export const removeImageFromGalleryApi = data =>
  API.post('/api/images/removeImageFromGallery', data);
