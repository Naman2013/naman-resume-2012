import { API } from 'app/api';

export default function fetchObjectDetailsService({
  token,
  at,
  cid,
  objectId,
}) {
  return API.post('/api/page/objectDetails', {
    token,
    at,
    cid,
    objectId,
  });
}
