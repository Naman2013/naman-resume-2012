import { API } from 'app/api';

export const getPageDataApi = ({ objectId }) =>
  API.post('/api/object/getAskAnAstronomer', {
    objectId,
  });

export const deletePostImageApi = data =>
  API.post('/api/content/deletePostImage', data);
