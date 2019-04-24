import axios from 'axios';

export const getPageDataApi = ({ objectId }) =>
  axios.post('/api/object/getAskAnAstronomer', {
    objectId,
  });
