import axios from 'axios';

export default function fetchObjectFollowService({ token, at, cid, objectId }) {
  return axios.post('/api/object/toggleFollowObject', {
    token,
    at,
    cid,
    objectId,
  });
}
