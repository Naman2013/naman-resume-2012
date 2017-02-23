import axios from 'axios';

export const getNextPiggyback = ({ cid, token, at, objectId, type, uniqueId, requestType }) => {
  return axios.post('/api/recommends/getNextPiggyback', {
    cid,
    token,
    at,
    objectId,
    type,
    uniqueId,
    requestType,
  });
};
