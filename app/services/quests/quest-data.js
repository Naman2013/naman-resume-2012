import axios from 'axios';

export default function fetchObjectDataService({ token, at, cid, questId }) {
  return axios.post('/api/page/quest', {
    token,
    at,
    cid,
    questId,
  });
}
