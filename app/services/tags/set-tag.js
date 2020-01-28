import { API } from 'app/api';

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
  API.post('/api/tags/setTag', {
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

export default setTag;
