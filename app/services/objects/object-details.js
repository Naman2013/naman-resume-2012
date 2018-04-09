import axios from 'axios';

export default function fetchObjectDetailsService({ token, at, cid, objectId }) {
  return axios.post('/api/page/objectDetails', {
    token,
    at,
    cid,
    objectId,
  });
}
