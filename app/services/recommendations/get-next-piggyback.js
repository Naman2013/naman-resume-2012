import { API } from 'app/api';

export const getNextPiggyback = ({ cid, token, at, objectId, type, uniqueId, requestType }) => {
  return API.post('/api/recommends/getNextPiggyback', {
    cid,
    token,
    at,
    objectId,
    type,
    uniqueId,
    requestType,
  });
};
