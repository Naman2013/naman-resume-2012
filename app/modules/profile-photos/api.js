import { API } from 'app/api';

export const getFitsDataApi = data =>
  API.post('/api/images/getMissionFITS', data);

export const getTagsApi = data => API.post('/api/tags/getTags', data);

export const setTagApi = data => API.post('/api/tags/setTag', data);

export const deleteTagApi = data => API.post('/api/tags/deleteTag', data);

//Photohub upload
export const uploadToMyPicturesPageApi = data =>
  API.post('/api/images/uploadToMyPicturesPage', data);

export const setMyPicturesUploadApi = data =>
  API({
    method: 'post',
    url: '/api/images/setMyPicturesUpload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });

export const uploadToMyPicturesApi = data =>
  API.post('/api/images/uploadToMyPictures', data);
