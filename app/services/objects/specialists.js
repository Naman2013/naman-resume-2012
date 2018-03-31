import axios from 'axios';

export default function fetchObjectSpecialistsService({
  at,
  cid,
  maxCount,
  objectId,
  token,
}) {
  return axios.post('/api/object/getObjectSpecialists', {
    at,
    cid,
    maxCount,
    objectId,
    token,
  });
}
