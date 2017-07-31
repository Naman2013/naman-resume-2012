import axios from 'axios';

export const setTag = ({
  token,
  at,
  cid,
  tagType,
  tagClass,
  scheduledMissionId,
  customerImageId,
  uniqueId,
  text,
}) => (
  axios.post('/api/tags/setTag', {
    token,
    at,
    cid,
    customerId: cid,
    tagType,
    tagClass,
    scheduledMissionId,
    customerImageId,
    uniqueId,
    text,
  })
);
