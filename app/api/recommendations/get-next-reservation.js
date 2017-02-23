import axios from 'axios';
/**
  @param: requestType 'single' 'multiple'
  */
export const getNextReservation = ({ cid, at, token, uniqueId, objectId, requestType }) => (
  axios.post('/api/recommends/getNextReservation', {
    cid,
    at,
    token,
    uniqueId,
    objectId,
    requestType,
  })
);
