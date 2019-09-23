import { API } from 'app/api';
/**
  @param: requestType 'single' 'multiple'
  */
export const getNextReservation = ({ cid, at, token, uniqueId, objectId, requestType }) => (
  API.post('/api/recommends/getNextReservation', {
    cid,
    at,
    token,
    uniqueId,
    objectId,
    requestType,
  })
);
