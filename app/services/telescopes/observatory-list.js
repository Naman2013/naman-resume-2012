import { API } from 'app/api';

const DEFAULT_LANG = 'en';
const DEFAULT_STATUS = 'live';
const DEFAULT_LIST_TYPE = 'full';

export const OBSERVATORY_LIST_ENDPOINT = '/api/obs/list';

export default function fetchObservatoryList({
  at,
  cid,
  token,
  callSource,
}) {
  return API.post('/api/obs/list', {
    at,
    cid,
    token,
    callSource,
    lang: DEFAULT_LANG,
    status: DEFAULT_STATUS,
    listType: DEFAULT_LIST_TYPE,
  });
}
