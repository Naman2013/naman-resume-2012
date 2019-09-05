import axios from 'axios';

export const getFitsDataApi = data =>
  axios.post('/api/images/getMissionFITS', data);

export const getTagsApi = data => axios.post('/api/tags/getTags', data);

export const setTagApi = data => axios.post('/api/tags/setTag', data);

export const deleteTagApi = data => axios.post('/api/tags/deleteTag', data);

//Photohub upload
export const uploadToMyPicturesPageApi = data =>
  axios.post('/api/images/uploadToMyPicturesPage', data);

export const setMyPicturesUploadApi = data =>
  axios.post('/api/images/setMyPicturesUpload', data);
