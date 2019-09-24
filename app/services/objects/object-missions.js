import { API } from 'app/api';

export default function fetchObjectMissionsService({ token, at, cid, objectId }) {
  return API.post('/api/object/getObjectMissions', {
    token,
    at,
    cid,
    objectId,
  });
}
