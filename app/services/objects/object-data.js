import { API } from 'app/api';

export default function fetchObjectDataService({ token, at, cid, objectId }) {
  return API.post('/api/object/getObjectData', {
    token,
    at,
    cid,
    objectId,
  });
}
