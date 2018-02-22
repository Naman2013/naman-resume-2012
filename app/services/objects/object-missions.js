import axios from 'axios';

export default function fetchObjectMissionsService({ token, at, cid, objectId }) {
  return axios.post('/api/object/getObjectMissions', {
    token,
    at,
    cid,
    objectId,
  });
}
