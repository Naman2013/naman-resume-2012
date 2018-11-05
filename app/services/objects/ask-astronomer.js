import axios from 'axios';

export const getAskAnAstronomer = ({
  objectId,
}) => (
  axios.post('/api/object/getAskAnAstronomer', {
    objectId
  })
);
