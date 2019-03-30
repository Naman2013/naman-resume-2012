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
