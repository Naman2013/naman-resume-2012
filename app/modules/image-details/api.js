import axios from 'axios';

export const getImageDetailsApi = data =>
  axios.post('/api/images/getImageDetails', data);

/*
* {
    at,
    cid,
    token,
    customerImageId,
  }*/
export const deleteImageApi = data =>
  axios.post('/api/images/deleteImage', data);

export const getTagsApi = data => axios.post('/api/tags/getTags', data);

export const setTagApi = data => axios.post('/api/tags/setTag', data);

export const deleteTagApi = data => axios.post('/api/tags/deleteTag', data);

export const getGalleriesApi = data => axios.post('/api/images/getGalleryList', data);
