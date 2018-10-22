import axios from 'axios';

export default function fetchObjectQuestsService({ token, at, cid, objectId }) {
  return axios.post('/api/object/getObjectQuests', {
    token,
    at,
    cid,
    objectId,
  });
}
