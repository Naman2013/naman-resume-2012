import axios from 'axios';

export const getPageDataApi = ({ objectId }) =>
  axios.post('/api/object/getAskAnAstronomer', {
    objectId,
  });

export const deletePostImageApi = data =>
  axios.post('/api/content/deletePostImage', data);
