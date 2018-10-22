import axios from 'axios';

export const QUESTS_PAGE_ENDPOINT_URL = '/api/page/questsHub';
export const QUESTS_ENDPOINT_URL = '/api/quests/getQuests';

export default function fetchObjectDataService({ token, at, cid, questId }) {
  return axios.post('/api/page/quest', {
    token,
    at,
    cid,
    questId,
  });
}
