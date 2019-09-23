import { API } from 'app/api';

export const getImageDetailsApi = data =>
  API.post('/api/images/getImageDetails', data);

/*
* {
    at,
    cid,
    token,
    customerImageId,
  }*/
export const deleteImageApi = data =>
  API.post('/api/images/deleteImage', data);

export const getTagsApi = data => API.post('/api/tags/getTags', data);

export const setTagApi = data => API.post('/api/tags/setTag', data);

export const deleteTagApi = data => API.post('/api/tags/deleteTag', data);

export const getGalleriesApi = data =>
  API.post('/api/images/getGalleryList', data);

export const addImageToGalleryApi = data =>
  API.post('/api/images/addImageToGallery', data);

export const createGalleryApi = data =>
  API.post('/api/images/createGallery', data);

export const setObservationTagsApi = data =>
  API.post('/api/images/setObservationTags', data);
