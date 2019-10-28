import { API } from 'app/api';

export const API_URL = '/api/images/getGalleryPictures ';

export const getGalleryDetailsApi = data => API.post(API_URL, data);

export const renameGalleryApi = data =>
  API.post('/api/images/renameGallery', data);

export const removeImageFromGalleryApi = data =>
  API.post('/api/images/removeImageFromGallery', data);

export const deleteGalleryApi = data =>
  API.post('/api/images/deleteGallery', data);
