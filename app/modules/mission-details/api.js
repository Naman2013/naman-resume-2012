import { API } from 'app/api';

export const API_URL = '/api/images/getMyPictures';

export const getMissionDetailsApi = data => API.post(API_URL, data);

export const getTagsApi = data => API.post('/api/tags/getTags', data);

export const setTagApi = data => API.post('/api/tags/setTag', data);

export const deleteTagApi = data => API.post('/api/tags/deleteTag', data);
