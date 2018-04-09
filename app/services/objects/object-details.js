import axios from 'axios';

export default function fetchObjectDetailsService({ token, at, cid, objectId }) {
  return axios.post('/api/page/getObjectDetails', {
    token,
    at,
    cid,
    objectId,
  });
}
