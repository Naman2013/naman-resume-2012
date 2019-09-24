import { API } from 'app/api';

export default function fetchObjectQuestsService({ token, at, cid, objectId }) {
  return API.post('/api/object/getObjectQuests', {
    token,
    at,
    cid,
    objectId,
  });
}
