import { API } from 'app/api';

export default function fetchObjectSpecialistsService({
  at,
  cid,
  maxCount,
  objectId,
  token,
}) {
  return API.post('/api/object/getObjectSpecialists', {
    at,
    cid,
    maxCount,
    objectId,
    token,
  });
}
