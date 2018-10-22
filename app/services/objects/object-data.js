import axios from 'axios';

export default function fetchObjectDataService({ token, at, cid, objectId }) {
  return axios.post('/api/object/getObjectData', {
    token,
    at,
    cid,
    objectId,
  });
}
