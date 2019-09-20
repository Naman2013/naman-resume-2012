import { API } from 'app/api';

export const QUESTS_PAGE_ENDPOINT_URL = '/api/page/questsHub';
export const QUESTS_ENDPOINT_URL = '/api/quests/getQuests';

export default function fetchObjectDataService({ token, at, cid, questId }) {
  return API.post('/api/page/quest', {
    token,
    at,
    cid,
    questId,
  });
}
