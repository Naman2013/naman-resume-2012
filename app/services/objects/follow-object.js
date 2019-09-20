import { API } from 'app/api';

export default function fetchObjectFollowService({ token, at, cid, objectId }) {
  return API.post('/api/object/toggleFollowObject', {
    token,
    at,
    cid,
    objectId,
  });
}
