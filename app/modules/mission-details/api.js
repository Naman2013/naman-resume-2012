import axios from 'axios';

export const API_URL = '/api/images/getMyPictures';

export const getMissionDetailsApi = data => axios.post(API_URL, data);

export const getTagsApi = data => axios.post('/api/tags/getTags', data);

export const setTagApi = data => axios.post('/api/tags/setTag', data);

export const deleteTagApi = data => axios.post('/api/tags/deleteTag', data);
